// هذا الكود يقوم بإنشاء خدمة للدردشة باستخدام Supabase.
// تتضمن الخدمة وظائف للحصول على غرف الدردشة، الرسائل، إرسال الرسائل، وتحديث حالة القراءة للرسائل.

import { supabase } from "../../utils/supabaseClient"; // استيراد عميل Supabase من ملف المساعد
import { Message, ChatRoom } from "../../types/chat"; // استيراد أنواع الرسائل وغرف الدردشة من تعريفات الأنواع

export class ChatService {
  // دالة للحصول على غرف الدردشة للمستخدم بناءً على معرف المستخدم
  async getChats(userId: string): Promise<ChatRoom[]> {
    const { data, error } = await supabase
      .from("chat_rooms")
      .select(
        ` // اختيار جميع حقول غرف الدردشة
        *,
        participants:chat_participants(user_id), // اختيار المشاركين في غرفة الدردشة
        last_message:messages(*) // اختيار آخر رسالة في غرفة الدردشة
      `
      )
      .contains("participants", [userId]) // التحقق من وجود المستخدم في المشاركين
      .order("updated_at", { ascending: false }); // ترتيب النتائج حسب تاريخ التحديث

    // إذا حدث خطأ، يتم طرح الخطأ
    if (error) throw error;
    return data; // إرجاع بيانات غرف الدردشة
  }

  // دالة للحصول على الرسائل في غرفة دردشة معينة بناءً على معرف غرفة الدردشة
  async getMessages(chatId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from("messages")
      .select("*") // اختيار جميع حقول الرسائل
      .eq("chat_room_id", chatId) // التحقق من مطابقة معرف غرفة الدردشة
      .order("created_at", { ascending: true }); // ترتيب الرسائل حسب تاريخ الإنشاء

    // إذا حدث خطأ، يتم طرح الخطأ
    if (error) throw error;
    return data; // إرجاع بيانات الرسائل
  }

  // دالة لإرسال رسالة جديدة إلى غرفة الدردشة
  async sendMessage(
    chatId: string,
    content: string,
    senderId: string
  ): Promise<Message> {
    const { data, error } = await supabase
      .from("messages")
      .insert({
        chat_room_id: chatId, // معرف غرفة الدردشة
        sender_id: senderId, // معرف المرسل
        content, // محتوى الرسالة
      })
      .select()
      .single(); // اختيار الرسالة المرسلة كعنصر واحد

    // إذا حدث خطأ، يتم طرح الخطأ
    if (error) throw error;
    return data; // إرجاع الرسالة المرسلة
  }

  // دالة لتحديث حالة القراءة لرسالة معينة
  async markAsRead(messageId: string): Promise<void> {
    const { error } = await supabase
      .from("messages")
      .update({ read: true }) // تحديث حالة الرسالة كـ "مقروءة"
      .eq("id", messageId); // التحقق من مطابقة معرف الرسالة

    // إذا حدث خطأ، يتم طرح الخطأ
    if (error) throw error;
  }
}

// إنشاء كائن من خدمة الدردشة
export const chatService = new ChatService();
