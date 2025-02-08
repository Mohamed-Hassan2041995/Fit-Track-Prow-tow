import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';

interface RatingFormProps {
  targetId: string;
  targetType: 'trainer' | 'trainee';
  onSubmit: (rating: number, feedback: string) => void;
}

const RatingForm: React.FC<RatingFormProps> = ({
  targetId,
  targetType,
  onSubmit,
}) => {
  const [rating, setRating] = useState<number | null>(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (rating === null) return;
    onSubmit(rating, feedback);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Rate {targetType === 'trainer' ? 'Trainer' : 'Trainee'}
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography component="legend">Rating</Typography>
        <Rating
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          precision={0.5}
          icon={<StarIcon fontSize="inherit" />}
        />
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={rating === null}
      >
        Submit Rating
      </Button>
    </Paper>
  );
};

export default RatingForm;