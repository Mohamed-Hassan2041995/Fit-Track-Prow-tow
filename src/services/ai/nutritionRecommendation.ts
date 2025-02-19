// هذا الملف يحتوي على تعريفات واجهة ونموذج توصيات التغذية.
// يتم استخدامه لإنشاء توصيات غذائية مخصصة بناءً على معلومات المتدرب وأهدافه.

import { Meal, NutritionPlan } from "../../types/nutrition"; // استيراد الأنواع المتعلقة بالوجبات وخطط التغذية
import { Trainee } from "../../types/user"; // استيراد نوع المتدرب

// تعريف واجهة توصية التغذية
export interface NutritionRecommendation {
  dailyCalories: number; // السعرات الحرارية اليومية المطلوبة
  macros: {
    protein: number; // كمية البروتين اليومية
    carbs: number; // كمية الكربوهيدرات اليومية
    fats: number; // كمية الدهون اليومية
  };
  meals: {
    breakfast: Meal[]; // قائمة الوجبات الإفطار
    lunch: Meal[]; // قائمة الوجبات الغداء
    dinner: Meal[]; // قائمة الوجبات العشاء
    snacks: Meal[]; // قائمة الوجبات الخفيفة
  };
}

// دالة لتوليد توصيات التغذية بناءً على بيانات المتدرب وأهدافه
export const generateNutritionRecommendation = async (
  trainee: Trainee, // معلومات المتدرب
  goals: string[] // أهداف المتدرب الغذائية
): Promise<NutritionRecommendation> => {
  // TODO: دمج مع واجهة برمجة تطبيقات OpenAI
  const mockRecommendation: NutritionRecommendation = {
    dailyCalories: 2000, // مثال على السعرات الحرارية اليومية
    macros: {
      protein: 150, // مثال على كمية البروتين اليومية
      carbs: 200, // مثال على كمية الكربوهيدرات اليومية
      fats: 67, // مثال على كمية الدهون اليومية
    },
    meals: {
      breakfast: [], // قائمة فارغة للوجبات الإفطار
      lunch: [], // قائمة فارغة للوجبات الغداء
      dinner: [], // قائمة فارغة للوجبات العشاء
      snacks: [], // قائمة فارغة للوجبات الخفيفة
    },
  };

  return mockRecommendation; // إرجاع توصية التغذية النموذجية
};
