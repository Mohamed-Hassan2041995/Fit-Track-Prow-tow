import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

interface NutritionPlan {
  id: string;
  traineeName: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming';
}

const ActiveNutritionPlans: React.FC = () => {
  const plans: NutritionPlan[] = [
    {
      id: '1',
      traineeName: 'John Doe',
      startDate: '2023-08-01',
      endDate: '2023-09-01',
      status: 'active',
    },
    {
      id: '2',
      traineeName: 'Jane Smith',
      startDate: '2023-08-15',
      endDate: '2023-09-15',
      status: 'upcoming',
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Nutrition Plans
      </Typography>
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
              primary={plan.traineeName}
              secondary={`${plan.startDate} - ${plan.endDate}`}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={plan.status}
                color={plan.status === 'active' ? 'success' : 'default'}
                size="small"
              />
              <IconButton size="small">
                <Edit fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error">
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ActiveNutritionPlans;