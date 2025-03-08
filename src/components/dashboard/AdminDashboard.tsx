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
import RatingList from "../ratingDeleted/RatingList";
import UserActivityReport from "../reports/UserActivityReport";
import UserDetailedReport from "../reports/UserDetailedReport";
import ReportsPage from "../../pages/ReportsPage";
import PaymentForm from "../subscription/PaymentForm";
import PaymentHistory from "../subscription/PaymentHistory";
import SubscriptionPlanCard from "../subscription/SubscriptionPlanCard";
import SubscriptionPlanForm from "../subscription/SubscriptionPlanForm";
import SupportTicketForm from "../support/SupportTicketForm";
import ChangePasswordDialog from "../users/ChangePasswordDialog";
import AdminDashboardStats from "../../features/admin/components/AdminDashboardStats";
import RevenueChart from "../../features/admin/components/RevenueChart";
import SubscriptionDetails from "../../features/subscriptions/components/SubscriptionDetails";
import ProgressChart from "../analytics/ProgressChart";
// import RatingForm from "../../features/ratings/components/RatingForm";
// import RatingForm from "../rating/RatingForm";
// import RatingDisplay from "../rating/RatingDisplay";
// import MeasurementHistory from "../measurements/MeasurementHistory";
// import InBodyForm from "../measurements/InBodyForm";
// import WorkoutPlanListItem from "../features/workout/WorkoutPlanListItem";
// import WorkoutGrid from "../features/workout/WorkoutGrid";
// import ExerciseCard from "../features/workout/ExerciseCard";
// import AIRecommendationCard from "../features/ai/AIRecommendationCard";
// import ActivityListItem from "./activity/ActivityListItem";
// import AIRecommendationCard from "../common/AIRecommendationCard";
// import NotificationBell from "../notifications/NotificationBell";

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
      {/* <AIRecommendationCard recommendation={"hassan"} /> */}
      {/* <AIRecommendationCard
        title={"hassan"}
        recommendations={["recommendation 1", "recommendation 2"]}
        type={"info"}
      /> */}
      {/* <ActivityListItem
        activity={{
          id: "1",
          type: "workout",
          description: "Workout",
          timestamp: new Date(),
        }}
      /> */}
      {/* <ExerciseCard exercise={{ name: "Bench Press", sets: 3, reps: 10 }} /> */}
      {/* <WorkoutGrid
        exercises={[
          {
            name: "Bench Press",
            sets: 3,
            reps: 10,
            id: "",
          },
        ]}
      /> */}
      {/* <WorkoutPlanListItem plan={{ name: "Workout Plan", status: "active" }} /> */}
      {/* <InBodyForm traineeId="" onSubmit={() => {}} /> */}
      {/* <MeasurementHistory measurements={[]} /> */}
      {/* <NotificationBell /> */}
      {/* <RatingDisplay
        stats={{
          totalRatings: 0,
          averageScore: 0,
          breakdown: {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
          },
        }}
      /> */}
      {/* <RatingForm targetId="" onSuccess={() => {}} /> */}
      {/* <RatingForm targetId={""} /> */}
      {/* <RatingList ratings={[ ]} /> */}
      {/* <UserActivityReport userId="1" userType="trainer" /> */}
      {/* <UserDetailedReport userId="1" userType="trainer" /> */}
      {/* <ReportsPage /> */}
      {/* <PaymentForm
        subscriptionId="1"
        onSuccess={() => {}}
        amount={0}
        // currency="USD"
      /> */}
      {/* <PaymentHistory payments={[]} /> */}
      {/* <SubscriptionPlanCard plan={{ id: "1" }} onSubscribe={() => {}} /> */}
      {/* <SubscriptionPlanForm
        initialValues={{}}
        onSubmit={() => {}}
        onCancel={() => {}}
      /> */}
      {/* <SupportTicketForm /> */}
      {/* <ChangePasswordDialog
        open={false}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      /> */}
      {/* <AdminDashboardStats /> */}
      {/* <RevenueChart data={[]} /> */}
      {/* <SubscriptionDetails subscription={undefined} /> */}
      {/* <ProgressChart
        data={{
          trends: [
            { date: "2024-03-01", value: 75 },
            { date: "2024-03-02", value: 73 },
            { date: "2024-03-03", value: 60 },
            { date: "2024-03-04", value: 50 },
            { date: "2024-03-05", value: 40 },
            { date: "2024-03-06", value: 30 },
            { date: "2024-03-07", value: 80 },
          ],
          strengthProgress: 80,
          enduranceProgress: 70,
          weightProgress: 60,
          overallProgress: 72,
        }}
        title={"hd"}
      /> */}
    </Box>
  );
};

export default AdminDashboard;
