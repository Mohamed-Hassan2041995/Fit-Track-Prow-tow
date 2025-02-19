/**
 * هوك للحصول على توصيات الذكاء الاصطناعي بناءً على بيانات المستخدم
 * يقوم هذا الهوك بتحليل بيانات المستخدم في سجلات التمارين والتغذية وقياسات الجسم
 * ويقدم توصيات مخصصة لتحسين الأداء الغذائي والتمارين.
 */

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

interface AIRecommendation {
  type: "workout" | "nutrition" | "general"; // نوع التوصية (تمارين، تغذية، عام)
  title: string; // عنوان التوصية
  description: string; // وصف التوصية
  priority: "high" | "medium" | "low"; // أولوية التوصية
  suggestions: string[]; // قائمة الاقتراحات المرتبطة بالتوصية
}

export const useAIRecommendations = (userId: string) => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(
    []
  ); // حالة لتخزين التوصيات
  const [loading, setLoading] = useState(true); // حالة لتحميل البيانات

  const analyzeUserData = async () => {
    try {
      setLoading(true); // تعيين حالة التحميل إلى true

      // جلب بيانات المستخدم
      const [workouts, nutrition, measurements] = await Promise.all([
        supabase
          .from("workout_logs") // جلب سجلات التمارين
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false }) // ترتيب السجلات حسب تاريخ الإنشاء
          .limit(10), // تحديد عدد السجلات

        supabase
          .from("nutrition_logs") // جلب سجلات التغذية
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false }) // ترتيب السجلات حسب تاريخ الإنشاء
          .limit(10), // تحديد عدد السجلات

        supabase
          .from("trainee_measurements") // جلب قياسات الجسم
          .select("*")
          .eq("trainee_id", userId)
          .order("measurement_date", { ascending: false }) // ترتيب السجلات حسب تاريخ القياس
          .limit(2), // تحديد عدد السجلات
      ]);

      // تحليل البيانات وإنشاء التوصيات
      const recommendations: AIRecommendation[] = [];

      // تحليل التمارين
      if (workouts.data && workouts.data.length > 0) {
        const completedWorkouts = workouts.data.filter(
          (w) => w.status === "completed"
        ); // التمارين المكتملة
        const completionRate =
          (completedWorkouts.length / workouts.data.length) * 100; // حساب معدل الإكمال

        if (completionRate < 70) {
          // إذا كان معدل الإكمال أقل من 70%
          recommendations.push({
            type: "workout", // نوع التوصية
            title: "تحسين معدل إكمال التمارين", // عنوان التوصية
            description: "لوحظ انخفاض في معدل إكمال التمارين", // وصف التوصية
            priority: "high", // أولوية التوصية
            suggestions: [
              "حاول تقسيم التمارين إلى جلسات أقصر", // اقتراح 1
              "ضع أهدافاً أكثر واقعية", // اقتراح 2
              "اطلب المساعدة من المدرب عند الحاجة", // اقتراح 3
            ],
          });
        }
      }

      // تحليل التغذية
      if (nutrition.data && nutrition.data.length > 0) {
        // تحليل النظام الغذائي وتقديم توصيات
        recommendations.push({
          type: "nutrition", // نوع التوصية
          title: "تحسين النظام الغذائي", // عنوان التوصية
          description: "بناءً على سجل وجباتك الأخيرة", // وصف التوصية
          priority: "medium", // أولوية التوصية
          suggestions: [
            "زيادة تناول البروتين", // اقتراح 1
            "تنويع مصادر الكربوهيدرات", // اقتراح 2
            "الحفاظ على التوازن الغذائي", // اقتراح 3
          ],
        });
      }

      setRecommendations(recommendations); // تعيين التوصيات
    } catch (error) {
      console.error("Error analyzing user data:", error); // التعامل مع الأخطاء
    } finally {
      setLoading(false); // تعيين حالة التحميل إلى false
    }
  };

  useEffect(() => {
    if (userId) {
      analyzeUserData(); // تحليل بيانات المستخدم عند تغيير userId
    }
  }, [userId]);

  return {
    recommendations, // إرجاع التوصيات
    loading, // إرجاع حالة التحميل
    refreshRecommendations: analyzeUserData, // إرجاع دالة لتحديث التوصيات
  };
};
