"use client";
import React, { useState } from "react";
import styles from "./court.module.css";
import { useCourts } from "@/context/CourtContext";
import { useRouter } from "next/navigation";
export default function CourtsPage() {
  const { courts, loading, error, refreshCourts } = useCourts();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <p>جاري التحميل...</p>;
  if (error) return <p className={styles.errorMessage}>{error}</p>;

  const filteredCourts = courts.filter(
    (court) =>
      court.courtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (court.address &&
        court.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={styles.courtsPage}>
      <h1 className={styles.courtsTitle}> إدارة الملاعب</h1>

      {/* شريط البحث + إضافة ملعب */}
      <div className={styles.topControls}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder=" البحث عن ملعب..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className={styles.detailsButton}
          onClick={() => router.push("/admin/courts/new")}
        >
          + إضافة ملعب جديد
        </button>
      </div>

      {filteredCourts.length === 0 ? (
        <p className={styles.noCourtsFound}>لا توجد ملاعب مطابقة للبحث</p>
      ) : (
        <table className={styles.courtsTable}>
          <thead>
            <tr>
              <th>الرقم</th>
              <th>اسم الملعب</th>
              <th>العنوان</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourts.map((court) => (
              <tr key={court.id}>
                <td>{court.id}</td>
                <td>{court.courtName}</td>
                <td>{court.address || "—"}</td>
                <td className={styles.buttonGroup}>
                  <button
                    className={styles.deleteButton}
                    onClick={async () => {
                      if (confirm("هل أنت متأكد من حذف هذا الملعب؟")) {
                        try {
                          const res = await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/api/court/deleteCourt/${court.id}`,
                            { method: "DELETE" }
                          );
                          if (!res.ok) throw new Error("فشل في حذف الملعب");
                          await refreshCourts();
                        } catch (err: unknown) {
                          if (err instanceof Error) {
                            alert(err.message);
                          } else {
                            alert("حدث خطأ غير متوقع");
                          }
                        }
                      }
                    }}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}