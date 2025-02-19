// هذا الكمبوننت يقوم بإنشاء نموذج لتذكرة دعم، حيث يمكن للمستخدم إدخال عنوان التذكرة، وصفها، أولويتها، وفئتها.
// يتم استخدام مكتبة Formik لإدارة حالة النموذج والتحقق من الصحة باستخدام مكتبة Yup.

import React from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

// تعريف نوع التذكرة للدعم
interface SupportTicket {
  title: string; // عنوان التذكرة
  description: string; // وصف التذكرة
  priority: "low" | "medium" | "high"; // أولوية التذكرة
  category: "technical" | "billing" | "general"; // فئة التذكرة
}

// تعريف مخطط التحقق من صحة البيانات المدخلة باستخدام Yup
const validationSchema = Yup.object({
  title: Yup.string().required("مطلوب"), // التحقق من أن العنوان مطلوب
  description: Yup.string().required("مطلوب"), // التحقق من أن الوصف مطلوب
  priority: Yup.string().required("مطلوب"), // التحقق من أن الأولوية مطلوبة
  category: Yup.string().required("مطلوب"), // التحقق من أن الفئة مطلوبة
});

// كمبوننت نموذج تذكرة الدعم
const SupportTicketForm: React.FC = () => {
  // إعداد Formik لإدارة حالة النموذج
  const formik = useFormik({
    initialValues: {
      title: "", // القيم الأولية للنموذج
      description: "",
      priority: "medium",
      category: "general",
    },
    validationSchema,
    onSubmit: (values) => {
      // TODO: تنفيذ مكالمة API لإنشاء تذكرة الدعم
      console.log("تذكرة الدعم:", values); // عرض القيم المدخلة في وحدة التحكم
    },
  });

  return (
    <Paper sx={{ p: 3 }}>
      {" "}
      {/* عنصر ورقة لتنسيق النموذج */}
      <Typography variant="h6" gutterBottom>
        إنشاء تذكرة دعم
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {" "}
        {/* معالجة تقديم النموذج */}
        <TextField
          fullWidth
          name="title"
          label="العنوان" // نص العنوان
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)} // التحقق من وجود خطأ
          helperText={formik.touched.title && formik.errors.title} // عرض رسالة الخطأ
          sx={{ mb: 2 }} // تنسيق المسافة السفلية
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          name="description"
          label="الوصف" // نص الوصف
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          } // التحقق من وجود خطأ
          helperText={formik.touched.description && formik.errors.description} // عرض رسالة الخطأ
          sx={{ mb: 2 }} // تنسيق المسافة السفلية
        />
        <TextField
          fullWidth
          select
          name="priority"
          label="الأولوية" // نص الأولوية
          value={formik.values.priority}
          onChange={formik.handleChange}
          error={formik.touched.priority && Boolean(formik.errors.priority)} // التحقق من وجود خطأ
          helperText={formik.touched.priority && formik.errors.priority} // عرض رسالة الخطأ
          sx={{ mb: 2 }} // تنسيق المسافة السفلية
        >
          <MenuItem value="low">منخفض</MenuItem> {/* خيار الأولوية المنخفضة */}
          <MenuItem value="medium">متوسط</MenuItem>{" "}
          {/* خيار الأولوية المتوسطة */}
          <MenuItem value="high">مرتفع</MenuItem> {/* خيار الأولوية المرتفعة */}
        </TextField>
        <TextField
          fullWidth
          select
          name="category"
          label="الفئة" // نص الفئة
          value={formik.values.category}
          onChange={formik.handleChange}
          error={formik.touched.category && Boolean(formik.errors.category)} // التحقق من وجود خطأ
          helperText={formik.touched.category && formik.errors.category} // عرض رسالة الخطأ
          sx={{ mb: 2 }} // تنسيق المسافة السفلية
        >
          <MenuItem value="technical">تقني</MenuItem> {/* خيار الفئة التقنية */}
          <MenuItem value="billing">فواتير</MenuItem> {/* خيار فئة الفواتير */}
          <MenuItem value="general">عام</MenuItem> {/* خيار الفئة العامة */}
        </TextField>
        <Button
          type="submit"
          variant="contained" // نمط الزر
          disabled={formik.isSubmitting} // تعطيل الزر أثناء التقديم
        >
          إرسال التذكرة
        </Button>
      </form>
    </Paper>
  );
};

export default SupportTicketForm; // تصدير الكمبوننت
