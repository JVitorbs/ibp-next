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
  const [slideOffset, setSlideOffset] = useState(0);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionImages, setTransitionImages] = useState<{from: number, to: number, direction: 'left'|'right'}|null>(null);
  const touchStartX = useRef<number | null>(null);

  const handlePrev = () => {
    if (isSliding) return;
    if (isSliding) return;
    const toIndex = current === 0 ? images.length - 1 : current - 1;
    setTransitionImages({from: current, to: toIndex, direction: 'left'});
    setIsSliding(true);
    setTimeout(() => {
      setCurrent(toIndex);
      setIsSliding(false);
      setTransitionImages(null);
    }, 500);
  };
  const handleNext = () => {
    if (isSliding) return;
    if (isSliding) return;
    const toIndex = current === images.length - 1 ? 0 : current + 1;
    setTransitionImages({from: current, to: toIndex, direction: 'right'});
    setIsSliding(true);
    setTimeout(() => {
      setCurrent(toIndex);
      setIsSliding(false);
      setTransitionImages(null);
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
      {/* Galeria deslizante suave */}
      <div className="absolute inset-0 w-full h-full z-10 flex items-center">
        {transitionImages ? (
          <div
            className="w-full h-full flex"
            style={{
              width: '200%',
              transform: `translateX(${transitionImages.direction === 'left' ? 0 : -100}%)`,
              transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {/* Imagem atual */}
            <div className="w-1/2 h-full flex items-center justify-center">
              {errorIndexes.includes(transitionImages.from) ? (
                <div className={`w-full h-full bg-linear-to-br ${fallbackBg} flex items-center justify-center`}>
                  <span className="text-6xl">{fallbackIcon}</span>
                </div>
              ) : (
                <img
                  src={images[transitionImages.from]}
                  alt={alt}
                  className="w-full h-full object-cover"
                  onError={() => handleError(transitionImages.from)}
                />
              )}
            </div>
            {/* Imagem seguinte */}
            <div className="w-1/2 h-full flex items-center justify-center">
              {errorIndexes.includes(transitionImages.to) ? (
                <div className={`w-full h-full bg-linear-to-br ${fallbackBg} flex items-center justify-center`}>
                  <span className="text-6xl">{fallbackIcon}</span>
                </div>
              ) : (
                <img
                  src={images[transitionImages.to]}
                  alt={alt}
                  className="w-full h-full object-cover"
                  onError={() => handleError(transitionImages.to)}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {errorIndexes.includes(current) ? (
              <div className={`w-full h-full bg-linear-to-br ${fallbackBg} flex items-center justify-center`}>
                <span className="text-6xl">{fallbackIcon}</span>
              </div>
            ) : (
              <img
                src={images[current]}
                alt={alt}
                className="w-full h-full object-cover"
                onError={() => handleError(current)}
              />
            )}
          </div>
        )}
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
