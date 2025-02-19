// هذا الكمبونانت يمثل تقويم الحضور، حيث يعرض سجلات الحضور الخاصة بالمستخدمين.
// يستخدم مكتبة DataGrid من Material-UI لعرض البيانات بشكل منظم.
// يتم تمرير سجلات الحضور إلى الكمبونانت كـ prop ويقوم بتنسيق التاريخ باستخدام دالة formatDate.

import React from "react"; // استيراد React
import { Paper, Typography, Box } from "@mui/material"; // استيراد العناصر من مكتبة Material-UI
import { DataGrid, GridColDef } from "@mui/x-data-grid"; // استيراد DataGrid من مكتبة X-Data-Grid
import { formatDate } from "../../../utils/formatters"; // استيراد دالة تنسيق التاريخ
import { AttendanceRecord } from "../../../types/attendance"; // استيراد نوع AttendanceRecord

// تعريف واجهة AttendanceCalendarProps لتحديد هيكل السجلات
interface AttendanceCalendarProps {
  records: AttendanceRecord[]; // مصفوفة من سجلات الحضور
}

// تعريف الكمبونانت AttendanceCalendar
const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({ records }) => {
  // تعريف أعمدة DataGrid
  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueFormatter: (params) => formatDate(params.value),
    }, // تنسيق تاريخ السجل
    { field: "status", headerName: "Status", flex: 1 }, // حالة الحضور
    { field: "trainer", headerName: "Trainer", flex: 1 }, // اسم المدرب
    { field: "notes", headerName: "Notes", flex: 2 }, // ملاحظات إضافية
  ];

  return (
    <Paper sx={{ p: 3 }}>
      {" "}
      {/* ورقة تحتوي على محتوى الكمبونانت */}
      <Typography variant="h6" gutterBottom>
        Attendance History
      </Typography>{" "}
      {/* عنوان السجل */}
      <Box sx={{ height: 400, width: "100%" }}>
        {" "}
        {/* صندوق لتحديد حجم DataGrid */}
        <DataGrid
          rows={records} // تمرير السجلات إلى DataGrid
          columns={columns} // تمرير الأعمدة إلى DataGrid
          pageSize={5} // عدد الصفوف في الصفحة الواحدة
          rowsPerPageOptions={[5]} // خيارات عدد الصفوف في الصفحة
          disableSelectionOnClick // تعطيل تحديد الصف عند النقر
        />
      </Box>
    </Paper>
  );
};

export default AttendanceCalendar; // تصدير الكمبونانت
