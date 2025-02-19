/**
 * رسالة محادثة
 * تعرض رسالة واحدة في المحادثة
 */
import React from "react"; // استيراد React
import { ListItem, Box, Typography } from "@mui/material"; // استيراد المكونات اللازمة من مكتبة MUI
import { useAuth } from "../../../contexts/AuthContext"; // استيراد السياق الخاص بالمصادقة
import { Message } from "../../../types/chat"; // استيراد نوع Message
import { formatTimeAgo } from "../../../utils/formatters"; // استيراد دالة لتنسيق الوقت

// تعريف واجهة Props الخاصة بالمكون
interface ChatMessageProps {
  message: Message; // رسالة واحدة من نوع Message
}

// تعريف المكون
const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { user } = useAuth(); // الحصول على معلومات المستخدم الحالي من السياق
  const isOwnMessage = message.senderId === user?.id; // التحقق مما إذا كانت الرسالة من المستخدم الحالي

  return (
    <ListItem
      sx={{
        flexDirection: "column", // تعيين اتجاه العمود
        alignItems: isOwnMessage ? "flex-end" : "flex-start", // محاذاة الرسالة حسب من أرسلها
      }}
    >
      <Box
        sx={{
          maxWidth: "70%", // تعيين الحد الأقصى لعرض الرسالة
          backgroundColor: isOwnMessage ? "primary.main" : "grey.200", // تغيير لون الخلفية حسب المرسل
          color: isOwnMessage ? "white" : "text.primary", // تغيير لون النص حسب المرسل
          borderRadius: 2, // تعيين الزوايا المستديرة
          p: 2, // إضافة حشوة داخلية
        }}
      >
        <Typography>{message.content}</Typography> {/* محتوى الرسالة */}
        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          {/* تنسيق الوقت */}
          {formatTimeAgo(message.timestamp)}{" "}
          {/* عرض الوقت المنقضي منذ إرسال الرسالة */}
        </Typography>
      </Box>
    </ListItem>
  );
};

export default ChatMessage; // تصدير المكون
