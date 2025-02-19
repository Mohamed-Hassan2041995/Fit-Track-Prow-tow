/**
 * مكون TrainersSummary:
 * - يعرض ملخص عدد المدربين الكلي.
 * - يستخدم `SummaryCard` لعرض العدد مع أيقونة.
 * - يتضمن عرض دائري للتقدم عند تحميل البيانات.
 */

import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { FitnessCenter } from "@mui/icons-material";
import SummaryCard from "../common/SummaryCard";

const TrainersSummary: React.FC = () => {
  // TODO: استبدل هذا بالقيمة الفعلية من استدعاء API
  const totalTrainers = 25; // إجمالي عدد المدربين
  const loading = false; // حالة التحميل

  return (
    <SummaryCard
      icon={<FitnessCenter sx={{ fontSize: 40 }} />}
      title="Total Trainers"
      value={loading ? <CircularProgress size={20} /> : totalTrainers} // عرض دائرة التحميل إذا كانت البيانات قيد التحميل
      color="#2e7d32"
    >
      <Box sx={{ mt: 2 }}>
        {/* معلومات إضافية حول المدربين */}
        <Typography variant="body2" color="text.secondary">
          Active trainers: 20
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Average trainees per trainer: 8
        </Typography>
      </Box>
    </SummaryCard>
  );
};

export default TrainersSummary;
