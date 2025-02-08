import { Meal, NutritionPlan } from '../../types/nutrition';
import { Trainee } from '../../types/user';

export interface NutritionRecommendation {
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  meals: {
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
    snacks: Meal[];
  };
}

export const generateNutritionRecommendation = async (
  trainee: Trainee,
  goals: string[]
): Promise<NutritionRecommendation> => {
  // TODO: Integrate with OpenAI API
  const mockRecommendation: NutritionRecommendation = {
    dailyCalories: 2000,
    macros: {
      protein: 150,
      carbs: 200,
      fats: 67,
    },
    meals: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    },
  };

  return mockRecommendation;
};