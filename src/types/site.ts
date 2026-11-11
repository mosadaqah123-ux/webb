export type RequestStatus =
  | "new"
  | "in_review"
  | "scheduled"
  | "completed"
  | "archived";

export type RequestSource = "contact_section" | "consultation_modal";

export interface ConsultationRequest {
  id: string;
  source: RequestSource;
  fullName: string;
  organization: string;
  phone: string;
  email: string;
  practiceArea: string;
  preferredAttorney?: string;
  message: string;
  status: RequestStatus;
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  firmNameAr: string;
  firmNameEn: string;
  heroEyebrowAr: string;
  heroTitleLine1Ar: string;
  heroTitleLine2Ar: string;
  heroSubtitleAr: string;
  heroPrimaryCtaAr: string;
  heroSecondaryCtaAr: string;
  aboutEyebrowAr: string;
  aboutTitleAr: string;
  aboutHighlightAr: string;
  aboutLeadAr: string;
  aboutParagraph1Ar: string;
  aboutParagraph2Ar: string;
  aboutQuoteAr: string;
  aboutQuoteAuthorAr: string;
  aboutLocationTagAr: string;
  contactHeadingBadgeAr: string;
  contactTitleAr: string;
  contactHighlightAr: string;
  contactDescriptionAr: string;
  headquartersTitleAr: string;
  contactAddressAr: string;
  contactCountryAr: string;
  footerAddressAr: string;
  phonePrimary: string;
  phoneWhatsapp: string;
  emailConsultations: string;
  emailInfo: string;
  footerEmail: string;
  workingHoursMainAr: string;
  workingHoursSubAr: string;
  footerDescriptionAr: string;
  footerLicenseNoteAr: string;
  footerDisclaimerAr: string;
  updatedAt?: string;
}
