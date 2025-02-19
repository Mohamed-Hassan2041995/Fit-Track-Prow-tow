// يستخدم هذا الكود كـ Hook مخصص لجلب إحصائيات الإدارة من قاعدة البيانات، بما في ذلك عدد المستخدمين النشطين،
// عدد المدربين النشطين، الإيرادات الشهرية، ومعدل النمو. يقوم بتخزين هذه البيانات في الحالة ويقوم بتحميلها عند التحميل الأولي.

import { useState, useEffect } from "react"; // استيراد useState و useEffect من React
import { supabase } from "../../../utils/supabaseClient"; // استيراد عميل Supabase

// تعريف واجهة AdminStats لتحديد هيكل إحصائيات الإدارة
interface AdminStats {
  activeUsers: number; // عدد المستخدمين النشطين
  totalUsers: number; // العدد الإجمالي للمستخدمين
  activeTrainers: number; // عدد المدربين النشطين
  totalTrainers: number; // العدد الإجمالي للمدربين
  monthlyRevenue: number; // الإيرادات الشهرية
  growthRate: number; // معدل النمو
}

// تعريف Hook مخصص لجلب إحصائيات الإدارة
export const useAdminStats = () => {
  // تعريف الحالة لتخزين الإحصائيات
  const [stats, setStats] = useState<AdminStats>({
    activeUsers: 0, // تهيئة عدد المستخدمين النشطين
    totalUsers: 0, // تهيئة العدد الإجمالي للمستخدمين
    activeTrainers: 0, // تهيئة عدد المدربين النشطين
    totalTrainers: 0, // تهيئة العدد الإجمالي للمدربين
    monthlyRevenue: 0, // تهيئة الإيرادات الشهرية
    growthRate: 0, // تهيئة معدل النمو
  });

  // حالة لتخزين بيانات الإيرادات
  const [revenueData, setRevenueData] = useState([]);
  // حالة لتتبع حالة التحميل
  const [loading, setLoading] = useState(true);

  // استخدام useEffect لجلب الإحصائيات عند تحميل المكون
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true); // تعيين حالة التحميل إلى true

        // TODO: تنفيذ المكالمات الفعلية لواجهة برمجة التطبيقات لجلب الإحصائيات
        const { data: usersData, error: usersError } = await supabase
          .from("users") // جلب بيانات المستخدمين من جدول "users"
          .select("*");

        if (usersError) throw usersError; // إذا كان هناك خطأ، ارمِ الخطأ

        // لأغراض العرض التجريبي، استخدام بيانات وهمية
        setStats({
          activeUsers: 150, // تعيين عدد المستخدمين النشطين
          totalUsers: 200, // تعيين العدد الإجمالي للمستخدمين
          activeTrainers: 25, // تعيين عدد المدربين النشطين
          totalTrainers: 30, // تعيين العدد الإجمالي للمدربين
          monthlyRevenue: 15000, // تعيين الإيرادات الشهرية
          growthRate: 12.5, // تعيين معدل النمو
        });

        // تعيين بيانات الإيرادات الوهمية
        setRevenueData([
          { date: "2023-01", amount: 12000 },
          { date: "2023-02", amount: 13500 },
          { date: "2023-03", amount: 15000 },
        ]);
      } catch (error) {
        console.error("Error fetching admin stats:", error); // طباعة الخطأ في حال حدوثه
      } finally {
        setLoading(false); // تعيين حالة التحميل إلى false بعد الانتهاء من الجلب
      }
    };

    fetchStats(); // استدعاء الدالة لجلب الإحصائيات
  }, []); // مصفوفة فارغة تعني أن الدالة ستعمل عند تحميل المكون فقط

  return { stats, revenueData, loading }; // إعادة الإحصائيات وبيانات الإيرادات وحالة التحميل
};
