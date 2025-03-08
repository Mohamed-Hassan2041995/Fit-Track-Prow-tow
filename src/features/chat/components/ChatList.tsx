/**
 * قائمة المحادثات
 * تعرض قائمة بجميع المحادثات النشطة
 */
import React from "react"; // استيراد React
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  Typography,
} from "@mui/material"; // استيراد المكونات اللازمة من مكتبة MUI
import { ChatRoom } from "../../../types/chat"; // استيراد نوع ChatRoom
import { formatTimeAgo } from "../../../utils/formatters"; // استيراد دالة لتنسيق الوقت

// تعريف واجهة Props الخاصة بالمكون
interface ChatListProps {
  chats: ChatRoom[]; // مصفوفة من المحادثات
  onSelectChat: (chatId: string) => void; // دالة للتعامل مع اختيار المحادثة
  selectedChatId?: string; // معرف المحادثة المحددة (اختياري)
}

// تعريف المكون
const ChatList: React.FC<ChatListProps> = ({
  chats,
  onSelectChat,
  selectedChatId,
}) => {
  return (
    <List>
      {chats.map(
        (
          chat // تكرار المحادثات
        ) => (
          <ListItem
            key={chat.id} // تعيين مفتاح فريد للمحادثة
            button // جعل العنصر قابل للنقر
            selected={chat.id === selectedChatId} // تحديد ما إذا كانت المحادثة محددة
            onClick={() => onSelectChat(chat.id)} // استدعاء دالة اختيار المحادثة عند النقر
            sx={{
              borderRadius: 1, // تعيين الزوايا المستديرة
              mb: 1, // إضافة هامش سفلي
              "&.Mui-selected": {
                backgroundColor: "action.selected", // تغيير لون الخلفية عند التحديد
              },
            }}
          >
            <ListItemAvatar>
              <Badge
                color="primary"
                badgeContent={chat.unreadCount} // عدد الرسائل غير المقروءة
                invisible={chat.unreadCount === 0} // إخفاء الشارة إذا كان العدد صفر
              >
                <Avatar /> {/* صورة الملف الشخصي للمستخدم */}
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={chat.participants.join(", ")} // عرض أسماء المشاركين في المحادثة
              secondary={
                // عرض آخر رسالة وتاريخها
                chat.lastMessage && (
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {chat.lastMessage.content} {/* محتوى آخر رسالة */}
                    </Typography>
                    {" • "}
                    {formatTimeAgo(chat.lastMessage.timestamp)}{" "}
                    {/* عرض الوقت المنقضي منذ إرسال آخر رسالة */}
                  </>
                )
              }
            />
          </ListItem>
        )
      )}
    </List>
  );
};

export default ChatList;
