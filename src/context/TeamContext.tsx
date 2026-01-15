"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Team } from "@/types/teams";
import { teamService } from "@/services/teamservice";

interface TeamContextType {
  teams: Team[];
  loading: boolean;
  getAllTeams: () => Promise<void>;
  deleteTeam: (name: string) => Promise<void>;
  createTeam: (team: Omit<Team, "id">) => Promise<void>;
  updateTeam: (name: string, team: Partial<Team>) => Promise<void>;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllTeams = async () => {
    setLoading(true);
    try {
      const data = await teamService.getAll();
      setTeams(data);
    } finally {
      setLoading(false);
    }
  };

  const deleteTeam = async (name: string) => {
    await teamService.delete(name);
    setTeams(prev => prev.filter(team => team.name !== name));
  };

  const createTeam = async (team: Omit<Team, "id">) => {
    const newTeam = await teamService.create(team);
    setTeams(prev => [...prev, newTeam]);
  };

  const updateTeam = async (name: string, updatedTeam: Partial<Team>) => {
    const team = await teamService.update(name, updatedTeam);
    setTeams(prev => prev.map(t => (t.name === name ? team : t)));
  };

  useEffect(() => {
    // استدعاء غير مباشر لتفادي التحذير
    const fetchTeams = async () => {
      await getAllTeams();
    };
    fetchTeams();
  }, []);

  return (
    <TeamContext.Provider value={{ teams, loading, getAllTeams, deleteTeam, createTeam, updateTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeams = () => {
  const context = useContext(TeamContext);
  if (!context) throw new Error("useTeams must be used within TeamProvider");
  return context;
};