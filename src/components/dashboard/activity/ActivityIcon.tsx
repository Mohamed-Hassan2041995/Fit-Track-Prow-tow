/**
 * مكون ActivityIcon:
 * - يعرض أيقونة مناسبة بناءً على نوع النشاط (workout, nutrition, user, system).
 * - يستخدم مكتبة MUI Icons لاختيار الأيقونة المناسبة.
 * - يحتوي أيضًا على دالة getActivityColor التي تُرجع لونًا مناسبًا لكل نوع نشاط.
 */

import React from "react";
import { FitnessCenter, Restaurant, Person, Edit } from "@mui/icons-material";

// تعريف نوع القيم التي يمكن أن يأخذها المتغير "type"
interface ActivityIconProps {
  type: "workout" | "nutrition" | "user" | "system";
}

// مكون React يعرض أيقونة بناءً على نوع النشاط
const ActivityIcon: React.FC<ActivityIconProps> = ({ type }) => {
  switch (type) {
    case "workout":
      return <FitnessCenter />; // أيقونة رفع الأثقال للنشاط الرياضي
    case "nutrition":
      return <Restaurant />; // أيقونة الطعام للتغذية
    case "user":
      return <Person />; // أيقونة الشخص للمستخدم
    default:
      return <Edit />; // أيقونة التعديل للنظام أو الحالات الافتراضية
  }
};

// دالة تُرجع لونًا مناسبًا لكل نوع نشاط
export const getActivityColor = (
  type: "workout" | "nutrition" | "user" | "system"
): string => {
  switch (type) {
    case "workout":
      return "#1976d2"; // لون أزرق للنشاط الرياضي
    case "nutrition":
      return "#2e7d32"; // لون أخضر للتغذية
    case "user":
      return "#ed6c02"; // لون برتقالي للمستخدم
    default:
      return "#757575"; // لون رمادي للحالات الافتراضية
  }
};

export default ActivityIcon;
