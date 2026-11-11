import { NextResponse } from "next/server";
import { createRequest } from "@/lib/storage";
import { RequestSource } from "@/types/site";

function cleanString(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const fullName = cleanString(body.fullName, 160);
    const phone = cleanString(body.phone, 40);
    const email = cleanString(body.email, 160);
    const organization = cleanString(body.organization, 160);
    const practiceArea = cleanString(body.practiceArea, 200);
    const preferredAttorney = cleanString(body.preferredAttorney, 160);
    const message = cleanString(body.message, 3000);
    const rawSource = body.source;
    const source: RequestSource =
      rawSource === "consultation_modal" ? "consultation_modal" : "contact_section";

    if (fullName.length < 2) {
      return NextResponse.json(
        { error: "يرجى إدخال الاسم الكامل بشكل صحيح." },
        { status: 400 }
      );
    }

    if (phone.length < 6) {
      return NextResponse.json(
        { error: "يرجى إدخال رقم هاتف صحيح." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "يرجى إدخال بريد إلكتروني صحيح." },
        { status: 400 }
      );
    }

    const created = await createRequest({
      source,
      fullName,
      organization,
      phone,
      email,
      practiceArea,
      preferredAttorney,
      message,
    });

    return NextResponse.json({ ok: true, id: created.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ أثناء تسجيل الطلب. يرجى المحاولة لاحقاً." },
      { status: 500 }
    );
  }
}
