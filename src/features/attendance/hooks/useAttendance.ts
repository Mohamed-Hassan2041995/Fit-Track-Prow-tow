import { useState, useEffect } from 'react';
// import { supabase } from '../../../utils/supabaseClient';
import { AttendanceRecord, AttendanceStats } from '../../../types/attendance';

export const useAttendance = (traineeId: string) => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<AttendanceStats>({
    totalSessions: 0,
    attendanceRate: 0,
    missedSessions: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('trainee_id', traineeId)
        .order('date', { ascending: false });

      if (error) throw error;

      setRecords(data);
      calculateStats(data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (records: AttendanceRecord[]) => {
    const total = records.length;
    const present = records.filter(r => r.status === 'present').length;
    const missed = total - present;

    setStats({
      totalSessions: total,
      attendanceRate: total ? Math.round((present / total) * 100) : 0,
      missedSessions: missed
    });
  };

  const recordAttendance = async (record: Partial<AttendanceRecord>) => {
    try {
      const { data, error } = await supabase
        .from('attendance')
        .insert([record])
        .select()
        .single();

      if (error) throw error;

      setRecords(prev => [data, ...prev]);
      calculateStats([...records, data]);
      return data;
    } catch (error) {
      console.error('Error recording attendance:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [traineeId]);

  return {
    records,
    stats,
    loading,
    recordAttendance,
    refreshAttendance: fetchAttendance
  };
};

export default useAttendance;