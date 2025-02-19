// مكون ActivityTimeline
// وظيفة المكون:
// - عرض نشاطات المستخدم على شكل مخطط زمني (Timeline).
// - كل نشاط يحتوي على أيقونة، عنوان، تاريخ، وصف، وحالة النشاط (إذا كانت متوفرة).
// - يستخدم مكونات MUI Lab لإنشاء المخطط الزمني، مع تخصيص الألوان والأيقونات بناءً على نوع النشاط.

import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab"; // استيراد مكونات المخطط الزمني من MUI Lab
import { Typography, Box, Chip } from "@mui/material"; // استيراد مكونات التصميم من MUI
import {
  FitnessCenter,
  Restaurant,
  Event,
  Assessment,
} from "@mui/icons-material"; // استيراد الأيقونات الخاصة بالنشاطات
import { formatDate } from "../../../utils/formatters"; // دالة لتنسيق التاريخ
import { Activity } from "../../../types/report"; // تعريف نوع النشاط (Activity)

// تعريف الخصائص (Props) التي يستقبلها المكون
interface ActivityTimelineProps {
  activities: Activity[]; // مصفوفة من الأنشطة التي سيتم عرضها
}

// دالة لإرجاع الأيقونة المناسبة حسب نوع النشاط
const getActivityIcon = (type: string) => {
  switch (type) {
    case "workout":
      return <FitnessCenter />;
    case "nutrition":
      return <Restaurant />;
    case "assessment":
      return <Assessment />;
    default:
      return <Event />;
  }
};

// دالة لإرجاع اللون المناسب حسب نوع النشاط
const getActivityColor = (type: string) => {
  switch (type) {
    case "workout":
      return "primary"; // التمارين الرياضية باللون الأساسي
    case "nutrition":
      return "success"; // التغذية باللون الأخضر
    case "assessment":
      return "warning"; // التقييمات باللون البرتقالي
    default:
      return "info"; // باقي الأنشطة باللون الأزرق
  }
};

// تعريف مكون ActivityTimeline
const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  return (
    <Timeline>
      {" "}
      {/* عنصر المخطط الزمني */}
      {activities.map((activity, index) => (
        <TimelineItem key={activity.id}>
          {" "}
          {/* عنصر فردي داخل المخطط الزمني */}
          <TimelineSeparator>
            <TimelineDot color={getActivityColor(activity.type)}>
              {" "}
              {/* النقطة الخاصة بالنشاط */}
              {getActivityIcon(activity.type)} {/* أيقونة النشاط */}
            </TimelineDot>
            {index < activities.length - 1 && <TimelineConnector />}{" "}
            {/* خط الوصل بين النقاط */}
          </TimelineSeparator>
          <TimelineContent>
            <Box sx={{ mb: 2 }}>
              {" "}
              {/* صندوق يحتوي على تفاصيل النشاط */}
              <Typography variant="h6" component="span">
                {activity.title} {/* عنوان النشاط */}
              </Typography>
              <Typography color="text.secondary" display="block">
                {formatDate(activity.timestamp)}{" "}
                {/* تاريخ النشاط بتنسيق مناسب */}
              </Typography>
              <Typography>{activity.description}</Typography> {/* وصف النشاط */}
              {activity.status /* إذا كانت هناك حالة للنشاط، يتم عرضها على شكل شارة */ && (
                <Chip
                  label={activity.status} // نص الحالة (مثل "completed")
                  color={
                    activity.status === "completed" ? "success" : "default"
                  } // لون الحالة
                  size="small"
                  sx={{ mt: 1 }}
                />
              )}
            </Box>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default ActivityTimeline; // تصدير المكون لاستخدامه في أجزاء أخرى من التطبيق
