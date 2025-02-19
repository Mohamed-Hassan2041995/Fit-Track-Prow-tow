// هذا الكود ينشئ شريحة لإدارة حالة خطط التمارين باستخدام Redux Toolkit.
// الشريحة تحتوي على قائمة بخطط التمارين، حالة التحميل، وأي أخطاء قد تحدث أثناء العمليات.

import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // استيراد الدوال اللازمة من مكتبة Redux Toolkit
import { WorkoutPlan } from "../../types/workout"; // استيراد نوع خطة التمرين

// تعريف واجهة لحالة التمارين
interface WorkoutState {
  plans: WorkoutPlan[]; // قائمة بخطط التمارين
  loading: boolean; // حالة التحميل (true إذا كان هناك تحميل، false إذا لم يكن)
  error: string | null; // أي خطأ قد يحدث، أو null إذا لم يكن هناك خطأ
}

// الحالة الابتدائية لشريحة التمارين
const initialState: WorkoutState = {
  plans: [], // بدءاً بقائمة فارغة من خطط التمارين
  loading: false, // بدءاً بدون تحميل
  error: null, // بدءاً بدون أي أخطاء
};

// إنشاء شريحة للتمارين
const workoutSlice = createSlice({
  name: "workout", // اسم الشريحة
  initialState, // الحالة الابتدائية
  reducers: {
    // دالة لتعيين قائمة خطط التمارين
    setWorkoutPlans: (state, action: PayloadAction<WorkoutPlan[]>) => {
      state.plans = action.payload; // تعيين قائمة خطط التمارين في الحالة
    },
    // دالة لإضافة خطة تمرين جديدة
    addWorkoutPlan: (state, action: PayloadAction<WorkoutPlan>) => {
      state.plans.push(action.payload); // إضافة خطة التمرين الجديدة إلى القائمة
    },
    // دالة لتحديث خطة تمرين موجودة
    updateWorkoutPlan: (state, action: PayloadAction<WorkoutPlan>) => {
      const index = state.plans.findIndex(
        (plan) => plan.id === action.payload.id
      ); // البحث عن الفهرس الخاص بالخطة
      if (index !== -1) {
        // إذا وُجدت الخطة
        state.plans[index] = action.payload; // تحديث خطة التمرين
      }
    },
    // دالة لحذف خطة تمرين
    deleteWorkoutPlan: (state, action: PayloadAction<string>) => {
      state.plans = state.plans.filter((plan) => plan.id !== action.payload); // تصفية الخطط وحذف الخطة التي تطابق المعرف
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
  setWorkoutPlans,
  addWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
  setLoading,
  setError,
} = workoutSlice.actions;

// تصدير المخفض الخاص بالشريحة ليتم استخدامه في المتجر
export default workoutSlice.reducer;
