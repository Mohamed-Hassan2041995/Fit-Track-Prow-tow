export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  notes?: string;
}

export interface WorkoutPlan {
  id: string;
  traineeId: string;
  trainerId: string;
  name: string;
  description: string;
  exercises: Exercise[];
  startDate: Date;
  endDate: Date;
  frequency: string[];
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}