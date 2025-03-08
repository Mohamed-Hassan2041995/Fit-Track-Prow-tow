/**
 * نافذة المحادثة
 * تعرض المحادثة الحالية وتتيح إرسال الرسائل
 */
import React, { useState, useRef, useEffect } from "react"; // استيراد المكتبات اللازمة من React
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  List,
} from "@mui/material"; // استيراد المكونات من مكتبة MUI
import { Send as SendIcon } from "@mui/icons-material"; // استيراد أيقونة الإرسال
import { Message } from "../../../types/chat"; // استيراد نوع Message
import ChatMessage from "./ChatMessage"; // استيراد مكون ChatMessage لعرض الرسائل
import { useChat } from "../hooks/useChat"; // استيراد Hook لإدارة المحادثة

// تعريف واجهة Props الخاصة بالمكون
interface ChatWindowProps {
  chatId: string; // معرف المحادثة
  recipientName: string; // اسم المستلم
}

// تعريف المكون
export const ChatWindow: React.FC<ChatWindowProps> = ({
  chatId,
  recipientName,
}) => {
  const [newMessage, setNewMessage] = useState(""); // حالة لتخزين الرسالة الجديدة
  const messagesEndRef = useRef<HTMLDivElement>(null); // مرجع لأسفل قائمة الرسائل
  const { messages, sendMessage, loading } = useChat(chatId); // استخدام Hook لجلب الرسائل وإرسالها

  // دالة للتمرير إلى أسفل قائمة الرسائل
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // تمرير السلسلة إلى أسفل
  };

  // استخدام useEffect للتنفيذ عند تغيير الرسائل
  useEffect(() => {
    scrollToBottom(); // تمرير السلسلة إلى أسفل عند إضافة رسالة جديدة
  }, [messages]);

  // دالة لإرسال الرسالة
  const handleSend = async () => {
    if (!newMessage.trim()) return; // التحقق من عدم كون الرسالة فارغة

    try {
      await sendMessage(newMessage); // إرسال الرسالة
      setNewMessage(""); // إعادة تعيين حالة الرسالة الجديدة
    } catch (error) {
      console.error("Error sending message:", error); // تسجيل الخطأ في حال حدوثه
    }
  };

  return (
    <Paper sx={{ height: "600px", display: "flex", flexDirection: "column" }}>
      {/* رأس نافذة المحادثة مع اسم المستلم */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6">{recipientName}</Typography>
      </Box>

      {/* منطقة عرض الرسائل */}
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        <List>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} /> // عرض كل رسالة باستخدام مكون ChatMessage
          ))}
        </List>
        <div ref={messagesEndRef} /> {/* مرجع لأسفل قائمة الرسائل */}
      </Box>

      {/* منطقة إدخال الرسالة الجديدة */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            placeholder="اكتب رسالتك..." // النص التوجيهي للمستخدم
            value={newMessage} // قيمة حقل الإدخال
            onChange={(e) => setNewMessage(e.target.value)} // تحديث الحالة عند تغيير النص
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSend(); // إرسال الرسالة عند الضغط على Enter
              }
            }}
            disabled={loading} // تعطيل الحقل إذا كان في حالة تحميل
          />
          <IconButton
            color="primary"
            onClick={handleSend} // إرسال الرسالة عند النقر على الأيقونة
            disabled={loading || !newMessage.trim()} // تعطيل الزر إذا كان في حالة تحميل أو الرسالة فارغة
          >
            <SendIcon /> {/* أيقونة الإرسال */}
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChatWindow;
