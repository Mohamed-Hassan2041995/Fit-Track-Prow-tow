import React from 'react';
import { Box, Typography, LinearProgress, Grid } from '@mui/material';

interface ProgressMetric {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

const MyProgress: React.FC = () => {
  // TODO: Replace with actual API call
  const metrics: ProgressMetric[] = [
    {
      label: 'Weight Goal',
      current: 75,
      target: 70,
      unit: 'kg',
      color: '#1976d2',
    },
    {
      label: 'Workout Completion',
      current: 8,
      target: 12,
      unit: 'sessions',
      color: '#2e7d32',
    },
    {
      label: 'Calorie Target',
      current: 1800,
      target: 2000,
      unit: 'kcal',
      color: '#ed6c02',
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        My Progress
      </Typography>
      
      <Grid container spacing={3}>
        {metrics.map((metric) => (
          <Grid item xs={12} key={metric.label}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  {metric.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {metric.current} / {metric.target} {metric.unit}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(metric.current / metric.target) * 100}
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyProgress;