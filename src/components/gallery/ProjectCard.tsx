"use client";
import { useState } from "react";
import Image from "next/image";
import type { OngoingProject, CompletedProject } from "@/data/projects";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { PhotoModal } from "./PhotoModal";

interface OngoingCardProps {
  project: OngoingProject;
}

export function OngoingCard({ project }: OngoingCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <article className="gv2-card">
        <div className="gv2-card-img">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 560px) 100vw, (max-width: 1040px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
          <span className="gv2-tag gv2-tag--progress">{project.progress}% complete</span>
        </div>
        <div className="gv2-card-body">
          <div className="gv2-card-meta">
            <span className="gv2-loc">📍 {project.location}</span>
            <span className="gv2-cat">{project.category}</span>
          </div>
          <h3 className="gv2-card-title">{project.title}</h3>
          <div className="gv2-progress-track">
            <div className="gv2-progress-fill" style={{ width: `${project.progress}%` }} />
          </div>
          <p className="gv2-update">Latest update: {project.latestUpdate}</p>
          <button className="gv2-btn" onClick={() => setModalOpen(true)}>
            View site photos
          </button>
        </div>
      </article>

      <PhotoModal
        photos={project.photos}
        projectTitle={project.title}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

interface CompletedCardProps {
  project: CompletedProject;
}

export function CompletedCard({ project }: CompletedCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  // For modal: prepend before & after as first photos
  const modalPhotos: string[] = [];
  if (project.beforeImage) modalPhotos.push(project.beforeImage);
  modalPhotos.push(project.afterImage);
  for (const p of project.photos) {
    if (!modalPhotos.includes(p)) modalPhotos.push(p);
  }

  return (
    <>
      <article className="gv2-card">
        <div className="gv2-card-slider">
          <BeforeAfterSlider
            beforeImage={project.beforeImage}
            afterImage={project.afterImage}
            alt={project.title}
          />
        </div>
        <div className="gv2-card-body">
          <div className="gv2-card-meta">
            <span className="gv2-loc">📍 {project.location} · Completed {project.completedYear}</span>
            <span className="gv2-cat">{project.category}</span>
          </div>
          <h3 className="gv2-card-title">{project.title}</h3>
          <button className="gv2-btn" onClick={() => setModalOpen(true)}>
            View all photos
          </button>
        </div>
      </article>

      <PhotoModal
        photos={modalPhotos}
        projectTitle={project.title}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        showInquiry
      />
    </>
  );
}
