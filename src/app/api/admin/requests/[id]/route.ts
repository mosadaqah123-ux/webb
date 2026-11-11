import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { deleteRequest, updateRequest } from "@/lib/storage";
import { RequestStatus } from "@/types/site";

const VALID_STATUSES: ReadonlyArray<RequestStatus> = [
  "new",
  "in_review",
  "scheduled",
  "completed",
  "archived",
];

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح بالوصول." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      status?: unknown;
      adminNotes?: unknown;
    };

    const patch: { status?: RequestStatus; adminNotes?: string } = {};

    if (body.status !== undefined) {
      if (
        typeof body.status !== "string" ||
        !VALID_STATUSES.includes(body.status as RequestStatus)
      ) {
        return NextResponse.json({ error: "حالة الطلب غير صالحة." }, { status: 400 });
      }
      patch.status = body.status as RequestStatus;
    }

    if (body.adminNotes !== undefined) {
      if (typeof body.adminNotes !== "string") {
        return NextResponse.json({ error: "صيغة الملاحظات غير صالحة." }, { status: 400 });
      }
      patch.adminNotes = body.adminNotes.slice(0, 3000);
    }

    const updated = await updateRequest(params.id, patch);
    if (!updated) {
      return NextResponse.json({ error: "الطلب غير موجود." }, { status: 404 });
    }

    return NextResponse.json({ request: updated });
  } catch {
    return NextResponse.json({ error: "تعذر تحديث الطلب." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح بالوصول." }, { status: 401 });
  }

  const deleted = await deleteRequest(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "الطلب غير موجود." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
