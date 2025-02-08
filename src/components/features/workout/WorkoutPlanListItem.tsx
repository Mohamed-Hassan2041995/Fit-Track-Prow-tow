import React from 'react';
import {
  ListItem,
  ListItemText,
  Box,
  Chip,
} from '@mui/material';
import WorkoutPlanActions from './WorkoutPlanActions';
import { WorkoutPlan } from '../../../types/workout';
import { UserRole } from '../../../types/user';

interface WorkoutPlanListItemProps {
  plan: WorkoutPlan;
  userRole?: UserRole;
  onEdit?: (plan: WorkoutPlan) => void;
  onDelete?: (planId: string) => void;
}

const WorkoutPlanListItem: React.FC<WorkoutPlanListItemProps> = ({
  plan,
  userRole,
  onEdit,
  onDelete,
}) => {
  return (
    <ListItem
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
        {userRole !== UserRole.TRAINEE && (
          <WorkoutPlanActions
            plan={plan}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </Box>
    </ListItem>
  );
};

export default WorkoutPlanListItem;