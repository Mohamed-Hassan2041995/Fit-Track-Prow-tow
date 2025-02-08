/**
 * رسالة محادثة
 * تعرض رسالة واحدة في المحادثة
 */
import React from 'react';
import { ListItem, Box, Typography } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';
import { Message } from '../../../types/chat';
import { formatTimeAgo } from '../../../utils/formatters';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { user } = useAuth();
  const isOwnMessage = message.senderId === user?.id;

  return (
    <ListItem
      sx={{
        flexDirection: 'column',
        alignItems: isOwnMessage ? 'flex-end' : 'flex-start',
      }}
    >
      <Box
        sx={{
          maxWidth: '70%',
          backgroundColor: isOwnMessage ? 'primary.main' : 'grey.200',
          color: isOwnMessage ? 'white' : 'text.primary',
          borderRadius: 2,
          p: 2,
        }}
      >
        <Typography>{message.content}</Typography>
        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          {formatTimeAgo(message.timestamp)}
        </Typography>
      </Box>
    </ListItem>
  );
};