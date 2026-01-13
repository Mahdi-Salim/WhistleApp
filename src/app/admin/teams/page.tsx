"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import styles from "./teams.module.css";
import TeamCard from "@/components/Teams/TeamCard";
import { Team } from "@/types/teams";
import { teamService } from "@/services/teamservice";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  /* =========================
     تحميل الفرق
  ========================= */
  useEffect(() => {
    const loadTeams = async () => {
      const data = await teamService.getAll();
      setTeams(data);
      setLoading(false);
    };

    loadTeams();
  }, []);

  /* =========================
     حذف فريق
  ========================= */
  const handleDelete = async (id: number) => {
    await teamService.delete(id);
    setTeams((prev) => prev.filter((team) => team.id !== id));
  };

  /* =========================
     البحث
  ========================= */
  const filteredTeams = useMemo(() => {
    if (!searchTerm) return teams;

    const term = searchTerm.toLowerCase();

    return teams.filter(
      (team) =>
        team.name.toLowerCase().includes(term) ||
        team.city.toLowerCase().includes(term) ||
        (team.degree && team.degree.toLowerCase().includes(term))
    );
  }, [teams, searchTerm]);

  if (loading) {
    return <p>جاري تحميل الفرق...</p>;
  }

  return (
    <div className={styles.teamsPage}>
      <h1 className={styles.teamsTitle}>إدارة الفرق</h1>

      {/* شريط البحث والإضافة */}
      <div className={styles.teamsTopControls}>
        <input
          type="text"
          placeholder="البحث عن فريق..."
          className={styles.teamsSearchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Link href="/admin/teams/new">
          <Button variant="contained" startIcon={<AddIcon />}>
            إضافة فريق جديد
          </Button>
        </Link>
      </div>

      {/* عرض الفرق */}
      <div className={styles.teamsGrid}>
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className={styles.noTeamsFound}>
            لا توجد فرق مطابقة لنتائج البحث
          </p>
        )}
      </div>
    </div>
  );
}
