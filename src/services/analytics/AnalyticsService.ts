import { supabase } from '../../utils/supabaseClient';
import { 
  ProgressMetrics,
  PerformanceStats,
  WorkoutAnalytics 
} from '../../types/analytics';

export class AnalyticsService {
  // تحليل تقدم المتدرب
  async analyzeProgress(userId: string, startDate: Date, endDate: Date): Promise<ProgressMetrics> {
    const { data: workouts, error: workoutError } = await supabase
      .from('workout_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (workoutError) throw workoutError;

    // حساب معدلات التقدم
    const progressMetrics = this.calculateProgressMetrics(workouts);
    return progressMetrics;
  }

  // تحليل الأداء
  async analyzePerformance(userId: string): Promise<PerformanceStats> {
    const { data: sessions, error } = await supabase
      .from('training_sessions')
      .select(`
        *,
        workout_logs (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return this.calculatePerformanceStats(sessions);
  }

  // تحليل التمارين
  async analyzeWorkouts(userId: string): Promise<WorkoutAnalytics> {
    const { data, error } = await supabase
      .from('workout_logs')
      .select(`
        *,
        exercises (*)
      `)
      .eq('user_id', userId);

    if (error) throw error;

    return this.calculateWorkoutAnalytics(data);
  }

  private calculateProgressMetrics(workouts: any[]): ProgressMetrics {
    // حساب معدلات التقدم
    return {
      strengthProgress: this.calculateStrengthProgress(workouts),
      enduranceProgress: this.calculateEnduranceProgress(workouts),
      weightProgress: this.calculateWeightProgress(workouts),
      overallProgress: this.calculateOverallProgress(workouts)
    };
  }

  private calculatePerformanceStats(sessions: any[]): PerformanceStats {
    // حساب إحصائيات الأداء
    return {
      averageIntensity: this.calculateAverageIntensity(sessions),
      consistencyScore: this.calculateConsistencyScore(sessions),
      achievementRate: this.calculateAchievementRate(sessions),
      trends: this.calculatePerformanceTrends(sessions)
    };
  }

  private calculateWorkoutAnalytics(data: any[]): WorkoutAnalytics {
    // تحليل التمارين
    return {
      mostEffectiveExercises: this.findMostEffectiveExercises(data),
      recommendedImprovements: this.generateRecommendations(data),
      workoutDistribution: this.analyzeWorkoutDistribution(data)
    };
  }

  // ... المزيد من الدوال المساعدة للحسابات التفصيلية
}

export const analyticsService = new AnalyticsService();