"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import styles from "./reports.module.css";

interface Match {
  id: number;
  Date: string;
  time: string;
  CourtId?: number;
  homeTeamName?: string;
  awayTeamName?: string;
}

interface Team {
  id: number;
  TeamName: string;
}

interface MatchTeam {
  TeamId: number;
}

export default function AdminReportsPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get("/api/match/getAllMatches");
        const data = res.data as Match[];

        try {
          const teamsRes = await api.get("/api/team/getAllTeams");
          const allTeams = teamsRes.data.data as Team[];

          await Promise.all(
            data.map(async (m) => {
              try {
                const mtRes = await api.get(
                  `/api/matchTeams/getTeamsOfMatch/${m.id}`
                );

                const matchTeamIds = (mtRes.data as MatchTeam[]).map(
                  (mt) => mt.TeamId
                );
                const matchTeams = allTeams.filter((t) =>
                  matchTeamIds.includes(t.id)
                );

                if (matchTeams.length > 0)
                  m.homeTeamName = matchTeams[0].TeamName;

                if (matchTeams.length > 1)
                  m.awayTeamName = matchTeams[1].TeamName;
              } catch {}
            })
          );
        } catch (e) {
          console.error("Failed to fetch team details", e);
        }

        setMatches(data);
      } catch (error) {
        console.error("Failed to fetch matches", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);
  const totalMatches = matches.length;

const upcomingMatches = matches.filter((m) => {
  const matchDate = new Date(m.Date);
  return matchDate > new Date();
}).length;

const todayMatches = matches.filter((m) => {
  const today = new Date().toISOString().slice(0, 10);
  return m.Date.slice(0, 10) === today;
}).length;
  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      const matchText = `${m.homeTeamName || ""} ${m.awayTeamName || ""}`.toLowerCase();

      const matchSearch =
        search === "" || matchText.includes(search.toLowerCase());

      const matchDate =
        dateFilter === "" || m.Date.slice(0, 10) === dateFilter;

      return matchSearch && matchDate;
    });
  }, [matches, search, dateFilter]);

  if (loading)
    return <div className={styles.container}>Loading reports...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>إدارة التقارير</h1>
      {/* ================= KPI HEADER ================= */}
<div className={styles.kpiRow}>
  <div className={styles.kpiCard}>
    <span className={styles.kpiValue}>{totalMatches}</span>
    <span className={styles.kpiLabel}>إجمالي المباريات</span>
  </div>

  <div className={styles.kpiCard}>
    <span className={styles.kpiValue}>{upcomingMatches}</span>
    <span className={styles.kpiLabel}>مباريات قادمة</span>
  </div>

  <div className={styles.kpiCard}>
    <span className={styles.kpiValue}>{todayMatches}</span>
    <span className={styles.kpiLabel}>مباريات اليوم</span>
  </div>
</div>

      {/* ================= FILTERS ================= */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="بحث عن فريق..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className={styles.input}
        />

        <button
          className={styles.resetButton}
          onClick={() => {
            setSearch("");
            setDateFilter("");
          }}
        >
          Reset
        </button>
      </div>

      {/* ================= GRID ================= */}
      <div className={styles.grid}>
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <div key={match.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span>{match.Date}</span>
                <span>{match.time}</span>
              </div>

              <div className={styles.teams}>
                {match.homeTeamName || "TBD"} vs{" "}
                {match.awayTeamName || "TBD"}
              </div>

              <button
                className={styles.viewButton}
                onClick={() => router.push(`/admin/reports/${match.id}`)}
              >
                View Report
              </button>
            </div>
          ))
        ) : (
          <p className={styles.noData}>لا توجد نتائج مطابقة</p>
        )}
      </div>
    </div>
  );
}