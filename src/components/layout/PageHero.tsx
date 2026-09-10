"use client";
import Image from "next/image";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export function PageHero({ eyebrow, title, titleAccent, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="page-hero">
      {backgroundImage && (
        <Image src={backgroundImage} alt="" fill sizes="100vw" className="page-hero-bg" priority />
      )}
      <div className="page-hero-overlay" />
      <div className="page-hero-content shell">
        <p className="eyebrow">{eyebrow}</p>
        <h1>
          {title}
          {titleAccent && (
            <>
              <br />
              <em>{titleAccent}</em>
            </>
          )}
        </h1>
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}
      </div>
    </section>
  );
}
