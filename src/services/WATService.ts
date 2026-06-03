import api from "@/lib/axios";
import axios from "axios";
import type { WAT } from "@/types/WAT";

type ApiEnvelope<T> = {
  message: string;
  data?: T;
};
export type CreateWATPayload = {
  TypeActivity: boolean;
  Date: string;
  Time: string;
  CourtId: number;
  UserId: number;
};
const BASE = "/api/workoutAndTest";
const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);
export const watService = {
  async getAll(): Promise<WAT[]> {
    try {
      const res = await api.get<ApiEnvelope<WAT[]>>(`${BASE}/getAllWAT`);
      return asArray<WAT>(res.data?.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 404) return [];
      throw err;
    }
  },
  async getAllTests(): Promise<WAT[]> {
    try {
      const res = await api.get<ApiEnvelope<WAT[]>>(`${BASE}/getAllTests`);
      return asArray<WAT>(res.data?.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 404) return [];
      throw err;
    }
  },
  async getAllWorkouts(): Promise<WAT[]> {
    try {
      const res = await api.get<ApiEnvelope<WAT[]>>(`${BASE}/getAllWorkouts`);
      return asArray<WAT>(res.data?.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 404) return [];
      throw err;
    }
  },
  async getById(id: number): Promise<WAT> {
    const res = await api.get<ApiEnvelope<WAT>>(`${BASE}/getOneWAT/${id}`);
    if (!res.data?.data) throw new Error("فشل في جلب الحدث");
    return res.data.data;
  },
  async create(payload: CreateWATPayload): Promise<WAT> {
    const res = await api.post<ApiEnvelope<WAT>>(`${BASE}/createWAT`, payload);
    if (!res.data?.data) throw new Error("فشل في إنشاء الحدث");
    return res.data.data;
  },

  async update(id: number, payload: Partial<CreateWATPayload>): Promise<WAT> {
    const res = await api.patch<ApiEnvelope<WAT>>(`${BASE}/updateWAT/${id}`, payload);
    if (!res.data?.data) throw new Error("فشل في تعديل الحدث");
    return res.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`${BASE}/deleteWAT/${id}`);
  },
};