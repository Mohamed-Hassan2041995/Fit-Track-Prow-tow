import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { SystemMetric } from '../../../types/dashboard';

interface MetricProgressProps {
  metric: SystemMetric;
}

const MetricProgress: React.FC<MetricProgressProps> = ({ metric }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {metric.label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {metric.value}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={(metric.value / metric.total) * 100}
        sx={{
          height: 8,
          borderRadius: 5,
          bgcolor: `${metric.color}22`,
          '& .MuiLinearProgress-bar': {
            bgcolor: metric.color,
            borderRadius: 5,
          },
        }}
      />
    </Box>
  );
};

export default MetricProgress;