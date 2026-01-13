"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import styles from "./editTeam.module.css";
import { Team, Player } from "@/types/teams";
import { teamService } from "@/services/teamservice";

export default function EditTeamPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = Number(params.id);

  const [team, setTeam] = useState<Team | null>(null);
  const [error, setError] = useState<string | null>(null);

  // جلب بيانات الفريق عند التحميل
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamService.getById(teamId);
        if (!data) {
          setError("لم يتم العثور على الفريق");
        } else {
          // تهيئة players كمصفوفة حتى لو كانت فارغة
          setTeam({ ...data, players: data.players || [] });
        }
      } catch (err) {
        console.error(err);
        setError("حدث خطأ أثناء جلب بيانات الفريق");
      }
    };

    fetchTeam();
  }, [teamId]);

  // تحديث بيانات الفريق الأساسية
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!team) return;
    const { name, value } = e.target;
    setTeam({ ...team, [name]: value });
  };

  // تحديث لاعب محدد
  const handlePlayerChange = (
    playerId: number,
    field: keyof Player,
    value: string | number
  ) => {
    if (!team) return;
    setTeam({
      ...team,
      players: team.players.map((p) =>
        p.id === playerId ? { ...p, [field]: value } : p
      ),
    });
  };

  // إضافة لاعب جديد
  const addPlayer = () => {
    if (!team) return;
    setTeam({
      ...team,
      players: [
        ...team.players,
        {
          id: Date.now(),
          name: "",
          number: 0,
          position: "",
          birthDate: "",
        },
      ],
    });
  };

  // حذف لاعب
  const removePlayer = (id: number) => {
    if (!team) return;
    setTeam({
      ...team,
      players: team.players.filter((p) => p.id !== id),
    });
  };

  // حفظ التعديلات
  const handleSubmit = () => {
    if (!team) return;
    teamService.update(team.id, team);
    alert("تم تحديث بيانات الفريق بنجاح");
    router.push("/admin/teams");
  };

  if (error) return <p>{error}</p>;
  if (!team) return <p>جاري التحميل...</p>;

  return (
    <div className={styles.editTeamContainer}>
      <h1 className={styles.editTeamTitle}>تعديل بيانات الفريق</h1>

      {/* بيانات الفريق الأساسية */}
      <div className={styles.formGroup}>
        <input
          name="name"
          value={team.name}
          onChange={handleChange}
          placeholder="اسم الفريق"
          className={styles.formInput}
        />
        <input
          name="city"
          value={team.city}
          onChange={handleChange}
          placeholder="المدينة"
          className={styles.formInput}
        />
        <input
          name="degree"
          value={team.degree}
          onChange={handleChange}
          placeholder="الدرجة"
          className={styles.formInput}
        />
      </div>

      {/* قائمة اللاعبين */}
      <div className={styles.playersSection}>
        <h2>قائمة اللاعبين</h2>

        {team.players.map((player) => (
          <div key={player.id} className={styles.playerRow}>
            <input
              placeholder="الاسم"
              value={player.name}
              onChange={(e) =>
                handlePlayerChange(player.id, "name", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="الرقم"
              value={player.number}
              onChange={(e) =>
                handlePlayerChange(player.id, "number", Number(e.target.value))
              }
            />
            <input
              placeholder="المركز"
              value={player.position}
              onChange={(e) =>
                handlePlayerChange(player.id, "position", e.target.value)
              }
            />
            <input
              type="date"
              value={player.birthDate}
              onChange={(e) =>
                handlePlayerChange(player.id, "birthDate", e.target.value)
              }
            />

            <Button color="error" onClick={() => removePlayer(player.id)}>
              حذف
            </Button>
          </div>
        ))}

        <Button startIcon={<AddIcon />} onClick={addPlayer}>
          إضافة لاعب
        </Button>
      </div>

      {/* أزرار حفظ وإلغاء */}
      <div className={styles.buttonGroup}>
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={handleSubmit}
        >
          حفظ
        </Button>
        <Button
          startIcon={<CancelIcon />}
          variant="outlined"
          onClick={() => router.push("/admin/teams")}
        >
          إلغاء
        </Button>
      </div>
    </div>
  );
}
