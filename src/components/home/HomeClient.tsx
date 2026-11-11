"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import PracticeAreasSection from "@/components/home/PracticeAreasSection";
import AttorneysSection from "@/components/home/AttorneysSection";
import ValuesSection from "@/components/home/ValuesSection";
import InsightsSection from "@/components/home/InsightsSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/layout/Footer";

import AttorneyModal from "@/components/modals/AttorneyModal";
import PracticeModal from "@/components/modals/PracticeModal";
import ConsultationModal from "@/components/modals/ConsultationModal";

import { Attorney } from "@/data/attorneys";
import { PracticeArea } from "@/data/practiceAreas";
import { SiteSettings } from "@/types/site";

interface HomeClientProps {
  attorneys: Attorney[];
  siteSettings: SiteSettings;
}

export default function HomeClient({ attorneys, siteSettings }: HomeClientProps) {
  const [selectedAttorney, setSelectedAttorney] = useState<Attorney | null>(null);
  const [selectedPractice, setSelectedPractice] = useState<PracticeArea | null>(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [consultationTopic, setConsultationTopic] = useState("");

  const handleOpenConsultation = (topic: string = "") => {
    setConsultationTopic(topic);
    setConsultationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory-50 text-navy-900 selection:bg-gold-400/30 selection:text-navy-950 font-arabic overflow-x-hidden w-full max-w-full">
      {/* Navigation */}
      <Navbar onOpenConsultation={() => handleOpenConsultation("استشارة عامة")} />

      {/* Main Page Flow */}
      <main className="overflow-x-hidden w-full max-w-full">
        {/* Architectural Editorial Hero with Saudi Heritage Backdrop */}
        <HeroSection
          siteSettings={siteSettings}
          onOpenConsultation={() => handleOpenConsultation("استشارة استراتيجية")}
        />

        {/* About the Firm & Institutional Pillars */}
        <AboutSection siteSettings={siteSettings} />

        {/* Practice Areas Grid & Filter */}
        <PracticeAreasSection
          onSelectPractice={(practice) => setSelectedPractice(practice)}
          onOpenConsultation={() => handleOpenConsultation("استشارة في مجالات الممارسة")}
        />

        {/* Attorneys Directory Cards */}
        <AttorneysSection
          attorneys={attorneys}
          onSelectAttorney={(attorney) => setSelectedAttorney(attorney)}
          onOpenConsultation={(attorneyName) =>
            handleOpenConsultation(
              attorneyName ? `حجز استشارة مع: ${attorneyName}` : "استشارة مع المحامين"
            )
          }
        />

        {/* Firm Values, Saudi Heritage Identity & Differentiators */}
        <ValuesSection />

        {/* Legal Insights & Publications */}
        <InsightsSection />

        {/* Contact Form & Headquarters */}
        <ContactSection siteSettings={siteSettings} />
      </main>

      {/* Premium Footer */}
      <Footer siteSettings={siteSettings} />

      {/* Interactive Modals */}
      <AttorneyModal
        attorney={selectedAttorney}
        onClose={() => setSelectedAttorney(null)}
        onBookConsultation={(name) => handleOpenConsultation(`حجز استشارة مع: ${name}`)}
      />

      <PracticeModal
        practice={selectedPractice}
        onClose={() => setSelectedPractice(null)}
        onBookConsultation={(title) => handleOpenConsultation(`استشارة في قطاع: ${title}`)}
      />

      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        defaultTopic={consultationTopic}
      />
    </div>
  );
}
