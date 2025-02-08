import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkoutPlan } from '../../types/workout';

interface WorkoutState {
  plans: WorkoutPlan[];
  loading: boolean;
  error: string | null;
}

const initialState: WorkoutState = {
  plans: [],
  loading: false,
  error: null,
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    setWorkoutPlans: (state, action: PayloadAction<WorkoutPlan[]>) => {
      state.plans = action.payload;
    },
    addWorkoutPlan: (state, action: PayloadAction<WorkoutPlan>) => {
      state.plans.push(action.payload);
    },
    updateWorkoutPlan: (state, action: PayloadAction<WorkoutPlan>) => {
      const index = state.plans.findIndex(plan => plan.id === action.payload.id);
      if (index !== -1) {
        state.plans[index] = action.payload;
      }
    },
    deleteWorkoutPlan: (state, action: PayloadAction<string>) => {
      state.plans = state.plans.filter(plan => plan.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setWorkoutPlans,
  addWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
  setLoading,
  setError,
} = workoutSlice.actions;

export default workoutSlice.reducer;