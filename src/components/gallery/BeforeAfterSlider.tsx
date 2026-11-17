"use client";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage: string;
  alt: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage, alt }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 2));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 2));
    }
  }, []);

  // No beforeImage → show afterImage only with standard styling (no slider)
  if (!beforeImage) {
    return (
      <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
        <Image
          src={afterImage}
          alt={`${alt} — completed`}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          style={{ objectFit: "cover" }}
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="ba-slider"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: "pan-y", userSelect: "none" }}
    >
      {/* After image (underneath) */}
      <Image
        src={afterImage}
        alt={`${alt} — after`}
        fill
        sizes="(max-width: 768px) 100vw, 420px"
        style={{ objectFit: "cover" }}
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="ba-before"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={`${alt} — before`}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          style={{ objectFit: "cover" }}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="ba-label ba-label--before">Before</span>
      <span className="ba-label ba-label--after">After</span>

      {/* Divider line + handle */}
      <div
        className="ba-divider"
        style={{ left: `${position}%` }}
      >
        <div
          className="ba-handle"
          role="slider"
          tabIndex={0}
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Before and after comparison"
          onKeyDown={handleKeyDown}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7 4L3 10L7 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 4L17 10L13 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
