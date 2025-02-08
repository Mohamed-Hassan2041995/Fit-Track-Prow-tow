import { Exercise, WorkoutPlan } from '../../types/workout';
import { Trainee } from '../../types/user';

export interface WorkoutRecommendation {
  exercises: Exercise[];
  intensity: 'low' | 'medium' | 'high';
  duration: number;
  frequency: number;
}

export const generateWorkoutRecommendation = async (
  trainee: Trainee,
  goals: string[]
): Promise<WorkoutRecommendation> => {
  // TODO: Integrate with OpenAI API
  const mockRecommendation: WorkoutRecommendation = {
    exercises: [
      {
        id: '1',
        name: 'Squats',
        sets: 3,
        reps: 12,
        weight: 0,
      },
      {
        id: '2',
        name: 'Push-ups',
        sets: 3,
        reps: 10,
      },
    ],
    intensity: 'medium',
    duration: 45,
    frequency: 3,
  };

  return mockRecommendation;
};