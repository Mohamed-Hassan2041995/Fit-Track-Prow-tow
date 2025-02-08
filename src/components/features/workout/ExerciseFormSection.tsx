import React from 'react';
import { Box, Grid, TextField, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { FormikProps } from 'formik';
import { Exercise, WorkoutPlan } from '../../../types/workout';

interface ExerciseFormSectionProps {
  exercise: Exercise;
  index: number;
  onRemove: () => void;
  formik: FormikProps<any>;
}

const ExerciseFormSection: React.FC<ExerciseFormSectionProps> = ({
  exercise,
  index,
  onRemove,
  formik,
}) => {
  return (
    <Box sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name={`exercises.${index}.name`}
            label="Exercise Name"
            value={exercise.name}
            onChange={formik.handleChange}
            error={
              formik.touched.exercises?.[index]?.name &&
              Boolean(formik.errors.exercises?.[index]?.name)
            }
            helperText={
              formik.touched.exercises?.[index]?.name &&
              formik.errors.exercises?.[index]?.name
            }
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            fullWidth
            type="number"
            name={`exercises.${index}.sets`}
            label="Sets"
            value={exercise.sets}
            onChange={formik.handleChange}
            error={
              formik.touched.exercises?.[index]?.sets &&
              Boolean(formik.errors.exercises?.[index]?.sets)
            }
            helperText={
              formik.touched.exercises?.[index]?.sets &&
              formik.errors.exercises?.[index]?.sets
            }
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            fullWidth
            type="number"
            name={`exercises.${index}.reps`}
            label="Reps"
            value={exercise.reps}
            onChange={formik.handleChange}
            error={
              formik.touched.exercises?.[index]?.reps &&
              Boolean(formik.errors.exercises?.[index]?.reps)
            }
            helperText={
              formik.touched.exercises?.[index]?.reps &&
              formik.errors.exercises?.[index]?.reps
            }
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <IconButton
            color="error"
            onClick={onRemove}
            sx={{ mt: { xs: 1, sm: 0 } }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExerciseFormSection;