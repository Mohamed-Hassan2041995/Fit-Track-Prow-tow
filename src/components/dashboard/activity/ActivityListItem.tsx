import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { format } from 'date-fns';
import ActivityIcon, { getActivityColor } from './ActivityIcon';
import { ActivityLog } from '../../../types/dashboard';

interface ActivityListItemProps {
  activity: ActivityLog;
}

const ActivityListItem: React.FC<ActivityListItemProps> = ({ activity }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: getActivityColor(activity.type) }}>
          <ActivityIcon type={activity.type} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={activity.description}
        secondary={format(activity.timestamp, 'PPp')}
      />
    </ListItem>
  );
};

export default ActivityListItem;