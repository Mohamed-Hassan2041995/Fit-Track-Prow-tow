// هذا الكمبوننت يمثل نافذة دردشة بين المستخدم الحالي والمستلم، حيث يسمح بإرسال واستقبال الرسائل. يتم عرض الرسائل في قائمة، ويُسمح للمستخدم بكتابة رسائل جديدة وإرسالها باستخدام زر الإرسال أو الضغط على مفتاح Enter.

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { formatTimeAgo } from "../../utils/formatters";
import { Message } from "../../types/chat";

interface ChatWindowProps {
  recipientId: string; // معرّف المستلم
  recipientName: string; // اسم المستلم
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  recipientId,
  recipientName,
}) => {
  const { user } = useAuth(); // الحصول على المستخدم الحالي من السياق
  const [messages, setMessages] = useState<Message[]>([]); // حفظ الرسائل
  const [newMessage, setNewMessage] = useState(""); // حفظ الرسالة الجديدة المكتوبة

  // دالة إرسال الرسالة
  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return; // إذا كانت الرسالة فارغة أو لم يتم تسجيل الدخول

    const message: Message = {
      id: Date.now().toString(), // استخدام الوقت الحالي كمعرّف فريد
      senderId: user.id, // معرّف المرسل
      receiverId: recipientId, // معرّف المستلم
      content: newMessage.trim(), // محتوى الرسالة
      timestamp: new Date(), // تاريخ ووقت الرسالة
      read: false, // حالة القراءة
    };

    // TODO: تنفيذ طلب API لإرسال الرسالة
    setMessages([...messages, message]); // إضافة الرسالة الجديدة إلى قائمة الرسائل
    setNewMessage(""); // مسح مربع النص بعد الإرسال
  };

  return (
    <Paper sx={{ height: "600px", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6">{recipientName}</Typography>{" "}
        {/* عرض اسم المستلم */}
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        <List>
          {messages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                flexDirection: "column",
                alignItems:
                  message.senderId === user?.id ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  maxWidth: "70%",
                  backgroundColor:
                    message.senderId === user?.id ? "primary.main" : "grey.200",
                  color:
                    message.senderId === user?.id ? "white" : "text.primary",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Typography>{message.content}</Typography>{" "}
                {/* عرض محتوى الرسالة */}
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {formatTimeAgo(message.timestamp)}{" "}
                  {/* عرض الوقت المنقضي منذ إرسال الرسالة */}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} // تحديث الرسالة الجديدة عند الكتابة
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(); // إرسال الرسالة عند الضغط على Enter
              }
            }}
          />
          <IconButton color="primary" onClick={handleSendMessage}>
            <SendIcon /> {/* أيقونة زر الإرسال */}
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChatWindow;
