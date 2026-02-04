"use client";
import { useState, useRef } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import Image from "next/image";

export default function GalleryClient({ images }: { images: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const currentIdx = selected ? images.findIndex((img) => img === selected) : -1;
  const showPrev = selected && currentIdx > 0;
  const showNext = selected && currentIdx < images.length - 1;

  function handlePrev(e: React.MouseEvent) {
    e.stopPropagation();
    if (showPrev) setSelected(images[currentIdx - 1]);
  }
  function handleNext(e: React.MouseEvent) {
    e.stopPropagation();
    if (showNext) setSelected(images[currentIdx + 1]);
  }
  return (
    <div className="p-4">
      <ScrollReveal direction="up">
        <h1 className="text-3xl font-bold mb-6 text-center">Galeria de Fotos</h1>
      </ScrollReveal>
      <ScrollReveal direction="up" delay={100}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" ref={gridRef}>
          {images.map((img) => (
            <button
              key={img}
              className="focus:outline-none w-full"
              onClick={() => setSelected(img)}
              aria-label="Abrir imagem em destaque"
            >
              <div className="w-full aspect-square relative">
                <Image
                  src={`/images/galeria/${img}`}
                  alt="Foto da galeria"
                  fill
                  className="rounded shadow hover:scale-105 transition-transform duration-200 object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </button>
          ))}
        </div>
      </ScrollReveal>
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            {showPrev && (
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white text-4xl px-3 py-2 rounded-full z-10"
                onClick={handlePrev}
                aria-label="Foto anterior"
              >
                ‹
              </button>
            )}
            <Image
              src={`/images/galeria/${selected}`}
              alt="Foto ampliada"
              width={1200}
              height={900}
              className="rounded shadow-lg object-contain max-h-[90vh] max-w-[90vw]"
              priority
            />
            {showNext && (
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white text-4xl px-3 py-2 rounded-full z-10"
                onClick={handleNext}
                aria-label="Próxima foto"
              >
                ›
              </button>
            )}
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold bg-black/50 rounded-full px-3 py-1 hover:bg-black/80"
              onClick={e => { e.stopPropagation(); setSelected(null); }}
              aria-label="Fechar imagem"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
