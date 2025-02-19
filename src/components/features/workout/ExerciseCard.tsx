import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
} from "@mui/material";
import { Exercise } from "../../../types/workout";

interface ExerciseCardProps {
  exercise: Exercise; // تمرين يحتوي على تفاصيل معينة
  completed?: boolean; // حالة التمرين، إما مكتمل أو قيد التنفيذ
}

/**
 * مكون بطاقة التمرين:
 * يعرض معلومات عن تمرين معين بما في ذلك اسمه، مجموعاته، تكراراته، والوزن المستخدم.
 * كما يظهر حالة التمرين (مكتمل أو قيد التنفيذ) مع تقدم مرئي باستخدام شريط التقدم.
 */
const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, completed }) => {
  // استخدام API للحصول على صور التمارين
  const getExerciseImage = (name: string) => {
    return `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(
      name
    )}`;
  };

  return (
    <Card
      sx={{
        height: "100%", // ملء المساحة العمودية
        display: "flex",
        flexDirection: "column", // ترتيب المحتويات عمودياً
        transition: "transform 0.2s", // إضافة تأثير الانتقال عند التحويم
        "&:hover": {
          transform: "scale(1.02)", // تكبير البطاقة عند التحويم
        },
      }}
    >
      <CardMedia
        component="img"
        height="200" // ارتفاع الصورة
        image={getExerciseImage(exercise.name)} // الحصول على صورة التمرين باستخدام API
        alt={exercise.name} // نص بديل للصورة
        sx={{ objectFit: "cover" }} // ضبط صورة لتغطي البطاقة بشكل جيد
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {exercise.name} // اسم التمرين
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography color="text.secondary">
            {exercise.sets} مجموعات × {exercise.reps} تكرار // عرض عدد المجموعات
            والتكرارات
          </Typography>
          {exercise.weight && (
            <Typography color="text.secondary">
              الوزن: {exercise.weight} كجم // عرض الوزن إذا تم تحديده
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Chip
            label={completed ? "مكتمل" : "قيد التنفيذ"} // عرض حالة التمرين
            color={completed ? "success" : "default"} // تغيير اللون حسب الحالة
            size="small" // حجم الشريحة
          />
        </Box>

        {completed !== undefined && (
          <LinearProgress
            variant="determinate"
            value={completed ? 100 : 0} // ضبط قيمة شريط التقدم حسب الحالة
            sx={{
              height: 8, // ارتفاع شريط التقدم
              borderRadius: 4, // زوايا مستديرة
              bgcolor: "grey.200", // لون الخلفية
              "& .MuiLinearProgress-bar": {
                borderRadius: 4, // زوايا مستديرة لشريط التقدم
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ExerciseCard; // تصدير المكون
