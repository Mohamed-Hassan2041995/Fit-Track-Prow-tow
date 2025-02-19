// هذا الكمبوننت يعرض خطة التغذية الحالية لليوم، بما في ذلك الوجبات، محتوى السعرات الحرارية، وحالة الاستهلاك.
import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from "@mui/material";
import { Restaurant } from "@mui/icons-material";

// تعريف هيكل بيانات الوجبة
interface Meal {
  id: string; // معرف فريد للوجبة
  name: string; // اسم الوجبة (مثل: الإفطار، الغداء)
  calories: number; // محتوى السعرات الحرارية للوجبة
  time: string; // الوقت المحدد للوجبة
  consumed: boolean; // تشير إلى ما إذا كانت الوجبة قد تم تناولها
}

const CurrentNutritionPlan: React.FC = () => {
  // بيانات عينة تمثل وجبات اليوم
  const meals: Meal[] = [
    {
      id: "1",
      name: "الإفطار",
      calories: 450,
      time: "8:00 صباحًا",
      consumed: true,
    },
    {
      id: "2",
      name: "الغداء",
      calories: 650,
      time: "1:00 مساءً",
      consumed: false,
    },
    {
      id: "3",
      name: "العشاء",
      calories: 550,
      time: "7:00 مساءً",
      consumed: false,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        وجبات اليوم
      </Typography>
      <List>
        {meals.map((meal) => (
          <ListItem
            key={meal.id}
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              mb: 1,
              "&:last-child": { mb: 0 },
            }}
          >
            <ListItemIcon>
              <Restaurant />
            </ListItemIcon>
            <ListItemText
              primary={meal.name}
              secondary={`${meal.calories} سعر حراري - ${meal.time}`}
            />
            <Chip
              label={meal.consumed ? "تم تناوله" : "معلق"}
              color={meal.consumed ? "success" : "default"}
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CurrentNutritionPlan;
