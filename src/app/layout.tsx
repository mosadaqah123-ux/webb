import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Amiri } from "next/font/google";
import "./globals.css";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "مصادقة للمحاماة والاستشارات القانونية | Musadqh Law Firm",
  description:
    "شركة مصادقة للمحاماة والاستشارات القانونية - أصالة المشورة ورصانة التمثيل القضائي في المملكة العربية السعودية. حلول قانونية استراتيجية للشركات والكيانات الاستثمارية والأفراد.",
  keywords: [
    "مصادقة للمحاماة",
    "محاماة الرياض",
    "استشارات قانونية السعودية",
    "تحكيم تجاري",
    "حوكمة شركات",
    "musadqh law firm",
  ],
  authors: [{ name: "مصادقة للمحاماة" }],
  icons: {
    icon: "/musadqh-emblem-gold.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${ibmPlexArabic.variable} ${amiri.variable} font-arabic bg-ivory-50 text-navy-900 antialiased selection:bg-gold-400/20 selection:text-navy-950 overflow-x-hidden w-full`}
      >
        {children}
      </body>
    </html>
  );
}
