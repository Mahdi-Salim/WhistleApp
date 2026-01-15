"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import styles from "./addTeam.module.css";
import { useTeams } from "@/context/TeamContext";
import { useDegreeContext } from "@/context/degreeContext";

interface Player {
  id: number;
  name: string;
  num: number;
  sub: number;
  YCard: number;
  RCard: number;
  goal: number;
  onGoal: number;
  position: string;
}

export default function AddTeamPage() {
  const router = useRouter();
  const { createTeam } = useTeams();
  const { degrees } = useDegreeContext(); // ✅ الحصول على قائمة الدرجات

  const [team, setTeam] = useState({
    TeamName: "",
    TeamManager: "",
    Coach: "",
    AssistantCoach: "",
    KeeperCoach: "",
    PhysicalTherapist: "",
    MediaOfficial: "",
    EquipmentManager: "",
    Players: [] as Player[],
    TeamLogo: "",
    DegreeId: "", // id الدرجة
  });

  const [playerDraft, setPlayerDraft] = useState<Player>({
    id: 0,
    name: "",
    num: 0,
    sub: 0,
    YCard: 0,
    RCard: 0,
    goal: 0,
    onGoal: 0,
    position: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTeam((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPlayer = () => {
    if (!playerDraft.name || !playerDraft.num) return;

    setTeam((prev) => ({
      ...prev,
      Players: [...prev.Players, { ...playerDraft, id: Date.now() }],
    }));

    setPlayerDraft({
      id: 0,
      name: "",
      num: 0,
      sub: 0,
      YCard: 0,
      RCard: 0,
      goal: 0,
      onGoal: 0,
      position: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Payload being sent:", team);

    try {
      await createTeam(team);
      router.push("/admin/teams");
    } catch (error: any) {
      console.error("Error creating team:", error);
      alert("حدث خطأ أثناء إضافة الفريق. راجع الـ Console للتفاصيل.");
    }
  };

  return (
    <div className={styles.addTeamContainer}>
      <h1 className={styles.addTeamTitle}>إضافة فريق جديد</h1>

      <form onSubmit={handleSubmit} className={styles.addTeamForm}>
        <input
          className={styles.formInput}
          name="TeamLogo"
          placeholder="رابط شعار الفريق"
          onChange={handleChange}
        />

        <input
          className={styles.formInput}
          name="TeamName"
          placeholder="اسم الفريق"
          onChange={handleChange}
          required
        />

        <input
          className={styles.formInput}
          name="TeamManager"
          placeholder="مدير الفريق"
          onChange={handleChange}
          required
        />

        <input
          className={styles.formInput}
          name="Coach"
          placeholder="المدرب"
          onChange={handleChange}
          required
        />

        <input
          className={styles.formInput}
          name="AssistantCoach"
          placeholder="مساعد المدرب"
          onChange={handleChange}
        />

        <input
          className={styles.formInput}
          name="KeeperCoach"
          placeholder="مدرب الحراس"
          onChange={handleChange}
        />

        <input
          className={styles.formInput}
          name="PhysicalTherapist"
          placeholder="المعالج الفيزيائي"
          onChange={handleChange}
        />

        <input
          className={styles.formInput}
          name="MediaOfficial"
          placeholder="المنسق الإعلامي"
          onChange={handleChange}
        />

        <input
          className={styles.formInput}
          name="EquipmentManager"
          placeholder="مسؤول التجهيزات"
          onChange={handleChange}
        />

        {/* اختيار الدرجة */}
        <select
          name="DegreeId"
          className={styles.formInput}
          onChange={handleChange}
          required
        >
          <option value="">اختر درجة الفريق</option>
          {degrees.map((deg) => (
            <option key={deg.id} value={deg.id}>
              {deg.TypeOfDegree}
            </option>
          ))}
        </select>

        {/* لاعبين */}
        <div className={styles.playersSection}>
          <h2>إضافة لاعبين</h2>
          <input
            className={styles.formInput}
            placeholder="اسم اللاعب"
            value={playerDraft.name}
            onChange={(e) =>
              setPlayerDraft({ ...playerDraft, name: e.target.value })
            }
          />
          <input
            className={styles.formInput}
            type="number"
            placeholder="رقم اللاعب"
            value={playerDraft.num}
            onChange={(e) =>
              setPlayerDraft({ ...playerDraft, num: Number(e.target.value) })
            }
          />
          <input
            className={styles.formInput}
            type="number"
            placeholder="البديل (sub)"
            value={playerDraft.sub}
            onChange={(e) =>
              setPlayerDraft({ ...playerDraft, sub: Number(e.target.value) })
            }
          />
          <input
            className={styles.formInput}
            type="number"
            placeholder="البطاقات الصفراء"
            value={playerDraft.YCard}
            onChange={(e) =>
              setPlayerDraft({ ...playerDraft, YCard: Number(e.target.value) })
            }
          />
          <input
            className={styles.formInput}
            type="number"
            placeholder="البطاقات الحمراء"
            value={playerDraft.RCard}
            onChange={(e) =>
              setPlayerDraft({ ...playerDraft, RCard: Number(e.target.value) })
            }
          />
          <input
            className={styles.formInput}
            type="number"
            placeholder="الأهداف"
            value={playerDraft.goal}
            onChange={(e) =>
              setPlayerDraft({ ...playerDraft, goal: Number(e.target.value) })
            }
          />
          <input
            className={styles.formInput}
            type="number"
            placeholder="أهداف مساعدة (onGoal)"
            value={playerDraft.onGoal}
            onChange={(e) =>
              setPlayerDraft({ ...playerDraft, onGoal: Number(e.target.value) })
            }
          />
          <input
            className={styles.formInput}
            placeholder="المركز"
            value={playerDraft.position}
            onChange={(e) =>
              setPlayerDraft({ ...playerDraft, position: e.target.value })
            }
          />
          <Button onClick={handleAddPlayer} variant="outlined">
            إضافة لاعب
          </Button>
        </div>

        <div className={styles.buttonGroup}>
          <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
            حفظ
          </Button>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => router.push("/admin/teams")}
          >
            إلغاء
          </Button>
        </div>
      </form>
    </div>
  );
}
