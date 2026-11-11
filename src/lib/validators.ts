import { Attorney } from "@/data/attorneys";
import { SiteSettings } from "@/types/site";

const VALID_CATEGORIES: ReadonlyArray<Attorney["category"]> = [
  "leadership",
  "counsel",
  "lawyer",
];
const VALID_GENDERS: ReadonlyArray<Attorney["gender"]> = ["male", "female"];

function toTrimmedString(val: unknown, maxLen: number): string | undefined {
  if (typeof val !== "string") return undefined;
  const trimmed = val.trim().slice(0, maxLen);
  return trimmed.length > 0 ? trimmed : undefined;
}

function toStringList(val: unknown, maxItems = 20, maxItemLen = 400): string[] | undefined {
  if (Array.isArray(val)) {
    return val
      .filter((item): item is string => typeof item === "string")
      .map((s) => s.trim().slice(0, maxItemLen))
      .filter(Boolean)
      .slice(0, maxItems);
  }
  if (typeof val === "string") {
    return val
      .split(/\r?\n/)
      .map((s) => s.trim().slice(0, maxItemLen))
      .filter(Boolean)
      .slice(0, maxItems);
  }
  return undefined;
}

export function sanitizeAttorneyPatch(
  raw: Record<string, unknown>,
  requireCoreFields: boolean
): { data?: Partial<Attorney>; error?: string } {
  const nameAr = toTrimmedString(raw.nameAr, 160);
  const roleBadgeAr = toTrimmedString(raw.roleBadgeAr, 80);
  const titleAr = toTrimmedString(raw.titleAr, 220);

  if (requireCoreFields && (!nameAr || !roleBadgeAr || !titleAr)) {
    return {
      error: "يرجى إدخال الاسم الكامل والصفة المختصرة والمسمى المهني.",
    };
  }

  let category: Attorney["category"] | undefined;
  if (raw.category !== undefined) {
    if (
      typeof raw.category !== "string" ||
      !VALID_CATEGORIES.includes(raw.category as Attorney["category"])
    ) {
      return { error: "التصنيف غير صالح." };
    }
    category = raw.category as Attorney["category"];
  } else if (requireCoreFields) {
    category = "lawyer";
  }

  let gender: Attorney["gender"] | undefined;
  if (raw.gender !== undefined) {
    if (
      typeof raw.gender !== "string" ||
      !VALID_GENDERS.includes(raw.gender as Attorney["gender"])
    ) {
      return { error: "تحديد الجنس غير صالح." };
    }
    gender = raw.gender as Attorney["gender"];
  } else if (requireCoreFields) {
    gender = "male";
  }

  const data: Partial<Attorney> = {};
  if (nameAr !== undefined) data.nameAr = nameAr;
  if (roleBadgeAr !== undefined) data.roleBadgeAr = roleBadgeAr;
  if (titleAr !== undefined) data.titleAr = titleAr;
  if (category !== undefined) data.category = category;
  if (gender !== undefined) data.gender = gender;

  if ("experienceBadgeAr" in raw) {
    data.experienceBadgeAr = toTrimmedString(raw.experienceBadgeAr, 100);
  }
  if ("educationSummaryAr" in raw) {
    data.educationSummaryAr = toTrimmedString(raw.educationSummaryAr, 240);
  }
  if ("bioAr" in raw) {
    data.bioAr = toTrimmedString(raw.bioAr, 800);
  }
  if ("portraitUrl" in raw) {
    const url = toTrimmedString(raw.portraitUrl, 500);
    // Allow relative paths or http/https URLs only
    if (url && !url.startsWith("/") && !/^https?:\/\//i.test(url)) {
      return { error: "رابط الصورة يجب أن يبدأ بـ / أو https://" };
    }
    data.portraitUrl = url;
  }
  if ("fullBioAr" in raw) {
    data.fullBioAr = toStringList(raw.fullBioAr, 15, 1200) ?? [];
  }
  if ("qualificationsAr" in raw) {
    data.qualificationsAr = toStringList(raw.qualificationsAr, 20, 300) ?? [];
  }
  if ("practiceAreas" in raw) {
    data.practiceAreas = toStringList(raw.practiceAreas, 15, 150) ?? [];
  }
  if ("approvedAchievementsAr" in raw) {
    data.approvedAchievementsAr =
      toStringList(raw.approvedAchievementsAr, 15, 300) ?? [];
  }
  if (typeof raw.isPublished === "boolean") {
    data.isPublished = raw.isPublished;
  } else if (requireCoreFields) {
    data.isPublished = true;
  }
  if (typeof raw.isFeatured === "boolean") {
    data.isFeatured = raw.isFeatured;
  } else if (requireCoreFields) {
    data.isFeatured = true;
  }

  return { data };
}

const SITE_SETTING_KEYS: ReadonlyArray<keyof Omit<SiteSettings, "updatedAt">> = [
  "firmNameAr",
  "firmNameEn",
  "heroEyebrowAr",
  "heroTitleLine1Ar",
  "heroTitleLine2Ar",
  "heroSubtitleAr",
  "heroPrimaryCtaAr",
  "heroSecondaryCtaAr",
  "aboutEyebrowAr",
  "aboutTitleAr",
  "aboutHighlightAr",
  "aboutLeadAr",
  "aboutParagraph1Ar",
  "aboutParagraph2Ar",
  "aboutQuoteAr",
  "aboutQuoteAuthorAr",
  "aboutLocationTagAr",
  "contactHeadingBadgeAr",
  "contactTitleAr",
  "contactHighlightAr",
  "contactDescriptionAr",
  "headquartersTitleAr",
  "contactAddressAr",
  "contactCountryAr",
  "footerAddressAr",
  "phonePrimary",
  "phoneWhatsapp",
  "emailConsultations",
  "emailInfo",
  "footerEmail",
  "workingHoursMainAr",
  "workingHoursSubAr",
  "footerDescriptionAr",
  "footerLicenseNoteAr",
  "footerDisclaimerAr",
];

export function sanitizeSiteSettingsPatch(
  raw: Record<string, unknown>
): Partial<SiteSettings> {
  const patch: Partial<SiteSettings> = {};
  for (const key of SITE_SETTING_KEYS) {
    if (typeof raw[key] === "string") {
      patch[key] = raw[key].trim().slice(0, 1500);
    }
  }
  return patch;
}
