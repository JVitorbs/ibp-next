"use client";

import { useEffect, useRef, ReactNode, useState } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
}

export function ScrollReveal({
  children,
  direction = "left",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getTransformClass = () => {
    if (isVisible || reduceMotion) return "";

    switch (direction) {
      case "left":
        return "-translate-x-24";
      case "right":
        return "translate-x-24";
      case "up":
        return "translate-y-24";
      case "down":
        return "-translate-y-24";
      default:
        return "";
    }
  };

  return (
    <div
      ref={ref}
      className={`${getTransformClass()} ${isVisible || reduceMotion ? "opacity-100" : "opacity-0"} duration-700 transition-all`}
      style={{ transitionDelay: isVisible && !reduceMotion ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
