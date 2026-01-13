import { TestResult } from "@/types/testresult";

export const resultsService = {
  getAll: async (): Promise<TestResult[]> => {
    const res = await fetch("/api/getAllTestsResult");
    if (!res.ok) throw new Error("فشل في جلب كل النتائج");
    return res.json();
  },
  getAllForUser: async (userId: number): Promise<TestResult[]> => {
    const res = await fetch(`/api/getAllTestsResultForOneUser/${userId}`);
    if (!res.ok) throw new Error("فشل في جلب نتائج المستخدم");
    return res.json();
  },
  getByTestId: async (watId: number): Promise<TestResult | null> => {
    const res = await fetch(`/api/getOneResultByTestId/${watId}`);
    if (!res.ok) throw new Error("فشل في جلب نتيجة الاختبار");
    return res.json();
  },
  add: async (input: Omit<TestResult, "id" | "createdAt" | "updatedAt">): Promise<TestResult> => {
    const res = await fetch("/api/addTestResult", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("فشل في إضافة النتيجة");
    return res.json();
  },
  update: async (id: number, input: Partial<TestResult>): Promise<TestResult> => {
    const res = await fetch(`/api/updateTestsResult/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("فشل في تعديل النتيجة");
    return res.json();
  },
  delete: async (id: number): Promise<void> => {
    const res = await fetch(`/api/deleteTestsResult/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("فشل في حذف النتيجة");
  },
};