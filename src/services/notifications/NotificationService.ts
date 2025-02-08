import { supabase } from '../../utils/supabaseClient';
import { Notification, NotificationType } from '../../types/notification';

export class NotificationService {
  // إرسال إشعار
  async sendNotification(
    userId: string,
    type: NotificationType,
    message: string,
    metadata?: any
  ): Promise<Notification> {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type,
        message,
        metadata
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // جلب إشعارات المستخدم
  async getUserNotifications(userId: string): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // تحديث حالة الإشعار
  async markAsRead(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) throw error;
  }

  // إرسال إشعار بريد إلكتروني
  async sendEmailNotification(
    email: string,
    subject: string,
    content: string
  ): Promise<void> {
    // تكامل مع خدمة البريد الإلكتروني
    // يمكن استخدام SendGrid أو AWS SES
    console.log('Sending email notification:', { email, subject, content });
  }

  // إرسال إشعار للنظام
  async broadcastSystemAnnouncement(
    message: string,
    targetRoles?: string[]
  ): Promise<void> {
    const { error } = await supabase
      .from('system_announcements')
      .insert({
        message,
        target_roles: targetRoles
      });

    if (error) throw error;
  }
}

export const notificationService = new NotificationService();