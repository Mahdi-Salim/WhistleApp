"use client";
import Link from "next/link";
import styles from "./Topbar.module.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useEffect, useState } from "react";

function Topbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

 useEffect(() => {
  const stored = localStorage.getItem("ui-theme");
  const initial = stored === "dark" ? "dark" : "light";

  setTheme(initial);

  document.documentElement.setAttribute(
    "data-theme",
    initial
  );
}, []);

const toggleTheme = () => {
  setTheme((prev) => {
    const next = prev === "light" ? "dark" : "light";

    localStorage.setItem("ui-theme", next);

    document.documentElement.setAttribute(
      "data-theme",
      next
    );

    return next;
  });
};

  const isDark = theme === "dark";

  return (
    <div className={styles.topBar}>
      <div className={styles.topBarWrapper}>
        <div className={styles.topLeft}>
          <Link href="/admin" className={styles.logo}>
            WhistleApp Admin
          </Link>
        </div>
        <div className={styles.topRight}>
          <button
            type="button"
            className={styles.themeToggleButton}
            onClick={toggleTheme}
          >
            {isDark ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
            <span>{isDark ? "Light" : "Dark"}</span>
          </button>
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