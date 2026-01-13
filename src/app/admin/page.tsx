"use client";
import React from 'react';
import styles from './DashboardPage.module.css'; // We will create this CSS module
import KpiCard from '@/components/Dashboard/KpiCard';
import PeopleIcon from '@mui/icons-material/People';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
 function AdminDashboardPage() {
  const kpiData = [
    { title: "Referees", value: 120, icon: PeopleIcon, change: "+5%", changeType: "increase" },
    { title: "Matches", value: 45, icon: SportsSoccerIcon, change: "-2%", changeType: "decrease" },
    { title: "Average Evaluation", value: "7.5/10", icon: StarHalfIcon, change: "0%", changeType: "neutral" },
    { title: "Avilable Referees", value: 85, icon: EventAvailableIcon, change: "+10", changeType: "increase" },
  ];
  return (
    <div className={styles.dashboardPage}>
      <h1 className={styles.dashboardTitle}>Home Page</h1>
      <div className={styles.kpiCardsContainer}>
        {kpiData.map((kpi, index) => (
          <KpiCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            change={kpi.change}
            changeType={kpi.changeType as 'increase' | 'decrease' | 'neutral'}
          />
        ))}
      </div>
      <div className={styles.dashboardSection}>
        {}
        <h2>stats</h2>
        {}
      </div>

      <div className={styles.dashboardSection}>
        {}
        <h2>Upcoming Matches</h2>
        {}
      </div>
      <div className={styles.dashboardSection}>
        {}
        <h2>Last Activities</h2>
        {}
      </div>
    </div>
  );
}
export default AdminDashboardPage;