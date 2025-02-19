/**
 * هوك لإدارة التقييمات
 * يوفر وظائف لجلب وإضافة وتحديث التقييمات.
 * يتعامل هذا الهوك مع جلب التقييمات من قاعدة بيانات Supabase،
 * حساب الإحصائيات مثل المتوسط وعدد التقييمات،
 * وكذلك إضافة تقييمات جديدة.
 */

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { Rating, RatingStats } from "../types/rating";

export const useRatings = (targetId: string) => {
  // حالة التقييمات
  const [ratings, setRatings] = useState<Rating[]>([]);

  // حالة الإحصائيات
  const [stats, setStats] = useState<RatingStats>({
    averageScore: 0, // متوسط التقييمات
    totalRatings: 0, // إجمالي عدد التقييمات
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }, // توزيع التقييمات
  });

  // حالة التحميل
  const [loading, setLoading] = useState(true);

  // حالة الخطأ
  const [error, setError] = useState<string | null>(null);

  // دالة لجلب التقييمات
  const fetchRatings = async () => {
    try {
      setLoading(true); // بدء التحميل
      const { data, error } = await supabase
        .from("ratings") // استدعاء جدول التقييمات
        .select(
          `
          *,
          from_user:from_user_id(
            id,
            first_name,
            last_name
          )
        `
        )
        .eq("to_user_id", targetId) // تصفية التقييمات حسب معرف الهدف
        .order("created_at", { ascending: false }); // ترتيب التقييمات حسب تاريخ الإنشاء

      if (error) throw error; // رمي الخطأ إذا حدث

      setRatings(data); // تعيين التقييمات
      calculateStats(data); // حساب الإحصائيات
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطأ في جلب التقييمات"); // التعامل مع الأخطاء
    } finally {
      setLoading(false); // إنهاء التحميل
    }
  };

  // دالة لحساب إحصائيات التقييمات
  const calculateStats = (ratings: Rating[]) => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }; // توزيع التقييمات
    let total = 0; // إجمالي النقاط

    // المرور على التقييمات لحساب التوزيع وإجمالي النقاط
    ratings.forEach((rating) => {
      breakdown[rating.score as keyof typeof breakdown]++;
      total += rating.score;
    });

    // تعيين الإحصائيات
    setStats({
      averageScore: ratings.length ? total / ratings.length : 0, // حساب المتوسط
      totalRatings: ratings.length, // إجمالي عدد التقييمات
      breakdown, // توزيع التقييمات
    });
  };

  // دالة لإضافة تقييم جديد
  const addRating = async (score: number, feedback: string) => {
    try {
      const { data, error } = await supabase
        .from("ratings") // استدعاء جدول التقييمات
        .insert([
          {
            to_user_id: targetId, // معرف المستخدم الهدف
            score, // التقييم
            feedback, // التعليق
          },
        ])
        .select()
        .single(); // الحصول على تقييم واحد

      if (error) throw error; // رمي الخطأ إذا حدث

      setRatings((prev) => [data, ...prev]); // إضافة التقييم الجديد إلى القائمة
      calculateStats([...ratings, data]); // إعادة حساب الإحصائيات مع التقييم الجديد
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطأ في إضافة التقييم"); // التعامل مع الأخطاء
      throw err; // إعادة رمي الخطأ
    }
  };

  // استخدام useEffect لجلب التقييمات عند تغيير targetId
  useEffect(() => {
    fetchRatings(); // جلب التقييمات
  }, [targetId]);

  // إرجاع البيانات والدوال المطلوبة
  return {
    ratings, // التقييمات
    stats, // الإحصائيات
    loading, // حالة التحميل
    error, // حالة الخطأ
    addRating, // دالة إضافة تقييم
    refreshRatings: fetchRatings, // دالة لتحديث التقييمات
  };
};

export default useRatings; // تصدير الهوك للاستخدام في أجزاء أخرى من التطبيق
