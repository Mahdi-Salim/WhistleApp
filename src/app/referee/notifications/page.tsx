"use client";

import styles from "./notifications.module.css";

// بيانات وهمية مؤقتة، لاحقًا تأتي من backend
const notifications = [
  { id: 1, type: "assignment", title: "تم تكليفك لمباراة الجيش × الوحدة", date: "18-01-2026" },
  { id: 2, type: "schedule", title: "صدر جدول التعيينات الأسبوعي", date: "15-01-2026" },
  { id: 3, type: "general", title: "تذكير بحضور اجتماع الحكام", date: "14-01-2026" },
];

export default function NotificationsPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>الإشعارات</h2>
      <div className={styles.notificationsList}>
        {notifications.map(note => {
          let typeClass = "";
          if (note.type === "assignment") typeClass = styles.assignment;
          if (note.type === "schedule") typeClass = styles.schedule;
          if (note.type === "general") typeClass = styles.general;

          return (
            <div key={note.id} className={`${styles.notificationCard} ${typeClass}`}>
              <div className={styles.notificationTitle}>{note.title}</div>
              <div className={styles.notificationDate}>{note.date}</div>
            </div>
          );
        })}
      </div>
    </div>
    
  );
}
