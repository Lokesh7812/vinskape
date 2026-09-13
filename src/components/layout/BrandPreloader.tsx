"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function BrandPreloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if force replay requested or already shown in this session
    const forceReplay = typeof window !== "undefined" && window.location.search.includes("replay=1");
    const hasSeen = typeof window !== "undefined" && window.sessionStorage.getItem("vinskape_preloader_seen");
    
    // If already seen and not forcing replay, cleanly unmount
    if (hasSeen && !forceReplay) {
      setVisible(false);
      return;
    }

    // If forcing replay, make sure skip class is removed
    if (forceReplay) {
      document.documentElement.classList.remove("vk-preloader-skip");
    }

    // Prevent body scroll during intro
    document.body.style.overflow = "hidden";

    // Progress counter ticker
    const startTime = Date.now();
    const duration = 1600; // 1.6 seconds for the counter

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(timer);
        // Start exit animation after 250ms
        setTimeout(() => {
          setExiting(true);
          // Restore body scrolling
          document.body.style.overflow = "";
          // Mark as seen in session and add class
          try {
            window.sessionStorage.setItem("vinskape_preloader_seen", "true");
            document.documentElement.classList.add("vk-preloader-skip");
          } catch {
            // ignore session storage quota errors
          }
          // Remove from DOM after transition completes
          setTimeout(() => {
            setVisible(false);
          }, 850);
        }, 300);
      }
    }, 25);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    setExiting(true);
    document.body.style.overflow = "";
    try {
      window.sessionStorage.setItem("vinskape_preloader_seen", "true");
      document.documentElement.classList.add("vk-preloader-skip");
    } catch {
      // ignore
    }
    setTimeout(() => {
      setVisible(false);
    }, 600);
  };

  if (!visible) return null;

  return (
    <div
      className={`vk-preloader ${exiting ? "vk-preloader--exit" : ""}`}
      onClick={handleSkip}
      role="dialog"
      aria-label="Loading VINSKAPE"
    >
      {/* Background Ambience & Glow */}
      <div className="vk-preloader-backdrop">
        <div className="vk-preloader-glow" />
      </div>

      <div className="vk-preloader-content" onClick={(e) => e.stopPropagation()}>
        {/* Phase 1: The VK Monogram Mark */}
        <div className="vk-preloader-emblem-wrap">
          <div className="vk-preloader-emblem-aura" />
          <Image
            src="/VK Logo.png"
            alt="VK"
            width={90}
            height={58}
            priority
            className="vk-preloader-emblem"
          />
        </div>

        {/* Phase 2: The Full VINSKAPE Wordmark */}
        <div className="vk-preloader-wordmark-wrap">
          <Image
            src="/Logo Vinskape.png"
            alt="VINSKAPE"
            width={200}
            height={44}
            priority
            className="vk-preloader-wordmark"
          />
        </div>

        {/* Hairline Gold Rule */}
        <div className="vk-preloader-rule" />

        {/* Phase 3: Tagline */}
        <p className="vk-preloader-tagline">
          Crafting Spaces · Defining Lifestyles
        </p>

        {/* Phase 4: Luxury Minimalist Progress Bar & Percentage */}
        <div className="vk-preloader-meter">
          <div className="vk-preloader-track">
            <div
              className="vk-preloader-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="vk-preloader-percent">
            {progress < 10 ? `0${progress}` : progress}%
          </span>
        </div>

        {/* Subtle skip prompt */}
        <button
          type="button"
          onClick={handleSkip}
          className="vk-preloader-skip"
          aria-label="Skip intro"
        >
          skip intro ✕
        </button>
      </div>
    </div>
  );
}
