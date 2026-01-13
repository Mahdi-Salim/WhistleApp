// src/types/user.ts
export interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string; // الباك يرجع نص YYYY-MM-DD
  address: string;
  photo?: string;
  RoleId: number; // المفتاح الخارجي للجدول Roles
  role?: "REFEREE" | "ASSESSOR" | "ADMIN"; // قيمة مقروءة للفرونت
  createdAt?: string;
  updatedAt?: string;
}