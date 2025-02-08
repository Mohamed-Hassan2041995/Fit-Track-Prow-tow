import { useState, useEffect } from "react";

// تعريف نوع الإشعار (Notification Type)
interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  date: string;
}

// تعريف الـ hook
const useNotifications = () => {
  // حالة الإشعارات
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // جلب الإشعارات من API (مثال)
  useEffect(() => {
    // هنا بيكون فيه استدعاء لـ API لجلْب الإشعارات
    const fetchNotifications = async () => {
      try {
        // مثال: استدعاء API
        const response = await fetch("/api/notifications");
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // دالة لوضع الإشعار كمقروء
  const markAsRead = async (id: string) => {
    try {
      // هنا بيكون فيه استدعاء لـ API لتحديث حالة الإشعار
      await fetch(`/api/notifications/${id}/mark-as-read`, {
        method: "PUT",
      });

      // تحديث الحالة المحلية
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // إرجاع الإشعارات والدوال
  return {
    notifications,
    markAsRead,
  };
};

export default useNotifications;
