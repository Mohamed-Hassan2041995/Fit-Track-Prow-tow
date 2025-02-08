import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  Typography,
} from '@mui/material';
import { ChatRoom } from '../../types/chat';
import { formatTimeAgo } from '../../utils/formatters';

interface ChatListProps {
  chats: ChatRoom[];
  onSelectChat: (chatId: string) => void;
  selectedChatId?: string;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  onSelectChat,
  selectedChatId,
}) => {
  return (
    <List>
      {chats.map((chat) => (
        <ListItem
          key={chat.id}
          button
          selected={chat.id === selectedChatId}
          onClick={() => onSelectChat(chat.id)}
          sx={{
            borderRadius: 1,
            mb: 1,
            '&.Mui-selected': {
              backgroundColor: 'action.selected',
            },
          }}
        >
          <ListItemAvatar>
            <Badge
              color="primary"
              badgeContent={chat.unreadCount}
              invisible={chat.unreadCount === 0}
            >
              <Avatar />
            </Badge>
          </ListItemAvatar>
          <ListItemText
            primary={chat.participants.join(', ')}
            secondary={
              chat.lastMessage && (
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {chat.lastMessage.content}
                  </Typography>
                  {' • '}
                  {formatTimeAgo(chat.lastMessage.timestamp)}
                </>
              )
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;