/**
 * مكون PerformanceMetrics يعرض إحصائيات أداء المستخدم في التطبيق.
 * يحتوي على ثلاثة أقسام رئيسية:
 * 1. معدل الإنجاز: يتم عرضه باستخدام شريط تقدم دائري CircularProgress.
 * 2. معدل الحضور: يتم عرضه باستخدام شريط تقدم خطي LinearProgress.
 * 3. تقدم الأهداف: يتم عرض قائمة بالأهداف مع شريط تقدم خطي لكل هدف.
 *
 * يعتمد المكون على بيانات يتم تمريرها عبر الـ props من نوع PerformanceMetrics.
 */

import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { PerformanceMetrics as Metrics } from "../../../types/analytics";

// تعريف واجهة `PerformanceMetricsProps` التي تحتوي على بيانات الأداء المطلوبة لعرضها في المكون
interface PerformanceMetricsProps {
  metrics: Metrics; // بيانات الأداء مثل معدل الإنجاز، معدل الحضور، وتقدم الأهداف
}

// مكون `PerformanceMetrics` المسؤول عن عرض الإحصائيات المختلفة لأداء المستخدم
const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  return (
    <Grid container spacing={3}>
      {/* القسم الأول: معدل الإنجاز */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            معدل الإنجاز
          </Typography>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            {/* عنصر CircularProgress لعرض معدل الإنجاز كنسبة مئوية */}
            <CircularProgress
              variant="determinate"
              value={metrics.completionRate} // تحديد القيمة بناءً على البيانات المستلمة
              size={100}
              thickness={4}
              color="success"
            />
            {/* صندوق يحتوي على النسبة المئوية بداخل الدائرة */}
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" component="div" color="text.secondary">
                {`${Math.round(metrics.completionRate)}%`}{" "}
                {/* عرض النسبة المئوية كنص */}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      {/* القسم الثاني: معدل الحضور */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            معدل الحضور
          </Typography>
          <Box sx={{ mb: 2 }}>
            {/* عرض معدل الحضور كنص */}
            <Typography color="text.secondary" gutterBottom>
              {metrics.attendanceRate}% معدل الحضور
            </Typography>
            {/* عنصر LinearProgress لتمثيل معدل الحضور بشريط تقدم خطي */}
            <LinearProgress
              variant="determinate"
              value={metrics.attendanceRate}
              sx={{ height: 8, borderRadius: 4 }} // ضبط الارتفاع وإضافة زوايا مستديرة
            />
          </Box>
        </Paper>
      </Grid>

      {/* القسم الثالث: تقدم الأهداف */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            تقدم الأهداف
          </Typography>
          {/* تكرار عبر قائمة الأهداف وعرض كل هدف مع نسبة تقدمه */}
          {metrics.goals.map((goal) => (
            <Box key={goal.name} sx={{ mb: 2 }}>
              {/* عرض اسم الهدف ونسبة التقدم بجانب بعضهما */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>{goal.name}</Typography>
                <Typography color="text.secondary">{goal.progress}%</Typography>
              </Box>
              {/* عنصر LinearProgress لتمثيل نسبة تقدم كل هدف */}
              <LinearProgress
                variant="determinate"
                value={goal.progress}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PerformanceMetrics;
