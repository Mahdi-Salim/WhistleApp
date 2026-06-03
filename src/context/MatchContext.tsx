"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { matchService, Match, CreateMatchPayload } from "@/services/matchService";

interface MatchContextType {
  matches: Match[];
  loading: boolean;
  error: string | null;
  fetchMatches: () => Promise<void>;
  createMatch: (payload: CreateMatchPayload) => Promise<void>;
  deleteMatch: (id: number) => Promise<void>;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const MatchProvider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await matchService.getAll();
      setMatches(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch matches");
    } finally {
      setLoading(false);
    }
  };

  const createMatch = async (payload: CreateMatchPayload) => {
    setLoading(true);
    setError(null);
    try {
      await matchService.create(payload);
      await fetchMatches(); // Refresh list after creation
    } catch (err: any) {
      setError(err.message || "Failed to create match");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteMatch = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await matchService.delete(id);
      setMatches((prev) => prev.filter((m) => m.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete match");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <MatchContext.Provider
      value={{
        matches,
        loading,
        error,
        fetchMatches,
        createMatch,
        deleteMatch,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (context === undefined) {
    throw new Error("useMatch must be used within a MatchProvider");
  }
  return context;
};