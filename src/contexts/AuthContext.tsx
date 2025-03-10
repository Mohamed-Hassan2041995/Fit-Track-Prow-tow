/**
 * مزود سياق المصادقة (Authentication Context Provider)
 * يدير حالة مصادقة المستخدم والأذونات
 * الميزات:
 * - مصادقة المستخدم
 * - التحكم في الوصول بناءً على الأدوار
 * - الحفاظ على الجلسة
 * - وظائف تسجيل الدخول / تسجيل الخروج
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { User, UserRole } from "../types/user";
import { mockUsers } from "../data/mockUsers";

// تعريف نوع سياق المصادقة
interface AuthContextType {
  user: User | null; // المستخدم الحالي أو null إذا لم يكن هناك مستخدم مسجل الدخول
  isAuthenticated: boolean; // حالة المصادقة، true إذا كان المستخدم مسجلاً دخوله
  login: (email: string, password: string) => Promise<void>; // دالة لتسجيل الدخول
  logout: () => void; // دالة لتسجيل الخروج
  hasPermission: (requiredRole: UserRole) => boolean; // دالة للتحقق من الأذونات
  updateUser: (updatedUser: User) => void; // إضافة الخاصية هنا
}

// إنشاء سياق المصادقة
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// مزود سياق المصادقة
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // حالة المستخدم الحالي
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user"); // استرجاع المستخدم المحفوظ من التخزين المحلي
    return savedUser ? JSON.parse(savedUser) : null; // إذا كان هناك مستخدم محفوظ، استرجعه
  });

  // حالة المصادقة
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("user"); // تحقق مما إذا كان هناك مستخدم محفوظ لتحديد حالة المصادقة
  });

  // دالة تسجيل الدخول
  const login = useCallback(async (email: string, password: string) => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password // البحث عن المستخدم في البيانات الوهمية
    );

    if (!foundUser) {
      throw new Error("Invalid credentials"); // إذا لم يتم العثور على المستخدم، إرجاع خطأ
    }

    // تحديث حالة المستخدم
    setUser(foundUser.user);
    setIsAuthenticated(true); // تحديث حالة المصادقة
    localStorage.setItem("user", JSON.stringify(foundUser.user)); // حفظ المستخدم في التخزين المحلي
  }, []);

  // دالة تسجيل الخروج
  const logout = useCallback(() => {
    setUser(null); // إعادة تعيين حالة المستخدم
    setIsAuthenticated(false); // تحديث حالة المصادقة
    localStorage.removeItem("user"); // إزالة المستخدم من التخزين المحلي
  }, []);

  // دالة للتحقق من الأذونات
  const hasPermission = useCallback(
    (requiredRole: UserRole): boolean => {
      if (!user) return false; // إذا لم يكن هناك مستخدم، إرجاع false
      if (user.role === UserRole.ADMIN) return true; // إذا كان المستخدم مسؤولاً، إرجاع true
      return user.role === requiredRole; // تحقق مما إذا كان للمستخدم الدور المطلوب
    },
    [user]
  );

  // استخدام useEffect للتحقق من وجود مستخدم محفوظ عند تحميل الكمبوننت
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // تعيين المستخدم المحفوظ
      setIsAuthenticated(true); // تحديث حالة المصادقة
    }
  }, []);

  // تقديم السياق مع القيم اللازمة
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, hasPermission }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// دالة مخصصة لاستخدام سياق المصادقة
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider"); // إذا لم يتم استخدام useAuth داخل AuthProvider، إرجاع خطأ
  }
  return context; // إرجاع سياق المصادقة
};
