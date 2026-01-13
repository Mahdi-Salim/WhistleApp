import React from 'react';
import styles from './KpiCard.module.css';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
interface KpiCardProps {
  title: string;
  value: string | number;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral'; 
}
function KpiCard({ title, value, icon: Icon, change, changeType }: KpiCardProps) {
  return (
    <div className={styles.kpiCard}>
      <div className={styles.cardHeader}>
        <Icon className={styles.cardIcon} />
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <p className={styles.cardValue}>{value}</p>
      {change && (
        <div className={`${styles.cardChange} ${styles[changeType || 'neutral']}`}>
          <span>{change}</span>
        </div>
      )}
    </div>
  );
}
export default KpiCard;