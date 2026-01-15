'use client';    
import styles from "./matchdetails.module.css";
import { useState } from "react";

export default function MatchDetailPage() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div>
      <h2 className={styles.pageTitle}>تفاصيل المباراة</h2>

      <div className={styles.matchDetailCard}>
        <div className={styles.matchDetailTitle}>الجيش × الوحدة</div>
        <div className={styles.matchDetailText}>
          18-01-2026<br />
          ملعب الفيحاء
        </div>
        <div className={styles.matchDetailText}>
          الحكم الرئيسي: أحمد علي<br />
          المساعدون: سامر، كريم
        </div>

        {!accepted ? (
          <>
            <button
              className={styles.actionButton}
              onClick={() => setAccepted(true)}
            >
              قبول التكليف
            </button>
            <button
              className={`${styles.actionButton} ${styles.danger}`}
              onClick={() => alert("تم إرسال الاعتذار")}
            >
              الاعتذار عن المباراة
            </button>
          </>
        ) : (
          <button
            className={styles.actionButton}
            onClick={() => alert("الانتقال لكتابة التقرير")}
          >
            كتابة تقرير المباراة
          </button>
        )}
      </div>
    </div>
  );
}
