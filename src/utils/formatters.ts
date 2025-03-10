/**
 * هذا الكود يعرّف مجموعة من الدوال لمساعدتك في تنسيق التواريخ والأوقات والأرقام بطريقة مناسبة وسهلة القراءة.
 *
 * 1. **formatDate**: تقوم هذه الدالة بتنسيق تاريخ معين (سواء كان من نوع `Date` أو `string`) إلى تنسيق تاريخ بسيط (مثل "01 يناير 2025").
 *
 * 2. **formatDateTime**: تقوم هذه الدالة بتنسيق تاريخ ووقت معين إلى تنسيق أكثر تفصيلًا (مثل "01 يناير 2025، 12:00 ص").
 *
 * 3. **formatTimeAgo**: تقوم هذه الدالة بحساب المدة الزمنية التي مرت منذ تاريخ معين حتى الوقت الحالي، وتضيف لاحقة مثل "منذ يوم" أو "منذ ساعتين".
 *
 * 4. **formatNumber**: تقوم هذه الدالة بتنسيق الأرقام إلى تنسيق محلي يتضمن الفواصل (مثل تحويل 1000 إلى "1,000").
 */

import { format, formatDistance } from "date-fns";

// دالة لتنسيق التاريخ إلى تنسيق بسيط
export const formatDate = (date: Date | string): string => {
  return format(new Date(date), "PP"); // إعادة التاريخ بتنسيق بسيط
};

// دالة لتنسيق التاريخ والوقت إلى تنسيق شامل
export const formatDateTime = (date: Date | string): string => {
  return format(new Date(date), "PPp"); // إعادة التاريخ والوقت بتنسيق شامل
};

// دالة لحساب المدة الزمنية منذ تاريخ معين
// export const formatTimeAgo = (date: Date | string): string => {
//   return formatDistance(new Date(date), new Date(), { addSuffix: true }); // إعادة المدة الزمنية مع لاحقة
// };

// utils/formatters.ts
export const formatTimeAgo = (time: string) => {
  const date = new Date(time);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
};
// دالة لتنسيق الأرقام
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num); // إعادة الرقم بتنسيق محلي
};
