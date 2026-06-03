"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import styles from "./addTeam.module.css";
import { useTeams } from "@/context/TeamContext";
import { useDegreeContext } from "@/context/degreeContext";
import { imageService } from "@/services/imageService";

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
  const { degrees } = useDegreeContext(); 
  const [uploadingImage, setUploadingImage] = useState(false);

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const imageUrl = await imageService.upload(file);
      setTeam((prev) => ({ ...prev, TeamLogo: imageUrl }));
    } catch (error) {
      alert("فشل في رفع الشعار، يرجى المحاولة مرة أخرى.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddPlayer = () => {
    // التحقق من وجود الاسم والرقم (السماح بالرقم 0)
    if (!playerDraft.name || (playerDraft.num !== 0 && !playerDraft.num)) {
      alert("يرجى إدخال اسم اللاعب ورقمه");
      return;
    }

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
    const payload = {
      ...team,
      TeamName: team.TeamName.trim(),
      TeamManager: team.TeamManager.trim(),
      Coach: team.Coach.trim(),
      AssistantCoach: team.AssistantCoach.trim(),
      KeeperCoach: team.KeeperCoach.trim(),
      PhysicalTherapist: team.PhysicalTherapist.trim(),
      MediaOfficial: team.MediaOfficial.trim(),
      EquipmentManager: team.EquipmentManager.trim(),
      TeamLogo: team.TeamLogo.trim(),
      DegreeId: Number(team.DegreeId),
    };

    if (
      !payload.TeamName ||
      !payload.TeamManager ||
      !payload.Coach ||
      !payload.AssistantCoach ||
      !payload.KeeperCoach ||
      !payload.PhysicalTherapist ||
      !payload.MediaOfficial ||
      !payload.EquipmentManager ||
      !payload.TeamLogo ||
      !payload.DegreeId ||
      payload.Players.length === 0
    ) {
      alert("يرجى تعبئة كل الحقول المطلوبة وإضافة لاعب واحد على الأقل مع شعار الفريق.");
      return;
    }

    console.log("Payload being sent:", payload);
    try {
      await createTeam(payload);
      router.push("/admin/teams");
    } catch (error: any) {
      console.error("Error creating team:", error);
      const backendMessage = error?.response?.data?.message;
      alert(backendMessage || "حدث خطأ أثناء إضافة الفريق. راجع الـ Console للتفاصيل.");
    }
  };

  return (
    <div className={styles.addTeamContainer}>
      <h1 className={styles.addTeamTitle}>إضافة فريق جديد</h1>

      <form onSubmit={handleSubmit} className={styles.addTeamForm}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>شعار الفريق</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.formInput}
            disabled={uploadingImage}
          />
          {uploadingImage && <p>جاري رفع الشعار...</p>}
          {team.TeamLogo && !uploadingImage && (
            <img
              src={team.TeamLogo}
              alt="Team Logo"
              style={{ width: 100, height: 100, objectFit: "contain", marginTop: 10, display: "block" }}
            />
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>اسم الفريق</label>
          <input
            className={styles.formInput}
            name="TeamName"
            placeholder="اسم الفريق"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>مدير الفريق</label>
          <input
            className={styles.formInput}
            name="TeamManager"
            placeholder="مدير الفريق"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>المدرب</label>
          <input
            className={styles.formInput}
            name="Coach"
            placeholder="المدرب"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>مساعد المدرب</label>
          <input
            className={styles.formInput}
            name="AssistantCoach"
            placeholder="مساعد المدرب"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>مدرب الحراس</label>
          <input
            className={styles.formInput}
            name="KeeperCoach"
            placeholder="مدرب الحراس"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>المعالج الفيزيائي</label>
          <input
            className={styles.formInput}
            name="PhysicalTherapist"
            placeholder="المعالج الفيزيائي"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>المنسق الإعلامي</label>
          <input
            className={styles.formInput}
            name="MediaOfficial"
            placeholder="المنسق الإعلامي"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>مسؤول التجهيزات</label>
          <input
            className={styles.formInput}
            name="EquipmentManager"
            placeholder="مسؤول التجهيزات"
            onChange={handleChange}
            required
          />
        </div>

        {/* اختيار الدرجة */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>درجة الفريق</label>
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
        </div>

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
          <Button type="button" onClick={handleAddPlayer} variant="outlined">
            إضافة لاعب
          </Button>

          {/* قائمة اللاعبين المضافين */}
          {team.Players.length > 0 && (
            <div className={styles.addedPlayersList}>
              <h3>اللاعبون المضافون ({team.Players.length})</h3>
              <ul>
                {team.Players.map((p, index) => (
                  <li key={index}>
                    {p.name} ({p.num}) - {p.position}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
