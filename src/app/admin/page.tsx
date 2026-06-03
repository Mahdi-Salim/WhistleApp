"use client";
import React, { useEffect, useState } from 'react';
import styles from './DashboardPage.module.css'; // We will create this CSS module
import KpiCard from '@/components/Dashboard/KpiCard';
import PeopleIcon from '@mui/icons-material/People';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ApartmentIcon from '@mui/icons-material/Apartment';
import api from '@/lib/axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardStats {
  totalForActiveReferees: number;
  totalReferees: number;
  totalRefereeAssessors: number;
  totalMatches: number;
  totalTeams: number;
  upcomingMatches: number;
}

interface Match {
  id: number;
  Date: string;
  time: string;
}

function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    // Check if user is admin
    const authUser = localStorage.getItem('authUser');
    if (authUser) {
      const user = JSON.parse(authUser);
      if (user.RoleId !== 1) {
        window.location.href = '/login';
        return;
      }
    } else {
        window.location.href = '/login';
        return;
    }

    const fetchData = async () => {
      try {
        // Fetch stats
        const statsResponse = await api.get('/api/admin/home');
        setStats(statsResponse.data.data);

        // Fetch matches for chart
        const matchesResponse = await api.get('/api/match/getAllMatches');
        const matches: Match[] = matchesResponse.data;

        processChartData(matches);

      } catch (error) {
        console.error("Failed to fetch admin dashboard data", error);
      } finally {
        setLoading(false);
      }
   const watResponse = await api.get("/api/wat/getAllWAT");

const allEvents = watResponse.data.data || watResponse.data;

setUpcomingEvents(
  allEvents
    .filter((event: any) => new Date(event.Date) >= new Date())
    .sort(
      (a: any, b: any) =>
        new Date(a.Date).getTime() -
        new Date(b.Date).getTime()
    )
    .slice(0, 5)
);
    };

    fetchData();
  }, []);

  const processChartData = (matches: Match[]) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Initialize counts for all days in the month (optional, but looks better)
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const dataCounts = new Array(daysInMonth).fill(0);

    matches.forEach(match => {
        const matchDate = new Date(match.Date);
        if (matchDate.getMonth() === currentMonth && matchDate.getFullYear() === currentYear) {
            const day = matchDate.getDate();
            if (day >= 1 && day <= daysInMonth) {
                dataCounts[day - 1]++;
            }
        }
    });

    setChartData({
        labels: labels.map(day => `${day}/${currentMonth + 1}`),
        datasets: [
            {
                label: 'Number of Matches',
                data: dataCounts,
                backgroundColor: 'rgba(27, 94, 32, 0.55)',
                borderColor: '#1b5e20',
                borderWidth: 1,
            },
        ],
    });
  };

  if (loading) {
    return <div className={styles.dashboardPage}>Loading...</div>;
  }

  const kpiData = [
    { 
      title: "Total Referees", 
      value: stats?.totalReferees || 0, 
      icon: PeopleIcon, 
      change: `Assessors: ${stats?.totalRefereeAssessors || 0}`, 
      changeType: "neutral" 
    },
    { 
      title: "Active Referees", 
      value: stats?.totalForActiveReferees || 0, 
      icon: EventAvailableIcon, 
      change: "Ready to assign", 
      changeType: "increase" 
    },
    { 
      title: "Total Matches", 
      value: stats?.totalMatches || 0, 
      icon: SportsSoccerIcon, 
      change: `Upcoming Today: ${stats?.upcomingMatches || 0}`, 
      changeType: "neutral" 
    },
    { 
      title: "Total Teams", 
      value: stats?.totalTeams || 0, 
      icon: ApartmentIcon, 
      change: "Registered", 
      changeType: "neutral" 
    },
  ];

  return (
    <div className={styles.dashboardPage}>
      <h1 className={styles.dashboardTitle}> Page</h1>
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

      <div className={styles.chartSection}>
        <h2 className={styles.chartTitle}>Matches This Month</h2>
        <div className={styles.chartContainer}>
            {chartData && <Bar 
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top' as const,
                        },
                        title: {
                            display: true,
                            text: 'Daily Match Count',
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }} 
                data={chartData} 
            />}
        </div>
      </div>
      <div className={styles.dashboardBottom}>

  <div className={styles.infoCard}>
    <h2>الأحداث القادمة</h2>

    {upcomingEvents.length > 0 ? (
      <div className={styles.eventsList}>
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className={styles.eventItem}
          >
            <div className={styles.eventBadge}>
              {event.TypeActivity
                ? "اختبار"
                : "تمرين"}
            </div>

            <div className={styles.eventInfo}>
              <div className={styles.eventDate}>
                {new Date(
                  event.Date
                ).toLocaleDateString("ar-SY")}
              </div>

              <div className={styles.eventCourt}>
                {event.Court?.courtName}
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>لا توجد أحداث قادمة</p>
    )}
  </div>

</div>
    </div>
  );
}
export default AdminDashboardPage;