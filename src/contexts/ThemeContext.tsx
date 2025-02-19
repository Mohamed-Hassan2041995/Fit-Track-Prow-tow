import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { useAuth } from "./AuthContext";
import { createGenderTheme } from "../theme/genderTheme";

// تعريف نوع سياق السمات
interface ThemeContextType {
  mode: "light" | "dark"; // وضع السمة (إضاءة أو ظلام)
  toggleMode: () => void; // دالة لتبديل الوضع
}

// إنشاء سياق السمات
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// مزود سياق السمات
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth(); // الحصول على معلومات المستخدم من سياق المصادقة
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const savedMode = localStorage.getItem("themeMode"); // استرجاع وضع السمة المحفوظ
    return (savedMode as "light" | "dark") || "light"; // استخدام الوضع المحفوظ أو الوضع الافتراضي (إضاءة)
  });

  // إنشاء سمة جديدة بناءً على الجنس والوضع
  const theme = createGenderTheme(user?.gender || "male", mode);

  // دالة لتبديل الوضع
  const toggleMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light"; // التبديل بين الوضعين
      localStorage.setItem("themeMode", newMode); // حفظ الوضع الجديد في التخزين المحلي
      return newMode; // إرجاع الوضع الجديد
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MUIThemeProvider theme={theme}>
        {" "}
        {/* تقديم السمة الجديدة للمكونات */}
        {children} {/* تقديم الأطفال */}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

// دالة مخصصة لاستخدام سياق السمات
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider"); // إذا لم يتم استخدام useTheme داخل ThemeProvider، إرجاع خطأ
  }
  return context; // إرجاع سياق السمات
};
