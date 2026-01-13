"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { courtService } from "@/services/CourtService";
import type { Court } from "@/types/court";

type CourtContextType = {
  courts: Court[];
  loading: boolean;
  error: string | null;
  refreshCourts: () => Promise<void>;
  createCourt: (input: Omit<Court, "id" | "createdAt" | "updatedAt">) => Promise<void>;
};

const CourtContext = createContext<CourtContextType | undefined>(undefined);

export const CourtProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshCourts = async () => {
    setLoading(true);
    try {
      const data = await courtService.getAll();
      setCourts(Array.isArray(data) ? data : []);
      setError(null);
    } catch {
      setError("فشل في جلب الملاعب");
      setCourts([]);
    } finally {
      setLoading(false);
    }
  };

  const createCourt = async (input: Omit<Court, "id" | "createdAt" | "updatedAt">) => {
    setLoading(true);
    try {
      const newCourt = await courtService.create(input);
      setCourts((prev) => [...prev, newCourt]); // إضافة مباشرة
      setError(null);
    } catch {
      setError("فشل في إنشاء الملعب");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCourts();
  }, []);

  return (
    <CourtContext.Provider value={{ courts, loading, error, refreshCourts, createCourt }}>
      {children}
    </CourtContext.Provider>
  );
};

export const useCourts = () => {
  const ctx = useContext(CourtContext);
  if (!ctx) throw new Error("useCourts يجب أن يُستخدم داخل CourtProvider");
  return ctx;
};