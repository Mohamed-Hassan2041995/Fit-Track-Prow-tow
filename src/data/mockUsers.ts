// استيراد أنواع المستخدمين وأدوارهم
import { User, UserRole } from "../types/user";

// تعريف واجهة لمستخدم وهمي
interface MockUser {
  email: string; // البريد الإلكتروني للمستخدم
  password: string; // كلمة مرور المستخدم
  user: User; // كائن المستخدم من نوع User
}

// مصفوفة تحتوي على مستخدمين وهميين
export const mockUsers: MockUser[] = [
  {
    email: "admin@example.com", // البريد الإلكتروني للمستخدم الإداري
    password: "password", // كلمة مرور المستخدم الإداري
    user: {
      id: "1", // معرف المستخدم
      email: "admin@example.com", // البريد الإلكتروني للمستخدم
      firstName: "Admin", // الاسم الأول
      lastName: "User", // الاسم الأخير
      role: UserRole.ADMIN, // دور المستخدم (إداري)
      createdAt: new Date(), // تاريخ إنشاء المستخدم
      updatedAt: new Date(), // تاريخ تحديث المستخدم
      gender: "male", // جنس المستخدم
    },
  },
  {
    email: "trainer@example.com", // البريد الإلكتروني للمستخدم المدرب
    password: "password", // كلمة مرور المستخدم المدرب
    user: {
      id: "2", // معرف المستخدم
      email: "trainer@example.com", // البريد الإلكتروني للمستخدم
      firstName: "John", // الاسم الأول
      lastName: "Trainer", // الاسم الأخير
      role: UserRole.TRAINER, // دور المستخدم (مدرب)
      createdAt: new Date(), // تاريخ إنشاء المستخدم
      updatedAt: new Date(), // تاريخ تحديث المستخدم
      gender: "male", // جنس المستخدم
    },
  },
  {
    email: "trainee@example.com", // البريد الإلكتروني للمستخدم المتدرب
    password: "password", // كلمة مرور المستخدم المتدرب
    user: {
      id: "3", // معرف المستخدم
      email: "trainee@example.com", // البريد الإلكتروني للمستخدم
      firstName: "Sarah", // الاسم الأول
      lastName: "Trainee", // الاسم الأخير
      role: UserRole.TRAINEE, // دور المستخدم (متدرب)
      createdAt: new Date(), // تاريخ إنشاء المستخدم
      updatedAt: new Date(), // تاريخ تحديث المستخدم
      gender: "female", // جنس المستخدم
    },
  },
];
