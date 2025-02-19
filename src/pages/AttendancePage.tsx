// هذا الكمبوننت يمثل صفحة تتبع الحضور للمدربين والمتدربين.
// يقوم بعرض إحصائيات الحضور، نموذج لتسجيل الحضور، وتقويم الحضور.
// يعتمد على بيانات المستخدم والحضور المستخرج من الـ Hooks المخصصة.

import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import AttendanceCalendar from "../features/attendance/components/AttendanceCalendar";
import AttendanceForm from "../features/attendance/components/AttendanceForm";
import AttendanceStats from "../features/attendance/components/AttendanceStats";
import { useAttendance } from "../features/attendance/hooks/useAttendance";
import { useAuth } from "../contexts/AuthContext";
import { UserRole } from "../types/user";

const AttendancePage: React.FC = () => {
  // استدعاء بيانات المستخدم من السياق
  const { user } = useAuth();
  // استدعاء البيانات الخاصة بالحضور باستخدام الـ Hook المخصص
  const { records, stats, loading, recordAttendance } = useAttendance(
    user?.id || ""
  );

  // إذا كانت البيانات في حالة تحميل، نعرض لا شيء
  if (loading) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        تتبع الحضور
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* عرض إحصائيات الحضور */}
          <AttendanceStats stats={stats} />
        </Grid>

        {/* إذا كان المستخدم مدربًا، نقوم بعرض نموذج تسجيل الحضور */}
        {user?.role === UserRole.TRAINER && (
          <Grid item xs={12} md={4}>
            <AttendanceForm onSubmit={recordAttendance} traineeId={user.id} />
          </Grid>
        )}

        {/* عرض تقويم الحضور، مع تحديد المساحة بناءً على دور المستخدم */}
        <Grid item xs={12} md={user?.role === UserRole.TRAINER ? 8 : 12}>
          <AttendanceCalendar records={records} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AttendancePage;
