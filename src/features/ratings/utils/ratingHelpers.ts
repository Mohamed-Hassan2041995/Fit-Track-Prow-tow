/**
 * دالة لحساب متوسط التقييمات
 *
 * تقوم هذه الدالة بحساب متوسط التقييمات المعطاة لمستخدم معين.
 * إذا كانت القائمة فارغة، فإنها ترجع 0. خلاف ذلك، تقوم بجمع
 * كل الدرجات وتقسيم الناتج على عدد التقييمات.
 */

import { Rating } from "../../../types/rating"; // استيراد نوع التقييم

export const calculateAverageRating = (ratings: Rating[]): number => {
  if (!ratings.length) return 0; // إذا كانت القائمة فارغة، ارجع 0
  const sum = ratings.reduce((acc, rating) => acc + rating.score, 0); // جمع الدرجات
  return sum / ratings.length; // حساب المتوسط
};

/**
 * دالة للحصول على تصنيف التقييم بناءً على الدرجة
 *
 * تأخذ هذه الدالة درجة التقييم كمعطى وترجع نص
 * يصف مستوى التقييم.
 * - 4.5 فأعلى: ممتاز
 * - 4: جيد جدًا
 * - 3: جيد
 * - 2: عادل
 * - أقل من 2: ضعيف
 */

export const getRatingLabel = (score: number): string => {
  if (score >= 4.5) return "Excellent"; // ممتاز
  if (score >= 4) return "Very Good"; // جيد جدًا
  if (score >= 3) return "Good"; // جيد
  if (score >= 2) return "Fair"; // عادل
  return "Poor"; // ضعيف
};
