/**
 * مكون قائمة التقييمات
 * يعرض قائمة بالتقييمات والتعليقات المقدمة للمستخدم
 * 
 * Props:
 * - targetId: معرف المستخدم المراد عرض تقييماته
 */
import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Rating,
  Typography,
  Box,
} from '@mui/material';
import { formatTimeAgo } from '../../utils/formatters';
import { Rating as RatingType } from '../../types/rating';

interface RatingListProps {
  ratings: RatingType[];
}

const RatingList: React.FC<RatingListProps> = ({ ratings }) => {
  return (
    <List>
      {ratings.map((rating) => (
        <ListItem
          key={rating.id}
          alignItems="flex-start"
          sx={{ 
            mb: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: 'background.paper'
          }}
        >
          <ListItemAvatar>
            <Avatar>{rating.fromUserId.charAt(0)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={rating.score} readOnly size="small" />
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  {formatTimeAgo(rating.createdAt)}
                </Typography>
              </Box>
            }
            secondary={rating.feedback}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default RatingList;