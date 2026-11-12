"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { practiceAreas } from "@/data/practiceAreas";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SiteSettings } from "@/types/site";
import { defaultSiteSettings } from "@/data/siteDefaults";

interface ContactSectionProps {
  siteSettings?: SiteSettings;
}

export default function ContactSection({
  siteSettings = defaultSiteSettings,
}: ContactSectionProps) {
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    phone: "",
    email: "",
    practiceArea: "",
    matterType: "corporate",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact_section",
          fullName: formData.fullName,
          organization: formData.organization,
          phone: formData.phone,
          email: formData.email,
          practiceArea: formData.practiceArea,
          message: formData.message,
        }),
      });

      const data = (await response.json()) as { id?: string; error?: string };
      if (!response.ok) {
        setErrorMsg(data.error || "تعذر إرسال الطلب. يرجى التحقق من البيانات.");
        return;
      }

      setSubmittedId(data.id || "REQ");
      setFormData({
        fullName: "",
        organization: "",
        phone: "",
        email: "",
        practiceArea: "",
        matterType: "corporate",
        message: "",
      });
    } catch {
      setErrorMsg("تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems: {
    icon: React.ElementType;
    title: string;
    line1: string;
    line1Dir?: "ltr" | "rtl";
    line1Class?: string;
    line2: string;
    line2Dir?: "ltr" | "rtl";
    line2Suffix?: string;
    line2Class?: string;
  }[] = [
    {
      icon: MapPin,
      title: siteSettings.headquartersTitleAr,
      line1: siteSettings.contactAddressAr,
      line2: siteSettings.contactCountryAr,
      line2Class: "text-gold-400/70 font-mono",
    },
    {
      icon: Phone,
      title: "الاتصال المباشر",
      line1: siteSettings.phonePrimary,
      line1Dir: "ltr" as const,
      line1Class: "font-mono text-right inline-block",
      line2: siteSettings.phoneWhatsapp,
      line2Dir: "ltr" as const,
      line2Suffix: " (واتساب الأعمال)",
      line2Class: "text-gold-400/70 font-mono text-right",
    },
    {
      icon: Mail,
      title: "المراسلات الرسمية الموثقة",
      line1: siteSettings.emailConsultations,
      line1Class: "font-mono",
      line2: siteSettings.emailInfo,
      line2Class: "text-gold-400/70 font-mono",
    },
    {
      icon: Clock,
      title: "ساعات العمل والاستقبال",
      line1: siteSettings.workingHoursMainAr,
      line2: siteSettings.workingHoursSubAr,
      line2Class: "text-gold-400/70",
    },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-navy-950 text-ivory-50 overflow-hidden scroll-mt-24">
      {/* Top Architectural Continuity Border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 najdi-frieze opacity-70" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/35 to-transparent" />

      {/* Background Architectural Patterns */}
      <div className="absolute inset-0 najdi-pattern-dark opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Firm Contact Info & Location */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy-900 border border-gold-400/30 text-gold-300 text-xs font-semibold mb-4 tracking-wider">
                  <span>{siteSettings.contactHeadingBadgeAr}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-ivory-50 tracking-tight leading-[1.25] mb-4">
                  {siteSettings.contactTitleAr}{" "}
                  <span className="text-gold-400 font-amiri font-normal block">
                    {siteSettings.contactHighlightAr}
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-ivory-300/80 font-light leading-relaxed">
                  {siteSettings.contactDescriptionAr}
                </p>
              </div>
            </ScrollReveal>

            {/* Direct Contact Cards with Staggered Scroll Reveal & Refined Interactions */}
            <div className="space-y-4 pt-4 border-t border-navy-800">
              {contactItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <ScrollReveal key={idx} delay={idx * 60}>
                    <div className="group flex items-start gap-4 p-4 rounded-lg bg-navy-900/60 border border-gold-400/20 hover:border-gold-400/50 hover:bg-navy-900/90 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm">
                      <div className="w-10 h-10 rounded bg-navy-800 text-gold-400 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-navy-950">
                        <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="font-bold text-ivory-100 text-sm group-hover:text-gold-300 transition-colors">
                          {item.title}
                        </div>
                        <div className={`text-ivory-300/80 ${item.line1Class || ""}`}>
                          <span dir={item.line1Dir}>{item.line1}</span>
                        </div>
                        <div className={item.line2Class || "text-ivory-300/70"}>
                          <span dir={item.line2Dir}>{item.line2}</span>
                          {"line2Suffix" in item && item.line2Suffix ? item.line2Suffix : null}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Confidentiality Notice */}
            <ScrollReveal delay={250}>
              <div className="flex items-center gap-2 p-3 bg-navy-900/80 border border-gold-400/30 rounded text-xs text-gold-300/90">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>كافة المعلومات والمستندات المرسلة تخضع للسرية المهنية المحمية نظاماً.</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Consultation Booking Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={120}>
              <div className="relative bg-navy-900/80 rounded-2xl border border-gold-400/30 hover:border-gold-400/40 p-5 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md transition-all duration-300">
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 rounded-t-2xl" />

                {submittedId ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-ivory-50">
                      تم استلام طلب الاستشارة بنجاح
                    </h3>
                    <div className="inline-block px-3 py-1 rounded bg-navy-950 border border-gold-400/30 text-xs font-mono text-gold-300">
                      رقم المرجع: {submittedId}
                    </div>
                    <p className="text-sm text-ivory-200/80 max-w-md mx-auto leading-relaxed">
                      شكراً لتواصلكم مع «مصادقة للمحاماة». تم تسجيل طلبكم لدى إدارة المكتب وسيقوم المستشار المختص بمراجعته والتواصل معكم لتأكيد الموعد.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setSubmittedId(null)}
                        className="px-6 py-2.5 rounded text-xs font-semibold bg-gold-400 text-navy-950 hover:bg-gold-300 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                      >
                        إرسال استفسار آخر
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-navy-800 pb-4">
                      <h3 className="text-xl font-bold text-ivory-100">
                        طلب دراسة ملف أو حجز موعد استشاري
                      </h3>
                      <p className="text-xs text-ivory-300/70 mt-1">
                        يرجى تعبئة الحقول الأساسية لتوجيه طلبكم للشريك أو المحامي المختص.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="flex items-center gap-2 p-3 rounded bg-red-950/60 border border-red-400/40 text-xs text-red-200">
                        <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-ivory-200">
                          الاسم الكامل <span className="text-gold-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="أدخل الاسم الثلاثي"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded bg-navy-950/80 border border-navy-700 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-sm text-ivory-100 focus:outline-none transition-all"
                        />
                      </div>

                      {/* Organization / Entity */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-ivory-200">
                          اسم الشركة / الجهة (اختياري)
                        </label>
                        <input
                          type="text"
                          placeholder="اسم الكيان التجاري أو المؤسسة"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded bg-navy-950/80 border border-navy-700 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-sm text-ivory-100 focus:outline-none transition-all"
                        />
                      </div>

                      {/* Mobile Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-ivory-200">
                          رقم الهاتف الجوال <span className="text-gold-400">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="05X XXX XXXX"
                          dir="ltr"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded bg-navy-950/80 border border-navy-700 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-sm text-ivory-100 focus:outline-none transition-all text-right"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-ivory-200">
                          البريد الإلكتروني <span className="text-gold-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          dir="ltr"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded bg-navy-950/80 border border-navy-700 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-sm text-ivory-100 focus:outline-none transition-all text-right"
                        />
                      </div>
                    </div>

                    {/* Practice Area Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-ivory-200">
                        مجال الممارسة القانونية المطلوب <span className="text-gold-400">*</span>
                      </label>
                      <select
                        required
                        value={formData.practiceArea}
                        onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded bg-navy-950/80 border border-navy-700 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-sm text-ivory-100 focus:outline-none transition-all"
                      >
                        <option value="" disabled>اختر التخصص القانوني</option>
                        {practiceAreas.map((p) => (
                          <option key={p.id} value={p.titleAr} className="bg-navy-900 text-ivory-100">
                            {p.titleAr}
                          </option>
                        ))}
                        <option value="استشارة قانونية عامة" className="bg-navy-900 text-ivory-100">
                          استشارة قانونية عامة / أخرى
                        </option>
                      </select>
                    </div>

                    {/* Brief Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-ivory-200">
                        موجز الموضوع أو الاستفسار
                      </label>
                      <textarea
                        rows={4}
                        placeholder="يرجى ذكر نبذة مختصرة عن طبيعة المشورة المطلوبة دون إدراج بيانات حساسة سرية في هذا النموذج..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded bg-navy-950/80 border border-navy-700 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-sm text-ivory-100 focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button with Restrained Press Feedback */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded font-semibold text-sm text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 disabled:opacity-60 disabled:cursor-not-allowed shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? "جاري إرسال الطلب..." : "إرسال طلب الاستشارة للمراجعة"}</span>
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
