// هذا الكود يعرّف واجهتين (Interfaces) تُستخدمان في نظام التغذية داخل التطبيق
// لتخزين بيانات الوجبات وخطط التغذية المخصصة للمتدربين بناءً على احتياجاتهم الصحية وأهدافهم الغذائية

// الواجهة Meal تمثل معلومات وجبة غذائية مثل السعرات والبروتينات والكربوهيدرات والدهون
// الواجهة NutritionPlan تمثل خطة غذائية مخصصة لمتدرب معين تحتوي على وجبات محددة وأهداف غذائية يومية

export interface Meal {
  id: string; // معرف فريد للوجبة
  name: string; // اسم الوجبة (مثال: "صدر دجاج مشوي")
  calories: number; // عدد السعرات الحرارية في هذه الوجبة
  protein: number; // كمية البروتين بالجرامات
  carbs: number; // كمية الكربوهيدرات بالجرامات
  fats: number; // كمية الدهون بالجرامات
  ingredients: string[]; // قائمة بالمكونات المستخدمة في الوجبة (مثل ["دجاج", "ملح", "زيت زيتون"])
  instructions?: string; // (اختياري) طريقة التحضير الخاصة بهذه الوجبة
}

export interface NutritionPlan {
  id: string; // معرف فريد للخطة الغذائية
  traineeId: string; // معرف المتدرب الذي تخصه هذه الخطة
  trainerId: string; // معرف المدرب الذي أنشأ هذه الخطة الغذائية
  name: string; // اسم الخطة الغذائية (مثال: "برنامج تخفيف الوزن")
  description: string; // وصف عام للخطة الغذائية وأهدافها
  dailyCalorieTarget: number; // الحد الأقصى من السعرات الحرارية المسموح بها يوميًا
  meals: {
    breakfast: Meal[]; // قائمة الوجبات المخصصة للفطور
    lunch: Meal[]; // قائمة الوجبات المخصصة للغداء
    dinner: Meal[]; // قائمة الوجبات المخصصة للعشاء
    snacks: Meal[]; // قائمة الوجبات المخصصة للوجبات الخفيفة
  };
  startDate: Date; // تاريخ بدء تنفيذ الخطة الغذائية
  endDate: Date; // تاريخ انتهاء الخطة الغذائية
  restrictions?: string[]; // (اختياري) قائمة بالقيود الغذائية (مثل ["لا يحتوي على منتجات الألبان", "خالي من الجلوتين"])
  notes?: string; // (اختياري) ملاحظات إضافية متعلقة بالخطة
  createdAt: Date; // تاريخ إنشاء الخطة الغذائية
  updatedAt: Date; // تاريخ آخر تعديل على الخطة الغذائية
}
