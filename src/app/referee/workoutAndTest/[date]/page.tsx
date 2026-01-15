"use client";

// بيانات وهمية، لاحقًا تأتي من backend
const dayDetails = {
  "2026-01-18": { type: "exercise", stadium: "ملعب الفيحاء", time: "15:00" },
  "2026-01-22": { type: "test", stadium: "ملعب تشرين", time: "18:00" }
};

export default function DayDetails({ params }: { params: { date: string } }) {
  const details = dayDetails[params.date];

  if (!details) return <div style={{ padding: "16px" }}>لا يوجد نشاط في هذا اليوم</div>;

  return (
    <div style={{ padding: "16px" }}>
      <h2>{details.type === "exercise" ? "تمرين" : "اختبار"}</h2>
      <div>التاريخ: {params.date}</div>
      <div>الملعب: {details.stadium}</div>
      <div>الوقت: {details.time}</div>
    </div>
  );
}
