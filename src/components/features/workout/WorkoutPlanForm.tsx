import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useFormik } from "formik";
import { workoutPlanValidationSchema } from "../../../utils/validation";
import { Exercise, WorkoutPlan } from "../../../types/workout";
import ExerciseFormSection from "./ExerciseFormSection";

interface WorkoutPlanFormProps {
  initialValues?: Partial<WorkoutPlan>;
  onSubmit: (values: Partial<WorkoutPlan>) => void;
  onCancel: () => void;
  traineeId: string;
}

const WorkoutPlanForm: React.FC<WorkoutPlanFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  traineeId,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      traineeId,
      startDate: "",
      endDate: "",
      exercises: [],
      ...initialValues,
    },
    validationSchema: workoutPlanValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: "",
      sets: 0,
      reps: 0,
    };
    formik.setFieldValue("exercises", [
      ...formik.values.exercises,
      newExercise,
    ]);
  };

  const removeExercise = (index: number) => {
    const exercises = [...formik.values.exercises];
    exercises.splice(index, 1);
    formik.setFieldValue("exercises", exercises);
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="name"
            label="Plan Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            name="startDate"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.startDate}
            onChange={formik.handleChange}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            name="endDate"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.endDate}
            onChange={formik.handleChange}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Exercises
          </Typography>
          {formik.values.exercises.map((exercise, index) => (
            <ExerciseFormSection
              key={exercise.id}
              exercise={exercise}
              index={index}
              onRemove={() => removeExercise(index)}
              formik={formik}
            />
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={addExercise}
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Add Exercise
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button onClick={onCancel} variant="outlined">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
            >
              Save Workout Plan
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkoutPlanForm;
