import { useRef, useState } from "react";
import Image from "next/image";

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
  const [current, setCurrent] = useState(0);
  const [transition, setTransition] = useState<{
    from: number;
    to: number;
    direction: "left" | "right";
  } | null>(null);

  const [offset, setOffset] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [errorIndexes, setErrorIndexes] = useState<number[]>([]);
  const touchStartX = useRef<number | null>(null);

  // 🔹 Preload compatível com next/image
  const preloadImage = (src: string) =>
    new Promise<void>((resolve) => {
      const img = document.createElement("img");
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });

  const handleError = (idx: number) =>
    setErrorIndexes((prev) =>
      prev.includes(idx) ? prev : [...prev, idx]
    );

  const slideTo = async (to: number, direction: "left" | "right") => {
    if (isSliding) return;

    setIsSliding(true);

    // 🟢 garante que a próxima imagem já esteja no cache
    await preloadImage(images[to]);

    setTransition({ from: current, to, direction });

    if (direction === "right") {
      setOffset(0);
      requestAnimationFrame(() => setOffset(-100));
    } else {
      setOffset(-100);
      requestAnimationFrame(() => setOffset(0));
    }

    setTimeout(() => {
      setCurrent(to);
      setTransition(null);
      setOffset(0);
      setIsSliding(false);
    }, 500);
  };

  const handleNext = () => {
    const to = current === images.length - 1 ? 0 : current + 1;
    slideTo(to, "right");
  };

  const handlePrev = () => {
    const to = current === 0 ? images.length - 1 : current - 1;
    slideTo(to, "left");
  };

  // 👉 Swipe
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? handlePrev() : handleNext();
    }

    touchStartX.current = null;
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
    <div
      className="relative h-72 overflow-hidden bg-black/10"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0">
        {transition ? (
          <div
            className="flex h-full"
            style={{
              width: "200%",
              transform: `translateX(${offset}%)`,
              transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div className="relative w-1/2 h-full">
              {renderImage(transition.from)}
            </div>
            <div className="relative w-1/2 h-full">
              {renderImage(transition.to)}
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {renderImage(current, true)}
          </div>
        )}
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
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === current ? "bg-primary" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}