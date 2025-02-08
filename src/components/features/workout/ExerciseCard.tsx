import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
} from '@mui/material';
import { Exercise } from '../../../types/workout';

interface ExerciseCardProps {
  exercise: Exercise;
  completed?: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, completed }) => {
  // استخدام API للحصول على صور التمارين
  const getExerciseImage = (name: string) => {
    return `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(name)}`;
  };

  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)',
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={getExerciseImage(exercise.name)}
        alt={exercise.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {exercise.name}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography color="text.secondary">
            {exercise.sets} مجموعات × {exercise.reps} تكرار
          </Typography>
          {exercise.weight && (
            <Typography color="text.secondary">
              الوزن: {exercise.weight} كجم
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Chip
            label={completed ? 'مكتمل' : 'قيد التنفيذ'}
            color={completed ? 'success' : 'default'}
            size="small"
          />
        </Box>

        {completed !== undefined && (
          <LinearProgress
            variant="determinate"
            value={completed ? 100 : 0}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
              }
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;