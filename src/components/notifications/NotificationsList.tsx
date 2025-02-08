import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import  Notification  from '../../types/notification';
import { formatTimeAgo } from '../../utils/formatters';

interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onMarkAsRead,
}) => {
  return (
    <Paper>
      <List>
        {notifications.map((notification) => (
          <ListItem
            key={notification.id}
            sx={{
              bgcolor: notification.read ? 'transparent' : 'action.hover',
            }}
          >
            <ListItemIcon>
              <NotificationsIcon color={notification.read ? 'disabled' : 'primary'} />
            </ListItemIcon>
            <ListItemText
              primary={notification.message}
              secondary={formatTimeAgo(notification.created_at)}
            />
            {!notification.read && (
              <IconButton
                edge="end"
                onClick={() => onMarkAsRead(notification.id)}
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