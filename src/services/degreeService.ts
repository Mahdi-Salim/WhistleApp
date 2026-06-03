import api from "@/lib/axios";

const API_URL = "/api/degree";

export interface Degree {
  id: number;
  TypeOfDegree: string;
}
export const degreeService = {
  async getAll(): Promise<Degree[]> {
    const res = await api.get(`${API_URL}/getAllDegrees`);
    return res.data.data ?? [];
  },
  async create(type: string): Promise<Degree> {
    const res = await api.post(`${API_URL}/createDegree`, { TypeOfDegree: type });
    return res.data.data;
  },
};
