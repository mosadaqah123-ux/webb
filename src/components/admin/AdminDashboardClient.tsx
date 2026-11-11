"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Attorney } from "@/data/attorneys";
import { ConsultationRequest, SiteSettings } from "@/types/site";
import RequestsManager from "@/components/admin/RequestsManager";
import AttorneysManager from "@/components/admin/AttorneysManager";
import SiteSettingsManager from "@/components/admin/SiteSettingsManager";
import {
  Inbox,
  Users,
  Settings,
  ExternalLink,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface AdminDashboardClientProps {
  username: string;
  initialRequests: ConsultationRequest[];
  initialAttorneys: Attorney[];
  initialSettings: SiteSettings;
}

type DashboardTab = "requests" | "attorneys" | "settings";

export default function AdminDashboardClient({
  username,
  initialRequests,
  initialAttorneys,
  initialSettings,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DashboardTab>("requests");
  const [requests, setRequests] = useState<ConsultationRequest[]>(initialRequests);
  const [attorneys, setAttorneys] = useState<Attorney[]>(initialAttorneys);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [notice, setNotice] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleNotify = useCallback((type: "success" | "error", text: string) => {
    setNotice({ type, text });
    setTimeout(() => {
      setNotice((prev) => (prev?.text === text ? null : prev));
    }, 4500);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  const newRequestsCount = requests.filter((r) => r.status === "new").length;
  const publishedAttorneysCount = attorneys.filter((a) => a.isPublished).length;

  const tabs: { id: DashboardTab; label: string; icon: React.ElementType; badge?: number }[] = [
    {
      id: "requests",
      label: "الطلبات والاستشارات",
      icon: Inbox,
      badge: newRequestsCount > 0 ? newRequestsCount : undefined,
    },
    {
      id: "attorneys",
      label: "فريق المحامين والمستشارين",
      icon: Users,
      badge: attorneys.length,
    },
    {
      id: "settings",
      label: "تعديل بيانات الموقع",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 text-navy-900 font-arabic">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-navy-950 text-ivory-50 border-b border-gold-400/25 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <Link href="/" className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/musadqh-logo-white.png"
                alt="مصادقة للمحاماة"
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </Link>
            <span className="hidden sm:inline-block h-6 w-px bg-gold-400/25" />
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-gold-300">لوحة تحكم المسؤول</div>
              <div className="text-[11px] text-ivory-300/75 font-mono" dir="ltr">
                {username}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-navy-900 hover:bg-navy-800 border border-gold-400/30 text-xs font-semibold text-gold-300 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>معاينة الموقع</span>
            </Link>

            <button
              type="button"
              disabled={loggingOut}
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-400/30 text-xs font-semibold text-red-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Global Status Toast */}
        {notice && (
          <div
            role="status"
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold shadow-sm ${
              notice.type === "success"
                ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                : "bg-red-50 border-red-300 text-red-900"
            }`}
          >
            {notice.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{notice.text}</span>
          </div>
        )}

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-white rounded-2xl border border-navy-200/80 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-navy-600">طلبات جديدة</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-navy-950">
              {newRequestsCount}
            </div>
            <div className="text-[11px] text-amber-700 mt-1 font-medium">
              بانتظار المراجعة والتواصل
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-navy-200/80 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-navy-600">إجمالي الطلبات</span>
              <Inbox className="w-4 h-4 text-gold-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-navy-950">
              {requests.length}
            </div>
            <div className="text-[11px] text-navy-500 mt-1">
              من نموذج التواصل وحجز الاستشارة
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-navy-200/80 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-navy-600">المحامون الظاهرون</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-navy-950">
              {publishedAttorneysCount}
            </div>
            <div className="text-[11px] text-emerald-700 mt-1 font-medium">
              منشور في الصفحة الرئيسية
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-navy-200/80 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-navy-600">إجمالي الكادر المسجل</span>
              <Users className="w-4 h-4 text-gold-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-navy-950">
              {attorneys.length}
            </div>
            <div className="text-[11px] text-navy-500 mt-1">
              محامين ومستشارين وموثقين
            </div>
          </div>
        </div>

        {/* Main Section Tabs */}
        <div className="border-b border-navy-200 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-t-xl border-b-2 text-xs sm:text-sm font-bold transition-all ${
                  active
                    ? "border-gold-500 bg-white text-navy-950 shadow-sm"
                    : "border-transparent text-navy-600 hover:text-navy-950 hover:bg-white/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-gold-600" : ""}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      active
                        ? "bg-navy-950 text-gold-300"
                        : "bg-navy-100 text-navy-700"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Section Body */}
        <div>
          {activeTab === "requests" && (
            <RequestsManager
              requests={requests}
              onRequestsChange={setRequests}
              onNotify={handleNotify}
            />
          )}

          {activeTab === "attorneys" && (
            <AttorneysManager
              attorneys={attorneys}
              onAttorneysChange={setAttorneys}
              onNotify={handleNotify}
            />
          )}

          {activeTab === "settings" && (
            <SiteSettingsManager
              settings={settings}
              onSettingsChange={setSettings}
              onNotify={handleNotify}
            />
          )}
        </div>
      </main>
    </div>
  );
}
