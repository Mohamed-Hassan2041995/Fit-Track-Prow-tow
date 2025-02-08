import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { ReportType } from '../../../types/report';

interface ReportFiltersProps {
  filters: {
    type: ReportType;
    startDate: Date | null;
    endDate: Date | null;
  };
  onFilterChange: (filters: any) => void;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <TextField
        select
        label="Report Type"
        value={filters.type}
        onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="attendance">Attendance Report</MenuItem>
        <MenuItem value="progress">Progress Report</MenuItem>
        <MenuItem value="financial">Financial Report</MenuItem>
      </TextField>

      <DatePicker
        label="Start Date"
        value={filters.startDate}
        onChange={(date) => onFilterChange({ ...filters, startDate: date })}
      />

      <DatePicker
        label="End Date"
        value={filters.endDate}
        onChange={(date) => onFilterChange({ ...filters, endDate: date })}
      />
    </Box>
  );
};