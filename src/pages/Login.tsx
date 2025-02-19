// هذا الكمبوننت يمثل صفحة تسجيل الدخول.
// يوفر واجهة مستخدم للمستخدمين لإدخال بياناتهم (البريد الإلكتروني وكلمة المرور)
// والتحقق منها باستخدام Formik وYup.
// عند تسجيل الدخول بنجاح، يتم توجيه المستخدم إلى صفحة لوحة القيادة.

import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// تعريف مخطط التحقق من صحة البيانات باستخدام Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address") // التحقق من أن البريد الإلكتروني له صيغة صحيحة
    .required("Email is required"), // التأكد من أن حقل البريد الإلكتروني مطلوب
  password: Yup.string().required("Password is required"), // التأكد من أن حقل كلمة المرور مطلوب
});

// تعريف الكمبوننت Login
const Login: React.FC = () => {
  const { login } = useAuth(); // استخدام الدالة login من سياق المصادقة
  const navigate = useNavigate(); // دالة التنقل إلى صفحة جديدة
  const [showPassword, setShowPassword] = useState(false); // حالة لتحديد إذا كان يجب عرض كلمة المرور

  // إعداد Formik لإدارة النموذج
  const formik = useFormik({
    initialValues: {
      email: "", // القيمة الأولية للبريد الإلكتروني
      password: "", // القيمة الأولية لكلمة المرور
    },
    validationSchema, // استخدام مخطط التحقق من صحة البيانات
    onSubmit: async (values, { setStatus }) => {
      try {
        await login(values.email, values.password); // محاولة تسجيل الدخول باستخدام البريد وكلمة المرور
        navigate("/dashboard"); // إذا نجح، انتقل إلى لوحة القيادة
      } catch (error) {
        setStatus("Invalid email or password"); // إذا فشل، عرض رسالة خطأ
      }
    },
  });

  // دالة لتبديل عرض كلمة المرور
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // تغيير حالة عرض كلمة المرور
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Sign in
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Demo accounts:
            <br />
            admin@example.com
            <br />
            trainer@example.com
            <br />
            trainee@example.com
            <br />
            Password: password
          </Typography>

          {formik.status && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formik.status} {/* عرض رسالة الخطأ إذا كانت موجودة */}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email Address"
              autoComplete="email"
              value={formik.values.email} // قيمة البريد الإلكتروني الحالية
              onChange={formik.handleChange} // تحديث القيمة عند تغييرها
              error={formik.touched.email && Boolean(formik.errors.email)} // التحقق من وجود أخطاء
              helperText={formik.touched.email && formik.errors.email} // عرض رسالة الخطأ
            />
            <TextField
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"} // عرض كلمة المرور أو إخفائها
              autoComplete="current-password"
              value={formik.values.password} // قيمة كلمة المرور الحالية
              onChange={formik.handleChange} // تحديث القيمة عند تغييرها
              error={formik.touched.password && Boolean(formik.errors.password)} // التحقق من وجود أخطاء
              helperText={formik.touched.password && formik.errors.password} // عرض رسالة الخطأ
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword} // تغيير حالة عرض كلمة المرور عند الضغط
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                      {/* أيقونة إظهار أو إخفاء كلمة المرور */}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={formik.isSubmitting} // تعطيل الزر أثناء الإرسال
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
