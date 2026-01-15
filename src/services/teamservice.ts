import axios from "axios";
import { Team } from "@/types/teams";

// استخدم 127.0.0.1 بدل localhost أحياناً يحل مشاكل الشبكة الداخلية
const API_URL = "http://127.0.0.1:3000/api/team";

export const teamService = {
  async getAll(): Promise<Team[]> {
    try {
      const res = await axios.get(`${API_URL}/getAllTeams`);
      // نتأكد دائماً من أن res.data.data موجودة
      return Array.isArray(res.data?.data) ? res.data.data : [];
    } catch (error: any) {
      console.error("Failed to fetch teams:", error.message);
      return []; // ترجع مصفوفة فارغة بدل توقف الفرونت
    }
  },

  async getByName(name: string): Promise<Team | null> {
    try {
      const res = await axios.get(`${API_URL}/getOneTeam/${name}`);
      return res.data.data ?? null;
    } catch (error: any) {
      console.error(`Failed to fetch team ${name}:`, error.message);
      return null;
    }
  },

  async create(team: Omit<Team, "id">): Promise<Team> {
    try {
      const res = await axios.post(`${API_URL}/createTeam`, team);
      return res.data.data;
    } catch (error: any) {
      console.error("Failed to create team:", error.message);
      throw error; // لإظهار الرسالة في الفورم
    }
  },

  async update(name: string, updatedTeam: Partial<Team>): Promise<Team> {
    try {
      const res = await axios.patch(`${API_URL}/updateTeam/${name}`, updatedTeam);
      return res.data.data;
    } catch (error: any) {
      console.error(`Failed to update team ${name}:`, error.message);
      throw error;
    }
  },

  async delete(name: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/deleteTeam/${name}`);
    } catch (error: any) {
      console.error(`Failed to delete team ${name}:`, error.message);
      throw error;
    }
  },
};
