import React from "react";
import Image from "next/image";
import { Scale, Shield, Landmark, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SiteSettings } from "@/types/site";
import { defaultSiteSettings } from "@/data/siteDefaults";

interface AboutSectionProps {
  siteSettings?: SiteSettings;
}

export default function AboutSection({
  siteSettings = defaultSiteSettings,
}: AboutSectionProps) {
  const pillars = [
    {
      title: "المرجعية التشريعية الرصينة",
      desc: "قراءة استباقية دقيقة للأنظمة السعودية المحدثة وأحكام القضاء التجاري والإداري، تصيغ لكم حماية قانونية استثنائية.",
      icon: Scale,
    },
    {
      title: "الحوكمة والسرية المطلقة",
      desc: "إجراءات حوكمة معلوماتية متقدمة تضمن أقصى درجات الحصانة لملفات الصفقات، المنازعات، وأسرار الشركات.",
      icon: Shield,
    },
    {
      title: "مواكبة تحولات رؤية المملكة 2030",
      desc: "تمكين الكيانات المحلية والعالمية من استثمار الفرص التشريعية والاستثمارية في المشاريع الكبرى والمناطق الخاصة.",
      icon: Landmark,
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-ivory-50 text-navy-900 overflow-hidden scroll-mt-24">
      {/* Top Architectural Continuity Hairline Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      {/* Subtle Pattern & Background Glow */}
      <div className="absolute inset-0 najdi-pattern-light opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal>
          <div className="max-w-3xl mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-100 border border-gold-300 text-gold-700 text-xs font-semibold mb-4 tracking-wider">
              <span>{siteSettings.aboutEyebrowAr}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight leading-[1.25] mb-6">
              {siteSettings.aboutTitleAr}{" "}
              <span className="text-gold-600 font-amiri font-normal block sm:inline">
                {siteSettings.aboutHighlightAr}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-navy-800/80 leading-relaxed font-light">
              {siteSettings.aboutLeadAr}
            </p>
          </div>
        </ScrollReveal>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Text & Key Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal delay={100}>
              <div className="prose prose-lg text-navy-800/80 leading-relaxed font-light space-y-4">
                <p>{siteSettings.aboutParagraph1Ar}</p>
                <p>{siteSettings.aboutParagraph2Ar}</p>
              </div>
            </ScrollReveal>

            {/* Three Institutional Pillars with Staggered Scroll Reveal & Refined Interactions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-navy-200/60">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <ScrollReveal key={idx} delay={150 + idx * 80}>
                    <div className="group p-4 rounded-xl border border-navy-200/60 hover:border-gold-400/60 bg-white/70 hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                      <div className="w-10 h-10 rounded bg-navy-900 text-gold-400 flex items-center justify-center shadow-sm mb-3 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-navy-950">
                        <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
                      </div>
                      <h3 className="text-base font-bold text-navy-950 group-hover:text-gold-700 transition-colors mb-1.5">
                        {pillar.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-navy-700/80">
                        {pillar.desc}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Accreditation Highlights */}
            <ScrollReveal delay={350}>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-medium text-navy-800/70">
                <span className="flex items-center gap-1.5 hover:text-gold-700 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-gold-600" />
                  ترخيص وزارة العدل
                </span>
                <span className="flex items-center gap-1.5 hover:text-gold-700 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-gold-600" />
                  عضوية الهيئة السعودية للمحامين
                </span>
                <span className="flex items-center gap-1.5 hover:text-gold-700 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-gold-600" />
                  محكمون معتمدون لدى SCCA
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Architectural Framing Showcase Card with Scroll Reveal & Hover Accent */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={200}>
              <div className="relative rounded-2xl bg-navy-950 text-ivory-50 p-8 sm:p-10 shadow-navy-card border border-gold-400/30 hover:border-gold-400/60 transition-all duration-300 hover:shadow-2xl overflow-hidden group">
                {/* Subtle Najdi Pattern inside card */}
                <div className="absolute inset-0 najdi-pattern-dark opacity-40 pointer-events-none" />

                {/* Architectural Top Arch Silhouette */}
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500" />

                {/* Watermark Logo Emblem */}
                <div className="absolute -bottom-10 -left-10 w-44 h-44 opacity-10 pointer-events-none transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src="/musadqh-emblem-gold.png"
                    alt="ختم مصادقة"
                    fill
                    sizes="176px"
                    className="object-contain"
                  />
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="relative w-12 h-12">
                      <Image
                        src="/musadqh-emblem-gold.png"
                        alt="شعار مصادقة"
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs font-mono text-gold-400/80 tracking-wider">
                      MUSADQH ETHOS
                    </span>
                  </div>

                  <div className="space-y-4">
                    <span className="text-4xl font-amiri text-gold-400 leading-none">“</span>
                    <blockquote className="text-lg sm:text-xl font-light leading-relaxed text-ivory-100 font-amiri">
                      {siteSettings.aboutQuoteAr}
                    </blockquote>
                  </div>

                  <div className="pt-6 border-t border-navy-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-gold-300">
                        {siteSettings.aboutQuoteAuthorAr}
                      </div>
                      <div className="text-xs text-ivory-300/70">
                        {siteSettings.firmNameAr}
                      </div>
                    </div>
                    <div className="text-left text-xs font-mono text-gold-400/80">
                      {siteSettings.aboutLocationTagAr}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
