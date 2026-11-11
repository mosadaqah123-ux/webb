import React from "react";
import HomeClient from "@/components/home/HomeClient";
import { getPublishedAttorneys, getSiteSettings } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [attorneys, siteSettings] = await Promise.all([
    getPublishedAttorneys(),
    getSiteSettings(),
  ]);

  return <HomeClient attorneys={attorneys} siteSettings={siteSettings} />;
}
