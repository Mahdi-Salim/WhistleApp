import styles from "./matches.module.css";

export default function RefereeMatchesPage() {
  return (
    <div>
      <h2 className={styles.pageTitle}>مبارياتي</h2>

      <div className={styles.matchCard}>
        <div className={styles.matchTeams}>الجيش × الوحدة</div>
        <div className={styles.matchInfo}>
          18-01-2026<br />
          ملعب الفيحاء
        </div>
        <button className={styles.matchButton}>
          عرض التفاصيل
        </button>
      </div>

      <div className={styles.matchCard}>
        <div className={styles.matchTeams}>تشرين × الكرامة</div>
        <div className={styles.matchInfo}>
          22-01-2026<br />
          ملعب تشرين
        </div>
        <button className={styles.matchButton}>
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
}
