import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { EmojiEvents, Timer, TrendingUp } from '@mui/icons-material';
import SummaryCard from '../common/SummaryCard';

const TraineeStats: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        My Achievements
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SummaryCard
            icon={<EmojiEvents sx={{ fontSize: 40 }} />}
            title="Completed Workouts"
            value={24}
            color="#1976d2"
          >
            <Typography variant="body2" color="text.secondary">
              This month
            </Typography>
          </SummaryCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SummaryCard
            icon={<Timer sx={{ fontSize: 40 }} />}
            title="Training Hours"
            value={36}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SummaryCard
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            title="Progress Score"
            value="85%"
            color="#ed6c02"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TraineeStats;