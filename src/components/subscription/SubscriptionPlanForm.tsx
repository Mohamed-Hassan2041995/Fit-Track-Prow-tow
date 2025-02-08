import React from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SubscriptionPlan, SubscriptionType, PlanFeature } from '../../types/subscription';

interface SubscriptionPlanFormProps {
  initialValues?: Partial<SubscriptionPlan>;
  onSubmit: (values: Partial<SubscriptionPlan>) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
  features: Yup.string().required('Required'),
  price: Yup.number().min(0).required('Required'),
  description: Yup.string().required('Required'),
  duration: Yup.number().when('type', {
    is: (type: string) => type !== 'per-session',
    then: Yup.number().min(1).required('Required'),
  }),
  sessions: Yup.number().when('type', {
    is: 'per-session',
    then: Yup.number().min(1).required('Required'),
  }),
});

const SubscriptionPlanForm: React.FC<SubscriptionPlanFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      type: 'monthly' as SubscriptionType,
      features: 'workout' as PlanFeature,
      price: 0,
      description: '',
      duration: 30,
      sessions: undefined,
      ...initialValues,
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {initialValues ? 'Edit Subscription Plan' : 'Create New Subscription Plan'}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
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

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              name="type"
              label="Subscription Type"
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <MenuItem value="per-session">Per Session</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="package">Package</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              name="features"
              label="Features"
              value={formik.values.features}
              onChange={formik.handleChange}
            >
              <MenuItem value="workout">Workout Only</MenuItem>
              <MenuItem value="nutrition">Nutrition Only</MenuItem>
              <MenuItem value="both">Workout & Nutrition</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              name="price"
              label="Price"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>

          {formik.values.type !== 'per-session' && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                name="duration"
                label="Duration (days)"
                value={formik.values.duration}
                onChange={formik.handleChange}
                error={formik.touched.duration && Boolean(formik.errors.duration)}
                helperText={formik.touched.duration && formik.errors.duration}
              />
            </Grid>
          )}

          {formik.values.type === 'per-session' && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                name="sessions"
                label="Number of Sessions"
                value={formik.values.sessions}
                onChange={formik.handleChange}
                error={formik.touched.sessions && Boolean(formik.errors.sessions)}
                helperText={formik.touched.sessions && formik.errors.sessions}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {initialValues ? 'Save Changes' : 'Create Plan'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};