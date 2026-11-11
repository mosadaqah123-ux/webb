"use client";

import React, { useState } from "react";
import Image from "next/image";
import { attorneys as defaultAttorneys, Attorney } from "@/data/attorneys";
import { ArrowLeft, Award, GraduationCap, Scale } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface AttorneysSectionProps {
  attorneys?: Attorney[];
  onSelectAttorney: (attorney: Attorney) => void;
  onOpenConsultation: (attorneyName?: string) => void;
}

type FilterCategory = "all" | Attorney["category"];

export default function AttorneysSection({
  attorneys = defaultAttorneys,
  onSelectAttorney,
  onOpenConsultation,
}: AttorneysSectionProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");

  const publishedAttorneys = attorneys.filter((a) => a.isPublished);

  const categories: { id: FilterCategory; label: string; count: number }[] = [
    { id: "all", label: "كافة الفريق", count: publishedAttorneys.length },
    {
      id: "leadership",
      label: "القيادة العدلية والتوثيق",
      count: publishedAttorneys.filter((a) => a.category === "leadership").length,
    },
    {
      id: "counsel",
      label: "المستشارون القانونيون",
      count: publishedAttorneys.filter((a) => a.category === "counsel").length,
    },
    {
      id: "lawyer",
      label: "المحامون والمحاميات",
      count: publishedAttorneys.filter((a) => a.category === "lawyer").length,
    },
  ];

  const filteredAttorneys =
    activeCategory === "all"
      ? publishedAttorneys
      : publishedAttorneys.filter((a) => a.category === activeCategory);

  return (
    <section
      id="attorneys"
      className="relative py-24 sm:py-32 bg-ivory-50 text-navy-900 overflow-hidden scroll-mt-24"
    >
      {/* Top Architectural Continuity Hairline Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      {/* Background Architectural Grid */}
      <div className="absolute inset-0 najdi-pattern-light opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal>
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-100 border border-gold-300 text-gold-700 text-xs font-semibold mb-4 tracking-wider">
              <span>فريق المحامين ونخبة المستشارين | Legal Team</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight leading-[1.25] mb-4">
              كفاءات قضائية رصينة..{" "}
              <span className="text-gold-600 font-amiri font-normal block sm:inline">
                وخبرات استشارية معتمدة
              </span>
            </h2>

            <p className="text-base sm:text-lg text-navy-800/80 font-light leading-relaxed">
              يضم فريق «مصادقة» نخبة من المحامين والموثقين والمستشارين القانونيين ذوي الخبرة
              القضائية والعدلية والتشريعية الرصينة، للتمثيل والمرافعة أمام المحاكم واللجان شبه
              القضائية وتقديم الاستشارات وصياغة العقود.
            </p>
          </div>

          {/* Dedicated Single-Row Category Filter Bar */}
          <div className="mb-10 sm:mb-12 flex flex-wrap items-center gap-2">
            <div className="inline-flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-navy-200/80 shadow-sm text-xs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-lg transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                    activeCategory === cat.id
                      ? "bg-navy-900 text-gold-300 font-bold shadow-sm"
                      : "text-navy-700 hover:text-navy-950 hover:bg-ivory-100"
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Executive Typographic Dossier Grid (2 Columns on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
          {filteredAttorneys.map((attorney, idx) => {
            const isLeadership = attorney.category === "leadership";
            const spanFullRow =
              filteredAttorneys.length % 2 === 1 && idx === 0 && isLeadership;
            const hasFullProfile = Boolean(attorney.fullBioAr && attorney.fullBioAr.length > 0);

            return (
              <ScrollReveal
                key={attorney.id}
                delay={(idx % 2) * 80}
                className={`h-full ${spanFullRow ? "lg:col-span-2" : ""}`}
              >
                <article
                  className={`group relative h-full bg-white rounded-2xl border border-navy-200/80 hover:border-gold-400/90 border-r-[3px] ${
                    isLeadership
                      ? "border-r-gold-500"
                      : "border-r-navy-900 group-hover:border-r-gold-400"
                  } shadow-sm hover:shadow-[0_18px_36px_-12px_rgba(11,25,48,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden transform hover:-translate-y-1 p-6 sm:p-7 focus-within:ring-2 focus-within:ring-gold-500/50`}
                >
                  {/* Subtle Stationery Corner Watermark */}
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 opacity-[0.035] group-hover:opacity-[0.06] pointer-events-none transition-opacity duration-300">
                    <Image
                      src="/musadqh-emblem-gold.png"
                      alt=""
                      fill
                      sizes="128px"
                      className="object-contain"
                    />
                  </div>

                  <div className="relative z-10">
                    {/* Optional Side Portrait ONLY when a real photo exists */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                      {attorney.portraitUrl && (
                        <div className="relative w-20 h-24 rounded-xl overflow-hidden border border-gold-400/40 shrink-0 bg-navy-950 shadow-sm">
                          <Image
                            src={attorney.portraitUrl}
                            alt={attorney.nameAr}
                            fill
                            sizes="80px"
                            className="object-cover object-top"
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        {/* Top Meta Row: Role Pill + Optional Verified Experience Badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                              isLeadership
                                ? "bg-navy-950 text-gold-300 border border-gold-400/30"
                                : "bg-gold-50 text-gold-800 border border-gold-300/70"
                            }`}
                          >
                            <Scale className="w-3 h-3 shrink-0" />
                            <span>{attorney.roleBadgeAr}</span>
                          </span>

                          {attorney.experienceBadgeAr && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-navy-900/5 border border-navy-200/70 text-[11px] font-semibold text-navy-900">
                              <Award className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                              <span>{attorney.experienceBadgeAr}</span>
                            </span>
                          )}
                        </div>

                        {/* Attorney Full Name */}
                        <h3 className="text-xl sm:text-[22px] font-bold text-navy-950 group-hover:text-gold-700 transition-colors duration-200 leading-snug">
                          {attorney.nameAr}
                        </h3>

                        {/* Official Title & Judicial / Advisory Rank */}
                        <div className="text-xs sm:text-sm text-gold-700 font-semibold mt-1 leading-relaxed">
                          {attorney.titleAr}
                        </div>
                      </div>
                    </div>

                    {/* Subtle Gold Hairline Divider */}
                    <div className="my-4 h-px w-16 bg-gradient-to-l from-gold-400 to-transparent group-hover:w-28 transition-all duration-300" />

                    {/* Academic / Credential Highlight Bar (when provided) */}
                    {attorney.educationSummaryAr && (
                      <div className="mb-3.5 flex items-start gap-2 rounded-lg bg-ivory-100/80 border border-navy-100 px-3.5 py-2 text-xs text-navy-900 font-medium">
                        <GraduationCap className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{attorney.educationSummaryAr}</span>
                      </div>
                    )}

                    {/* Readable Executive Bio or Pending Notice */}
                    {attorney.bioAr ? (
                      <p className="text-xs sm:text-sm text-navy-800/80 font-light leading-relaxed mb-4">
                        {attorney.bioAr}
                      </p>
                    ) : (
                      <p className="text-xs sm:text-sm text-navy-600/70 font-light leading-relaxed mb-4">
                        النبذة المهنية والمؤهلات العلمية التفصيلية قيد الإضافة والتحديث.
                      </p>
                    )}

                    {/* Practice Areas Tags (when provided) */}
                    {attorney.practiceAreas && attorney.practiceAreas.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {attorney.practiceAreas.map((area, aIdx) => (
                          <span
                            key={aIdx}
                            className="px-2.5 py-1 rounded-md bg-white border border-navy-200/75 text-[11px] text-navy-800 font-medium"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="relative z-10 pt-4 mt-5 border-t border-navy-100 flex items-center justify-between">
                    {hasFullProfile ? (
                      <button
                        type="button"
                        onClick={() => onSelectAttorney(attorney)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-navy-900 group-hover:text-gold-700 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 rounded-sm"
                      >
                        <span>عرض السيرة المهنية الكاملة</span>
                        <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1.5" />
                      </button>
                    ) : (
                      <span className="text-xs font-medium text-navy-500">
                        عضو الفريق القانوني
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => onOpenConsultation(attorney.nameAr)}
                      className="px-3.5 py-1.5 rounded-md bg-gold-50 hover:bg-gold-400 text-gold-800 hover:text-navy-950 border border-gold-300/70 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500"
                    >
                      طلب استشارة
                    </button>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Team Consultation CTA */}
        <ScrollReveal delay={160}>
          <div className="mt-14 text-center">
            <p className="text-xs sm:text-sm text-navy-700/75 mb-4">
              يسعد فريقنا القانوني والعدلي بدراسة ملفاتكم وتوجيهكم إلى المختص المناسب لقضيتكم أو استشارتكم.
            </p>
            <button
              type="button"
              onClick={() => onOpenConsultation()}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded bg-navy-900 text-ivory-50 hover:bg-navy-800 text-xs sm:text-sm font-semibold transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 shadow-sm"
            >
              <span>احجز استشارة مع الفريق القانوني</span>
              <ArrowLeft className="w-3.5 h-3.5 text-gold-400 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
