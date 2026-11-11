"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, ShieldCheck, PhoneCall, AlertCircle } from "lucide-react";
import { practiceAreas } from "@/data/practiceAreas";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  defaultTopic = "",
}: ConsultationModalProps) {
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    entity: "",
    phone: "",
    email: "",
    practiceArea: "",
    notes: "",
  });

  useEffect(() => {
    if (!isOpen) return;
    setErrorMsg(null);
    const matchedArea = practiceAreas.find((p) => defaultTopic.includes(p.titleAr));
    setFormData((prev) => ({
      ...prev,
      practiceArea: matchedArea ? matchedArea.titleAr : "",
      notes: defaultTopic.startsWith("حجز استشارة مع:") ? defaultTopic : "",
    }));
  }, [isOpen, defaultTopic]);

  if (!isOpen) return null;

  const preferredAttorney = defaultTopic.startsWith("حجز استشارة مع:")
    ? defaultTopic.replace("حجز استشارة مع:", "").trim()
    : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "consultation_modal",
          fullName: formData.name,
          organization: formData.entity,
          phone: formData.phone,
          email: formData.email,
          practiceArea: formData.practiceArea || "استشارة قانونية عامة",
          preferredAttorney,
          message: formData.notes,
        }),
      });

      const data = (await response.json()) as { id?: string; error?: string };
      if (!response.ok) {
        setErrorMsg(data.error || "تعذر تسجيل الطلب. يرجى المحاولة مرة أخرى.");
        return;
      }

      setSubmittedId(data.id || "REQ");
      setFormData({
        name: "",
        entity: "",
        phone: "",
        email: "",
        practiceArea: "",
        notes: "",
      });
    } catch {
      setErrorMsg("تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmittedId(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/85 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-navy-950 text-ivory-50 rounded-2xl shadow-2xl border border-gold-400/30 overflow-hidden z-10 animate-scaleUp my-8">
        <div className="h-1.5 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500" />

        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-navy-800 hover:bg-navy-700 text-ivory-200 transition-colors z-20"
          aria-label="إغلاق نافذة حجز الاستشارة"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {submittedId ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-ivory-50">
                تم تسجيل موعد الاستشارة بنجاح
              </h3>
              <div className="inline-block px-3 py-1 rounded bg-navy-900 border border-gold-400/30 text-xs font-mono text-gold-300">
                رقم المرجع: {submittedId}
              </div>
              <p className="text-xs sm:text-sm text-ivory-300/80 max-w-sm mx-auto leading-relaxed">
                شكراً لاختياركم «مصادقة للمحاماة». تم حفظ طلبكم وسيقوم منسق القضايا بالتواصل معكم خلال ساعات العمل المعتمدة.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded text-xs font-semibold bg-gold-400 text-navy-950 hover:bg-gold-300 transition-colors"
                >
                  إغلاق النافذة
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded bg-navy-800 text-gold-400">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ivory-50">
                    طلب حجز استشارة استراتيجية
                  </h3>
                  <p className="text-xs text-ivory-300/70">
                    مصادقة للمحاماة والاستشارات القانونية
                  </p>
                </div>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 p-2.5 rounded bg-red-950/60 border border-red-400/40 text-xs text-red-200">
                  <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-ivory-200 mb-1">
                    الاسم الكريم <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="الاسم الثلاثي أو اللقب الرسمي"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-navy-900 border border-navy-700 focus:border-gold-400 text-ivory-100 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-ivory-200 mb-1">
                      رقم الهاتف الجوال <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05X XXX XXXX"
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-navy-900 border border-navy-700 focus:border-gold-400 text-ivory-100 focus:outline-none text-right"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-ivory-200 mb-1">
                      البريد الإلكتروني <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@organization.sa"
                      dir="ltr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-navy-900 border border-navy-700 focus:border-gold-400 text-ivory-100 focus:outline-none text-right"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-ivory-200 mb-1">
                    الكيان / المؤسسة (إن وجد)
                  </label>
                  <input
                    type="text"
                    placeholder="اسم الشركة أو الجهة الاعتبارية"
                    value={formData.entity}
                    onChange={(e) => setFormData({ ...formData, entity: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-navy-900 border border-navy-700 focus:border-gold-400 text-ivory-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ivory-200 mb-1">
                    مجال الاستشارة المطلوب
                  </label>
                  <select
                    value={formData.practiceArea}
                    onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-navy-900 border border-navy-700 focus:border-gold-400 text-ivory-100 focus:outline-none"
                  >
                    <option value="">استشارة قانونية عامة</option>
                    {practiceAreas.map((p) => (
                      <option key={p.id} value={p.titleAr}>
                        {p.titleAr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-ivory-200 mb-1">
                    ملاحظات أو رغبة في شريك محدد
                  </label>
                  <textarea
                    rows={2}
                    placeholder="بيان موجز للموضوع أو تحديد اسم المستشار المطلوب..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-navy-900 border border-navy-700 focus:border-gold-400 text-ivory-100 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded font-semibold text-xs text-navy-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 disabled:opacity-60 disabled:cursor-not-allowed shadow-gold-glow transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "جاري التسجيل..." : "تأكيد إرسال الطلب"}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-ivory-300/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400/80" />
                <span>جلسات الاستشارة مشمولة باتفاقيات السرية وعدم الإفصاح المعتمدة (NDA).</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
