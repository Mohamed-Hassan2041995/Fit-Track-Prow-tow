import React from 'react';
import {
  Box,
  Typography,
  Rating,
  LinearProgress,
  Paper,
} from '@mui/material';
import { RatingStats as RatingStatsType } from '../../../types/rating';

interface RatingStatsProps {
  stats: RatingStatsType;
}

const RatingStats: React.FC<RatingStatsProps> = ({ stats }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ mr: 2 }}>
          <Typography variant="h3" component="div">
            {stats.averageScore.toFixed(1)}
          </Typography>
          <Rating 
            value={stats.averageScore} 
            precision={0.5} 
            readOnly 
            size="large"
          />
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Based on {stats.totalRatings} ratings
          </Typography>
        </Box>
      </Box>

      {Object.entries(stats.breakdown)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([score, count]) => (
          <Box key={score} sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography sx={{ minWidth: 30 }}>
                {score}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(count / stats.totalRatings) * 100}
                sx={{ 
                  flexGrow: 1,
                  mx: 1,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                  }
                }}
              />
              <Typography sx={{ minWidth: 30 }}>
                {count}
              </Typography>
            </Box>
          </Box>
        ))}
    </Paper>
  );
};

export default RatingStats;