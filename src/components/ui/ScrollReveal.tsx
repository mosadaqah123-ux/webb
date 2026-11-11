"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds (e.g. 0, 80, 160)
  duration?: number; // Duration in milliseconds (default 500)
  direction?: "up" | "fade" | "none";
}

/**
 * ScrollReveal: Premium, accessible, and progressive-enhancement safe.
 * - Single-trigger (unobserves once visible; never replays).
 * - Immediate reveal if already in viewport on mount (e.g. hash navigation / direct link).
 * - Safety fallback timer: guarantees content remains visible if observer doesn't fire.
 * - Full prefers-reduced-motion support.
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 500,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // 1. Check user's motion preferences
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setPrefersReducedMotion(true);
        setIsRevealed(true);
        return;
      }
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    // 2. Check if element is already in viewport on mount (e.g. direct load or hash scroll)
    const rect = currentRef.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
      setIsRevealed(true);
      return;
    }

    // 3. Fallback if IntersectionObserver is not supported
    if (typeof IntersectionObserver === "undefined") {
      setIsRevealed(true);
      return;
    }

    // 4. Safety timer: guarantees content is never stuck invisible
    const safetyTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 1200);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsRevealed(true);
          clearTimeout(safetyTimer);
          observer.unobserve(currentRef);
        }
      },
      {
        rootMargin: "50px 0px 50px 0px", // Generous margin for smooth pre-reveal
        threshold: 0.01,
      }
    );

    observer.observe(currentRef);

    return () => {
      clearTimeout(safetyTimer);
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, []);

  // If reduced motion is requested, render without animation delay
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const getTransformClasses = () => {
    if (isRevealed) {
      return "opacity-100 translate-y-0";
    }
    if (direction === "up") {
      return "opacity-0 translate-y-4";
    }
    return "opacity-0";
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${isRevealed ? delay : 0}ms`,
      }}
      className={`transition-all ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${getTransformClasses()} ${className}`}
    >
      {children}
    </div>
  );
}
