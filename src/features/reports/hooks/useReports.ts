import { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabaseClient';
import { Report, ReportType } from '../../../types/report';

interface ReportFilters {
  type: ReportType;
  startDate: Date | null;
  endDate: Date | null;
}

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async (filters: ReportFilters) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('type', filters.type)
        .gte('created_at', filters.startDate?.toISOString())
        .lte('created_at', filters.endDate?.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (type: ReportType, params: any) => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .insert([{ type, ...params }])
        .select()
        .single();

      if (error) throw error;
      setReports(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  };

  return {
    reports,
    loading,
    fetchReports,
    generateReport,
  };
};