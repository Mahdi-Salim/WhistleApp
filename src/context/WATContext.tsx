"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { watService } from "@/services/WATService";
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
  createEvent: (input: Omit<WAT, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateEvent: (id: number, input: Partial<WAT>) => Promise<void>;
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
    try {
      const data = await watService.getAll();
      console.log("Event.Date:", events.map(e => e.Date));
      setEvents(Array.isArray(data) ? data : []); 
      setError(null);
    } catch {
      setError("فشل في جلب الأحداث");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshTests = async () => {
    setLoading(true);
    try {
      const data = await watService.getAllTests();
      setTests(Array.isArray(data) ? data : []);
      setError(null);
    } catch {
      setError("فشل في جلب الاختبارات");
      setTests([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshWorkouts = async () => {
    setLoading(true);
    try {
      const data = await watService.getAllWorkouts();
      setWorkouts(Array.isArray(data) ? data : []);
      setError(null);
    } catch {
      setError("فشل في جلب التمارين");
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (input: Omit<WAT, "id" | "createdAt" | "updatedAt">) => {
    setLoading(true);
    try {
      await watService.create(input);
      await refreshAll();
    } catch {
      setError("فشل في إنشاء الحدث");
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id: number, input: Partial<WAT>) => {
    setLoading(true);
    try {
      await watService.update(id, input);
      await refreshAll();
    } catch {
      setError("فشل في تعديل الحدث");
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: number) => {
    setLoading(true);
    try {
      await watService.delete(id);
      await refreshAll();
    } catch {
      setError("فشل في حذف الحدث");
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