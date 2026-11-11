"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok) {
        setError(data.error || "بيانات الدخول غير صحيحة.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("تعذر الاتصال بالخادم. يرجى المحاولة مجدداً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-ivory-50 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Architectural Pattern & Glow */}
      <div className="absolute inset-0 najdi-pattern-dark opacity-45 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Top Brand Lockup */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/musadqh-logo-white.png"
              alt="مصادقة للمحاماة"
              className="h-12 w-auto mx-auto object-contain"
            />
          </Link>
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-gold-400/30 text-gold-300 text-xs font-medium">
              <Lock className="w-3.5 h-3.5" />
              <span>بوابة إدارة الموقع الإلكتروني</span>
            </span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-navy-900/90 backdrop-blur-md border border-gold-400/30 rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500" />

          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1 text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-ivory-50">
                تسجيل دخول المسؤول
              </h1>
              <p className="text-xs text-ivory-300/75">
                إدارة طلبات الاستشارات، فريق المحامين، وبيانات الموقع
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/60 border border-red-400/40 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label htmlFor="admin-username" className="block font-semibold text-ivory-200 text-xs">
                  اسم المستخدم أو البريد الإلكتروني
                </label>
                <input
                  id="admin-username"
                  type="text"
                  required
                  autoComplete="username"
                  dir="ltr"
                  placeholder="admin@musadqh.sa"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-navy-950 border border-navy-700 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-ivory-100 focus:outline-none text-right"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="admin-password" className="block font-semibold text-ivory-200 text-xs">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    dir="ltr"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 pl-10 rounded-lg bg-navy-950 border border-navy-700 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-ivory-100 focus:outline-none text-right"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory-400 hover:text-gold-300 transition-colors"
                    aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-sm text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 disabled:opacity-60 shadow-gold-glow transition-all"
              >
                {loading ? "جاري التحقق..." : "دخول إلى لوحة التحكم"}
              </button>
            </form>

            <div className="pt-3 border-t border-navy-800 flex items-center justify-between text-[11px] text-ivory-300/70">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>جلسة محمية ومشفرة</span>
              </span>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-gold-300 hover:text-gold-200 transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>العودة للموقع</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
