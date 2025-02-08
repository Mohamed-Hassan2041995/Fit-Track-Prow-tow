import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { FitnessCenter } from '@mui/icons-material';
import { keyframes } from '@mui/system';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const CustomLoader: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 9999,
      }}
    >
      <FitnessCenter
        sx={{
          fontSize: 60,
          color: 'primary.main',
          animation: `${bounce} 1s ease-in-out infinite, ${rotate} 2s linear infinite`,
        }}
      />
      <Box sx={{ mt: 2 }}>جاري التحميل...</Box>
    </Box>
  );
};

export default CustomLoader;