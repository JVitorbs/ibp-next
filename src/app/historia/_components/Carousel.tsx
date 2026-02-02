import React, { useState } from "react";

export interface CarouselProps {
  images: string[];
  alt: string;
  fallbackBg: string;
  fallbackIcon: string;
}

export function Carousel({ images, alt, fallbackBg, fallbackIcon }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [errorIndexes, setErrorIndexes] = useState<number[]>([]);

  const handlePrev = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const handleError = (idx: number) => setErrorIndexes((prev) => [...prev, idx]);

  return (
    <div className="relative h-72 overflow-hidden flex items-center justify-center bg-black/10">
      {errorIndexes.includes(current) ? (
        <div className={`w-full h-full bg-gradient-to-br ${fallbackBg} flex items-center justify-center`}>
          <span className="text-6xl">{fallbackIcon}</span>
        </div>
      ) : (
        <img
          src={images[current]}
          alt={alt}
          className="w-full h-full object-cover transition-all duration-300"
          onError={() => handleError(current)}
        />
      )}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white"
            onClick={handlePrev}
            aria-label="Imagem anterior"
            type="button"
          >
            &#8592;
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white"
            onClick={handleNext}
            aria-label="Próxima imagem"
            type="button"
          >
            &#8594;
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`inline-block w-2 h-2 rounded-full ${idx === current ? 'bg-primary' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
