"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface PhotoModalProps {
  photos: string[];
  projectTitle: string;
  isOpen: boolean;
  onClose: () => void;
  showInquiry?: boolean;
}

export function PhotoModal({ photos, projectTitle, isOpen, onClose, showInquiry }: PhotoModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [view, setView] = useState<"grid" | "single">("grid");
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  /* ── lock body scroll & focus management ── */
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => closeRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      triggerRef.current?.focus();
      // Reset to grid on close
      setView("grid");
      setActiveIndex(0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const goTo = useCallback(
    (dir: 1 | -1) => {
      setActiveIndex((i) => {
        const next = i + dir;
        if (next < 0) return photos.length - 1;
        if (next >= photos.length) return 0;
        return next;
      });
    },
    [photos.length],
  );

  /* ── keyboard ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (view === "single") {
          setView("grid");
        } else {
          onClose();
        }
      }
      if (view === "single") {
        if (e.key === "ArrowLeft") goTo(-1);
        if (e.key === "ArrowRight") goTo(1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, view, goTo, onClose]);

  if (!isOpen) return null;

  const openSingle = (idx: number) => {
    setActiveIndex(idx);
    setView("single");
  };

  return (
    <div
      className="pm-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} photos`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (view === "single") setView("grid");
          else onClose();
        }
      }}
    >
      {/* ── Top bar ── */}
      <div className="pm-topbar">
        <div className="pm-topbar-left">
          {view === "single" && (
            <button className="pm-back" onClick={() => setView("grid")} aria-label="Back to grid">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              All Photos
            </button>
          )}
          <h3 className="pm-title">{projectTitle}</h3>
          <span className="pm-count">
            {view === "grid"
              ? `${photos.length} photo${photos.length !== 1 ? "s" : ""}`
              : `${activeIndex + 1} / ${photos.length}`}
          </span>
        </div>
        <button ref={closeRef} className="pm-close" onClick={onClose} aria-label="Close gallery">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* ── Grid view ── */}
      {view === "grid" && (
        <div className="pm-body">
          <div className="pm-grid">
            {photos.map((src, i) => (
              <button
                key={i}
                className="pm-thumb"
                onClick={() => openSingle(i)}
                aria-label={`View photo ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`${projectTitle} photo ${i + 1}`}
                  fill
                  sizes="(max-width: 560px) 48vw, (max-width: 900px) 30vw, 22vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="pm-thumb-num">{i + 1}</span>
              </button>
            ))}
          </div>

          {showInquiry && (
            <div className="pm-footer">
              <Link
                href={`/contact?service=${encodeURIComponent(projectTitle)}`}
                className="pm-inquiry"
              >
                Inquire About This Design →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ── Single photo view ── */}
      {view === "single" && (
        <div className="pm-single">
          <button className="pm-nav pm-nav--prev" onClick={() => goTo(-1)} aria-label="Previous photo">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="pm-single-img">
            <Image
              src={photos[activeIndex]}
              alt={`${projectTitle} photo ${activeIndex + 1}`}
              fill
              sizes="90vw"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          <button className="pm-nav pm-nav--next" onClick={() => goTo(1)} aria-label="Next photo">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Thumbnail strip */}
          <div className="pm-strip">
            {photos.map((src, i) => (
              <button
                key={i}
                className={`pm-strip-thumb ${i === activeIndex ? "pm-strip-thumb--active" : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="60px"
                  style={{ objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
