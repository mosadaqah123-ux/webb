import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { createAttorney, getAttorneys, reorderAttorneys } from "@/lib/storage";
import { sanitizeAttorneyPatch } from "@/lib/validators";
import { Attorney } from "@/data/attorneys";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح بالوصول." }, { status: 401 });
  }

  const attorneys = await getAttorneys();
  return NextResponse.json({ attorneys });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح بالوصول." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const { data, error } = sanitizeAttorneyPatch(body, true);
    if (error || !data) {
      return NextResponse.json({ error: error || "بيانات غير صالحة." }, { status: 400 });
    }

    const created = await createAttorney(data as Omit<Attorney, "id" | "slug">);
    revalidatePath("/");
    return NextResponse.json({ attorney: created }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ أثناء إضافة المحامي." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح بالوصول." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { orderedIds?: unknown };
    if (
      !Array.isArray(body.orderedIds) ||
      !body.orderedIds.every((id) => typeof id === "string")
    ) {
      return NextResponse.json(
        { error: "قائمة الترتيب غير صالحة." },
        { status: 400 }
      );
    }

    const attorneys = await reorderAttorneys(body.orderedIds);
    revalidatePath("/");
    return NextResponse.json({ attorneys });
  } catch {
    return NextResponse.json(
      { error: "تعذر إعادة ترتيب المحامين." },
      { status: 500 }
    );
  }
}
