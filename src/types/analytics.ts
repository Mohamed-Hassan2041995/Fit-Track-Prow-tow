// تعريف معدلات التقدم ProgressMetrics
export interface ProgressMetrics {
  trends: any[] | undefined;
  strengthProgress: number; // نسبة التقدم في القوة
  enduranceProgress: number; // نسبة التقدم في التحمل
  weightProgress: number; // نسبة التقدم في الوزن
  overallProgress: number; // متوسط التقدم العام
}

// تعريف إحصائيات الأداء PerformanceStats
export interface PerformanceStats {
  averageIntensity: number; // معدل الكثافة (0 - 100)
  achievementRate: number; // معدل الإنجاز (0 - 100)
  consistencyScore: number; // معدل التناسق (0 - 100)
  trends: string[]; // الاتجاهات (مثل "تحسن في القوة", "زيادة في التحمل")
}

// تعريف تحليل التمارين WorkoutAnalytics
export interface WorkoutAnalytics {
  mostEffectiveExercises: string[]; // قائمة بأكثر التمارين فاعلية
  recommendedImprovements: string[]; // نصائح للتحسين
  workoutDistribution: Record<string, number>; // توزيع التمارين على العضلات
}
