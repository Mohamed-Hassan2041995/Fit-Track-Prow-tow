export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  instructions?: string;
}

export interface NutritionPlan {
  id: string;
  traineeId: string;
  trainerId: string;
  name: string;
  description: string;
  dailyCalorieTarget: number;
  meals: {
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
    snacks: Meal[];
  };
  startDate: Date;
  endDate: Date;
  restrictions?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}