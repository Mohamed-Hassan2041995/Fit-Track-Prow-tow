/**
 * كمبوننت لوحة التحكم للمدرب
 * يوفر نظرة عامة على نشاطات المدرب والمتدربين
 * الميزات:
 * - إحصائيات المدرب
 * - قائمة المتدربين
 * - خطط التمرين النشطة
 * - خطط التغذية النشطة
 */
import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import MyTraineesList from "./trainer/MyTraineesList";
import ActiveWorkoutPlans from "./trainer/ActiveWorkoutPlans";
import ActiveNutritionPlans from "./trainer/ActiveNutritionPlans";
import TrainerStats from "./stats/TrainerStats";

const TrainerDashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        لوحة التحكم للمدرب
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <TrainerStats />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <MyTraineesList />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <ActiveWorkoutPlans />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <ActiveNutritionPlans />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrainerDashboard;
