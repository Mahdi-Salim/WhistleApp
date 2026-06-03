import api from "@/lib/axios";
import { Team } from "@/types/teams";

const API_URL = "/api/team";

export const teamService = {
  async getAll(): Promise<Team[]> {
    try {
      const res = await api.get(`${API_URL}/getAllTeams`);
      return Array.isArray(res.data?.data) ? res.data.data : [];
    } catch (error: any) {
      const status = error?.response?.status;
      if (status === 404) {
        // لا توجد فرق حتى الآن، نرجع مصفوفة فارغة بدون تسجيل خطأ
        return [];
      }
      console.error("Failed to fetch teams:", error.message || error);
      return [];
    }
  },

  async getByName(name: string): Promise<Team | null> {
    try {
      const res = await api.get(`${API_URL}/getOneTeam/${name}`);
      return res.data.data ?? null;
    } catch (error: any) {
      console.error(`Failed to fetch team ${name}:`, error.message);
      return null;
    }
  },

  async create(team: Omit<Team, "id">): Promise<Team> {
    try {
      console.log("Sending createTeam payload:", team);
      const res = await api.post(`${API_URL}/createTeam`, team);
      return res.data.data;
    } catch (error: any) {
      console.error("Failed to create team:", error.message);
      throw error; 
    }
  },

  async update(name: string, updatedTeam: Partial<Team>): Promise<Team> {
    try {
      const res = await api.patch(`${API_URL}/updateTeam/${name}`, updatedTeam);
      return res.data.data;
    } catch (error: any) {
      console.error(`Failed to update team ${name}:`, error.message);
      throw error;
    }
  },

  async delete(name: string): Promise<void> {
    try {
      await api.delete(`${API_URL}/deleteTeam/${name}`);
    } catch (error: any) {
      console.error(`Failed to delete team ${name}:`, error.message);
      throw error;
    }
  },
};
