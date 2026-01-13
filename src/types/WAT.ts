// types/WAT.ts

export type WATId = number;

export interface WAT {
  id: WATId;

  Date: string;        // YYYY-MM-DD (DATEONLY)
  Time: string;        // HH:mm:ss (TIME)
  TypeActivity: boolean; // true = اختبار, false = تمرين

  CourtId: number;     // المفتاح الخارجي للملعب
  UserId: number;      // المفتاح الخارجي للمستخدم

  createdAt: string;
  updatedAt: string;

  // علاقات اختيارية إذا الباك‑إند يعيدها مع include
  Court?: {
    id: number;
    courtName: string;
    address: string;
  };

  User?: {
    id: number;
    username: string;
    // أضف أي حقول أخرى يعيدها الباك‑إند
  };

  TestResult?: {
    id: number;
    status: boolean;
  };
}