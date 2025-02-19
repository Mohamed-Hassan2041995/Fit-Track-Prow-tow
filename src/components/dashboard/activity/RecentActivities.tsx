/**
 * مكون RecentActivities:
 * - يعرض قائمة بأحدث الأنشطة التي تمت في النظام.
 * - يتكون من قائمة تحتوي على عناصر نشاط، حيث يتم عرض أيقونة النشاط ولونه المناسب.
 * - يعرض وصف النشاط وتوقيته بشكل منسق.
 * - يستخدم مكتبة MUI لإنشاء تصميم متناسق وسهل القراءة.
 * - يحتوي على بيانات تجريبية يمكن استبدالها ببيانات من API مستقبلاً.
 */

import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { FitnessCenter, Restaurant, Person, Edit } from "@mui/icons-material";
import { format } from "date-fns";

// تعريف نوع النشاط
interface Activity {
  id: string;
  type: "workout" | "nutrition" | "user" | "system";
  description: string;
  timestamp: Date;
}

// مكون يعرض قائمة بالأنشطة الأخيرة
const RecentActivities: React.FC = () => {
  // بيانات تجريبية (يجب استبدالها باستدعاء API لاحقًا)
  const activities: Activity[] = [
    {
      id: "1",
      type: "workout",
      description: "New workout plan created for John Doe",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "nutrition",
      description: "Nutrition plan updated for Jane Smith",
      timestamp: new Date(Date.now() - 3600000), // قبل ساعة
    },
    {
      id: "3",
      type: "user",
      description: "New trainer registered: Mike Johnson",
      timestamp: new Date(Date.now() - 7200000), // قبل ساعتين
    },
  ];

  // دالة لإرجاع الأيقونة المناسبة بناءً على نوع النشاط
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "workout":
        return <FitnessCenter />;
      case "nutrition":
        return <Restaurant />;
      case "user":
        return <Person />;
      default:
        return <Edit />;
    }
  };

  // دالة لإرجاع لون الأيقونة بناءً على نوع النشاط
  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "workout":
        return "#1976d2"; // أزرق للتمارين
      case "nutrition":
        return "#2e7d32"; // أخضر للتغذية
      case "user":
        return "#ed6c02"; // برتقالي للمستخدمين
      default:
        return "#757575"; // رمادي للنظام أو الافتراضي
    }
  };

  return (
    <>
      {/* عنوان القائمة */}
      <Typography variant="h6" gutterBottom>
        Recent Activities
      </Typography>

      {/* قائمة الأنشطة */}
      <List>
        {activities.map((activity, index) => (
          <React.Fragment key={activity.id}>
            <ListItem alignItems="flex-start">
              {/* صورة رمزية مع أيقونة النشاط */}
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: getActivityColor(activity.type) }}>
                  {getActivityIcon(activity.type)}
                </Avatar>
              </ListItemAvatar>

              {/* وصف النشاط وتاريخه */}
              <ListItemText
                primary={activity.description}
                secondary={format(activity.timestamp, "PPp")} // تنسيق التاريخ
              />
            </ListItem>

            {/* إضافة خط فاصل بين العناصر ما عدا الأخير */}
            {index < activities.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default RecentActivities;
