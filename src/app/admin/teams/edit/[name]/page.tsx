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
import { imageService } from "@/services/imageService";
import { useDegreeContext } from "@/context/degreeContext";

export default function EditTeamPage() {
  const params = useParams();
  const router = useRouter();
  const teamName = params.name as string; // ✅ TeamName in route

  const { degrees } = useDegreeContext();

  const [team, setTeam] = useState<Team | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // جلب بيانات الفريق عند التحميل
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamService.getByName(teamName); // ✅ جلب الفريق بالاسم
        if (!data) {
          setError("لم يتم العثور على الفريق");
        } else {
          setTeam({
            ...data,
            Players: Array.isArray((data as any).Players) ? (data as any).Players : [],
          });
        }
      } catch (err) {
        console.error(err);
        setError("حدث خطأ أثناء جلب بيانات الفريق");
      }
    };

    fetchTeam();
  }, [teamName]);

  // رفع الشعار
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const imageUrl = await imageService.upload(file);
      setTeam((prev) => (prev ? { ...prev, TeamLogo: imageUrl } : prev));
    } catch {
      alert("فشل في رفع الشعار، يرجى المحاولة مرة أخرى.");
    } finally {
      setUploadingImage(false);
    }
  };

  // تحديث بيانات الفريق الأساسية
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!team) return;
    const { name, value } = e.target;

    setTeam({
      ...team,
      [name]: name === "DegreeId" ? Number(value) : value,
    } as Team);
  };

  // تحديث لاعب محدد (باستخدام index)
  const handlePlayerChange = (
    index: number,
    field: keyof Player,
    value: string | number
  ) => {
    if (!team) return;
    const next = [...team.Players];
    next[index] = { ...next[index], [field]: value };
    setTeam({ ...team, Players: next });
  };

  // إضافة لاعب جديد
  const addPlayer = () => {
    if (!team) return;
    setTeam({
      ...team,
      Players: [...team.Players, { name: "", num: 0, position: "" }],
    });
  };

  // حذف لاعب
  const removePlayer = (index: number) => {
    if (!team) return;
    setTeam({
      ...team,
      Players: team.Players.filter((_, i) => i !== index),
    });
  };

  // حفظ التعديلات
  const handleSubmit = async () => {
    if (!team) return;

    await teamService.update(teamName, {
      ...team,
      replacePlayers: true,
    } as any);

    alert("تم تحديث بيانات الفريق بنجاح");
    router.push("/admin/teams");
  };

  if (error) return <p>{error}</p>;
  if (!team) return <p>جاري التحميل...</p>;

  return (
    <div className={styles.editTeamContainer}>
      <h1 className={styles.editTeamTitle}>تعديل بيانات الفريق</h1>

      {/* شعار الفريق */}
      <div className={styles.formGroup}>
        <label style={{ display: "block", marginBottom: "5px" }}>شعار الفريق</label>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {team.TeamLogo && (
            <img
              src={team.TeamLogo}
              alt="Team Logo"
              style={{
                width: 80,
                height: 80,
                objectFit: "contain",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
          )}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImage}
            />
            {uploadingImage && <p style={{ fontSize: "12px" }}>جاري الرفع...</p>}
          </div>
        </div>
      </div>

      {/* بيانات الفريق الأساسية */}
      <div className={styles.formGroup}>
        <input
          name="TeamName"
          value={team.TeamName}
          onChange={handleChange}
          placeholder="اسم الفريق"
          className={styles.formInput}
        />
        <input
          name="TeamManager"
          value={team.TeamManager}
          onChange={handleChange}
          placeholder="مدير الفريق"
          className={styles.formInput}
        />
        <input
          name="Coach"
          value={team.Coach}
          onChange={handleChange}
          placeholder="المدرب"
          className={styles.formInput}
        />
        <input
          name="AssistantCoach"
          value={team.AssistantCoach || ""}
          onChange={handleChange}
          placeholder="مساعد المدرب"
          className={styles.formInput}
        />
        <input
          name="KeeperCoach"
          value={team.KeeperCoach || ""}
          onChange={handleChange}
          placeholder="مدرب الحراس"
          className={styles.formInput}
        />
        <input
          name="PhysicalTherapist"
          value={team.PhysicalTherapist || ""}
          onChange={handleChange}
          placeholder="المعالج الفيزيائي"
          className={styles.formInput}
        />
        <input
          name="MediaOfficial"
          value={team.MediaOfficial || ""}
          onChange={handleChange}
          placeholder="المنسق الإعلامي"
          className={styles.formInput}
        />
        <input
          name="EquipmentManager"
          value={team.EquipmentManager || ""}
          onChange={handleChange}
          placeholder="مسؤول التجهيزات"
          className={styles.formInput}
        />

        <select
          name="DegreeId"
          className={styles.formInput}
          value={team.DegreeId}
          onChange={handleChange}
        >
          <option value={0}>اختر درجة الفريق</option>
          {degrees.map((deg) => (
            <option key={deg.id} value={deg.id}>
              {deg.TypeOfDegree}
            </option>
          ))}
        </select>
      </div>

      {/* قائمة اللاعبين */}
      <div className={styles.playersSection}>
        <h2>قائمة اللاعبين</h2>

        {team.Players.map((player, index) => (
          <div key={index} className={styles.playerRow}>
            <input
              placeholder="الاسم"
              value={player.name}
              onChange={(e) => handlePlayerChange(index, "name", e.target.value)}
            />
            <input
              type="number"
              placeholder="الرقم"
              value={player.num}
              onChange={(e) => handlePlayerChange(index, "num", Number(e.target.value))}
            />
            <input
              placeholder="المركز"
              value={player.position}
              onChange={(e) =>
                handlePlayerChange(index, "position", e.target.value)
              }
            />

            <Button color="error" onClick={() => removePlayer(index)}>
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