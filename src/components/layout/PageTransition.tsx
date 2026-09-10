"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    // When path changes
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setShowProgress(true);
      setProgress(30);
      setAnimating(true);

      const p1 = setTimeout(() => setProgress(75), 100);
      const p2 = setTimeout(() => setProgress(100), 250);
      const p3 = setTimeout(() => {
        setShowProgress(false);
        setProgress(0);
        setAnimating(false);
      }, 450);

      // Handle in-page smooth scroll if hash present
      if (window.location.hash) {
        const id = window.location.hash.replace("#", "");
        const elem = document.getElementById(id);
        if (elem) {
          setTimeout(() => {
            elem.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 150);
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      return () => {
        clearTimeout(p1);
        clearTimeout(p2);
        clearTimeout(p3);
      };
    }
  }, [pathname]);

  return (
    <>
      {/* Sleek Top Gold Progress Bar */}
      <div
        className="top-progress-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          zIndex: 9999,
          pointerEvents: "none",
          opacity: showProgress ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #9d7e4b, #e6c898, #b59b73)",
            boxShadow: "0 0 10px rgba(226, 201, 159, 0.8)",
            transition: "width 0.3s cubic-bezier(0.1, 0.8, 0.2, 1)",
          }}
        />
      </div>

      {/* Main Page Container with Smooth Animation */}
      <div
        key={pathname}
        className={`page-transition-wrapper ${animating ? "page-entering" : "page-idle"}`}
      >
        {children}
      </div>
    </>
  );
}
