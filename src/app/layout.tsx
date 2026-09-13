import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import "./globals.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "VINSKAPE | Interior Design & Architecture",
  description: "Thoughtful, elegant and functional interiors for homes, commercial spaces and modern workplaces.",
  icons: {
    icon: "/VK Logo.png",
    apple: "/VK Logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
