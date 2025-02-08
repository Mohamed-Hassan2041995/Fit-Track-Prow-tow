import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';
import {
  FitnessCenter,
  Restaurant,
  Person,
  Edit,
} from '@mui/icons-material';
import { format } from 'date-fns';

interface Activity {
  id: string;
  type: 'workout' | 'nutrition' | 'user' | 'system';
  description: string;
  timestamp: Date;
}

const RecentActivities: React.FC = () => {
  // TODO: Replace with actual API call
  const activities: Activity[] = [
    {
      id: '1',
      type: 'workout',
      description: 'New workout plan created for John Doe',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'nutrition',
      description: 'Nutrition plan updated for Jane Smith',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '3',
      type: 'user',
      description: 'New trainer registered: Mike Johnson',
      timestamp: new Date(Date.now() - 7200000),
    },
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'workout':
        return <FitnessCenter />;
      case 'nutrition':
        return <Restaurant />;
      case 'user':
        return <Person />;
      default:
        return <Edit />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'workout':
        return '#1976d2';
      case 'nutrition':
        return '#2e7d32';
      case 'user':
        return '#ed6c02';
      default:
        return '#757575';
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Recent Activities
      </Typography>
      <List>
        {activities.map((activity, index) => (
          <React.Fragment key={activity.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: getActivityColor(activity.type) }}>
                  {getActivityIcon(activity.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={activity.description}
                secondary={format(activity.timestamp, 'PPp')}
              />
            </ListItem>
            {index < activities.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default RecentActivities;