import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { UserReport, Activity } from '../types/report';

export const useUserReport = (userId: string, userType: 'trainer' | 'trainee') => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<UserReport | null>(null);

  const generateReport = async (startDate: Date, endDate: Date) => {
    try {
      setLoading(true);

      // جمع البيانات من جميع الجداول المطلوبة
      const [
        workouts,
        nutrition,
        attendance,
        measurements,
        assessments
      ] = await Promise.all([
        // التمارين
        supabase
          .from('workout_logs')
          .select('*')
          .eq(userType === 'trainer' ? 'trainer_id' : 'trainee_id', userId)
          .gte('created_at', startDate.toISOString())
          .lte('created_at', endDate.toISOString()),

        // التغذية
        supabase
          .from('nutrition_logs')
          .select('*')
          .eq(userType === 'trainer' ? 'trainer_id' : 'trainee_id', userId)
          .gte('created_at', startDate.toISOString())
          .lte('created_at', endDate.toISOString()),

        // الحضور
        supabase
          .from('attendance')
          .select('*')
          .eq(userType === 'trainer' ? 'trainer_id' : 'trainee_id', userId)
          .gte('date', startDate.toISOString())
          .lte('date', endDate.toISOString()),

        // القياسات
        supabase
          .from('trainee_measurements')
          .select('*')
          .eq(userType === 'trainee' ? 'trainee_id' : 'trainer_id', userId)
          .gte('measurement_date', startDate.toISOString())
          .lte('measurement_date', endDate.toISOString()),

        // التقييمات
        supabase
          .from('fitness_assessments')
          .select('*')
          .eq(userType === 'trainee' ? 'trainee_id' : 'trainer_id', userId)
          .gte('assessment_date', startDate.toISOString())
          .lte('assessment_date', endDate.toISOString())
      ]);

      // تجميع كل الأنشطة في مصفوفة واحدة
      const activities: Activity[] = [
        ...(workouts.data || []).map(w => ({
          id: w.id,
          type: 'workout',
          title: 'تمرين جديد',
          description: w.name,
          timestamp: w.created_at,
          status: w.status
        })),
        ...(nutrition.data || []).map(n => ({
          id: n.id,
          type: 'nutrition',
          title: 'خطة غذائية',
          description: n.description,
          timestamp: n.created_at,
          status: n.status
        })),
        ...(attendance.data || []).map(a => ({
          id: a.id,
          type: 'attendance',
          title: 'تسجيل حضور',
          description: `حالة الحضور: ${a.status}`,
          timestamp: a.date
        }))
      ];

      // حساب الإحصائيات والمقاييس
      const totalWorkouts = workouts.data?.length || 0;
      const completedWorkouts = workouts.data?.filter(w => w.status === 'completed').length || 0;
      const attendanceCount = attendance.data?.filter(a => a.status === 'present').length || 0;
      const totalAttendance = attendance.data?.length || 0;

      setReportData({
        activities,
        performance: {
          completionRate: (completedWorkouts / totalWorkouts) * 100 || 0,
          attendanceRate: (attendanceCount / totalAttendance) * 100 || 0,
          goals: [
            {
              name: 'الأهداف البدنية',
              progress: 75 // يمكن حساب هذه القيم بناءً على معايير محددة
            },
            {
              name: 'الأهداف الغذائية',
              progress: 80
            }
          ]
        },
        workouts: workouts.data || [],
        nutrition: nutrition.data || [],
        measurements: measurements.data || [],
        assessments: assessments.data || []
      });

    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    reportData,
    loading,
    generateReport
  };
};