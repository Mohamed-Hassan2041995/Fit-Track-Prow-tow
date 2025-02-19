// استيراد مكتبة React وبعض المكونات من مكتبة MUI
import React from "react";
import { Grid } from "@mui/material"; // استيراد Grid من مكتبة MUI
import {
  People,
  FitnessCenter,
  AttachMoney,
  TrendingUp,
} from "@mui/icons-material"; // استيراد أيقونات من مكتبة أيقونات MUI
import StatisticsCard from "./StatisticsCard"; // استيراد مكون StatisticsCard
import RevenueChart from "./RevenueChart"; // استيراد مكون RevenueChart
import { useAdminStats } from "../hooks/useAdminStats"; // استيراد هوك useAdminStats للحصول على إحصائيات الإدارة

const AdminDashboardStats: React.FC = () => {
  // استخدام هوك الحصول على إحصائيات الإدارة
  const { stats, revenueData, loading } = useAdminStats();

  // إذا كانت البيانات قيد التحميل، إرجاع null (لا شيء)
  if (loading) return null;

  return (
    <Grid container spacing={3}>
      {" "}
      {/* استخدام Grid لإنشاء تخطيط مرن */}
      {/* بطاقة إحصائيات للمستخدمين النشطين */}
      <Grid item xs={12} sm={6} md={3}>
        <StatisticsCard
          title="Active Users" // عنوان البطاقة
          value={stats.activeUsers} // القيمة المعروضة
          total={stats.totalUsers} // العدد الإجمالي
          icon={<People fontSize="large" />} // أيقونة المستخدمين
          color="#1976d2" // لون البطاقة
        />
      </Grid>
      {/* بطاقة إحصائيات للمدربين النشطين */}
      <Grid item xs={12} sm={6} md={3}>
        <StatisticsCard
          title="Active Trainers"
          value={stats.activeTrainers}
          total={stats.totalTrainers}
          icon={<FitnessCenter fontSize="large" />} // أيقونة المدرب
          color="#2e7d32" // لون البطاقة
        />
      </Grid>
      {/* بطاقة إحصائيات للإيرادات الشهرية */}
      <Grid item xs={12} sm={6} md={3}>
        <StatisticsCard
          title="Monthly Revenue"
          value={stats.monthlyRevenue}
          icon={<AttachMoney fontSize="large" />} // أيقونة المال
          color="#ed6c02" // لون البطاقة
        />
      </Grid>
      {/* بطاقة إحصائيات لمعدل النمو */}
      <Grid item xs={12} sm={6} md={3}>
        <StatisticsCard
          title="Growth Rate"
          value={stats.growthRate}
          icon={<TrendingUp fontSize="large" />} // أيقونة النمو
          color="#9c27b0" // لون البطاقة
        />
      </Grid>
      {/* الرسم البياني للإيرادات */}
      <Grid item xs={12}>
        <RevenueChart data={revenueData} />{" "}
        {/* تمرير بيانات الإيرادات للرسم البياني */}
      </Grid>
    </Grid>
  );
};

export default AdminDashboardStats; // تصدير المكون
