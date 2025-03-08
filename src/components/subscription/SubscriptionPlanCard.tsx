// هذا الكمبوننت يقوم بعرض خطة اشتراك في خدمات اللياقة البدنية أو التغذية.
// يحتوي على تفاصيل الخطة مثل الاسم، السعر، الميزات، ووصف الخطة.
// كما يسمح للمستخدم بالاشتراك في الخطة إذا لم يكن مشتركًا بالفعل.

import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FitnessCenter, Restaurant, CheckCircle } from "@mui/icons-material";
import { SubscriptionPlan } from "../../types/subscription";

// تعريف واجهة للخصائص المدخلة إلى الكمبوننت
interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan; // الخطة التي سيتم عرضها
  onSubscribe: (planId: string) => void; // دالة الاشتراك
  isSubscribed?: boolean; // حالة الاشتراك
}

// الكمبوننت الرئيسي
const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  plan,
  onSubscribe,
  isSubscribed,
}) => {
  // دالة لتحديد تسميات نوع الخطة
  const getTypeLabel = () => {
    switch (plan.type) {
      case "per-session":
        return `${plan.sessions} Sessions`; // عدد الجلسات
      case "monthly":
        return "Monthly"; // خطة شهرية
      case "package":
        return `${plan.duration} Days Package`; // حزمة لعدد معين من الأيام
    }
  };

  // دالة للحصول على أيقونات الميزات
  const getFeaturesIcon = () => {
    switch (plan.features) {
      case "workout":
        return <FitnessCenter />; // أيقونة التدريب
      case "nutrition":
        return <Restaurant />; // أيقونة التغذية
      case "both":
        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <FitnessCenter />
            <Restaurant />
          </Box>
        ); // أيقونتان للتدريب والتغذية
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {isSubscribed && ( // إذا كان المستخدم مشتركًا بالفعل، عرض شريحة تشير إلى ذلك
        <Chip
          label="Current Plan"
          color="primary"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {plan.name}
          {/* // عرض اسم الخطة */}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" component="span">
            ${plan.price}
            {/* // عرض سعر الخطة */}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ ml: 1 }}>
            / {getTypeLabel()}
            {/* // عرض نوع الخطة */}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Chip
            icon={getFeaturesIcon()} // عرض أيقونة الميزات
            label={
              plan.features === "both" ? "Workout & Nutrition" : plan.features
            }
            color="secondary"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>
          {plan.description}
          {/* // عرض وصف الخطة */}
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
              {/* // أيقونة علامة النجاح */}
            </ListItemIcon>
            <ListItemText
              primary={`Access to ${
                plan.features === "both" ? "all" : plan.features
              } programs`} // عرض البرامج المتاحة
            />
          </ListItem>
          {plan.features === "both" && (
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText primary="Personalized nutrition plan" />
              {/* // عرض خطة */}
              تغذية شخصية إذا كانت الميزات تشمل كليهما
            </ListItem>
          )}
        </List>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => onSubscribe(plan.id)} // عند الضغط، تنفيذ دالة الاشتراك
          disabled={isSubscribed} // تعطيل الزر إذا كان المستخدم مشتركًا بالفعل
        >
          {isSubscribed ? "Current Plan" : "Subscribe Now"}
          {/* // تغيير نص الزر حسب */}
          حالة الاشتراك
        </Button>
      </CardActions>
    </Card>
  );
};

export default SubscriptionPlanCard; // تصدير الكمبوننت
