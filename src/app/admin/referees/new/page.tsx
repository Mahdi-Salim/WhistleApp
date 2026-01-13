'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './addReferee.module.css';
import Button from '@mui/material/Button';
import { useReferees } from '@/context/RefereeContext';
import { CreateRefereePayload } from '@/types/referee';

export default function AddRefereePage() {
  const router = useRouter();
  const { addReferee, loading: contextLoading } = useReferees();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateRefereePayload>({
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
    photo: '/images/default-avatar.png',
    birthDate: '',
    address: '',
    degree: '',
    specification: '',
    AFCNumber: '',
    status: true,
    RoleId: 3,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'status' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (
        !formData.userName ||
        !formData.email ||
        !formData.password ||
        !formData.phoneNumber ||
        !formData.birthDate ||
        !formData.address ||
        !formData.degree ||
        !formData.specification ||
        !formData.AFCNumber
      ) {
        throw new Error('جميع الحقول مطلوبة');
      }

      const cleanPhoneNumber = formData.phoneNumber.replace(/\D/g, '');
      if (cleanPhoneNumber.length < 10 || cleanPhoneNumber.length > 15) {
        throw new Error('رقم الهاتف يجب أن يكون بين 10-15 رقم');
      }

      const isValidSpecification = /^[\p{L}\p{N} ]+$/u.test(formData.specification);
      if (!isValidSpecification) {
        throw new Error('التخصص يجب أن يحتوي على أحرف أو أرقام (يمكن أن يحتوي على مسافات)');
      }
      const cleanSpecification = formData.specification.trim();

      const cleanAFCNumber = formData.AFCNumber.replace(/\D/g, '');
      if (!cleanAFCNumber) {
        throw new Error('رقم AFC يجب أن يحتوي على أرقام فقط');
      }

      await addReferee({
        ...formData,
        phoneNumber: cleanPhoneNumber,
        specification: cleanSpecification,
        AFCNumber: cleanAFCNumber,
        RoleId: 3,
        birthDate: formData.birthDate,
      });

      router.push('/admin/referees');
    } catch (err: unknown) {
      console.error('Failed to create referee:', err);
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : (() => {
              try {
                return JSON.stringify(err);
              } catch {
                return null;
              }
            })();
      setError(message || 'فشل في إضافة الحكم. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addRefereeContainer}>
      <h1 className={styles.addRefereeTitle}>إضافة حكم جديد</h1>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.addRefereeForm}>
        {/* صورة الحكم */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>رابط الصورة</label>
          <input
            type="text"
            name="photo"
            value={formData.photo || ''}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="أدخل رابط الصورة"
          />
          {formData.photo && (
            <img
              src={formData.photo}
              alt="Preview"
              className={styles.imagePreview}
              onError={(e) => (e.currentTarget.src = '/images/default-avatar.png')}
            />
          )}
        </div>

        {/* الاسم الكامل */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>الاسم الكامل</label>
          <input
            type="text"
            name="userName"
            value={formData.userName || ''}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        {/* البريد الإلكتروني */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        {/* كلمة السر */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>كلمة السر</label>
          <input
            type="password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        {/* رقم الهاتف */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>رقم الهاتف</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber || ''}
            onChange={handleChange}
            required
            className={styles.formInput}
            placeholder="أدخل رقم الهاتف (10-15 رقم)"
          />
        </div>

        {/* تاريخ الميلاد */}
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

        {/* العنوان */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>العنوان</label>
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        {/* الدرجة */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>الدرجة</label>
          <input
            type="text"
            name="degree"
            value={formData.degree || ''}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        {/* التخصص */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>التخصص</label>
          <input
            type="text"
            name="specification"
            value={formData.specification || ''}
            onChange={handleChange}
            required
            className={styles.formInput}
            placeholder="أدخل التخصص (أحرف وأرقام ومسافات)"
          />
        </div>

        {/* رقم AFC */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>رقم AFC</label>
          <input
            type="text"
            name="AFCNumber"
            value={formData.AFCNumber || ''}
            onChange={handleChange}
            required
            className={styles.formInput}
            placeholder="أدخل رقم AFC (أرقام فقط)"
          />
        </div>

        {/* الحالة */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>الحالة</label>
          <select
            name="status"
            value={formData.status ? 'true' : 'false'}
            onChange={handleChange}
            className={styles.formInput}
            required
          >
            <option value="true">نشط</option>
            <option value="false">غير نشط</option>
          </select>
        </div>

        {/* أزرار */}
        <div className={styles.buttonGroup}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.back()}
            disabled={loading || contextLoading}
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || contextLoading}
          >
            {loading || contextLoading ? 'جاري الحفظ...' : 'حفظ الحكم'}
          </Button>
        </div>
      </form>
    </div>
  );
}