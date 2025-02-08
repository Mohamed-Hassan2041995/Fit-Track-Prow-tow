import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from '../pages/Dashboard';
import WorkoutPlans from '../pages/WorkoutPlans';
import NutritionPlans from '../pages/NutritionPlans';
import UsersManagement from '../pages/UsersManagement';
import Settings from '../pages/Settings';
import AttendancePage from '../pages/AttendancePage';
import Login from '../pages/Login';
import { UserRole } from '../types/user';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/workouts" element={<WorkoutPlans />} />
      <Route path="/nutrition" element={<NutritionPlans />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route
        path="/users"
        element={
          hasPermission(UserRole.ADMIN) ? (
            <UsersManagement />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />
      <Route path="/settings" element={<Settings />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;