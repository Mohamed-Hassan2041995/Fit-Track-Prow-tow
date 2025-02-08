import React from 'react';
import { Container } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/user';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import TrainerDashboard from '../components/dashboard/TrainerDashboard';
import TraineeDashboard from '../components/dashboard/TraineeDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const getDashboard = () => {
    switch (user.role) {
      case UserRole.ADMIN:
        return <AdminDashboard />;
      case UserRole.TRAINER:
        return <TrainerDashboard />;
      case UserRole.TRAINEE:
        return <TraineeDashboard />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {getDashboard()}
    </Container>
  );
};

export default Dashboard;