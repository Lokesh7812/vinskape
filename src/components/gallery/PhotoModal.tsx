"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface PhotoModalProps {
  photos: string[];
  projectTitle: string;
  isOpen: boolean;
  onClose: () => void;
  /** If true, shows an "Inquire about this design" link at the bottom */
  showInquiry?: boolean;
}

export function PhotoModal({ photos, projectTitle, isOpen, onClose, showInquiry }: PhotoModalProps) {
  const [view, setView] = useState<"grid" | "single">("grid");
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Capture the element that opened the modal so we can return focus
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      // Focus the close button after mount
      setTimeout(() => closeRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      triggerRef.current?.focus();
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

  // Keyboard navigation
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (view === "single") setView("grid");
      else onClose();
    }
  };

  return (
    <div className="pm-overlay" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-label={`${projectTitle} photos`}>
      <div className="pm-container">
        {/* Header */}
        <div className="pm-header">
          <div>
            {view === "single" && (
              <button className="pm-back" onClick={() => setView("grid")} aria-label="Back to grid">
                ← Grid
              </button>
            )}
            <h3 className="pm-title">{projectTitle}</h3>
            {view === "grid" && (
              <span className="pm-count">{photos.length} photo{photos.length !== 1 ? "s" : ""}</span>
            )}
            {view === "single" && (
              <span className="pm-count">{activeIndex + 1} / {photos.length}</span>
            )}
          </div>
          <button ref={closeRef} className="pm-close" onClick={onClose} aria-label="Close gallery">
            ✕
          </button>
        </div>

        {/* Grid view */}
        {view === "grid" && (
          <div className="pm-grid">
            {photos.map((src, i) => (
              <button key={i} className="pm-thumb" onClick={() => openSingle(i)} aria-label={`View photo ${i + 1}`}>
                <Image
                  src={src}
                  alt={`${projectTitle} photo ${i + 1}`}
                  fill
                  sizes="(max-width: 560px) 50vw, (max-width: 1040px) 33vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        )}

        {/* Single-photo view */}
        {view === "single" && (
          <div className="pm-single">
            <button className="pm-nav pm-nav--prev" onClick={() => goTo(-1)} aria-label="Previous photo">
              ‹
            </button>
            <div className="pm-single-img">
              <Image
                src={photos[activeIndex]}
                alt={`${projectTitle} photo ${activeIndex + 1}`}
                fill
                sizes="90vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <button className="pm-nav pm-nav--next" onClick={() => goTo(1)} aria-label="Next photo">
              ›
            </button>
          </div>
        )}

        {/* Inquiry link (completed projects) */}
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
    </div>
  );
}
