"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const sobre = document.getElementById('sobre');
    if (sobre) {
      sobre.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <Image
          src="/logos_Ibp/logo_lado_w.png"
          alt="Logo Igreja Batista do Pirangi"
          width={600}
          height={300}
          className="mx-auto mb-6 drop-shadow-lg"
        />
        <p className="text-lg sm:text-xl md:text-2xl opacity-95 mb-6 sm:mb-8 drop-shadow-md">
          Bem-vindo à Nossa Comunidade
        </p>
        <p className="text-base sm:text-lg md:text-lg opacity-90 max-w-2xl mx-auto drop-shadow-md">
          Uma igreja Bíblica, Integral e Relevante.
        </p>
      </div>

      {/* Scroll Indicator */}
      <Link href="/#sobre" onClick={scrollToSection} className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer">
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-80 drop-shadow-md" />
      </Link>
    </section>
  );
}
