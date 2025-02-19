// هذه الكمبوننت تستخدم لإنشاء نموذج لإضافة أو تعديل بيانات المستخدمين.
// تستخدم مكتبة Material-UI لإنشاء واجهة المستخدم وتستخدم مكتبة Formik لإدارة نموذج البيانات.
// يتم استخدام مكتبة Yup للتحقق من صحة المدخلات في النموذج.

import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User, UserRole } from "../../types/user";

interface UserFormProps {
  initialValues?: User | null; // قيم البيانات الأولية للنموذج، يمكن أن تكون null إذا كان النموذج لإضافة مستخدم جديد
  onSubmit: (values: Partial<User>) => void; // دالة تنفذ عند إرسال النموذج
  onCancel: () => void; // دالة تنفذ عند إلغاء النموذج
}

// تعريف مخطط التحقق من صحة البيانات باستخدام Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("عنوان البريد الإلكتروني غير صالح")
    .required("مطلوب"),
  firstName: Yup.string().required("مطلوب"),
  lastName: Yup.string().required("مطلوب"),
  role: Yup.string().oneOf(Object.values(UserRole)).required("مطلوب"),
});

// الكمبوننت الرئيسية
const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  // إعداد Formik لإدارة حالة النموذج
  const formik = useFormik({
    initialValues: {
      email: initialValues?.email || "", // إذا كانت القيم الأولية موجودة، استخدمها، وإلا استخدم قيمة فارغة
      firstName: initialValues?.firstName || "",
      lastName: initialValues?.lastName || "",
      role: initialValues?.role || UserRole.TRAINEE, // إذا كانت القيم الأولية موجودة، استخدمها، وإلا استخدم قيمة الدور الافتراضية
    },
    validationSchema, // إضافة مخطط التحقق من الصحة
    onSubmit: (values) => {
      onSubmit(values); // تنفيذ دالة onSubmit عند إرسال النموذج
    },
  });

  return (
    <>
      <DialogTitle sx={{ textAlign: "center" }}>
        {initialValues ? "تعديل المستخدم" : "إضافة مستخدم جديد"}{" "}
        {/* تغيير عنوان النافذة بناءً على نوع النموذج */}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit} style={{ padding: "10px" }}>
        <DialogContent>
          <Grid container spacing={2}>
            {/* حقل الاسم الأول */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="firstName"
                label="الاسم الأول"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            {/* حقل الاسم الأخير */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="lastName"
                label="الاسم الأخير"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            {/* حقل البريد الإلكتروني */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="البريد الإلكتروني"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            {/* حقل الدور (التصنيف) */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                name="role"
                label="الدور"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              >
                {/* خيارات الدور المتاحة */}
                {Object.values(UserRole).map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>إلغاء</Button>
          <Button type="submit" variant="contained">
            {initialValues ? "حفظ التغييرات" : "إضافة مستخدم"}
          </Button>
        </DialogActions>
      </form>
    </>
  );
};

export default UserForm;
