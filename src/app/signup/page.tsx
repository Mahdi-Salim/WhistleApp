// whistleapp/src/app/signup/page.tsx
"use client";

import React, { useState } from 'react';
import styles from "./signup.module.css";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Icon for signup

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic client-side validation
    if (!name || !email || !password || !confirmPassword) {
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
      // Replace with your actual API endpoint for signup
      const response = await fetch('/api/signup', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        alert("تم إنشاء حسابك بنجاح! الرجاء تسجيل الدخول.");
        router.push('/login'); // Redirect to login page after successful signup
      } else {
        const errorData = await response.json();
        setError(errorData.message || "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.");
      }
    } catch (apiError) {
      console.error("Signup API error:", apiError);
      setError("حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.");
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
          <Button type="submit" variant="contained" color="primary" startIcon={<PersonAddIcon />} className={styles.signupButton}>
            إنشاء حساب
          </Button>
        </form>
        <Link href="/login" className={styles.loginLink}>
          هل لديك حساب بالفعل؟ تسجيل الدخول
        </Link>
      </div>
    </div>
  );
}

