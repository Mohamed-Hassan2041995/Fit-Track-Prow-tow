// هذا الكود يقوم بتكوين متجر Redux باستخدام Redux Toolkit.
// المتجر يحتوي على عدة مخفضات (reducers) لإدارة حالة التطبيق، مثل حالة المصادقة، وخطط التمارين، وخطط التغذية، وحالة المستخدم.

import { configureStore } from "@reduxjs/toolkit"; // استيراد دالة configureStore من مكتبة Redux Toolkit
import authReducer from "./slices/authSlice"; // استيراد مخفض المصادقة
import workoutReducer from "./slices/workoutSlice"; // استيراد مخفض تمارين
import nutritionReducer from "./slices/nutritionSlice"; // استيراد مخفض تغذية
import userReducer from "./slices/userSlice"; // استيراد مخفض مستخدم

// تكوين المتجر باستخدام configureStore
export const store = configureStore({
  reducer: {
    auth: authReducer, // إضافة مخفض المصادقة إلى المتجر
    workout: workoutReducer, // إضافة مخفض التمارين إلى المتجر
    nutrition: nutritionReducer, // إضافة مخفض التغذية إلى المتجر
    user: userReducer, // إضافة مخفض المستخدم إلى المتجر
  },
});

// تعريف نوع الحالة الجذرية (RootState) باستخدام ReturnType
export type RootState = ReturnType<typeof store.getState>;

// تعريف نوع عملية التطبيق (AppDispatch) باستخدام نوع عملية المتجر
export type AppDispatch = typeof store.dispatch;
