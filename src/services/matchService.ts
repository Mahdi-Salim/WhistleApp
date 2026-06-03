import api from "@/lib/axios";

// Define the Match interface based on backend and frontend requirements
export interface Match {
  id: number;
  Date: string; // Backend returns Date
  time: string; // Backend returns time
  CourtId: number;
  DegreeId: number;
  MatchType: boolean; // false = Friendly, true = Official
  createdAt?: string;
  updatedAt?: string;
  // Optional fields for UI (not currently returned by backend but good to have in type)
  Court?: { id: number; name: string; location: string };
  Degree?: { id: number; TypeOfDegree: string };
}

export interface CreateMatchPayload {
  Date: string;
  Time: string;
  CourtId: number;
  DegreeId: number;
  MatchType: boolean;
  // These fields are sent but currently ignored by backend controller
  homeTeamId?: number;
  awayTeamId?: number;
  refereeId?: number;
  assistantReferee1Id?: number;
  assistantReferee2Id?: number;
  fourthOfficialId?: number;
  varRefereeId?: number;
  assessorId?: number;
}

const API_URL = "/api/match";

export const matchService = {
  async getAll(): Promise<Match[]> {
    try {
      const res = await api.get(`${API_URL}/getAllMatches`);
      // Backend returns array directly or inside data? 
      // Controller: return res.status(200).json(matches); -> Array
      return res.data || [];
    } catch (error: any) {
      console.error("Failed to fetch matches:", error.message);
      return [];
    }
  },

  async getOne(id: number): Promise<Match | null> {
    try {
      const res = await api.get(`${API_URL}/getOneMatch/${id}`);
      return res.data || null;
    } catch (error: any) {
      console.error(`Failed to fetch match ${id}:`, error.message);
      return null;
    }
  },

  async create(payload: CreateMatchPayload): Promise<Match> {
    try {
      const res = await api.post(`${API_URL}/createMatch`, payload);
      return res.data;
    } catch (error: any) {
      console.error("Failed to create match:", error.message);
      throw error;
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await api.delete(`${API_URL}/deleteMatch/${id}`);
    } catch (error: any) {
      console.error(`Failed to delete match ${id}:`, error.message);
      throw error;
    }
  },
};