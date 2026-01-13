"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import styles from "./addTeam.module.css";
import { Team, StaffMember, Player } from "@/types/teams";
import { teamService } from "@/services/teamservice";

export default function AddTeamPage() {
  const router = useRouter();

  const [team, setTeam] = useState<Omit<Team, "id">>({
    name: "",
    city: "",
    logo: "",
    degree: "",
    staff: [],
    players: [],
  });

  const [playerDraft, setPlayerDraft] = useState<Player>({
    id: 0,
    name: "",
    number: "",
    position: "",
    birthDate: "",
    nationality: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeam((prev) => ({ ...prev, [name]: value }));
  };

  const handleStaffChange = (role: StaffMember["role"], value: string) => {
    setTeam((prev) => {
      const filtered = prev.staff.filter((s) => s.role !== role);
      if (!value.trim()) return { ...prev, staff: filtered };

      return {
        ...prev,
        staff: [
          ...filtered,
          { id: Date.now(), name: value, role },
        ],
      };
    });
  };

  const handleAddPlayer = () => {
    if (!playerDraft.name || !playerDraft.number) return;

    setTeam((prev) => ({
      ...prev,
      players: [...prev.players, { ...playerDraft, id: Date.now() }],
    }));

    setPlayerDraft({ id: 0, name: "", number: "", position: "", birthDate: "", nationality: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    teamService.create(team);
    router.push("/admin/teams");
  };
   
  return (
    <div className={styles.addTeamContainer}>
      <h1 className={styles.addTeamTitle}>إضافة فريق جديد</h1>

      <form onSubmit={handleSubmit} className={styles.addTeamForm}>
        <input className={styles.formInput} name="logo" placeholder="رابط الشعار" onChange={handleChange} />
        <input className={styles.formInput} name="name" placeholder="اسم الفريق" onChange={handleChange} required />
        <input className={styles.formInput} name="city" placeholder="المدينة" onChange={handleChange} required />
        <input className={styles.formInput} name="degree" placeholder="الدرجة" onChange={handleChange} />

        <div className={styles.staffSection}>
          <h2>الطاقم الفني</h2>
          <input className={styles.formInput} placeholder="المدرب" onChange={(e) => handleStaffChange("HeadCoach", e.target.value)} />
          <input className={styles.formInput} placeholder="مساعد المدرب" onChange={(e) => handleStaffChange("AssistantCoach", e.target.value)} />
          <input className={styles.formInput} placeholder="مدرب الحراس" onChange={(e) => handleStaffChange("GoalkeeperCoach", e.target.value)} />
          <input className={styles.formInput} placeholder="المعالج" onChange={(e) => handleStaffChange("Physiotherapist", e.target.value)} />
          <input className={styles.formInput} placeholder="مدير الفريق" onChange={(e) => handleStaffChange("TeamManager", e.target.value)} />
          <input className={styles.formInput} placeholder="المنسق الاعلامي" onChange={(e) => handleStaffChange("MediaOfficer", e.target.value)} />
          <input className={styles.formInput} placeholder="مسؤول التجهيزات" onChange={(e) => handleStaffChange("equipmentManager", e.target.value)} />
        </div>

        <div className={styles.playersSection}>
          <h2>اللاعبون</h2>
          <input className={styles.formInput} placeholder="اسم اللاعب" value={playerDraft.name} onChange={(e) => setPlayerDraft({ ...playerDraft, name: e.target.value })} />
          <input className={styles.formInput} placeholder="الرقم" value={playerDraft.number} onChange={(e) => setPlayerDraft({ ...playerDraft, number: e.target.value })} />
          <input className={styles.formInput} placeholder="المركز" value={playerDraft.position} onChange={(e) => setPlayerDraft({ ...playerDraft, position: e.target.value })} />
          <input className={styles.formInput} placeholder="تاريخ الميلاد" value={playerDraft.birthDate} onChange={(e) => setPlayerDraft({ ...playerDraft, birthDate: e.target.value })} />
          <input className={styles.formInput} placeholder="الجنسية" value={playerDraft.nationality} onChange={(e) => setPlayerDraft ({ ...playerDraft, nationality: e.target.value })} />
          <Button onClick={handleAddPlayer}>إضافة لاعب</Button>
        </div>

        <div className={styles.buttonGroup}>
          <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
            حفظ
          </Button>
          <Button variant="outlined" startIcon={<CancelIcon />} onClick={() => router.push("/admin/teams")}>
            إلغاء
          </Button>
        </div>
      </form>
    </div>
  );
}
