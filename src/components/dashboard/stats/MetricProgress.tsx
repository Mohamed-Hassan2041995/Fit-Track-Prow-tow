/**
 * مكون MetricProgress:
 * - يعرض تقدم مقياس معين كنسبة مئوية باستخدام شريط تقدم (LinearProgress).
 * - يعرض اسم المقياس والقيمة الحالية مقارنة بالقيمة الكلية.
 * - يستخدم `MUI` لإنشاء تصميم مرن ومتناسق.
 * - يدعم تخصيص اللون بناءً على نوع المقياس.
 */

import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { SystemMetric } from "../../../types/dashboard";

// تعريف الواجهة الخاصة بخصائص المكون
interface MetricProgressProps {
  metric: SystemMetric; // كائن يحتوي على بيانات المقياس
}

// مكون MetricProgress: لعرض نسبة تقدم مقياس معين داخل لوحة التحكم
const MetricProgress: React.FC<MetricProgressProps> = ({ metric }) => {
  return (
    <Box sx={{ mt: 3 }}>
      {/* عنوان المقياس والقيمة */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {metric.label} {/* اسم المقياس */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {metric.value}% {/* القيمة الحالية للمقياس */}
        </Typography>
      </Box>

      {/* شريط التقدم */}
      <LinearProgress
        variant="determinate"
        value={(metric.value / metric.total) * 100} // حساب النسبة المئوية
        sx={{
          height: 8, // ارتفاع شريط التقدم
          borderRadius: 5, // تدوير الحواف
          bgcolor: `${metric.color}22`, // لون خلفية الشريط بناءً على المقياس
          "& .MuiLinearProgress-bar": {
            bgcolor: metric.color, // لون الشريط الداخلي
            borderRadius: 5,
          },
        }}
      />
    </Box>
  );
};

export default MetricProgress;
