export interface AttendanceRecord {
  id: string;
  traineeId: string;
  trainerId: string;
  date: Date;
  status: 'present' | 'absent' | 'late';
  notes?: string;
  createdAt: Date;
}

export interface AttendanceStats {
  totalSessions: number;
  attendanceRate: number;
  missedSessions: number;
}