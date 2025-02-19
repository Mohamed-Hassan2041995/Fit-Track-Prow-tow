// هذا الكود يعرّف واجهتين (Interfaces) لإدارة نظام الرسائل والدردشة في التطبيق
// الواجهة Message تمثل رسالة فردية بين مستخدمين
// الواجهة ChatRoom تمثل غرفة دردشة تحتوي على عدة مشاركين ورسائلهم

export interface Message {
  id: string; // معرف فريد للرسالة
  senderId: string; // معرف المستخدم الذي أرسل الرسالة
  receiverId: string; // معرف المستخدم الذي استلم الرسالة
  content: string; // محتوى الرسالة
  timestamp: Date; // وقت إرسال الرسالة
  read: boolean; // حالة قراءة الرسالة (true تعني أنها قُرئت، false تعني أنها لم تُقرأ بعد)
}

export interface ChatRoom {
  id: string; // معرف فريد لغرفة الدردشة
  participants: string[]; // مصفوفة تحتوي على معرفات جميع المشاركين في الدردشة
  lastMessage?: Message; // آخر رسالة تم إرسالها في هذه الغرفة (اختياري)
  unreadCount: number; // عدد الرسائل غير المقروءة في هذه الغرفة
  createdAt: Date; // تاريخ إنشاء غرفة الدردشة
  updatedAt: Date; // آخر مرة تم فيها تحديث بيانات الغرفة (مثلاً عند إرسال رسالة جديدة)
}
