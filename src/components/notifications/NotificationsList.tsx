import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import Notification from "../../types/notification"; // استيراد نوع الإشعار
import { formatTimeAgo } from "../../utils/formatters"; // استيراد دالة لتنسيق الوقت

// البيانات الوهمية
const fakeNotifications: Notification[] = [
  {
    id: "1",
    message: "تم إضافة تمرين جديد إلى جدولك",
    created_at: "2025-03-08T12:00:00Z",
    read: false,
  },
  {
    id: "2",
    message: "تم تحديث بيانات التمرين الخاصة بك",
    created_at: "2025-03-07T15:30:00Z",
    read: true,
  },
  {
    id: "3",
    message: "حان الوقت للتمرين اليوم",
    created_at: "2025-03-06T08:00:00Z",
    read: false,
  },
  {
    id: "4",
    message: "حان الوقت للتمرين اليوم",
    created_at: "2025-03-06T08:00:00Z",
    read: false,
  },
  {
    id: "5",
    message: "حان الوقت للتمرين اليوم",
    created_at: "2025-03-06T08:00:00Z",
    read: false,
  },
  {
    id: "6",
    message: "حان الوقت للتمرين اليوم",
    created_at: "2025-03-06T08:00:00Z",
    read: false,
  },
];
// تعديل: إضافة props لإستقبال notifications و onMarkAsRead
interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

// مكون NotificationsList
const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onMarkAsRead,
}) => {
  const markAsRead = (id: string) => {
    // في حالة الضغط على الإغلاق، يتم تحديث الإشعار
    console.log(`تم تحديد الإشعار كمقروء: ${id}`);
  };

  return (
    <Paper>
      <List>
        {fakeNotifications.map((notification) => (
          <ListItem
            key={notification.id}
            sx={{
              bgcolor: notification.read ? "transparent" : "action.hover", // تغيير الخلفية حسب حالة القراءة
            }}
          >
            <ListItemIcon>
              <NotificationsIcon
                color={notification.read ? "disabled" : "primary"}
              />
            </ListItemIcon>
            <ListItemText
              primary={notification.message}
              secondary={formatTimeAgo(notification.created_at)}
            />
            {!notification.read && (
              <IconButton
                edge="end"
                onClick={() => markAsRead(notification.id)} // عند الضغط على زر الإغلاق، تعيين الإشعار كمقروء
              >
                <CloseIcon />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default NotificationsList;
