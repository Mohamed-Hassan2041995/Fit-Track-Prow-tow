/**
 * هذا الكود يعرّف أنواع المستخدمين والأدوار المتاحة في النظام، بالإضافة إلى بيانات المستخدمين وملفاتهم الشخصية.
 *
 * 1. `UserRole` هو `enum` يحتوي على ثلاث أدوار:
 *    - `ADMIN`: يمثل المسؤول عن النظام.
 *    - `TRAINER`: يمثل المدرب الذي يقدم خطط التدريب.
 *    - `TRAINEE`: يمثل المتدرب الذي يستفيد من خطط التدريب.
 *
 * 2. `Gender` هو نوع (`type`) يُحدد جنس المستخدم إما ذكر (`male`) أو أنثى (`female`).
 *
 * 3. `User` هو `interface` يمثل البيانات الأساسية لكل مستخدم، وتشمل:
 *    - `id`: معرف المستخدم الفريد.
 *    - `email`: البريد الإلكتروني للمستخدم.
 *    - `firstName` و `lastName`: الاسم الأول والأخير.
 *    - `role`: الدور الذي ينتمي إليه المستخدم.
 *    - `gender`: جنس المستخدم.
 *    - `phoneNumber` (اختياري): رقم الهاتف.
 *    - `birthDate` (اختياري): تاريخ الميلاد.
 *    - `address` (اختياري): عنوان المستخدم.
 *    - `profileImage` (اختياري): صورة الملف الشخصي.
 *    - `createdAt`: تاريخ إنشاء الحساب.
 *    - `updatedAt`: تاريخ آخر تحديث للبيانات.
 *
 * 4. `UserProfile` هو `interface` يمتد من `User` ويضيف بيانات إضافية تعتمد على دور المستخدم:
 *    - `bio` (اختياري): نبذة تعريفية عن المستخدم.
 *    - `specialization` (اختياري): تخصص المدرب.
 *    - `experience` (اختياري): عدد سنوات الخبرة للمدرب.
 *    - `certifications` (اختياري): الشهادات التي حصل عليها المدرب.
 *    - `goals` (اختياري): أهداف التدريب الخاصة بالمتدرب.
 *    - `medicalConditions` (اختياري): الحالات الطبية التي يجب مراعاتها للمتدرب.
 *    - `preferredTrainingTime` (اختياري): الوقت المفضل للمتدرب للتدريب.
 */

export enum UserRole {
  ADMIN = "ADMIN", // دور المسؤول في النظام
  TRAINER = "TRAINER", // دور المدرب المسؤول عن تدريب المتدربين
  TRAINEE = "TRAINEE", // دور المتدرب الذي يتلقى التدريب
}

export type Gender = "male" | "female"; // تحديد نوع الجنس (ذكر أو أنثى)

export interface User {
  specialization: string;
  experience: ReactNode;
  certifications: any;
  goals: any;
  medicalConditions: any;
  preferredTrainingTime: string;
  id: string; // معرف المستخدم الفريد
  email: string; // البريد الإلكتروني للمستخدم
  firstName: string; // الاسم الأول
  lastName: string; // الاسم الأخير
  role: UserRole; // دور المستخدم في النظام
  gender: Gender; // جنس المستخدم
  phoneNumber?: string; // رقم الهاتف (اختياري)
  birthDate?: Date; // تاريخ الميلاد (اختياري)
  address?: string; // عنوان المستخدم (اختياري)
  profileImage?: string; // رابط لصورة الملف الشخصي (اختياري)
  createdAt: Date; // تاريخ إنشاء الحساب
  updatedAt: Date; // تاريخ آخر تحديث للبيانات
}

export interface UserProfile extends User {
  bio?: string; // نبذة تعريفية عن المستخدم (اختياري)
  specialization?: string; // تخصص المدرب (اختياري)
  experience?: number; // عدد سنوات الخبرة للمدرب (اختياري)
  certifications?: string[]; // قائمة بالشهادات التي حصل عليها المدرب (اختياري)
  goals?: string[]; // أهداف التدريب الخاصة بالمتدرب (اختياري)
  medicalConditions?: string[]; // الحالات الطبية للمتدرب التي يجب مراعاتها (اختياري)
  preferredTrainingTime?: string; // الوقت المفضل للمتدرب للتدريب (اختياري)
}
