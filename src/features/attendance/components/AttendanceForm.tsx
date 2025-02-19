// هذا الكمبونانت يمثل نموذج تسجيل الحضور، حيث يتيح للمستخدم إدخال تفاصيل الحضور مثل التاريخ، الحالة، والملاحظات.
// يتم استخدام مكتبة Formik لإدارة حالة النموذج والتحقق من صحة البيانات باستخدام مكتبة Yup.
// عند تقديم النموذج، يتم استدعاء الدالة onSubmit التي تمرر البيانات المدخلة.

import React from "react"; // استيراد React
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
} from "@mui/material"; // استيراد العناصر من مكتبة Material-UI
import { useFormik } from "formik"; // استيراد useFormik من مكتبة Formik
import * as Yup from "yup"; // استيراد Yup للتحقق من صحة البيانات
import { AttendanceRecord } from "../../../types/attendance"; // استيراد نوع AttendanceRecord

// تعريف واجهة AttendanceFormProps لتحديد خصائص الكمبونانت
interface AttendanceFormProps {
  onSubmit: (record: Partial<AttendanceRecord>) => void; // دالة يتم استدعاؤها عند تقديم النموذج
  traineeId: string; // معرّف المتدرب
}

// تعريف مخطط التحقق من صحة البيانات
const validationSchema = Yup.object({
  date: Yup.date().required("Date is required"), // التاريخ مطلوب
  status: Yup.string().required("Status is required"), // الحالة مطلوبة
  notes: Yup.string(), // الملاحظات (اختياري)
});

// تعريف الكمبونانت AttendanceForm
const AttendanceForm: React.FC<AttendanceFormProps> = ({
  onSubmit,
  traineeId,
}) => {
  // إعداد Formik لإدارة حالة النموذج
  const formik = useFormik({
    initialValues: {
      date: new Date().toISOString().split("T")[0], // تعيين التاريخ الافتراضي إلى تاريخ اليوم
      status: "present", // تعيين الحالة الافتراضية إلى "موجود"
      notes: "", // ملاحظات افتراضية فارغة
      traineeId, // معرّف المتدرب
    },
    validationSchema, // استخدام مخطط التحقق من الصحة
    onSubmit: (values) => {
      onSubmit(values); // استدعاء دالة onSubmit عند تقديم النموذج
    },
  });

  return (
    <Paper sx={{ p: 3 }}>
      {" "}
      {/* ورقة تحتوي على محتوى النموذج */}
      <Typography variant="h6" gutterBottom>
        Record Attendance
      </Typography>{" "}
      {/* عنوان النموذج */}
      <Box component="form" onSubmit={formik.handleSubmit}>
        {" "}
        {/* صندوق يحتوي على النموذج */}
        <TextField
          fullWidth
          name="date" // اسم الحقل
          label="Date" // عنوان الحقل
          type="date" // نوع الحقل
          value={formik.values.date} // القيمة الحالية للحقل
          onChange={formik.handleChange} // دالة تغيير القيمة
          error={formik.touched.date && Boolean(formik.errors.date)} // تحديد إذا كان هناك خطأ في الحقل
          helperText={formik.touched.date && formik.errors.date} // نص المساعدة في حالة وجود خطأ
          sx={{ mb: 2 }} // هوامش أسفل الحقل
          InputLabelProps={{ shrink: true }} // ضبط خصائص عنوان الحقل
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          {" "}
          {/* حقل اختيار الحالة */}
          <InputLabel>Status</InputLabel> {/* عنوان الحقل */}
          <Select
            name="status" // اسم الحقل
            value={formik.values.status} // القيمة الحالية للحقل
            onChange={formik.handleChange} // دالة تغيير القيمة
            label="Status" // عنوان الحقل
          >
            <MenuItem value="present">Present</MenuItem> {/* خيار "موجود" */}
            <MenuItem value="absent">Absent</MenuItem> {/* خيار "غائب" */}
            <MenuItem value="late">Late</MenuItem> {/* خيار "متأخر" */}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          name="notes" // اسم الحقل
          label="Notes" // عنوان الحقل
          multiline // تمكين إدخال نص متعدد الأسطر
          rows={4} // عدد الصفوف
          value={formik.values.notes} // القيمة الحالية للحقل
          onChange={formik.handleChange} // دالة تغيير القيمة
          sx={{ mb: 2 }} // هوامش أسفل الحقل
        />
        <Button type="submit" variant="contained" fullWidth>
          {" "}
          {/* زر تقديم النموذج */}
          Record Attendance
        </Button>
      </Box>
    </Paper>
  );
};

export default AttendanceForm; // تصدير الكمبونانت
