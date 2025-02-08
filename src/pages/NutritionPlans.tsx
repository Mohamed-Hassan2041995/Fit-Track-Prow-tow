import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Dialog,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import NutritionPlansList from '../components/features/nutrition/NutritionPlansList';
import NutritionPlanForm from '../components/features/nutrition/NutritionPlanForm';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/user';

const NutritionPlans: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useAuth();

  const handleAddPlan = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSavePlan = async (planData: any) => {
    try {
      // TODO: Implement API call to save plan
      console.log('Saving plan:', planData);
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Nutrition Plans</Typography>
        {user?.role !== UserRole.TRAINEE && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddPlan}
          >
            Create Plan
          </Button>
        )}
      </Box>

      <Paper sx={{ p: 3 }}>
        <NutritionPlansList />
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <NutritionPlanForm
          onSubmit={handleSavePlan}
          onCancel={handleCloseDialog}
        />
      </Dialog>
    </Container>
  );
};

export default NutritionPlans;