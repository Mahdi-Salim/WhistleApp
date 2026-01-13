'use client'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupIcon from '@mui/icons-material/Group';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StadiumIcon from '@mui/icons-material/Stadium';
import styles from "@/components/Sidebar/Sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

 function Sidebar() {
  const pathname = usePathname();   
  const menu = [
    { title: "Home", path: "/admin", icon: <DashboardIcon /> },
    { title: "Referees", path: "/admin/referees", icon: <PeopleIcon /> },
    { title: "Referee Assessors", path: "/admin/assessors", icon: <GroupIcon /> },
    { title: "Teams", path: "/admin/teams", icon: <ApartmentIcon /> },
    { title: "Matches", path: "/admin/matches", icon: <SportsSoccerIcon /> },
    { title: "Report Management", path: "/admin/reports", icon: <AssignmentIcon /> },
    { title: "court", path: "/admin/courts", icon: <StadiumIcon /> },
    { title: "WorkoutAndTests", path: "/admin/events", icon: <FitnessCenterIcon/>}
  ];
  const handleLogout = () => {
    console.log("Logging out...");
  };
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarWrapper}>
        {menu.map((item) => (
          <Link key={item.path} href={item.path} className={styles.sidebarLink}>
            <div
              className={`${styles.sidebarItem} ${
                pathname === item.path ? styles.active : ""
              }`}
            >
              <div className={styles.sidebarIcon}>{item.icon}</div>
              <span className={styles.sidebarText}>{item.title}</span>
            </div>
          </Link>
        ))}
        <div className={styles.sidebarLink} onClick={handleLogout}>
          <div className={styles.sidebarItem}>
            <div className={styles.sidebarIcon}><LogoutIcon /></div>
            <span className={styles.sidebarText}>Logout</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
export default Sidebar;