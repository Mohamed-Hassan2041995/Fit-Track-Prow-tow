// هذا الكمبوننت يعرض خطة التمارين الرياضية الحالية لليوم، بما في ذلك تفاصيل التمارين، عدد المجموعات، التكرارات، وحالة الإنجاز.
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
import { FitnessCenter } from "@mui/icons-material";

// تعريف هيكل بيانات التمرين
interface Exercise {
  id: string; // معرف فريد للتمرين
  name: string; // اسم التمرين (مثل: ضغط الصدر، القرفصاء)
  sets: number; // عدد المجموعات
  reps: number; // عدد التكرارات في كل مجموعة
  completed: boolean; // تشير إلى ما إذا كان التمرين قد تم إكماله
}

const CurrentWorkoutPlan: React.FC = () => {
  // بيانات عينة تمثل تمارين اليوم
  const exercises: Exercise[] = [
    {
      id: "1",
      name: "ضغط الصدر",
      sets: 3,
      reps: 12,
      completed: true,
    },
    {
      id: "2",
      name: "القرفصاء",
      sets: 4,
      reps: 10,
      completed: false,
    },
    {
      id: "3",
      name: "رفع الأثقال",
      sets: 3,
      reps: 8,
      completed: false,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        تمارين اليوم
      </Typography>
      <List>
        {exercises.map((exercise) => (
          <ListItem
            key={exercise.id}
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              mb: 1,
              "&:last-child": { mb: 0 },
            }}
          >
            <ListItemIcon>
              <FitnessCenter />
            </ListItemIcon>
            <ListItemText
              primary={exercise.name}
              secondary={`${exercise.sets} مجموعات × ${exercise.reps} تكرارات`}
            />
            <Chip
              label={exercise.completed ? "مكتمل" : "معلق"}
              color={exercise.completed ? "success" : "default"}
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CurrentWorkoutPlan;
