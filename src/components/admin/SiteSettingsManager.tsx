"use client";

import React, { useState } from "react";
import { SiteSettings } from "@/types/site";
import { Save, Sparkles, Info, PhoneCall, LayoutTemplate } from "lucide-react";

interface SiteSettingsManagerProps {
  settings: SiteSettings;
  onSettingsChange: (next: SiteSettings) => void;
  onNotify: (type: "success" | "error", text: string) => void;
}

type SettingsSectionTab = "hero" | "about" | "contact" | "footer";

export default function SiteSettingsManager({
  settings,
  onSettingsChange,
  onNotify,
}: SiteSettingsManagerProps) {
  const [form, setForm] = useState<SiteSettings>(settings);
  const [sectionTab, setSectionTab] = useState<SettingsSectionTab>("contact");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as {
        settings?: SiteSettings;
        error?: string;
      };
      if (!response.ok || !data.settings) {
        onNotify("error", data.error || "تعذر حفظ بيانات الموقع.");
        return;
      }

      setForm(data.settings);
      onSettingsChange(data.settings);
      onNotify("success", "تم حفظ تحديثات الموقع وتطبيقها مباشرة.");
    } catch {
      onNotify("error", "حدث خطأ أثناء الاتصال بالخادم.");
    } finally {
      setSaving(false);
    }
  };

  const tabs: { id: SettingsSectionTab; label: string; icon: React.ElementType }[] = [
    { id: "contact", label: "بيانات التواصل والمقر", icon: PhoneCall },
    { id: "hero", label: "الواجهة الرئيسية (الهيرو)", icon: Sparkles },
    { id: "about", label: "قسم عن المكتب", icon: Info },
    { id: "footer", label: "التذييل والبيان الختامي", icon: LayoutTemplate },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Sub-navigation Pills */}
      <div className="bg-white rounded-2xl border border-navy-200/80 p-3 shadow-sm flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSectionTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                sectionTab === tab.id
                  ? "bg-navy-900 text-gold-300 shadow-sm"
                  : "text-navy-700 hover:bg-ivory-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Panel */}
      <div className="bg-white rounded-2xl border border-navy-200/80 p-6 sm:p-8 shadow-sm space-y-6 text-xs sm:text-sm">
        {sectionTab === "contact" && (
          <div className="space-y-5">
            <div className="border-b border-navy-100 pb-3">
              <h3 className="text-lg font-bold text-navy-950">بيانات التواصل ومقر المكتب</h3>
              <p className="text-xs text-navy-600 mt-0.5">
                تحديث أرقام الهواتف والبريد الإلكتروني والعنوان في قسم التواصل والتذييل
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldInput
                label="عنوان بطاقة المقر"
                value={form.headquartersTitleAr}
                onChange={(v) => setForm({ ...form, headquartersTitleAr: v })}
              />
              <FieldInput
                label="الدولة / المنطقة"
                value={form.contactCountryAr}
                onChange={(v) => setForm({ ...form, contactCountryAr: v })}
              />
              <FieldInput
                label="العنوان في قسم التواصل"
                value={form.contactAddressAr}
                onChange={(v) => setForm({ ...form, contactAddressAr: v })}
              />
              <FieldInput
                label="العنوان في التذييل"
                value={form.footerAddressAr}
                onChange={(v) => setForm({ ...form, footerAddressAr: v })}
              />
              <FieldInput
                label="رقم الهاتف المباشر"
                value={form.phonePrimary}
                dir="ltr"
                onChange={(v) => setForm({ ...form, phonePrimary: v })}
              />
              <FieldInput
                label="رقم الواتساب للأعمال"
                value={form.phoneWhatsapp}
                dir="ltr"
                onChange={(v) => setForm({ ...form, phoneWhatsapp: v })}
              />
              <FieldInput
                label="بريد الاستشارات الرسمية"
                value={form.emailConsultations}
                dir="ltr"
                onChange={(v) => setForm({ ...form, emailConsultations: v })}
              />
              <FieldInput
                label="البريد العام (قسم التواصل)"
                value={form.emailInfo}
                dir="ltr"
                onChange={(v) => setForm({ ...form, emailInfo: v })}
              />
              <FieldInput
                label="البريد المعروض في التذييل"
                value={form.footerEmail}
                dir="ltr"
                onChange={(v) => setForm({ ...form, footerEmail: v })}
              />
              <FieldInput
                label="أوقات العمل الرئيسية"
                value={form.workingHoursMainAr}
                onChange={(v) => setForm({ ...form, workingHoursMainAr: v })}
              />
              <FieldInput
                label="ملاحظة المواعيد الإضافية"
                value={form.workingHoursSubAr}
                onChange={(v) => setForm({ ...form, workingHoursSubAr: v })}
              />
              <FieldInput
                label="وسم قسم التواصل"
                value={form.contactHeadingBadgeAr}
                onChange={(v) => setForm({ ...form, contactHeadingBadgeAr: v })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <FieldInput
                label="عنوان قسم التواصل (السطر الأول)"
                value={form.contactTitleAr}
                onChange={(v) => setForm({ ...form, contactTitleAr: v })}
              />
              <FieldInput
                label="عنوان قسم التواصل (السطر الذهبي)"
                value={form.contactHighlightAr}
                onChange={(v) => setForm({ ...form, contactHighlightAr: v })}
              />
            </div>

            <FieldTextarea
              label="النص التعريفي في قسم التواصل"
              value={form.contactDescriptionAr}
              onChange={(v) => setForm({ ...form, contactDescriptionAr: v })}
            />
          </div>
        )}

        {sectionTab === "hero" && (
          <div className="space-y-5">
            <div className="border-b border-navy-100 pb-3">
              <h3 className="text-lg font-bold text-navy-950">نصوص الواجهة الترحيبية (الهيرو)</h3>
              <p className="text-xs text-navy-600 mt-0.5">
                العنوان الرئيسي والوصف وأزرار الدعوة للإجراء في أعلى الصفحة الرئيسية
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldInput
                label="اسم المكتب الرسمي (عربي)"
                value={form.firmNameAr}
                onChange={(v) => setForm({ ...form, firmNameAr: v })}
              />
              <FieldInput
                label="اسم المكتب (إنجليزي)"
                value={form.firmNameEn}
                dir="ltr"
                onChange={(v) => setForm({ ...form, firmNameEn: v })}
              />
            </div>

            <FieldInput
              label="الشريط العلوي فوق العنوان"
              value={form.heroEyebrowAr}
              onChange={(v) => setForm({ ...form, heroEyebrowAr: v })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldInput
                label="العنوان الرئيسي — السطر الأول"
                value={form.heroTitleLine1Ar}
                onChange={(v) => setForm({ ...form, heroTitleLine1Ar: v })}
              />
              <FieldInput
                label="العنوان الرئيسي — السطر الثاني (الذهبي)"
                value={form.heroTitleLine2Ar}
                onChange={(v) => setForm({ ...form, heroTitleLine2Ar: v })}
              />
            </div>

            <FieldTextarea
              label="النص التمهيدي أسفل العنوان"
              rows={3}
              value={form.heroSubtitleAr}
              onChange={(v) => setForm({ ...form, heroSubtitleAr: v })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldInput
                label="نص الزر الرئيسي"
                value={form.heroPrimaryCtaAr}
                onChange={(v) => setForm({ ...form, heroPrimaryCtaAr: v })}
              />
              <FieldInput
                label="نص الزر الثانوي"
                value={form.heroSecondaryCtaAr}
                onChange={(v) => setForm({ ...form, heroSecondaryCtaAr: v })}
              />
            </div>
          </div>
        )}

        {sectionTab === "about" && (
          <div className="space-y-5">
            <div className="border-b border-navy-100 pb-3">
              <h3 className="text-lg font-bold text-navy-950">محتوى قسم «عن المكتب»</h3>
              <p className="text-xs text-navy-600 mt-0.5">
                التعريف بالمكتب والرؤية المؤسسية والاقتباس الرئيسي
              </p>
            </div>

            <FieldInput
              label="الشارة العلوية للقسم"
              value={form.aboutEyebrowAr}
              onChange={(v) => setForm({ ...form, aboutEyebrowAr: v })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldInput
                label="عنوان القسم"
                value={form.aboutTitleAr}
                onChange={(v) => setForm({ ...form, aboutTitleAr: v })}
              />
              <FieldInput
                label="العبارة المميزة بالذهبي"
                value={form.aboutHighlightAr}
                onChange={(v) => setForm({ ...form, aboutHighlightAr: v })}
              />
            </div>

            <FieldTextarea
              label="الفقرة التمهيدية"
              rows={2}
              value={form.aboutLeadAr}
              onChange={(v) => setForm({ ...form, aboutLeadAr: v })}
            />

            <FieldTextarea
              label="الفقرة التفصيلية الأولى"
              rows={2}
              value={form.aboutParagraph1Ar}
              onChange={(v) => setForm({ ...form, aboutParagraph1Ar: v })}
            />

            <FieldTextarea
              label="الفقرة التفصيلية الثانية"
              rows={2}
              value={form.aboutParagraph2Ar}
              onChange={(v) => setForm({ ...form, aboutParagraph2Ar: v })}
            />

            <FieldTextarea
              label="الاقتباس المؤسسي داخل البطاقة الداكنة"
              rows={3}
              value={form.aboutQuoteAr}
              onChange={(v) => setForm({ ...form, aboutQuoteAr: v })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldInput
                label="توقيع الاقتباس"
                value={form.aboutQuoteAuthorAr}
                onChange={(v) => setForm({ ...form, aboutQuoteAuthorAr: v })}
              />
              <FieldInput
                label="وسم الموقع الجغرافي في البطاقة"
                value={form.aboutLocationTagAr}
                onChange={(v) => setForm({ ...form, aboutLocationTagAr: v })}
              />
            </div>
          </div>
        )}

        {sectionTab === "footer" && (
          <div className="space-y-5">
            <div className="border-b border-navy-100 pb-3">
              <h3 className="text-lg font-bold text-navy-950">محتوى التذييل (Footer)</h3>
              <p className="text-xs text-navy-600 mt-0.5">
                الوصف العام وعبارة الترخيص والتنويه أسفل الصفحة
              </p>
            </div>

            <FieldTextarea
              label="وصف المكتب في التذييل"
              rows={3}
              value={form.footerDescriptionAr}
              onChange={(v) => setForm({ ...form, footerDescriptionAr: v })}
            />

            <FieldInput
              label="عبارة الترخيص النظامي"
              value={form.footerLicenseNoteAr}
              onChange={(v) => setForm({ ...form, footerLicenseNoteAr: v })}
            />

            <FieldInput
              label="الملاحظة السفلية في التذييل"
              value={form.footerDisclaimerAr}
              onChange={(v) => setForm({ ...form, footerDisclaimerAr: v })}
            />
          </div>
        )}

        <div className="pt-4 border-t border-navy-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-navy-950 hover:bg-navy-800 text-gold-300 border border-gold-400/30 font-bold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "جاري حفظ التغييرات..." : "حفظ بيانات الموقع"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}

function FieldInput({
  label,
  value,
  onChange,
  dir = "rtl",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  dir?: "rtl" | "ltr";
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-navy-900">{label}</label>
      <input
        type="text"
        dir={dir}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3.5 py-2 rounded-lg bg-ivory-50 border border-navy-200 focus:border-gold-500 focus:bg-white focus:outline-none text-navy-900 ${
          dir === "ltr" ? "text-right font-mono" : ""
        }`}
      />
    </div>
  );
}

function FieldTextarea({
  label,
  value,
  onChange,
  rows = 2,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-navy-900">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2 rounded-lg bg-ivory-50 border border-navy-200 focus:border-gold-500 focus:bg-white focus:outline-none text-navy-900"
      />
    </div>
  );
}
