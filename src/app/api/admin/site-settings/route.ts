import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { getSiteSettings, saveSiteSettings } from "@/lib/storage";
import { sanitizeSiteSettingsPatch } from "@/lib/validators";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح بالوصول." }, { status: 401 });
  }

  const settings = await getSiteSettings();
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح بالوصول." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const patch = sanitizeSiteSettingsPatch(body);
    const settings = await saveSiteSettings(patch);
    revalidatePath("/");
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json(
      { error: "تعذر حفظ إعدادات الموقع." },
      { status: 500 }
    );
  }
}
