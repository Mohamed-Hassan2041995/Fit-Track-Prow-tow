// هذا الكود يقوم بإنشاء خدمة لإدارة المستخدمين في تطبيق للياقة البدنية باستخدام Supabase.
// تتضمن الخدمة وظائف لإنشاء مستخدمين جدد، إعادة تعيين كلمات المرور، وتغيير كلمات المرور.

import { supabase } from "../../utils/supabaseClient"; // استيراد عميل Supabase من ملف المساعد
import { User } from "../../types/user"; // استيراد نوع المستخدم من تعريفات الأنواع

const DEFAULT_PASSWORD = "Fitness@123"; // كلمة المرور الافتراضية المستخدمة عند إنشاء مستخدم جديد

export class UserService {
  // دالة لإنشاء مستخدم جديد
  async createUser(userData: Partial<User>) {
    // محاولة التسجيل باستخدام Supabase
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email: userData.email!, // البريد الإلكتروني للمستخدم
      password: DEFAULT_PASSWORD, // استخدام كلمة المرور الافتراضية
      options: {
        data: {
          first_name: userData.firstName, // الاسم الأول
          last_name: userData.lastName, // الاسم الأخير
          role: userData.role, // الدور (مثلاً: مدرب، متدرب)
          gender: userData.gender, // الجنس
        },
      },
    });

    // إذا حدث خطأ في التسجيل، يتم طرح الخطأ
    if (authError) throw authError;

    // إدخال المستخدم في جدول المستخدمين
    const { data, error } = await supabase
      .from("users")
      .insert({
        id: authUser.user?.id, // استخدام ID المستخدم المصرح به
        ...userData, // إضافة بيانات المستخدم الأخرى
      })
      .select()
      .single();

    // إذا حدث خطأ في إدخال البيانات، يتم طرح الخطأ
    if (error) throw error;
    return data; // إرجاع بيانات المستخدم المدخلة
  }

  // دالة لإعادة تعيين كلمة مرور المستخدم
  async resetPassword(userId: string) {
    const { error } = await supabase.auth.admin.updateUserById(
      userId,
      { password: DEFAULT_PASSWORD } // إعادة تعيين كلمة المرور إلى الافتراضية
    );

    // إذا حدث خطأ، يتم طرح الخطأ
    if (error) throw error;
  }

  // دالة لتغيير كلمة مرور المستخدم
  async changePassword(userId: string, newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword, // تعيين كلمة المرور الجديدة
    });

    // إذا حدث خطأ، يتم طرح الخطأ
    if (error) throw error;
  }
}

// إنشاء كائن من خدمة المستخدم
export const userService = new UserService();
