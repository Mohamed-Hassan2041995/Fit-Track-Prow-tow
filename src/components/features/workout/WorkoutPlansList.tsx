import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Chip,
} from '@mui/material';
import WorkoutPlanActions from './WorkoutPlanActions';
import { useAuth } from '../../../contexts/AuthContext';
import { UserRole } from '../../../types/user';
import { WorkoutPlan } from '../../../types/workout';

const WorkoutPlansList: React.FC = () => {
  const { user } = useAuth();

  // TODO: Replace with actual API call
  const plans: WorkoutPlan[] = [
    {
      id: '1',
      traineeId: '3',
      trainerId: '2',
      name: 'Strength Training',
      description: 'Basic strength training program',
      exercises: [],
      startDate: new Date('2023-08-01'),
      endDate: new Date('2023-09-01'),
      frequency: ['Monday', 'Wednesday', 'Friday'],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      traineeId: '3',
      trainerId: '2',
      name: 'Weight Loss Program',
      description: 'Program focused on weight loss',
      exercises: [],
      startDate: new Date('2023-08-15'),
      endDate: new Date('2023-09-15'),
      frequency: ['Tuesday', 'Thursday', 'Saturday'],
      status: 'upcoming',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <List>
      {plans.map((plan) => (
        <ListItem
          key={plan.id}
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            mb: 1,
            '&:last-child': { mb: 0 },
          }}
        >
          <ListItemText
            primary={plan.name}
            secondary={`${new Date(plan.startDate).toLocaleDateString()} to ${new Date(plan.endDate).toLocaleDateString()}`}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={plan.status}
              color={plan.status === 'active' ? 'success' : 'default'}
              size="small"
            />
            {user?.role !== UserRole.TRAINEE && (
              <WorkoutPlanActions plan={plan} />
            )}
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default WorkoutPlansList;