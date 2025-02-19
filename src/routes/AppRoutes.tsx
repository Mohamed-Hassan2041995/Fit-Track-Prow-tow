// هذا الكمبوننت يمثل نظام توجيه التطبيق.
// يقوم بتحديد المسارات المتاحة في التطبيق بناءً على حالة المصادقة.
// إذا لم يكن المستخدم مصدقًا، يتم توجيهه إلى صفحة تسجيل الدخول.
// إذا كان مصدقًا، يتم عرض المسارات المختلفة حسب أذونات المستخدم.

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // استيراد المكونات اللازمة للتوجيه
import { useAuth } from "../contexts/AuthContext"; // استيراد سياق المصادقة للحصول على حالة المصادقة والأذونات
import Dashboard from "../pages/Dashboard"; // استيراد صفحة لوحة التحكم
import WorkoutPlans from "../pages/WorkoutPlans"; // استيراد صفحة خطط التمارين
import NutritionPlans from "../pages/NutritionPlans"; // استيراد صفحة خطط التغذية
import UsersManagement from "../pages/UsersManagement"; // استيراد صفحة إدارة المستخدمين
import Settings from "../pages/Settings"; // استيراد صفحة الإعدادات
import AttendancePage from "../pages/AttendancePage"; // استيراد صفحة الحضور
import Login from "../pages/Login"; // استيراد صفحة تسجيل الدخول
import { UserRole } from "../types/user"; // استيراد أنواع المستخدمين

const AppRoutes: React.FC = () => {
  const { isAuthenticated, hasPermission } = useAuth(); // الحصول على حالة المصادقة والأذونات من سياق المصادقة

  // إذا لم يكن المستخدم مصدقًا
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} /> {/* مسار تسجيل الدخول */}
        <Route path="*" element={<Navigate to="/login" replace />} />{" "}
        {/* إعادة توجيه أي مسار آخر إلى صفحة تسجيل الدخول */}
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />{" "}
      {/* مسار لوحة التحكم */}
      <Route path="/workouts" element={<WorkoutPlans />} />{" "}
      {/* مسار خطط التمارين */}
      <Route path="/nutrition" element={<NutritionPlans />} />{" "}
      {/* مسار خطط التغذية */}
      <Route path="/attendance" element={<AttendancePage />} />{" "}
      {/* مسار صفحة الحضور */}
      <Route
        path="/users"
        element={
          hasPermission(UserRole.ADMIN) ? ( // إذا كان لدى المستخدم أذونات الإدارة
            <UsersManagement /> // عرض صفحة إدارة المستخدمين
          ) : (
            <Navigate to="/dashboard" replace /> // إعادة توجيه إلى لوحة التحكم إذا لم يكن لديه أذونات الإدارة
          )
        }
      />
      <Route path="/settings" element={<Settings />} /> {/* مسار الإعدادات */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />{" "}
      {/* إعادة توجيه إلى لوحة التحكم عند الوصول إلى الجذر */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />{" "}
      {/* إعادة توجيه أي مسار آخر إلى لوحة التحكم */}
    </Routes>
  );
};

export default AppRoutes;
