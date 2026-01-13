"use client";
import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import styles from "@/app/admin/assessors/assessors.module.css";
import { User } from "@/types/user";

interface AssessorCardProps {
  assessor: User;
  onDelete?: (id: number) => void;
}

const AssessorCard: React.FC<AssessorCardProps> = ({ assessor, onDelete }) => {
  const handleDelete = () => {
    if (!onDelete) return;

    if (confirm(`هل أنت متأكد من حذف ${assessor.userName}؟`)) {
      onDelete(assessor.id);
    }
  };

  return (
    <div className={styles.assessorCard}>
      <img
        src={assessor.photo && assessor.photo.trim() !== "" ? assessor.photo : "/images/default-user.png"}
        alt={assessor.userName}
        className={styles.assessorImage}
      />
      <h3 className={styles.assessorName}>{assessor.userName}</h3>

      {/* يمكن إضافة معلومات إضافية هنا إذا أحببت، مثل البريد أو الحالة */}
      {assessor.email && (
        <p className={styles.assessorSpecification}>{assessor.email}</p>
      )}

      <div className={styles.buttonRow}>
        <Link href={`/admin/assessors/edit/${assessor.id}`}>
          <Button className={styles.detailsButton} variant="contained">
            عرض التفاصيل/تعديل
          </Button>
        </Link>
        {onDelete && (
          <Button className={styles.deleteButton} onClick={handleDelete}>
            حذف
          </Button>
        )}
      </div>
    </div>
  );
};

export default AssessorCard;