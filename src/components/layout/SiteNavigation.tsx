"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface NavChild {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface NavItem {
  label: string;
  href: string;
  featured?: boolean;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Residential",
        href: "/services/residential",
        children: [
          { label: "Apartment 2BHK Interior", href: "/services/residential/apartment-2bhk" },
          { label: "3BHK Interiors", href: "/services/residential/3bhk-interiors" },
          { label: "4BHK Interiors", href: "/services/residential/4bhk-interiors" },
          { label: "Villa", href: "/services/residential/villa" },
          { label: "Bungalow", href: "/services/residential/bungalow" },
        ],
      },
      {
        label: "Commercial",
        href: "/services/commercial",
        children: [
          { label: "Office Workspaces", href: "/services/commercial/office-workspaces" },
          { label: "Retail Outlets", href: "/services/commercial/retail-outlets" },
          { label: "Hospitality", href: "/services/commercial/hospitality" },
          { label: "Healthcare & Clinics", href: "/services/commercial/healthcare-clinics" },
          { label: "Educational & Institutions", href: "/services/commercial/educational-institutions" },
        ],
      },
      {
        label: "Enterprise",
        href: "/services/enterprise",
        children: [
          { label: "Corporate Office Interiors", href: "/services/enterprise/corporate-offices" },
          { label: "Collaborative Workspaces", href: "/services/enterprise/collaborative-workspaces" },
          { label: "Biophilic Enterprise Design", href: "/services/enterprise/biophilic-design" },
        ],
      },
    ],
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    children: [
      { label: "Living Room", href: "/portfolio/living-room" },
      { label: "Modular Kitchen", href: "/portfolio/modular-kitchen" },
      { label: "Bedroom", href: "/portfolio/bedroom" },
      { label: "Kids Room", href: "/portfolio/kids-room" },
      { label: "Dining", href: "/portfolio/dining" },
      { label: "Office", href: "/portfolio/office" },
      { label: "Commercial", href: "/portfolio/commercial" },
      { label: "Bathroom", href: "/portfolio/bathroom" },
    ],
  },
  {
    label: "Gallery",
    href: "/gallery",
    children: [
      { label: "Ongoing Projects", href: "/gallery/ongoing" },
      { label: "Completed Projects", href: "/gallery/completed" },
    ],
  },
  { label: "Our Dealerships", href: "/dealerships" },
  { label: "Products", href: "/products" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact", featured: true },
];

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`nav ${scrolled || !isHome ? "scrolled" : ""}`}>
      <Link href="/" className="wordmark">
        VINSKAPE
      </Link>
      <nav>
        {navItems.map((item) => (
          <div className="nav-item" key={item.label}>
            <Link href={item.href} className={pathname === item.href ? "active-nav" : ""}>
              {item.label}
              {item.children && <i>⌄</i>}
            </Link>
            {item.children && (
              <div className="dropdown">
                {item.children.map((child) => (
                  <div key={child.label} style={{ marginBottom: "6px" }}>
                    <Link
                      href={child.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 10px",
                        fontSize: "12px",
                        color: "#f5f3ee",
                        textDecoration: "none",
                        fontWeight: 500,
                        borderRadius: "2px",
                      }}
                    >
                      {child.label}
                      {child.children && <i style={{ fontStyle: "normal", color: "#b59b73" }}>→</i>}
                    </Link>
                    {child.children?.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="sub"
                        style={{
                          display: "block",
                          padding: "4px 10px 4px 22px",
                          fontSize: "11px",
                          color: "#c4bcaf",
                          textDecoration: "none",
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
        <span />
        <span />
      </button>

      {/* Mobile backdrop overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            zIndex: 24,
          }}
        />
      )}

      <aside className={`mobile-menu ${open ? "open" : ""}`}>
        {/* Mobile Header with Close X Button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            paddingBottom: "14px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <span style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#b29565", fontWeight: 700 }}>
            NAVIGATION
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f5f3ee",
              fontSize: "18px",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {navItems.map((item) => (
          <div key={item.label} style={{ marginBottom: "12px" }}>
            <Link
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                fontSize: "17px",
                fontWeight: 600,
                color: "#f5f3ee",
                textDecoration: "none",
                padding: "4px 0",
              }}
            >
              {item.label}
            </Link>
            {item.children?.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "5px 0 5px 12px",
                  fontSize: "13px",
                  color: "#d0c8bb",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    color: "#b29565",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  ›
                </span>
                <span>{child.label}</span>
              </Link>
            ))}
          </div>
        ))}
        {/* Tagline removed per design */}
      </aside>
    </header>
  );
}
