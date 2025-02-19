/**
 * مكون TraineesSummary:
 * - يعرض ملخص عدد المتدربين الكلي.
 * - يستخدم `SummaryCard` لعرض العدد مع أيقونة.
 * - يتضمن عرض دائري للتقدم عند تحميل البيانات.
 */

import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { DirectionsRun } from "@mui/icons-material";
import SummaryCard from "../common/SummaryCard";

const TraineesSummary: React.FC = () => {
  // TODO: استبدل هذا بالقيمة الفعلية من استدعاء API
  const totalTrainees = 125; // إجمالي عدد المتدربين
  const loading = false; // حالة التحميل

  return (
    <SummaryCard
      icon={<DirectionsRun sx={{ fontSize: 40 }} />}
      title="Total Trainees"
      value={loading ? <CircularProgress size={20} /> : totalTrainees} // عرض دائرة التحميل إذا كانت البيانات قيد التحميل
      color="#ed6c02"
    >
      <Box sx={{ mt: 2 }}>
        {/* معلومات إضافية حول المتدربين */}
        <Typography variant="body2" color="text.secondary">
          Active trainees: 100
        </Typography>
        <Typography variant="body2" color="text.secondary">
          With active plans: 95
        </Typography>
      </Box>
    </SummaryCard>
  );
};

export default TraineesSummary;
