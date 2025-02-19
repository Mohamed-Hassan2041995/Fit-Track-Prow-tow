/**
 * مكون ActivityListItem:
 * - يعرض عنصرًا يمثل نشاطًا معينًا داخل قائمة الأنشطة.
 * - يحتوي على أيقونة النشاط داخل صورة رمزية (Avatar) بلون مناسب.
 * - يعرض وصف النشاط وتاريخه بتنسيق مناسب.
 * - يستخدم مكتبة MUI لإنشاء تصميم متناسق مع باقي الواجهة.
 */

import React from "react";
import { ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import { format } from "date-fns";
import ActivityIcon, { getActivityColor } from "./ActivityIcon";
import { ActivityLog } from "../../../types/dashboard";

// تعريف نوع الخصائص التي يستقبلها المكون
interface ActivityListItemProps {
  activity: ActivityLog;
}

// مكون React يعرض عنصر نشاط داخل قائمة
const ActivityListItem: React.FC<ActivityListItemProps> = ({ activity }) => {
  return (
    <ListItem alignItems="flex-start">
      {/* صورة رمزية تحتوي على أيقونة النشاط مع لون مميز */}
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: getActivityColor(activity.type) }}>
          <ActivityIcon type={activity.type} />
        </Avatar>
      </ListItemAvatar>

      {/* نص يحتوي على وصف النشاط وتاريخه */}
      <ListItemText
        primary={activity.description} // عنوان النشاط
        secondary={format(activity.timestamp, "PPp")} // تنسيق التاريخ
      />
    </ListItem>
  );
};

export default ActivityListItem;
