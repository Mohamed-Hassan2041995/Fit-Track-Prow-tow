import React from 'react';
import { Grid } from '@mui/material';
import WorkoutCard from './WorkoutCard';
import { Exercise } from '../../../types/workout';

interface WorkoutGridProps {
  exercises: Exercise[];
}

const WorkoutGrid: React.FC<WorkoutGridProps> = ({ exercises }) => {
  return (
    <Grid container spacing={3}>
      {exercises.map((exercise) => (
        <Grid item xs={12} sm={6} md={4} key={exercise.id}>
          <WorkoutCard
            name={exercise.name}
            exercise={exercise}
            completed={false}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default WorkoutGrid;