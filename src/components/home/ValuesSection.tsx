import React from "react";
import Image from "next/image";
import { firmValues, firmDifferentiators } from "@/data/values";
import { BookOpenCheck, ShieldAlert, Compass, Lock } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ValuesSection() {
  const iconMap: Record<string, React.ElementType> = {
    BookOpenCheck,
    ShieldAlert,
    Compass,
    Lock,
  };

  return (
    <section id="values" className="relative py-24 sm:py-32 bg-navy-950 text-ivory-50 overflow-hidden scroll-mt-24">
      {/* Subtle Najdi Lattice Background */}
      <div className="absolute inset-0 najdi-pattern-dark opacity-30 pointer-events-none" />

      {/* Traditional Najdi Triangular Frieze Divider Top & Hairline */}
      <div className="absolute top-0 left-0 right-0 h-1.5 najdi-frieze opacity-70" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/35 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal>
          <div className="max-w-3xl mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy-900 border border-gold-400/30 text-gold-300 text-xs font-semibold mb-4 tracking-wider">
              <span>قيم مصادقة ومكامن التميز | Core Values</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory-50 tracking-tight leading-[1.25] mb-4">
              مرتكزات الثقة..{" "}
              <span className="text-gold-400 font-amiri font-normal block sm:inline">
                وأركان الحصانة النظامية
              </span>
            </h2>

            <p className="text-base sm:text-lg text-ivory-300/80 font-light leading-relaxed">
              تنطلق ممارستنا المهنية من التزام أصيل بالقيم العدلية الإسلامية، والفهم الدقيق للأنظمة
              المرعية، مع تسخير أحدث المنهجيات العالمية لإدارة العمل القانوني بكفاءة مطلقة.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Core Values Grid with Staggered Scroll Reveal & Refined Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {firmValues.map((val, idx) => {
            const Icon = iconMap[val.icon] || BookOpenCheck;
            return (
              <ScrollReveal key={val.id} delay={idx * 75}>
                <div
                  className="relative bg-navy-900/50 rounded-xl border border-gold-400/20 hover:border-gold-400/50 p-6 flex flex-col justify-between transition-all duration-300 hover:bg-navy-900/80 hover:shadow-gold-glow/15 transform hover:-translate-y-1.5 group h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded bg-navy-800 border border-gold-400/30 text-gold-300 flex items-center justify-center transition-all duration-300 group-hover:bg-gold-400 group-hover:text-navy-950 group-hover:border-gold-400">
                        <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
                      </div>
                      <span className="text-[11px] font-semibold text-gold-400/80 px-2.5 py-0.5 rounded bg-navy-950/60 border border-gold-400/20 transition-colors group-hover:border-gold-400/40 group-hover:text-gold-200">
                        {val.badgeAr}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-ivory-100 group-hover:text-gold-300 transition-colors duration-200 mb-3">
                      {val.titleAr}
                    </h3>

                    <p className="text-xs text-ivory-300/80 font-light leading-relaxed">
                      {val.descAr}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Differentiators & Architectural Accent with Scroll Reveal */}
        <ScrollReveal delay={150}>
          <div className="rounded-2xl bg-gradient-to-br from-navy-900/90 via-navy-850/80 to-navy-900/90 border border-gold-400/25 hover:border-gold-400/40 p-8 sm:p-12 relative overflow-hidden transition-all duration-300 shadow-xl group">
            {/* Subtle Watermark Arch in Background */}
            <div className="absolute -left-12 -bottom-12 w-64 h-64 opacity-5 pointer-events-none transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/musadqh-emblem-gold.png"
                alt="شعار مصادقة"
                fill
                sizes="256px"
                className="object-contain"
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono text-gold-400 tracking-wider">
                  WHY MUSADQH LAW FIRM
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-ivory-50 leading-snug">
                  لماذا تختار كبرى المؤسسات الاستشارية والقانونية «مصادقة»؟
                </h3>
                <p className="text-xs sm:text-sm text-ivory-300/80 leading-relaxed font-light">
                  نضع على عاتقنا مسؤولية حماية أعمال عملائنا بأعلى درجات اليقظة والالتزام، ونوفر
                  قناة تواصل مباشرة ودائمة مع الشركاء التنفيذيين والمستشارين المتخصصين.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {firmDifferentiators.map((diff, idx) => (
                  <div
                    key={idx}
                    className="space-y-2 border-r-2 border-gold-400/30 pr-4 transition-colors duration-200 hover:border-gold-400"
                  >
                    <span className="text-xs font-mono font-bold text-gold-400">
                      {diff.number}
                    </span>
                    <h4 className="text-sm font-bold text-ivory-100">
                      {diff.titleAr}
                    </h4>
                    <p className="text-xs text-ivory-300/70 leading-relaxed font-light">
                      {diff.descAr}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
