"use client";
import React, { useState } from "react";
import styles from "./addcourt.module.css";
import { useRouter } from "next/navigation";
import { useCourts } from "@/context/CourtContext";

export default function AddCourtPage() {
  const router = useRouter();
  const { createCourt } = useCourts();

  const [courtName, setCourtName] = useState("");
  const [address, setAddress] = useState(""); // ← تعديل الاسم ليطابق الـ backend
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCourt({ courtName, address }); // ← إرسال الحقول الصحيحة
      router.push("/admin/courts"); // العودة إلى صفحة إدارة الملاعب بعد الحفظ
    } catch (err: any) {
      console.error("Error creating court:", err);
      setError(err.message || "فشل في إنشاء الملعب. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/courts");
  };

  return (
    <div className={styles.courtsPage}>
      <h1 className={styles.courtsTitle}>➕ إضافة ملعب جديد</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.addCourtForm}>
        <div className={styles.formGroup}>
          <label htmlFor="courtName" className={styles.formLabel}>
            اسم الملعب:
          </label>
          <input
            type="text"
            id="courtName"
            name="courtName"
            className={styles.formInput}
            value={courtName}
            onChange={(e) => setCourtName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.formLabel}>
            العنوان:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className={styles.formInput}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            className={styles.detailsButton}
            disabled={loading}
          >
            حفظ الملعب
          </button>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleCancel}
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}