import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import { FitnessCenter } from '@mui/icons-material';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  completed: boolean;
}

const CurrentWorkoutPlan: React.FC = () => {
  const exercises: Exercise[] = [
    {
      id: '1',
      name: 'Bench Press',
      sets: 3,
      reps: 12,
      completed: true,
    },
    {
      id: '2',
      name: 'Squats',
      sets: 4,
      reps: 10,
      completed: false,
    },
    {
      id: '3',
      name: 'Deadlifts',
      sets: 3,
      reps: 8,
      completed: false,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Today's Workout
      </Typography>
      <List>
        {exercises.map((exercise) => (
          <ListItem
            key={exercise.id}
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              mb: 1,
              '&:last-child': { mb: 0 },
            }}
          >
            <ListItemIcon>
              <FitnessCenter />
            </ListItemIcon>
            <ListItemText
              primary={exercise.name}
              secondary={`${exercise.sets} sets × ${exercise.reps} reps`}
            />
            <Chip
              label={exercise.completed ? 'Completed' : 'Pending'}
              color={exercise.completed ? 'success' : 'default'}
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CurrentWorkoutPlan;