// هذا الكود يُعرِّف خدمة لتحليل بيانات تقدم المتدربين.
// يتضمن تحليل تقدمهم، أدائهم، وتمارينهم باستخدام بيانات من قاعدة بيانات Supabase.

import { supabase } from "../../utils/supabaseClient"; // استيراد عميل Supabase للتواصل مع قاعدة البيانات
import {
  ProgressMetrics,
  PerformanceStats,
  WorkoutAnalytics,
} from "../../types/analytics"; // استيراد أنواع البيانات المستخدمة في التحليلات

// تعريف فئة خدمة التحليلات

export class AnalyticsService {
  // تحليل تقدم المتدرب
  async analyzeProgress(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ProgressMetrics> {
    // استرجاع سجلات التمارين من قاعدة البيانات حسب المستخدم وتاريخ البدء والانتهاء

    const { data: workouts, error: workoutError } = await supabase
      .from("workout_logs")
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString());

    if (workoutError) throw workoutError; // في حالة حدوث خطأ، يتم إلقاء الخطأ

    // حساب معدلات التقدم باستخدام البيانات المسترجعة
    const progressMetrics = this.calculateProgressMetrics(workouts);
    return progressMetrics; // إرجاع معدلات التقدم
  }

  // تحليل الأداء
  async analyzePerformance(userId: string): Promise<PerformanceStats> {
    // استرجاع جلسات التدريب من قاعدة البيانات حسب المستخدم

    const { data: sessions, error } = await supabase
      .from("training_sessions")
      .select(
        `*,
      workout_logs (*)`
      ) // استرجاع معلومات سجل التمارين المرتبطة بجلسات التدريب
      .eq("user_id", userId)
      .order("created_at", { ascending: false }); // ترتيب النتائج حسب تاريخ الإنشاء

    if (error) throw error; // في حالة حدوث خطأ، يتم إلقاء الخطأ

    // حساب إحصائيات الأداء باستخدام البيانات المسترجعة
    return this.calculatePerformanceStats(sessions);
  }

  // تحليل التمارين
  async analyzeWorkouts(userId: string): Promise<WorkoutAnalytics> {
    // استرجاع سجلات التمارين من قاعدة البيانات حسب المستخدم
    const { data, error } = await supabase
      .from("workout_logs")
      .select(
        `*,
        exercises (*)`
      ) // استرجاع معلومات التمارين المرتبطة بالسجلات
      .eq("user_id", userId);

    if (error) throw error; // في حالة حدوث خطأ، يتم إلقاء الخطأ

    // تحليل التمارين باستخدام البيانات المسترجعة
    return this.calculateWorkoutAnalytics(data);
  }

  // حساب معدلات التقدم من سجلات التمارين

  private calculateProgressMetrics(workouts: any[]): ProgressMetrics {
    // حساب معدلات التقدم
    return {
      strengthProgress: this.calculateStrengthProgress(workouts),
      enduranceProgress: this.calculateEnduranceProgress(workouts),
      weightProgress: this.calculateWeightProgress(workouts),
      overallProgress: this.calculateOverallProgress(workouts), // حساب التقدم العام
    };
  }

  private calculatePerformanceStats(sessions: any[]): PerformanceStats {
    // حساب إحصائيات الأداء من جلسات التدريب
    return {
      averageIntensity: this.calculateAverageIntensity(sessions), // حساب متوسط الشدة
      consistencyScore: this.calculateConsistencyScore(sessions), // حساب معدل الانتظام
      achievementRate: this.calculateAchievementRate(sessions), // حساب معدل الإنجاز
      trends: this.calculatePerformanceTrends(sessions), // تحليل الاتجاهات في الأداء
    };
  }

  private calculateWorkoutAnalytics(data: any[]): WorkoutAnalytics {
    // تحليل بيانات التمارين
    return {
      mostEffectiveExercises: this.findMostEffectiveExercises(data), // العثور على أكثر التمارين فعالية
      recommendedImprovements: this.generateRecommendations(data), // توليد التوصيات للتحسين
      workoutDistribution: this.analyzeWorkoutDistribution(data), // تحليل توزيع التمارين
    };
  }

  // ... المزيد من الدوال المساعدة للحسابات التفصيلية
}
// إنشاء مثيل لخدمة التحليلات
export const analyticsService = new AnalyticsService();
