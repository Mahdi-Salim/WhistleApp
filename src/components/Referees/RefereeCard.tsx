"use client";
import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import styles from "../../app/admin/referees/referees.module.css";
import { RefereeWithUser } from "@/types/referee";

interface RefereeCardProps {
  referee: RefereeWithUser & { rating?: number };
  onDelete?: (id: number) => void;
}

const RefereeCard: React.FC<RefereeCardProps> = ({ referee, onDelete }) => {
  const handleDelete = () => {
    if (!onDelete) return;

    const confirmDelete = window.confirm(
      `هل أنت متأكد أنك تريد حذف الحكم "${referee.userName}"؟`
    );

    if (confirmDelete) {
      onDelete(referee.id);
    }
  };

  return (
    <div className={styles.refereeCard}>
      <img
        src={
          referee.photo && referee.photo.trim() !== ""
            ? referee.photo
            : "/images/default-user.png"
        }
        alt={referee.userName}
        className={styles.refereeImage}
      />

      <h3 className={styles.refereeName}>{referee.userName}</h3>
      <p className={styles.refereeDegree}>
        الدرجة: {referee.Referee?.degree ?? "غير محدد"}
      </p>
      <p className={styles.refereeSpecification}>
        التخصص: {referee.Referee?.specification ?? "غير محدد"}
      </p>

      {/* لا يوجد Rating في الباك إند، لكن نعرضه إذا أضفته لاحقًا */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          marginBottom: "10px",
        }}
      >
        <Rating
          name="read-only"
          value={referee.rating ?? 0} // ✅ بدون any
          readOnly
          precision={0.1}
        />
        <span style={{ fontSize: "14px", color: "#666" }}>
          ({referee.rating ?? 0})
        </span>
      </div>

      <div className={styles.buttonRow}>
        <Link href={`/admin/referees/edit/${referee.id}`}>
          <Button variant="contained" className={styles.detailsButton}>
            عرض التفاصيل / تعديل
          </Button>
        </Link>

        {onDelete && (
          <Button
            variant="contained"
            className={styles.deleteButton}
            onClick={handleDelete}
          >
            حذف
          </Button>
        )}
      </div>
    </div>
  );
};

export default RefereeCard;