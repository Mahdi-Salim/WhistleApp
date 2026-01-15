"use client";

import styles from "./profile.module.css";

// بيانات وهمية مؤقتة، لاحقًا تأتي من backend عند تسجيل الدخول
const refereeData = {
  name: "أحمد العلي",
  email: "ahmed@example.com",
  phone: "+963 987654321",
  degree: "درجة أولى",
  specification: "حكم دولي",
  joinDate: "01-03-2015"
};

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>الملف الشخصي</h2>
      
      <div className={styles.profileCard}>
        <div className={styles.profileRow}>
          <span className={styles.label}>الاسم:</span>
          <span className={styles.value}>{refereeData.name}</span>
        </div>
        <div className={styles.profileRow}>
          <span className={styles.label}>البريد الإلكتروني:</span>
          <span className={styles.value}>{refereeData.email}</span>
        </div>
        <div className={styles.profileRow}>
          <span className={styles.label}>رقم الهاتف:</span>
          <span className={styles.value}>{refereeData.phone}</span>
        </div>
        <div className={styles.profileRow}>
          <span className={styles.label}>الدرجة:</span>
          <span className={styles.value}>{refereeData.degree}</span>
        </div>
        <div className={styles.profileRow}>
          <span className={styles.label}>التخصص:</span>
          <span className={styles.value}>{refereeData.specification}</span>
        </div>
        <div className={styles.profileRow}>
          <span className={styles.label}>تاريخ الانضمام:</span>
          <span className={styles.value}>{refereeData.joinDate}</span>
        </div>
      </div>
      
      {/* زر لتعديل البيانات لاحقًا */}
      <button className={styles.editButton}>تعديل البيانات</button>
    </div>
  );
}
