import React, { useState } from "react";
import { Badge, IconButton, Popover, Box, Typography } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import NotificationsList from "./NotificationsList";
import useNotifications from "../../hooks/useNotifications";

const NotificationBell: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { notifications, markAsRead } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ width: 400, maxHeight: 500, overflow: "auto", p: 2 }}>
          <Typography variant="h6" gutterBottom>
            الإشعارات
          </Typography>
          <NotificationsList
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
          />
        </Box>
      </Popover>
    </>
  );
};

export default NotificationBell;
