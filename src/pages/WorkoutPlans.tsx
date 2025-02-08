import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Dialog,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import WorkoutPlansList from "../components/features/workout/WorkoutPlansList";
import WorkoutPlanForm from "../components/features/workout/WorkoutPlanForm";
import { useAuth } from "../contexts/AuthContext";
import { UserRole } from "../types/user";

const WorkoutPlans: React.FC = () => {
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
      console.log("Saving plan:", planData);
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving plan:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4">Workout Plans</Typography>
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
        <WorkoutPlansList />
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <WorkoutPlanForm
          onSubmit={handleSavePlan}
          onCancel={handleCloseDialog}
          traineeId={""}
        />
      </Dialog>
    </Container>
  );
};

export default WorkoutPlans;
