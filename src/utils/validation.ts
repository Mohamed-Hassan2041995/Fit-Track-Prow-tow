/**
 * هذا الكود يستخدم مكتبة Yup لإنشاء مخططات التحقق من البيانات (Validation Schemas) لحقول نماذج مختلفة.
 *
 * 1. يتم استيراد مكتبة Yup، التي توفر أدوات للتحقق من صحة البيانات.
 * 2. يتم تعريف مخطط تحقق لبيانات تسجيل الدخول، والذي يتطلب حقل البريد الإلكتروني وكلمة المرور مع التحقق من القيم.
 *    - البريد الإلكتروني يجب أن يكون بتنسيق صحيح ومطلوب.
 *    - كلمة المرور يجب أن تكون على الأقل 8 أحرف ومطلوبة.
 * 3. يتم تعريف مخطط تحقق لخطة التمارين، والذي يتطلب اسم ووصف وتواريخ البدء والانتهاء.
 *    - تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء.
 * 4. يتم تعريف مخطط تحقق لخطة التغذية، والذي يتطلب اسم ووصف وهدف السعرات الحرارية اليومية.
 *    - يجب أن يكون هدف السعرات الحرارية رقمًا موجبًا ومطلوبًا.
 */

import * as Yup from "yup";

// مخطط التحقق لبيانات تسجيل الدخول
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address") // التحقق من أن البريد الإلكتروني بتنسيق صحيح
    .required("Email is required"), // التحقق من أن البريد الإلكتروني مطلوب
  password: Yup.string()
    .min(8, "Password must be at least 8 characters") // التحقق من أن كلمة المرور لا تقل عن 8 أحرف
    .required("Password is required"), // التحقق من أن كلمة المرور مطلوبة
});

// مخطط التحقق لخطة التمارين
export const workoutPlanValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"), // التحقق من أن الاسم مطلوب
  description: Yup.string().required("Description is required"), // التحقق من أن الوصف مطلوب
  startDate: Yup.date().required("Start date is required"), // التحقق من أن تاريخ البدء مطلوب
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date must be after start date") // التحقق من أن تاريخ الانتهاء بعد تاريخ البدء
    .required("End date is required"), // التحقق من أن تاريخ الانتهاء مطلوب
});

// مخطط التحقق لخطة التغذية
export const nutritionPlanValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"), // التحقق من أن الاسم مطلوب
  description: Yup.string().required("Description is required"), // التحقق من أن الوصف مطلوب
  dailyCalorieTarget: Yup.number()
    .min(0, "Must be a positive number") // التحقق من أن هدف السعرات الحرارية يجب أن يكون رقمًا موجبًا
    .required("Daily calorie target is required"), // التحقق من أن هدف السعرات الحرارية مطلوب
});
