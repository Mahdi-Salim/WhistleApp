"use client";
import React, { useState, useMemo, useEffect } from "react";
import styles from "./referees.module.css";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import RefereeCard from "@/components/Referees/RefereeCard";
import { refereeService } from "@/services/refereeService";
import { RefereeWithUser } from "@/types/referee";

export default function RefereesPage() {
  const [referees, setReferees] = useState<RefereeWithUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferees = async () => {
      try {
        setLoading(true);
        const data = await refereeService.getAll();
        setReferees(data);
      } catch (err) {
        console.error(err);
        setError("فشل في تحميل بيانات الحكام. يرجى التأكد من تشغيل الخادم.");
      } finally {
        setLoading(false);
      }
    };

    fetchReferees();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await refereeService.delete(id);
      setReferees((prev) => prev.filter((ref) => ref.id !== id));
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء الحذف");
    }
  };

  const filteredReferees = useMemo(() => {
    if (!searchTerm) return referees;
    const term = searchTerm.toLowerCase();

    return referees.filter((referee) =>
      [
        referee.userName,
        referee.email,
        referee.Referee?.AFCNumber,
        referee.Referee?.specification,
        referee.Referee?.degree,
      ]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(term))
    );
  }, [referees, searchTerm]);

  if (loading) return <div className={styles.loading}>جاري التحميل...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.refereesPage}>
      <h1 className={styles.refereesTitle}>إدارة الحكام</h1>

      <div className={styles.topControls}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="البحث عن حكم..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.addRefereeContainer}>
          <Link href="/admin/referees/new">
            <Button variant="contained" startIcon={<AddIcon />}>
              إضافة حكم جديد
            </Button>
          </Link>
        </div>
      </div>

      <div className={styles.refereesGrid}>
        {filteredReferees.length > 0 ? (
          filteredReferees.map((referee) => (
            <RefereeCard
              key={referee.id}
              referee={referee}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className={styles.noRefereesFound}>
            لا يوجد حكام مطابقون لمعايير البحث.
          </p>
        )}
      </div>
    </div>
  );
}