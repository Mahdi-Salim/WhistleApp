import api from "@/lib/axios";
import type { ApiEnvelope, Role } from "@/types/role";

const API_URL = "/api/role";

export const roleService = {
  async getAll(): Promise<Role[]> {
    const res = await api.get<ApiEnvelope<Role[]>>(`${API_URL}/getAllRole`);
    return Array.isArray(res.data?.data) ? res.data.data : [];
  },

  async getById(id: number): Promise<Role> {
    const res = await api.get<ApiEnvelope<Role>>(`${API_URL}/getOneRole/${id}`);
    return res.data.data;
  },

  async create(subject: string): Promise<Role> {
    const res = await api.post<ApiEnvelope<Role>>(`${API_URL}/createRole`, {
      subject: subject.trim(),
    });
    return res.data.data;
  },

  async update(id: number, subject: string): Promise<Role> {
    const res = await api.patch<ApiEnvelope<Role>>(`${API_URL}/updateRole/${id}`, {
      subject: subject.trim(),
    });
    return res.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`${API_URL}/deleteRole/${id}`);
  },
};