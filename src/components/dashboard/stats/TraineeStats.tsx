/**
 * مكون TraineeStats:
 * - يعرض إحصائيات المتدرب مثل عدد التمارين المكتملة، ساعات التدريب، ونسبة التقدم.
 * - يستخدم `SummaryCard` لعرض كل مقياس بشكل منفصل مع أيقونة ولون محددين.
 * - يستخدم `Grid` من MUI لتنظيم البطاقات بشكل متجاوب.
 */

import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { EmojiEvents, Timer, TrendingUp } from "@mui/icons-material";
import SummaryCard from "../common/SummaryCard";

const TraineeStats: React.FC = () => {
  return (
    <Box>
      {/* عنوان القسم */}
      <Typography variant="h6" gutterBottom>
        My Achievements
      </Typography>

      {/* تنظيم البطاقات داخل Grid ليكون التصميم متجاوبًا */}
      <Grid container spacing={2}>
        {/* البطاقة الأولى: عدد التمارين المكتملة */}
        <Grid item xs={12}>
          <SummaryCard
            icon={<EmojiEvents sx={{ fontSize: 40 }} />}
            title="Completed Workouts"
            value={24}
            color="#1976d2"
          >
            <Typography variant="body2" color="text.secondary">
              This month
            </Typography>
          </SummaryCard>
        </Grid>

        {/* البطاقة الثانية: عدد ساعات التدريب */}
        <Grid item xs={12} sm={6}>
          <SummaryCard
            icon={<Timer sx={{ fontSize: 40 }} />}
            title="Training Hours"
            value={36}
            color="#2e7d32"
          />
        </Grid>

        {/* البطاقة الثالثة: نسبة التقدم */}
        <Grid item xs={12} sm={6}>
          <SummaryCard
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            title="Progress Score"
            value="85%"
            color="#ed6c02"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TraineeStats;
