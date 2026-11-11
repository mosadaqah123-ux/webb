"use client";

import React, { useState } from "react";
import { Attorney } from "@/data/attorneys";
import AttorneyFormModal from "@/components/admin/AttorneyFormModal";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  GraduationCap,
} from "lucide-react";

interface AttorneysManagerProps {
  attorneys: Attorney[];
  onAttorneysChange: (next: Attorney[]) => void;
  onNotify: (type: "success" | "error", text: string) => void;
}

const CATEGORY_LABELS: Record<Attorney["category"], string> = {
  leadership: "القيادة العدلية والتوثيق",
  counsel: "المستشارون القانونيون",
  lawyer: "المحامون والمحاميات",
};

export default function AttorneysManager({
  attorneys,
  onAttorneysChange,
  onNotify,
}: AttorneysManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | Attorney["category"]>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAttorney, setEditingAttorney] = useState<Attorney | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = attorneys.filter((a) => {
    const matchesCat = categoryFilter === "all" || a.category === categoryFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      a.nameAr.toLowerCase().includes(q) ||
      a.titleAr.toLowerCase().includes(q) ||
      a.roleBadgeAr.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const isFiltered = searchQuery.trim().length > 0 || categoryFilter !== "all";

  const handleTogglePublish = async (attorney: Attorney) => {
    setBusyId(attorney.id);
    try {
      const response = await fetch(`/api/admin/attorneys/${attorney.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !attorney.isPublished }),
      });
      const data = (await response.json()) as {
        attorney?: Attorney;
        error?: string;
      };
      if (!response.ok || !data.attorney) {
        onNotify("error", data.error || "تعذر تحديث حالة النشر.");
        return;
      }

      onAttorneysChange(
        attorneys.map((a) => (a.id === attorney.id ? data.attorney! : a))
      );
      onNotify(
        "success",
        data.attorney.isPublished
          ? `تم نشر ملف «${attorney.nameAr}» في الموقع.`
          : `تم إخفاء ملف «${attorney.nameAr}» من الموقع مؤقتاً.`
      );
    } catch {
      onNotify("error", "حدث خطأ أثناء تغيير حالة الظهور.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (attorney: Attorney) => {
    if (!window.confirm(`هل أنت متأكد من حذف ملف «${attorney.nameAr}» نهائياً؟`)) {
      return;
    }
    setBusyId(attorney.id);
    try {
      const response = await fetch(`/api/admin/attorneys/${attorney.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        onNotify("error", "تعذر حذف المحامي.");
        return;
      }
      onAttorneysChange(attorneys.filter((a) => a.id !== attorney.id));
      onNotify("success", `تم حذف ملف «${attorney.nameAr}».`);
    } catch {
      onNotify("error", "تعذر الاتصال بالخادم أثناء الحذف.");
    } finally {
      setBusyId(null);
    }
  };

  const handleMove = async (indexInFullList: number, direction: -1 | 1) => {
    const targetIndex = indexInFullList + direction;
    if (targetIndex < 0 || targetIndex >= attorneys.length) return;

    const copy = [...attorneys];
    const [moved] = copy.splice(indexInFullList, 1);
    copy.splice(targetIndex, 0, moved);

    const prev = attorneys;
    onAttorneysChange(copy);

    try {
      const response = await fetch("/api/admin/attorneys", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: copy.map((a) => a.id) }),
      });
      if (!response.ok) {
        onAttorneysChange(prev);
        onNotify("error", "تعذر حفظ الترتيب الجديد.");
        return;
      }
      onNotify("success", "تم تحديث ترتيب الظهور في الموقع.");
    } catch {
      onAttorneysChange(prev);
      onNotify("error", "تعذر الاتصال بالخادم لحفظ الترتيب.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-navy-200/80 p-4 sm:p-5 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-navy-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث باسم المحامي أو الصفة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 rounded-xl bg-ivory-50 border border-navy-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:border-gold-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value as "all" | Attorney["category"])
            }
            className="px-3.5 py-2 rounded-xl bg-ivory-50 border border-navy-200 text-xs sm:text-sm font-medium text-navy-900 focus:outline-none focus:border-gold-500"
          >
            <option value="all">جميع التصنيفات ({attorneys.length})</option>
            <option value="leadership">القيادة العدلية والتوثيق</option>
            <option value="counsel">المستشارون القانونيون</option>
            <option value="lawyer">المحامون والمحاميات</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingAttorney(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-800 text-gold-300 border border-gold-400/30 text-xs sm:text-sm font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة محامٍ / مستشار جديد</span>
        </button>
      </div>

      {/* Attorneys List */}
      <div className="space-y-3">
        {filtered.map((attorney) => {
          const fullIndex = attorneys.findIndex((a) => a.id === attorney.id);
          const isBusy = busyId === attorney.id;

          return (
            <div
              key={attorney.id}
              className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                attorney.isPublished
                  ? "border-navy-200/80 hover:border-gold-400/70"
                  : "border-dashed border-navy-300 bg-ivory-100/60 opacity-85"
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                {/* Order Number */}
                <div className="w-8 h-8 rounded-lg bg-navy-950 text-gold-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {fullIndex + 1}
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-navy-950">
                      {attorney.nameAr}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-gold-50 border border-gold-300/70 text-gold-800 text-[11px] font-bold">
                      {attorney.roleBadgeAr}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-navy-900/5 text-navy-700 text-[11px]">
                      {CATEGORY_LABELS[attorney.category]}
                    </span>
                    {!attorney.isPublished && (
                      <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-700 text-[11px] font-semibold">
                        مخفي من الموقع
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-gold-700 font-medium">
                    {attorney.titleAr}
                  </p>

                  {attorney.educationSummaryAr && (
                    <div className="flex items-center gap-1.5 text-xs text-navy-600">
                      <GraduationCap className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span className="truncate">{attorney.educationSummaryAr}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {!isFiltered && (
                  <div className="flex items-center border border-navy-200 rounded-lg overflow-hidden bg-ivory-50">
                    <button
                      type="button"
                      disabled={fullIndex === 0}
                      onClick={() => handleMove(fullIndex, -1)}
                      className="p-2 text-navy-700 hover:bg-navy-100 disabled:opacity-30 transition-colors"
                      title="نقل للأعلى"
                      aria-label="نقل للأعلى"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={fullIndex === attorneys.length - 1}
                      onClick={() => handleMove(fullIndex, 1)}
                      className="p-2 text-navy-700 hover:bg-navy-100 disabled:opacity-30 border-r border-navy-200 transition-colors"
                      title="نقل للأسفل"
                      aria-label="نقل للأسفل"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => handleTogglePublish(attorney)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    attorney.isPublished
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100"
                      : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {attorney.isPublished ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>ظاهر</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>مخفي</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingAttorney(attorney);
                    setModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-ivory-50 text-xs font-semibold transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5 text-gold-400" />
                  <span>تعديل</span>
                </button>

                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => handleDelete(attorney)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                  title="حذف المحامي"
                  aria-label="حذف المحامي"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <AttorneyFormModal
        isOpen={modalOpen}
        editingAttorney={editingAttorney}
        onClose={() => setModalOpen(false)}
        onNotify={onNotify}
        onSaved={(saved, isNew) => {
          if (isNew) {
            onAttorneysChange([...attorneys, saved]);
            onNotify("success", `تمت إضافة «${saved.nameAr}» بنجاح.`);
          } else {
            onAttorneysChange(
              attorneys.map((a) => (a.id === saved.id ? saved : a))
            );
            onNotify("success", `تم تحديث بيانات «${saved.nameAr}» بنجاح.`);
          }
        }}
      />
    </div>
  );
}
