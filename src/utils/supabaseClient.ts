// /**
//  * هذا الكود يقوم بإنشاء عميل لـ Supabase، وهو خدمة توفر قاعدة بيانات واستضافة للتطبيقات.
//  * 
//  * 1. يتم استيراد الدالة `createClient` من مكتبة Supabase.
//  * 2. يتم استيراد نوع البيانات `Database` من ملف الأنواع المحددة مسبقًا.
//  * 3. يتم الحصول على عنوان URL ومفتاح الوصول لـ Supabase من متغيرات البيئة.
//  * 4. يتم التحقق من وجود هذه المتغيرات. إذا كانت مفقودة، يتم رفع خطأ.
//  * 5. يتم إنشاء عميل Supabase مع إعدادات للمصادقة مثل الحفاظ على الجلسة وتجديد الرمز تلقائيًا.
//  */

// import { createClient } from '@supabase/supabase-js';
// import { Database } from '../types/supabase';

// // الحصول على عنوان URL ومفتاح الوصول من متغيرات البيئة
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// // التحقق من وجود متغيرات البيئة
// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables'); // رفع خطأ في حالة عدم وجود المتغيرات
// }

// // إنشاء عميل Supabase مع إعدادات المصادقة
// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     persistSession: true, // الحفاظ على الجلسة
//     autoRefreshToken: true, // تجديد الرمز تلقائيًا
//   },
// });
