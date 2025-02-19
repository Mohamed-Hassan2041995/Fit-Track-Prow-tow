/**
 * هوك لإنشاء تقارير الأنشطة
 * يوفر وظائف لجمع البيانات المتعلقة بالتدريبات، التغذية، والحضور لمستخدم معين
 * خلال فترة زمنية محددة. يتم تنظيم البيانات في تقرير يتضمن ملخص عن الأنشطة.
 */

import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

// تعريف واجهة بيانات النشاط
interface ActivityData {
  id: string; // معرف النشاط
  type: string; // نوع النشاط (تمرين، تغذية، حضور)
  description: string; // وصف النشاط
  date: string; // تاريخ النشاط
}

// تعريف واجهة بيانات التقرير
interface ReportData {
  activities: ActivityData[]; // قائمة الأنشطة
  summary: {
    totalActivities: number; // إجمالي عدد الأنشطة
    completedTasks: number; // عدد المهام المكتملة
    performance: number; // أداء المستخدم (يمكن حسابه بناءً على معايير معينة)
  };
}

// تعريف الهوك
export const useReports = () => {
  const [loading, setLoading] = useState(false); // حالة التحميل
  const [reportData, setReportData] = useState<ReportData | null>(null); // بيانات التقرير

  // دالة لإنشاء التقرير
  const generateReport = async (
    userId: string, // معرف المستخدم
    userType: "trainer" | "trainee", // نوع المستخدم (مدرب أو متدرب)
    startDate: Date, // تاريخ البدء
    endDate: Date // تاريخ الانتهاء
  ) => {
    try {
      setLoading(true); // بدء التحميل

      // جمع البيانات من مختلف الجداول في قاعدة البيانات
      const [workouts, nutrition, attendance] = await Promise.all([
        supabase
          .from("workout_logs") // جلب بيانات التمارين
          .select("*")
          .eq(userType === "trainer" ? "trainer_id" : "trainee_id", userId)
          .gte("created_at", startDate.toISOString()) // تحديد تاريخ البدء
          .lte("created_at", endDate.toISOString()), // تحديد تاريخ الانتهاء
        supabase
          .from("nutrition_logs") // جلب بيانات التغذية
          .select("*")
          .eq(userType === "trainer" ? "trainer_id" : "trainee_id", userId)
          .gte("created_at", startDate.toISOString())
          .lte("created_at", endDate.toISOString()),
        supabase
          .from("attendance") // جلب بيانات الحضور
          .select("*")
          .eq(userType === "trainer" ? "trainer_id" : "trainee_id", userId)
          .gte("date", startDate.toISOString())
          .lte("date", endDate.toISOString()),
      ]);

      // تجميع البيانات في تقرير موحد
      const activities: ActivityData[] = [
        ...(workouts.data || []).map((w) => ({
          // تحويل بيانات التمارين إلى الشكل المطلوب
          id: w.id,
          type: "تمرين",
          description: w.name,
          date: w.created_at,
        })),
        ...(nutrition.data || []).map((n) => ({
          // تحويل بيانات التغذية إلى الشكل المطلوب
          id: n.id,
          type: "تغذية",
          description: n.description,
          date: n.created_at,
        })),
        ...(attendance.data || []).map((a) => ({
          // تحويل بيانات الحضور إلى الشكل المطلوب
          id: a.id,
          type: "حضور",
          description: a.status,
          date: a.date,
        })),
      ];

      // تعيين بيانات التقرير
      setReportData({
        activities, // الأنشطة
        summary: {
          totalActivities: activities.length, // إجمالي عدد الأنشطة
          completedTasks: activities.filter((a) => a.type === "completed")
            .length, // عدد المهام المكتملة
          performance: 85, // يمكن حساب هذا بناءً على معايير محددة
        },
      });
    } catch (error) {
      console.error("خطأ في إنشاء التقرير:", error); // التعامل مع الأخطاء
    } finally {
      setLoading(false); // إنهاء التحميل
    }
  };

  // إرجاع حالة التحميل وبيانات التقرير والدالة لإنشاء التقرير
  return {
    loading,
    reportData,
    generateReport,
  };
};
