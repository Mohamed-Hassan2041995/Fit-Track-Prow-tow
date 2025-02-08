import React from 'react';
import { IconButton, Box } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { WorkoutPlan } from '../../../types/workout';

interface WorkoutPlanActionsProps {
  plan: WorkoutPlan;
  onEdit?: (plan: WorkoutPlan) => void;
  onDelete?: (planId: string) => void;
}

const WorkoutPlanActions: React.FC<WorkoutPlanActionsProps> = ({
  plan,
  onEdit,
  onDelete,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <IconButton
        size="small"
        onClick={() => onEdit?.(plan)}
        aria-label="edit plan"
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        color="error"
        onClick={() => onDelete?.(plan.id)}
        aria-label="delete plan"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default WorkoutPlanActions;