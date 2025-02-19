/**
 * Hook للتعامل مع غرف المحادثة
 * يوفر وظائف لجلب غرف المحادثة، وإدارتها، وإنشاء غرف جديدة مع المشاركين.
 */

import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { ChatRoom } from "../../../types/chat";

export const useChatRooms = () => {
  // حالة لتخزين قائمة غرف المحادثة
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  // حالة لمعرفة ما إذا كان يتم تحميل البيانات حاليًا
  const [loading, setLoading] = useState(true);
  // حالة لتخزين أي أخطاء تحدث أثناء جلب البيانات أو إنشاء غرفة جديدة
  const [error, setError] = useState<string | null>(null);

  // دالة لجلب قائمة غرف المحادثة من قاعدة البيانات
  const fetchChatRooms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("chat_rooms") // جلب البيانات من جدول غرف المحادثة
        .select(
          `
          *, 
          participants:chat_participants(user_id), // جلب المشاركين في كل غرفة
          messages:messages(*) // جلب جميع الرسائل المرتبطة بالغرفة
        `
        )
        .order("updated_at", { ascending: false }); // ترتيب الغرف حسب آخر تحديث لها

      if (error) throw error;
      setChatRooms(data); // تحديث حالة الغرف بعد جلب البيانات
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error fetching chat rooms"
      ); // التعامل مع الخطأ إن وجد
    } finally {
      setLoading(false); // إيقاف تحميل البيانات بعد إنهاء العملية
    }
  };

  // دالة لإنشاء غرفة محادثة جديدة مع المشاركين المحددين
  const createChatRoom = async (participantIds: string[]) => {
    try {
      // إدراج غرفة جديدة في جدول المحادثات
      const { data, error } = await supabase
        .from("chat_rooms")
        .insert([{}]) // إدراج غرفة جديدة بدون بيانات إضافية
        .select()
        .single(); // جلب الغرفة التي تم إنشاؤها

      if (error) throw error;

      // تجهيز بيانات المشاركين في الغرفة الجديدة
      const participantsData = participantIds.map((userId) => ({
        chat_room_id: data.id, // تحديد معرف الغرفة
        user_id: userId, // معرف المستخدم المشارك
      }));

      // إدراج المشاركين في جدول `chat_participants`
      const { error: participantsError } = await supabase
        .from("chat_participants")
        .insert(participantsData);

      if (participantsError) throw participantsError;

      // تحديث قائمة الغرف بعد إضافة الغرفة الجديدة
      await fetchChatRooms();
      return data; // إرجاع بيانات الغرفة الجديدة
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Error creating chat room"
      ); // التعامل مع الأخطاء
    }
  };

  // جلب غرف المحادثة عند تحميل الـ Hook لأول مرة
  useEffect(() => {
    fetchChatRooms();
  }, []);

  return {
    chatRooms, // قائمة غرف المحادثة
    loading, // حالة التحميل
    error, // حالة الأخطاء
    createChatRoom, // دالة لإنشاء غرفة محادثة جديدة
    refreshChatRooms: fetchChatRooms, // دالة لإعادة تحميل غرف المحادثة
  };
};
