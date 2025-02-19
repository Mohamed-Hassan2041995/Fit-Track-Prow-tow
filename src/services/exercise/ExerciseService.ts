// هذا الكود يقوم بإنشاء خدمة لإدارة التمارين الرياضية باستخدام واجهة برمجة التطبيقات (API) من RapidAPI.
// تتضمن الخدمة وظائف لجلب تمارين رياضية بناءً على الاسم أو على جزء معين من الجسم.

import axios from "axios"; // استيراد مكتبة Axios لإجراء الطلبات HTTP

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY; // استيراد مفتاح API من البيئة
const RAPIDAPI_HOST = "exercisedb.p.rapidapi.com"; // استضافة واجهة برمجة التطبيقات

export class ExerciseService {
  private static instance: ExerciseService; // متغير لتخزين نسخة واحدة من الخدمة
  private readonly baseURL = "https://exercisedb.p.rapidapi.com"; // عنوان واجهة برمجة التطبيقات

  // مُنشئ الخدمة الخاص (private) لمنع إنشاء نسخ متعددة
  private constructor() {}

  // دالة للحصول على النسخة الوحيدة من الخدمة (Singleton Pattern)
  static getInstance(): ExerciseService {
    if (!ExerciseService.instance) {
      ExerciseService.instance = new ExerciseService(); // إنشاء النسخة إذا لم تكن موجودة
    }
    return ExerciseService.instance; // إرجاع النسخة
  }

  // دالة لجلب تمرين بناءً على الاسم
  async getExerciseByName(name: string) {
    try {
      const response = await axios.get(
        `${this.baseURL}/exercises/name/${name}`,
        {
          headers: {
            "X-RapidAPI-Key": RAPIDAPI_KEY, // تضمين مفتاح API في رأس الطلب
            "X-RapidAPI-Host": RAPIDAPI_HOST, // تضمين مضيف API في رأس الطلب
          },
        }
      );
      return response.data[0]; // إرجاع التمرين الأول من النتائج
    } catch (error) {
      console.error("Error fetching exercise:", error); // طباعة الخطأ في حال حدوثه
      return null; // إرجاع null إذا حدث خطأ
    }
  }

  // دالة لجلب تمارين بناءً على جزء الجسم
  async getExercisesByBodyPart(bodyPart: string) {
    try {
      const response = await axios.get(
        `${this.baseURL}/exercises/bodyPart/${bodyPart}`,
        {
          headers: {
            "X-RapidAPI-Key": RAPIDAPI_KEY, // تضمين مفتاح API في رأس الطلب
            "X-RapidAPI-Host": RAPIDAPI_HOST, // تضمين مضيف API فذي رأس الطلب
          },
        }
      );
      return response.data; // إرجاع قائمة التمارين
    } catch (error) {
      console.error("Error fetching exercises:", error); // طباعة الخطأ في حال حدوثه
      return []; // إرجاع قائمة فارغة إذا حدث خطأ
    }
  }
}

// إنشاء كائن من خدمة التمارين الرياضية باستخدام نمط Singleton
export const exerciseService = ExerciseService.getInstance();
