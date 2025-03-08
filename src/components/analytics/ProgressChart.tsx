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
  const trends = data.trends && data.trends.length > 0 ? data.trends : [];

  return (
    <Paper sx={{ p: 3 }}>
      {/* عنوان المخطط */}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      {/* حاوية المخطط البياني */}
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          {trends.length > 0 ? (
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          ) : (
            <Typography variant="body2" color="text.secondary">
              لا توجد بيانات لعرض المخطط
            </Typography>
          )}
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ProgressChart;
