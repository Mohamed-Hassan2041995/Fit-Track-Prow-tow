/**
 * Hook للتعامل مع المحادثات
 * يوفر وظائف لجلب وإرسال وإدارة الرسائل
 */
import { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabaseClient';
import { Message } from '../../../types/chat';

export const useChat = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('chat_room_id', chatId)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Subscribe to new messages
    const subscription = supabase
      .channel(`chat:${chatId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `chat_room_id=eq.${chatId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [chatId]);

  const sendMessage = async (content: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            chat_room_id: chatId,
            content,
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error sending message');
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
  };
};