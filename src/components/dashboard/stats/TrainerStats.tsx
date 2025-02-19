/**
 * مكون TrainerStats:
 * - يعرض إحصائيات المدرب مثل عدد المتدربين النشطين، خطط التمارين، وخطط التغذية.
 * - يستخدم `SummaryCard` لعرض كل مقياس مع أيقونة ولون محددين.
 * - يتم تنظيم البطاقات داخل `Grid` ليكون التصميم متجاوبًا.
 */

import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { People, FitnessCenter, Restaurant } from "@mui/icons-material";
import SummaryCard from "../common/SummaryCard";

const TrainerStats: React.FC = () => {
  return (
    <Box>
      {/* عنوان القسم */}
      <Typography variant="h6" gutterBottom>
        My Statistics
      </Typography>

      {/* تنظيم البطاقات داخل Grid ليكون التصميم متجاوبًا */}
      <Grid container spacing={2}>
        {/* البطاقة الأولى: عدد المتدربين النشطين */}
        <Grid item xs={12}>
          <SummaryCard
            icon={<People sx={{ fontSize: 40 }} />}
            title="Active Trainees"
            value={12}
            color="#1976d2"
          >
            <Typography variant="body2" color="text.secondary">
              Total capacity: 15
            </Typography>
          </SummaryCard>
        </Grid>

        {/* البطاقة الثانية: عدد خطط التمارين النشطة */}
        <Grid item xs={12} sm={6}>
          <SummaryCard
            icon={<FitnessCenter sx={{ fontSize: 40 }} />}
            title="Active Workout Plans"
            value={8}
            color="#2e7d32"
          />
        </Grid>

        {/* البطاقة الثالثة: عدد خطط التغذية النشطة */}
        <Grid item xs={12} sm={6}>
          <SummaryCard
            icon={<Restaurant sx={{ fontSize: 40 }} />}
            title="Active Nutrition Plans"
            value={6}
            color="#ed6c02"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrainerStats;
