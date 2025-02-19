/**
 * Hook للتعامل مع المحادثات
 * يوفر وظائف لجلب الرسائل وإرسالها وإدارة التحديثات في الوقت الحقيقي باستخدام Supabase.
 */

import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { Message } from "../../../types/chat";

export const useChat = (chatId: string) => {
  // حالة لتخزين الرسائل الخاصة بالمحادثة
  const [messages, setMessages] = useState<Message[]>([]);
  // حالة لمعرفة ما إذا كان تحميل البيانات جاريًا
  const [loading, setLoading] = useState(true);
  // حالة لتخزين الأخطاء المحتملة أثناء جلب البيانات أو إرسال الرسائل
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // دالة لجلب الرسائل من قاعدة البيانات عند تحميل الكومبوننت أو تغيير chatId
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("messages") // تحديد الجدول المراد جلب البيانات منه
          .select("*") // جلب جميع الأعمدة
          .eq("chat_room_id", chatId) // جلب الرسائل الخاصة بالغرفة المحددة
          .order("created_at", { ascending: true }); // ترتيب الرسائل تصاعديًا حسب تاريخ الإنشاء

        if (error) throw error;
        setMessages(data); // تحديث الحالة بالرسائل التي تم جلبها
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error fetching messages"
        ); // تخزين الخطأ في حالة حدوثه
      } finally {
        setLoading(false); // إنهاء حالة التحميل
      }
    };

    fetchMessages(); // استدعاء الدالة لجلب الرسائل

    // الاشتراك في التحديثات الفورية للرسائل الجديدة
    const subscription = supabase
      .channel(`chat:${chatId}`) // تحديد قناة الغرفة للمحادثة
      .on(
        "postgres_changes",
        {
          event: "INSERT", // الاستماع إلى الإدخالات الجديدة
          schema: "public",
          table: "messages",
          filter: `chat_room_id=eq.${chatId}`, // التأكد من أن الرسائل الجديدة تخص نفس غرفة الدردشة
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]); // تحديث الحالة بإضافة الرسالة الجديدة
        }
      )
      .subscribe();

    // تنظيف الاشتراك عند تغيير chatId أو إلغاء تحميل الكومبوننت
    return () => {
      subscription.unsubscribe();
    };
  }, [chatId]);

  // دالة لإرسال رسالة جديدة إلى قاعدة البيانات
  const sendMessage = async (content: string) => {
    try {
      const { data, error } = await supabase
        .from("messages") // تحديد الجدول
        .insert([
          {
            chat_room_id: chatId, // تحديد معرف غرفة المحادثة
            content, // محتوى الرسالة
          },
        ])
        .select()
        .single(); // جلب العنصر المدخل فقط

      if (error) throw error;
      return data; // إرجاع البيانات التي تم إدخالها بنجاح
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Error sending message"
      ); // التعامل مع الأخطاء
    }
  };

  // إرجاع البيانات والدوال ليتم استخدامها في المكونات الأخرى
  return {
    messages, // قائمة الرسائل
    loading, // حالة التحميل
    error, // حالة الأخطاء
    sendMessage, // دالة إرسال الرسائل
  };
};
