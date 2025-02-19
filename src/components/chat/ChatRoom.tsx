// ChatRoom Component
// هذا الكمبوننت يمثل غرفة دردشة بين المستخدم الحالي والمستلم المحدد.
// يسمح للمستخدمين بإرسال واستقبال الرسائل النصية في واجهة محادثة تفاعلية.

import React, { useState, useEffect, useRef } from "react";
import {
  Paper,
  Box,
  TextField,
  IconButton,
  Typography,
  List,
  Avatar,
  Divider,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { Message } from "../../types/chat";
import { formatTimeAgo } from "../../utils/formatters";

interface ChatRoomProps {
  recipientId: string;
  recipientName: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ recipientId, recipientName }) => {
  // حالة لتخزين الرسائل
  const [messages, setMessages] = useState<Message[]>([]);
  // حالة لتخزين محتوى الرسالة الجديدة
  const [newMessage, setNewMessage] = useState("");
  // استدعاء معلومات المستخدم من السياق
  const { user } = useAuth();
  // مرجع لتحديد آخر رسالة لتمرير الشاشة تلقائيًا للأسفل
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // دالة لتمرير الشاشة للأسفل عند تحديث الرسائل
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // تمرير الشاشة للأسفل عند تغيير قائمة الرسائل
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // دالة لإرسال الرسائل
  const handleSend = async () => {
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: Date.now().toString(), // إنشاء معرف فريد للرسالة
      content: newMessage.trim(),
      senderId: user.id,
      receiverId: recipientId,
      timestamp: new Date(),
      read: false,
    };

    // TODO: تنفيذ عملية الإرسال الفعلية عبر API
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <Paper sx={{ height: "70vh", display: "flex", flexDirection: "column" }}>
      {/* عنوان غرفة الدردشة */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6">{recipientName}</Typography>
      </Box>

      {/* قائمة الرسائل */}
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        <List>
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: "flex",
                justifyContent:
                  message.senderId === user?.id ? "flex-end" : "flex-start",
                mb: 2,
              }}
            >
              {/* صورة المستلم بجانب الرسائل الواردة */}
              {message.senderId !== user?.id && (
                <Avatar sx={{ mr: 1 }}>{recipientName[0]}</Avatar>
              )}
              {/* فقاعة الرسالة */}
              <Box
                sx={{
                  maxWidth: "70%",
                  bgcolor:
                    message.senderId === user?.id ? "primary.main" : "grey.200",
                  color:
                    message.senderId === user?.id ? "white" : "text.primary",
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

      {/* إدخال الرسالة وإرسالها */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          placeholder="اكتب رسالتك..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
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
