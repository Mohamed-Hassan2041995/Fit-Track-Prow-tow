/**
 * مكون SystemStats:
 * - يعرض إحصائيات النظام مثل الخطط النشطة، سعة المدربين، واستخدام النظام.
 * - يعتمد على مكون `MetricProgress` لعرض كل مقياس باستخدام شريط تقدم.
 * - يحتوي على بيانات افتراضية يمكن استبدالها ببيانات من API لاحقًا.
 */

import React from "react";
import { Box, Typography } from "@mui/material";
import MetricProgress from "./MetricProgress";
import { SystemMetric } from "../../../types/dashboard";

const SystemStats: React.FC = () => {
  // TODO: استبدال البيانات الافتراضية ببيانات حقيقية من API
  const metrics: SystemMetric[] = [
    {
      label: "Active Plans", // عدد الخطط النشطة
      value: 85, // القيمة الحالية
      total: 100, // القيمة القصوى
      color: "#1976d2", // اللون المستخدم في شريط التقدم
    },
    {
      label: "Trainer Capacity", // سعة المدربين
      value: 75,
      total: 100,
      color: "#2e7d32",
    },
    {
      label: "System Usage", // استخدام النظام
      value: 65,
      total: 100,
      color: "#ed6c02",
    },
  ];

  return (
    <Box>
      {/* عنوان القسم */}
      <Typography variant="h6" gutterBottom>
        System Statistics
      </Typography>

      {/* عرض المقاييس باستخدام مكون MetricProgress */}
      {metrics.map((metric) => (
        <MetricProgress
          key={metric.label} // تعيين مفتاح فريد لكل مقياس
          metric={metric} // تمرير بيانات المقياس إلى مكون MetricProgress
        />
      ))}
    </Box>
  );
};

export default SystemStats;
