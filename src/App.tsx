/**
 * هذا الكود يمثل المكون الرئيسي لتطبيق React. يقوم بإدارة حالة تحميل البيانات وعرض واجهة المستخدم.
 *
 * 1. يتم استيراد المكونات اللازمة من مكتبات React وMUI وReact Router.
 * 2. يتم إنشاء حالة `sidebarOpen` لإدارة فتح وإغلاق الشريط الجانبي.
 * 3. يتم إنشاء حالة `isLoading` لمعرفة ما إذا كانت البيانات لا تزال قيد التحميل.
 * 4. يتم تعريف دالة `toggleSidebar` لتبديل حالة الشريط الجانبي.
 * 5. يتم استخدام `useEffect` لمحاكاة عملية تحميل البيانات، حيث يتم إخفاء اللودر بعد 3 ثواني.
 * 6. في حالة التحميل، يتم عرض `CustomLoader`. بعد الانتهاء من التحميل، يتم عرض واجهة التطبيق باستخدام `Router`.
 * 7. يتم تضمين `AuthProvider` لتوفير سياق المصادقة للمكونات الفرعية.
 * 8. يتم عرض شريط التنقل والشريط الجانبي والمحتوى الرئيسي.
 */

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import CustomLoader from "./components/common/CustomLoader";

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // حالة لإدارة فتح وإغلاق الشريط الجانبي
  const [isLoading, setIsLoading] = useState(true); // حالة لمعرفة إذا كانت البيانات قيد التحميل

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // تغيير حالة الشريط الجانبي
  };

  // محاكاة تحميل البيانات
  useEffect(() => {
    // يمكن هنا وضع استعلام API أو أي عملية تستغرق وقتًا
    setTimeout(() => {
      setIsLoading(false); // إخفاء اللودر بعد 3 ثواني كمثال
    }, 3000);
  }, []);

  return (
    <>
      {isLoading ? (
        <CustomLoader /> // عرض الكمبوننت أثناء التحميل
      ) : (
        <Router>
          <AuthProvider>
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Navbar onMenuClick={toggleSidebar} /> {/* شريط التنقل */}
              <Sidebar
                open={sidebarOpen} // حالة فتح الشريط الجانبي
                onClose={() => setSidebarOpen(false)} // إغلاق الشريط الجانبي
              />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: 3,
                  mt: 8,
                  minHeight: "100vh",
                }}
              >
                <AppRoutes /> {/* عرض مسارات التطبيق */}
              </Box>
            </Box>
          </AuthProvider>
        </Router>
      )}
    </>
  );
};

export default App;
