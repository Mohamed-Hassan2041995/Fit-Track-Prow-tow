// مكون UserDetailedReport هو مكون يعرض تقريرًا تفصيليًا عن نشاط المستخدم
// (سواء كان مدربًا أو متدربًا) خلال فترة زمنية يحددها المستخدم عبر اختيار تاريخ البداية والنهاية.
// يتضمن التقرير عدة أقسام مثل النشاط، الأداء، التمارين، والتغذية، ويتم عرضها داخل علامات تبويب (Tabs).
// عند تحديد نطاق التاريخ، يتم جلب البيانات عبر هوك useUserReport.
// في حال كانت البيانات قيد التحميل، يظهر مؤشر تحميل (CircularProgress)، وإلا يتم عرض البيانات المقسمة إلى أقسام متعددة.

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  Box,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useUserReport } from "../../hooks/useUserReport";
import ActivityTimeline from "./sections/ActivityTimeline";
import PerformanceMetrics from "./sections/PerformanceMetrics";
import WorkoutSummary from "./sections/WorkoutSummary";
import NutritionSummary from "./sections/NutritionSummary";

// تعريف نوع البيانات لخاصية TabPanel التي تستخدم لعرض محتوى كل تبويب
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// مكون TabPanel يعرض المحتوى بناءً على التبويب المحدد
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

// تعريف المكون الرئيسي الذي يستقبل معرف المستخدم ونوعه (مدرب أو متدرب)
const UserDetailedReport: React.FC<{
  userId: string;
  userType: "trainer" | "trainee";
}> = ({ userId, userType }) => {
  // حالات لتخزين تاريخ البداية والنهاية والفهرس الحالي للتبويب
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [tabValue, setTabValue] = useState(0);

  // استدعاء الهوك لجلب بيانات التقرير بناءً على المستخدم المحدد
  const { reportData, loading, generateReport } = useUserReport(
    userId,
    userType
  );

  // دالة لمعالجة تغيير التاريخ واستدعاء توليد التقرير عند تحديد تاريخي البداية والنهاية
  const handleDateChange = async (start: Date | null, end: Date | null) => {
    if (start && end) {
      setStartDate(start);
      setEndDate(end);
      await generateReport(start, end);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* عنوان التقرير يوضح نوع المستخدم سواء كان مدربًا أو متدربًا */}
      <Typography variant="h5" gutterBottom>
        تقرير تفصيلي {userType === "trainer" ? "للمدرب" : "للمتدرب"}
      </Typography>

      {/* تحديد نطاق التاريخ باستخدام DatePicker */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="من تاريخ"
            value={startDate}
            onChange={(date) => handleDateChange(date, endDate)}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="إلى تاريخ"
            value={endDate}
            onChange={(date) => handleDateChange(startDate, date)}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Grid>
      </Grid>

      {/* عرض مؤشر التحميل إذا كانت البيانات قيد الجلب */}
      {loading ? (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      ) : reportData ? (
        <>
          {/* شريط التبويبات لعرض أقسام التقرير المختلفة */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
            >
              <Tab label="النشاط" />
              <Tab label="الأداء" />
              <Tab label="التمارين" />
              <Tab label="التغذية" />
            </Tabs>
          </Box>

          {/* عرض المحتوى بناءً على التبويب المحدد */}
          <TabPanel value={tabValue} index={0}>
            <ActivityTimeline activities={reportData.activities} />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <PerformanceMetrics metrics={reportData.performance} />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <WorkoutSummary workouts={reportData.workouts} />
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <NutritionSummary nutrition={reportData.nutrition} />
          </TabPanel>
        </>
      ) : (
        // عرض رسالة إرشادية إذا لم يتم تحديد نطاق التاريخ بعد
        <Typography color="text.secondary" align="center">
          اختر نطاق تاريخ لعرض التقرير
        </Typography>
      )}
    </Paper>
  );
};

export default UserDetailedReport;
