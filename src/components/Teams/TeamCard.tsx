"use client";

import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import styles from "@/app/admin/teams/teams.module.css";
import { Team } from "@/types/teams";

interface TeamCardProps {
  team: Team;
  onDelete: (name: string) => void; // ✅ تعديل: الحذف بالاسم
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onDelete }) => {
  const handleDelete = () => {
    if (confirm(`هل أنت متأكد من حذف الفريق "${team.TeamName}"؟`)) {
      onDelete(team.TeamName); // ✅ تمرير الاسم بدل id
    }
  };

  return (
    <div className={styles.teamCard}>
      <img
        src={team.TeamLogo || "/images/default-team.png"}
        alt={team.TeamName}
        className={styles.teamLogo}
      />

      <h3 className={styles.teamName}>{team.TeamName}</h3>

      <p className={styles.teamCategory}>
        المدينة: {team.TeamManager} {/* Assuming TeamManager is displayed here as placeholder for city not in interface */}
      </p>

      <p className={styles.teamCategory}>
        عدد اللاعبين: {team.Players?.length || 0}
      </p>

      <div className={styles.buttonRow}>
        {/* ✅ تعديل الرابط ليستخدم الاسم بدل id */}
        <Link href={`/admin/teams/edit/${team.TeamName}`}>
          <Button
            variant="contained"
            className={styles.detailsButton}
          >
            عرض / تعديل
          </Button>
        </Link>

        <Button
          variant="contained"
          className={styles.deleteButton}
          onClick={handleDelete}
        >
          حذف
        </Button>
      </div>
    </div>
  );
};

export default TeamCard;