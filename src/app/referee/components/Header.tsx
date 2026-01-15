"use client";
import Link from "next/link";
import styles from "./Header.module.css";

export default function RefereeHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>لجنة الحكام</h1>
      <nav className={styles.nav}>
        <Link href="/referee">الرئيسية</Link>
        <Link href="/referee/matches">مبارياتي</Link>
        <Link href="/referee/notifications">الإشعارات</Link>
        <Link href="/referee/profile">الملف الشخصي</Link>
        <Link href="/referee/workoutAndTest">التمارين والاختبارات</Link> {/* التبويب الجديد */}
      </nav>
    </header>
  );
}
