/**
 * مكون UsersSummary:
 * - يعرض ملخص عدد المستخدمين الكلي.
 * - يستخدم `SummaryCard` لعرض العدد مع أيقونة.
 * - يتضمن عرض دائري للتقدم عند تحميل البيانات.
 */

import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { People } from "@mui/icons-material";
import SummaryCard from "../common/SummaryCard";

const UsersSummary: React.FC = () => {
  // TODO: استبدل هذا بالقيمة الفعلية من استدعاء API
  const totalUsers = 150; // إجمالي عدد المستخدمين
  const loading = false; // حالة التحميل

  return (
    <SummaryCard
      icon={<People sx={{ fontSize: 40 }} />}
      title="Total Users"
      value={loading ? <CircularProgress size={20} /> : totalUsers} // عرض دائرة التحميل إذا كانت البيانات قيد التحميل
      color="#1976d2"
    >
      <Box sx={{ mt: 2 }}>
        {/* معلومات إضافية حول المستخدمين */}
        <Typography variant="body2" color="text.secondary">
          Active this month: 120
        </Typography>
        <Typography variant="body2" color="text.secondary">
          New this week: 15
        </Typography>
      </Box>
    </SummaryCard>
  );
};

export default UsersSummary;
