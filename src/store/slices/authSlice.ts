// هذا الكود ينشئ شريحة إدارة حالة المصادقة باستخدام Redux Toolkit.
// الشريحة تحتوي على الحالة الحالية للمستخدم، رمز المصادقة، وتحقق من حالة المصادقة.

import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // استيراد دوال من مكتبة Redux Toolkit
import { User } from "../../types/user"; // استيراد نوع المستخدم

// تعريف واجهة لحالة المصادقة
interface AuthState {
  user: User | null; // المستخدم الحالي أو null إذا لم يكن هناك مستخدم مسجل
  token: string | null; // رمز المصادقة أو null إذا لم يكن هناك رمز
  isAuthenticated: boolean; // حالة المصادقة (مستخدم مسجل أو لا)
}

// الحالة الابتدائية لشريحة المصادقة
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// إنشاء شريحة للمصادقة
const authSlice = createSlice({
  name: "auth", // اسم الشريحة
  initialState, // الحالة الابتدائية
  reducers: {
    // دالة لتعيين المستخدم
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload; // تعيين المستخدم الحالي
      state.isAuthenticated = !!action.payload; // تعيين حالة المصادقة بناءً على وجود المستخدم
    },
    // دالة لتعيين رمز المصادقة
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload; // تعيين رمز المصادقة
    },
    // دالة لتسجيل الخروج
    logout: (state) => {
      state.user = null; // تعيين المستخدم إلى null
      state.token = null; // تعيين رمز المصادقة إلى null
      state.isAuthenticated = false; // تعيين حالة المصادقة إلى false
    },
  },
});

// تصدير الدوال التي تم إنشاؤها من الشريحة
export const { setUser, setToken, logout } = authSlice.actions;
// تصدير المخفض الخاص بالشريحة ليتم استخدامه في المتجر
export default authSlice.reducer;
