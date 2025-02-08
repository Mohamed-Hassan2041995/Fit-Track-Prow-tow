/**
 * تعريفات أنواع المستخدمين والأدوار
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  TRAINER = 'TRAINER',
  TRAINEE = 'TRAINEE',
}

export type Gender = 'male' | 'female';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  gender: Gender;
  phoneNumber?: string;
  birthDate?: Date;
  address?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  bio?: string;
  specialization?: string; // للمدربين
  experience?: number; // للمدربين - سنوات الخبرة
  certifications?: string[]; // للمدربين
  goals?: string[]; // للمتدربين
  medicalConditions?: string[]; // للمتدربين
  preferredTrainingTime?: string; // للمتدربين
}