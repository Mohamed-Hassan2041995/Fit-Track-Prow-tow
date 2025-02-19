// مكون StatisticsCard هو مكون يعرض بطاقة إحصائية تحتوي على عنوان وقيمة،
// بالإضافة إلى إجمالي اختياري ورمز تعبيري، مع شريط تقدم يوضح النسبة المئوية للقيمة بالنسبة للإجمالي.

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

// تعريف واجهة الخصائص لمكون StatisticsCard
interface StatisticsCardProps {
  title: string; // عنوان البطاقة
  value: number; // القيمة الحالية
  total?: number; // القيمة الإجمالية (اختياري)
  icon: React.ReactNode; // الرمز التعبيري
  color: string; // لون البطاقة
}

// مكون StatisticsCard
const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  total,
  icon,
  color,
}) => {
  // حساب النسبة المئوية إذا كانت القيمة الإجمالية موجودة
  const percentage = total ? (value / total) * 100 : null;

  return (
    <Card>
      {" "}
      {/* إنشاء بطاقة جديدة */}
      <CardContent>
        {" "}
        {/* محتوى البطاقة */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {" "}
          {/* صندوق لتنسيق المحتوى بشكل مرن */}
          <Box sx={{ color, mr: 2 }}>{icon}</Box>{" "}
          {/* الرمز التعبيري بلون محدد */}
          <Typography variant="h6">{title}</Typography> {/* عرض العنوان */}
        </Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {" "}
          {/* عرض القيمة الحالية */}
          {value}
          {total && ( // إذا كانت القيمة الإجمالية موجودة، عرضها أيضًا
            <Typography component="span" variant="body2" sx={{ ml: 1 }}>
              / {total}
            </Typography>
          )}
        </Typography>
        {percentage !== null && ( // إذا كانت النسبة المئوية موجودة، عرض شريط التقدم
          <Box sx={{ width: "100%", mt: 2 }}>
            <LinearProgress
              variant="determinate" // نوع شريط التقدم
              value={percentage} // تعيين القيمة النسبية
              sx={{
                height: 8, // ارتفاع شريط التقدم
                borderRadius: 4, // زوايا مستديرة
                bgcolor: `${color}22`, // لون خلفية شريط التقدم (شفاف)
                "& .MuiLinearProgress-bar": {
                  // تنسيق شريط التقدم الفعلي
                  bgcolor: color, // لون الشريط
                  borderRadius: 4, // زوايا مستديرة للشريط
                },
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatisticsCard; // تصدير المكون
