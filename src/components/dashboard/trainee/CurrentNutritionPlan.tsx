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
import { Restaurant } from '@mui/icons-material';

interface Meal {
  id: string;
  name: string;
  calories: number;
  time: string;
  consumed: boolean;
}

const CurrentNutritionPlan: React.FC = () => {
  const meals: Meal[] = [
    {
      id: '1',
      name: 'Breakfast',
      calories: 450,
      time: '8:00 AM',
      consumed: true,
    },
    {
      id: '2',
      name: 'Lunch',
      calories: 650,
      time: '1:00 PM',
      consumed: false,
    },
    {
      id: '3',
      name: 'Dinner',
      calories: 550,
      time: '7:00 PM',
      consumed: false,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Today's Meals
      </Typography>
      <List>
        {meals.map((meal) => (
          <ListItem
            key={meal.id}
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              mb: 1,
              '&:last-child': { mb: 0 },
            }}
          >
            <ListItemIcon>
              <Restaurant />
            </ListItemIcon>
            <ListItemText
              primary={meal.name}
              secondary={`${meal.calories} calories - ${meal.time}`}
            />
            <Chip
              label={meal.consumed ? 'Consumed' : 'Pending'}
              color={meal.consumed ? 'success' : 'default'}
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CurrentNutritionPlan;