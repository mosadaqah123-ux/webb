"use client";

import React from "react";
import { PracticeArea } from "@/data/practiceAreas";
import {
  X,
  Scale,
  Building2,
  ShieldAlert,
  Users,
  Briefcase,
  Landmark,
  Coins,
  FileCheck2,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
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
    Scale,
    Building2,
    ShieldAlert,
    Users,
    Briefcase,
    Landmark,
    Coins,
    FileCheck2,
  };

  const Icon = iconMap[practice.icon] || Scale;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-navy-200 overflow-hidden z-10 animate-scaleUp my-8 text-navy-900 flex flex-col max-h-[90vh]">
        {/* Top Gold Bar */}
        <div className="h-1.5 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 shrink-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-navy-100/90 hover:bg-navy-200 text-navy-800 transition-colors z-20"
          aria-label="إغلاق تفاصيل الممارسة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-navy-950 text-ivory-50 p-6 sm:p-8 relative overflow-hidden shrink-0">
          <div className="absolute inset-0 najdi-pattern-dark opacity-30 pointer-events-none" />

          <div className="relative z-10 flex items-start gap-4 sm:gap-5">
            <div className="w-14 h-14 rounded-xl bg-navy-800 border border-gold-400/40 text-gold-300 flex items-center justify-center shrink-0 shadow-md">
              <Icon className="w-7 h-7" />
            </div>

            <div className="space-y-1 pr-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-gold-400/20 text-gold-300 border border-gold-400/30 text-xs font-mono font-bold">
                  {practice.number}
                </span>
                <span className="text-xs font-mono text-gold-400/90 tracking-wider">
                  {practice.titleEn}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-ivory-50">
                {practice.titleAr}
              </h2>
              <div className="text-xs sm:text-sm text-gold-300/90 font-medium">
                {practice.subtitleAr}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Detailed Narrative */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-navy-950 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>نبذة عن التمثيل والممارسة القانونية</span>
            </h3>
            <p className="text-xs sm:text-sm text-navy-800/85 leading-relaxed bg-navy-50/50 p-4 rounded-xl border border-navy-100">
              {practice.detailedDesc}
            </p>
          </div>

          {/* SubCategories (if any, like Area 07) OR Standard Services List */}
          {practice.subCategories && practice.subCategories.length > 0 ? (
            <div className="space-y-5 pt-3 border-t border-navy-100">
              <h3 className="text-sm font-bold text-navy-950">
                نطاق الممارسة القانونية والمسارات التخصصية
              </h3>
              <div className="space-y-4">
                {practice.subCategories.map((sub, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-xl bg-ivory-50 border border-navy-100/80 space-y-2.5"
                  >
                    <h4 className="text-xs font-bold text-navy-900 text-gold-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-gold-500" />
                      <span>{sub.title}</span>
                    </h4>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      {sub.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-start gap-2 text-navy-800 leading-relaxed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3 pt-3 border-t border-navy-100">
              <h3 className="text-sm font-bold text-navy-950">
                نطاق الممارسة القانونية المشمولة
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {practice.keyServices.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-ivory-50 text-navy-800 border border-navy-100/60 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regulatory Frameworks */}
          <div className="space-y-3 pt-4 border-t border-navy-100">
            <h3 className="text-sm font-bold text-navy-950 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-gold-600" />
              <span>الأنظمة والأطر القضائية ذات الصلة بالمملكة العربية السعودية</span>
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {practice.regulatoryFocus.map((reg, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-navy-900 text-gold-300 border border-gold-400/30 text-[11px] font-semibold"
                >
                  {reg}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-ivory-100 px-6 py-4 border-t border-navy-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-navy-600 text-center sm:text-right">
            <span>طلب تمثيل قانوني أو استشارة في {practice.titleAr}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold text-navy-800 hover:bg-navy-200 transition-colors"
            >
              إغلاق
            </button>
            <button
              onClick={() => {
                onClose();
                onBookConsultation(practice.titleAr);
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold text-navy-950 bg-gold-400 hover:bg-gold-300 shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <span>طلب دراسة قضية</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
