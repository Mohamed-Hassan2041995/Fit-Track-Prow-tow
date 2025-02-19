// هذا الملف يحتوي على تعريف واجهة ونموذج لتوليد توصيات التمارين.
// يتم استخدامه لتقديم توصيات تمارين مخصصة للمتدربين بناءً على أهدافهم واحتياجاتهم.

import { Exercise, WorkoutPlan } from "../../types/workout"; // استيراد أنواع التمارين وخطة التمارين
import { Trainee } from "../../types/user"; // استيراد نوع المتدرب

// تعريف واجهة توصية التمارين
export interface WorkoutRecommendation {
  exercises: Exercise[]; // قائمة التمارين الموصى بها
  intensity: "low" | "medium" | "high"; // شدة التمارين (منخفضة، متوسطة، عالية)
  duration: number; // مدة التمرين بالدقائق
  frequency: number; // عدد مرات التمرين في الأسبوع
}

// دالة لتوليد توصيات التمارين بناءً على معلومات المتدرب وأهدافه
export const generateWorkoutRecommendation = async (
  trainee: Trainee, // معلومات المتدرب
  goals: string[] // أهداف المتدرب
): Promise<WorkoutRecommendation> => {
  // TODO: دمج مع واجهة برمجة تطبيقات OpenAI
  const mockRecommendation: WorkoutRecommendation = {
    exercises: [
      {
        id: "1", // معرف التمرين
        name: "Squats", // اسم التمرين
        sets: 3, // عدد المجموعات
        reps: 12, // عدد التكرارات في كل مجموعة
        weight: 0, // الوزن المستخدم (صفر إذا كانت تمارين وزن الجسم)
      },
      {
        id: "2", // معرف التمرين
        name: "Push-ups", // اسم التمرين
        sets: 3, // عدد المجموعات
        reps: 10, // عدد التكرارات في كل مجموعة
      },
    ],
    intensity: "medium", // شدة التمارين (متوسطة)
    duration: 45, // مدة التمرين (45 دقيقة)
    frequency: 3, // عدد مرات التمرين في الأسبوع (3 مرات)
  };

  return mockRecommendation; // إرجاع توصية التمارين النموذجية
};
