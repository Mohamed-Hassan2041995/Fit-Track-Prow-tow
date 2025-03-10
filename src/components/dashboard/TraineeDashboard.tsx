/**
 * كمبوننت لوحة التحكم للمتدرب
 * يوفر نظرة عامة على تقدم المتدرب وخططه
 * الميزات:
 * - تتبع التقدم
 * - خطة التمرين الحالية
 * - خطة التغذية الحالية
 * - إحصائيات المتدرب
 */
import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import MyProgress from "./trainee/MyProgress";
import CurrentWorkoutPlan from "./trainee/CurrentWorkoutPlan";
import CurrentNutritionPlan from "./trainee/CurrentNutritionPlan";
import TraineeStats from "./stats/TraineeStats";

const TraineeDashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        لوحة التحكم الخاصة بي
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <TraineeStats />
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <MyProgress />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <CurrentWorkoutPlan />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <CurrentNutritionPlan />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TraineeDashboard;
