import React from "react"; // استيراد React
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Paper,
} from "@mui/material"; // استيراد مكونات من MUI
import {
  Notifications as NotificationsIcon,
  Close as CloseIcon,
} from "@mui/icons-material"; // استيراد أيقونات الإشعارات وإغلاق
import Notification from "../../types/notification"; // استيراد نوع الإشعار
import { formatTimeAgo } from "../../utils/formatters"; // استيراد دالة لتنسيق الوقت

// تعريف واجهة Props للمكون
interface NotificationsListProps {
  notifications: Notification[]; // مصفوفة من الإشعارات
  onMarkAsRead: (id: string) => void; // دالة لتعيين الإشعار كمقروء
}

// مكون NotificationsList
const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onMarkAsRead,
}) => {
  return (
    <Paper>
      {" "}
      {/* ورقة لتغليف قائمة الإشعارات */}
      <List>
        {notifications.map(
          (
            notification // تكرار الإشعارات
          ) => (
            <ListItem
              key={notification.id} // استخدام معرف الإشعار كـ key
              sx={{
                bgcolor: notification.read ? "transparent" : "action.hover", // تغيير الخلفية حسب حالة القراءة
              }}
            >
              <ListItemIcon>
                <NotificationsIcon
                  color={notification.read ? "disabled" : "primary"}
                />{" "}
                {/* أيقونة الإشعار */}
              </ListItemIcon>
              <ListItemText
                primary={notification.message} // نص الإشعار
                secondary={formatTimeAgo(notification.created_at)} // نص الوقت المنقضي منذ إنشاء الإشعار
              />
              {!notification.read && ( // إذا كان الإشعار غير مقروء
                <IconButton
                  edge="end"
                  onClick={() => onMarkAsRead(notification.id)} // عند الضغط على زر الإغلاق، تعيين الإشعار كمقروء
                >
                  <CloseIcon /> {/* أيقونة الإغلاق */}
                </IconButton>
              )}
            </ListItem>
          )
        )}
      </List>
    </Paper>
  );
};

export default NotificationsList; // تصدير المكون
