"use client";
import Link from "next/link";
import styles from "./Topbar.module.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
function Topbar() {
  return (
    <div className={styles.topBar}>
      <div className={styles.topBarWrapper}>
        <div className={styles.topLeft}>
          <Link href="/admin" className={styles.logo}>
            WhistleApp Admin
          </Link>
        </div>
        <div className={styles.topRight}>
          <div className={styles.topBarIconContainer}>
            <NotificationsNoneIcon />
            <span className={styles.topIconBadge}>2</span> 
          </div>
          <div className={styles.topBarIconContainer}>
            <SettingsOutlinedIcon />
          </div>
          <div className={styles.topBarIconContainer}>
            <AccountCircleOutlinedIcon />
          </div>    
        </div>
      </div>
    </div>
  );
}
export default Topbar;