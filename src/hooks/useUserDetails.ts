/**
 * هوك لإدارة تفاصيل المستخدم
 * يوفر وظائف لجلب وتحديث معلومات المستخدم من قاعدة بيانات Supabase.
 * يشمل أيضًا حالة التحميل والتعامل مع الأخطاء.
 */

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { User, UserProfile } from "../types/user";

// تعريف الهوك
export const useUserDetails = (userId: string) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // حالة لتخزين معلومات المستخدم
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState<string | null>(null); // حالة الأخطاء

  // دالة لجلب معلومات المستخدم
  const fetchUserProfile = async () => {
    try {
      setLoading(true); // بدء التحميل
      const { data, error } = await supabase
        .from("user_profiles") // الوصول إلى جدول المستخدمين
        .select("*, users!inner(*)") // جلب كافة المعلومات المرتبطة بالمستخدم
        .eq("user_id", userId) // تحديد المستخدم بواسطة userId
        .single(); // جلب سجل واحد فقط

      if (error) throw error; // إذا كان هناك خطأ، قم برميه
      setUserProfile(data); // تعيين معلومات المستخدم في الحالة
    } catch (err) {
      // معالجة الأخطاء
      setError(
        err instanceof Error ? err.message : "Error fetching user profile"
      );
    } finally {
      setLoading(false); // إنهاء التحميل
    }
  };

  // دالة لتحديث معلومات المستخدم
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    try {
      const { data, error } = await supabase
        .from("user_profiles") // الوصول إلى جدول المستخدمين
        .update(updates) // تحديث المعلومات
        .eq("user_id", userId) // تحديد المستخدم بواسطة userId
        .select() // جلب السجل المحدث
        .single(); // جلب سجل واحد فقط

      if (error) throw error; // إذا كان هناك خطأ، قم برميه
      setUserProfile(data); // تعيين معلومات المستخدم المحدثة
      return data; // إرجاع البيانات المحدثة
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Error updating profile"
      ); // معالجة الأخطاء
    }
  };

  // استخدام useEffect لجلب معلومات المستخدم عند تغيير userId
  useEffect(() => {
    if (userId) {
      fetchUserProfile(); // استدعاء دالة جلب معلومات المستخدم
    }
  }, [userId]); // يتم تنفيذها عند تغيير userId

  // إرجاع معلومات المستخدم، حالة التحميل، الأخطاء، دالة تحديث الملف الشخصي، ودالة لتحديث معلومات المستخدم
  return {
    userProfile,
    loading,
    error,
    updateUserProfile,
    refreshProfile: fetchUserProfile, // دالة لتحديث المعلومات
  };
};
