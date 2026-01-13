// whistleapp/src/app/admin/matches/new/page.tsx
"use client";

import React, { useState } from 'react';
import styles from "./addMatch.module.css";
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

// Define interfaces for related entities (will be fetched from API in real app)
interface Team {
  id: number;
  name: string;
}

interface Referee {
  id: number;
  name: string;
  specification: string; // e.g., "Football Referee", "Assistant Referee"
}

interface Assessor {
  id: number;
  name: string;
}

// Define the Match interface
interface Match {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  stadium: string;
  refereeId: number | null;
  assistantReferee1Id: number | null;
  assistantReferee2Id: number | null;
  fourthOfficialId: number | null;
  varRefereeId: number | null; // Optional
  assessorId: number | null;
  status: 'scheduled' | 'played' | 'cancelled'; // Match status
}

// Dummy data for dropdowns (replace with API calls)
const dummyTeams: Team[] = [
  { id: 1, name: "Al-Hilal" },
  { id: 2, name: "Al-Nassr" },
  { id: 3, name: "Al-Ahli" },
  { id: 4, name: "Al-Ittihad" },
];

const dummyReferees: Referee[] = [
  { id: 101, name: "Ahmad Ali", specification: "Football Referee" },
  { id: 102, name: "Sami Hassan", specification: "Assistant Referee" },
  { id: 103, name: "Omar Khaled", specification: "Football Referee" },
  { id: 104, name: "Fatima Said", specification: "Fourth Official" },
  { id: 105, name: "Khalid Nasser", specification: "VAR Referee" },
  { id: 106, name: "Laila Fahad", specification: "Assistant Referee" },
];

const dummyAssessors: Assessor[] = [
  { id: 201, name: "Assessor A" },
  { id: 202, name: "Assessor B" },
];


export default function AddNewMatchPage() {
  const router = useRouter();
  const [match, setMatch] = useState<Omit<Match, 'id' | 'status'>>({
    homeTeamId: 0,
    awayTeamId: 0,
    date: '',
    time: '',
    stadium: '',
    refereeId: null,
    assistantReferee1Id: null,
    assistantReferee2Id: null,
    fourthOfficialId: null,
    varRefereeId: null,
    assessorId: null,
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMatch((prevMatch) => ({
      ...prevMatch,
      [name]: name.includes('Id') ? (value ? Number(value) : null) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!match.homeTeamId || !match.awayTeamId || !match.date || !match.time || !match.stadium || !match.refereeId) {
      setError("الرجاء تعبئة جميع الحقول الأساسية للمباراة وحكم الساحة.");
      return;
    }

    if (match.homeTeamId === match.awayTeamId) {
        setError("لا يمكن أن يكون الفريقان متماثلين.");
        return;
    }

    // Simulate API call to add a new match
    try {
      // Replace with your actual API endpoint for adding a match
      const response = await fetch('/api/matches', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...match, id: Math.floor(Math.random() * 1000) + 3, status: 'scheduled' }), // Add dummy id and status
      });

      if (response.ok) {
        const newMatchData = await response.json();
        console.log("Match created successfully:", newMatchData);
        alert("تم إنشاء المباراة بنجاح وسيتم إرسال الإشعارات.");
        // Simulate sending notifications (in a real app, this would be handled by backend)
        console.log(`Sending notifications for match ${newMatchData.id} to assigned officials.`);
        router.push('/admin/matches'); // Redirect to matches list page (will create later)
      } else {
        const errorData = await response.json();
        setError(errorData.message || "فشل في إنشاء المباراة. يرجى المحاولة مرة أخرى.");
      }
    } catch (apiError) {
      console.error("Add Match API error:", apiError);
      setError("حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.");
    }
  };

  const handleCancel = () => {
    router.push('/admin/matches'); // Redirect to matches list page
  };

  // Filter referees by specification for dropdowns
  const mainReferees = dummyReferees.filter(r => r.specification === "Football Referee");
  const assistantReferees = dummyReferees.filter(r => r.specification === "Assistant Referee");
  const fourthOfficials = dummyReferees.filter(r => r.specification === "Fourth Official");
  const varReferees = dummyReferees.filter(r => r.specification === "VAR Referee");

  return (
    <div className={styles.addMatchContainer}>
      <h1 className={styles.addMatchTitle}>إنشاء مباراة جديدة</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.addMatchForm}>
        {/* Teams Selection */}
        <div className={styles.formGroup}>
          <label htmlFor="homeTeamId" className={styles.formLabel}>الفريق الأول:</label>
          <select
            id="homeTeamId"
            name="homeTeamId"
            className={styles.formInput}
            value={match.homeTeamId || ''}
            onChange={handleInputChange}
            required
          >
            <option value="">اختر الفريق الأول</option>
            {dummyTeams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="awayTeamId" className={styles.formLabel}>الفريق الثاني:</label>
          <select
            id="awayTeamId"
            name="awayTeamId"
            className={styles.formInput}
            value={match.awayTeamId || ''}
            onChange={handleInputChange}
            required
          >
            <option value="">اختر الفريق الثاني</option>
            {dummyTeams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>

        {/* Date and Time */}
        <div className={styles.formGroup}>
          <label htmlFor="date" className={styles.formLabel}>التاريخ:</label>
          <input
            type="date"
            id="date"
            name="date"
            className={styles.formInput}
            value={match.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="time" className={styles.formLabel}>الوقت:</label>
          <input
            type="time"
            id="time"
            name="time"
            className={styles.formInput}
            value={match.time}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="stadium" className={styles.formLabel}>الملعب:</label>
          <input
            type="text"
            id="stadium"
            name="stadium"
            className={styles.formInput}
            placeholder="أدخل اسم الملعب"
            value={match.stadium}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Referee and Assessor Assignment */}
        <div className={styles.formGroup}>
          <label htmlFor="refereeId" className={styles.formLabel}>حكم الساحة:</label>
          <select
            id="refereeId"
            name="refereeId"
            className={styles.formInput}
            value={match.refereeId || ''}
            onChange={handleInputChange}
            required
          >
            <option value="">اختر حكم الساحة</option>
            {mainReferees.map(ref => (
              <option key={ref.id} value={ref.id}>{ref.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="assistantReferee1Id" className={styles.formLabel}>حكم مساعد أول:</label>
          <select
            id="assistantReferee1Id"
            name="assistantReferee1Id"
            className={styles.formInput}
            value={match.assistantReferee1Id || ''}
            onChange={handleInputChange}
          >
            <option value="">اختر حكم مساعد أول (اختياري)</option>
            {assistantReferees.map(ref => (
              <option key={ref.id} value={ref.id}>{ref.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="assistantReferee2Id" className={styles.formLabel}>حكم مساعد ثاني:</label>
          <select
            id="assistantReferee2Id"
            name="assistantReferee2Id"
            className={styles.formInput}
            value={match.assistantReferee2Id || ''}
            onChange={handleInputChange}
          >
            <option value="">اختر حكم مساعد ثاني (اختياري)</option>
            {assistantReferees.map(ref => (
              <option key={ref.id} value={ref.id}>{ref.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="fourthOfficialId" className={styles.formLabel}>الحكم الرابع:</label>
          <select
            id="fourthOfficialId"
            name="fourthOfficialId"
            className={styles.formInput}
            value={match.fourthOfficialId || ''}
            onChange={handleInputChange}
          >
            <option value="">اختر الحكم الرابع (اختياري)</option>
            {fourthOfficials.map(ref => (
              <option key={ref.id} value={ref.id}>{ref.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="varRefereeId" className={styles.formLabel}>حكم الفيديو (VAR):</label>
          <select
            id="varRefereeId"
            name="varRefereeId"
            className={styles.formInput}
            value={match.varRefereeId || ''}
            onChange={handleInputChange}
          >
            <option value="">اختر حكم الفيديو (اختياري)</option>
            {varReferees.map(ref => (
              <option key={ref.id} value={ref.id}>{ref.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="assessorId" className={styles.formLabel}>مقيم الحكام:</label>
          <select
            id="assessorId"
            name="assessorId"
            className={styles.formInput}
            value={match.assessorId || ''}
            onChange={handleInputChange}
          >
            <option value="">اختر مقيم الحكام (اختياري)</option>
            {dummyAssessors.map(assessor => (
              <option key={assessor.id} value={assessor.id}>{assessor.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            type="submit"
          >
            إنشاء المباراة
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<CancelIcon />}
            onClick={handleCancel}
          >
            إلغاء
          </Button>
        </div>
      </form>
    </div>
  );
}

