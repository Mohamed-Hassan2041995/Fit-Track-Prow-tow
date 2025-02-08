import React, { ReactNode } from 'react';
import { Paper, Box, Typography } from '@mui/material';

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  value: ReactNode;
  color: string;
  children?: ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  icon,
  title,
  value,
  color,
  children,
}) => {
  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          p: 2,
          color: color,
        }}
      >
        {icon}
      </Box>
      
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      
      <Typography variant="h4" component="div">
        {value}
      </Typography>
      
      {children}
    </Paper>
  );
};

export default SummaryCard;