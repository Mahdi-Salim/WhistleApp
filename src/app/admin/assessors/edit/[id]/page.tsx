"use client";
import React, { useState, useEffect } from "react";
import styles from "./editAssessor.module.css";
import { useRouter, useParams } from "next/navigation";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { User } from "@/types/user";
import { assessorService } from "@/services/assessorService";

export default function EditAssessorPage() {
  const router = useRouter();
  const params = useParams();
  const assessorId = Number(params.id);

  const [assessor, setAssessor] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!assessorId) return;

    const fetchAssessor = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await assessorService.getById(assessorId);
        setAssessor(data);
      } catch (err) {
        console.error(err);
        setError("فشل في تحميل بيانات المقيم. تأكد من تشغيل الخادم.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssessor();
  }, [assessorId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setAssessor((prevAssessor) =>
      prevAssessor ? { ...prevAssessor, [name]: value } : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assessor) return;

    // Validation
    if (
      !assessor.userName ||
      !assessor.email ||
      !assessor.phoneNumber ||
      !assessor.address ||
      !assessor.birthDate
    ) {
      setError("يرجى ملء جميع الحقول المطلوبة.");
      return;
    }

    try {
      await assessorService.update(assessor.id, assessor);
      alert("تم تحديث بيانات المقيم بنجاح!");
      router.push("/admin/assessors");
    } catch (apiError) {
      console.error("Update Assessor API error:", apiError);
      setError("حدث خطأ أثناء تحديث بيانات المقيم. يرجى المحاولة مرة أخرى.");
    }
  };

  const handleCancel = () => {
    router.push("/admin/assessors");
  };

  if (loading)
    return (
      <div className={styles.loadingMessage}>جاري تحميل بيانات المقيم...</div>
    );
  if (error) return <div className={styles.errorMessage}>{error}</div>;
  if (!assessor)
    return <div className={styles.errorMessage}>لم يتم العثور على المقيم.</div>;

  const formatDate = (date: string) => {
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <div className={styles.editAssessorContainer}>
      <h1 className={styles.editAssessorTitle}>
        عرض وتعديل بيانات المقيم: {assessor.userName}
      </h1>
      <form onSubmit={handleSubmit} className={styles.editAssessorForm}>
        {/* Assessor Image */}
        <div className={styles.imageUploadGroup}>
          {assessor.photo && (
            <img
              src={assessor.photo}
              alt={assessor.userName}
              className={styles.assessorImagePreview}
            />
          )}
          <label htmlFor="photo" className={styles.formLabel}>
            صورة شخصية (URL):
          </label>
          <input
            type="text"
            id="photo"
            name="photo"
            className={styles.formInput}
            value={assessor.photo || ""}
            onChange={handleInputChange}
            placeholder="أدخل رابط الصورة الشخصية"
          />
        </div>

        {/* Basic Info */}
        <div className={styles.formGroup}>
          <label htmlFor="userName" className={styles.formLabel}>
            الاسم:
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            className={styles.formInput}
            value={assessor.userName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>
            البريد الإلكتروني:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.formInput}
            value={assessor.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber" className={styles.formLabel}>
            الهاتف:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className={styles.formInput}
            value={assessor.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="birthDate" className={styles.formLabel}>
            تاريخ الميلاد:
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            className={styles.formInput}
            value={formatDate(assessor.birthDate)}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.formLabel}>
            العنوان:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className={styles.formInput}
            value={assessor.address}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Read-only info */}
        <div className={styles.readOnlyGroup}>
          <p>
            <strong>تاريخ الإنشاء:</strong>{" "}
            {assessor.createdAt
              ? new Date(assessor.createdAt).toLocaleDateString()
              : "غير متوفر"}
          </p>
        </div>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            type="submit"
          >
            حفظ التعديلات
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<CancelIcon />}
            onClick={handleCancel}
          >
            إلغاء
          </Button>
        </div>
      </form>
    </div>
  );
}