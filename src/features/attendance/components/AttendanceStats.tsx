import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { AttendanceStats as AttendanceStatsType } from '../../../types/attendance';

interface AttendanceStatsProps {
  stats: AttendanceStatsType;
}

const AttendanceStats: React.FC<AttendanceStatsProps> = ({ stats }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Attendance Overview</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box>
            <Typography color="text.secondary">Total Sessions</Typography>
            <Typography variant="h4">{stats.totalSessions}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box>
            <Typography color="text.secondary">Attendance Rate</Typography>
            <Typography variant="h4">{stats.attendanceRate}%</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box>
            <Typography color="text.secondary">Missed Sessions</Typography>
            <Typography variant="h4">{stats.missedSessions}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AttendanceStats;