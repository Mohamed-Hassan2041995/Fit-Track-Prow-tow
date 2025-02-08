import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useReports } from '../../hooks/useReports';
import CustomLoader from '../common/CustomLoader';

interface UserActivityReportProps {
  userId: string;
  userType: 'trainer' | 'trainee';
}

const UserActivityReport: React.FC<UserActivityReportProps> = ({ userId, userType }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { generateReport, loading, reportData } = useReports();

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) return;
    await generateReport(userId, userType, startDate, endDate);
  };

  if (loading) return <CustomLoader />;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        تقرير نشاط المستخدم
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={5}>
          <DatePicker
            label="من تاريخ"
            value={startDate}
            onChange={setStartDate}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <DatePicker
            label="إلى تاريخ"
            value={endDate}
            onChange={setEndDate}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleGenerateReport}
            disabled={!startDate || !endDate}
          >
            عرض التقرير
          </Button>
        </Grid>
      </Grid>

      {reportData && (
        <Box>
          <Typography variant="h6" gutterBottom>
            ملخص النشاط
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>النشاط</TableCell>
                <TableCell>التفاصيل</TableCell>
                <TableCell>التاريخ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.type}</TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell>{new Date(activity.date).toLocaleDateString('ar-EG')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Paper>
  );
};

export default UserActivityReport;