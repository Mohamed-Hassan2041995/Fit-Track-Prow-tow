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
  Paper,
} from "@mui/material";
import { formatTimeAgo } from "../../../utils/formatters";
import { Rating as RatingType } from "../../../types/rating";

interface RatingListProps {
  ratings: RatingType[];
}

const RatingList: React.FC<RatingListProps> = ({ ratings }) => {
  return (
    <Paper>
      <List>
        {ratings.map((rating) => (
          <ListItem key={rating.id} divider sx={{ py: 2 }}>
            <ListItemAvatar>
              <Avatar>{rating.from_user?.first_name?.[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Typography>
                    {rating.from_user?.first_name} {rating.from_user?.last_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    • {formatTimeAgo(rating.created_at)}
                  </Typography>
                </Box>
              }
              secondary={
                <>
                  <Rating
                    value={rating.score}
                    readOnly
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {rating.feedback}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RatingList;
