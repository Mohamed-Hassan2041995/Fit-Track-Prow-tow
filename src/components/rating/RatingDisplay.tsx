/**
 * مكون عرض التقييمات
 * يعرض متوسط التقييمات وتوزيع النجوم وآخر التعليقات
 * 
 * Props:
 * - targetId: معرف المستخدم المراد عرض تقييماته
 * - targetType: نوع المستخدم (مدرب/متدرب)
 */
import React from 'react';
import { Box, Typography, Rating, LinearProgress } from '@mui/material';
import { RatingStats } from '../../types/rating';

interface RatingDisplayProps {
  stats: RatingStats;
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({ stats }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Rating 
          value={stats.averageScore} 
          precision={0.5} 
          readOnly 
          sx={{ mr: 2 }}
        />
        <Typography variant="h6">
          {stats.averageScore.toFixed(1)} من 5
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
          ({stats.totalRatings} تقييم)
        </Typography>
      </Box>

      {Object.entries(stats.breakdown).reverse().map(([score, count]) => (
        <Box key={score} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography sx={{ minWidth: 60 }}>
            {score} نجوم
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(count / stats.totalRatings) * 100}
            sx={{ 
              flexGrow: 1, 
              mx: 1,
              height: 8,
              borderRadius: 4
            }}
          />
          <Typography sx={{ minWidth: 40 }}>
            {count}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default RatingDisplay;