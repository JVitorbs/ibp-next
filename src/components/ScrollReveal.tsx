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
    if (isVisible) return "";

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
      className={`${getTransformClass()} ${isVisible ? "opacity-100" : "opacity-0"} duration-700 transition-all`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
