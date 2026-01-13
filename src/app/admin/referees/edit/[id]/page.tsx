'use client';
import React, { useState, useEffect } from 'react';
import styles from "../editReferee.module.css";
import { useRouter, useParams } from 'next/navigation';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useReferees } from "@/context/RefereeContext";
import { RefereeWithUser } from "@/types/referee";

export default function EditRefereePage() {
  const router = useRouter();
  const params = useParams();
  const refereeId = Number(params?.id);   // تأكد أن id موجود
  const { updateReferee, fetchReferees, referees } = useReferees();

  const [referee, setReferee] = useState<RefereeWithUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!refereeId) return;

    const fetchReferee = async () => {
      setLoading(true);
      setError(null);
      try {
        // ابحث أولاً في القائمة الحالية
        let found = referees.find((r) => r.id === refereeId);

        if (!found) {
          // اجلب القائمة من السيرفر
          const list = await fetchReferees();
          found = list.find((r) => r.id === refereeId);
        }

        setReferee(found || null);
      } catch (err) {
        console.error(err);
        setError("فشل في تحميل بيانات الحكم. تأكد من تشغيل الخادم.");
      } finally {
        setLoading(false);
      }
    };

    fetchReferee();
  }, [refereeId, referees, fetchReferees]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, checked } = e.target as HTMLInputElement;
    if (!referee) return;

    if (name === "birthDate") {
      setReferee({ ...referee, birthDate: value });
    } else if (name === "status") {
      setReferee({
        ...referee,
        Referee: { ...referee.Referee!, status: checked },
      });
    } else if (["degree", "specification", "AFCNumber"].includes(name)) {
      setReferee({
        ...referee,
        Referee: { ...referee.Referee!, [name]: value },
      });
    } else {
      setReferee({ ...referee, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referee) return;

    if (
      !referee.userName ||
      !referee.email ||
      !referee.phoneNumber ||
      !referee.address ||
      !referee.birthDate ||
      !referee.Referee?.degree ||
      !referee.Referee?.specification ||
      !referee.Referee?.AFCNumber
    ) {
      setError("الرجاء تعبئة جميع الحقول الأساسية.");
      return;
    }

    try {
      await updateReferee(referee.id, {
        userName: referee.userName,
        email: referee.email,
        phoneNumber: referee.phoneNumber,
        password: referee.password ?? "",
        photo: referee.photo,
        birthDate: referee.birthDate,
        address: referee.address,
        degree: referee.Referee?.degree || "",
        specification: referee.Referee?.specification || "",
        AFCNumber: referee.Referee?.AFCNumber || "",
        status: referee.Referee?.status ?? true,
        RoleId: 3,
      });
      alert("تم تحديث بيانات الحكم بنجاح!");
      router.push("/admin/referees");
    } catch (apiError) {
      console.error("Update Referee API error:", apiError);
      setError("حدث خطأ أثناء تحديث بيانات الحكم. يرجى المحاولة مرة أخرى.");
    }
  };

  const handleCancel = () => {
    router.push("/admin/referees");
  };

  if (loading) return <div className={styles.loadingMessage}>جاري تحميل بيانات الحكم...</div>;
  if (error) return <div className={styles.errorMessage}>{error}</div>;
  if (!referee) return <div className={styles.errorMessage}>لم يتم العثور على الحكم.</div>;

  const formatDate = (date: string) => {
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <div className={styles.editRefereeContainer}>
      <h1 className={styles.editRefereeTitle}>
        عرض وتعديل بيانات الحكم: {referee.userName}
      </h1>

      <form onSubmit={handleSubmit} className={styles.editRefereeForm}>
        {/* صورة شخصية */}
        <div className={styles.imageUploadGroup}>
          {referee.photo && (
            <img
              src={referee.photo}
              alt={referee.userName}
              className={styles.refereeImagePreview}
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
            value={referee.photo || ""}
            onChange={handleInputChange}
            placeholder="أدخل رابط الصورة الشخصية"
          />
        </div>

        {/* معلومات أساسية */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>الاسم:</label>
          <input
            type="text"
            name="userName"
            className={styles.formInput}
            value={referee.userName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>البريد الإلكتروني:</label>
          <input
            type="email"
            name="email"
            className={styles.formInput}
            value={referee.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>الهاتف:</label>
          <input
            type="tel"
            name="phoneNumber"
            className={styles.formInput}
            value={referee.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>تاريخ الميلاد:</label>
          <input
            type="date"
            name="birthDate"
            className={styles.formInput}
            value={formatDate(referee.birthDate)}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>العنوان:</label>
          <input
            type="text"
            name="address"
            className={styles.formInput}
            value={referee.address}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* بيانات الحكم */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>الدرجة:</label>
          <input
            type="text"
            name="degree"
            className={styles.formInput}
            value={referee.Referee?.degree || ""}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>التخصص:</label>
          <input
            type="text"
            name="specification"
            className={styles.formInput}
            value={referee.Referee?.specification || ""}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>رقم الاتحاد الآسيوي (AFC):</label>
          <input
            type="text"
            name="AFCNumber"
            className={styles.formInput}
            value={referee.Referee?.AFCNumber || ""}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* الحالة */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>الحالة:</label>
          <input
            type="checkbox"
            name="status"
            className={styles.formCheckbox}
            checked={referee.Referee?.status ?? true}
            onChange={handleInputChange}
          />
          <span className={styles.checkboxLabel}>
            {referee.Referee?.status ? "نشط" : "غير نشط"}
          </span>
        </div>

                {/* معلومات إضافية */}
        <div className={styles.readOnlyGroup}>
          <p>
            <strong>تاريخ الإنشاء:</strong>{" "}
            {referee.createdAt
              ? new Date(referee.createdAt).toLocaleDateString()
              : "غير متوفر"}
          </p>
          <p>
            <strong>عدد المباريات:</strong> يتم احتسابها تلقائيًا من النظام
          </p>
        </div>

        {/* أزرار الحفظ والإلغاء */}
        <div className={styles.formButtons}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            حفظ التعديلات
          </Button>
          <Button
            type="button"
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