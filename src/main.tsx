/**
 * هذا الكود يمثل نقطة دخول تطبيق React. يقوم بإعداد البيئة الأساسية للتطبيق عن طريق
 *
 * 1. استيراد المكتبات اللازمة.
 * 2. إعداد الـ Redux Provider لتوفير حالة التطبيق على مستوى التطبيق.
 * 3. إعداد سياقات المصادقة والسمات واللغة والإشعارات لتكون متاحة في جميع مكونات التطبيق.
 * 4. استخدام CssBaseline من MUI لتوحيد الأنماط الأساسية عبر جميع المتصفحات.
 * 5. أخيرًا، يقوم برينت التطبيق داخل عنصر DOM محدد.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store"; // استيراد المتجر من ملف store
import CssBaseline from "@mui/material/CssBaseline"; // استيراد CssBaseline لتوحيد الأنماط
import App from "./App"; // استيراد المكون الرئيسي للتطبيق
import { AuthProvider } from "./contexts/AuthContext"; // استيراد سياق المصادقة
import { ThemeProvider } from "./contexts/ThemeContext"; // استيراد سياق السمات
import { LanguageProvider } from "./contexts/LanguageContext"; // استيراد سياق اللغة
import { NotificationProvider } from "./contexts/NotificationContext"; // استيراد سياق الإشعارات

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      {/* تقديم المتجر للتطبيق */}
      <AuthProvider>
        {" "}
        {/* تقديم سياق المصادقة */}
        <ThemeProvider>
          {" "}
          {/* تقديم سياق السمات */}
          <LanguageProvider>
            {" "}
            {/* تقديم سياق اللغة */}
            <NotificationProvider>
              {" "}
              {/* تقديم سياق الإشعارات */}
              <CssBaseline /> {/* توحيد الأنماط الأساسية */}
              <App /> {/* عرض المكون الرئيسي للتطبيق */}
            </NotificationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
