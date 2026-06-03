"use client";
import React, { useState, useEffect, useMemo } from 'react';
import styles from "./matches.module.css";
import Link from "next/link";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { matchService, Match } from '@/services/matchService';
import { courtService } from '@/services/CourtService';
import { Court } from '@/types/court';

const MatchCard: React.FC<{ match: Match, courtName: string, onDelete: (id: number) => void }> = ({ match, courtName, onDelete }) => {
    const handleDelete = () => {
        if (!onDelete) return;
        const confirmDelete = window.confirm(
          `هل أنت متأكد أنك تريد إلغاء المباراة؟`
        );
        if (confirmDelete) {
          onDelete(match.id);
        }
      };

    return (
      <div className={styles.matchCard}>
        <div className={styles.matchHeader}>
            <span className={styles.teamName}>الفريق الأول</span>
            <span className={styles.vsText}>vs</span>
            <span className={styles.teamName}>الفريق الثاني</span>
        </div>
        <p className={styles.matchDetails}>
            <span className={styles.detailLabel}>التاريخ:</span> {new Date(match.Date).toLocaleDateString()}
        </p>
        <p className={styles.matchDetails}>
            <span className={styles.detailLabel}>الوقت:</span> {match.time}
        </p>
        <p className={styles.matchDetails}>
            <span className={styles.detailLabel}>المكان:</span> {courtName}
        </p>
         <p className={styles.matchDetails}>
            <span className={styles.detailLabel}>النوع:</span> {match.MatchType ? 'رسمية' : 'ودية'}
        </p>

        <div className={styles.buttonRow}>
            <Button variant="contained" className={styles.deleteButton} onClick={handleDelete}>
                إلغاء المباراة
            </Button>
        </div>
      </div>
    );
  };
export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matchesData, courtsData] = await Promise.all([
          matchService.getAll(),
          courtService.getAll()
        ]);
        setMatches(matchesData);
        setCourts(courtsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await matchService.delete(id);
      setMatches(matches.filter((match) => match.id !== id));
    } catch (error) {
      alert("فشل في حذف المباراة");
    }
  };

  const getCourtName = (courtId: number) => {
    const court = courts.find(c => c.id === courtId);
    return court ? court.courtName : 'غير محدد';
  };

  const filteredMatches = useMemo(() => {
    if (!searchTerm) {
      return matches;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return matches.filter(match => {
        const courtName = getCourtName(match.CourtId).toLowerCase();
        return courtName.includes(lowerCaseSearchTerm) ||
               match.Date.includes(lowerCaseSearchTerm);
    });
  }, [matches, searchTerm, courts]);

  if (loading) return <div className={styles.matchesPage}><p>جاري التحميل...</p></div>;

  return (
    <div className={styles.matchesPage}>
      <h1 className={styles.matchesTitle}>إدارة المباريات</h1>

      <div className={styles.topControls}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="البحث عن مباراة...."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.addMatchContainer}>
          <Link href="/admin/matches/new" passHref>
            <Button variant="contained" color="primary" startIcon={<AddIcon />}
            className={styles.createMatchButton}>
              إنشاء مباراة جديدة
            </Button>
          </Link>
        </div>
      </div>

      <div className={styles.matchesGrid}>
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <MatchCard 
                key={match.id} 
                match={match} 
                courtName={getCourtName(match.CourtId)}
                onDelete={handleDelete} 
            />
          ))
        ) : (
          <p className={styles.noMatchesFound}>لا توجد مباريات مطابقة لمعايير البحث.</p>
        )}
      </div>
    </div>
  );
}

