import React from 'react';
import { Box, Typography } from '@mui/material';
import MetricProgress from './MetricProgress';
import { SystemMetric } from '../../../types/dashboard';

const SystemStats: React.FC = () => {
  // TODO: Replace with actual API call
  const metrics: SystemMetric[] = [
    {
      label: 'Active Plans',
      value: 85,
      total: 100,
      color: '#1976d2',
    },
    {
      label: 'Trainer Capacity',
      value: 75,
      total: 100,
      color: '#2e7d32',
    },
    {
      label: 'System Usage',
      value: 65,
      total: 100,
      color: '#ed6c02',
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        System Statistics
      </Typography>
      
      {metrics.map((metric) => (
        <MetricProgress
          key={metric.label}
          metric={metric}
        />
      ))}
    </Box>
  );
};

export default SystemStats;