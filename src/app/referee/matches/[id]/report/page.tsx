"use client";

import { useState } from "react";
import styles from "./report.module.css";

// بيانات وهمية حاليا
const matchData = {
  teams: ["الجيش", "الوحدة"],
  date: "18-01-2026",
  time: "15:00",
  stadium: "ملعب الفيحاء",
  referees: ["أحمد علي", "سامر", "كريم"],
  refereeEvaluator: "محمد حيدر",
  teamPlayers: {
    "الجيش": [
      { number: 1, name: "لاعب 1" },
      { number: 2, name: "لاعب 2" },
      { number: 3, name: "لاعب 3" }
    ],
    "الوحدة": [
      { number: 4, name: "لاعب 4" },
      { number: 5, name: "لاعب 5" },
      { number: 6, name: "لاعب 6" }
    ]
  },
  teamStaff: {
    "الجيش": ["مدرب: حسام", "مساعد: علي"],
    "الوحدة": ["مدرب: فهد", "مساعد: كريم"]
  }
};

export default function MatchReportPage() {
  // إعداد حالة لكل الفريق: لكل لاعب أعمدة: goals, onGoal, yellow, red, sub
  const initialTeamState = (team: string) => {
    const state: any = {};
    matchData.teamPlayers[team].forEach(p => {
      state[p.number] = { goals: "", onGoal: "", yellow: "", red: "", sub: "" };
    });
    return state;
  };

  const [teamData, setTeamData] = useState({
    [matchData.teams[0]]: initialTeamState(matchData.teams[0]),
    [matchData.teams[1]]: initialTeamState(matchData.teams[1])
  });

  const handleInputChange = (team: string, playerNumber: number, field: string, value: string) => {
    setTeamData(prev => ({
      ...prev,
      [team]: {
        ...prev[team],
        [playerNumber]: {
          ...prev[team][playerNumber],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(teamData);
    alert("تم إرسال التقرير (راجع الـ console لمشاهدة البيانات)");
  };

  return (
    <div>
      <h2 className={styles.pageTitle}>تقرير المباراة</h2>

      {/* معلومات المباراة */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionTitle}>المباراة</div>
        <div>الفريقان: {matchData.teams[0]} × {matchData.teams[1]}</div>
        <div>التاريخ والوقت: {matchData.date} | {matchData.time}</div>
        <div>الملعب: {matchData.stadium}</div>
      </div>

      <div className={styles.sectionCard}>
        <div className={styles.sectionTitle}>الحكام</div>
        <div>الحكام: {matchData.referees.join(", ")}</div>
        <div>مقيم الحكام: {matchData.refereeEvaluator}</div>
      </div>

      <form onSubmit={handleSubmit}>
        {matchData.teams.map(team => (
          <div key={team} className={styles.sectionCard}>
            <div className={styles.sectionTitle}>تفاصيل {team}</div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>رقم اللاعب</th>
                  <th>الاسم</th>
                  <th>الأهداف</th>
                  <th>الأهداف العكسية</th>
                  <th className="yellow">إنذار</th>
                  <th className="red">طرد</th>
                  <th>تبديل</th>
                </tr>
              </thead>
              <tbody>
                {matchData.teamPlayers[team].map(player => (
                  <tr key={player.number}>
                    <td>{player.number}</td>
                    <td>{player.name}</td>
                    <td>
                      <input
                        type="text"
                        value={teamData[team][player.number].goals}
                        onChange={(e) => handleInputChange(team, player.number, "goals", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={teamData[team][player.number].onGoal}
                        onChange={(e) => handleInputChange(team, player.number, "onGoal", e.target.value)}
                      />
                    </td>
                    <td className="yellow">
                      <input
                        type="text"
                        value={teamData[team][player.number].yellow}
                        onChange={(e) => handleInputChange(team, player.number, "yellow", e.target.value)}
                      />
                    </td>
                    <td className="red">
                      <input
                        type="text"
                        value={teamData[team][player.number].red}
                        onChange={(e) => handleInputChange(team, player.number, "red", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={teamData[team][player.number].sub}
                        onChange={(e) => handleInputChange(team, player.number, "sub", e.target.value)}
                      />
                    </td>
                  </tr>
                ))}

                {/* إضافة الكادر تحت اللاعبين */}
                {matchData.teamStaff[team].map((staff, idx) => (
                  <tr key={`staff-${idx}`}>
                    <td colSpan={2}>{staff}</td>
                    <td className="yellow"><input type="text" placeholder="إنذار"/></td>
                    <td className="red"><input type="text" placeholder="طرد"/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <div className={styles.sectionCard}>
          <div className={styles.sectionTitle}>ملاحظات إضافية</div>
          <textarea
            className={styles.textAreaField}
            placeholder="أي ملاحظات إضافية"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          إرسال التقرير
        </button>
      </form>
    </div>
  );
}
