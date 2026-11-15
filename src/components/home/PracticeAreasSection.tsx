"use client";

import React, { useState } from "react";
import { practiceAreas, PracticeArea } from "@/data/practiceAreas";
import {
  Scale,
  Building2,
  ShieldAlert,
  Users,
  Briefcase,
  Landmark,
  Coins,
  FileCheck2,
  ArrowLeft,
  CheckCircle,
  Layers,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface PracticeAreasSectionProps {
  onSelectPractice: (practice: PracticeArea) => void;
  onOpenConsultation: () => void;
}

type FilterCategory = "all" | "business" | "civil_litigation";

export default function PracticeAreasSection({
  onSelectPractice,
  onOpenConsultation,
}: PracticeAreasSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

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

  const businessIds = new Set([
    "commercial-corporate",
    "labor-employment",
    "banking-finance-insurance",
    "judicial-enforcement",
  ]);

  const civilLitigationIds = new Set([
    "civil-real-estate",
    "criminal-defense",
    "family-personal-status",
    "administrative-litigation",
  ]);

  const filteredPractices = practiceAreas.filter((practice) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "business") return businessIds.has(practice.id);
    if (activeFilter === "civil_litigation") return civilLitigationIds.has(practice.id);
    return true;
  });

  return (
    <section
      id="practices"
      className="relative py-24 sm:py-32 bg-navy-950 text-ivory-50 overflow-hidden scroll-mt-24"
    >
      {/* Top Transition Border: Najdi Frieze & Subtle Hairline */}
      <div className="absolute top-0 left-0 right-0 h-1.5 najdi-frieze opacity-70" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/35 to-transparent" />

      {/* Background Subtle Elements */}
      <div className="absolute inset-0 najdi-pattern-dark opacity-35 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-navy-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Scroll Reveal */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy-900 border border-gold-400/30 text-gold-300 text-xs font-semibold mb-4 tracking-wider">
                <Layers className="w-3.5 h-3.5 text-gold-400" />
                <span>مجالات الممارسة القانونية | Practice Areas</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory-50 tracking-tight leading-[1.25]">
                خبرات قانونية متعددة..{" "}
                <span className="text-gold-400 font-amiri font-normal block sm:inline">
                  لحماية الحقوق وصون المصالح
                </span>
              </h2>

              <p className="text-base sm:text-lg text-ivory-300/85 mt-4 font-light leading-relaxed">
                تقدم شركة مصادقة للمحاماة والاستشارات القانونية خدماتها في مختلف المجالات القضائية
                والنظامية، من خلال فريق يتولى دراسة القضايا، وتحليل الوقائع والمستندات، وإعداد
                المذكرات واللوائح، والترافع أمام المحاكم والجهات القضائية وشبه القضائية المختصة وفق الأنظمة السعودية.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-navy-900/90 p-1.5 rounded-xl border border-gold-400/25 text-xs self-start md:self-end shadow-inner">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                  activeFilter === "all"
                    ? "bg-gold-400 text-navy-950 font-bold shadow-sm"
                    : "text-ivory-300/80 hover:text-gold-300"
                }`}
              >
                كافة المجالات ({practiceAreas.length})
              </button>
              <button
                onClick={() => setActiveFilter("business")}
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                  activeFilter === "business"
                    ? "bg-gold-400 text-navy-950 font-bold shadow-sm"
                    : "text-ivory-300/80 hover:text-gold-300"
                }`}
              >
                قطاع الأعمال والتمويل
              </button>
              <button
                onClick={() => setActiveFilter("civil_litigation")}
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                  activeFilter === "civil_litigation"
                    ? "bg-gold-400 text-navy-950 font-bold shadow-sm"
                    : "text-ivory-300/80 hover:text-gold-300"
                }`}
              >
                التقاضي المدني والإداري
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Practice Cards Grid: 8 Cards in 4 columns for desktop, 2 for tablet, 1 for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPractices.map((practice, idx) => {
            const Icon = iconMap[practice.icon] || Scale;
            return (
              <ScrollReveal key={practice.id} delay={idx * 60}>
                <div className="group relative h-full bg-navy-900/70 hover:bg-navy-900/95 rounded-xl border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300 p-6 flex flex-col justify-between shadow-lg hover:shadow-gold-glow/20 transform hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-gold-400/50">
                  {/* Top Architectural Corner & Number Accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-gold-400/20 to-transparent rounded-tr-xl pointer-events-none transition-opacity duration-300 group-hover:from-gold-400/35" />

                  <div>
                    {/* Top Bar with Icon & Sequence Number */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-11 h-11 rounded-lg bg-navy-800/90 border border-gold-400/30 text-gold-300 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-gold-400 group-hover:text-navy-950 group-hover:border-gold-400 shadow-sm">
                        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-0.5 rounded bg-navy-800/80 border border-gold-400/20 font-mono text-xs font-bold text-gold-400 tracking-wider">
                          {practice.number}
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-gold-400/80 tracking-wider mb-1 line-clamp-1">
                      {practice.titleEn}
                    </div>

                    <h3 className="text-lg font-bold text-ivory-100 group-hover:text-gold-300 transition-colors duration-200 mb-2 leading-snug">
                      {practice.titleAr}
                    </h3>

                    <div className="text-xs text-gold-400/90 font-medium mb-3 line-clamp-2">
                      {practice.subtitleAr}
                    </div>

                    <p className="text-xs text-ivory-300/80 font-light leading-relaxed mb-5 line-clamp-3">
                      {practice.shortDesc}
                    </p>

                    {/* Key Services Preview (First 3 items) */}
                    <div className="space-y-2 mb-5 pt-3.5 border-t border-navy-800/80">
                      {practice.keyServices.slice(0, 3).map((service, sIdx) => {
                        const serviceTitle = service.split(":")[0];
                        return (
                          <div
                            key={sIdx}
                            className="flex items-start gap-2 text-xs text-ivory-200/90"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                            <span className="truncate">{serviceTitle || service}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Card Actions */}
                  <div className="pt-4 border-t border-navy-800 flex items-center justify-between mt-auto">
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
                      طلب موعد
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Practice Areas Bottom Philosophical Strip */}
        <ScrollReveal delay={200}>
          <div className="mt-16 bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-400/30 rounded-2xl p-7 sm:p-9 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl transition-all duration-300 hover:border-gold-400/50">
            <div className="space-y-2 text-center lg:text-right max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs text-gold-400 font-bold">
                <span>مصادقة للمحاماة والاستشارات القانونية</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-ivory-100 font-amiri">
                نقف مع عملائنا في مختلف مراحل النزاع.. من الفحص إلى التنفيذ
              </h4>
              <p className="text-xs sm:text-sm text-ivory-300/80 leading-relaxed font-light">
                من دراسة الموقف القانوني وتقييم الأدلة، إلى الترافع والاعتراض على الأحكام ومتابعة
                تنفيذها وفقًا للأنظمة السعودية. نؤمن بأن الممارسة القانونية الفاعلة تبدأ بفهم دقيق
                للوقائع، وتقوم على سلامة الإجراءات، وقوة الحجة، ووضوح الاستراتيجية.
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="shrink-0 px-7 py-3.5 rounded-lg text-sm font-semibold text-navy-950 bg-gold-400 hover:bg-gold-300 shadow-gold-glow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              طلب استشارة في أحد المجالات
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
