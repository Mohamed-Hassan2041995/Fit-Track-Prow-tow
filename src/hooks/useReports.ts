import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

interface ActivityData {
  id: string;
  type: string;
  description: string;
  date: string;
}

interface ReportData {
  activities: ActivityData[];
  summary: {
    totalActivities: number;
    completedTasks: number;
    performance: number;
  };
}

export const useReports = () => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const generateReport = async (
    userId: string,
    userType: 'trainer' | 'trainee',
    startDate: Date,
    endDate: Date
  ) => {
    try {
      setLoading(true);

      // جمع البيانات من مختلف الجداول
      const [workouts, nutrition, attendance] = await Promise.all([
        supabase
          .from('workout_logs')
          .select('*')
          .eq(userType === 'trainer' ? 'trainer_id' : 'trainee_id', userId)
          .gte('created_at', startDate.toISOString())
          .lte('created_at', endDate.toISOString()),
        supabase
          .from('nutrition_logs')
          .select('*')
          .eq(userType === 'trainer' ? 'trainer_id' : 'trainee_id', userId)
          .gte('created_at', startDate.toISOString())
          .lte('created_at', endDate.toISOString()),
        supabase
          .from('attendance')
          .select('*')
          .eq(userType === 'trainer' ? 'trainer_id' : 'trainee_id', userId)
          .gte('date', startDate.toISOString())
          .lte('date', endDate.toISOString())
      ]);

      // تجميع البيانات في تقرير موحد
      const activities: ActivityData[] = [
        ...(workouts.data || []).map(w => ({
          id: w.id,
          type: 'تمرين',
          description: w.name,
          date: w.created_at
        })),
        ...(nutrition.data || []).map(n => ({
          id: n.id,
          type: 'تغذية',
          description: n.description,
          date: n.created_at
        })),
        ...(attendance.data || []).map(a => ({
          id: a.id,
          type: 'حضور',
          description: a.status,
          date: a.date
        }))
      ];

      setReportData({
        activities,
        summary: {
          totalActivities: activities.length,
          completedTasks: activities.filter(a => a.type === 'completed').length,
          performance: 85 // يمكن حساب هذا بناءً على معايير محددة
        }
      });
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    reportData,
    generateReport
  };
};