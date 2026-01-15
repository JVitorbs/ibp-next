"use client";

import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen md:h-[600px] flex items-center justify-center overflow-hidden bg-primary">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary/90"></div>

      {/* Conteúdo */}
      <div className="relative z-10 text-center text-primary-foreground px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Igreja Batista do Pirangi
        </h1>
        <p className="text-xl md:text-2xl opacity-95 mb-8">
          Bem-vindo à Nossa Comunidade
        </p>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Um lugar de fé, amor e comunidade onde você é bem-vindo
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary-foreground opacity-80" />
      </div>
    </section>
  );
}
