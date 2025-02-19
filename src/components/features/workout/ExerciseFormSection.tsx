import React from "react";
import { Box, Grid, TextField, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { FormikProps } from "formik";
import { Exercise } from "../../../types/workout";

interface ExerciseFormSectionProps {
  exercise: Exercise; // تمرين يحتوي على تفاصيل معينة
  index: number; // فهرس التمرين في القائمة
  onRemove: () => void; // دالة لإزالة التمرين
  formik: FormikProps<any>; // كائن Formik لإدارة حالة النموذج
}

/**
 * مكون قسم نموذج التمرين:
 * يعرض حقول إدخال لمعلومات التمرين مثل الاسم، المجموعات، والتكرارات.
 * يتضمن أيضاً زر لحذف التمرين من النموذج.
 */
const ExerciseFormSection: React.FC<ExerciseFormSectionProps> = ({
  exercise,
  index,
  onRemove,
  formik,
}) => {
  return (
    <Box sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name={`exercises.${index}.name`} // اسم حقل النموذج
            label="Exercise Name" // عنوان الحقل
            value={exercise.name} // قيمة الحقل
            onChange={formik.handleChange} // دالة التغيير
            error={
              formik.touched.exercises?.[index]?.name && // تحقق من وجود خطأ
              Boolean(formik.errors.exercises?.[index]?.name)
            }
            helperText={
              formik.touched.exercises?.[index]?.name && // نص المساعدة يظهر في حالة وجود خطأ
              formik.errors.exercises?.[index]?.name
            }
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            fullWidth
            type="number" // نوع الحقل: عدد
            name={`exercises.${index}.sets`} // اسم حقل النموذج
            label="Sets" // عنوان الحقل
            value={exercise.sets} // قيمة الحقل
            onChange={formik.handleChange} // دالة التغيير
            error={
              formik.touched.exercises?.[index]?.sets && // تحقق من وجود خطأ
              Boolean(formik.errors.exercises?.[index]?.sets)
            }
            helperText={
              formik.touched.exercises?.[index]?.sets && // نص المساعدة يظهر في حالة وجود خطأ
              formik.errors.exercises?.[index]?.sets
            }
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            fullWidth
            type="number" // نوع الحقل: عدد
            name={`exercises.${index}.reps`} // اسم حقل النموذج
            label="Reps" // عنوان الحقل
            value={exercise.reps} // قيمة الحقل
            onChange={formik.handleChange} // دالة التغيير
            error={
              formik.touched.exercises?.[index]?.reps && // تحقق من وجود خطأ
              Boolean(formik.errors.exercises?.[index]?.reps)
            }
            helperText={
              formik.touched.exercises?.[index]?.reps && // نص المساعدة يظهر في حالة وجود خطأ
              formik.errors.exercises?.[index]?.reps
            }
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <IconButton
            color="error" // لون الزر
            onClick={onRemove} // دالة لحذف التمرين عند النقر
            sx={{ mt: { xs: 1, sm: 0 } }} // ضبط الهامش العلوي حسب حجم الشاشة
          >
            <DeleteIcon /> // أيقونة الحذف
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExerciseFormSection; // تصدير المكون
