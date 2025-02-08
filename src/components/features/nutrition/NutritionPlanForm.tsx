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

interface NutritionPlanFormProps {
  initialValues?: Partial<NutritionPlan>;
  onSubmit: (values: Partial<NutritionPlan>) => void;
  traineeId: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  dailyCalorieTarget: Yup.number().min(0).required("Required"),
  startDate: Yup.date().required("Required"),
  endDate: Yup.date().min(
    Yup.ref("startDate"),
    "End date must be after start date"
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
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
      },
      ...initialValues,
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const addMeal = (mealType: keyof NutritionPlan["meals"]) => {
    const newMeal: Meal = {
      id: Date.now().toString(),
      name: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      ingredients: [],
    };
    formik.setFieldValue(`meals.${mealType}`, [
      ...formik.values.meals[mealType],
      newMeal,
    ]);
  };

  const removeMeal = (
    mealType: keyof NutritionPlan["meals"],
    index: number
  ) => {
    const meals = [...formik.values.meals[mealType]];
    meals.splice(index, 1);
    formik.setFieldValue(`meals.${mealType}`, meals);
  };

  const renderMealSection = (
    mealType: keyof NutritionPlan["meals"],
    title: string
  ) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
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
                name={`meals.${mealType}.${index}.name`}
                label="Meal Name"
                value={meal.name}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                type="number"
                name={`meals.${mealType}.${index}.calories`}
                label="Calories"
                value={meal.calories}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <IconButton
                color="error"
                onClick={() => removeMeal(mealType, index)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="number"
                name={`meals.${mealType}.${index}.protein`}
                label="Protein (g)"
                value={meal.protein}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="number"
                name={`meals.${mealType}.${index}.carbs`}
                label="Carbs (g)"
                value={meal.carbs}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="number"
                name={`meals.${mealType}.${index}.fats`}
                label="Fats (g)"
                value={meal.fats}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button
        startIcon={<AddIcon />}
        onClick={() => addMeal(mealType)}
        variant="outlined"
        sx={{ mt: 1 }}
      >
        Add {title}
      </Button>
    </Box>
  );

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 , p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="name"
            label="Plan Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            type="number"
            name="dailyCalorieTarget"
            label="Daily Calorie Target"
            value={formik.values.dailyCalorieTarget}
            onChange={formik.handleChange}
            error={
              formik.touched.dailyCalorieTarget &&
              Boolean(formik.errors.dailyCalorieTarget)
            }
            helperText={
              formik.touched.dailyCalorieTarget &&
              formik.errors.dailyCalorieTarget
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            name="startDate"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.startDate}
            onChange={formik.handleChange}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            name="endDate"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.endDate}
            onChange={formik.handleChange}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
          />
        </Grid>

        <Grid item xs={12}>
          {renderMealSection("breakfast", "Breakfast")}
          {renderMealSection("lunch", "Lunch")}
          {renderMealSection("dinner", "Dinner")}
          {renderMealSection("snacks", "Snacks")}
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Save Nutrition Plan
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NutritionPlanForm;
