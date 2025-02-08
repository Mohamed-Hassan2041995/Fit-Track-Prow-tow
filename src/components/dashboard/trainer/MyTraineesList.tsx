import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { Person, FitnessCenter, Restaurant } from '@mui/icons-material';

interface TraineeListItem {
  id: string;
  name: string;
  hasWorkoutPlan: boolean;
  hasNutritionPlan: boolean;
  lastActive: string;
}

const MyTraineesList: React.FC = () => {
  // TODO: Replace with actual API call
  const trainees: TraineeListItem[] = [
    {
      id: '1',
      name: 'John Doe',
      hasWorkoutPlan: true,
      hasNutritionPlan: true,
      lastActive: '2 hours ago',
    },
    {
      id: '2',
      name: 'Jane Smith',
      hasWorkoutPlan: true,
      hasNutritionPlan: false,
      lastActive: '1 day ago',
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        My Trainees
      </Typography>
      
      <List>
        {trainees.map((trainee) => (
          <ListItem
            key={trainee.id}
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              mb: 1,
              '&:last-child': { mb: 0 },
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            
            <ListItemText
              primary={trainee.name}
              secondary={`Last active: ${trainee.lastActive}`}
            />
            
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip
                icon={<FitnessCenter />}
                label="Workout"
                color={trainee.hasWorkoutPlan ? 'success' : 'default'}
                size="small"
              />
              <Chip
                icon={<Restaurant />}
                label="Nutrition"
                color={trainee.hasNutritionPlan ? 'success' : 'default'}
                size="small"
              />
              <Button variant="outlined" size="small">
                View Details
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyTraineesList;