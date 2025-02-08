import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userService } from '../../services/auth/UserService';

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  currentPassword: Yup.string().required('كلمة المرور الحالية مطلوبة'),
  newPassword: Yup.string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .required('كلمة المرور الجديدة مطلوبة'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'كلمات المرور غير متطابقة')
    .required('تأكيد كلمة المرور مطلوب'),
});

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  open,
  onClose,
}) => {
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await userService.changePassword(values.newPassword);
        onClose();
      } catch (error) {
        console.error('Error changing password:', error);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>تغيير كلمة المرور</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            name="currentPassword"
            label="كلمة المرور الحالية"
            type="password"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
            helperText={formik.touched.currentPassword && formik.errors.currentPassword}
          />
          <TextField
            fullWidth
            margin="normal"
            name="newPassword"
            label="كلمة المرور الجديدة"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            fullWidth
            margin="normal"
            name="confirmPassword"
            label="تأكيد كلمة المرور"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>إلغاء</Button>
          <Button type="submit" variant="contained" color="primary">
            تغيير كلمة المرور
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangePasswordDialog;