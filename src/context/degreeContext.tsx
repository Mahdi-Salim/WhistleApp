"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { degreeService, Degree } from "@/services/degreeService";

interface DegreeContextType {
  degrees: Degree[];
  loading: boolean;
  error: string | null;
  fetchDegrees: () => Promise<void>;
  addDegree: (type: string) => Promise<void>;
}

const DegreeContext = createContext<DegreeContextType | undefined>(undefined);

export const DegreeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDegrees = async () => {
    setLoading(true);
    try {
      const data = await degreeService.getAll();
      setDegrees(data);
    } catch {
      setError("فشل في تحميل الدرجات");
    } finally {
      setLoading(false);
    }
  };

  const addDegree = async (type: string) => {
    setLoading(true);
    try {
      const newDegree = await degreeService.create(type);
      setDegrees((prev) => [...prev, newDegree]);
    } catch {
      setError("فشل في إضافة الدرجة");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDegrees();
  }, []);

  return (
    <DegreeContext.Provider value={{ degrees, loading, error, fetchDegrees, addDegree }}>
      {children}
    </DegreeContext.Provider>
  );
};

export const useDegreeContext = () => {
  const context = useContext(DegreeContext);
  if (!context) {
    throw new Error("useDegreeContext must be used within a DegreeProvider");
  }
  return context;
};