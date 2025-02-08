import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NutritionPlan } from '../../types/nutrition';

interface NutritionState {
  plans: NutritionPlan[];
  loading: boolean;
  error: string | null;
}

const initialState: NutritionState = {
  plans: [],
  loading: false,
  error: null,
};

const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState,
  reducers: {
    setNutritionPlans: (state, action: PayloadAction<NutritionPlan[]>) => {
      state.plans = action.payload;
    },
    addNutritionPlan: (state, action: PayloadAction<NutritionPlan>) => {
      state.plans.push(action.payload);
    },
    updateNutritionPlan: (state, action: PayloadAction<NutritionPlan>) => {
      const index = state.plans.findIndex(plan => plan.id === action.payload.id);
      if (index !== -1) {
        state.plans[index] = action.payload;
      }
    },
    deleteNutritionPlan: (state, action: PayloadAction<string>) => {
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
  setNutritionPlans,
  addNutritionPlan,
  updateNutritionPlan,
  deleteNutritionPlan,
  setLoading,
  setError,
} = nutritionSlice.actions;

export default nutritionSlice.reducer;