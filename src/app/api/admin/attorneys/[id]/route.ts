import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { deleteAttorney, updateAttorney } from "@/lib/storage";
import { sanitizeAttorneyPatch } from "@/lib/validators";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح بالوصول." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const { data, error } = sanitizeAttorneyPatch(body, false);
    if (error || !data) {
      return NextResponse.json({ error: error || "بيانات غير صالحة." }, { status: 400 });
    }

    const updated = await updateAttorney(params.id, data);
    if (!updated) {
      return NextResponse.json({ error: "المحامي غير موجود." }, { status: 404 });
    }

    revalidatePath("/");
    return NextResponse.json({ attorney: updated });
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ أثناء تحديث بيانات المحامي." },
      { status: 500 }
    );
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

  const deleted = await deleteAttorney(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "المحامي غير موجود." }, { status: 404 });
  }

  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
