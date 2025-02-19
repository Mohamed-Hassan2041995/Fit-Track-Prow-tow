// هذا الكود ينشئ شريحة لإدارة حالة المستخدمين باستخدام Redux Toolkit.
// الشريحة تحتوي على قائمة المستخدمين، حالة التحميل، وأي أخطاء قد تحدث أثناء العمليات.

import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // استيراد دوال من مكتبة Redux Toolkit
import { User } from "../../types/user"; // استيراد نوع المستخدم

// تعريف واجهة لحالة المستخدمين
interface UserState {
  users: User[]; // قائمة المستخدمين
  loading: boolean; // حالة التحميل (true إذا كان هناك تحميل، false إذا لم يكن)
  error: string | null; // أي خطأ قد يحدث، أو null إذا لم يكن هناك خطأ
}

// الحالة الابتدائية لشريحة المستخدمين
const initialState: UserState = {
  users: [], // بدءاً بقائمة فارغة من المستخدمين
  loading: false, // بدءاً بدون تحميل
  error: null, // بدءاً بدون أي أخطاء
};

// إنشاء شريحة للمستخدمين
const userSlice = createSlice({
  name: "user", // اسم الشريحة
  initialState, // الحالة الابتدائية
  reducers: {
    // دالة لتعيين قائمة المستخدمين
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload; // تعيين قائمة المستخدمين في الحالة
    },
    // دالة لإضافة مستخدم جديد
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload); // إضافة المستخدم الجديد إلى القائمة
    },
    // دالة لتحديث مستخدم موجود
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      ); // البحث عن الفهرس الخاص بالمستخدم
      if (index !== -1) {
        // إذا وُجد المستخدم
        state.users[index] = action.payload; // تحديث المستخدم
      }
    },
    // دالة لحذف مستخدم
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload); // تصفية المستخدمين وحذف المستخدم الذي يطابق المعرف
    },
    // دالة لتعيين حالة التحميل
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload; // تعيين حالة التحميل
    },
    // دالة لتعيين الخطأ
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload; // تعيين الخطأ الحالي
    },
  },
});

// تصدير الدوال التي تم إنشاؤها من الشريحة
export const {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  setLoading,
  setError,
} = userSlice.actions;

// تصدير المخفض الخاص بالشريحة ليتم استخدامه في المتجر
export default userSlice.reducer;
