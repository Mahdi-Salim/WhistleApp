// whistleapp/src/app/admin/matches/page.tsx
"use client";

import React, { useState, useMemo } from 'react';
import styles from "./matches.module.css";
import Link from "next/link";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
// import MatchCard from "@/components/Matches/MatchCard"; // Will be created later

// Basic interfaces for Team and Referee (you might want to import these from a shared types file)
interface BasicTeam {
  id: number;
  name: string;
  logoUrl?: string;
}

interface BasicReferee {
  id: number;
  name: string;
}

// Define the Match interface
interface Match {
  id: number;
  date: Date;
  time: string; // e.g., "15:00"
  location: string;
  homeTeam: BasicTeam;
  awayTeam: BasicTeam;
  mainReferee: BasicReferee | null;
  assistantReferee1: BasicReferee | null;
  assistantReferee2: BasicReferee | null;
  fourthOfficial: BasicReferee | null;
  varReferee: BasicReferee | null; // Optional
  status: 'scheduled' | 'played' | 'cancelled' | 'postponed';
  score?: string; // Optional, e.g., "2-1"
  notes?: string; // Optional
}

// Dummy data for teams (for dropdowns)
const dummyTeams: BasicTeam[] = [
  { id: 1, name: "Al-Hilal", logoUrl: "/images/team_hilal.png" },
  { id: 2, name: "Al-Nassr", logoUrl: "/images/team_nassr.png" },
  { id: 3, name: "Al-Ittihad", logoUrl: "/images/team_ittihad.png" },
];

// Dummy data for referees (for dropdowns)
const dummyReferees: BasicReferee[] = [
  { id: 101, name: "Ahmad Ali" },
  { id: 102, name: "Sami Hassan" },
  { id: 103, name: "Omar Khaled" },
];


// Dummy data for matches
const initialMatches: Match[] = [
  {
    id: 1,
    date: new Date('2025-12-25'),
    time: "18:00",
    location: "King Fahd Stadium",
    homeTeam: dummyTeams[0], // Al-Hilal
    awayTeam: dummyTeams[1], // Al-Nassr
    mainReferee: dummyReferees[0],
    assistantReferee1: dummyReferees[1],
    assistantReferee2: dummyReferees[2],
    fourthOfficial: null,
    varReferee: null,
    status: 'scheduled',
    notes: "Important league match.",
  },
  {
    id: 2,
    date: new Date('2025-12-26'),
    time: "20:30",
    location: "Prince Abdullah Al-Faisal Stadium",
    homeTeam: dummyTeams[2], // Al-Ittihad
    awayTeam: dummyTeams[0], // Al-Hilal
    mainReferee: dummyReferees[1],
    assistantReferee1: dummyReferees[0],
    assistantReferee2: null,
    fourthOfficial: null,
    varReferee: dummyReferees[2],
    status: 'scheduled',
    notes: "Cup quarter-final.",
  },
  {
    id: 3,
    date: new Date('2025-12-20'),
    time: "17:00",
    location: "Local Club Pitch",
    homeTeam: dummyTeams[1], // Al-Nassr
    awayTeam: dummyTeams[2], // Al-Ittihad
    mainReferee: dummyReferees[2],
    assistantReferee1: null,
    assistantReferee2: null,
    fourthOfficial: null,
    varReferee: null,
    status: 'played',
    score: '3-1',
  },
];

// Placeholder for MatchCard component - will be created separately
const MatchCard: React.FC<{ match: Match, onDelete: (id: number) => void }> = ({ match, onDelete }) => {
    const handleDelete = () => {
        if (!onDelete) return;
        const confirmDelete = window.confirm(
          `هل أنت متأكد أنك تريد إلغاء المباراة بين "${match.homeTeam.name}" و "${match.awayTeam.name}"؟`
        );
        if (confirmDelete) {
          onDelete(match.id);
        }
      };

    return (
      <div className={styles.matchCard}>
        <div className={styles.matchHeader}>
            <img src={match.homeTeam.logoUrl || "/images/placeholder.png"} alt={match.homeTeam.name} className={styles.teamLogo} />
            <span className={styles.teamName}>{match.homeTeam.name}</span>
            <span className={styles.vsText}>vs</span>
            <span className={styles.teamName}>{match.awayTeam.name}</span>
            <img src={match.awayTeam.logoUrl || "/images/placeholder.png"} alt={match.awayTeam.name} className={styles.teamLogo} />
        </div>
        <p className={styles.matchDetails}>
            <span className={styles.detailLabel}>التاريخ:</span> {match.date.toLocaleDateString()}
        </p>
        <p className={styles.matchDetails}>
            <span className={styles.detailLabel}>الوقت:</span> {match.time}
        </p>
        <p className={styles.matchDetails}>
            <span className={styles.detailLabel}>المكان:</span> {match.location}
        </p>
        <p className={styles.matchDetails}>
            <span className={styles.detailLabel}>الحكم الرئيسي:</span> {match.mainReferee?.name || 'لم يعين'}
        </p>
        <p className={styles.matchDetails}>
            <span className={styles.detailLabel}>الحالة:</span> {match.status === 'scheduled' ? 'مجدولة' : match.status === 'played' ? 'لعبت' : 'ملغاة'}
        </p>

        <div className={styles.buttonRow}>
            <Link href={`/admin/matches/edit/${match.id}`} passHref>
                <Button variant="contained" className={styles.detailsButton}>
                    عرض / تعديل
                </Button>
            </Link>
            <Button variant="contained" className={styles.deleteButton} onClick={handleDelete}>
                إلغاء المباراة
            </Button>
        </div>
      </div>
    );
  };


export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleDelete = (id: number) => {
    // In a real app, you would send a delete/cancel request to your API
    setMatches(matches.filter((match) => match.id !== id));
  };

  const filteredMatches = useMemo(() => {
    if (!searchTerm) {
      return matches;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return matches.filter(match =>
      match.homeTeam.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      match.awayTeam.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      match.location.toLowerCase().includes(lowerCaseSearchTerm) ||
      (match.mainReferee?.name.toLowerCase().includes(lowerCaseSearchTerm)) || // Search by referee name
      match.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [matches, searchTerm]);

  return (
    <div className={styles.matchesPage}>
      <h1 className={styles.matchesTitle}>إدارة المباريات</h1>

      <div className={styles.topControls}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="البحث عن مباراة (الفريق، المكان، الحكم، الحالة)..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.addMatchContainer}>
          <Link href="/admin/matches/new" passHref>
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              إضافة مباراة جديدة
            </Button>
          </Link>
        </div>
      </div>

      <div className={styles.matchesGrid}>
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} onDelete={handleDelete} />
          ))
        ) : (
          <p className={styles.noMatchesFound}>لا توجد مباريات مطابقة لمعايير البحث.</p>
        )}
      </div>
    </div>
  );
}

