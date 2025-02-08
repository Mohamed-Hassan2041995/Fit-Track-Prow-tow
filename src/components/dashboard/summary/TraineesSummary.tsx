import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { DirectionsRun } from '@mui/icons-material';
import SummaryCard from '../common/SummaryCard';

const TraineesSummary: React.FC = () => {
  // TODO: Replace with actual API call
  const totalTrainees = 125;
  const loading = false;

  return (
    <SummaryCard
      icon={<DirectionsRun sx={{ fontSize: 40 }} />}
      title="Total Trainees"
      value={loading ? <CircularProgress size={20} /> : totalTrainees}
      color="#ed6c02"
    >
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Active trainees: 100
        </Typography>
        <Typography variant="body2" color="text.secondary">
          With active plans: 95
        </Typography>
      </Box>
    </SummaryCard>
  );
};

export default TraineesSummary;