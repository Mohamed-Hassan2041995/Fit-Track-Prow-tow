import React, { useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  Box,
  Tabs,
  Tab,
  CircularProgress,
  Chip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useUserReport } from "../../hooks/useUserReport";
import ActivityTimeline from "./sections/ActivityTimeline";
import PerformanceMetrics from "./sections/PerformanceMetrics";
import WorkoutSummary from "./sections/WorkoutSummary";
import NutritionSummary from "./sections/NutritionSummary";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const UserDetailedReport: React.FC<{
  userId: string;
  userType: "trainer" | "trainee";
}> = ({ userId, userType }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const { reportData, loading, generateReport } = useUserReport(
    userId,
    userType
  );

  const handleDateChange = async (start: Date | null, end: Date | null) => {
    if (start && end) {
      setStartDate(start);
      setEndDate(end);
      await generateReport(start, end);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        تقرير تفصيلي {userType === "trainer" ? "للمدرب" : "للمتدرب"}
      </Typography>

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

      {loading ? (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      ) : reportData ? (
        <>
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
        <Typography color="text.secondary" align="center">
          اختر نطاق تاريخ لعرض التقرير
        </Typography>
      )}
    </Paper>
  );
};

export default UserDetailedReport;
