"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock scroll while the preloader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress increments smoothly over ~1.3 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate dynamically for natural organic feel
        const step =
          prev < 30
            ? Math.floor(Math.random() * 12) + 8
            : prev < 75
            ? Math.floor(Math.random() * 10) + 6
            : Math.floor(Math.random() * 8) + 4;
        const next = prev + step;
        return next > 100 ? 100 : next;
      });
    }, 55);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Pause briefly at 100% so the user sees completion
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 200);

      // Complete fade-out, restore scrolling, unmount from DOM
      const finishTimer = setTimeout(() => {
        setIsDone(true);
        document.body.style.overflow = "";
      }, 900); // 200ms hold + 700ms smooth fade

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(finishTimer);
        document.body.style.overflow = "";
      };
    }
  }, [progress]);

  if (isDone) return null;

  return (
    <div
      aria-label="شاشة تحميل الموقع"
      aria-hidden={isExiting}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-b from-[#050C17] via-[#0B1930] to-[#040810] text-ivory-50 select-none transition-all duration-700 ease-in-out ${
        isExiting
          ? "opacity-0 pointer-events-none scale-105"
          : "opacity-100 pointer-events-auto scale-100"
      }`}
    >
      {/* Top Transition Border: Najdi Frieze & Subtle Hairline */}
      <div className="absolute top-0 left-0 right-0 h-1.5 najdi-frieze opacity-70" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      {/* Subtle Background Najdi Pattern & Radiant Golden Aura */}
      <div className="absolute inset-0 najdi-pattern-dark opacity-40 pointer-events-none" />
      <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gold-400/10 blur-[100px] pointer-events-none animate-pulse" />

      {/* Central Content Column */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-md w-full">
        {/* Emblem Crest Container with Sovereign Rotating Rings */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-6">
          {/* Ambient Glow Halo */}
          <div className="absolute inset-0 rounded-full bg-gold-400/20 blur-xl animate-pulse" />

          {/* Outer Rotating Subtle Dashed Golden Ring */}
          <div className="absolute inset-0 rounded-full border border-gold-400/35 border-dashed animate-[spin_18s_linear_infinite]" />

          {/* Middle Hairline Geometric Ring */}
          <div className="absolute inset-2 rounded-full border border-gold-400/25" />

          {/* Inner Emblem Holder */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-navy-900/90 border border-gold-400/50 flex items-center justify-center p-3 shadow-2xl backdrop-blur-sm">
            <Image
              src="/musadqh-emblem-gold.png"
              alt="شعار شركة مصادقة للمحاماة"
              width={72}
              height={72}
              priority
              className="object-contain drop-shadow-[0_2px_10px_rgba(181,161,129,0.4)]"
            />
          </div>
        </div>

        {/* Brand Names & Judicial Slogan */}
        <div className="text-center space-y-2 mb-8 max-w-sm px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy-900/90 border border-gold-400/30 text-gold-300 text-[11px] sm:text-xs font-semibold tracking-wider shadow-sm">
            <span>شركة مصادقة للمحاماة والاستشارات القانونية</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ivory-50 font-amiri leading-tight">
            أصالة المشورة..{" "}
            <span className="text-gold-400">ورصانة التمثيل القضائي</span>
          </h2>

          <div className="text-[10px] sm:text-[11px] font-mono text-gold-400/75 tracking-[0.25em] uppercase">
            MUSADQH LAW FIRM
          </div>
        </div>

        {/* Slender Golden Progress Track & Counter */}
        <div className="w-60 sm:w-72 space-y-2.5">
          <div className="relative h-1.5 w-full bg-navy-900/90 rounded-full overflow-hidden border border-gold-400/30 p-[1px] shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(181,161,129,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-ivory-300/80 font-mono">
            <span className="text-gold-300/90 font-arabic text-[11px]">
              {progress < 35
                ? "تهيئة البوابة العدلية..."
                : progress < 75
                ? "تحميل الصياغات والممارسات..."
                : progress < 100
                ? "اكتمال المعالجة..."
                : "أهلاً بكم في مصادقة"}
            </span>
            <span className="text-gold-400 font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Institutional Ministry Note & Architectural Border */}
      <div className="absolute bottom-6 text-center text-[10px] text-ivory-400/60 tracking-wider">
        <span>مرخصة بموجب أنظمة وزارة العدل بالمملكة العربية السعودية</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1.5 najdi-frieze opacity-70" />
    </div>
  );
}
