/**
 * مكون `RatingForm` لإضافة تقييم وتعليق
 *
 * - يمكن للمستخدم إدخال تقييم عددي (نجوم) وتعليق نصي.
 * - عند الإرسال، يتم حفظ التقييم في قاعدة البيانات باستخدام `useRatings`.
 * - يعرض إشعارًا عند نجاح أو فشل العملية باستخدام `useNotification`.
 * - يدعم تعطيل الإدخال أثناء الإرسال لمنع التكرار.
 */

import React, { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useRatings } from "../hooks/useRatings";
import { useNotification } from "../../../contexts/NotificationContext";

interface RatingFormProps {
  targetId: string; // معرف العنصر الذي سيتم تقييمه (مثل مستخدم أو منتج)
  onSuccess?: () => void; // دالة اختيارية يتم استدعاؤها بعد نجاح الإرسال
}

const RatingForm: React.FC<RatingFormProps> = ({ targetId, onSuccess }) => {
  // حالة لتخزين قيمة التقييم (عدد النجوم)
  const [score, setScore] = useState<number | null>(0);
  // حالة لتخزين نص التعليق
  const [feedback, setFeedback] = useState("");
  // حالة لمعرفة ما إذا كان الإرسال قيد التنفيذ
  const [submitting, setSubmitting] = useState(false);

  // دالة لإضافة التقييم، يتم جلبها من `useRatings`
  const { addRating } = useRatings(targetId);
  // دالة لإظهار الإشعارات، يتم جلبها من `useNotification`
  const { showNotification } = useNotification();

  // دالة لمعالجة إرسال التقييم
  const handleSubmit = async () => {
    if (!score) return; // التأكد من أن المستخدم أدخل تقييمًا قبل الإرسال

    try {
      setSubmitting(true); // تفعيل حالة الإرسال
      await addRating(score, feedback); // استدعاء الدالة لإضافة التقييم
      showNotification("تم إرسال التقييم بنجاح", "success"); // عرض إشعار النجاح
      setScore(0); // إعادة تعيين التقييم
      setFeedback(""); // إعادة تعيين نص التعليق
      onSuccess?.(); // استدعاء الدالة الاختيارية بعد النجاح
    } catch (error) {
      showNotification("فشل في إرسال التقييم", "error"); // عرض إشعار الخطأ
    } finally {
      setSubmitting(false); // إيقاف حالة الإرسال
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      {" "}
      {/* مكون ورقي لاحتواء نموذج التقييم */}
      <Typography variant="h6" gutterBottom>
        إضافة تقييم
      </Typography>
      {/* مكون التقييم (نجوم) */}
      <Box sx={{ mb: 2 }}>
        <Typography component="legend">التقييم</Typography>
        <Rating
          value={score}
          onChange={(_, value) => setScore(value)} // تحديث قيمة التقييم عند التغيير
          size="large"
          disabled={submitting} // تعطيل أثناء الإرسال
        />
      </Box>
      {/* مربع نص لإدخال التعليق */}
      <TextField
        fullWidth
        multiline
        rows={4}
        label="التعليق"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)} // تحديث نص التعليق عند الكتابة
        disabled={submitting} // تعطيل أثناء الإرسال
        sx={{ mb: 2 }}
      />
      {/* زر إرسال التقييم */}
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!score || submitting} // تعطيل إذا لم يتم إدخال تقييم أو أثناء الإرسال
      >
        إرسال التقييم
      </Button>
    </Paper>
  );
};

export default RatingForm;
