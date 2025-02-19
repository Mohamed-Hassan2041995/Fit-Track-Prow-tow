// هذا الكود ينشئ شريحة لإدارة حالة خطط التغذية باستخدام Redux Toolkit.
// الشريحة تحتوي على قائمة خطط التغذية، حالة التحميل، وأي أخطاء قد تحدث أثناء العمليات.

import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // استيراد دوال من مكتبة Redux Toolkit
import { NutritionPlan } from "../../types/nutrition"; // استيراد نوع خطة التغذية

// تعريف واجهة لحالة التغذية
interface NutritionState {
  plans: NutritionPlan[]; // قائمة خطط التغذية
  loading: boolean; // حالة التحميل (true إذا كان هناك تحميل، false إذا لم يكن)
  error: string | null; // أي خطأ قد يحدث، أو null إذا لم يكن هناك خطأ
}

// الحالة الابتدائية لشريحة التغذية
const initialState: NutritionState = {
  plans: [], // بدءاً بقائمة فارغة من الخطط
  loading: false, // بدءاً بدون تحميل
  error: null, // بدءاً بدون أي أخطاء
};

// إنشاء شريحة للتغذية
const nutritionSlice = createSlice({
  name: "nutrition", // اسم الشريحة
  initialState, // الحالة الابتدائية
  reducers: {
    // دالة لتعيين خطط التغذية
    setNutritionPlans: (state, action: PayloadAction<NutritionPlan[]>) => {
      state.plans = action.payload; // تعيين الخطط إلى الحالة الحالية
    },
    // دالة لإضافة خطة تغذية جديدة
    addNutritionPlan: (state, action: PayloadAction<NutritionPlan>) => {
      state.plans.push(action.payload); // إضافة الخطة الجديدة إلى القائمة
    },
    // دالة لتحديث خطة تغذية موجودة
    updateNutritionPlan: (state, action: PayloadAction<NutritionPlan>) => {
      const index = state.plans.findIndex(
        (plan) => plan.id === action.payload.id
      ); // البحث عن الفهرس الخاص بالخطة
      if (index !== -1) {
        // إذا وُجدت الخطة
        state.plans[index] = action.payload; // تحديث الخطة
      }
    },
    // دالة لحذف خطة تغذية
    deleteNutritionPlan: (state, action: PayloadAction<string>) => {
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
  setNutritionPlans,
  addNutritionPlan,
  updateNutritionPlan,
  deleteNutritionPlan,
  setLoading,
  setError,
} = nutritionSlice.actions;

// تصدير المخفض الخاص بالشريحة ليتم استخدامه في المتجر
export default nutritionSlice.reducer;
