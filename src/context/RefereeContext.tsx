'use client';
import React, { createContext, useContext, useState, useEffect } from "react";
import { RefereeWithUser, CreateRefereePayload } from "@/types/referee";
import { refereeService } from "@/services/refereeService";

interface RefereeContextType {
  referees: RefereeWithUser[];
  loading: boolean;
  fetchReferees: () => Promise<RefereeWithUser[]>;
  addReferee: (data: CreateRefereePayload) => Promise<void>;
  updateReferee: (id: number, data: CreateRefereePayload) => Promise<void>;
  deleteReferee: (id: number) => Promise<void>;
}

const RefereeContext = createContext<RefereeContextType | undefined>(undefined);

export const RefereeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [referees, setReferees] = useState<RefereeWithUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReferees = async (): Promise<RefereeWithUser[]> => {
    setLoading(true);
    try {
      const data: RefereeWithUser[] = await refereeService.getAll();
      setReferees(data);
      return data; // ✅ حتى نستطيع استخدامه مباشرة في الصفحات
    } finally {
      setLoading(false);
    }
  };

  const addReferee = async (data: CreateRefereePayload) => {
    const newReferee: RefereeWithUser = await refereeService.create(data);
    setReferees((prev) => [...prev, newReferee]);
  };

  const updateReferee = async (id: number, data: CreateRefereePayload) => {
    const updated: RefereeWithUser =
      await refereeService.update(String(id), data);

    // ✅ تحديث العنصر مباشرة في الـ state
    setReferees((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
    );

    // ✅ إعادة جلب القائمة للتأكد من التزامن مع السيرفر
    await fetchReferees();
  };

  const deleteReferee = async (id: number) => {
    await refereeService.delete(id);
    setReferees((prev) => prev.filter((r) => r.id !== id));
  };

  useEffect(() => {
    fetchReferees();
  }, []);

  return (
    <RefereeContext.Provider
      value={{
        referees,
        loading,
        fetchReferees,
        addReferee,
        updateReferee,
        deleteReferee,
      }}
    >
      {children}
    </RefereeContext.Provider>
  );
};

export const useReferees = () => {
  const context = useContext(RefereeContext);
  if (!context)
    throw new Error("useReferees يجب أن يُستخدم داخل RefereeProvider");
  return context;
};