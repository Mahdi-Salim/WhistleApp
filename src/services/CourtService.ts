import type { Court } from "@/types/court";

const BASE = `${process.env.NEXT_PUBLIC_API_URL}/api/court`;
export const courtService = {
  async getAll(): Promise<Court[]> {
    const res = await fetch(`${BASE}/getAllCourt`, { cache: "no-store" });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`فشل في جلب الملاعب: ${errorText}`);
    }
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  },
  async create(court: Omit<Court, "id" | "createdAt" | "updatedAt">): Promise<Court> {
    const res = await fetch(`${BASE}/createCourt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(court),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`فشل في إنشاء الملعب: ${errorText}`);
    }
    const json = await res.json();
    return json.data;
  },
};