import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  CircularProgress,
} from '@mui/material';
import { PerformanceMetrics as Metrics } from '../../../types/analytics';

interface PerformanceMetricsProps {
  metrics: Metrics;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            معدل الإنجاز
          </Typography>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={metrics.completionRate}
              size={100}
              thickness={4}
              color="success"
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" component="div" color="text.secondary">
                {`${Math.round(metrics.completionRate)}%`}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            معدل الحضور
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography color="text.secondary" gutterBottom>
              {metrics.attendanceRate}% معدل الحضور
            </Typography>
            <LinearProgress
              variant="determinate"
              value={metrics.attendanceRate}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            تقدم الأهداف
          </Typography>
          {metrics.goals.map((goal) => (
            <Box key={goal.name} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>{goal.name}</Typography>
                <Typography color="text.secondary">
                  {goal.progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={goal.progress}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PerformanceMetrics;