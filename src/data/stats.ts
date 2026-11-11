export interface InstitutionalPillar {
  titleAr: string;
  titleEn: string;
  labelAr: string;
  labelEn: string;
  sublabelAr: string;
}

export const institutionalPillars: InstitutionalPillar[] = [
  {
    titleAr: "المرجعية النظامية",
    titleEn: "Regulatory Benchmark",
    labelAr: "امتثال شامل للتشريعات واللوائح العدلية",
    labelEn: "Full Compliance with Saudi Regulatory Frameworks",
    sublabelAr: "مواءمة دقيقة مع الأنظمة الصادرة وقرارات القضاء السعودي",
  },
  {
    titleAr: "الحوكمة والوقاية",
    titleEn: "Corporate Governance",
    labelAr: "حماية استباقية للكيانات والمصالح الاستثمارية",
    labelEn: "Proactive Protection for Corporate & Investment Entities",
    sublabelAr: "صياغة التحوطات التعاقدية وإدارة المخاطر النظامية بكفاءة",
  },
  {
    titleAr: "الرصانة القضائية",
    titleEn: "Judicial Stature",
    labelAr: "تمثيل نوعي في المنازعات والتحكيم",
    labelEn: "Elite Advocacy in Commercial Litigation & Arbitration",
    sublabelAr: "ترافع استراتيجي أمام المحاكم وهيئات التحكيم المعتمدة",
  },
  {
    titleAr: "السرية والأمانة",
    titleEn: "Fiduciary Trust",
    labelAr: "حصانة معلوماتية وميثاق مهني صارم",
    labelEn: "Strict Confidentiality & Fiduciary Responsibility",
    sublabelAr: "حماية مطلقة لأسرار الموكلين وخصوصية الصفقات الاستراتيجية",
  },
];

// Preserved alias for seamless import compatibility
export const firmStats = institutionalPillars;
