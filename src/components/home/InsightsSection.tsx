import React from "react";
import { legalInsights } from "@/data/insights";
import { Clock, ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function InsightsSection() {
  return (
    <section id="insights" className="relative py-24 sm:py-32 bg-ivory-50 text-navy-900 overflow-hidden scroll-mt-24">
      {/* Top Architectural Continuity Hairline Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      {/* Background Subtle Elements */}
      <div className="absolute inset-0 najdi-pattern-light opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-100 border border-gold-300 text-gold-700 text-xs font-semibold mb-4 tracking-wider">
                <span>الرؤى والبحوث القانونية | Legal Insights</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight leading-[1.25]">
                قراءات نظامية معمقة..{" "}
                <span className="text-gold-600 font-amiri font-normal block sm:inline">
                  في مستجدات التشريع السعودي
                </span>
              </h2>

              <p className="text-base sm:text-lg text-navy-800/80 mt-4 font-light leading-relaxed">
                تحليلات دورية تصدر عن قسم البحوث في مصادقة للمحاماة، ترصد التحولات التنظيمية وأثرها
                على بيئة الأعمال والصفقات الاستثمارية.
              </p>
            </div>

            <div className="self-start md:self-end">
              <span className="text-xs text-navy-600 bg-navy-100 px-3 py-1 rounded-full font-medium">
                نماذج توضيحية للمقالات القانونية
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Insights Cards Grid with Staggered Scroll Reveal & Refined Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {legalInsights.map((insight, idx) => (
            <ScrollReveal key={insight.id} delay={idx * 80}>
              <article
                className="bg-white rounded-xl border border-navy-200/80 hover:border-gold-400/80 p-7 flex flex-col justify-between shadow-sm hover:shadow-[0_16px_32px_-10px_rgba(11,25,48,0.12)] transition-all duration-300 transform hover:-translate-y-1.5 group h-full focus-within:ring-2 focus-within:ring-gold-500/50"
              >
                <div>
                  {/* Meta details */}
                  <div className="flex items-center justify-between text-xs text-navy-600 mb-4 pb-3 border-b border-navy-100">
                    <span className="font-semibold text-gold-700 bg-gold-50 px-2.5 py-0.5 rounded border border-gold-200 transition-colors group-hover:bg-gold-100/70">
                      {insight.categoryAr}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-navy-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{insight.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-navy-950 group-hover:text-gold-700 transition-colors duration-200 leading-snug mb-3">
                    {insight.titleAr}
                  </h3>

                  <p className="text-xs text-navy-700/80 font-light leading-relaxed mb-6 line-clamp-3">
                    {insight.summaryAr}
                  </p>
                </div>

                <div className="pt-4 border-t border-navy-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-navy-900">{insight.authorAr}</div>
                    <div className="text-[10px] text-navy-500">{insight.authorRoleAr}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      alert(`قراءة المقال: "${insight.titleAr}"\n(سيتاح الأرشيف الكامل للدراسات في صفحة الرؤى القانونية).`);
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-gold-700 hover:text-gold-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 rounded-sm py-1"
                  >
                    <span>اقرأ المقال</span>
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1.5" />
                  </button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
