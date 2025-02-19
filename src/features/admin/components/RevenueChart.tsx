// استيراد مكتبة React وبعض المكونات من مكتبة Recharts و MUI
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"; // استيراد مكونات الرسم البياني من مكتبة Recharts
import { Paper, Typography, Box } from "@mui/material";

// تعريف واجهة بيانات الإيرادات

interface RevenueData {
  date: string; // تاريخ الإيرادات
  amount: number; // مبلغ الإيرادات
}

// تعريف واجهة خصائص مكون الرسم البياني للإيرادات

interface RevenueChartProps {
  data: RevenueData[]; // مصفوفة من بيانات الإيرادات
}
// مكون الرسم البياني للإيرادات
const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <Paper sx={{ p: 3 }}>
      {" "}
      {/* استخدام Paper لإضافة تأثير الخلفية والظل */}
      <Typography variant="h6" gutterBottom>
        {" "}
        {/* عنوان الرسم البياني */}
        Revenue Overview
      </Typography>
      <Box sx={{ width: "100%", height: 300 }}>
        {" "}
        {/* ضبط أبعاد الرسم البياني */}
        <ResponsiveContainer>
          {/* يجعل الرسم البياني مستجيبًا لتغيير حجم الشاشة */}
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {" "}
            {/* إنشاء الرسم البياني الخطي */}
            <CartesianGrid strokeDasharray="3 3" />{" "}
            {/* إضافة شبكة للرسم البياني */}
            <XAxis dataKey="date" />{" "}
            {/* المحور السيني باستخدام تاريخ الإيرادات */}
            <YAxis /> {/* المحور الصادي */}
            <Tooltip /> {/* عرض معلومات عند التحويم فوق النقاط */}
            <Line
              type="monotone" // نوع الخط
              dataKey="amount" // المفتاح الذي سيتم رسمه على المحور الصادي
              stroke="#1976d2" // لون الخط
              strokeWidth={2} // سمك الخط
              dot={{ r: 4 }} // حجم النقاط على الخط
              activeDot={{ r: 6 }} // حجم النقطة النشطة عند التحويم
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default RevenueChart;
