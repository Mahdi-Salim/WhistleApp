"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { watService, CreateWATPayload } from "@/services/WATService";
import type { WAT } from "@/types/WAT";

type WATContextType = {
  events: WAT[];
  tests: WAT[];
  workouts: WAT[];
  loading: boolean;
  error: string | null;
  refreshAll: () => Promise<void>;
  refreshTests: () => Promise<void>;
  refreshWorkouts: () => Promise<void>;
  createEvent: (payload: CreateWATPayload) => Promise<void>;
  updateEvent: (id: number, payload: Partial<CreateWATPayload>) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
};
const WATContext = createContext<WATContextType | undefined>(undefined);

export const WATProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<WAT[]>([]);
  const [tests, setTests] = useState<WAT[]>([]);
  const [workouts, setWorkouts] = useState<WAT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await watService.getAll();
      setEvents(data);
    } catch (err: any) {
      setError(err?.message || "فشل في جلب الأحداث");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await watService.getAllTests();
      setTests(data);
    } catch (err: any) {
      setError(err?.message || "فشل في جلب الاختبارات");
      setTests([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshWorkouts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await watService.getAllWorkouts();
      setWorkouts(data);
    } catch (err: any) {
      setError(err?.message || "فشل في جلب التمارين");
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (payload: CreateWATPayload) => {
    setLoading(true);
    setError(null);
    try {
      await watService.create(payload);
      await refreshAll();
    } catch (err: any) {
      setError(err?.message || "فشل في إنشاء الحدث");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id: number, payload: Partial<CreateWATPayload>) => {
    setLoading(true);
    setError(null);
    try {
      await watService.update(id, payload);
      await refreshAll();
    } catch (err: any) {
      setError(err?.message || "فشل في تعديل الحدث");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await watService.delete(id);
      await refreshAll();
    } catch (err: any) {
      setError(err?.message || "فشل في حذف الحدث");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  return (
    <WATContext.Provider
      value={{
        events,
        tests,
        workouts,
        loading,
        error,
        refreshAll,
        refreshTests,
        refreshWorkouts,
        createEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </WATContext.Provider>
  );
};

export const useWAT = () => {
  const ctx = useContext(WATContext);
  if (!ctx) throw new Error("useWAT يجب أن يُستخدم داخل WATProvider");
  return ctx;
};