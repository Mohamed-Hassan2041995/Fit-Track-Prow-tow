// مكون RatingForm
// وظيفة المكون:
// - عرض نموذج يسمح للمستخدم بتقييم المدرب (trainer) أو المتدرب (trainee).
// - يحتوي على نظام تقييم بالنجوم، بالإضافة إلى حقل نصي لإضافة ملاحظات (feedback).
// - عند إرسال التقييم، يتم تمرير البيانات إلى دالة onSubmit التي يتم تمريرها كمُعطى (prop).

import React, { useState } from "react"; // استيراد React واستخدام useState لإدارة الحالة
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Paper,
} from "@mui/material"; // استيراد مكونات MUI
import { Star as StarIcon } from "@mui/icons-material"; // استيراد أيقونة النجمة للتقييم

// تعريف واجهة الخصائص (Props) الخاصة بالمكون
interface RatingFormProps {
  targetId: string; // معرف العنصر الذي يتم تقييمه (مثل ID للمدرب أو المتدرب)
  targetType: "trainer" | "trainee"; // نوع العنصر الذي يتم تقييمه (إما مدرب أو متدرب)
  onSubmit: (rating: number, feedback: string) => void; // دالة يتم استدعاؤها عند إرسال التقييم
}

// تعريف مكون RatingForm
const RatingForm: React.FC<RatingFormProps> = ({
  targetId,
  targetType,
  onSubmit,
}) => {
  // حالة تخزين قيمة التقييم (عدد النجوم)
  const [rating, setRating] = useState<number | null>(0);
  // حالة تخزين نص الملاحظات (feedback)
  const [feedback, setFeedback] = useState("");

  // دالة يتم استدعاؤها عند الضغط على زر الإرسال
  const handleSubmit = () => {
    if (rating === null) return; // إذا لم يتم تحديد تقييم، لا يتم الإرسال
    onSubmit(rating, feedback); // تمرير البيانات إلى الدالة onSubmit
  };

  return (
    <Paper sx={{ p: 3 }}>
      {" "}
      {/* غلاف ورقي لإضفاء شكل مميز للنموذج */}
      {/* عنوان النموذج يختلف حسب نوع الشخص الذي يتم تقييمه */}
      <Typography variant="h6" gutterBottom>
        Rate {targetType === "trainer" ? "Trainer" : "Trainee"}
      </Typography>
      {/* حقل التقييم بالنجوم */}
      <Box sx={{ mb: 2 }}>
        <Typography component="legend">Rating</Typography>
        <Rating
          value={rating} // تحديد قيمة التقييم
          onChange={(_, newValue) => setRating(newValue)} // تحديث الحالة عند تغيير التقييم
          precision={0.5} // السماح بنصف نجمة كحد أدنى
          icon={<StarIcon fontSize="inherit" />} // تخصيص شكل الأيقونة المستخدمة للتقييم
        />
      </Box>
      {/* حقل إدخال الملاحظات */}
      <TextField
        fullWidth
        multiline
        rows={4} // جعل الحقل يحتوي على 4 أسطر لكتابة الملاحظات
        label="Feedback" // تسمية الحقل
        value={feedback} // ربطه بحالة feedback
        onChange={(e) => setFeedback(e.target.value)} // تحديث الحالة عند تغيير النص
        sx={{ mb: 2 }} // إضافة تباعد أسفل الحقل
      />
      {/* زر الإرسال */}
      <Button
        variant="contained" // جعل الزر مملوءًا (مظهر مميز)
        onClick={handleSubmit} // استدعاء الدالة عند النقر
        disabled={rating === null} // تعطيل الزر إذا لم يتم تحديد تقييم
      >
        Submit Rating
      </Button>
    </Paper>
  );
};

export default RatingForm; // تصدير المكون لاستخدامه في أجزاء أخرى من التطبيق
