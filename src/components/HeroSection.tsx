"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] md:h-[80vh] sm:h-[100vh] flex items-center justify-center overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/igreja_aniv.jpeg"
          alt="Igreja Batista do Pirangi"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
        />
        {/* Overlay escuro para melhor legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 tracking-tight drop-shadow-lg">
          Igreja Batista do Pirangi
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl opacity-95 mb-6 sm:mb-8 drop-shadow-md">
          Bem-vindo à Nossa Comunidade
        </p>
        <p className="text-base sm:text-lg md:text-lg opacity-90 max-w-2xl mx-auto drop-shadow-md">
          Um lugar de fé, amor e comunidade onde você é bem-vindo
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-80 drop-shadow-md" />
      </div>
    </section>
  );
}
