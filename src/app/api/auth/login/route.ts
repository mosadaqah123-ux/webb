import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  createSessionToken,
  isAdminAuthConfigured,
  verifyAdminCredentials,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    if (!isAdminAuthConfigured()) {
      return NextResponse.json(
        {
          error:
            "لم يتم إعداد متغيرات دخول المسؤول (ADMIN_USERNAME و ADMIN_PASSWORD و ADMIN_SESSION_SECRET) على الخادم.",
        },
        { status: 503 }
      );
    }

    const body = (await request.json()) as {
      username?: unknown;
      password?: unknown;
    };

    const username = typeof body.username === "string" ? body.username.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!username || !password) {
      return NextResponse.json(
        { error: "يرجى إدخال اسم المستخدم وكلمة المرور." },
        { status: 400 }
      );
    }

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json(
        { error: "بيانات الدخول غير صحيحة." },
        { status: 401 }
      );
    }

    const token = createSessionToken(username);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE_NAME, token, adminCookieOptions);
    return response;
  } catch {
    return NextResponse.json(
      { error: "تعذر إتمام عملية تسجيل الدخول. تأكد من إعدادات الخادم." },
      { status: 500 }
    );
  }
}
