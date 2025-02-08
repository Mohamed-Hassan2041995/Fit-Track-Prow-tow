import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { FitnessCenter } from '@mui/icons-material';
import SummaryCard from '../common/SummaryCard';

const TrainersSummary: React.FC = () => {
  // TODO: Replace with actual API call
  const totalTrainers = 25;
  const loading = false;

  return (
    <SummaryCard
      icon={<FitnessCenter sx={{ fontSize: 40 }} />}
      title="Total Trainers"
      value={loading ? <CircularProgress size={20} /> : totalTrainers}
      color="#2e7d32"
    >
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Active trainers: 20
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Average trainees per trainer: 8
        </Typography>
      </Box>
    </SummaryCard>
  );
};

export default TrainersSummary;