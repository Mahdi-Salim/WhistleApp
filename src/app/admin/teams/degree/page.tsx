"use client";
import React, { useState } from "react";
import styles from "./addDegree.module.css";
import { useDegreeContext } from "@/context/degreeContext";

export default function AddDegreePage() {
  const { degrees, loading, error, addDegree } = useDegreeContext();
  const [newDegree, setNewDegree] = useState("");
  const handleAddDegree = async () => {
    if (!newDegree.trim()) return;
    await addDegree(newDegree.trim());
    setNewDegree("");
  };
  return (
    <div className={styles.degreePage}>
      <h1 className={styles.degreeTitle}>إدارة درجات الفرق</h1>
      <div className={styles.addDegreeContainer}>
        <input
          type="text"
          placeholder="أدخل اسم الدرجة الجديدة..."
          value={newDegree}
          onChange={(e) => setNewDegree(e.target.value)}
          className={styles.degreeInput}
        />
        <button onClick={handleAddDegree} className={styles.addButton} disabled={loading}>
          ➕ إضافة
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.degreesList}>
        {degrees.length > 0 ? (
          degrees.map((deg) => (
            <div key={deg.id} className={styles.degreeCard}>
              {deg.TypeOfDegree}
            </div>
          ))
        ) : (
          <p className={styles.noDegrees}>لا توجد درجات بعد</p>
        )}
      </div>
    </div>
  );
}