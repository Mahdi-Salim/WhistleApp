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
import CircularProgress from "@mui/material/CircularProgress";
import { useResults } from "@/context/testresultContext";
import { watService } from "@/services/WATService";
import { refereeService } from "@/services/refereeService";
import { resultsService } from "@/services/testresultService";
import type { WAT } from "@/types/WAT";
import type { RefereeWithUser } from "@/types/referee";
import type { TestResult } from "@/types/testresult";

type ResultValue = "success" | "fail" | "";

export default function TestResultPage() {
  const params = useSearchParams();
  const watIdParam = params.get("watId");
  const watId = watIdParam ? Number(watIdParam) : null;

  const { addResult, updateResult } = useResults();

  const [wat, setWat] = useState<WAT | null>(null);
  const [referee, setReferee] = useState<RefereeWithUser | null>(null);
  const [existingResult, setExistingResult] = useState<TestResult | null>(null);
  const [value, setValue] = useState<ResultValue>("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!watId) return;

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const watData = await watService.getById(watId);
        const [refereeData, resultData] = await Promise.all([
          refereeService.getById(String(watData.UserId)),
          resultsService.getByTestId(watId),
        ]);

        if (cancelled) return;

        setWat(watData);
        setReferee(refereeData);
        setExistingResult(resultData);
        setValue(resultData ? (resultData.status ? "success" : "fail") : "");
      } catch (err) {
        console.error(err);
        if (cancelled) return;
        setError("فشل في تحميل بيانات الاختبار/الحكم.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [watId]);

  const handleSubmit = async () => {
    if (!watId || !wat) return;

    if (!value) {
      setError("الرجاء اختيار نتيجة الاختبار.");
      return;
    }

    const nextStatus = value === "success";

    setSaving(true);
    setError(null);
    try {
      if (existingResult?.id) {
        await updateResult(existingResult.id, { status: nextStatus });
      } else {
        await addResult({
          WATId: watId,
          status: nextStatus,
        });
      }

      try {
        await fetch(`/api/referees/${wat.UserId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ active: nextStatus }),
        });
      } catch {
      }

      const updated = await resultsService.getByTestId(watId);
      setExistingResult(updated);

      alert("تم حفظ النتيجة بنجاح ✅");
    } catch (err) {
      console.error(err);
      setError("فشل في حفظ النتيجة. يرجى المحاولة مرة أخرى.");
    } finally {
      setSaving(false);
    }
  };

  if (!watId) {
    return <p className={Styles.errorMessage}>معرف الاختبار غير موجود في الرابط.</p>;
  }

  if (loading) {
    return (
      <div className={Styles.testResultPage}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className={Styles.testResultPage}>
        <p className={Styles.errorMessage}>{error}</p>
      </div>
    );
  }

  if (!wat || !referee) {
    return (
      <div className={Styles.testResultPage}>
        <p className={Styles.noResultsFound}>لا توجد بيانات لعرضها.</p>
      </div>
    );
  }

  const photoSrc = referee.photo || "/images/default-avatar.png";

  return (
    <div className={Styles.testResultPage}>
      <Typography variant="h4" gutterBottom className={Styles.testResultTitle}>
        نتائج الاختبار #{watId}
      </Typography>

      <Paper style={{ padding: 16, marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <img
            src={photoSrc}
            alt={referee.userName}
            width={56}
            height={56}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
          <div>
            <Typography variant="h6">{referee.userName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {referee.email}
            </Typography>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <RadioGroup
            row
            value={value}
            onChange={(e) => setValue(e.target.value as ResultValue)}
          >
            <FormControlLabel value="success" control={<Radio />} label="ناجح" />
            <FormControlLabel value="fail" control={<Radio />} label="راسب" />
          </RadioGroup>
        </div>
      </Paper>

      <Button
        variant="contained"
        color="success"
        onClick={handleSubmit}
        disabled={saving}
      >
        {existingResult ? "تحديث النتيجة" : "حفظ النتيجة"}
      </Button>
    </div>
  );
}