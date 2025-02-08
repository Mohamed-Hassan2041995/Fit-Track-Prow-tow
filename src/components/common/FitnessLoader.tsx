/**
 * مكون اللودر المخصص
 * يعرض رسوم متحركة جذابة أثناء تحميل البيانات
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const FitnessLoader: React.FC = () => {
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
      <Box
        sx={{
          width: 100,
          height: 100,
          position: 'relative',
          mb: 2,
        }}
      >
        {/* Dumbbell Animation */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            animation: `${bounce} 1s ease-in-out infinite, ${rotate} 2s linear infinite`,
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              width: 30,
              height: 30,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              top: '50%',
              transform: 'translateY(-50%)',
            },
            '&::before': {
              left: 0,
            },
            '&::after': {
              right: 0,
            },
            '& span': {
              position: 'absolute',
              width: 40,
              height: 8,
              backgroundColor: 'primary.main',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: 4,
            },
          }}
        >
          <span />
        </Box>
      </Box>
      <Typography
        variant="h6"
        color="primary"
        sx={{
          animation: `${bounce} 1s ease-in-out infinite`,
          animationDelay: '0.1s',
        }}
      >
        جاري التحميل...
      </Typography>
    </Box>
  );
};

export default FitnessLoader;