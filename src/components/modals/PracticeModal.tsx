"use client";

import React from "react";
import { PracticeArea } from "@/data/practiceAreas";
import {
  X,
  Scale,
  Building2,
  Globe2,
  Landmark,
  Coins,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

interface PracticeModalProps {
  practice: PracticeArea | null;
  onClose: () => void;
  onBookConsultation: (practiceTitle: string) => void;
}

export default function PracticeModal({
  practice,
  onClose,
  onBookConsultation,
}: PracticeModalProps) {
  if (!practice) return null;

  const iconMap: Record<string, React.ElementType> = {
    Building2,
    Scale,
    Globe2,
    Landmark,
    Coins,
    ShieldCheck,
  };

  const Icon = iconMap[practice.icon] || Scale;

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
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-navy-100 hover:bg-navy-200 text-navy-800 transition-colors z-20"
          aria-label="إغلاق تفاصيل الممارسة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-navy-950 text-ivory-50 p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 najdi-pattern-dark opacity-30 pointer-events-none" />

          <div className="relative z-10 flex items-start gap-5">
            <div className="w-14 h-14 rounded-xl bg-navy-800 border border-gold-400/40 text-gold-300 flex items-center justify-center shrink-0">
              <Icon className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-gold-400 tracking-wider">
                {practice.titleEn}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ivory-50">
                {practice.titleAr}
              </h2>
              <div className="text-xs sm:text-sm text-gold-300/90 font-medium">
                {practice.subtitleAr}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Detailed Narrative */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-navy-950">نطاق الممارسة والخدمات الاستشارية</h3>
            <p className="text-xs sm:text-sm text-navy-800/80 leading-relaxed">
              {practice.detailedDesc}
            </p>
          </div>

          {/* Key Services Checklist */}
          <div className="space-y-3 pt-4 border-t border-navy-100">
            <h3 className="text-sm font-bold text-navy-950">الخدمات والحلول المشمولة</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {practice.keyServices.map((service, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded bg-ivory-100/70 text-navy-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regulatory Frameworks */}
          <div className="space-y-3 pt-4 border-t border-navy-100">
            <h3 className="text-sm font-bold text-navy-950 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-gold-600" />
              <span>الأطر والأنظمة السعودية ذات الصلة</span>
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {practice.regulatoryFocus.map((reg, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded bg-navy-900 text-gold-300 border border-gold-400/30 text-[11px] font-semibold"
                >
                  {reg}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-ivory-100 px-6 py-4 border-t border-navy-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-navy-600 text-center sm:text-right">
            <span>لطلب دراسة ملف في قطاع {practice.titleAr}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 rounded text-xs font-semibold text-navy-800 hover:bg-navy-200 transition-colors"
            >
              إغلاق
            </button>
            <button
              onClick={() => {
                onClose();
                onBookConsultation(practice.titleAr);
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded text-xs font-semibold text-navy-950 bg-gold-400 hover:bg-gold-300 shadow-sm transition-colors"
            >
              طلب استشارة في هذا المجال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
