import { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabaseClient';

interface AdminStats {
  activeUsers: number;
  totalUsers: number;
  activeTrainers: number;
  totalTrainers: number;
  monthlyRevenue: number;
  growthRate: number;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    activeUsers: 0,
    totalUsers: 0,
    activeTrainers: 0,
    totalTrainers: 0,
    monthlyRevenue: 0,
    growthRate: 0,
  });
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // TODO: Implement actual API calls to fetch statistics
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('*');

        if (usersError) throw usersError;

        // For demo purposes, using mock data
        setStats({
          activeUsers: 150,
          totalUsers: 200,
          activeTrainers: 25,
          totalTrainers: 30,
          monthlyRevenue: 15000,
          growthRate: 12.5,
        });

        setRevenueData([
          { date: '2023-01', amount: 12000 },
          { date: '2023-02', amount: 13500 },
          { date: '2023-03', amount: 15000 },
        ]);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, revenueData, loading };
};