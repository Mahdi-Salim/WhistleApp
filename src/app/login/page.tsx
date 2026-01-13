"use client";

import React, { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("البريد الإلكتروني وكلمة المرور مطلوبان.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.");
        setLoading(false);
        return;
      }

      // Save token (temporary solution)
      localStorage.setItem("authToken", data.token);

      router.push("/admin");

    } catch (err) {
      setError("حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مجددًا.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.loginTitle}>تسجيل الدخول إلى لوحة إدارة WhistleApp</h1> {/* Updated title */}

        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>البريد الإلكتروني:</label>
            <input
              type="email"
              className={styles.formInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={loading}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>كلمة المرور:</label>
            <input
              type="password"
              className={styles.formInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
        {/* Added link to signup page */}
        <Link href="/signup" className={styles.signupLink}>
          ليس لديك حساب؟ إنشاء حساب جديد
        </Link>
      </div>
    </div>
  );
}


