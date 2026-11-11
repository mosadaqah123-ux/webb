"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, ChevronDown, ShieldCheck } from "lucide-react";
import { institutionalPillars } from "@/data/stats";
import { SiteSettings } from "@/types/site";
import { defaultSiteSettings } from "@/data/siteDefaults";

interface HeroSectionProps {
  onOpenConsultation: () => void;
  siteSettings?: SiteSettings;
}

export default function HeroSection({
  onOpenConsultation,
  siteSettings = defaultSiteSettings,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-navy-950 text-ivory-50 pt-28 pb-6 sm:pt-32 sm:pb-8">
      {/* =========================================================================
          Architectural Website Background Image (Saudi Heritage Luxury Hall)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/hero-bg.jpg"
          alt="المقر التنفيذي لشركة مصادقة للمحاماة بتصميم معماري سعودي فاخر"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[65%_center] lg:object-center"
        />

        {/* Mobile Scrim: guarantees high contrast across narrow portrait screens */}
        <div className="absolute inset-0 bg-navy-950/65 lg:hidden" />

        {/* Desktop RTL Directional Editorial Scrim:
            Deepens the right walnut/stone zone for razor-sharp Arabic typography
            while leaving the illuminated limestone arches and Riyadh skyline open on the left. */}
        <div
          className="hidden lg:block absolute inset-0"
          style={{
            background:
              "linear-gradient(270deg, rgba(6,14,27,0.92) 0%, rgba(11,25,48,0.78) 38%, rgba(11,25,48,0.32) 64%, rgba(6,14,27,0.08) 100%)",
          }}
        />

        {/* Top Vignette: frames the fixed transparent navbar cleanly */}
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-navy-950/90 via-navy-950/45 to-transparent" />

        {/* Subtle Najdi Geometric Architectural Texture on the Right Editorial Half */}
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-1/2 najdi-pattern-dark opacity-30"
          style={{
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.8), transparent)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.8), transparent)",
          }}
        />

        {/* Bottom Vignette: smooth architectural blend into the pillars rail */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent" />
      </div>

      {/* =========================================================================
          Main Editorial RTL Hero Content (Asymmetric Luxury Layout)
          ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
          {/* Right Editorial Column (RTL Primary Anchor) */}
          <div className="lg:col-span-7 text-right flex flex-col items-start">
            {/* Refined Architectural Brand Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-3">
              <div className="relative w-5 h-5 shrink-0">
                <Image
                  src="/musadqh-emblem-gold.png"
                  alt="شعار مصادقة"
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span className="h-px w-8 bg-gradient-to-l from-gold-400 to-gold-400/20" />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-gold-300">
                {siteSettings.heroEyebrowAr}
              </span>
            </div>

            {/* Monumental Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-bold tracking-tight text-ivory-50 leading-[1.22] mb-6 drop-shadow-[0_4px_18px_rgba(0,0,0,0.65)]">
              {siteSettings.heroTitleLine1Ar}
              <span className="block mt-2 bg-gradient-to-l from-gold-100 via-gold-300 to-gold-400 bg-clip-text text-transparent font-amiri font-normal text-4xl sm:text-5xl lg:text-[58px] xl:text-[62px] leading-[1.2]">
                {siteSettings.heroTitleLine2Ar}
              </span>
            </h1>

            {/* Lead Statement with Vertical Gold Architectural Rule */}
            <p className="text-sm sm:text-base lg:text-lg text-ivory-100/90 max-w-xl font-light leading-relaxed mb-8 border-r-2 border-gold-400/60 pr-4 sm:pr-5">
              {siteSettings.heroSubtitleAr}
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-7 py-3.5 rounded text-sm sm:text-base font-semibold text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
              >
                {siteSettings.heroPrimaryCtaAr}
              </button>

              <a
                href="#practices"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded text-sm sm:text-base font-medium text-ivory-100 bg-navy-950/65 hover:bg-navy-900/90 border border-gold-400/35 hover:border-gold-300 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] backdrop-blur-sm group shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
              >
                <span>{siteSettings.heroSecondaryCtaAr}</span>
                <ArrowLeft className="w-4 h-4 text-gold-400 transition-transform duration-300 group-hover:-translate-x-1.5" />
              </a>
            </div>

            {/* Subtle Institutional Trust Footnote */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] sm:text-xs text-ivory-300/80">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>ترخيص مهني معتمد من وزارة العدل</span>
              </span>
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gold-400/40" />
              <span>تمثيل قضائي أمام كافة المحاكم واللجان</span>
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gold-400/40" />
              <span>سرية وميثاق مهني صارم</span>
            </div>
          </div>

          {/* Left Column: Intentionally Open Architectural Showcase Space */}
          <div className="hidden lg:block lg:col-span-5" aria-hidden="true" />
        </div>
      </div>

      {/* =========================================================================
          Grounded Bottom Architectural Pillars Strip
          ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
        <div className="bg-navy-950/75 border border-gold-400/20 backdrop-blur-md rounded-xl px-4 py-3.5 sm:px-6 sm:py-4 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:divide-x md:divide-x-reverse divide-gold-400/15">
            {institutionalPillars.map((pillar, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-start text-right ${
                  idx > 0 ? "md:pr-5" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400/80 shrink-0" />
                  <span className="text-sm sm:text-base lg:text-lg font-bold font-amiri text-gold-300">
                    {pillar.titleAr}
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-ivory-100 leading-snug">
                  {pillar.labelAr}
                </div>
                <div className="text-[10px] sm:text-[11px] text-ivory-300/70 mt-0.5 leading-normal hidden lg:block">
                  {pillar.sublabelAr}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-3">
          <a
            href="#about"
            className="text-gold-400/65 hover:text-gold-300 transition-colors animate-bounce p-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400 rounded-full"
            aria-label="الانتقال إلى قسم عن المكتب"
          >
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
