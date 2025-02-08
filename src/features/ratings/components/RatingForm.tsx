import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import { useRatings } from '../hooks/useRatings';
import { useNotification } from '../../../contexts/NotificationContext';

interface RatingFormProps {
  targetId: string;
  onSuccess?: () => void;
}

const RatingForm: React.FC<RatingFormProps> = ({ targetId, onSuccess }) => {
  const [score, setScore] = useState<number | null>(0);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { addRating } = useRatings(targetId);
  const { showNotification } = useNotification();

  const handleSubmit = async () => {
    if (!score) return;
    
    try {
      setSubmitting(true);
      await addRating(score, feedback);
      showNotification('Rating submitted successfully', 'success');
      setScore(0);
      setFeedback('');
      onSuccess?.();
    } catch (error) {
      showNotification('Failed to submit rating', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Rating
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography component="legend">Rating</Typography>
        <Rating
          value={score}
          onChange={(_, value) => setScore(value)}
          size="large"
          disabled={submitting}
        />
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        disabled={submitting}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!score || submitting}
      >
        Submit Rating
      </Button>
    </Paper>
  );
};

export default RatingForm;