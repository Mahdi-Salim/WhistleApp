"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Styles from "./testresult.module.css";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useResults } from "@/context/testresultContext"; 
import { useWAT } from "@/context/WATContext";

export default function TestResultPage() {
  const params = useSearchParams();
  const watIdParam = params.get("watId");
  const watId = watIdParam ? Number(watIdParam) : null;
  const { addResult } = useResults();
  const [referees, setReferees] = useState<any[]>([]);
  useEffect(() => {
    if (watId) {
      fetch(`/api/referees/byTest/${watId}`)
        .then((res) => res.json())
        .then((data) => setReferees(data));
    }
  }, [watId]);

  const handleResultChange = (refereeId: number, value: string) => {
    setReferees((prev) =>
      prev.map((r) =>
        r.id === refereeId ? { ...r, result: value } : r
      )
    );
  };
  const handleSubmit = async () => {
    for (const referee of referees) {
      await addResult({
        WATId: watId!,
        status: referee.result === "success",
      });
      await fetch(`/api/referees/${referee.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          active: referee.result === "success",
        }),
      });
    }
    alert("تم حفظ النتائج بنجاح ✅");
  };
  if (!watId) {
    return <p>معرف الاختبار غير موجود في الرابط.</p>;
  }
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        نتائج الاختبار #{watId}
      </Typography>
      {referees.map((referee) => (
        <Paper key={referee.id} style={{ padding: 16, marginBottom: 12 }}>
          <Typography variant="h6">{referee.name}</Typography>
          <RadioGroup
            row
            value={referee.result || ""}
            onChange={(e) => handleResultChange(referee.id, e.target.value)}
          >
            <FormControlLabel value="success" control={<Radio />} label="ناجح" />
            <FormControlLabel value="fail" control={<Radio />} label="راسب" />
          </RadioGroup>
        </Paper>
      ))}
      <Button variant="contained" color="success" onClick={handleSubmit}>
        حفظ النتائج
      </Button>
    </div>
  );
}