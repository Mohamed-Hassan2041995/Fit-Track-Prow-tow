/**
 * هوك لإدارة الإشعارات
 * يقوم هذا الهوك بجلب الإشعارات من API، ويقوم بتخزينها في حالة محلية.
 * كما يتيح للمستخدم وضع الإشعارات كمقروءة وتحديث الحالة محليًا.
 */

import { useState, useEffect } from "react";

// تعريف نوع الإشعار (Notification Type)
interface Notification {
  id: string; // معرف الإشعار
  title: string; // عنوان الإشعار
  message: string; // نص الإشعار
  read: boolean; // حالة قراءة الإشعار
  date: string; // تاريخ الإشعار
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
        const response = await fetch("/api/notifications"); // جلب الإشعارات من نقطة النهاية
        const data = await response.json(); // تحويل الاستجابة إلى JSON
        setNotifications(data); // تعيين البيانات المسترجعة كإشعارات
      } catch (error) {
        console.error("فشل في جلب الإشعارات:", error); // التعامل مع الأخطاء
      }
    };

    fetchNotifications(); // استدعاء دالة جلب الإشعارات عند تحميل الكمبوننت
  }, []); // مصفوفة الاعتماديات فارغة تعني أنه سيتم تنفيذ هذا التأثير مرة واحدة عند تحميل الكمبوننت

  // دالة لوضع الإشعار كمقروء
  const markAsRead = async (id: string) => {
    try {
      // هنا بيكون فيه استدعاء لـ API لتحديث حالة الإشعار
      await fetch(`/api/notifications/${id}/mark-as-read`, {
        method: "PUT", // استخدام طريقة PUT لتحديث الحالة
      });

      // تحديث الحالة المحلية
      setNotifications((prevNotifications) =>
        prevNotifications.map(
          (notification) =>
            notification.id === id
              ? { ...notification, read: true } // تحديث حالة القراءة
              : notification // الاحتفاظ بالإشعارات الأخرى كما هي
        )
      );
    } catch (error) {
      console.error("فشل في وضع الإشعار كمقروء:", error); // التعامل مع الأخطاء
    }
  };

  // إرجاع الإشعارات والدوال
  return {
    notifications, // الإشعارات
    markAsRead, // الدالة لوضع الإشعار كمقروء
  };
};

export default useNotifications; // تصدير الهوك للاستخدام في أجزاء أخرى من التطبيق
