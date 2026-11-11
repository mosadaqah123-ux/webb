import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getRequests } from "@/lib/storage";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح بالوصول." }, { status: 401 });
  }

  const requests = await getRequests();
  return NextResponse.json({ requests });
}
