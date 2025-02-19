// تعريف واجهات لحضور المتدربين وتحصيل إحصائيات الحضور
// AttendanceRecord تمثل سجل حضور المتدرب، بينما AttendanceStats تمثل إحصائيات الحضور العامة

export interface AttendanceRecord {
  id: string; // معرف فريد لسجل الحضور
  traineeId: string; // معرف المتدرب
  trainerId: string; // معرف المدرب
  date: Date; // تاريخ الحضور
  status: 'present' | 'absent' | 'late'; // حالة الحضور (حاضر، غائب، متأخر)
  notes?: string; // ملاحظات إضافية (اختياري)
  createdAt: Date; // تاريخ إنشاء السجل
}

export interface AttendanceStats {
  totalSessions: number; // إجمالي عدد الجلسات
  attendanceRate: number; // معدل الحضور كنسبة مئوية
  missedSessions: number; // عدد الجلسات المفقودة
}
