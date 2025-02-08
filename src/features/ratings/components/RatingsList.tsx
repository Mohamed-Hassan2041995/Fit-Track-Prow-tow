/**
 * قائمة التقييمات
 * يعرض قائمة بالتقييمات السابقة مع التعليقات
 */
import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Rating,
  Typography,
  Box,
} from "@mui/material";
import { formatTimeAgo } from "../../../utils/formatters";
import { Rating as RatingType } from "../../../types/rating";

interface RatingsListProps {
  ratings: RatingType[];
}

export const RatingsList: React.FC<RatingsListProps> = ({ ratings }) => {
  return (
    <List>
      {ratings.map((rating) => (
        <ListItem
          key={rating.id}
          sx={{
            mb: 2,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
          }}
        >
          <ListItemAvatar>
            <Avatar>{rating.fromUserId.charAt(0)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating value={rating.score} readOnly size="small" />
                <Typography variant="caption" color="text.secondary">
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
