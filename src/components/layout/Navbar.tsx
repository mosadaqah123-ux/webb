"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, PhoneCall, Globe, ChevronLeft } from "lucide-react";

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "عن المكتب", href: "#about" },
    { name: "مجالات الممارسة", href: "#practices" },
    { name: "فريق المحامين", href: "#attorneys" },
    { name: "قيمنا ورؤيتنا", href: "#values" },
    { name: "الرؤى القانونية", href: "#insights" },
    { name: "تواصل معنا", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy-950/95 backdrop-blur-md border-b border-gold-400/20 py-3 shadow-navy-card"
          : "bg-gradient-to-b from-navy-950/85 via-navy-950/45 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo Lockup */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 rounded shrink-0 transition-transform duration-200"
            aria-label="مصادقة للمحاماة - الصفحة الرئيسية"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/musadqh-logo-white.png"
              alt="شعار مصادقة للمحاماة والاستشارات القانونية"
              className="h-8 sm:h-10 md:h-12 w-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links with Refined Hover Indicators */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-sm font-medium tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-ivory-100 hover:text-gold-300 transition-colors duration-200 py-1.5 px-0.5 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400 rounded-sm"
              >
                <span>{link.name}</span>
                {/* Elegant RTL Gold Underline Accent */}
                <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-gradient-to-l from-gold-400 via-gold-300 to-gold-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right motion-reduce:transition-none" />
              </a>
            ))}
          </nav>

          {/* Right Action Items */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Switcher Indicator (Architecture ready for English LTR) */}
            <button
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-semibold text-ivory-200/80 hover:text-gold-300 border border-gold-400/20 hover:border-gold-400/40 transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-1 focus-visible:ring-offset-navy-950"
              title="تغيير لغة العرض (English LTR architecture ready)"
              onClick={() => {
                alert("بنية الموقع مجهزة للغات المتعددة (Multilingual Ready). يتم تفعيل النسخة الإنجليزية بالكامل في المرحلة القادمة.");
              }}
            >
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span>EN</span>
            </button>

            {/* Consultation Action CTA with Restrained Press Feedback */}
            <button
              onClick={onOpenConsultation}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold tracking-wide text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 rounded hover:from-gold-200 hover:to-gold-400 shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              <PhoneCall className="w-4 h-4" />
              <span>حجز استشارة</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenConsultation}
              className="p-2 text-xs font-semibold text-navy-950 bg-gold-400 rounded hover:bg-gold-300 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              aria-label="حجز استشارة"
            >
              استشارة
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ivory-100 hover:text-gold-400 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded transition-all"
              aria-label="فتح القائمة الرئيسية"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-navy-950/98 border-b border-gold-400/30 backdrop-blur-xl px-4 pt-3 pb-6 transition-all">
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 text-base font-medium text-ivory-100 hover:bg-navy-900 hover:text-gold-400 rounded border-r-2 border-transparent hover:border-gold-400 transition-all active:translate-x-1"
              >
                <span>{link.name}</span>
                <ChevronLeft className="w-4 h-4 text-gold-400/60" />
              </a>
            ))}

            <div className="pt-4 mt-2 border-t border-navy-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded font-semibold text-navy-950 bg-gold-400 hover:bg-gold-300 active:scale-[0.98] transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>طلب استشارة استراتيجية</span>
              </button>

              <div className="flex items-center justify-between text-xs text-ivory-300/80 px-2 pt-2">
                <span>الرياض - طريق الملك فهد</span>
                <span className="text-gold-400 font-mono">AR | EN</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
