// هذا الكمبونانت يعرض ملخص الحضور للمتدرب، بما في ذلك عدد الجلسات الكلية، معدل الحضور، وعدد الجلسات المفقودة.

import React from "react"; // استيراد React
import { Paper, Typography, Grid, Box } from "@mui/material"; // استيراد العناصر من مكتبة Material-UI
import { AttendanceStats as AttendanceStatsType } from "../../../types/attendance"; // استيراد نوع AttendanceStats

// تعريف واجهة AttendanceStatsProps لتحديد خصائص الكمبونانت
interface AttendanceStatsProps {
  stats: AttendanceStatsType; // إحصائيات الحضور
}

// تعريف الكمبونانت AttendanceStats
const AttendanceStats: React.FC<AttendanceStatsProps> = ({ stats }) => {
  return (
    <Paper sx={{ p: 3 }}>
      {" "}
      {/* ورقة تحتوي على محتوى الإحصائيات */}
      <Typography variant="h6" gutterBottom>
        Attendance Overview
      </Typography>{" "}
      {/* عنوان القسم */}
      <Grid container spacing={3}>
        {" "}
        {/* شبكة تحتوي على الأعمدة */}
        <Grid item xs={12} sm={4}>
          {" "}
          {/* عمود الجلسات الكلية */}
          <Box>
            <Typography color="text.secondary">Total Sessions</Typography>{" "}
            {/* عنوان الجلسات الكلية */}
            <Typography variant="h4">{stats.totalSessions}</Typography>{" "}
            {/* قيمة الجلسات الكلية */}
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          {" "}
          {/* عمود معدل الحضور */}
          <Box>
            <Typography color="text.secondary">Attendance Rate</Typography>{" "}
            {/* عنوان معدل الحضور */}
            <Typography variant="h4">{stats.attendanceRate}%</Typography>{" "}
            {/* قيمة معدل الحضور */}
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          {" "}
          {/* عمود الجلسات المفقودة */}
          <Box>
            <Typography color="text.secondary">Missed Sessions</Typography>{" "}
            {/* عنوان الجلسات المفقودة */}
            <Typography variant="h4">{stats.missedSessions}</Typography>{" "}
            {/* قيمة الجلسات المفقودة */}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AttendanceStats; // تصدير الكمبونانت
