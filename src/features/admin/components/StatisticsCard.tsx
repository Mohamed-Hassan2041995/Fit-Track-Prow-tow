import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';

interface StatisticsCardProps {
  title: string;
  value: number;
  total?: number;
  icon: React.ReactNode;
  color: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  total,
  icon,
  color,
}) => {
  const percentage = total ? (value / total) * 100 : null;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ color, mr: 2 }}>{icon}</Box>
          <Typography variant="h6">{title}</Typography>
        </Box>

        <Typography variant="h4" sx={{ mb: 1 }}>
          {value}
          {total && <Typography component="span" variant="body2" sx={{ ml: 1 }}>
            / {total}
          </Typography>}
        </Typography>

        {percentage !== null && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: `${color}22`,
                '& .MuiLinearProgress-bar': {
                  bgcolor: color,
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}