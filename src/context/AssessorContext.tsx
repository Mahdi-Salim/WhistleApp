"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/user";
import { assessorService } from "@/services/assessorService";

interface AssessorContextType {
  assessors: User[];
  loading: boolean;
  fetchAssessors: () => Promise<void>;
  addAssessor: (data: Partial<User>) => Promise<void>;
  updateAssessor: (id: number, data: Partial<User>) => Promise<void>;
  deleteAssessor: (id: number) => Promise<void>;
}
const AssessorContext = createContext<AssessorContextType | undefined>(undefined);
export const AssessorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assessors, setAssessors] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchAssessors = async () => {
    setLoading(true);
    try {
      const data: User[] = await assessorService.getAll();
      setAssessors(data);
    } finally {
      setLoading(false);
    }
  };
  const addAssessor = async (data: Partial<User>) => {
    const newAssessor: User = await assessorService.create(data);
    setAssessors((prev) => [...prev, newAssessor]);
  };

  const updateAssessor = async (id: number, data: Partial<User>) => {
    await assessorService.update(id, data); // ✅ id يبقى number
    await fetchAssessors();
  };

  const deleteAssessor = async (id: number) => {
    await assessorService.delete(id); // ✅ id يبقى number
    setAssessors((prev) => prev.filter((a) => a.id !== id));
  };

  useEffect(() => {
    fetchAssessors();
  }, []);

  return (
    <AssessorContext.Provider
      value={{ assessors, loading, fetchAssessors, addAssessor, updateAssessor, deleteAssessor }}
    >
      {children}
    </AssessorContext.Provider>
  );
};

export const useAssessors = () => {
  const context = useContext(AssessorContext);
  if (!context) throw new Error("useAssessors must be used within AssessorProvider");
  return context;
};