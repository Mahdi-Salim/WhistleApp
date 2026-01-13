"use client";
import React, { createContext, useContext, useState } from "react";
import { resultsService } from "@/services/testresultService";
import type { TestResult } from "@/types/testresult";

type ResultsContextType = {
  results: TestResult[];
  loading: boolean;
  error: string | null;
  refreshAllResults: () => Promise<void>;
  getResultsForUser: (userId: number) => Promise<TestResult[]>;
  getResultByTestId: (watId: number) => Promise<TestResult | null>;
  addResult: (input: Omit<TestResult, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateResult: (id: number, input: Partial<TestResult>) => Promise<void>;
  deleteResult: (id: number) => Promise<void>;
};

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export const ResultsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshAllResults = async () => {
    setLoading(true);
    try {
      const data = await resultsService.getAll();
      setResults(Array.isArray(data) ? data : []);
      setError(null);
    } catch {
      setError("فشل في جلب النتائج");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getResultsForUser = async (userId: number) => {
    try {
      return await resultsService.getAllForUser(userId);
    } catch {
      setError("فشل في جلب نتائج المستخدم");
      return [];
    }
  };

  const getResultByTestId = async (watId: number) => {
    try {
      return await resultsService.getByTestId(watId);
    } catch {
      setError("فشل في جلب نتيجة الاختبار");
      return null;
    }
  };

  const addResult = async (input: Omit<TestResult, "id" | "createdAt" | "updatedAt">) => {
    setLoading(true);
    try {
      await resultsService.add(input);
      await refreshAllResults();
    } catch {
      setError("فشل في إضافة النتيجة");
    } finally {
      setLoading(false);
    }
  };

  const updateResult = async (id: number, input: Partial<TestResult>) => {
    setLoading(true);
    try {
      await resultsService.update(id, input);
      await refreshAllResults();
    } catch {
      setError("فشل في تعديل النتيجة");
    } finally {
      setLoading(false);
    }
  };

  const deleteResult = async (id: number) => {
    setLoading(true);
    try {
      await resultsService.delete(id);
      await refreshAllResults();
    } catch {
      setError("فشل في حذف النتيجة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResultsContext.Provider
      value={{
        results,
        loading,
        error,
        refreshAllResults,
        getResultsForUser,
        getResultByTestId,
        addResult,
        updateResult,
        deleteResult,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = () => {
  const ctx = useContext(ResultsContext);
  if (!ctx) throw new Error("useResults يجب أن يُستخدم داخل ResultsProvider");
  return ctx;
};