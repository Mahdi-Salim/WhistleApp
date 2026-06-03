// whistleapp/src/app/signup/page.tsx
"use client";

import React, { useState } from 'react';
import styles from "./signup.module.css";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import api from "@/lib/axios";
import axios from "axios";

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic client-side validation
    if (!name || !email || !password || !confirmPassword || !phoneNumber || !birthDate || !address) {
      setError("الرجاء تعبئة جميع الحقول.");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }
    
    if (password.length < 6) {
        setError("يجب أن لا تقل كلمة المرور عن 6 أحرف.");
        return;
    }

    // Simulate API call to register a new user
    try {
      setLoading(true);
      
      // Using FormData because the backend route uses upload.single('photo')
      // which often requires multipart/form-data
      const formData = new FormData();
      formData.append('userName', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phoneNumber', phoneNumber);
      formData.append('birthDate', birthDate);
      formData.append('address', address);
      formData.append('RoleId', '2'); // Default to Assessor/User role

      await api.post('/api/user/createUser', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
      });

      alert("تم إنشاء حسابك بنجاح! الرجاء تسجيل الدخول.");
      router.push('/login');
    } catch (apiError: unknown) {
      console.error("Signup API error:", apiError);
      if (axios.isAxiosError(apiError)) {
        setError(apiError.response?.data?.message || "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.");
      } else {
        setError("حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupBox}>
        <h1 className={styles.signupTitle}>إنشاء حساب جديد</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>الاسم:</label>
            <input
              type="text"
              id="name"
              className={styles.formInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>البريد الإلكتروني:</label>
            <input
              type="email"
              id="email"
              className={styles.formInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber" className={styles.formLabel}>رقم الهاتف:</label>
            <input
              type="tel"
              id="phoneNumber"
              className={styles.formInput}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="birthDate" className={styles.formLabel}>تاريخ الميلاد:</label>
            <input
              type="date"
              id="birthDate"
              className={styles.formInput}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.formLabel}>العنوان:</label>
            <input
              type="text"
              id="address"
              className={styles.formInput}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>كلمة المرور:</label>
            <input
              type="password"
              id="password"
              className={styles.formInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>تأكيد كلمة المرور:</label>
            <input
              type="password"
              id="confirmPassword"
              className={styles.formInput}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="contained" color="primary" startIcon={<PersonAddIcon />} className={styles.signupButton} disabled={loading}>
            {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
          </Button>
        </form>
        <Link href="/login" className={styles.loginLink}>
          هل لديك حساب بالفعل؟ تسجيل الدخول
        </Link>
      </div>
    </div>
  );
}

