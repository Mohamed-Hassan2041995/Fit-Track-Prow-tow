import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { paymentService } from '../../services/payment/PaymentService';
import { useNotification } from '../../contexts/NotificationContext';

interface PaymentFormProps {
  subscriptionId: string;
  amount: number;
  onSuccess: () => void;
}

const validationSchema = Yup.object({
  cardNumber: Yup.string()
    .required('رقم البطاقة مطلوب')
    .matches(/^\d{16}$/, 'رقم البطاقة غير صحيح'),
  expiryDate: Yup.string()
    .required('تاريخ الانتهاء مطلوب')
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'صيغة تاريخ الانتهاء غير صحيحة'),
  cvv: Yup.string()
    .required('رمز CVV مطلوب')
    .matches(/^\d{3,4}$/, 'رمز CVV غير صحيح'),
});

const PaymentForm: React.FC<PaymentFormProps> = ({
  subscriptionId,
  amount,
  onSuccess,
}) => {
  const [processing, setProcessing] = useState(false);
  const { showNotification } = useNotification();

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setProcessing(true);
        await paymentService.processPayment(subscriptionId, amount, 'credit_card');
        showNotification('تم الدفع بنجاح', 'success');
        onSuccess();
      } catch (error) {
        showNotification('فشل في عملية الدفع', 'error');
      } finally {
        setProcessing(false);
      }
    },
  });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        إتمام الدفع
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        المبلغ المطلوب: ${amount}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="cardNumber"
          label="رقم البطاقة"
          value={formik.values.cardNumber}
          onChange={formik.handleChange}
          error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
          helperText={formik.touched.cardNumber && formik.errors.cardNumber}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            name="expiryDate"
            label="تاريخ الانتهاء (MM/YY)"
            value={formik.values.expiryDate}
            onChange={formik.handleChange}
            error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
            helperText={formik.touched.expiryDate && formik.errors.expiryDate}
          />

          <TextField
            fullWidth
            name="cvv"
            label="CVV"
            type="password"
            value={formik.values.cvv}
            onChange={formik.handleChange}
            error={formik.touched.cvv && Boolean(formik.errors.cvv)}
            helperText={formik.touched.cvv && formik.errors.cvv}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={processing}
        >
          {processing ? 'جاري المعالجة...' : 'إتمام الدفع'}
        </Button>
      </form>
    </Paper>
  );
};

export default PaymentForm;