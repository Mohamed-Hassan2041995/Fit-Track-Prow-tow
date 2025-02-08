import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import AttendanceCalendar from '../features/attendance/components/AttendanceCalendar';
import AttendanceForm from '../features/attendance/components/AttendanceForm';
import AttendanceStats from '../features/attendance/components/AttendanceStats';
import { useAttendance } from '../features/attendance/hooks/useAttendance';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/user';

const AttendancePage: React.FC = () => {
  const { user } = useAuth();
  const { records, stats, loading, recordAttendance } = useAttendance(user?.id || '');

  if (loading) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Attendance Tracking
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AttendanceStats stats={stats} />
        </Grid>

        {user?.role === UserRole.TRAINER && (
          <Grid item xs={12} md={4}>
            <AttendanceForm 
              onSubmit={recordAttendance}
              traineeId={user.id}
            />
          </Grid>
        )}

        <Grid item xs={12} md={user?.role === UserRole.TRAINER ? 8 : 12}>
          <AttendanceCalendar records={records} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AttendancePage;