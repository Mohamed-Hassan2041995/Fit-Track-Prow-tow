/**
 * مكون الفلاتر للتقارير
 *
 * يقوم هذا المكون بعرض مجموعة من الفلاتر المستخدمة لتحديد نوع التقرير
 * وتواريخ البداية والنهاية. يتم تمرير الفلاتر الحالية عبر props
 * ويتم تحديثها عند تغيير أي من الحقول.
 */

import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { ReportType } from "../../../types/report";

interface ReportFiltersProps {
  filters: {
    type: ReportType; // نوع التقرير (حضور، تقدم، مالي)
    startDate: Date | null; // تاريخ البداية
    endDate: Date | null; // تاريخ النهاية
  };
  onFilterChange: (filters: any) => void; // دالة لتحديث الفلاتر
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <TextField
        select
        label="Report Type" // عنوان حقل اختيار نوع التقرير
        value={filters.type} // القيمة الحالية لنوع التقرير
        onChange={(e) => onFilterChange({ ...filters, type: e.target.value })} // تحديث الفلاتر عند التغيير
        sx={{ minWidth: 200 }} // عرض الحد الأدنى لحقل الاختيار
      >
        <MenuItem value="attendance">Attendance Report</MenuItem> // خيار تقرير
        الحضور
        <MenuItem value="progress">Progress Report</MenuItem> // خيار تقرير
        التقدم
        <MenuItem value="financial">Financial Report</MenuItem> // خيار التقرير
        المالي
      </TextField>

      <DatePicker
        label="Start Date" // عنوان حقل اختيار تاريخ البداية
        value={filters.startDate} // القيمة الحالية لتاريخ البداية
        onChange={(date) => onFilterChange({ ...filters, startDate: date })} // تحديث الفلاتر عند التغيير
      />

      <DatePicker
        label="End Date" // عنوان حقل اختيار تاريخ النهاية
        value={filters.endDate} // القيمة الحالية لتاريخ النهاية
        onChange={(date) => onFilterChange({ ...filters, endDate: date })} // تحديث الفلاتر عند التغيير
      />
    </Box>
  );
};

export default ReportFilters;
