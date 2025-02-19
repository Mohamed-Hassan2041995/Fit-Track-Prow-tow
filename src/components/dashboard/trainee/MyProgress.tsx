// هذا الكمبوننت يعرض تقدم المستخدم في تحقيق أهدافه، مثل وزن الجسم، اكتمال التمارين، وهدف السعرات الحرارية.
import React from "react";
import { Box, Typography, LinearProgress, Grid } from "@mui/material";

// تعريف هيكل بيانات مقياس التقدم
interface ProgressMetric {
  label: string; // وصف الهدف (مثل: هدف الوزن)
  current: number; // القيمة الحالية
  target: number; // القيمة المستهدفة
  unit: string; // وحدة القياس (مثل: كجم، جلسات)
  color: string; // لون شريط التقدم
}

const MyProgress: React.FC = () => {
  // TODO: استبدل هذا بالاستدعاء الفعلي للـ API
  const metrics: ProgressMetric[] = [
    {
      label: "هدف الوزن",
      current: 75,
      target: 70,
      unit: "كجم",
      color: "#1976d2",
    },
    {
      label: "اكتمال التمارين",
      current: 8,
      target: 12,
      unit: "جلسات",
      color: "#2e7d32",
    },
    {
      label: "هدف السعرات الحرارية",
      current: 1800,
      target: 2000,
      unit: "سعرة حرارية",
      color: "#ed6c02",
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        تقدمي
      </Typography>

      <Grid container spacing={3}>
        {metrics.map((metric) => (
          <Grid item xs={12} key={metric.label}>
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">{metric.label}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {metric.current} / {metric.target} {metric.unit}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(metric.current / metric.target) * 100}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  bgcolor: `${metric.color}22`,
                  "& .MuiLinearProgress-bar": {
                    bgcolor: metric.color,
                    borderRadius: 5,
                  },
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyProgress;
