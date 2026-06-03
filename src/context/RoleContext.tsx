"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Role } from "@/types/role";
import { roleService } from "@/services/RoleService";

interface RoleContextType {
  roles: Role[];
  loading: boolean;
  error: string | null;
  fetchRoles: () => Promise<void>;
  createRole: (subject: string) => Promise<void>;
  updateRole: (id: number, subject: string) => Promise<void>;
  deleteRole: (id: number) => Promise<void>;
  getRoleSubjectById: (id: number) => string | null;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await roleService.getAll();
      setRoles(data);
    } catch (e: any) {
      setError(e?.message || "Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  const createRole = async (subject: string) => {
    setLoading(true);
    setError(null);
    try {
      const created = await roleService.create(subject);
      setRoles((prev) => [...prev, created]);
    } catch (e: any) {
      setError(e?.message || "Failed to create role");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id: number, subject: string) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await roleService.update(id, subject);
      setRoles((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch (e: any) {
      setError(e?.message || "Failed to update role");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const deleteRole = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await roleService.delete(id);
      setRoles((prev) => prev.filter((r) => r.id !== id));
    } catch (e: any) {
      setError(e?.message || "Failed to delete role");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const roleMap = useMemo(() => {
    const m = new Map<number, string>();
    roles.forEach((r) => m.set(r.id, r.subject));
    return m;
  }, [roles]);

  const getRoleSubjectById = (id: number) => {
    return roleMap.get(id) ?? null;
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <RoleContext.Provider
      value={{
        roles,
        loading,
        error,
        fetchRoles,
        createRole,
        updateRole,
        deleteRole,
        getRoleSubjectById,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRoles = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRoles must be used within RoleProvider");
  return ctx;
};