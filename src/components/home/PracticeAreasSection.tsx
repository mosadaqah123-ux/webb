"use client";

import React, { useState } from "react";
import { practiceAreas, PracticeArea } from "@/data/practiceAreas";
import {
  Building2,
  Scale,
  Globe2,
  Landmark,
  Coins,
  ShieldCheck,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface PracticeAreasSectionProps {
  onSelectPractice: (practice: PracticeArea) => void;
  onOpenConsultation: () => void;
}

export default function PracticeAreasSection({
  onSelectPractice,
  onOpenConsultation,
}: PracticeAreasSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const iconMap: Record<string, React.ElementType> = {
    Building2,
    Scale,
    Globe2,
    Landmark,
    Coins,
    ShieldCheck,
  };

  const filteredPractices =
    activeFilter === "all"
      ? practiceAreas
      : activeFilter === "featured"
      ? practiceAreas.filter((p) => p.featured)
      : practiceAreas;

  return (
    <section id="practices" className="relative py-24 sm:py-32 bg-navy-950 text-ivory-50 overflow-hidden scroll-mt-24">
      {/* Top Transition Border: Najdi Frieze & Subtle Hairline */}
      <div className="absolute top-0 left-0 right-0 h-1.5 najdi-frieze opacity-70" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/35 to-transparent" />

      {/* Background Subtle Elements */}
      <div className="absolute inset-0 najdi-pattern-dark opacity-35 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Scroll Reveal */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy-900 border border-gold-400/30 text-gold-300 text-xs font-semibold mb-4 tracking-wider">
                <span>الممارسات القانونية التخصصية | Practice Areas</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory-50 tracking-tight leading-[1.25]">
                مجالات الممارسة..{" "}
                <span className="text-gold-400 font-amiri font-normal block sm:inline">
                  رؤية نظامية متكاملة
                </span>
              </h2>

              <p className="text-base sm:text-lg text-ivory-300/80 mt-4 font-light leading-relaxed">
                تغطية نظامية شاملة مصممة بعناية لتلبية المتطلبات الدقيقة للشركات المساهمة، المجموعات
                العائلية، والمستثمرين الإقليميين والدوليين في المملكة.
              </p>
            </div>

            {/* Filter Pills with Keyboard Focus & Active Transitions */}
            <div className="flex items-center gap-2 bg-navy-900/80 p-1.5 rounded-lg border border-gold-400/20 text-xs self-start md:self-end">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1.5 rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                  activeFilter === "all"
                    ? "bg-gold-400 text-navy-950 font-bold shadow-sm"
                    : "text-ivory-300/80 hover:text-gold-300"
                }`}
              >
                كافة الممارسات ({practiceAreas.length})
              </button>
              <button
                onClick={() => setActiveFilter("featured")}
                className={`px-3 py-1.5 rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                  activeFilter === "featured"
                    ? "bg-gold-400 text-navy-950 font-bold shadow-sm"
                    : "text-ivory-300/80 hover:text-gold-300"
                }`}
              >
                القطاعات الرئيسية
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Practice Cards Grid with Staggered Scroll Reveal & Refined Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPractices.map((practice, idx) => {
            const Icon = iconMap[practice.icon] || Scale;
            return (
              <ScrollReveal key={practice.id} delay={idx * 75}>
                <div
                  className="group relative bg-navy-900/60 hover:bg-navy-900/90 rounded-xl border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300 p-7 flex flex-col justify-between shadow-lg hover:shadow-gold-glow/20 transform hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-gold-400/50"
                >
                  {/* Architectural Corner Accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-gold-400/20 to-transparent rounded-tr-xl pointer-events-none transition-opacity duration-300 group-hover:from-gold-400/35" />

                  <div>
                    {/* Top Bar with Icon & Title */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-lg bg-navy-800/80 border border-gold-400/30 text-gold-300 flex items-center justify-center transition-all duration-300 group-hover:bg-gold-400 group-hover:text-navy-950 group-hover:border-gold-400">
                        <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
                      </div>
                      <span className="text-[11px] font-mono text-gold-400/70 tracking-wider">
                        {practice.titleEn}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-ivory-100 group-hover:text-gold-300 transition-colors duration-200 mb-2">
                      {practice.titleAr}
                    </h3>

                    <div className="text-xs text-gold-400/90 font-medium mb-3">
                      {practice.subtitleAr}
                    </div>

                    <p className="text-sm text-ivory-300/80 font-light leading-relaxed mb-6 line-clamp-3">
                      {practice.shortDesc}
                    </p>

                    {/* Key Services Preview */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-navy-800/80">
                      {practice.keyServices.slice(0, 3).map((service, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs text-ivory-200/90">
                          <CheckCircle className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                          <span className="truncate">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Card Actions */}
                  <div className="pt-4 border-t border-navy-800 flex items-center justify-between">
                    <button
                      onClick={() => onSelectPractice(practice)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors py-1 group/btn focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400 rounded-sm"
                    >
                      <span>عرض النطاق النظامي</span>
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-1.5" />
                    </button>

                    <button
                      onClick={onOpenConsultation}
                      className="text-[11px] text-ivory-300/70 hover:text-ivory-100 underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400 rounded-sm"
                    >
                      حجز موعد
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Practice Areas Bottom Consultation Strip */}
        <ScrollReveal delay={200}>
          <div className="mt-16 bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-400/30 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl transition-all duration-300 hover:border-gold-400/50">
            <div className="space-y-1 text-center md:text-right">
              <h4 className="text-lg font-bold text-ivory-100">
                هل تبحث عن مشورة متخصصة في ملف نظامي غير مدرج أعلاه؟
              </h4>
              <p className="text-xs text-ivory-300/80">
                يقدم مستشارونا دراسات قانونية معمقة وصياغة عقود معقدة في كافة فروع القضاء السعودي.
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="shrink-0 px-6 py-3 rounded text-sm font-semibold text-navy-950 bg-gold-400 hover:bg-gold-300 shadow-gold-glow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              تواصل مع الشريك المختص
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
