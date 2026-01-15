"use client";

import { useState } from "react";
import styles from "./WAT.module.css";

// بيانات وهمية مؤقتة، لاحقًا تأتي من backend
const events = [
  { date: "2026-01-18", type: "exercise" }, // تمرين
  { date: "2026-01-22", type: "test" }      // اختبار
];

export default function WorkoutAndTestPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // توليد أيام الشهر (مثال: يناير 2026)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleDayClick = (day: number) => {
    const dateStr = `2026-01-${String(day).padStart(2, "0")}`;
    const event = events.find(ev => ev.date === dateStr);
    if (event) {
      // توجيه لصفحة تفاصيل التمرين/الاختبار
      window.location.href = `/referee/workoutAndTest/${dateStr}`;
    }
  };

  return (
    <div>
      <h2 className={styles.pageTitle}>التمارين والاختبارات</h2>
      <div className={styles.calendar}>
        {daysInMonth.map(day => {
          const dateStr = `2026-01-${String(day).padStart(2, "0")}`;
          const event = events.find(ev => ev.date === dateStr);
          let bgColor = "";
          if (event?.type === "exercise") bgColor = "#c8e6c9"; // أخضر فاتح
          if (event?.type === "test") bgColor = "#ffcdd2"; // أحمر فاتح

          return (
            <div
              key={day}
              className={styles.dayCell}
              style={{ backgroundColor: bgColor }}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
