"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import styles from "./teams.module.css";
import TeamCard from "@/components/Teams/TeamCard";
import { useTeams } from "@/context/TeamContext";

export default function TeamsPage() {
  const { teams, loading, deleteTeam } = useTeams();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeams = useMemo(() => {
    if (!searchTerm) return teams;
    const term = searchTerm.toLowerCase();
    return teams.filter(
      (team) =>
        team.TeamName.toLowerCase().includes(term) ||
        team.TeamManager.toLowerCase().includes(term) 
    );
  }, [teams, searchTerm]);

  if (loading) return <p>جاري تحميل الفرق...</p>;

  return (
    <div className={styles.teamsPage}>
      <h1 className={styles.teamsTitle}>إدارة الفرق</h1>

      <div className={styles.teamsTopControls}>
        <input
          type="text"
          placeholder="البحث عن فريق..."
          className={styles.teamsSearchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/admin/teams/new">
            <Button variant="contained" startIcon={<AddIcon />}>
              إضافة فريق جديد
            </Button>
          </Link>

          <Link href="/admin/degrees/new">
            <Button variant="outlined">إضافة درجة جديدة</Button>
          </Link>
        </div>
      </div>

      <div className={styles.teamsGrid}>
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onDelete={() => deleteTeam(team.TeamName)}
            />
          ))
        ) : (
          <p className={styles.noTeamsFound}>لا توجد فرق مطابقة لنتائج البحث</p>
        )}
      </div>
    </div>
  );
}
