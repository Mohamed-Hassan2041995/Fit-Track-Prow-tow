import React from 'react';
import { Grid } from '@mui/material';
import RatingStats from './RatingStats';
import RatingList from './RatingList';
import { useRatings } from '../hooks/useRatings';

interface RatingsSummaryProps {
  userId: string;
}

const RatingsSummary: React.FC<RatingsSummaryProps> = ({ userId }) => {
  const { ratings, stats, loading } = useRatings(userId);

  if (loading) return null;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <RatingStats stats={stats} />
      </Grid>
      <Grid item xs={12} md={8}>
        <RatingList ratings={ratings} />
      </Grid>
    </Grid>
  );
};

export default RatingsSummary;