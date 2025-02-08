import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  weight: Yup.number().required('الوزن مطلوب').min(20, 'الوزن غير صحيح'),
  height: Yup.number().required('الطول مطلوب').min(100, 'الطول غير صحيح'),
  bodyFatPercentage: Yup.number().min(0).max(100),
  muscleMass: Yup.number().min(0),
  totalBodyWater: Yup.number().min(0),
  visceralFatLevel: Yup.number().min(0),
  basalMetabolicRate: Yup.number().min(0),
});

interface InBodyFormProps {
  traineeId: string;
  onSubmit: (values: any) => void;
}

const InBodyForm: React.FC<InBodyFormProps> = ({ traineeId, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      weight: '',
      height: '',
      bodyFatPercentage: '',
      muscleMass: '',
      totalBodyWater: '',
      visceralFatLevel: '',
      basalMetabolicRate: '',
      notes: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, traineeId });
    },
  });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        تسجيل قياسات InBody
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="weight"
              label="الوزن (كجم)"
              type="number"
              value={formik.values.weight}
              onChange={formik.handleChange}
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              helperText={formik.touched.weight && formik.errors.weight}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="height"
              label="الطول (سم)"
              type="number"
              value={formik.values.height}
              onChange={formik.handleChange}
              error={formik.touched.height && Boolean(formik.errors.height)}
              helperText={formik.touched.height && formik.errors.height}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="bodyFatPercentage"
              label="نسبة الدهون (%)"
              type="number"
              value={formik.values.bodyFatPercentage}
              onChange={formik.handleChange}
              error={formik.touched.bodyFatPercentage && Boolean(formik.errors.bodyFatPercentage)}
              helperText={formik.touched.bodyFatPercentage && formik.errors.bodyFatPercentage}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="muscleMass"
              label="كتلة العضلات (كجم)"
              type="number"
              value={formik.values.muscleMass}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="notes"
              label="ملاحظات"
              value={formik.values.notes}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
            >
              حفظ القياسات
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default InBodyForm;