/**
 * مكون لوحة معلومات المسؤول
 * يوفر نظرة عامة على النظام وأدوات الإدارة
 * الميزات:
 * - إحصائيات النظام
 * - ملخصات المستخدم
 * - الأنشطة الأخيرة
 * - مقاييس الأداء */
import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import UsersSummary from "./summary/UsersSummary";
import TrainersSummary from "./summary/TrainersSummary";
import TraineesSummary from "./summary/TraineesSummary";
import RecentActivities from "./activity/RecentActivities";
import SystemStats from "./stats/SystemStats";

const AdminDashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        System Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <UsersSummary />
        </Grid>
        <Grid item xs={12} md={4}>
          <TrainersSummary />
        </Grid>
        <Grid item xs={12} md={4}>
          <TraineesSummary />
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <RecentActivities />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <SystemStats />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
