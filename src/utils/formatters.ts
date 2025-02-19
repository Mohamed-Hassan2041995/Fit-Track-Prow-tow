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
export const formatTimeAgo = (date: Date | string): string => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true }); // إعادة المدة الزمنية مع لاحقة
};

// دالة لتنسيق الأرقام
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num); // إعادة الرقم بتنسيق محلي
};
