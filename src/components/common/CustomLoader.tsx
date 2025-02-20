// هذا الكمبوننت يمثل مؤشر تحميل مخصص يظهر أثناء تحميل المحتوى. يتم عرض أيقونة لياقة بدنية (مستوحاة من مكونات MUI) مع تأثيرات حركة دوارة واهتزازية، بالإضافة إلى نص "جاري التحميل..." في أسفل الشاشة.

import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { FitnessCenter } from "@mui/icons-material";
import { keyframes } from "@mui/system";

// تعريف تأثير حركة الدوران
const rotate = keyframes`
  from {
    transform: rotate(0deg);  // البداية من الزاوية 0 درجة
  }
  to {
    transform: rotate(360deg); // النهاية من الزاوية 360 درجة
  }
`;

// تعريف تأثير حركة الاهتزاز
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);  // في البداية وفي النهاية، لا يوجد تحرك عمودي
  }
  50% {
    transform: translateY(-10px); // في المنتصف، تحرك الأيقونة لأعلى بمقدار 10 بيكسل
  }
`;

const CustomLoader: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed", // لتثبيت الكمبوننت في أعلى الشاشة
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // لضبط العناصر في المنتصف
        backgroundColor: "rgba(255, 255, 255, 0.9)", // خلفية شبه شفافة
        zIndex: 9999, // جعل الكمبوننت في أعلى جميع العناصر
      }}
    >
      <FitnessCenter
        sx={{
          fontSize: 120, // تحديد حجم الأيقونة
          color: "primary.main", // تحديد اللون الأساسي من الثيم
          padding: "1rem",
          borderRadius: "50%",
          border: "1px solid black",
          animation: `${bounce} 1s ease-in-out infinite, ${rotate} 2s linear infinite`, // تطبيق تأثيرات الحركة
        }}
      />
      <Box sx={{ mt: 2, color: "primary.main" }}>loading...</Box>{" "}
      {/* النص المعروض أثناء التحميل */}
    </Box>
  );
};

export default CustomLoader;
