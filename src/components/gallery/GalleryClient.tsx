"use client";

import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { OngoingCard, CompletedCard } from "@/components/gallery/ProjectCard";
import type { Project, OngoingProject, CompletedProject } from "@/data/projects";

const heroConfig = {
  ongoing: {
    eyebrow: "ONGOING PROJECTS",
    title: "Currently in",
    titleAccent: "progress.",
    subtitle:
      "Active site execution, custom modular installations, and architectural transformations happening right now across Chennai and South India.",
    heroImage: "/images/Living Room/Living Room/4.png",
  },
  completed: {
    eyebrow: "COMPLETED PROJECTS",
    title: "Successfully",
    titleAccent: "delivered.",
    subtitle:
      "Finished spaces crafted with precision, premium brand fittings, and handed over seamlessly to happy clients.",
    heroImage: "/images/Living Room/Living Room/Living.png",
  },
};

interface GalleryClientProps {
  status: "ongoing" | "completed";
  projects: Project[];
  counts: {
    ongoing: number;
    completed: number;
  };
}

export function GalleryClient({ status, projects, counts }: GalleryClientProps) {
  const hero = heroConfig[status];

  return (
    <main>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        titleAccent={hero.titleAccent}
        subtitle={hero.subtitle}
        backgroundImage={hero.heroImage}
      />

      {/* Navigation pills */}
      <section className="shell" style={{ paddingTop: 60, paddingBottom: 30 }}>
        <div className="gv2-pills">
          <Link href="/gallery" className="gv2-pill-link">
            ← All Gallery Projects
          </Link>
          <span className="gv2-pill-sep">|</span>
          <Link
            href="/gallery/ongoing"
            className={`gv2-pill ${status === "ongoing" ? "gv2-pill--active" : ""}`}
          >
            Ongoing ({counts.ongoing})
          </Link>
          <Link
            href="/gallery/completed"
            className={`gv2-pill ${status === "completed" ? "gv2-pill--active" : ""}`}
          >
            Completed ({counts.completed})
          </Link>
        </div>
      </section>

      {/* Cards grid */}
      <section className="shell" style={{ paddingTop: 20, paddingBottom: 100 }}>
        <div className="gv2-grid">
          {status === "ongoing" &&
            projects.map((p) => (
              <OngoingCard key={p.slug} project={p as OngoingProject} />
            ))}
          {status === "completed" &&
            projects.map((p) => (
              <CompletedCard key={p.slug} project={p as CompletedProject} />
            ))}
        </div>

        {/* Switcher banner */}
        <div className="gv2-switcher">
          <div>
            <h3 className="gv2-switcher-title">Looking for our other work?</h3>
            <p className="gv2-switcher-sub">
              Explore our full catalog of residential and commercial milestones.
            </p>
          </div>
          <Link
            href={`/gallery/${status === "ongoing" ? "completed" : "ongoing"}`}
            className="button dark"
          >
            {status === "ongoing" ? "View Completed Projects" : "View Ongoing Projects"} →
          </Link>
        </div>
      </section>
    </main>
  );
}
