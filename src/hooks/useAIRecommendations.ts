/**
 * Hook للحصول على توصيات الذكاء الاصطناعي
 * يقوم بتحليل بيانات المستخدم وتقديم توصيات مخصصة
 */
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

interface AIRecommendation {
  type: 'workout' | 'nutrition' | 'general';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  suggestions: string[];
}

export const useAIRecommendations = (userId: string) => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  const analyzeUserData = async () => {
    try {
      setLoading(true);
      
      // جلب بيانات المستخدم
      const [workouts, nutrition, measurements] = await Promise.all([
        supabase
          .from('workout_logs')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(10),
          
        supabase
          .from('nutrition_logs')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(10),
          
        supabase
          .from('trainee_measurements')
          .select('*')
          .eq('trainee_id', userId)
          .order('measurement_date', { ascending: false })
          .limit(2)
      ]);

      // تحليل البيانات وإنشاء التوصيات
      const recommendations: AIRecommendation[] = [];

      // تحليل التمارين
      if (workouts.data && workouts.data.length > 0) {
        const completedWorkouts = workouts.data.filter(w => w.status === 'completed');
        const completionRate = (completedWorkouts.length / workouts.data.length) * 100;

        if (completionRate < 70) {
          recommendations.push({
            type: 'workout',
            title: 'تحسين معدل إكمال التمارين',
            description: 'لوحظ انخفاض في معدل إكمال التمارين',
            priority: 'high',
            suggestions: [
              'حاول تقسيم التمارين إلى جلسات أقصر',
              'ضع أهدافاً أكثر واقعية',
              'اطلب المساعدة من المدرب عند الحاجة'
            ]
          });
        }
      }

      // تحليل التغذية
      if (nutrition.data && nutrition.data.length > 0) {
        // تحليل النظام الغذائي وتقديم توصيات
        recommendations.push({
          type: 'nutrition',
          title: 'تحسين النظام الغذائي',
          description: 'بناءً على سجل وجباتك الأخيرة',
          priority: 'medium',
          suggestions: [
            'زيادة تناول البروتين',
            'تنويع مصادر الكربوهيدرات',
            'الحفاظ على التوازن الغذائي'
          ]
        });
      }

      setRecommendations(recommendations);
    } catch (error) {
      console.error('Error analyzing user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      analyzeUserData();
    }
  }, [userId]);

  return {
    recommendations,
    loading,
    refreshRecommendations: analyzeUserData
  };
};