// هذا الكود ينشئ خدمة لإدارة الإشعارات، بما في ذلك إرسال الإشعارات للمستخدمين، جلب إشعارات المستخدم، تحديث حالة الإشعار،
// وإرسال إشعارات البريد الإلكتروني والإعلانات النظامية.

import { supabase } from "../../utils/supabaseClient"; // استيراد عميل Supabase للتفاعل مع قاعدة البيانات
import { Notification, NotificationType } from "../../types/notification"; // استيراد أنواع الإشعارات

export class NotificationService {
  // دالة لإرسال إشعار
  async sendNotification(
    userId: string, // معرف المستخدم
    type: NotificationType, // نوع الإشعار
    message: string, // نص الإشعار
    metadata?: any // بيانات إضافية اختيارية
  ): Promise<Notification> {
    // إدخال الإشعار في جدول الإشعارات
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: userId, // حفظ معرف المستخدم
        type, // حفظ نوع الإشعار
        message, // حفظ نص الإشعار
        metadata, // حفظ البيانات الإضافية
      })
      .select()
      .single(); // جلب الإشعار المضاف

    if (error) throw error; // رمي الخطأ إذا حدث
    return data; // إرجاع البيانات
  }

  // دالة لجلب إشعارات المستخدم
  async getUserNotifications(userId: string): Promise<Notification[]> {
    // جلب الإشعارات من جدول الإشعارات بناءً على معرف المستخدم
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId) // شرط البحث بمعرف المستخدم
      .order("created_at", { ascending: false }); // ترتيب الإشعارات حسب تاريخ الإنشاء

    if (error) throw error; // رمي الخطأ إذا حدث
    return data; // إرجاع قائمة الإشعارات
  }

  // دالة لتحديث حالة الإشعار
  async markAsRead(notificationId: string): Promise<void> {
    // تحديث حالة الإشعار ليصبح مقروءًا
    const { error } = await supabase
      .from("notifications")
      .update({ read: true }) // تعيين حالة الإشعار على "مقروء"
      .eq("id", notificationId); // شرط التحديث بمعرف الإشعار

    if (error) throw error; // رمي الخطأ إذا حدث
  }

  // دالة لإرسال إشعار بريد إلكتروني
  async sendEmailNotification(
    email: string, // البريد الإلكتروني للمستلم
    subject: string, // موضوع الإشعار
    content: string // محتوى الإشعار
  ): Promise<void> {
    // تكامل مع خدمة البريد الإلكتروني
    // يمكن استخدام SendGrid أو AWS SES
    console.log("Sending email notification:", { email, subject, content }); // طباعة تفاصيل الإشعار
  }

  // دالة لإرسال إشعار للنظام
  async broadcastSystemAnnouncement(
    message: string, // نص الرسالة
    targetRoles?: string[] // الأدوار المستهدفة (اختياري)
  ): Promise<void> {
    // إدخال الإعلان في جدول الإعلانات النظامية
    const { error } = await supabase.from("system_announcements").insert({
      message, // حفظ نص الرسالة
      target_roles: targetRoles, // حفظ الأدوار المستهدفة
    });

    if (error) throw error; // رمي الخطأ إذا حدث
  }
}

// إنشاء كائن من خدمة الإشعارات
export const notificationService = new NotificationService();
