import axios from "axios";

const API_URL = "http://localhost:3000/api/degree";

export interface Degree {
  id: number;
  TypeOfDegree: string;
}
export const degreeService = {
  async getAll(): Promise<Degree[]> {
    const res = await axios.get(`${API_URL}/getAllDegrees`);
    return res.data.data ?? [];
  },
  async create(type: string): Promise<Degree> {
    const res = await axios.post(`${API_URL}/createDegree`, { TypeOfDegree: type });
    return res.data.data;
  },
};
