// مكون ChatList يعرض قائمة المحادثات المتاحة.
// يسمح للمستخدم باختيار محادثة، ويعرض آخر رسالة لكل محادثة مع وقت إرسالها.
// يستخدم MUI لإنشاء تصميم متناسق ومتجاوب.

import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  Typography,
} from "@mui/material";
import { ChatRoom } from "../../types/chat";
import { formatTimeAgo } from "../../utils/formatters";

interface ChatListProps {
  chats: ChatRoom[]; // قائمة المحادثات
  onSelectChat: (chatId: string) => void; // دالة لاستدعاء المحادثة عند التحديد
  selectedChatId?: string; // المحادثة المحددة حاليًا
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
            "&.Mui-selected": {
              backgroundColor: "action.selected", // تمييز المحادثة المختارة
            },
          }}
        >
          {/* الصورة الرمزية مع عدد الرسائل غير المقروءة */}
          <ListItemAvatar>
            <Badge
              color="primary"
              badgeContent={chat.unreadCount} // عدد الرسائل غير المقروءة
              invisible={chat.unreadCount === 0} // إخفاء الشارة إذا لم يكن هناك رسائل جديدة
            >
              <Avatar />
            </Badge>
          </ListItemAvatar>

          {/* تفاصيل المحادثة */}
          <ListItemText
            primary={chat.participants.join(", ")} // أسماء المشاركين في المحادثة
            secondary={
              chat.lastMessage && (
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {chat.lastMessage.content} {/* عرض محتوى آخر رسالة */}
                  </Typography>
                  {" • "}
                  {formatTimeAgo(chat.lastMessage.timestamp)}{" "}
                  {/* عرض توقيت الرسالة */}
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
