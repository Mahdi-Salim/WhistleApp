"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./addAssessor.module.css";
import { Button } from "@mui/material";
import { imageService } from "@/services/imageService";
import { assessorService } from "@/services/assessorService";

export default function AddAssessorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false); // Track image upload status
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    photo: "/images/default-avatar.png", // Default image
    birthDate: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const imageUrl = await imageService.upload(file);
      setFormData((prev) => ({ ...prev, photo: imageUrl }));
    } catch (error) {
      alert("فشل في رفع الصورة، يرجى المحاولة مرة أخرى.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await assessorService.create({
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        birthDate: formData.birthDate, // نص YYYY-MM-DD
        address: formData.address,
        photo: formData.photo,
      });
      router.push("/admin/assessors");
    } catch (error) {
      console.error("Failed to create assessor:", error);
      alert("فشل في إضافة المقيم. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addAssessorContainer}>
      <h1 className={styles.addAssessorTitle}>إضافة مقيم جديد</h1>
      <form onSubmit={handleSubmit} className={styles.addAssessorForm}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>صورة شخصية</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.formInput}
            disabled={uploadingImage}
          />
          {uploadingImage && <p>جاري رفع الصورة...</p>}
          {formData.photo && !uploadingImage && (
            <img
              src={formData.photo}
              alt="Preview"
              className={styles.imagePreview}
              onError={(e) =>
                (e.currentTarget.src = "/images/default-avatar.png")
              }
            />
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>الاسم الكامل</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>كلمة المرور</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>رقم الهاتف</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>تاريخ الميلاد</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>العنوان</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.back()}
            disabled={loading}
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "جاري الحفظ..." : "حفظ المقيم"}
          </Button>
        </div>
      </form>
    </div>
  );
}