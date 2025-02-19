/**
 * مكون تفاصيل الاشتراك (SubscriptionDetails)
 *
 * يعرض هذا المكون تفاصيل اشتراك المتدرب، بما في ذلك نوع
 * الاشتراك، حالته، تاريخ انتهاء الصلاحية، وعدد الجلسات المتبقية
 * (إذا كان الاشتراك يعتمد على الجلسات). كما يظهر تقدم الاشتراك
 * في شكل شريط تقدم. يعتمد المكون على مكتبة MUI لتصميم الواجهة.
 */

import React from "react";
import {
  Paper,
  Typography,
  Box,
  Chip,
  Grid,
  LinearProgress,
} from "@mui/material";
import { TraineeSubscription } from "../../../types/subscription"; // استيراد نوع الاشتراك
import { formatDate } from "../../../utils/formatters"; // استيراد دالة تنسيق التاريخ

// واجهة خصائص مكون تفاصيل الاشتراك
interface SubscriptionDetailsProps {
  subscription: TraineeSubscription; // الاشتراك الخاص بالمتدرب
}

// مكون تفاصيل الاشتراك
const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  subscription,
}) => {
  // دالة لتحديد لون الحالة بناءً على حالة الاشتراك
  const getStatusColor = () => {
    switch (subscription.status) {
      case "active":
        return "success"; // حالة نشطة
      case "expired":
        return "error"; // حالة منتهية
      case "cancelled":
        return "warning"; // حالة ملغاة
      default:
        return "default"; // حالة افتراضية
    }
  };

  // دالة لحساب نسبة التقدم في الاشتراك
  const calculateProgress = () => {
    if (subscription.type === "per-session") {
      // إذا كان الاشتراك يعتمد على الجلسات
      return (
        ((subscription.totalSessions - subscription.remainingSessions) /
          subscription.totalSessions) *
        100
      );
    }

    // إذا كان الاشتراك يعتمد على الوقت
    const total =
      subscription.endDate.getTime() - subscription.startDate.getTime(); // إجمالي الوقت
    const elapsed = Date.now() - subscription.startDate.getTime(); // الوقت المنقضي
    return Math.min((elapsed / total) * 100, 100); // حساب النسبة المئوية للتقدم
  };

  return (
    <Paper sx={{ p: 3 }}>
      {" "}
      {/* ورقة MUI لتغليف المكون */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        {" "}
        {/* صندوق لعرض العنوان والحالة */}
        <Typography variant="h6">Current Subscription</Typography>
        <Chip
          label={subscription.status} // عرض الحالة
          color={getStatusColor()} // تعيين لون الحالة
        />
      </Box>
      <Grid container spacing={3}>
        {" "}
        {/* شبكة MUI لترتيب المحتويات */}
        <Grid item xs={12} md={6}>
          {" "}
          {/* عنصر شبكة لعرض نوع الاشتراك */}
          <Typography color="text.secondary" gutterBottom>
            Plan Type
          </Typography>
          <Typography variant="body1">
            {subscription.plan.name} {/* اسم خطة الاشتراك */}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          {" "}
          {/* عنصر شبكة لعرض تاريخ انتهاء الاشتراك */}
          <Typography color="text.secondary" gutterBottom>
            Valid Until
          </Typography>
          <Typography variant="body1">
            {formatDate(subscription.endDate)}{" "}
            {/* تاريخ انتهاء الاشتراك بتنسيق مناسب */}
          </Typography>
        </Grid>
        {subscription.type === "per-session" && ( // إذا كان الاشتراك يعتمد على الجلسات
          <Grid item xs={12}>
            <Typography color="text.secondary" gutterBottom>
              Remaining Sessions
            </Typography>
            <Typography variant="body1">
              {subscription.remainingSessions} / {subscription.totalSessions}{" "}
              {/* عدد الجلسات المتبقية */}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          {" "}
          {/* عنصر شبكة لعرض شريط التقدم */}
          <Typography color="text.secondary" gutterBottom>
            Progress
          </Typography>
          <LinearProgress
            variant="determinate"
            value={calculateProgress()} // تعيين قيمة شريط التقدم
            sx={{ height: 8, borderRadius: 4 }} // تعيين ارتفاع وشكل شريط التقدم
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SubscriptionDetails; // تصدير المكون
