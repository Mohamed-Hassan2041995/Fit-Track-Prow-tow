import React from "react";
import { Paper, Typography, Grid, TextField, Button, Box } from "@mui/material";
import { useFormik } from "formik"; // استيراد مكتبة Formik لإدارة الحالة
import * as Yup from "yup"; // استيراد مكتبة Yup للتحقق من صحة البيانات

// تعريف مخطط التحقق من صحة البيانات
const validationSchema = Yup.object({
  weight: Yup.number().required("الوزن مطلوب").min(20, "الوزن غير صحيح"), // الوزن يجب أن يكون عددًا مطلوبًا وألا يقل عن 20
  height: Yup.number().required("الطول مطلوب").min(100, "الطول غير صحيح"), // الطول يجب أن يكون عددًا مطلوبًا وألا يقل عن 100
  bodyFatPercentage: Yup.number().min(0).max(100), // نسبة الدهون يجب أن تكون بين 0 و 100
  muscleMass: Yup.number().min(0), // كتلة العضلات يجب أن تكون عددًا غير سالب
  totalBodyWater: Yup.number().min(0), // إجمالي مياه الجسم يجب أن تكون عددًا غير سالب
  visceralFatLevel: Yup.number().min(0), // مستوى الدهون الحشوية يجب أن تكون عددًا غير سالب
  basalMetabolicRate: Yup.number().min(0), // معدل الأيض الأساسي يجب أن تكون عددًا غير سالب
});

// واجهة تعريف الخصائص التي يتوقعها المكون
interface InBodyFormProps {
  traineeId: string; // معرف المتدرب
  onSubmit: (values: any) => void; // دالة تعالج بيانات النموذج عند الإرسال
}

// مكون InBodyForm
const InBodyForm: React.FC<InBodyFormProps> = ({ traineeId, onSubmit }) => {
  // استخدام useFormik لإنشاء نموذج مع القيم الابتدائية ومخطط التحقق من الصحة
  const formik = useFormik({
    initialValues: {
      weight: "",
      height: "",
      bodyFatPercentage: "",
      muscleMass: "",
      totalBodyWater: "",
      visceralFatLevel: "",
      basalMetabolicRate: "",
      notes: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, traineeId }); // عند الإرسال، إضافة معرف المتدرب إلى البيانات المرسلة
    },
  });

  return (
    <Paper sx={{ p: 3 }}>
      {" "}
      {/* استخدام Paper لتصميم خلفية النموذج */}
      <Typography variant="h6" gutterBottom>
        تسجيل قياسات InBody
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {" "}
        {/* معالجة إرسال النموذج */}
        <Grid container spacing={2}>
          {" "}
          {/* حاوية الشبكة لعرض الحقول بشكل مرتب */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="weight"
              label="الوزن (كجم)"
              type="number"
              value={formik.values.weight} // قيمة حقل الوزن
              onChange={formik.handleChange} // دالة تغيير القيمة
              error={formik.touched.weight && Boolean(formik.errors.weight)} // تحقق من وجود خطأ
              helperText={formik.touched.weight && formik.errors.weight} // نص المساعدة لعرض الأخطاء
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="height"
              label="الطول (سم)"
              type="number"
              value={formik.values.height} // قيمة حقل الطول
              onChange={formik.handleChange} // دالة تغيير القيمة
              error={formik.touched.height && Boolean(formik.errors.height)} // تحقق من وجود خطأ
              helperText={formik.touched.height && formik.errors.height} // نص المساعدة لعرض الأخطاء
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="bodyFatPercentage"
              label="نسبة الدهون (%)"
              type="number"
              value={formik.values.bodyFatPercentage} // قيمة حقل نسبة الدهون
              onChange={formik.handleChange} // دالة تغيير القيمة
              error={
                formik.touched.bodyFatPercentage &&
                Boolean(formik.errors.bodyFatPercentage)
              } // تحقق من وجود خطأ
              helperText={
                formik.touched.bodyFatPercentage &&
                formik.errors.bodyFatPercentage
              } // نص المساعدة لعرض الأخطاء
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="muscleMass"
              label="كتلة العضلات (كجم)"
              type="number"
              value={formik.values.muscleMass} // قيمة حقل كتلة العضلات
              onChange={formik.handleChange} // دالة تغيير القيمة
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="notes"
              label="ملاحظات"
              value={formik.values.notes} // قيمة حقل الملاحظات
              onChange={formik.handleChange} // دالة تغيير القيمة
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit" // زر الإرسال
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
