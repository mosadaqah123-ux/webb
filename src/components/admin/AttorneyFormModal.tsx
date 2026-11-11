"use client";

import React, { useEffect, useState } from "react";
import { Attorney } from "@/data/attorneys";
import { X, Save } from "lucide-react";

interface AttorneyFormModalProps {
  isOpen: boolean;
  editingAttorney: Attorney | null;
  onClose: () => void;
  onSaved: (saved: Attorney, isNew: boolean) => void;
  onNotify: (type: "success" | "error", text: string) => void;
}

export default function AttorneyFormModal({
  isOpen,
  editingAttorney,
  onClose,
  onSaved,
  onNotify,
}: AttorneyFormModalProps) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    nameAr: "",
    roleBadgeAr: "محامٍ",
    titleAr: "",
    category: "lawyer" as Attorney["category"],
    gender: "male" as Attorney["gender"],
    experienceBadgeAr: "",
    educationSummaryAr: "",
    bioAr: "",
    fullBioText: "",
    qualificationsText: "",
    practiceAreasText: "",
    portraitUrl: "",
    isPublished: true,
  });

  useEffect(() => {
    if (!isOpen) return;
    if (editingAttorney) {
      setForm({
        nameAr: editingAttorney.nameAr,
        roleBadgeAr: editingAttorney.roleBadgeAr,
        titleAr: editingAttorney.titleAr,
        category: editingAttorney.category,
        gender: editingAttorney.gender,
        experienceBadgeAr: editingAttorney.experienceBadgeAr ?? "",
        educationSummaryAr: editingAttorney.educationSummaryAr ?? "",
        bioAr: editingAttorney.bioAr ?? "",
        fullBioText: (editingAttorney.fullBioAr ?? []).join("\n"),
        qualificationsText: (editingAttorney.qualificationsAr ?? []).join("\n"),
        practiceAreasText: (editingAttorney.practiceAreas ?? []).join("\n"),
        portraitUrl: editingAttorney.portraitUrl ?? "",
        isPublished: editingAttorney.isPublished,
      });
    } else {
      setForm({
        nameAr: "",
        roleBadgeAr: "محامٍ",
        titleAr: "",
        category: "lawyer",
        gender: "male",
        experienceBadgeAr: "",
        educationSummaryAr: "",
        bioAr: "",
        fullBioText: "",
        qualificationsText: "",
        practiceAreasText: "",
        portraitUrl: "",
        isPublished: true,
      });
    }
  }, [isOpen, editingAttorney]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      nameAr: form.nameAr,
      roleBadgeAr: form.roleBadgeAr,
      titleAr: form.titleAr,
      category: form.category,
      gender: form.gender,
      experienceBadgeAr: form.experienceBadgeAr,
      educationSummaryAr: form.educationSummaryAr,
      bioAr: form.bioAr,
      fullBioAr: form.fullBioText,
      qualificationsAr: form.qualificationsText,
      practiceAreas: form.practiceAreasText,
      portraitUrl: form.portraitUrl,
      isPublished: form.isPublished,
    };

    try {
      const isEdit = Boolean(editingAttorney);
      const url = isEdit
        ? `/api/admin/attorneys/${editingAttorney!.id}`
        : "/api/admin/attorneys";
      const method = isEdit ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        attorney?: Attorney;
        error?: string;
      };

      if (!response.ok || !data.attorney) {
        onNotify("error", data.error || "تعذر حفظ بيانات المحامي.");
        return;
      }

      onSaved(data.attorney, !isEdit);
      onClose();
    } catch {
      onNotify("error", "حدث خطأ أثناء الاتصال بالخادم.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl border border-navy-200 shadow-2xl overflow-hidden my-8 text-navy-900">
        <div className="h-1.5 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500" />

        <div className="flex items-center justify-between px-6 py-4 bg-navy-950 text-ivory-50">
          <div>
            <h3 className="text-lg font-bold">
              {editingAttorney ? `تعديل ملف: ${editingAttorney.nameAr}` : "إضافة محامٍ / مستشار جديد"}
            </h3>
            <p className="text-xs text-ivory-300/75">
              تظهر التعديلات فور الحفظ في قسم فريق المحامين بالموقع الرئيسي
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-navy-800 hover:bg-navy-700 text-ivory-200 transition-colors"
            aria-label="إغلاق النافذة"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-navy-900">
                الاسم الكامل <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="مثال: أحمد فهد حمدان البلوي"
                value={form.nameAr}
                onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-navy-200 focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-navy-900">
                الصفة المختصرة (الشارة) <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="مثال: محامٍ مرخص / مستشار قانوني / محامية"
                value={form.roleBadgeAr}
                onChange={(e) => setForm({ ...form, roleBadgeAr: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-navy-200 focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-navy-900">
              المسمى الوظيفي والتخصصي <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="مثال: محامٍ مرخص | قضايا القضاء العام والمنازعات التجارية"
              value={form.titleAr}
              onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg border border-navy-200 focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-navy-900">التصنيف</label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as Attorney["category"] })
                }
                className="w-full px-3 py-2 rounded-lg border border-navy-200 bg-white focus:border-gold-500 focus:outline-none"
              >
                <option value="leadership">القيادة العدلية والتوثيق</option>
                <option value="counsel">المستشارون القانونيون</option>
                <option value="lawyer">المحامون والمحاميات</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-navy-900">الجنس</label>
              <select
                value={form.gender}
                onChange={(e) =>
                  setForm({ ...form, gender: e.target.value as Attorney["gender"] })
                }
                className="w-full px-3 py-2 rounded-lg border border-navy-200 bg-white focus:border-gold-500 focus:outline-none"
              >
                <option value="male">ذكر (محامٍ / مستشار)</option>
                <option value="female">أنثى (محامية / مستشارة)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-navy-900">
                شارة الخبرة (اختياري)
              </label>
              <input
                type="text"
                placeholder="مثال: +15 عاماً خبرة"
                value={form.experienceBadgeAr}
                onChange={(e) => setForm({ ...form, experienceBadgeAr: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-navy-200 focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-navy-900">
              ملخص المؤهل العلمي للبطاقة
            </label>
            <input
              type="text"
              placeholder="مثال: بكالوريوس في الشريعة والقانون — جامعة حائل"
              value={form.educationSummaryAr}
              onChange={(e) => setForm({ ...form, educationSummaryAr: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg border border-navy-200 focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-navy-900">
              النبذة المختصرة على البطاقة
            </label>
            <textarea
              rows={2}
              placeholder="وصف موجز يظهر على البطاقة الخارجية..."
              value={form.bioAr}
              onChange={(e) => setForm({ ...form, bioAr: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg border border-navy-200 focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-navy-900">
              السيرة التفصيلية الكاملة (كل فقرة في سطر جديد)
            </label>
            <textarea
              rows={3}
              placeholder="الفقرة الأولى...&#10;الفقرة الثانية..."
              value={form.fullBioText}
              onChange={(e) => setForm({ ...form, fullBioText: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg border border-navy-200 focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-navy-900">
                المؤهلات والتراخيص (سطر لكل مؤهل)
              </label>
              <textarea
                rows={3}
                placeholder="بكالوريوس الشريعة والقانون&#10;محامٍ مرخص"
                value={form.qualificationsText}
                onChange={(e) => setForm({ ...form, qualificationsText: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-navy-200 focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-navy-900">
                مجالات التخصص (سطر لكل تخصص)
              </label>
              <textarea
                rows={3}
                placeholder="المنازعات التجارية&#10;القضايا العمالية"
                value={form.practiceAreasText}
                onChange={(e) => setForm({ ...form, practiceAreasText: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-navy-200 focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-1">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-navy-900">
                رابط الصورة الشخصية (اختياري)
              </label>
              <input
                type="text"
                dir="ltr"
                placeholder="/images/... أو https://..."
                value={form.portraitUrl}
                onChange={(e) => setForm({ ...form, portraitUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-navy-200 focus:border-gold-500 focus:outline-none text-right"
              />
            </div>

            <label className="flex items-center gap-2.5 pt-5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                className="w-4 h-4 accent-navy-900 rounded"
              />
              <span className="text-xs font-bold text-navy-900">
                منشور وظاهر للزوار في الموقع الرئيسي
              </span>
            </label>
          </div>

          <div className="pt-4 border-t border-navy-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-navy-700 hover:bg-navy-100 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-navy-950 bg-gold-400 hover:bg-gold-300 disabled:opacity-60 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "جاري الحفظ..." : editingAttorney ? "حفظ التعديلات" : "إضافة المحامي"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
