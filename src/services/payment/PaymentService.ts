// هذا الكود ينشئ خدمة لإدارة المدفوعات والاشتراكات، بما في ذلك إنشاء اشتراك جديد، معالجة المدفوعات،
// جلب تاريخ المدفوعات للمستخدم، وجلب الخطط المتاحة للاشتراك.

import { supabase } from "../../utils/supabaseClient"; // استيراد عميل Supabase للتفاعل مع قاعدة البيانات
import {
  Payment,
  SubscriptionPlan,
  Subscription,
} from "../../types/subscription"; // استيراد أنواع الدفع والاشتراكات

export class PaymentService {
  // دالة لإنشاء اشتراك جديد
  async createSubscription(
    userId: string,
    planId: string
  ): Promise<Subscription> {
    // جلب خطة الاشتراك بناءً على معرف الخطة
    const { data: plan, error: planError } = await supabase
      .from("subscription_plans")
      .select("*")
      .eq("id", planId) // شرط البحث بمعرف الخطة
      .single();

    if (planError) throw planError; // رمي الخطأ إذا حدث

    // حساب تاريخ انتهاء الاشتراك
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration); // إضافة مدة الخطة إلى تاريخ اليوم

    // إدخال الاشتراك الجديد في جدول الاشتراكات
    const { data, error } = await supabase
      .from("subscriptions")
      .insert({
        user_id: userId, // حفظ معرف المستخدم
        plan_id: planId, // حفظ معرف الخطة
        end_date: endDate, // حفظ تاريخ انتهاء الاشتراك
        status: "active", // تعيين حالة الاشتراك كنشط
      })
      .select()
      .single(); // جلب الاشتراك المضاف

    if (error) throw error; // رمي الخطأ إذا حدث
    return data; // إرجاع بيانات الاشتراك
  }

  // دالة لمعالجة الدفع
  async processPayment(
    subscriptionId: string,
    amount: number,
    paymentMethod: string
  ): Promise<Payment> {
    // إدخال تفاصيل الدفع في جدول المدفوعات
    const { data, error } = await supabase
      .from("payments")
      .insert({
        subscription_id: subscriptionId, // حفظ معرف الاشتراك
        amount, // حفظ المبلغ
        payment_method: paymentMethod, // حفظ طريقة الدفع
        status: "completed", // تعيين حالة الدفع كمنجز
      })
      .select()
      .single(); // جلب تفاصيل الدفع المضافة

    if (error) throw error; // رمي الخطأ إذا حدث
    return data; // إرجاع بيانات الدفع
  }

  // دالة لجلب تاريخ المدفوعات للمستخدم
  async getUserPaymentHistory(userId: string): Promise<Payment[]> {
    // جلب المدفوعات من جدول المدفوعات بناءً على معرف المستخدم
    const { data, error } = await supabase
      .from("payments")
      .select(
        `
        *,
        subscription:subscriptions(*)
      `
      )
      .eq("subscriptions.user_id", userId) // شرط البحث بمعرف المستخدم في جدول الاشتراكات
      .order("created_at", { ascending: false }); // ترتيب المدفوعات حسب تاريخ الإنشاء

    if (error) throw error; // رمي الخطأ إذا حدث
    return data; // إرجاع قائمة المدفوعات
  }

  // دالة لجلب الخطط المتاحة
  async getAvailablePlans(): Promise<SubscriptionPlan[]> {
    // جلب الخطط من جدول خطط الاشتراك التي هي نشطة
    const { data, error } = await supabase
      .from("subscription_plans")
      .select("*")
      .eq("is_active", true) // شرط البحث على الخطط النشطة
      .order("price"); // ترتيب الخطط حسب السعر

    if (error) throw error; // رمي الخطأ إذا حدث
    return data; // إرجاع قائمة الخطط
  }
}

// إنشاء كائن من خدمة المدفوعات
export const paymentService = new PaymentService();
