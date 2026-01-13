"use client";
import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import styles from "./ChartWidget.module.css";
import {
  ChartData,
  ChartOptions
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement
);
interface ChartWidgetProps {
  title: string;
  chartType: "pie" | "bar" | "line";
  data: ChartData<"pie" | "bar" | "line">;
  options?: ChartOptions<"pie" | "bar" | "line">;
}
function ChartWidget({
  title,
  chartType,
  data,
  options,
}: ChartWidgetProps) {
  const renderChart = () => {
    switch (chartType) {
      case "pie":
        return <Pie data={data} options={options} />;
      case "bar":
        return <Bar data={data} options={options} />;
      case "line":
        return <Line data={data} options={options} />;
      default:
        return <p>Unsupported chart type</p>;
    }
  };
  return (
    <div className={styles.chartWidget}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <div className={styles.chartContainer}>{renderChart()}</div>
    </div>
  );
}
export default ChartWidget;