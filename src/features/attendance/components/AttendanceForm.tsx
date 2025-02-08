import React from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AttendanceRecord } from '../../../types/attendance';

interface AttendanceFormProps {
  onSubmit: (record: Partial<AttendanceRecord>) => void;
  traineeId: string;
}

const validationSchema = Yup.object({
  date: Yup.date().required('Date is required'),
  status: Yup.string().required('Status is required'),
  notes: Yup.string(),
});

const AttendanceForm: React.FC<AttendanceFormProps> = ({ onSubmit, traineeId }) => {
  const formik = useFormik({
    initialValues: {
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      notes: '',
      traineeId,
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Record Attendance</Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="date"
          label="Date"
          type="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            label="Status"
          >
            <MenuItem value="present">Present</MenuItem>
            <MenuItem value="absent">Absent</MenuItem>
            <MenuItem value="late">Late</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          name="notes"
          label="Notes"
          multiline
          rows={4}
          value={formik.values.notes}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" fullWidth>
          Record Attendance
        </Button>
      </Box>
    </Paper>
  );
}

export default AttendanceForm;