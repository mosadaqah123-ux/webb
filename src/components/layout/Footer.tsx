"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Shield, MapPin, Phone, Mail, Lock } from "lucide-react";
import { practiceAreas } from "@/data/practiceAreas";
import { SiteSettings } from "@/types/site";
import { defaultSiteSettings } from "@/data/siteDefaults";

interface FooterProps {
  siteSettings?: SiteSettings;
}

export default function Footer({
  siteSettings = defaultSiteSettings,
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-navy-950 text-ivory-100 border-t border-gold-400/20 overflow-hidden">
      {/* Subtle Najdi Pattern */}
      <div className="absolute inset-0 najdi-pattern-dark opacity-30 pointer-events-none" />

      {/* Traditional Najdi Architectural Top Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Brand Lockup & Official Statement */}
          <div className="lg:col-span-4 space-y-6">
            <Link
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/musadqh-logo-white.png"
                alt="شركة مصادقة للمحاماة والاستشارات القانونية"
                className="h-12 sm:h-14 w-auto max-w-[240px] object-contain transition-transform duration-300 hover:scale-[1.02]"
              />
            </Link>

            <p className="text-xs text-ivory-300/80 leading-relaxed font-light">
              {siteSettings.footerDescriptionAr}
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-gold-400">
              <Shield className="w-4 h-4 text-gold-400 shrink-0" />
              <span>{siteSettings.footerLicenseNoteAr}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-ivory-50 tracking-wider border-r-2 border-gold-400 pr-2.5">
              عن الشركة
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory-300/80">
              <li>
                <a href="#about" className="hover:text-gold-300 transition-colors inline-block hover:-translate-x-0.5 duration-200">
                  نبذة عن المنظومة
                </a>
              </li>
              <li>
                <a href="#attorneys" className="hover:text-gold-300 transition-colors inline-block hover:-translate-x-0.5 duration-200">
                  فريق الشركاء والمستشارين
                </a>
              </li>
              <li>
                <a href="#values" className="hover:text-gold-300 transition-colors inline-block hover:-translate-x-0.5 duration-200">
                  قيمنا ورؤيتنا 2030
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-gold-300 transition-colors inline-block hover:-translate-x-0.5 duration-200">
                  الرؤى والبحوث النظامية
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold-300 transition-colors inline-block hover:-translate-x-0.5 duration-200">
                  طلب استشارة استراتيجية
                </a>
              </li>
            </ul>
          </div>

          {/* Practice Areas Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-ivory-50 tracking-wider border-r-2 border-gold-400 pr-2.5">
              مجالات الممارسة
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory-300/80">
              {practiceAreas.map((p) => (
                <li key={p.id}>
                  <a
                    href="#practices"
                    className="hover:text-gold-300 transition-colors truncate block hover:-translate-x-0.5 duration-200"
                  >
                    {p.titleAr}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Headquarters & Compliance Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-ivory-50 tracking-wider border-r-2 border-gold-400 pr-2.5">
              المقر والتواصل
            </h4>
            <div className="space-y-3 text-xs text-ivory-300/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{siteSettings.footerAddressAr}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span dir="ltr" className="font-mono text-ivory-200">{siteSettings.phonePrimary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="font-mono text-ivory-200">{siteSettings.footerEmail}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-navy-900 border border-gold-400/30 text-gold-300 hover:text-gold-200 hover:border-gold-400 text-xs transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <span>العودة للأعلى</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Sample Content Disclaimer */}
        <div className="pt-8 border-t border-navy-800 text-xs text-ivory-300/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-right">
            <p>
              © {new Date().getFullYear()} شركة مصادقة للمحاماة والاستشارات القانونية (Musadqh Law Firm). جميع الحقوق محفوظة.
            </p>
            <p className="text-[11px] text-gold-400/60 mt-1">
              {siteSettings.footerDisclaimerAr}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <a href="#about" className="hover:text-gold-300 transition-colors">
              سياسة الخصوصية
            </a>
            <span>•</span>
            <a href="#about" className="hover:text-gold-300 transition-colors">
              الشروط والأحكام
            </a>
            <span>•</span>
            <a href="#about" className="hover:text-gold-300 transition-colors">
              ميثاق السرية المهنية
            </a>
            <span>•</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-gold-400/80 hover:text-gold-300 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>بوابة الإدارة</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
