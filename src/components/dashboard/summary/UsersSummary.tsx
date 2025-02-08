import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { People } from '@mui/icons-material';
import SummaryCard from '../common/SummaryCard';

const UsersSummary: React.FC = () => {
  // TODO: Replace with actual API call
  const totalUsers = 150;
  const loading = false;

  return (
    <SummaryCard
      icon={<People sx={{ fontSize: 40 }} />}
      title="Total Users"
      value={loading ? <CircularProgress size={20} /> : totalUsers}
      color="#1976d2"
    >
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Active this month: 120
        </Typography>
        <Typography variant="body2" color="text.secondary">
          New this week: 15
        </Typography>
      </Box>
    </SummaryCard>
  );
};

export default UsersSummary;