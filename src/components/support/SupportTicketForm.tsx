import React from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface SupportTicket {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'technical' | 'billing' | 'general';
}

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
});

const SupportTicketForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      priority: 'medium',
      category: 'general',
    },
    validationSchema,
    onSubmit: (values) => {
      // TODO: Implement API call to create support ticket
      console.log('Support ticket:', values);
    },
  });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create Support Ticket
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          sx={{ mb: 2 }}
        />

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
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          select
          name="priority"
          label="Priority"
          value={formik.values.priority}
          onChange={formik.handleChange}
          error={formik.touched.priority && Boolean(formik.errors.priority)}
          helperText={formik.touched.priority && formik.errors.priority}
          sx={{ mb: 2 }}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>

        <TextField
          fullWidth
          select
          name="category"
          label="Category"
          value={formik.values.category}
          onChange={formik.handleChange}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
          sx={{ mb: 2 }}
        >
          <MenuItem value="technical">Technical</MenuItem>
          <MenuItem value="billing">Billing</MenuItem>
          <MenuItem value="general">General</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          disabled={formik.isSubmitting}
        >
          Submit Ticket
        </Button>
      </form>
    </Paper>
  );
};