"use client";

import { usePathname } from "next/navigation";
import { SiteNavigation } from "./SiteNavigation";
import { Footer } from "./Footer";
import { WhatsApp } from "./WhatsApp";
import { PageTransition } from "./PageTransition";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteNavigation />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <WhatsApp number="918111000245" message="Hi Vinskape team, I need a quotation for interior design." />
    </>
  );
}
