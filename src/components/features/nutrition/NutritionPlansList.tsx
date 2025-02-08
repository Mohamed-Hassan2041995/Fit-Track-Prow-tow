import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Box,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import { UserRole } from '../../../types/user';

const NutritionPlansList: React.FC = () => {
  const { user } = useAuth();

  // TODO: Replace with actual API call
  const plans = [
    {
      id: '1',
      name: 'Weight Loss Diet',
      trainee: 'John Doe',
      startDate: '2023-08-01',
      endDate: '2023-09-01',
      status: 'active',
    },
    {
      id: '2',
      name: 'Muscle Gain Diet',
      trainee: 'Jane Smith',
      startDate: '2023-08-15',
      endDate: '2023-09-15',
      status: 'upcoming',
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
            secondary={`${plan.trainee} • ${plan.startDate} to ${plan.endDate}`}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={plan.status}
              color={plan.status === 'active' ? 'success' : 'default'}
              size="small"
            />
            {user?.role !== UserRole.TRAINEE && (
              <>
                <IconButton size="small">
                  <EditIcon />
                </IconButton>
                <IconButton size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default NutritionPlansList;