"use client";
import { useState, useEffect, use } from "react";
import styles from "./reportDetail.module.css";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

type Player = {
  id?: number;
  name: string;
  num: number;
};
type TeamData = {
  id: number;
  TeamName: string;
  Players: Player[];
};
export default function AdminMatchReportPage({ params }: { params: Promise<{ id: string }> }) {
  const [loading, setLoading] = useState(true);
  const [matchInfo, setMatchInfo] = useState<any>(null);
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [teamStats, setTeamStats] = useState<any>({});
  const router = useRouter();
  const resolvedParams = use(params);

  useEffect(() => {
    if (!resolvedParams.id) return;

    const fetchData = async () => {
      try {
        const matchRes = await api.get(`/api/match/getOneMatch/${resolvedParams.id}`);
        const match = matchRes.data;
        const matchTeamsRes = await api.get(`/api/matchTeams/getTeamsOfMatch/${resolvedParams.id}`);
        const matchTeamIds = matchTeamsRes.data.map((mt: any) => mt.TeamId);
        const allTeamsRes = await api.get("/api/team/getAllTeams");
        const allTeams = allTeamsRes.data.data;
        const myTeams = allTeams.filter((t: any) => matchTeamIds.includes(t.id));
        setMatchInfo(match);
        setTeams(myTeams);
        const initialStats: any = {};
        myTeams.forEach((team: any) => {
            initialStats[team.id] = {};
            if (Array.isArray(team.Players)) {
                team.Players.forEach((p: any) => {
                    const key = p.num || p.id || Math.random(); 
                    initialStats[team.id][key] = { 
                        goals: Math.floor(Math.random() * 2) > 0 ? "1" : "", 
                        onGoal: "", 
                        yellow: "", 
                        red: "", 
                        sub: "" 
                    };
                });
            }
        });
        setTeamStats(initialStats);

      } catch (err) {
        console.error("Error loading report data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.id]);

  if (loading) return <div className={styles.loading}>Loading Report...</div>;

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backButton}>&larr; Back to Reports</button>
      
      <div className={styles.header}>
        <h1>Match Report</h1>
        <div className={styles.matchInfo}>
            <span>Date: {matchInfo?.Date}</span>
            <span>Time: {matchInfo?.time}</span>
            <span>Court ID: {matchInfo?.CourtId}</span>
        </div>
      </div>

      <div className={styles.tablesContainer}>
        {teams.map((team) => (
            <div key={team.id} className={styles.teamSection}>
                <h2 className={styles.teamName}>{team.TeamName}</h2>
                <table className={styles.statsTable}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Player Name</th>
                            <th>Goals</th>
                            <th>On Goal</th>
                            <th>Yellow</th>
                            <th>Red</th>
                            <th>Sub</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.Players && team.Players.map((player: any) => {
                            const pKey = player.num || player.id;
                            const stats = teamStats[team.id]?.[pKey] || {};
                            return (
                                <tr key={pKey}>
                                    <td>{player.num}</td>
                                    <td>{player.name}</td>
                                    <td className={styles.statCell}>{stats.goals || "-"}</td>
                                    <td className={styles.statCell}>{stats.onGoal || "-"}</td>
                                    <td className={`${styles.statCell} ${stats.yellow ? styles.yellowCard : ''}`}>{stats.yellow || "-"}</td>
                                    <td className={`${styles.statCell} ${stats.red ? styles.redCard : ''}`}>{stats.red || "-"}</td>
                                    <td className={styles.statCell}>{stats.sub || "-"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        ))}
      </div>
    </div>
  );
}