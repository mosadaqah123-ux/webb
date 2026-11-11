"use client";

import React from "react";
import Image from "next/image";
import { Attorney } from "@/data/attorneys";
import {
  X,
  GraduationCap,
  Briefcase,
  Award,
  Languages,
  CheckCircle2,
  Scale,
} from "lucide-react";

interface AttorneyModalProps {
  attorney: Attorney | null;
  onClose: () => void;
  onBookConsultation: (attorneyName: string) => void;
}

export default function AttorneyModal({
  attorney,
  onClose,
  onBookConsultation,
}: AttorneyModalProps) {
  if (!attorney) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-navy-200 overflow-hidden z-10 animate-scaleUp my-8 text-navy-900">
        {/* Top Gold Bar */}
        <div className="h-1.5 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-navy-800/80 hover:bg-navy-700 text-ivory-100 transition-colors z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          aria-label="إغلاق السيرة المهنية"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header / Hero */}
        <div className="bg-navy-950 text-ivory-50 p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 najdi-pattern-dark opacity-30 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 opacity-[0.07] pointer-events-none">
            <Image
              src="/musadqh-emblem-gold.png"
              alt=""
              fill
              sizes="144px"
              className="object-contain"
            />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Portrait ONLY when a real photo exists */}
            {attorney.portraitUrl && (
              <div className="relative w-28 h-36 sm:w-32 sm:h-44 rounded-lg overflow-hidden border-2 border-gold-400/40 shrink-0 shadow-lg bg-navy-900">
                <Image
                  src={attorney.portraitUrl}
                  alt={attorney.nameAr}
                  fill
                  sizes="128px"
                  className="object-cover object-top"
                />
              </div>
            )}

            {/* Title & Info */}
            <div className="space-y-2.5 text-center sm:text-right flex-1">
              <div className="inline-flex flex-wrap items-center justify-center sm:justify-start gap-2 px-3 py-1 rounded bg-gold-400/20 border border-gold-400/25 text-gold-300 text-xs font-semibold">
                <span>{attorney.roleBadgeAr}</span>
                {attorney.experienceBadgeAr && (
                  <>
                    <span>•</span>
                    <span>{attorney.experienceBadgeAr}</span>
                  </>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-ivory-50 leading-snug">
                {attorney.nameAr}
              </h2>

              <div className="text-sm text-gold-300/90 font-medium leading-relaxed">
                {attorney.titleAr}
              </div>

              {/* Languages (only if specified) */}
              {attorney.languages && attorney.languages.length > 0 && (
                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="text-xs text-ivory-300/70 flex items-center gap-1">
                    <Languages className="w-3.5 h-3.5 text-gold-400" />
                    اللغات:
                  </span>
                  {attorney.languages.map((l, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-navy-900 border border-gold-400/20 text-[11px] text-ivory-200"
                    >
                      {l.ar} ({l.en})
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Bio Sections */}
          {attorney.fullBioAr && attorney.fullBioAr.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-navy-950 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gold-600" />
                <span>نبذة عن المسيرة المهنية والممارسة القانونية</span>
              </h3>
              <div className="text-xs sm:text-sm text-navy-800/85 leading-relaxed space-y-2.5">
                {attorney.fullBioAr.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          )}

          {/* Qualifications & Bar Admissions */}
          {attorney.qualificationsAr && attorney.qualificationsAr.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-navy-100">
              <h3 className="text-base font-bold text-navy-950 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gold-600" />
                <span>المؤهلات العلمية والتراخيص</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {attorney.qualificationsAr.map((q, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-ivory-100/80 border border-navy-100 text-navy-800"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practice Areas */}
          {attorney.practiceAreas && attorney.practiceAreas.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-navy-100">
              <h3 className="text-base font-bold text-navy-950 flex items-center gap-2">
                <Scale className="w-4 h-4 text-gold-600" />
                <span>مجالات التخصص والممارسة</span>
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {attorney.practiceAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-md bg-navy-900/5 border border-navy-200/70 text-navy-900 font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Approved Achievements (only if provided) */}
          {attorney.approvedAchievementsAr && attorney.approvedAchievementsAr.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-navy-100">
              <h3 className="text-base font-bold text-navy-950 flex items-center gap-2">
                <Award className="w-4 h-4 text-gold-600" />
                <span>أبرز الإنجازات والملفات المعتمدة للنشر</span>
              </h3>
              <ul className="space-y-2 text-xs text-navy-800">
                {attorney.approvedAchievementsAr.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-600 shrink-0 mt-1.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-ivory-100 px-6 py-4 border-t border-navy-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-navy-600 text-center sm:text-right">
            <span>لطلب موعد مباشر مع {attorney.nameAr}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 rounded text-xs font-semibold text-navy-800 hover:bg-navy-200 transition-colors"
            >
              إغلاق
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookConsultation(attorney.nameAr);
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded text-xs font-semibold text-navy-950 bg-gold-400 hover:bg-gold-300 shadow-sm transition-colors"
            >
              {attorney.gender === "female"
                ? "حجز استشارة مع المحامية"
                : "حجز استشارة مع المحامي"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
