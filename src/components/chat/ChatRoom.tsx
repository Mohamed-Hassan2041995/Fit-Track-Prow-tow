import React, { useState, useEffect, useRef } from 'react';
import {
  Paper,
  Box,
  TextField,
  IconButton,
  Typography,
  List,
  Avatar,
  Divider,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { Message } from '../../types/chat';
import { formatTimeAgo } from '../../utils/formatters';

interface ChatRoomProps {
  recipientId: string;
  recipientName: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ recipientId, recipientName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      senderId: user.id,
      receiverId: recipientId,
      timestamp: new Date(),
      read: false,
    };

    // TODO: Implement actual message sending
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <Paper sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">{recipientName}</Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        <List>
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.senderId === user?.id ? 'flex-end' : 'flex-start',
                mb: 2,
              }}
            >
              {message.senderId !== user?.id && (
                <Avatar sx={{ mr: 1 }}>{recipientName[0]}</Avatar>
              )}
              <Box
                sx={{
                  maxWidth: '70%',
                  bgcolor: message.senderId === user?.id ? 'primary.main' : 'grey.200',
                  color: message.senderId === user?.id ? 'white' : 'text.primary',
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Typography variant="body1">{message.content}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {formatTimeAgo(message.timestamp)}
                </Typography>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      <Divider />

      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          placeholder="اكتب رسالتك..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          sx={{ mr: 1 }}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatRoom;