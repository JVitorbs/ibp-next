"use client";

import { useEffect, useRef, ReactNode } from "react";

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Aplica a classe de animação
          entry.target.classList.add("animate-in");
          // Remove a classe de fora da tela
          entry.target.classList.remove("opacity-0");

          // Anima a saída se sair da tela novamente
          return;
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
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

  const directionClass = {
    left: "slide-in-from-left-96",
    right: "slide-in-from-right-96",
    up: "slide-in-from-bottom-96",
    down: "slide-in-from-top-96",
  }[direction];

  return (
    <div
      ref={ref}
      className={`opacity-0 ${directionClass} duration-700 transition-all`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
