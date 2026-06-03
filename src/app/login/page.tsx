"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";
import axios from "axios";

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

      const response = await api.post("/api/auth/login", { email, password });

      const data = response.data;
      // Backend returns: { message: "...", data: { name: "...", token: "..." } }
      const token = data.data?.token;
      const name = data.data?.name;

      if (!token) {
        throw new Error("Login failed: No token received");
      }

      // Save token
      localStorage.setItem("authToken", token);

      // Decode token to get RoleId (backend doesn't return it explicitly in body)
      let roleId = 0;
      let userId = 0;
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = window.atob(base64);
        const decoded = JSON.parse(jsonPayload) as { RoleId?: number | string; id?: number | string };
        roleId = Number(decoded.RoleId ?? 0);
        userId = Number(decoded.id ?? 0);
      } catch (e) {
        console.error("Failed to parse token", e);
      }

      // Store user info
      localStorage.setItem(
        "authUser",
        JSON.stringify({ id: userId, userName: name, RoleId: roleId })
      );

      if (roleId === 3) {
        router.push("/referee");
      } 
      if (roleId === 2){
        router.push("/assessor")
      }
      if (roleId === 1) {
        router.push("/admin");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.");
      } else {
        setError("حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مجددًا.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>

      <div className={styles.loginBox}>
         <img 
      src="/SFA Logo.webp"
      alt="SFA Logo"
      style={{
        width: "90px",
        marginBottom: '10px'
      }}
      />
        <h1 className={styles.loginTitle}>WhistleApp</h1> {/* Updated title */}

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
      </div>
    </div>
  );
}


