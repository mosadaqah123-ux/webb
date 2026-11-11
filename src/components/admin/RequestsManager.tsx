"use client";

import React, { useState } from "react";
import { ConsultationRequest, RequestStatus } from "@/types/site";
import {
  Search,
  Phone,
  Mail,
  Building2,
  Calendar,
  Trash2,
  Save,
  UserCheck,
  Inbox,
  MessageSquare,
} from "lucide-react";

interface RequestsManagerProps {
  requests: ConsultationRequest[];
  onRequestsChange: (next: ConsultationRequest[]) => void;
  onNotify: (type: "success" | "error", text: string) => void;
}

const STATUS_META: Record<
  RequestStatus,
  { label: string; badgeClass: string }
> = {
  new: {
    label: "جديد",
    badgeClass: "bg-amber-100 text-amber-900 border-amber-300",
  },
  in_review: {
    label: "قيد المراجعة",
    badgeClass: "bg-sky-100 text-sky-900 border-sky-300",
  },
  scheduled: {
    label: "تم الجدولة",
    badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
  completed: {
    label: "مكتمل",
    badgeClass: "bg-navy-100 text-navy-900 border-navy-200",
  },
  archived: {
    label: "مؤرشف",
    badgeClass: "bg-gray-100 text-gray-700 border-gray-300",
  },
};

export default function RequestsManager({
  requests,
  onRequestsChange,
  onNotify,
}: RequestsManagerProps) {
  const [statusFilter, setStatusFilter] = useState<"all" | RequestStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState<string | null>(null);

  const filteredRequests = requests.filter((req) => {
    const matchesStatus =
      statusFilter === "all" ? true : req.status === statusFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      req.fullName.toLowerCase().includes(q) ||
      req.phone.toLowerCase().includes(q) ||
      req.email.toLowerCase().includes(q) ||
      req.organization.toLowerCase().includes(q) ||
      req.practiceArea.toLowerCase().includes(q) ||
      (req.preferredAttorney ?? "").toLowerCase().includes(q) ||
      req.id.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const handleStatusChange = async (id: string, nextStatus: RequestStatus) => {
    setBusyId(id);
    try {
      const response = await fetch(`/api/admin/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = (await response.json()) as {
        request?: ConsultationRequest;
        error?: string;
      };
      if (!response.ok || !data.request) {
        onNotify("error", data.error || "تعذر تحديث حالة الطلب.");
        return;
      }

      onRequestsChange(
        requests.map((item) => (item.id === id ? data.request! : item))
      );
      onNotify("success", `تم تحديث حالة الطلب إلى «${STATUS_META[nextStatus].label}».`);
    } catch {
      onNotify("error", "حدث خطأ أثناء تحديث حالة الطلب.");
    } finally {
      setBusyId(null);
    }
  };

  const handleSaveNotes = async (req: ConsultationRequest) => {
    const notesValue =
      editingNotes[req.id] !== undefined ? editingNotes[req.id] : req.adminNotes;
    setBusyId(req.id);
    try {
      const response = await fetch(`/api/admin/requests/${req.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: notesValue }),
      });
      const data = (await response.json()) as {
        request?: ConsultationRequest;
        error?: string;
      };
      if (!response.ok || !data.request) {
        onNotify("error", data.error || "تعذر حفظ الملاحظات.");
        return;
      }

      onRequestsChange(
        requests.map((item) => (item.id === req.id ? data.request! : item))
      );
      onNotify("success", "تم حفظ الملاحظات الإدارية بنجاح.");
    } catch {
      onNotify("error", "تعذر الاتصال بالخادم لحفظ الملاحظات.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الطلب نهائياً؟")) return;
    setBusyId(id);
    try {
      const response = await fetch(`/api/admin/requests/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        onNotify("error", "تعذر حذف الطلب.");
        return;
      }
      onRequestsChange(requests.filter((r) => r.id !== id));
      onNotify("success", "تم حذف الطلب بنجاح.");
    } catch {
      onNotify("error", "تعذر الاتصال بالخادم أثناء الحذف.");
    } finally {
      setBusyId(null);
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat("ar-SA", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar: Search & Status Filter */}
      <div className="bg-white rounded-2xl border border-navy-200/80 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-navy-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث بالاسم، الجوال، البريد، المحامي، أو رقم المرجع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-ivory-50 border border-navy-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === "all"
                  ? "bg-navy-900 text-gold-300 font-bold"
                  : "bg-ivory-100 text-navy-700 hover:bg-ivory-200"
              }`}
            >
              الكل ({requests.length})
            </button>
            {(Object.keys(STATUS_META) as RequestStatus[]).map((statusKey) => {
              const count = requests.filter((r) => r.status === statusKey).length;
              return (
                <button
                  key={statusKey}
                  type="button"
                  onClick={() => setStatusFilter(statusKey)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    statusFilter === statusKey
                      ? "bg-navy-900 text-gold-300 font-bold"
                      : "bg-ivory-100 text-navy-700 hover:bg-ivory-200"
                  }`}
                >
                  {STATUS_META[statusKey].label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-navy-200/80 p-12 text-center space-y-3 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-ivory-100 border border-navy-200 text-navy-500 flex items-center justify-center mx-auto">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-navy-950">
            لا توجد طلبات مطابقة حالياً
          </h3>
          <p className="text-xs sm:text-sm text-navy-600 max-w-md mx-auto">
            تصل جميع طلبات حجز الاستشارات ونماذج التواصل المرسلة من الموقع مباشرة إلى هذه القائمة لمتابعتها وإدارتها.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((req) => {
            const notesDraft =
              editingNotes[req.id] !== undefined
                ? editingNotes[req.id]
                : req.adminNotes;
            const statusInfo = STATUS_META[req.status];
            const isBusy = busyId === req.id;

            return (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-navy-200/80 hover:border-gold-400/70 p-5 sm:p-6 shadow-sm transition-all space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-navy-100">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-md border text-[11px] font-bold ${statusInfo.badgeClass}`}
                      >
                        {statusInfo.label}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-navy-900/5 text-navy-700 text-[11px] font-mono">
                        {req.id}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-gold-50 border border-gold-200 text-gold-800 text-[11px] font-medium">
                        {req.source === "consultation_modal"
                          ? "نافذة حجز الاستشارة"
                          : "نموذج التواصل"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-navy-950 pt-1">
                      {req.fullName}
                    </h3>
                  </div>

                  {/* Status Selector & Delete */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-navy-500 ml-2">
                      <Calendar className="w-3.5 h-3.5 text-gold-600" />
                      <span>{formatDate(req.createdAt)}</span>
                    </div>

                    <select
                      value={req.status}
                      disabled={isBusy}
                      onChange={(e) =>
                        handleStatusChange(req.id, e.target.value as RequestStatus)
                      }
                      aria-label="تحديث حالة الطلب"
                      className="px-3 py-1.5 rounded-lg bg-ivory-50 border border-navy-200 text-xs font-semibold text-navy-900 focus:outline-none focus:border-gold-500"
                    >
                      {(Object.keys(STATUS_META) as RequestStatus[]).map((key) => (
                        <option key={key} value={key}>
                          {STATUS_META[key].label}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleDelete(req.id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                      title="حذف الطلب"
                      aria-label="حذف الطلب"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Client Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <a
                    href={`tel:${req.phone}`}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-ivory-50 border border-navy-100 hover:border-gold-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span dir="ltr" className="font-mono text-navy-900 font-semibold">
                      {req.phone}
                    </span>
                  </a>

                  <a
                    href={`mailto:${req.email}`}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-ivory-50 border border-navy-100 hover:border-gold-400 transition-colors truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span dir="ltr" className="font-mono text-navy-900 truncate">
                      {req.email}
                    </span>
                  </a>

                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-ivory-50 border border-navy-100">
                    <Building2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span className="text-navy-800 truncate">
                      {req.organization || "فرد / بدون جهة"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-ivory-50 border border-navy-100">
                    <UserCheck className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span className="text-navy-800 truncate">
                      {req.preferredAttorney
                        ? `المطلوب: ${req.preferredAttorney}`
                        : req.practiceArea}
                    </span>
                  </div>
                </div>

                {/* Practice Area & Client Message */}
                <div className="space-y-2 bg-ivory-50/70 rounded-xl p-4 border border-navy-100 text-xs sm:text-sm">
                  <div className="font-semibold text-navy-900 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-gold-600" />
                    <span>القطاع / التخصص: {req.practiceArea}</span>
                  </div>
                  <p className="text-navy-700 leading-relaxed whitespace-pre-line">
                    {req.message || "لم يضف العميل تفاصيل إضافية."}
                  </p>
                </div>

                {/* Internal Admin Notes */}
                <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-end pt-1">
                  <div className="flex-1 space-y-1">
                    <label className="block text-[11px] font-semibold text-navy-700">
                      ملاحظات المتابعة الإدارية (داخلية)
                    </label>
                    <input
                      type="text"
                      placeholder="أضف ملاحظة حول التواصل، موعد الجلسة، أو إحالة الطلب لمحامٍ محدد..."
                      value={notesDraft}
                      onChange={(e) =>
                        setEditingNotes((prev) => ({
                          ...prev,
                          [req.id]: e.target.value,
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-lg bg-white border border-navy-200 text-xs text-navy-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => handleSaveNotes(req)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-ivory-50 text-xs font-semibold transition-colors disabled:opacity-60 shrink-0"
                  >
                    <Save className="w-3.5 h-3.5 text-gold-400" />
                    <span>حفظ الملاحظة</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
