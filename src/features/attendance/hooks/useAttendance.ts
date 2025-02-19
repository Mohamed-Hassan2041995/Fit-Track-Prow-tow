import { useState, useEffect } from "react"; // استيراد useState و useEffect من React
// import { supabase } from '../../../utils/supabaseClient'; // استيراد supabase (تم التعليق عليه)
// استيراد الأنواع AttendanceRecord و AttendanceStats
import { AttendanceRecord, AttendanceStats } from "../../../types/attendance";

// تعريف دالة useAttendance
export const useAttendance = (traineeId: string) => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]); // الحالة لتخزين سجلات الحضور
  const [stats, setStats] = useState<AttendanceStats>({
    // الحالة لتخزين إحصائيات الحضور
    totalSessions: 0,
    attendanceRate: 0,
    missedSessions: 0,
  });
  const [loading, setLoading] = useState(true); // حالة التحميل

  // دالة fetchAttendance لجلب بيانات الحضور
  const fetchAttendance = async () => {
    try {
      setLoading(true); // تعيين حالة التحميل إلى true
      const { data, error } = await supabase // جلب البيانات من Supabase
        .from("attendance")
        .select("*")
        .eq("trainee_id", traineeId) // اختيار السجلات بناءً على معرف المتدرب
        .order("date", { ascending: false }); // ترتيب السجلات حسب التاريخ

      if (error) throw error; // إذا كان هناك خطأ، قم برميه

      setRecords(data); // تعيين السجلات المحصلة
      calculateStats(data); // حساب الإحصائيات
    } catch (error) {
      console.error("Error fetching attendance:", error); // طباعة الخطأ في حالة وجوده
    } finally {
      setLoading(false); // تعيين حالة التحميل إلى false بعد انتهاء العملية
    }
  };

  // دالة لحساب إحصائيات الحضور
  const calculateStats = (records: AttendanceRecord[]) => {
    const total = records.length; // العدد الكلي للجلسات
    const present = records.filter((r) => r.status === "present").length; // عدد الجلسات التي تم الحضور فيها
    const missed = total - present; // عدد الجلسات المفقودة

    // تعيين الإحصائيات
    setStats({
      totalSessions: total,
      attendanceRate: total ? Math.round((present / total) * 100) : 0, // حساب معدل الحضور
      missedSessions: missed,
    });
  };

  // دالة لتسجيل حضور جديد
  const recordAttendance = async (record: Partial<AttendanceRecord>) => {
    try {
      const { data, error } = await supabase // إضافة سجل حضور جديد إلى Supabase
        .from("attendance")
        .insert([record])
        .select()
        .single();

      if (error) throw error; // إذا كان هناك خطأ، قم برميه

      setRecords((prev) => [data, ...prev]); // إضافة السجل الجديد إلى السجلات السابقة
      calculateStats([...records, data]); // حساب الإحصائيات مع السجل الجديد
      return data; // إرجاع السجل الجديد
    } catch (error) {
      console.error("Error recording attendance:", error); // طباعة الخطأ في حالة وجوده
      throw error; // إعادة رمي الخطأ
    }
  };

  useEffect(() => {
    fetchAttendance(); // جلب بيانات الحضور عند تغيير traineeId
  }, [traineeId]);

  return {
    // إرجاع القيم المطلوبة من الhook
    records,
    stats,
    loading,
    recordAttendance,
    refreshAttendance: fetchAttendance, // إرجاع دالة لتحديث بيانات الحضور
  };
};

export default useAttendance; // تصدير useAttendance
