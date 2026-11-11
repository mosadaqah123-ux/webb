export interface LegalInsight {
  id: string;
  slug: string;
  titleAr: string;
  categoryAr: string;
  publishedDate: string;
  readTime: string;
  summaryAr: string;
  authorAr: string;
  authorRoleAr: string;
}

export const legalInsights: LegalInsight[] = [
  {
    id: "insight-1",
    slug: "saudi-investment-law-update",
    titleAr: "قراءة تحليلية في الملامح الجوهرية لنظام الاستثمار السعودي المحدث وحوافز المستثمر الدولي",
    categoryAr: "أنظمة الاستثمار",
    publishedDate: "15 محرم 1448 هـ / 2026 م (نموذج افتراضي)",
    readTime: "6 دقائق قراءة",
    summaryAr:
      "تفكيك للضمانات القانونية الحديثة لحرية تحويل الأموال وتكافؤ الفرص بين المستثمر الوطني والأجنبي، وآليات تسوية منازعات الاستثمار بموجب التحديثات التنظيمية الأخيرة.",
    authorAr: "فريق أبحاث مصادقة للمحاماة",
    authorRoleAr: "قسم الاستثمار الدولي والتشريعات",
  },
  {
    id: "insight-2",
    slug: "corporate-governance-family-business",
    titleAr: "حوكمة الشركات العائلية في ظل نظام الشركات الجديد: تحصين الانتقال السلس للجيل الثاني والثالث",
    categoryAr: "حوكمة الشركات",
    publishedDate: "28 ذو القعدة 1447 هـ / 2026 م (نموذج افتراضي)",
    readTime: "8 دقائق قراءة",
    summaryAr:
      "كيف يساهم ميثاق العائلة واتفاقيات المساهمين المقيدة في تجنب التنازع الداخلي، وأهم الشروط الواجب تضمينها في عقود تأسيس الكيانات العائلية الكبرى.",
    authorAr: "فريق أبحاث مصادقة للمحاماة",
    authorRoleAr: "قسم حوكمة الشركات والأنظمة التجارية",
  },
  {
    id: "insight-3",
    slug: "scca-arbitration-precedents",
    titleAr: "تنفيذ أحكام التحكيم التجاري الأجنبي أمام محاكم التنفيذ السعودية: السوابق والضوابط العملية",
    categoryAr: "التحكيم وفض المنازعات",
    publishedDate: "10 شوال 1447 هـ / 2026 م (نموذج افتراضي)",
    readTime: "7 دقائق قراءة",
    summaryAr:
      "استعراض لمتطلبات اتفاقية نيويورك وشروط النظام العام في المملكة، وكيف تتعامل دوائر التنفيذ مع طلبات تذييل أحكام التحكيم الدولية بالصيغة التنفيذية.",
    authorAr: "فريق أبحاث مصادقة للمحاماة",
    authorRoleAr: "قسم التحكيم وتسوية المنازعات",
  },
];
