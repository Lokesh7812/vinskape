import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import { SiteNavigation } from "@/components/layout/SiteNavigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsApp } from "@/components/layout/WhatsApp";
import { PageTransition } from "@/components/layout/PageTransition";
import "./globals.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "VINSKAPE | Interior Design & Architecture",
  description: "Thoughtful, elegant and functional interiors for homes, commercial spaces and modern workplaces.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>
        <SiteNavigation />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <WhatsApp number="918111000245" message="Hi Vinskape team, I need a quotation for interior design." />
      </body>
    </html>
  );
}
