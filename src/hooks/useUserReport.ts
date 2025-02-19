/**
 * هوك لإنشاء تقارير المستخدمين
 * يقوم بجمع بيانات مختلفة للمستخدم (مدرب أو متدرب) من قواعد بيانات Supabase
 * مثل التمارين، التغذية، الحضور، القياسات، والتقييمات.
 */

import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { UserReport, Activity } from "../types/report";

// تعريف الهوك
export const useUserReport = (
  userId: string,
  userType: "trainer" | "trainee"
) => {
  const [loading, setLoading] = useState(false); // حالة التحميل
  const [reportData, setReportData] = useState<UserReport | null>(null); // حالة لتخزين بيانات التقرير

  // دالة لإنشاء التقرير بناءً على فترة زمنية محددة
  const generateReport = async (startDate: Date, endDate: Date) => {
    try {
      setLoading(true); // بدء التحميل

      // جمع البيانات من جميع الجداول المطلوبة
      const [workouts, nutrition, attendance, measurements, assessments] =
        await Promise.all([
          // جمع بيانات التمارين
          supabase
            .from("workout_logs")
            .select("*")
            .eq(userType === "trainer" ? "trainer_id" : "trainee_id", userId)
            .gte("created_at", startDate.toISOString())
            .lte("created_at", endDate.toISOString()),

          // جمع بيانات التغذية
          supabase
            .from("nutrition_logs")
            .select("*")
            .eq(userType === "trainer" ? "trainer_id" : "trainee_id", userId)
            .gte("created_at", startDate.toISOString())
            .lte("created_at", endDate.toISOString()),

          // جمع بيانات الحضور
          supabase
            .from("attendance")
            .select("*")
            .eq(userType === "trainer" ? "trainer_id" : "trainee_id", userId)
            .gte("date", startDate.toISOString())
            .lte("date", endDate.toISOString()),

          // جمع بيانات القياسات
          supabase
            .from("trainee_measurements")
            .select("*")
            .eq(userType === "trainee" ? "trainee_id" : "trainer_id", userId)
            .gte("measurement_date", startDate.toISOString())
            .lte("measurement_date", endDate.toISOString()),

          // جمع بيانات التقييمات
          supabase
            .from("fitness_assessments")
            .select("*")
            .eq(userType === "trainee" ? "trainee_id" : "trainer_id", userId)
            .gte("assessment_date", startDate.toISOString())
            .lte("assessment_date", endDate.toISOString()),
        ]);

      // تجميع كل الأنشطة في مصفوفة واحدة
      const activities: Activity[] = [
        ...(workouts.data || []).map((w) => ({
          id: w.id,
          type: "workout",
          title: "تمرين جديد",
          description: w.name,
          timestamp: w.created_at,
          status: w.status,
        })),
        ...(nutrition.data || []).map((n) => ({
          id: n.id,
          type: "nutrition",
          title: "خطة غذائية",
          description: n.description,
          timestamp: n.created_at,
          status: n.status,
        })),
        ...(attendance.data || []).map((a) => ({
          id: a.id,
          type: "attendance",
          title: "تسجيل حضور",
          description: `حالة الحضور: ${a.status}`,
          timestamp: a.date,
        })),
      ];

      // حساب الإحصائيات والمقاييس
      const totalWorkouts = workouts.data?.length || 0; // إجمالي التمارين
      const completedWorkouts =
        workouts.data?.filter((w) => w.status === "completed").length || 0; // التمارين المكتملة
      const attendanceCount =
        attendance.data?.filter((a) => a.status === "present").length || 0; // عدد الحضور
      const totalAttendance = attendance.data?.length || 0; // إجمالي الحضور

      // تعيين بيانات التقرير
      setReportData({
        activities,
        performance: {
          completionRate: (completedWorkouts / totalWorkouts) * 100 || 0, // معدل الإنجاز
          attendanceRate: (attendanceCount / totalAttendance) * 100 || 0, // معدل الحضور
          goals: [
            {
              name: "الأهداف البدنية",
              progress: 75, // التقدم في الأهداف البدنية
            },
            {
              name: "الأهداف الغذائية",
              progress: 80, // التقدم في الأهداف الغذائية
            },
          ],
        },
        workouts: workouts.data || [], // بيانات التمارين
        nutrition: nutrition.data || [], // بيانات التغذية
        measurements: measurements.data || [], // بيانات القياسات
        assessments: assessments.data || [], // بيانات التقييمات
      });
    } catch (error) {
      console.error("Error generating report:", error); // التعامل مع الأخطاء
    } finally {
      setLoading(false); // إنهاء التحميل
    }
  };

  // إرجاع البيانات المطلوبة من الهوك
  return {
    reportData,
    loading,
    generateReport,
  };
};
