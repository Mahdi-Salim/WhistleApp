// src/types/testresult.ts

export interface TestResult {
  id: number;          // المفتاح الأساسي
  status: boolean;     // حالة النتيجة (مثلاً نجاح/رسوب أو مكتمل/غير مكتمل)
  WATId: number;       // معرف الاختبار أو التمرين المرتبط (FK إلى WorkoutAndTest)
  createdAt: string;   // تاريخ الإنشاء
  updatedAt: string;   
}