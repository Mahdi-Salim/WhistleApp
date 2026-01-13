import Sidebar from "@/components/Sidebar/Sidebar";
import Topbar from "@/components/Topbar/Topbar";
import styles from "./AdminLayout.module.css";
import React from "react";
import { RefereeProvider } from "@/context/RefereeContext";
import { AssessorProvider } from "@/context/AssessorContext";
import { WATProvider } from "@/context/WATContext";
import { CourtProvider } from "@/context/CourtContext";
import { ResultsProvider } from "@/context/testresultContext";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RefereeProvider>
      <AssessorProvider>
        <WATProvider>
          <CourtProvider>
            <ResultsProvider>
              <Topbar />
              <div className={styles.container}>
                <Sidebar />
                <main className={styles.content}>
                  {children}
                </main>
              </div>
            </ResultsProvider>
          </CourtProvider>
        </WATProvider>
      </AssessorProvider>
    </RefereeProvider>
  );
}

export default AdminLayout;