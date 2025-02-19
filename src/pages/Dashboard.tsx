// هذا الكمبوننت يمثل لوحة القيادة (Dashboard) للمستخدمين بناءً على دورهم.
// يقوم بعرض لوحة القيادة المناسبة لكل نوع من أنواع المستخدمين (مدير، مدرب، متدرب).
// يعتمد على بيانات المستخدم المستخرجة من سياق المصادقة (AuthContext).

import React from "react";
import { Container } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { UserRole } from "../types/user";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import TrainerDashboard from "../components/dashboard/TrainerDashboard";
import TraineeDashboard from "../components/dashboard/TraineeDashboard";

const Dashboard: React.FC = () => {
  // استدعاء بيانات المستخدم من السياق
  const { user } = useAuth();

  // إذا لم يكن هناك مستخدم مسجل، نقوم بإرجاع null
  if (!user) {
    return null;
  }

  // دالة للحصول على لوحة القيادة بناءً على دور المستخدم
  const getDashboard = () => {
    switch (user.role) {
      case UserRole.ADMIN:
        // إذا كان المستخدم مديرًا، نقوم بعرض لوحة القيادة الخاصة بالمدير
        return <AdminDashboard />;
      case UserRole.TRAINER:
        // إذا كان المستخدم مدربًا، نقوم بعرض لوحة القيادة الخاصة بالمدرب
        return <TrainerDashboard />;
      case UserRole.TRAINEE:
        // إذا كان المستخدم متدربًا، نقوم بعرض لوحة القيادة الخاصة بالمتدرب
        return <TraineeDashboard />;
      default:
        // إذا كان دور المستخدم غير معرّف، نقوم بإرجاع null
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* عرض لوحة القيادة المناسبة بناءً على دور المستخدم */}
      {getDashboard()}
    </Container>
  );
};

export default Dashboard;
