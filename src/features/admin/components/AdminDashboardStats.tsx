import React from 'react';
import { Grid } from '@mui/material';
import {
  People,
  FitnessCenter,
  AttachMoney,
  TrendingUp,
} from '@mui/icons-material';
import StatisticsCard from './StatisticsCard';
import RevenueChart from './RevenueChart';
import { useAdminStats } from '../hooks/useAdminStats';

const AdminDashboardStats: React.FC = () => {
  const { stats, revenueData, loading } = useAdminStats();

  if (loading) return null;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatisticsCard
          title="Active Users"
          value={stats.activeUsers}
          total={stats.totalUsers}
          icon={<People fontSize="large" />}
          color="#1976d2"
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <StatisticsCard
          title="Active Trainers"
          value={stats.activeTrainers}
          total={stats.totalTrainers}
          icon={<FitnessCenter fontSize="large" />}
          color="#2e7d32"
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <StatisticsCard
          title="Monthly Revenue"
          value={stats.monthlyRevenue}
          icon={<AttachMoney fontSize="large" />}
          color="#ed6c02"
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <StatisticsCard
          title="Growth Rate"
          value={stats.growthRate}
          icon={<TrendingUp fontSize="large" />}
          color="#9c27b0"
        />
      </Grid>

      <Grid item xs={12}>
        <RevenueChart data={revenueData} />
      </Grid>
    </Grid>
  );
}