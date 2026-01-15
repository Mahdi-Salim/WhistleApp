import styles from "./referee.module.css";

export default function RefereeDashboardPage() {
  return (
    <div>
      <h2 className={styles.pageTitle}>لوحة الحكم</h2>

      {/* بطاقة المباراة القادمة */}
      <div className={styles.upcomingMatchCard}>
        <div className={styles.matchTeams}>الجيش × الوحدة</div>
        <div className={styles.matchInfo}>18-01-2026 | ملعب الفيحاء</div>
        <div className={styles.rating}>★★★★☆</div>
        <button className={styles.matchButton}>عرض التفاصيل</button>
      </div>

      {/* بطاقة الإحصائيات */}
      <div className={styles.statsCard}>
        <div>
          <div className={styles.statsValue}>12</div>
          <div className={styles.statsTitle}>المباريات المكتملة</div>
        </div>
        <div>
          <div className={styles.statsValue}>2</div>
          <div className={styles.statsTitle}>المباريات التي تم الاعتذار عنها</div>
        </div>
        <div>
          <div className={styles.statsValue}>4.5</div>
          <div className={styles.statsTitle}>متوسط التقييم العام</div>
        </div>
      </div>
    </div>
  );
}
