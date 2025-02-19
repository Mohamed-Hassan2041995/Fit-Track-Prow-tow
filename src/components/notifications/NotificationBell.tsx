import React, { useState } from "react"; // استيراد React و useState
import { Badge, IconButton, Popover, Box, Typography } from "@mui/material"; // استيراد مكونات من MUI
import { Notifications as NotificationsIcon } from "@mui/icons-material"; // استيراد أيقونة الإشعارات
import NotificationsList from "./NotificationsList"; // استيراد مكون قائمة الإشعارات
import useNotifications from "../../hooks/useNotifications"; // استيراد هوك لإدارة الإشعارات

const NotificationBell: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // الحالة لتحديد موقع الـ Popover
  const { notifications, markAsRead } = useNotifications(); // استدعاء الإشعارات ووظيفة تعيينها كمقروءة

  const unreadCount = notifications.filter((n) => !n.read).length; // حساب عدد الإشعارات غير المقروءة

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // تعيين العنصر كمرجع لفتح الـ Popover
  };

  const handleClose = () => {
    setAnchorEl(null); // إغلاق الـ Popover
  };

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id); // تعيين الإشعار كمقروء
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        {" "}
        {/* زر الإشعارات */}
        <Badge badgeContent={unreadCount} color="error">
          {" "}
          {/* شارة عدد الإشعارات غير المقروءة */}
          <NotificationsIcon /> {/* أيقونة الإشعارات */}
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)} // فتح الـ Popover إذا كان هناك عنصر مرجعي
        anchorEl={anchorEl} // العنصر المرجعي
        onClose={handleClose} // دالة إغلاق الـ Popover
        anchorOrigin={{
          vertical: "bottom", // موضع الـ Popover
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top", // نقطة التحويل
          horizontal: "right",
        }}
      >
        <Box sx={{ width: 400, maxHeight: 500, overflow: "auto", p: 2 }}>
          {" "}
          {/* صندوق الإشعارات */}
          <Typography variant="h6" gutterBottom>
            الإشعارات {/* عنوان صندوق الإشعارات */}
          </Typography>
          <NotificationsList
            notifications={notifications} // تمرير قائمة الإشعارات
            onMarkAsRead={handleMarkAsRead} // تمرير دالة تعيين الإشعار كمقروء
          />
        </Box>
      </Popover>
    </>
  );
};

export default NotificationBell; // تصدير المكون
