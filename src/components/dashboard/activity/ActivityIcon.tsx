import React from 'react';
import {
  FitnessCenter,
  Restaurant,
  Person,
  Edit,
} from '@mui/icons-material';

interface ActivityIconProps {
  type: 'workout' | 'nutrition' | 'user' | 'system';
}

const ActivityIcon: React.FC<ActivityIconProps> = ({ type }) => {
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

export const getActivityColor = (type: 'workout' | 'nutrition' | 'user' | 'system'): string => {
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

export default ActivityIcon;