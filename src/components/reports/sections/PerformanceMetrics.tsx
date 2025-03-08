/**
 * PerformanceMetrics
 *
 * هذا المكون يعرض مقاييس الأداء لمستخدم معين بناءً على بيانات يتم تمريرها إليه.
 * يستخدم هذا المكون مجموعة من عناصر MUI مثل Grid، Paper، CircularProgress، و LinearProgress
 * لعرض بيانات الأداء بطريقة منظمة وجذابة.
 *
 * المقاييس التي يتم عرضها:
 * 1. معدل الإنجاز - يتم عرضه باستخدام دائرة تقدمية CircularProgress.
 * 2. معدل الحضور - يتم عرضه باستخدام شريط تقدم LinearProgress.
 * 3. معدل الكثافة - يتم عرضه باستخدام شريط تقدم LinearProgress.
 * 4. تقدم الأهداف - يتم عرضه كمجموعة من الأهداف مع شريط تقدم لكل هدف.
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

// تعريف واجهة الخصائص التي يستقبلها المكون
interface PerformanceMetricsProps {
  metrics: Metrics;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  return (
    <Grid container spacing={3}>
      {/* معدل الإنجاز */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            معدل الإنجاز
          </Typography>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={metrics.completionRate}
              size={100}
              thickness={4}
              color="success"
            />
            {/* عرض القيمة داخل الدائرة */}
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
                {`${Math.round(metrics.completionRate)}%`}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      {/* معدل الحضور */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            معدل الحضور
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography color="text.secondary" gutterBottom>
              {metrics.attendanceRate}% معدل الحضور
            </Typography>
            <LinearProgress
              variant="determinate"
              value={metrics.attendanceRate}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        </Paper>
      </Grid>

      {/* معدل الكثافة */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            معدل الكثافة
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Box sx={{ flexGrow: 1, mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={metrics.averageIntensity}
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {metrics.averageIntensity}%
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* تقدم الأهداف */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            تقدم الأهداف
          </Typography>
          {metrics.goals.map((goal) => (
            <Box key={goal.name} sx={{ mb: 2 }}>
              {/* اسم الهدف ونسبة الإنجاز */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>{goal.name}</Typography>
                <Typography color="text.secondary">{goal.progress}%</Typography>
              </Box>
              {/* شريط التقدم الخاص بالهدف */}
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
