import RefereeHeader from "./components/Header";
import styles from "./referee.module.css";

export default function RefereeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.refereeLayout}>
      <RefereeHeader />
      {children}
    </div>
  );
}
