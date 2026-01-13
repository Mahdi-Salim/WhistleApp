import { ApiEnvelope } from "@/types/referee";
import type { WAT } from "@/types/WAT";
const BASE = "http://localhost:3000/api/workoutAndTest";

export const watService = {
  async getAll(): Promise<WAT[]> {
    const res = await fetch(`${BASE}/getAllWAT`, { cache: "no-store" });
    const json: ApiEnvelope<WAT[]> = await res.json();
console.log("watService.getAll response:", json);
return json.data;
    if (!res.ok) throw new Error("فشل في جلب الأحداث");
    return res.json();
  },
  async getAllTests(): Promise<WAT[]> {
    const res = await fetch(`${BASE}/getAllTests`, { cache: "no-store" });
    if (!res.ok) throw new Error("فشل في جلب الاختبارات");
    return res.json();
  },
  async getAllWorkouts(): Promise<WAT[]> {
    const res = await fetch(`${BASE}/getAllWorkouts`, { cache: "no-store" });
    if (!res.ok) throw new Error("فشل في جلب التمارين");
    return res.json();
  },
  async getById(id: number): Promise<WAT> {
    const res = await fetch(`${BASE}/getOneWAT/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("فشل في جلب الحدث");
    return res.json();
  },
  async create(input: Omit<WAT, "id" | "createdAt" | "updatedAt">): Promise<WAT> {
    const res = await fetch(`${BASE}/createWAT`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("فشل في إنشاء الحدث");
    return res.json();
  },
  async update(id: number, input: Partial<WAT>): Promise<WAT> {
    const res = await fetch(`${BASE}/updateWAT/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("فشل في تعديل الحدث");
    return res.json();
  },
  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE}/deleteWAT/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("فشل في حذف الحدث");
  },
};