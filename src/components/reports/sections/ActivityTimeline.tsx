import React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { Typography, Box, Chip } from '@mui/material';
import {
  FitnessCenter,
  Restaurant,
  Event,
  Assessment,
} from '@mui/icons-material';
import { formatDate } from '../../../utils/formatters';
import { Activity } from '../../../types/report';

interface ActivityTimelineProps {
  activities: Activity[];
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'workout':
      return <FitnessCenter />;
    case 'nutrition':
      return <Restaurant />;
    case 'assessment':
      return <Assessment />;
    default:
      return <Event />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'workout':
      return 'primary';
    case 'nutrition':
      return 'success';
    case 'assessment':
      return 'warning';
    default:
      return 'info';
  }
};

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  return (
    <Timeline>
      {activities.map((activity, index) => (
        <TimelineItem key={activity.id}>
          <TimelineSeparator>
            <TimelineDot color={getActivityColor(activity.type)}>
              {getActivityIcon(activity.type)}
            </TimelineDot>
            {index < activities.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" component="span">
                {activity.title}
              </Typography>
              <Typography color="text.secondary" display="block">
                {formatDate(activity.timestamp)}
              </Typography>
              <Typography>{activity.description}</Typography>
              {activity.status && (
                <Chip
                  label={activity.status}
                  color={activity.status === 'completed' ? 'success' : 'default'}
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

export default ActivityTimeline;