import { supabase } from '../../utils/supabaseClient';
import { Message, ChatRoom } from '../../types/chat';

export class ChatService {
  async getChats(userId: string): Promise<ChatRoom[]> {
    const { data, error } = await supabase
      .from('chat_rooms')
      .select(`
        *,
        participants:chat_participants(user_id),
        last_message:messages(*)
      `)
      .contains('participants', [userId])
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getMessages(chatId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_room_id', chatId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  async sendMessage(chatId: string, content: string, senderId: string): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        chat_room_id: chatId,
        sender_id: senderId,
        content,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async markAsRead(messageId: string): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', messageId);

    if (error) throw error;
  }
}

export const chatService = new ChatService();