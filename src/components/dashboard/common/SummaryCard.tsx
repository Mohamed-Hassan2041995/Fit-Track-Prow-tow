/**
 * مكون SummaryCard:
 * - يعرض بطاقة ملخص تحتوي على أيقونة، عنوان، قيمة، ومحتوى إضافي اختياري.
 * - يستخدم `Paper` من MUI لتوفير تصميم أنيق ومتناسق.
 * - يدعم تمرير أيقونة بلون مخصص عبر الـ `props`.
 * - يمكن إضافة محتوى إضافي داخل البطاقة عبر `children`.
 */

import React, { ReactNode } from "react";
import { Paper, Box, Typography } from "@mui/material";

// تعريف واجهة الخصائص الخاصة بالمكون
interface SummaryCardProps {
  icon: ReactNode; // الأيقونة التي ستظهر في الزاوية العلوية
  title: string; // عنوان البطاقة
  value: ReactNode; // القيمة الرئيسية (مثل رقم أو نص مهم)
  color: string; // لون الأيقونة
  children?: ReactNode; // محتوى إضافي يمكن تمريره داخل البطاقة
}

// مكون SummaryCard: لعرض ملخص مع أيقونة وعنوان وقيمة
const SummaryCard: React.FC<SummaryCardProps> = ({
  icon,
  title,
  value,
  color,
  children,
}) => {
  return (
    <Paper
      sx={{
        p: 3, // تحديد التباعد الداخلي
        height: "100%", // ملء المساحة المتاحة
        position: "relative", // يجعل الأيقونة متموضعة فوق البطاقة
        overflow: "hidden", // منع أي عناصر خارجية من الظهور
      }}
    >
      {/* أيقونة في الزاوية العلوية اليمنى */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          p: 2,
          color: color, // تطبيق اللون المخصص للأيقونة
        }}
      >
        {icon}
      </Box>

      {/* عنوان البطاقة */}
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {title}
      </Typography>

      {/* القيمة المعروضة داخل البطاقة */}
      <Typography variant="h4" component="div">
        {value}
      </Typography>

      {/* محتوى إضافي يتم تمريره كمحتوى داخل البطاقة */}
      {children}
    </Paper>
  );
};

export default SummaryCard;
