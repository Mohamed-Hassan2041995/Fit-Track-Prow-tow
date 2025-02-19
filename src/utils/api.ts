/**
 * هذا الكود يعرّف كائن `api` باستخدام مكتبة `axios` لإجراء طلبات HTTP إلى خادم الـ API.
 *
 * 1. يتم إنشاء `axios` instance باستخدام `axios.create()`، وتحديد:
 *    - `baseURL`: عنوان الـ API الأساسي، ويتم أخذه من متغير البيئة `VITE_API_URL` أو استخدام `http://localhost:3000/api` كقيمة افتراضية.
 *
 * 2. إضافة `interceptor` للطلبات (`request interceptor`) بحيث:
 *    - يتم جلب رمز المصادقة (`token`) من `localStorage`.
 *    - إذا وُجد `token`، يتم إضافته إلى ترويسة (`header`) الطلب ضمن `Authorization` باستخدام `Bearer Token`.
 *    - بعد ذلك، يتم إرجاع الإعدادات المعدلة (`config`) لإكمال الطلب.
 *
 * 3. يتم تصدير الكائن `api` ليكون متاحًا لاستخدامه في أجزاء أخرى من التطبيق لإجراء طلبات API بسهولة مع تضمين التوكن تلقائيًا عند الحاجة.
 */

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api", // تحديد عنوان الـ API الأساسي
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // استرجاع رمز المصادقة من التخزين المحلي
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // إضافة التوكن إلى ترويسة الطلب
  }
  return config; // إرجاع الإعدادات المعدلة للمتابعة في إرسال الطلب
});

export default api; // تصدير كائن `api` لاستخدامه في أجزاء أخرى من التطبيق
