import React, { useState, useRef } from "react";

export interface CarouselProps {
  images: string[];
  alt: string;
  fallbackBg: string;
  fallbackIcon: string;
}

export function Carousel({ images, alt, fallbackBg, fallbackIcon }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [errorIndexes, setErrorIndexes] = useState<number[]>([]);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const handlePrev = () => {
    if (isSliding) return;
    setSlideDirection('left');
    setNextIndex(current === 0 ? images.length - 1 : current - 1);
    setIsSliding(true);
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setIsSliding(false);
      setSlideDirection(null);
      setNextIndex(null);
    }, 500);
  };
  const handleNext = () => {
    if (isSliding) return;
    setSlideDirection('right');
    setNextIndex(current === images.length - 1 ? 0 : current + 1);
    setIsSliding(true);
    setTimeout(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setIsSliding(false);
      setSlideDirection(null);
      setNextIndex(null);
    }, 500);
  };

  // Touch events para swipe
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartX.current = null;
  };
  const handleError = (idx: number) => setErrorIndexes((prev) => [...prev, idx]);

  return (
    <div
      className="relative h-72 overflow-hidden flex items-center justify-center bg-black/10"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Camada das imagens com slide real */}
      <div className="absolute inset-0 w-full h-full z-10">
        {/* Slide container */}
        <div className="w-full h-full relative">
          {/* Imagem atual */}
          {(!isSliding || nextIndex === null) && (
            errorIndexes.includes(current) ? (
              <div
                className={`absolute w-full h-full bg-linear-to-br ${fallbackBg} flex items-center justify-center transition-transform duration-500`}
                style={{ transform: 'translateX(0)' }}
              >
                <span className="text-6xl">{fallbackIcon}</span>
              </div>
            ) : (
              <img
                src={images[current]}
                alt={alt}
                className="absolute w-full h-full object-cover transition-transform duration-500"
                style={{ transform: 'translateX(0)' }}
                onError={() => handleError(current)}
              />
            )
          )}
          {/* Transição: renderiza ambas as imagens */}
          {isSliding && nextIndex !== null && (
            <>
              {/* Imagem atual saindo */}
              {errorIndexes.includes(current) ? (
                <div
                  className={`absolute w-full h-full bg-linear-to-br ${fallbackBg} flex items-center justify-center transition-transform duration-500`}
                  style={{
                    transform: slideDirection === 'left'
                      ? 'translateX(-100%)'
                      : 'translateX(100%)'
                  }}
                >
                  <span className="text-6xl">{fallbackIcon}</span>
                </div>
              ) : (
                <img
                  src={images[current]}
                  alt={alt}
                  className="absolute w-full h-full object-cover transition-transform duration-500"
                  style={{
                    transform: slideDirection === 'left'
                      ? 'translateX(-100%)'
                      : 'translateX(100%)'
                  }}
                  onError={() => handleError(current)}
                />
              )}
              {/* Imagem seguinte entrando */}
              {errorIndexes.includes(nextIndex) ? (
                <div
                  className={`absolute w-full h-full bg-linear-to-br ${fallbackBg} flex items-center justify-center transition-transform duration-500`}
                  style={{ transform: 'translateX(0)' }}
                >
                  <span className="text-6xl">{fallbackIcon}</span>
                </div>
              ) : (
                <img
                  src={images[nextIndex]}
                  alt={alt}
                  className="absolute w-full h-full object-cover transition-transform duration-500"
                  style={{ transform: 'translateX(0)' }}
                  onError={() => handleError(nextIndex)}
                />
              )}
            </>
          )}
        </div>
      </div>
      {/* Camada das setas e indicadores */}
      {images.length > 1 && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white pointer-events-auto"
            onClick={handlePrev}
            aria-label="Imagem anterior"
            type="button"
          >
            &#8592;
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white pointer-events-auto"
            onClick={handleNext}
            aria-label="Próxima imagem"
            type="button"
          >
            &#8594;
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`inline-block w-2 h-2 rounded-full ${idx === current ? 'bg-primary' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
