import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  LinearProgress,
  Chip,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { Exercise } from "../../../types/workout";

interface WorkoutCardProps {
  name: string; // اسم التمرين
  exercise: Exercise; // كائن يحتوي على تفاصيل التمرين
  completed?: boolean; // حالة الانتهاء (اختياري)
}

// تعريف أنيميشن النبض
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// قاموس لصور التمارين - يمكن توسيعه حسب الحاجة
const exerciseImages: Record<string, string> = {
  "bench press": "https://api.exercisedb.io/image/bench-press.jpg",
  squat: "https://api.exercisedb.io/image/squat.jpg",
  deadlift: "https://api.exercisedb.io/image/deadlift.jpg",
  // يمكن إضافة المزيد من التمارين هنا
  default: "https://api.exercisedb.io/image/default-exercise.jpg",
};

// مكون بطاقة التمرين
const WorkoutCard: React.FC<WorkoutCardProps> = ({
  name,
  exercise,
  completed = false, // القيمة الافتراضية للحالة
}) => {
  // دالة للحصول على صورة التمرين بناءً على اسمه
  const getExerciseImage = (exerciseName: string) => {
    const normalizedName = exerciseName.toLowerCase(); // تحويل الاسم إلى حروف صغيرة
    return exerciseImages[normalizedName] || exerciseImages.default; // إرجاع الصورة المناسبة
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)", // تحريك البطاقة عند التمرير عليها
          boxShadow: 6, // إضافة ظل
          animation: `${pulseAnimation} 1s ease-in-out`, // تطبيق الأنيميشن
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={getExerciseImage(name)} // استخدام دالة الحصول على الصورة
        alt={name}
        sx={{ objectFit: "cover" }} // ضبط كيفية ملء الصورة
      />

      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {name} // عرض اسم التمرين
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography color="text.secondary">
            {exercise.sets} sets × {exercise.reps} reps // عرض عدد المجموعات
            والتكرارات
          </Typography>
          {exercise.weight && (
            <Typography color="text.secondary">
              Weight: {exercise.weight} kg // عرض الوزن إذا كان موجودًا
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Chip
            label={completed ? "Completed" : "Pending"} // عرض حالة الانتهاء
            color={completed ? "success" : "default"} // تغيير لون الشريحة بناءً على الحالة
            size="small"
          />
        </Box>

        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate" // تحديد القيمة
            value={completed ? 100 : 0} // تحديد نسبة التقدم
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: "#e0e0e0", // لون الخلفية
              "& .MuiLinearProgress-bar": {
                backgroundColor: completed ? "#4caf50" : "#1976d2", // لون شريط التقدم
                borderRadius: 5,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard; // تصدير المكون
