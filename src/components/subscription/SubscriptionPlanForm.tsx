// هذا الكمبوننت يستخدم لإنشاء أو تعديل خطة اشتراك جديدة.
// يتم استخدام مكتبة Formik لإدارة حالة النموذج والتحقق من صحة البيانات باستخدام Yup.
// يحتوي الكمبوننت على حقول مختلفة لتحديد تفاصيل خطة الاشتراك، مثل الاسم، النوع، الميزات، السعر، والوصف.
// بعد ملء النموذج، يتم استدعاء دالة onSubmit لإرسال القيم المدخلة.
import React from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  SubscriptionPlan,
  SubscriptionType,
  PlanFeature,
} from "../../types/subscription";

interface SubscriptionPlanFormProps {
  initialValues?: Partial<SubscriptionPlan>; // القيم الأولية للنموذج (إن وجدت)
  onSubmit: (values: Partial<SubscriptionPlan>) => void; // دالة لاستدعاء عند تقديم النموذج
  onCancel: () => void; // دالة لاستدعاء عند إلغاء العملية
}

// تعريف مخطط التحقق من صحة البيانات باستخدام Yup
const validationSchema = Yup.object({
  name: Yup.string().required("مطلوب"),
  type: Yup.string().required("مطلوب"),
  features: Yup.string().required("مطلوب"),
  price: Yup.number().min(0).required("مطلوب"),
  description: Yup.string().required("مطلوب"),
  duration: Yup.number().when("type", {
    is: (type: string) => type !== "per-session", // شرط للتأكد من صحة المدة
    then: Yup.number().min(1).required("مطلوب"),
  }),
  sessions: Yup.number().when("type", {
    is: "per-session",
    then: Yup.number().min(1).required("مطلوب"),
  }),
});

const SubscriptionPlanForm: React.FC<SubscriptionPlanFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  // إعداد Formik لإدارة حالة النموذج
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "monthly" as SubscriptionType,
      features: "workout" as PlanFeature,
      price: 0,
      description: "",
      duration: 30,
      sessions: undefined,
      ...initialValues, // دمج القيم الأولية (إن وجدت)
    },
    validationSchema, // تطبيق مخطط التحقق من الصحة
    onSubmit: (values) => {
      onSubmit(values); // استدعاء دالة onSubmit مع القيم المدخلة
    },
  });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {initialValues ? "تعديل خطة الاشتراك" : "إنشاء خطة اشتراك جديدة"}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name"
              label="اسم الخطة"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)} // التحقق من الأخطاء
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              name="type"
              label="نوع الاشتراك"
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <MenuItem value="per-session">لكل جلسة</MenuItem>
              <MenuItem value="monthly">شهري</MenuItem>
              <MenuItem value="package">باقة</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              name="features"
              label="الميزات"
              value={formik.values.features}
              onChange={formik.handleChange}
            >
              <MenuItem value="workout">تمارين فقط</MenuItem>
              <MenuItem value="nutrition">تغذية فقط</MenuItem>
              <MenuItem value="both">تمارين وتغذية</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              name="price"
              label="السعر"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)} // التحقق من الأخطاء
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>

          {formik.values.type !== "per-session" && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                name="duration"
                label="المدة (بالأيام)"
                value={formik.values.duration}
                onChange={formik.handleChange}
                error={
                  formik.touched.duration && Boolean(formik.errors.duration)
                } // التحقق من الأخطاء
                helperText={formik.touched.duration && formik.errors.duration}
              />
            </Grid>
          )}

          {formik.values.type === "per-session" && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                name="sessions"
                label="عدد الجلسات"
                value={formik.values.sessions}
                onChange={formik.handleChange}
                error={
                  formik.touched.sessions && Boolean(formik.errors.sessions)
                } // التحقق من الأخطاء
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
              label="الوصف"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              } // التحقق من الأخطاء
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button onClick={onCancel}>إلغاء</Button>
              <Button type="submit" variant="contained" color="primary">
                {initialValues ? "حفظ التغييرات" : "إنشاء الخطة"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SubscriptionPlanForm;
