import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
} from '@mui/material';
import { formatDate } from '../../utils/formatters';

interface Measurement {
  id: string;
  weight: number;
  height: number;
  bodyFatPercentage: number;
  muscleMass: number;
  measurementDate: Date;
  notes?: string;
}

interface MeasurementHistoryProps {
  measurements: Measurement[];
}

const MeasurementHistory: React.FC<MeasurementHistoryProps> = ({ measurements }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        سجل القياسات
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>التاريخ</TableCell>
              <TableCell>الوزن</TableCell>
              <TableCell>نسبة الدهون</TableCell>
              <TableCell>كتلة العضلات</TableCell>
              <TableCell>التغيير</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {measurements.map((measurement, index) => {
              const prevMeasurement = measurements[index + 1];
              const weightChange = prevMeasurement
                ? measurement.weight - prevMeasurement.weight
                : 0;

              return (
                <TableRow key={measurement.id}>
                  <TableCell>{formatDate(measurement.measurementDate)}</TableCell>
                  <TableCell>{measurement.weight} كجم</TableCell>
                  <TableCell>{measurement.bodyFatPercentage}%</TableCell>
                  <TableCell>{measurement.muscleMass} كجم</TableCell>
                  <TableCell>
                    {weightChange !== 0 && (
                      <Chip
                        label={`${weightChange > 0 ? '+' : ''}${weightChange} كجم`}
                        color={weightChange > 0 ? 'success' : 'error'}
                        size="small"
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MeasurementHistory;