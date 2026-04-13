import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

export interface CarouselProps {
  images: string[];
  alt: string;
  fallbackBg: string;
  fallbackIcon: string;
}

export function Carousel({
  images,
  alt,
  fallbackBg,
  fallbackIcon,
}: CarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [errorIndexes, setErrorIndexes] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const handleError = (idx: number) =>
    setErrorIndexes((prev) => (prev.includes(idx) ? prev : [...prev, idx]));

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (images.length <= 1) return;

    const total = images.length;
    const nextIndex = (selectedIndex + 1) % total;
    const prevIndex = (selectedIndex - 1 + total) % total;

    [nextIndex, prevIndex].forEach((index) => {
      const preload = new window.Image();
      preload.src = images[index];
    });
  }, [selectedIndex, images]);

  const handleNext = () => {
    emblaApi?.scrollNext();
  };

  const handlePrev = () => {
    emblaApi?.scrollPrev();
  };

  const renderImage = (idx: number, priority = false) =>
    errorIndexes.includes(idx) ? (
      <div
        className={`w-full h-full bg-linear-to-br ${fallbackBg} flex items-center justify-center`}
      >
        <span className="text-6xl">{fallbackIcon}</span>
      </div>
    ) : (
      <Image
        src={images[idx]}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover select-none"
        onError={() => handleError(idx)}
      />
    );

  return (
    <div className="relative h-72 overflow-hidden bg-black/10">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {images.map((_, idx) => (
            <div key={idx} className="relative min-w-0 shrink-0 grow-0 basis-full h-full">
              {renderImage(idx, idx === selectedIndex)}
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <button
            onClick={handlePrev}
            className="pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-1"
            aria-label="Imagem anterior"
          >
            ←
          </button>

          <button
            onClick={handleNext}
            className="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-1"
            aria-label="Próxima imagem"
          >
            →
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Ir para imagem ${i + 1}`}
                aria-current={selectedIndex === i}
                className="pointer-events-auto"
              >
                <span
                  className={`block w-2 h-2 rounded-full ${
                    i === selectedIndex ? "bg-primary" : "bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}