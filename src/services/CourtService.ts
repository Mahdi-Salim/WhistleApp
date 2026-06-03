import type { Court } from "@/types/court";
import api from "@/lib/axios";

const BASE = "/api/court";

export const courtService = {
  async getAll(): Promise<Court[]> {
    try {
      const res = await api.get(`${BASE}/getAllCourt`);
      // Adapt to backend response structure
      return Array.isArray(res.data.data) ? res.data.data : [];
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message;
      throw new Error(`فشل في جلب الملاعب: ${msg}`);
    }
  },

  async create(court: Omit<Court, "id" | "createdAt" | "updatedAt">): Promise<Court> {
    try {
      const res = await api.post(`${BASE}/createCourt`, court);
      return res.data.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message;
      throw new Error(`فشل في إنشاء الملعب: ${msg}`);
    }
  },
};