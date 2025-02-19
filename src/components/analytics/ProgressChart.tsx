// مكون ProgressChart يعرض بيانات التقدم على شكل مخطط بياني خطي (Line Chart).
// يستخدم مكتبة Recharts لعرض البيانات بشكل مرئي، حيث يأخذ بيانات التقدم (ProgressMetrics)
// ويعرضها داخل مخطط بياني تفاعلي مع خطوط وقيم المحاور وعناصر التوضيح.

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Paper } from "@mui/material";
import { ProgressMetrics } from "../../types/analytics";

interface ProgressChartProps {
  data: ProgressMetrics; // بيانات التقدم المستخدمة في المخطط
  title: string; // عنوان المخطط
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, title }) => {
  return (
    <Paper sx={{ p: 3 }}>
      {/* عنوان المخطط */}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      {/* حاوية المخطط البياني */}
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data.trends}>
            {" "}
            {/* تمرير بيانات التقدم للمخطط */}
            <CartesianGrid strokeDasharray="3 3" /> {/* خطوط الشبكة الخلفية */}
            <XAxis dataKey="date" /> {/* محور X يعرض التواريخ */}
            <YAxis /> {/* محور Y يعرض القيم */}
            <Tooltip /> {/* عنصر يعرض تفاصيل البيانات عند تحريك الفأرة */}
            <Legend /> {/* عنصر يوضح معنى كل خط في المخطط */}
            <Line
              type="monotone"
              dataKey="value" // تمثيل القيم كنقاط متصلة
              stroke="#8884d8" // لون الخط
              activeDot={{ r: 8 }} // تخصيص نقطة التفاعل
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ProgressChart;
