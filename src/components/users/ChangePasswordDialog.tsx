// هذا الكمبوننت يقوم بعرض حوار لتغيير كلمة المرور.
// يسمح للمستخدم بإدخال كلمة المرور الحالية، كلمة المرور الجديدة، وتأكيد كلمة المرور الجديدة.
// يتم استخدام مكتبة Formik لإدارة حالة النموذج والتحقق من الصحة باستخدام مكتبة Yup.

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userService } from "../../services/auth/UserService"; // خدمة المستخدم لتغيير كلمة المرور

// تعريف خصائص الكمبوننت
interface ChangePasswordDialogProps {
  open: boolean; // حالة فتح الحوار
  onClose: () => void; // دالة لإغلاق الحوار
}

// مخطط التحقق من صحة بيانات النموذج باستخدام Yup
const validationSchema = Yup.object({
  currentPassword: Yup.string().required("كلمة المرور الحالية مطلوبة"), // تحقق من أن كلمة المرور الحالية مطلوبة
  newPassword: Yup.string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل") // تحقق من أن كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل
    .required("كلمة المرور الجديدة مطلوبة"), // تحقق من أن كلمة المرور الجديدة مطلوبة
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "كلمات المرور غير متطابقة") // تحقق من تطابق كلمة المرور الجديدة مع تأكيد كلمة المرور
    .required("تأكيد كلمة المرور مطلوب"), // تحقق من أن تأكيد كلمة المرور مطلوب
});

// كمبوننت حوار تغيير كلمة المرور
const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  open,
  onClose,
}) => {
  // إعداد Formik لإدارة حالة النموذج
  const formik = useFormik({
    initialValues: {
      currentPassword: "", // القيمة الأولية لكلمة المرور الحالية
      newPassword: "", // القيمة الأولية لكلمة المرور الجديدة
      confirmPassword: "", // القيمة الأولية لتأكيد كلمة المرور
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // استدعاء خدمة تغيير كلمة المرور
        await userService.changePassword(values.newPassword);
        onClose(); // إغلاق الحوار بعد النجاح
      } catch (error) {
        console.error("خطأ في تغيير كلمة المرور:", error); // تسجيل الخطأ في وحدة التحكم
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      {" "}
      {/* عرض الحوار عند فتحه */}
      <DialogTitle>تغيير كلمة المرور</DialogTitle> {/* عنوان الحوار */}
      <form onSubmit={formik.handleSubmit}>
        {" "}
        {/* معالجة تقديم النموذج */}
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            name="currentPassword"
            label="كلمة المرور الحالية" // نص حقل كلمة المرور الحالية
            type="password" // تعيين نوع الحقل لكلمة المرور
            value={formik.values.currentPassword} // قيمة الحقل من Formik
            onChange={formik.handleChange} // معالجة تغيير القيمة
            error={
              formik.touched.currentPassword &&
              Boolean(formik.errors.currentPassword)
            } // التحقق من وجود خطأ
            helperText={
              formik.touched.currentPassword && formik.errors.currentPassword
            } // عرض رسالة الخطأ
          />
          <TextField
            fullWidth
            margin="normal"
            name="newPassword"
            label="كلمة المرور الجديدة" // نص حقل كلمة المرور الجديدة
            type="password" // تعيين نوع الحقل لكلمة المرور
            value={formik.values.newPassword} // قيمة الحقل من Formik
            onChange={formik.handleChange} // معالجة تغيير القيمة
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            } // التحقق من وجود خطأ
            helperText={formik.touched.newPassword && formik.errors.newPassword} // عرض رسالة الخطأ
          />
          <TextField
            fullWidth
            margin="normal"
            name="confirmPassword"
            label="تأكيد كلمة المرور" // نص حقل تأكيد كلمة المرور
            type="password" // تعيين نوع الحقل لكلمة المرور
            value={formik.values.confirmPassword} // قيمة الحقل من Formik
            onChange={formik.handleChange} // معالجة تغيير القيمة
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            } // التحقق من وجود خطأ
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            } // عرض رسالة الخطأ
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>إلغاء</Button> {/* زر لإلغاء العملية */}
          <Button type="submit" variant="contained" color="primary">
            {" "}
            {/* زر لتغيير كلمة المرور */}
            تغيير كلمة المرور
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangePasswordDialog; // تصدير الكمبوننت
