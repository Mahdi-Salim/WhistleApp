"use client";
import React, { useState, useEffect } from "react";
import styles from "./addEvent.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useWAT } from "@/context/WATContext";
import type { WAT } from "@/types/WAT";
import { courtService } from "@/services/CourtService";
import { refereeService } from "@/services/refereeService";
import type { RefereeWithUser } from "@/types/referee";

const typeOptions = [
  { value: "false", label: "تمرين" },
  { value: "true", label: "اختبار" },
];

export default function AddNewWATPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");

  const { createEvent } = useWAT();

  const [event, setEvent] = useState<Omit<WAT, "id" | "createdAt" | "updatedAt">>({
    Date: dateParam || "",
    Time: "",
    TypeActivity: false,
    CourtId: 0,
    UserId: 0, // ← سيتم استبداله بالحكام المختارين
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [courts, setCourts] = useState<{ id: number; courtName: string }[]>([]);
  const [referees, setReferees] = useState<RefereeWithUser[]>([]);

  useEffect(() => {
    courtService.getAll().then(setCourts).catch(() => setCourts([]));

    refereeService.getAll()
      .then((users: RefereeWithUser[]) => {
        const refs = users.filter((u) => u.RoleId === 3);
        setReferees(refs);
      })
      .catch(() => setReferees([]));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]:
        name === "TypeActivity"
          ? value === "true"
          : name === "CourtId"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (referees.length === 0) {
      setError("لا يوجد حكام متاحون لإسناد هذا الحدث.");
      return;
    }

    setLoading(true);
    try {
      await Promise.all(
        referees.map((ref) =>
          createEvent({
            ...event,
            UserId: ref.id,
          })
        )
      );
      router.push("/admin/events");
    } catch (err) {
      console.error(err);
      setError("فشل في إنشاء الحدث لكل الحكام. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/events");
  };

  return (
    <div className={styles.addEventContainer}>
      <h1 className={styles.addEventTitle}>إنشاء تمرين أو اختبار جديد</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.addEventForm}>
        {/* نوع النشاط */}
        <div className={styles.formGroup}>
          <label htmlFor="TypeActivity" className={styles.formLabel}>
            نوع النشاط:
          </label>
          <select
            id="TypeActivity"
            name="TypeActivity"
            className={styles.formInput}
            value={String(event.TypeActivity)}
            onChange={handleInputChange}
            required
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* التاريخ */}
        <div className={styles.formGroup}>
          <label htmlFor="Date" className={styles.formLabel}>
            التاريخ:
          </label>
          <input
            type="date"
            id="Date"
            name="Date"
            className={styles.formInput}
            value={event.Date}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* الوقت */}
        <div className={styles.formGroup}>
          <label htmlFor="Time" className={styles.formLabel}>
            الوقت:
          </label>
          <input
            type="time"
            id="Time"
            name="Time"
            className={styles.formInput}
            value={event.Time}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* الملعب */}
        <div className={styles.formGroup}>
          <label htmlFor="CourtId" className={styles.formLabel}>
            الملعب:
          </label>
          <select
            id="CourtId"
            name="CourtId"
            className={styles.formInput}
            value={event.CourtId}
            onChange={handleInputChange}
            required
          >
            <option value="">اختر الملعب</option>
            {courts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.courtName}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            type="submit"
            disabled={loading}
          >
            إنشاء الحدث
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<CancelIcon />}
            onClick={handleCancel}
          >
            إلغاء
          </Button>
        </div>
      </form>
    </div>
  );
}