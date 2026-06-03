"use client";
import React, { useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Calendar from "react-calendar";
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
  const groupedEvents = useMemo(() => {
    type GroupedEvent = {
      key: string;
      Date: string;
      Time: string;
      TypeActivity: boolean;
      CourtId: number;
      Court?: WAT["Court"];
      items: WAT[];
      users: DisplayUser[];
    };

    const map = new Map<string, GroupedEvent>();

    for (const ev of selectedDateEvents) {
      const ymd = getEventDateYMD(ev.Date);
      const key = `${ymd}|${ev.Time}|${ev.CourtId}|${ev.TypeActivity ? 1 : 0}`;

      const users: DisplayUser[] = [];
      if (ev.User) {
        if (Array.isArray(ev.User)) {
          users.push(...(ev.User as DisplayUser[]));
        } else {
          users.push(ev.User as DisplayUser);
        }
      }

      const existing = map.get(key);
      if (!existing) {
        map.set(key, {
          key,
          Date: ymd,
          Time: ev.Time,
          TypeActivity: ev.TypeActivity,
          CourtId: ev.CourtId,
          Court: ev.Court,
          items: [ev],
          users,
        });
        continue;
      }

      existing.items.push(ev);
      const combined = [...existing.users, ...users];
      existing.users = combined.filter(
        (u, index, arr) => arr.findIndex((x) => x.id === u.id) === index
      );
      if (!existing.Court && ev.Court) existing.Court = ev.Court;
    }

    return Array.from(map.values());
  }, [selectedDateEvents]);

  const handleDateChange = (newDate: Value) => setDate(newDate);
  const thisDate = date instanceof Date ? date : new Date();
 return (
  <div className={styles.eventsPage}>
    <h1 className={styles.eventsTitle}>جدول التمارين والاختبارات</h1>

    <div className={styles.topControls}>
      <Link
        href={`/admin/events/new?date=${toLocalYMD(thisDate)}`}
        className={styles.actionLink}
      >
        <button className={styles.secondaryActionButton}>
          إضافة حدث جديد
        </button>
      </Link>
    </div>

    <div className={styles.contentContainer}>
      {/* ================= CALENDAR ================= */}
      <div className={styles.calendarContainer}>
        <div className={styles.calendarWrapper}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height="auto"
            selectable={true}
            dateClick={(info) => {
              setDate(new Date(info.dateStr));
            }}
            events={events.map((event) => ({
              title: event.TypeActivity ? "اختبار" : "تمرين",
              date: event.Date,
              backgroundColor: event.TypeActivity ? "#1b5e20" : "#2e7d32",
              borderColor: "#0f2e1c",
            }))}
          />
        </div>
      </div>

      {/* ================= EVENTS LIST ================= */}
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
        ) : groupedEvents.length > 0 ? (
          groupedEvents.map((group) => {
            const eventDate = new Date(group.Date);

            const now = new Date();
            const hasPassed =
              now > new Date(eventDate.getTime() + 24 * 60 * 60 * 1000);

            return (
              <div key={group.key} className={styles.eventCard}>
                {/* HEADER */}
                <div className={styles.eventHeader}>
                  <span className={styles.eventType}>
                    {getEventTypeLabel(group.TypeActivity)}
                  </span>

                  <div className={styles.eventTime}>
                    <AccessTimeIcon fontSize="small" />
                    {group.Time}
                  </div>
                </div>

                {/* LOCATION */}
                <div className={styles.eventLocation}>
                  <LocationOnIcon fontSize="small" />
                  {group.Court?.courtName}
                </div>

                {/* USERS */}
                <p className={styles.eventDescription}>
                  المستخدمون المشاركون:{" "}
                  {group.users.length > 0
                    ? group.users.map((u) => u.username).join(", ")
                    : "—"}
                </p>

                {/* ACTIONS */}
                <div className={styles.eventActions}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => console.log("حذف:", group.key)}
                  >
                    حذف
                  </button>

                  <button
                    className={styles.detailsButton}
                    onClick={() => console.log("تعديل:", group.key)}
                  >
                    تعديل
                  </button>

                  {/* TEST RESULTS */}
                  {group.TypeActivity === true && (
                    <div className={styles.resultButtons}>
                      {group.items.map((item) => {
                        const username = Array.isArray(item.User)
                          ? item.User[0]?.username
                          : item.User?.username;

                        return (
                          <Link
                            key={item.id}
                            href={{
                              pathname: "/admin/testresult",
                              query: { watId: item.id },
                            }}
                            className={styles.actionLink}
                           >
                            <button
                              className={styles.primaryActionButton}
                              disabled={!hasPassed}
                            >
                              إضافة نتيجة{" "}
                              {username
                                ? `(${username})`
                                : `(#${item.UserId})`}
                            </button>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.noEvents}>
            <p>لا توجد أحداث مجدولة لهذا اليوم.</p>

            <Link
              href={`/admin/events/new?date=${toLocalYMD(thisDate)}`}
              className={styles.actionLink}
            >
              <button className={styles.secondaryActionButton}>
                إضافة حدث في هذا اليوم
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
);
}
