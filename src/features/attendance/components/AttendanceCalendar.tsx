import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatDate } from '../../../utils/formatters';
import { AttendanceRecord } from '../../../types/attendance';

interface AttendanceCalendarProps {
  records: AttendanceRecord[];
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({ records }) => {
  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', flex: 1, valueFormatter: (params) => formatDate(params.value) },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'trainer', headerName: 'Trainer', flex: 1 },
    { field: 'notes', headerName: 'Notes', flex: 2 }
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Attendance History</Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={records}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </Paper>
  );
}

export default AttendanceCalendar;