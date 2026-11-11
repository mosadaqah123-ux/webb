import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getAttorneys, getRequests, getSiteSettings } from "@/lib/storage";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [requests, attorneys, siteSettings] = await Promise.all([
    getRequests(),
    getAttorneys(),
    getSiteSettings(),
  ]);

  return (
    <AdminDashboardClient
      username={session.username}
      initialRequests={requests}
      initialAttorneys={attorneys}
      initialSettings={siteSettings}
    />
  );
}
