// هذا الملف يحتوي على تعريفات واجهة ونموذج تحليل التقدم.
// يتم استخدامه لتحليل تقدم المتدرب في التمارين والتغذية، وتقديم توصيات بناءً على الأداء السابق.

import { WorkoutPlan } from "../../types/workout"; // استيراد نوع خطة التمارين
import { NutritionPlan } from "../../types/nutrition"; // استيراد نوع خطة التغذية
import { Trainee } from "../../types/user"; // استيراد نوع المتدرب

// تعريف واجهة تحليل التقدم
export interface ProgressAnalysis {
  achievements: string[]; // قائمة الإنجازات التي حققها المتدرب
  recommendations: string[]; // قائمة التوصيات لتحسين الأداء
  trends: {
    // بيانات الاتجاهات المتعلقة بالتقدم
    label: string; // اسم الاتجاه
    data: number[]; // البيانات المتعلقة بالاتجاه
    improvement: number; // مقدار التحسن
  }[];
}

// دالة لتحليل تقدم المتدرب بناءً على تاريخ التمارين وتاريخ التغذية
export const analyzeProgress = async (
  trainee: Trainee, // معلومات المتدرب
  workoutHistory: WorkoutPlan[], // تاريخ التمارين
  nutritionHistory: NutritionPlan[] // تاريخ التغذية
): Promise<ProgressAnalysis> => {
  // TODO: دمج مع واجهة برمجة تطبيقات OpenAI
  const mockAnalysis: ProgressAnalysis = {
    achievements: [
      "Consistent workout attendance", // إنجاز: حضور مستمر للتمارين
      "Improved strength in key exercises", // إنجاز: تحسين القوة في التمارين الرئيسية
    ],
    recommendations: [
      "Increase protein intake", // توصية: زيادة استهلاك البروتين
      "Add more compound exercises", // توصية: إضافة المزيد من التمارين المركبة
    ],
    trends: [
      {
        label: "Strength Progress", // اسم الاتجاه: تقدم القوة
        data: [100, 110, 115, 125, 130], // بيانات تقدم القوة
        improvement: 30, // مقدار التحسن
      },
    ],
  };

  return mockAnalysis; // إرجاع تحليل التقدم النموذجي
};
