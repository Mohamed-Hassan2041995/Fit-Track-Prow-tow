/**
 * هوك مخصص لإدارة التقييمات
 *
 * هذا الهوك يقوم بالتالي:
 * 1. جلب التقييمات الخاصة بمستخدم معين من قاعدة بيانات Supabase.
 * 2. حساب إحصائيات التقييمات مثل المتوسط وعدد التقييمات وتوزيع الدرجات.
 * 3. توفير دالة لإضافة تقييم جديد.
 * 4. إدارة حالات التحميل والأخطاء.
 */

import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient"; // استيراد العميل الخاص بـ Supabase
import { Rating, RatingStats } from "../../../types/rating"; // استيراد الأنواع المتعلقة بالتقييمات

export const useRatings = (targetId: string) => {
  // تعريف حالات الهوك
  const [ratings, setRatings] = useState<Rating[]>([]); // حالة لتخزين قائمة التقييمات
  const [stats, setStats] = useState<RatingStats>({
    // حالة لتخزين إحصائيات التقييمات
    averageScore: 0, // متوسط التقييم
    totalRatings: 0, // العدد الإجمالي للتقييمات
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }, // توزيع الدرجات
  });
  const [loading, setLoading] = useState(true); // حالة لتمثيل حالة التحميل
  const [error, setError] = useState<string | null>(null); // حالة لتخزين أي أخطاء قد تحدث

  // دالة لجلب التقييمات من قاعدة البيانات
  const fetchRatings = async () => {
    try {
      setLoading(true); // تعيين حالة التحميل إلى true
      const { data, error } = await supabase
        .from("ratings") // تحديد الجدول الذي سيتم الجلب منه
        .select(` * , from_user:from_user_id(id, first_name, last_name) `) // اختيار البيانات المراد جلبها
        .eq("to_user_id", targetId) // تصفية النتائج بناءً على targetId
        .order("created_at", { ascending: false }); // ترتيب النتائج بناءً على تاريخ الإنشاء

      if (error) throw error; // إذا كانت هناك خطأ، اطرحها
      setRatings(data); // تعيين التقييمات المسترجعة
      calculateStats(data); // حساب الإحصائيات بناءً على التقييمات المسترجعة
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching ratings"); // تعيين الخطأ إذا حدث
    } finally {
      setLoading(false); // تعيين حالة التحميل إلى false بعد الانتهاء
    }
  };

  // دالة لحساب إحصائيات التقييمات
  const calculateStats = (ratings: Rating[]) => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }; // كائن لتوزيع الدرجات
    let total = 0; // متغير لحفظ المجموع الكلي للدرجات

    ratings.forEach((rating) => {
      breakdown[rating.score as keyof typeof breakdown]++; // زيادة عدد الدرجات المناسبة
      total += rating.score; // إضافة الدرجة إلى المجموع
    });

    setStats({
      // تعيين الإحصائيات
      averageScore: ratings.length ? total / ratings.length : 0, // حساب المتوسط
      totalRatings: ratings.length, // تعيين العدد الإجمالي للتقييمات
      breakdown, // تعيين توزيع الدرجات
    });
  };

  // دالة لإضافة تقييم جديد
  const addRating = async (score: number, feedback: string) => {
    try {
      const { data, error } = await supabase
        .from("ratings") // تحديد الجدول
        .insert([
          {
            // إدراج تقييم جديد
            to_user_id: targetId, // تعيين المعرف الخاص بالمستلم
            score, // تعيين الدرجة
            feedback, // تعيين التعليق
          },
        ])
        .select() // اختيار البيانات المسترجعة
        .single(); // استرجاع سجل واحد

      if (error) throw error; // إذا كان هناك خطأ، اطرحه

      setRatings((prev) => [data, ...prev]); // تحديث قائمة التقييمات
      calculateStats([...ratings, data]); // إعادة حساب الإحصائيات مع التقييم الجديد
      return data; // إرجاع البيانات الجديدة
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Error adding rating"
      ); // إرجاع الخطأ إذا حدث
    }
  };

  // تأثير يستخدم لجلب التقييمات عند تغيير targetId
  useEffect(() => {
    if (targetId) {
      fetchRatings(); // استدعاء دالة fetchRatings لجلب التقييمات
    }
  }, [targetId]);

  // إرجاع البيانات والحالات والدوال للاستخدام في المكونات الأخرى
  return {
    ratings,
    stats,
    loading,
    error,
    addRating,
    refreshRatings: fetchRatings, // دالة لتحديث التقييمات
  };
};

export default useRatings; // تصدير الهوك
