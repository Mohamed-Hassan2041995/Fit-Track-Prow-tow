import React, { createContext, useContext, useState, useCallback } from "react";
import { Alert, Snackbar } from "@mui/material";

// تعريف نوع الإشعار
interface Notification {
  id: string; // معرف الإشعار
  message: string; // رسالة الإشعار
  type: "success" | "error" | "info" | "warning"; // نوع الإشعار
}

// تعريف واجهة سياق الإشعار
interface NotificationContextType {
  showNotification: (message: string, type: Notification["type"]) => void; // دالة لإظهار الإشعار
}

// إنشاء سياق الإشعار
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

// مزود سياق الإشعار
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification | null>(null); // حالة الإشعار

  // دالة لإظهار الإشعار
  const showNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      setNotification({
        id: Date.now().toString(), // تعيين معرف فريد للإشعار
        message, // تعيين الرسالة
        type, // تعيين النوع
      });
    },
    []
  );

  // دالة لإغلاق الإشعار
  const handleClose = () => {
    setNotification(null); // إعادة تعيين حالة الإشعار إلى null عند الإغلاق
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children} {/* تقديم الأطفال مع سياق الإشعار */}
      <Snackbar
        open={!!notification} // فتح Snackbar إذا كان هناك إشعار
        autoHideDuration={6000} // إخفاء الإشعار تلقائيًا بعد 6 ثوانٍ
        onClose={handleClose} // إغلاق الإشعار عند انتهاء الوقت أو عند النقر
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // مكان ظهور Snackbar
      >
        {notification && ( // إذا كان هناك إشعار، قم بعرضه
          <Alert onClose={handleClose} severity={notification.type}>
            {notification.message} {/* عرض رسالة الإشعار */}
          </Alert>
        )}
      </Snackbar>
    </NotificationContext.Provider>
  );
};

// دالة مخصصة لاستخدام سياق الإشعار
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider" // إذا لم يتم استخدام useNotification داخل NotificationProvider، إرجاع خطأ
    );
  }
  return context; // إرجاع سياق الإشعار
};
