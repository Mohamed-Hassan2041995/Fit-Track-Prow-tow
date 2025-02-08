/**
 * Hook للتعامل مع غرف المحادثة
 * يوفر وظائف لجلب وإدارة غرف المحادثة
 */
import { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabaseClient';
import { ChatRoom } from '../../../types/chat';

export const useChatRooms = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChatRooms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('chat_rooms')
        .select(`
          *,
          participants:chat_participants(user_id),
          messages:messages(*)
        `)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setChatRooms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching chat rooms');
    } finally {
      setLoading(false);
    }
  };

  const createChatRoom = async (participantIds: string[]) => {
    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .insert([{}])
        .select()
        .single();

      if (error) throw error;

      const participantsData = participantIds.map(userId => ({
        chat_room_id: data.id,
        user_id: userId,
      }));

      const { error: participantsError } = await supabase
        .from('chat_participants')
        .insert(participantsData);

      if (participantsError) throw participantsError;

      await fetchChatRooms();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error creating chat room');
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  return {
    chatRooms,
    loading,
    error,
    createChatRoom,
    refreshChatRooms: fetchChatRooms,
  };
};