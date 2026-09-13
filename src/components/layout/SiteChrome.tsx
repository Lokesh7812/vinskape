"use client";

import { usePathname } from "next/navigation";
import { SiteNavigation } from "./SiteNavigation";
import { Footer } from "./Footer";
import { WhatsApp } from "./WhatsApp";
import { PageTransition } from "./PageTransition";
import { BrandPreloader } from "./BrandPreloader";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <BrandPreloader />
      <SiteNavigation />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <WhatsApp number="918111000245" message="Hi Vinskape team, I need a quotation for interior design." />
    </>
  );
}
