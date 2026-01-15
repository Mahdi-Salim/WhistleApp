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
    if (confirm(`هل أنت متأكد من حذف الفريق "${team.name}"؟`)) {
      onDelete(team.name); // ✅ تمرير الاسم بدل id
    }
  };

  return (
    <div className={styles.teamCard}>
      <img
        src={team.logo || "/images/default-team.png"}
        alt={team.name}
        className={styles.teamLogo}
      />

      <h3 className={styles.teamName}>{team.name}</h3>

      <p className={styles.teamCategory}>
        المدينة: {team.city}
      </p>

      <p className={styles.teamCategory}>
        عدد اللاعبين: {team.players.length}
      </p>

      <div className={styles.buttonRow}>
        {/* ✅ تعديل الرابط ليستخدم الاسم بدل id */}
        <Link href={`/admin/teams/edit/${team.name}`}>
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