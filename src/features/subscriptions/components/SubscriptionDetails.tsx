import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Grid,
  LinearProgress,
} from '@mui/material';
import { TraineeSubscription } from '../../../types/subscription';
import { formatDate } from '../../../utils/formatters';

interface SubscriptionDetailsProps {
  subscription: TraineeSubscription;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({ subscription }) => {
  const getStatusColor = () => {
    switch (subscription.status) {
      case 'active': return 'success';
      case 'expired': return 'error';
      case 'cancelled': return 'warning';
      default: return 'default';
    }
  };

  const calculateProgress = () => {
    if (subscription.type === 'per-session') {
      return ((subscription.totalSessions - subscription.remainingSessions) / subscription.totalSessions) * 100;
    }
    
    const total = subscription.endDate.getTime() - subscription.startDate.getTime();
    const elapsed = Date.now() - subscription.startDate.getTime();
    return Math.min((elapsed / total) * 100, 100);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Current Subscription</Typography>
        <Chip 
          label={subscription.status}
          color={getStatusColor()}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography color="text.secondary" gutterBottom>
            Plan Type
          </Typography>
          <Typography variant="body1">
            {subscription.plan.name}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography color="text.secondary" gutterBottom>
            Valid Until
          </Typography>
          <Typography variant="body1">
            {formatDate(subscription.endDate)}
          </Typography>
        </Grid>

        {subscription.type === 'per-session' && (
          <Grid item xs={12}>
            <Typography color="text.secondary" gutterBottom>
              Remaining Sessions
            </Typography>
            <Typography variant="body1">
              {subscription.remainingSessions} / {subscription.totalSessions}
            </Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography color="text.secondary" gutterBottom>
            Progress
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={calculateProgress()}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}