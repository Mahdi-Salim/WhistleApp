
"use client";

import React, { useState, useEffect } from 'react';
import styles from "./addMatch.module.css";
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { teamService } from '@/services/teamservice';
import { refereeService } from '@/services/refereeService';
import { courtService } from '@/services/CourtService';
import { degreeService } from '@/services/degreeService';
import { matchService } from '@/services/matchService';
import { assessorService } from '@/services/assessorService';
import api from '@/lib/axios';
import { Team } from '@/types/teams';
import { RefereeWithUser } from '@/types/referee';
import { Court } from '@/types/court';
import { Degree } from '@/services/degreeService';
import { User } from '@/types/user';

type Option = {
  id: number;
  label: string;
};

export default function AddNewMatchPage() {
  const router = useRouter();
  
  // Data State
  const [teams, setTeams] = useState<Team[]>([]);
  const [referees, setReferees] = useState<RefereeWithUser[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [assessors, setAssessors] = useState<User[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Form State
  const [match, setMatch] = useState({
    homeTeamId: 0,
    awayTeamId: 0,
    date: '',
    time: '',
    courtId: 0, // Changed from stadium string to courtId number
    degreeId: 0, // New field
    matchType: true, // true = Official, false = Friendly
    refereeId: 0,
    assistantReferee1Id: 0,
    assistantReferee2Id: 0,
    fourthOfficialId: 0,
    varRefereeId: 0,
    assessorId: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [searchValues, setSearchValues] = useState<Record<string, string>>({
    homeTeamId: '',
    awayTeamId: '',
    courtId: '',
    degreeId: '',
    matchType: 'رسمية',
    refereeId: '',
    assistantReferee1Id: '',
    assistantReferee2Id: '',
    fourthOfficialId: '',
    assessorId: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsData, refereesData, courtsData, degreesData, assessorsData] = await Promise.all([
          teamService.getAll(),
          refereeService.getAll(),
          courtService.getAll(),
          degreeService.getAll(),
          assessorService.getAll(),
        ]);
        setTeams(teamsData);
        setReferees(refereesData);
        setCourts(courtsData);
        setDegrees(degreesData);
        setAssessors(assessorsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("فشل في جلب البيانات اللازمة. يرجى التأكد من الاتصال بالخادم.");
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMatch((prevMatch) => ({
      ...prevMatch,
      [name]: name.includes('Id') || name === 'courtId' || name === 'degreeId' 
        ? (value ? Number(value) : 0) 
        : name === 'matchType' ? value === 'true'
        : value,
    }));
  };

  const updateSearchValue = (name: string, value: string) => {
    setSearchValues((prev) => ({ ...prev, [name]: value }));
  };

  const getSelectedUserIds = (excludeField?: string) => {
    const userFields: Array<keyof typeof match> = [
      'refereeId',
      'assistantReferee1Id',
      'assistantReferee2Id',
      'fourthOfficialId',
      'assessorId',
    ];
    return userFields
      .filter((field) => field !== excludeField)
      .map((field) => match[field])
      .filter((id): id is number => Boolean(id));
  };

  const getSelectedTeamIds = (excludeField?: string) => {
    const teamFields: Array<keyof typeof match> = ['homeTeamId', 'awayTeamId'];
    return teamFields
      .filter((field) => field !== excludeField)
      .map((field) => match[field])
      .filter((id): id is number => Boolean(id));
  };

  const handleSearchSelect = (
    name: string,
    value: string,
    options: Option[],
    type: 'team' | 'user' | 'normal'
  ) => {
    updateSearchValue(name, value);
    const selectedOption = options.find(
      (option) => option.label.toLowerCase() === value.trim().toLowerCase()
    );

    if (!value.trim()) {
      setMatch((prev) => ({ ...prev, [name]: 0 }));
      return;
    }

    if (!selectedOption) {
      return;
    }

    if (type === 'team') {
      const selectedTeams = getSelectedTeamIds(name);
      if (selectedTeams.includes(selectedOption.id)) {
        setError('لا يمكن اختيار نفس الفريق في أكثر من خانة.');
        return;
      }
    }

    if (type === 'user') {
      const selectedUsers = getSelectedUserIds(name);
      if (selectedUsers.includes(selectedOption.id)) {
        setError('لا يمكن اختيار نفس المستخدم في أكثر من خانة.');
        return;
      }
    }

    setError(null);
    setMatch((prev) => ({ ...prev, [name]: selectedOption.id }));
  };

  const isDuplicateUserSelection = () => {
    const userIds = [
      match.refereeId,
      match.assistantReferee1Id,
      match.assistantReferee2Id,
      match.fourthOfficialId,
      match.assessorId,
    ].filter((id): id is number => Boolean(id));
    return new Set(userIds).size !== userIds.length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!match.date || !match.time || !match.courtId || !match.degreeId) {
      setError("الرجاء تعبئة جميع الحقول الأساسية (التاريخ، الوقت، الملعب، الدرجة).");
      return;
    }

    // Resolve selected court/degree from visible datalist text first, then fallback to stored ids.
    // This avoids stale ids when user edits text manually in datalist-backed inputs.
    const selectedCourt =
      courtsWithIds.find(
        (court) =>
          court.courtName.trim().toLowerCase() ===
          String(searchValues.courtId || "").trim().toLowerCase()
      ) || courtsWithIds.find((court) => court.id === Number(match.courtId));

    const selectedDegree =
      degreesWithIds.find(
        (degree) =>
          degree.TypeOfDegree.trim().toLowerCase() ===
          String(searchValues.degreeId || "").trim().toLowerCase()
      ) || degreesWithIds.find((degree) => degree.id === Number(match.degreeId));

    if (!selectedCourt || !selectedDegree) {
      setError("الرجاء اختيار ملعب ودرجة من القائمة المتاحة فقط.");
      return;
    }

    if (match.homeTeamId && match.awayTeamId && match.homeTeamId === match.awayTeamId) {
        setError("لا يمكن أن يكون الفريقان متماثلين.");
        return;
    }

    if (isDuplicateUserSelection()) {
      setError("لا يمكن اختيار نفس المستخدم في أكثر من خانة.");
      return;
    }

    try {
      // Server-side existence check before creating the match.
      // This catches stale/invalid foreign keys early and shows a clear message.
      await Promise.all([
        api.get(`/api/court/getOneCourt/${selectedCourt.id}`),
        api.get(`/api/degree/getOneDegree/${selectedDegree.id}`),
      ]);

    
      const payload = {
        Date: match.date,
        Time: match.time.length === 5 ? `${match.time}:00` : match.time, 
        CourtId: Number(selectedCourt.id),
        DegreeId: Number(selectedDegree.id),
        MatchType: Boolean(match.matchType),
      };

      console.log("Sending Create Match Payload:", payload);

      const newMatch = await matchService.create(payload);
      const matchId = newMatch.id;

      // 2. Assign Teams to Match
      const teamPromises = [];
      if (match.homeTeamId) {
        teamPromises.push(
          api.post('/api/matchTeams/addTeamToMatch', {
            MatchId: matchId,
            TeamId: match.homeTeamId
          })
        );
      }
      if (match.awayTeamId) {
        teamPromises.push(
          api.post('/api/matchTeams/addTeamToMatch', {
            MatchId: matchId,
            TeamId: match.awayTeamId
          })
        );
      }
      await Promise.all(teamPromises);

      // 3. Assign Referees
      // Collect all referee IDs, filter out empty/zeros and duplicates
      const refereeIds = [
        match.refereeId,
        match.assistantReferee1Id,
        match.assistantReferee2Id,
        match.fourthOfficialId,
      
      ].filter((id, index, self) => id && id !== 0 && self.indexOf(id) === index);

      // Assign each referee
      for (const refId of refereeIds) {
        try {
            await api.post('/api/assignment/assigningATaskToReferee', {
                MatchId: matchId,
                UserId: refId
            });
        } catch (err: any) {
            console.error(`Failed to assign referee ${refId}:`, err.response?.data?.message || err.message);
            // Optional: alert user or collect errors
        }
      }

      // 4. Assign Assessor
      if (match.assessorId) {
        try {
            await api.post('/api/assignment/assigningTaskToAssessor', {
                MatchId: matchId,
                UserId: match.assessorId
            });
        } catch (err: any) {
             console.error(`Failed to assign assessor ${match.assessorId}:`, err.response?.data?.message || err.message);
        }
      }

      alert("تم إنشاء المباراة وتعيين الحكام والفرق بنجاح.");
      router.push('/admin/matches');
    } catch (apiError: any) {
      console.error("Add Match API error:", apiError);
      
      // Extract the exact message from the backend
      const responseMsg = apiError.response?.data?.message;
      const responseErrors =
        apiError.response?.data?.error?.message ||
        apiError.response?.data?.error?.sqlMessage ||
        apiError.response?.data?.error;
      const fallbackMsg = apiError.message || "حدث خطأ أثناء إنشاء المباراة.";
      let displayMsg = responseMsg || responseErrors || fallbackMsg;

      // Show alert for immediate feedback (debugging)
      // This ensures you see the error even if the UI doesn't update fast enough
      alert(`خطأ: ${displayMsg}`);

      // Translate common backend errors for the UI
      if (displayMsg === "this court in this time is confined") {
        displayMsg = "هذا الملعب مشغول في هذا الوقت (أو قبله/بعده بساعتين). يرجى اختيار وقت آخر أو ملعب آخر.";
      } else if (displayMsg === "court not found") {
        displayMsg = "الملعب المحدد غير موجود في قاعدة البيانات. اختر ملعبًا آخر أو أعد تحميل الصفحة.";
      } else if (displayMsg === "Degree not found") {
        displayMsg = "الدرجة المحددة غير موجودة في قاعدة البيانات. اختر درجة أخرى أو أعد تحميل الصفحة.";
      } else if (displayMsg && displayMsg.includes("courtId/CourtId")) {
        displayMsg = "بيانات الملعب أو التاريخ غير مكتملة.";
      } else if (displayMsg && displayMsg.includes("foreign key constraint fails")) {
        displayMsg = "هناك تعارض في مرجع الملعب داخل قاعدة البيانات. جرّب ملعبًا آخر، وإذا استمرت المشكلة فهي تحتاج إصلاحًا في قاعدة البيانات.";
      }
      
      setError(displayMsg);
    }
  };

  const handleCancel = () => {
    router.push('/admin/matches');
  };

  // Filter referees by specification (Assuming specification matches backend data)
  const mainReferees = referees; // .filter(r => r.specification === "Football Referee"); // Adjust filtering as needed
  const teamsWithIds = teams.filter((team): team is Team & { id: number } => typeof team.id === 'number');
  const refereesWithIds = referees.filter((ref): ref is RefereeWithUser & { id: number } => typeof ref.id === 'number');
  const assessorsWithIds = assessors.filter((assessor): assessor is User & { id: number } => typeof assessor.id === 'number');
  const courtsWithIds = courts.filter((court): court is Court & { id: number } => typeof court.id === 'number');
  const degreesWithIds = degrees.filter((degree): degree is Degree & { id: number } => typeof degree.id === 'number');

  useEffect(() => {
    setSearchValues((prev) => ({
      ...prev,
      homeTeamId: teams.find((team) => team.id === match.homeTeamId)?.TeamName || prev.homeTeamId,
      awayTeamId: teams.find((team) => team.id === match.awayTeamId)?.TeamName || prev.awayTeamId,
      courtId: courts.find((court) => court.id === match.courtId)?.courtName || prev.courtId,
      degreeId: degrees.find((degree) => degree.id === match.degreeId)?.TypeOfDegree || prev.degreeId,
      refereeId: referees.find((ref) => ref.id === match.refereeId)?.userName || prev.refereeId,
      assistantReferee1Id: referees.find((ref) => ref.id === match.assistantReferee1Id)?.userName || prev.assistantReferee1Id,
      assistantReferee2Id: referees.find((ref) => ref.id === match.assistantReferee2Id)?.userName || prev.assistantReferee2Id,
      fourthOfficialId: referees.find((ref) => ref.id === match.fourthOfficialId)?.userName || prev.fourthOfficialId,
      assessorId: assessors.find((assessor) => assessor.id === match.assessorId)?.userName || prev.assessorId,
    }));
  }, [match, teams, courts, degrees, referees, assessors]);
  
  if (loadingData) {
    return <div className={styles.addMatchContainer}><p>جاري تحميل البيانات...</p></div>;
  }

  return (
    <div className={styles.addMatchContainer}>
      <h1 className={styles.addMatchTitle}>إنشاء مباراة جديدة</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.addMatchForm}>
        {/* Teams Selection */}
        <div className={styles.formGroup}>
          <label htmlFor="homeTeamId" className={styles.formLabel}>الفريق الأول:</label>
          <input
            id="homeTeamId"
            name="homeTeamId"
            className={styles.formInput}
            value={searchValues.homeTeamId}
            onChange={(e) =>
              handleSearchSelect(
                'homeTeamId',
                e.target.value,
                teamsWithIds
                  .filter((team) => !getSelectedTeamIds('homeTeamId').includes(team.id))
                  .map((team) => ({ id: team.id, label: team.TeamName })),
                'team'
              )
            }
            list="homeTeamId-options"
            placeholder="اختر الفريق المضيف"
          />
          <datalist id="homeTeamId-options">
            {teamsWithIds
              .filter((team) => !getSelectedTeamIds('homeTeamId').includes(team.id))
              .filter((team) =>
                team.TeamName.toLowerCase().includes(searchValues.homeTeamId.toLowerCase())
              )
              .map((team) => (
                <option key={team.id} value={team.TeamName} />
              ))}
          </datalist>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="awayTeamId" className={styles.formLabel}>الفريق الثاني:</label>
          <input
            id="awayTeamId"
            name="awayTeamId"
            className={styles.formInput}
            value={searchValues.awayTeamId}
            onChange={(e) =>
              handleSearchSelect(
                'awayTeamId',
                e.target.value,
                teamsWithIds
                  .filter((team) => !getSelectedTeamIds('awayTeamId').includes(team.id))
                  .map((team) => ({ id: team.id, label: team.TeamName })),
                'team'
              )
            }
            list="awayTeamId-options"
            placeholder="اختر الفريق الضيف"
          />
          <datalist id="awayTeamId-options">
            {teamsWithIds
              .filter((team) => !getSelectedTeamIds('awayTeamId').includes(team.id))
              .filter((team) =>
                team.TeamName.toLowerCase().includes(searchValues.awayTeamId.toLowerCase())
              )
              .map((team) => (
                <option key={team.id} value={team.TeamName} />
              ))}
          </datalist>
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

        {/* Court and Degree */}
        <div className={styles.formGroup}>
          <label htmlFor="courtId" className={styles.formLabel}>الملعب:</label>
          <input
            id="courtId"
            name="courtId"
            className={styles.formInput}
            value={searchValues.courtId}
            onChange={(e) =>
              handleSearchSelect(
                'courtId',
                e.target.value,
                courtsWithIds.map((court) => ({ id: court.id, label: court.courtName })),
                'normal'
              )
            }
            list="courtId-options"
            placeholder="اختر الملعب"
            required
          />
          <datalist id="courtId-options">
            {courtsWithIds
              .filter((court) =>
                court.courtName.toLowerCase().includes(searchValues.courtId.toLowerCase())
              )
              .map((court) => (
                <option key={court.id} value={court.courtName} />
              ))}
          </datalist>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="degreeId" className={styles.formLabel}>الدرجة:</label>
          <input
            id="degreeId"
            name="degreeId"
            className={styles.formInput}
            value={searchValues.degreeId}
            onChange={(e) =>
              handleSearchSelect(
                'degreeId',
                e.target.value,
                degreesWithIds.map((degree) => ({ id: degree.id, label: degree.TypeOfDegree })),
                'normal'
              )
            }
            list="degreeId-options"
            placeholder="اختر درجة المباراة"
            required
          />
          <datalist id="degreeId-options">
            {degreesWithIds
              .filter((degree) =>
                degree.TypeOfDegree.toLowerCase().includes(searchValues.degreeId.toLowerCase())
              )
              .map((degree) => (
                <option key={degree.id} value={degree.TypeOfDegree} />
              ))}
          </datalist>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="matchType" className={styles.formLabel}>نوع المباراة:</label>
          <input
            id="matchType"
            name="matchType"
            className={styles.formInput}
            value={searchValues.matchType}
            onChange={(e) => {
              const value = e.target.value;
              setSearchValues((prev) => ({ ...prev, matchType: value }));
              if (value === 'رسمية') {
                setMatch((prev) => ({ ...prev, matchType: true }));
              } else if (value === 'ودية') {
                setMatch((prev) => ({ ...prev, matchType: false }));
              }
            }}
            list="matchType-options"
            placeholder="اختر نوع المباراة"
          />
          <datalist id="matchType-options">
            <option value="رسمية" />
            <option value="ودية" />
          </datalist>
        </div>

        {/* Referee Assignment */}
        <div className={styles.formGroup}>
          <label htmlFor="refereeId" className={styles.formLabel}>حكم الساحة:</label>
          <input
            id="refereeId"
            name="refereeId"
            className={styles.formInput}
            value={searchValues.refereeId}
            onChange={(e) =>
              handleSearchSelect(
                'refereeId',
                e.target.value,
                refereesWithIds
                  .filter((ref) => !getSelectedUserIds('refereeId').includes(ref.id))
                  .map((ref) => ({ id: ref.id, label: ref.userName })),
                'user'
              )
            }
            list="refereeId-options"
            placeholder="اختر حكم الساحة"
          />
          <datalist id="refereeId-options">
            {refereesWithIds
              .filter((ref) => !getSelectedUserIds('refereeId').includes(ref.id))
              .filter((ref) =>
                ref.userName.toLowerCase().includes(searchValues.refereeId.toLowerCase())
              )
              .map((ref) => (
                <option key={ref.id} value={ref.userName} />
              ))}
          </datalist>
        </div>

        {/* Other Referees... (Simplified for brevity, can add others similarly) */}

        <div className={styles.formGroup}>
          <label htmlFor="assistantReferee1Id" className={styles.formLabel}>حكم مساعد أول:</label>
          <input
            id="assistantReferee1Id"
            name="assistantReferee1Id"
            className={styles.formInput}
            value={searchValues.assistantReferee1Id}
            onChange={(e) =>
              handleSearchSelect(
                'assistantReferee1Id',
                e.target.value,
                refereesWithIds
                  .filter((ref) => !getSelectedUserIds('assistantReferee1Id').includes(ref.id))
                  .map((ref) => ({ id: ref.id, label: ref.userName })),
                'user'
              )
            }
            list="assistantReferee1Id-options"
            placeholder="اختر الحكم المساعد الأول"
          />
          <datalist id="assistantReferee1Id-options">
            {refereesWithIds
              .filter((ref) => !getSelectedUserIds('assistantReferee1Id').includes(ref.id))
              .filter((ref) =>
                ref.userName.toLowerCase().includes(searchValues.assistantReferee1Id.toLowerCase())
              )
              .map((ref) => (
                <option key={ref.id} value={ref.userName} />
              ))}
          </datalist>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="assistantReferee2Id" className={styles.formLabel}>حكم مساعد ثاني:</label>
          <input
            id="assistantReferee2Id"
            name="assistantReferee2Id"
            className={styles.formInput}
            value={searchValues.assistantReferee2Id}
            onChange={(e) =>
              handleSearchSelect(
                'assistantReferee2Id',
                e.target.value,
                refereesWithIds
                  .filter((ref) => !getSelectedUserIds('assistantReferee2Id').includes(ref.id))
                  .map((ref) => ({ id: ref.id, label: ref.userName })),
                'user'
              )
            }
            list="assistantReferee2Id-options"
            placeholder="اختر الحكم المساعد الثاني"
          />
          <datalist id="assistantReferee2Id-options">
            {refereesWithIds
              .filter((ref) => !getSelectedUserIds('assistantReferee2Id').includes(ref.id))
              .filter((ref) =>
                ref.userName.toLowerCase().includes(searchValues.assistantReferee2Id.toLowerCase())
              )
              .map((ref) => (
                <option key={ref.id} value={ref.userName} />
              ))}
          </datalist>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="fourthOfficialId" className={styles.formLabel}>الحكم الرابع:</label>
          <input
            id="fourthOfficialId"
            name="fourthOfficialId"
            className={styles.formInput}
            value={searchValues.fourthOfficialId}
            onChange={(e) =>
              handleSearchSelect(
                'fourthOfficialId',
                e.target.value,
                refereesWithIds
                  .filter((ref) => !getSelectedUserIds('fourthOfficialId').includes(ref.id))
                  .map((ref) => ({ id: ref.id, label: ref.userName })),
                'user'
              )
            }
            list="fourthOfficialId-options"
            placeholder="اختر الحكم الرابع"
          />
          <datalist id="fourthOfficialId-options">
            {refereesWithIds
              .filter((ref) => !getSelectedUserIds('fourthOfficialId').includes(ref.id))
              .filter((ref) =>
                ref.userName.toLowerCase().includes(searchValues.fourthOfficialId.toLowerCase())
              )
              .map((ref) => (
                <option key={ref.id} value={ref.userName} />
              ))}
          </datalist>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="assessorId" className={styles.formLabel}>مقيم الحكام:</label>
          <input
            id="assessorId"
            name="assessorId"
            className={styles.formInput}
            value={searchValues.assessorId}
            onChange={(e) =>
              handleSearchSelect(
                'assessorId',
                e.target.value,
                assessorsWithIds
                  .filter((assessor) => !getSelectedUserIds('assessorId').includes(assessor.id))
                  .map((assessor) => ({ id: assessor.id, label: assessor.userName })),
                'user'
              )
            }
            list="assessorId-options"
            placeholder="اختر مقيم الحكام"
          />
          <datalist id="assessorId-options">
            {assessorsWithIds
              .filter((assessor) => !getSelectedUserIds('assessorId').includes(assessor.id))
              .filter((assessor) =>
                assessor.userName.toLowerCase().includes(searchValues.assessorId.toLowerCase())
              )
              .map((assessor) => (
                <option key={assessor.id} value={assessor.userName} />
              ))}
          </datalist>
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

