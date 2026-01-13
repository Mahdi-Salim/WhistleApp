"use client";
import React, { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./events.module.css";
import Link from "next/link";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useWAT } from "@/context/WATContext";
import { WAT } from "@/types/WAT";
import { DisplayUser, EventWithUsers } from "@/types/displyUser";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
const getEventTypeLabel = (typeActivity: boolean) =>
  typeActivity ? "اختبار" : "تمرين";
const toLocalYMD = (d: Date) => d.toLocaleDateString("en-CA");
const getEventDateYMD = (dateField: string | Date) => {
  if (typeof dateField === "string") {
    return dateField.slice(0, 10);
  }
  return toLocalYMD(dateField);
};
export default function EventsPage() {
  const [date, setDate] = useState<Value>(new Date());
  const { events, loading, error } = useWAT();
  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const formattedDate = date.toLocaleDateString("en-CA");
      const dayEvents = events.filter((event) => event.Date === formattedDate);
      if (dayEvents.length > 0) {
        if (dayEvents.some((e) => e.TypeActivity === true)) {
          return styles.testDay;
        }
        if (dayEvents.some((e) => e.TypeActivity === false)) {
          return styles.workoutDay;
        }
      }
    }
    return null;
  };
  const selectedDateEvents = useMemo(() => {
    if (!(date instanceof Date)) return [];
    const selectedYMD = toLocalYMD(date);
    return events.filter((event) => getEventDateYMD(event.Date) === selectedYMD);
  }, [date, events]);
  const mergedEvents: EventWithUsers[] = useMemo(() => {
    const map = new Map<number, EventWithUsers>();
    for (const ev of selectedDateEvents) {
      if (!map.has(ev.id)) {
        const users: DisplayUser[] = [];
        if (ev.User) {
          if (Array.isArray(ev.User)) {
            users.push(...(ev.User as DisplayUser[]));
          } else {
            users.push(ev.User as DisplayUser);
          }
        }
        map.set(ev.id, { ...ev, User: users });
      } else {
        const existing = map.get(ev.id)!;
        const users: DisplayUser[] = Array.isArray(ev.User)
          ? (ev.User as DisplayUser[])
          : ev.User
          ? [ev.User as DisplayUser]
          : [];
        const combined = [...existing.User, ...users];
        const uniqueUsers = combined.filter(
          (u, index, arr) => arr.findIndex((x) => x.id === u.id) === index
        );
        existing.User = uniqueUsers;
        map.set(ev.id, existing);
      }
    }
    return Array.from(map.values());
  }, [selectedDateEvents]);

  const handleDateChange = (newDate: Value) => setDate(newDate);
  const thisDate = date instanceof Date ? date : new Date();

  return (
    <div className={styles.eventsPage}>
      <h1 className={styles.eventsTitle}>جدول التمارين والاختبارات</h1>
      <div className={styles.topControls}>
        <Link href={`/admin/events/new?date=${toLocalYMD(thisDate)}`} passHref>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            إضافة حدث جديد
          </Button>
        </Link>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.calendarContainer}>
          <div className={styles.calendarWrapper}>
            <Calendar
              onChange={handleDateChange}
              value={date}
              locale="ar-SA"
              tileClassName={getTileClassName}
            />
          </div>
        </div>
        <div className={styles.eventsListContainer}>
          <h2 className={styles.selectedDateTitle}>
            أحداث يوم:{" "}
            {thisDate.toLocaleDateString("ar-EG", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>
          {loading ? (
            <p>جاري التحميل...</p>
          ) : error ? (
            <p className={styles.errorMessage}>{error}</p>
          ) : mergedEvents.length > 0 ? (
            mergedEvents.map((event) => {
              const eventDate = new Date(event.Date);
              const now = new Date();
              const hasPassed =
                now > new Date(eventDate.getTime() + 24 * 60 * 60 * 1000);
              const displayUsers: DisplayUser[] = event.User;
              return (
                <div key={event.id} className={styles.eventCard}>
                  <div className={styles.eventHeader}>
                    <span className={styles.eventType}>
                      {getEventTypeLabel(event.TypeActivity)}
                    </span>
                    <div className={styles.eventTime}>
                      <AccessTimeIcon
                        fontSize="small"
                        style={{ verticalAlign: "middle", marginLeft: "4px" }}
                      />
                      {event.Time}
                    </div>
                  </div>
                  <div className={styles.eventLocation}>
                    <LocationOnIcon fontSize="small" />
                    {event.Court?.courtName}
                  </div>
                  <p className={styles.eventDescription}>
                    المستخدمون المشاركون:{" "}
                    {displayUsers.length > 0
                      ? displayUsers.map((u) => u.username).join(", ")
                      : "—"}
                  </p>
                  <div className={styles.eventActions}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => console.log("حذف:", event.id)}
                    >
                      حذف
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => console.log("تعديل:", event.id)}
                    >
                      تعديل
                    </Button>
                    {event.TypeActivity === true && (
                      <Link
                        href={{
                          pathname: "/admin/testresult",
                          query: {
                            watId: event.id,
                            user: JSON.stringify(displayUsers),
                          },
                        }}
                        passHref
                      >
                        <Button
                          variant="contained"
                          color="success"
                          disabled={!hasPassed}
                        >
                          إضافة النتائج
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.noEvents}>
              <p>لا توجد أحداث مجدولة لهذا اليوم.</p>
              <Link href={`/admin/events/new?date=${toLocalYMD(thisDate)}`}>
                <Button variant="text" color="primary">
                  إضافة حدث في هذا اليوم
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}