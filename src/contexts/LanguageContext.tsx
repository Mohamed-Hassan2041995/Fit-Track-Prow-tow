/**
 * مزود سياق اللغة (Language Context Provider)
 * يدير حالة اللغة المختارة ويوفر إمكانية تبديل اللغة
 * الميزات:
 * - إدارة اللغة (الإنجليزية / العربية)
 * - توفير رسائل متعددة اللغات
 * - حفظ اللغة المفضلة في التخزين المحلي
 */

import React, { createContext, useContext, useState } from "react";
import { IntlProvider } from "react-intl"; // مكتبة لتوفير الرسائل المتعددة اللغات
import arabicMessages from "../locales/ar.json"; // الرسائل باللغة العربية
import englishMessages from "../locales/en.json"; // الرسائل باللغة الإنجليزية

type Language = "en" | "ar"; // نوع اللغة (إنجليزي / عربي)

interface LanguageContextType {
  language: Language; // اللغة الحالية
  toggleLanguage: () => void; // دالة لتبديل اللغة
}

// إنشاء سياق اللغة
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// رسائل اللغات المختلفة
const messages = {
  en: englishMessages,
  ar: arabicMessages,
};

// مزود سياق اللغة
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // حالة اللغة الحالية
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language"); // استرجاع اللغة المحفوظة من التخزين المحلي
    return (savedLanguage as Language) || "en"; // إرجاع اللغة المحفوظة أو اللغة الافتراضية (الإنجليزية)
  });

  // دالة لتبديل اللغة
  const toggleLanguage = () => {
    setLanguage((prevLang) => {
      const newLang = prevLang === "en" ? "ar" : "en"; // تبديل اللغة بين الإنجليزية والعربية
      localStorage.setItem("language", newLang); // حفظ اللغة الجديدة في التخزين المحلي
      return newLang; // إرجاع اللغة الجديدة
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      <IntlProvider messages={messages[language]} locale={language}>
        {children}
        {/* // تقديم الأطفال (المكونات) في السياق */}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

// دالة مخصصة لاستخدام سياق اللغة
export const useLanguage = () => {
  const context = useContext(LanguageContext); // الحصول على سياق اللغة
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider"); // إذا لم يتم استخدام useLanguage داخل LanguageProvider، إرجاع خطأ
  }
  return context; // إرجاع سياق اللغة
};
