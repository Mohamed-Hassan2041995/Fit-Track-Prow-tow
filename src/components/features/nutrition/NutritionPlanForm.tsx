import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Meal, NutritionPlan } from "../../../types/nutrition";

/**
 * NutritionPlanForm هو كمبوننت لإدارة نموذج خطة التغذية.
 * يسمح للمستخدم بإضافة تفاصيل الخطة مثل الاسم، الوصف، الأهداف اليومية من السعرات الحرارية،
 * تواريخ البدء والانتهاء، بالإضافة إلى الوجبات المختلفة (الإفطار، الغداء، العشاء، والوجبات الخفيفة).
 */

interface NutritionPlanFormProps {
  initialValues?: Partial<NutritionPlan>; // القيم الأولية للنموذج
  onSubmit: (values: Partial<NutritionPlan>) => void; // دالة المعالجة عند إرسال النموذج
  traineeId: string; // معرف المتدرب
}

const validationSchema = Yup.object({
  name: Yup.string().required("مطلوب"), // تحقق من أن الاسم مطلوب
  description: Yup.string().required("مطلوب"), // تحقق من أن الوصف مطلوب
  dailyCalorieTarget: Yup.number().min(0).required("مطلوب"), // تحقق من أن الهدف اليومي من السعرات الحرارية مطلوب وألا يقل عن 0
  startDate: Yup.date().required("مطلوب"), // تحقق من أن تاريخ البدء مطلوب
  endDate: Yup.date().min(
    Yup.ref("startDate"),
    "يجب أن يكون تاريخ الانتهاء بعد تاريخ البدء" // تحقق من أن تاريخ الانتهاء بعد تاريخ البدء
  ),
});

const NutritionPlanForm: React.FC<NutritionPlanFormProps> = ({
  initialValues,
  onSubmit,
  traineeId,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      traineeId,
      dailyCalorieTarget: 0,
      startDate: "",
      endDate: "",
      meals: {
        breakfast: [], // قائمة الإفطار
        lunch: [], // قائمة الغداء
        dinner: [], // قائمة العشاء
        snacks: [], // قائمة الوجبات الخفيفة
      },
      ...initialValues, // دمج القيم الأولية
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values); // استدعاء دالة المعالجة عند إرسال النموذج
    },
  });

  // دالة لإضافة وجبة جديدة لنوع الوجبة المحدد
  const addMeal = (mealType: keyof NutritionPlan["meals"]) => {
    const newMeal: Meal = {
      id: Date.now().toString(), // استخدام التاريخ الحالي كمعرف
      name: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      ingredients: [], // قائمة المكونات
    };
    formik.setFieldValue(`meals.${mealType}`, [
      ...formik.values.meals[mealType],
      newMeal, // إضافة الوجبة الجديدة للقائمة
    ]);
  };

  // دالة لإزالة وجبة من نوع الوجبة المحدد
  const removeMeal = (
    mealType: keyof NutritionPlan["meals"],
    index: number
  ) => {
    const meals = [...formik.values.meals[mealType]]; // نسخ قائمة الوجبات
    meals.splice(index, 1); // إزالة الوجبة المحددة
    formik.setFieldValue(`meals.${mealType}`, meals); // تحديث القائمة
  };

  // دالة لعرض قسم الوجبة
  const renderMealSection = (
    mealType: keyof NutritionPlan["meals"],
    title: string
  ) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title} {/* عنوان قسم الوجبة */}
      </Typography>
      {formik.values.meals[mealType].map((meal, index) => (
        <Box
          key={meal.id}
          sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 1 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name={`meals.${mealType}.${index}.name`} // اسم الوجبة
                label="اسم الوجبة"
                value={meal.name}
                onChange={formik.handleChange} // معالجة تغيير القيمة
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                type="number"
                name={`meals.${mealType}.${index}.calories`} // السعرات الحرارية
                label="السعرات الحرارية"
                value={meal.calories}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <IconButton
                color="error"
                onClick={() => removeMeal(mealType, index)} // إزالة الوجبة عند الضغط
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="number"
                name={`meals.${mealType}.${index}.protein`} // البروتين
                label="بروتين (غ)"
                value={meal.protein}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="number"
                name={`meals.${mealType}.${index}.carbs`} // الكربوهيدرات
                label="كربوهيدرات (غ)"
                value={meal.carbs}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="number"
                name={`meals.${mealType}.${index}.fats`} // الدهون
                label="دهون (غ)"
                value={meal.fats}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button
        startIcon={<AddIcon />}
        onClick={() => addMeal(mealType)} // إضافة وجبة جديدة عند الضغط
        variant="outlined"
        sx={{ mt: 1 }}
      >
        إضافة {title}
      </Button>
    </Box>
  );

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="name" // اسم الخطة
            label="اسم الخطة"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)} // التحقق من وجود أخطاء
            helperText={formik.touched.name && formik.errors.name} // عرض رسالة الخطأ
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            name="description" // وصف الخطة
            label="الوصف"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            } // التحقق من وجود أخطاء
            helperText={formik.touched.description && formik.errors.description} // عرض رسالة الخطأ
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            type="number"
            name="dailyCalorieTarget" // الهدف اليومي من السعرات الحرارية
            label="الهدف اليومي من السعرات الحرارية"
            value={formik.values.dailyCalorieTarget}
            onChange={formik.handleChange}
            error={
              formik.touched.dailyCalorieTarget &&
              Boolean(formik.errors.dailyCalorieTarget)
            } // التحقق من وجود أخطاء
            helperText={
              formik.touched.dailyCalorieTarget &&
              formik.errors.dailyCalorieTarget
            } // عرض رسالة الخطأ
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            name="startDate" // تاريخ البدء
            label="تاريخ البدء"
            InputLabelProps={{ shrink: true }}
            value={formik.values.startDate}
            onChange={formik.handleChange}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)} // التحقق من وجود أخطاء
            helperText={formik.touched.startDate && formik.errors.startDate} // عرض رسالة الخطأ
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            name="endDate" // تاريخ الانتهاء
            label="تاريخ الانتهاء"
            InputLabelProps={{ shrink: true }}
            value={formik.values.endDate}
            onChange={formik.handleChange}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)} // التحقق من وجود أخطاء
            helperText={formik.touched.endDate && formik.errors.endDate} // عرض رسالة الخطأ
          />
        </Grid>

        <Grid item xs={12}>
          {renderMealSection("breakfast", "الإفطار")} {/* عرض قسم الإفطار */}
          {renderMealSection("lunch", "الغداء")} {/* عرض قسم الغداء */}
          {renderMealSection("dinner", "العشاء")} {/* عرض قسم العشاء */}
          {renderMealSection("snacks", "الوجبات الخفيفة")}{" "}
          {/* عرض قسم الوجبات الخفيفة */}
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            حفظ خطة التغذية {/* زر لحفظ الخطة */}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NutritionPlanForm; // تصدير الكمبوننت
