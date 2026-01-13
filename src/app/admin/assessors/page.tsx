"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import styles from "./assessors.module.css";
import AssessorCard from "@/components/Assessors/assessorscard";
import { useAssessors } from "@/context/AssessorContext";
import { User } from "@/types/user";

export default function AssessorsPage() {
  const { assessors, deleteAssessor } = useAssessors();
  const [searchTerm, setSearchTerm] = useState("");

  // حذف مقيم
  const handleDelete = async (id: number) => {
    await deleteAssessor(id);
  };

  // البحث
  const filteredAssessors = useMemo(() => {
    if (!searchTerm) return assessors;
    const term = searchTerm.toLowerCase();
    return assessors.filter(
      (assessor: User) =>
        assessor.userName.toLowerCase().includes(term) ||
        assessor.email.toLowerCase().includes(term)
    );
  }, [assessors, searchTerm]);

  return (
    <div className={styles.assessorsPage}>
      <h1 className={styles.assessorsTitle}>إدارة مقيمي الحكام</h1>

      {/* شريط البحث وإضافة مقيم */}
      <div className={styles.topControls}>
        <input
          type="text"
          placeholder="البحث عن مقيم..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link href="/admin/assessors/new">
          <Button variant="contained" startIcon={<AddIcon />}>
            إضافة مقيم جديد
          </Button>
        </Link>
      </div>

      {/* قائمة المقيمين */}
      <div className={styles.assessorsGrid}>
        {filteredAssessors.length > 0 ? (
          filteredAssessors.map((assessor) => (
            <AssessorCard
              key={assessor.id}
              assessor={assessor}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className={styles.noAssessorsFound}>
            لا يوجد مقيمون مطابقون لنتائج البحث
          </p>
        )}
      </div>
    </div>
  );
}