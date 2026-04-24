"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Download, X, ZoomIn, ZoomOut } from "lucide-react";

const MIN_ZOOM = 1;
const DESKTOP_ZOOM = 2;
const MAX_ZOOM = 3;
const PAN_LIMIT_BASE = 180;
const MAIN_EMBLA_OPTIONS = {
  loop: true,
  align: "center",
} as const;

function clampZoom(value: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

function clampPan(value: number, zoomScale: number) {
  const limit = Math.max(0, (zoomScale - 1) * PAN_LIMIT_BASE);
  return Math.max(-limit, Math.min(limit, value));
}

function getTouchDistance(firstTouch: React.Touch, secondTouch: React.Touch) {
  return Math.hypot(secondTouch.clientX - firstTouch.clientX, secondTouch.clientY - firstTouch.clientY);
}

export default function GalleryClient({ images }: { images: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [showPinchHint, setShowPinchHint] = useState(false);
  const pinchRef = useRef<{ distance: number; scale: number } | null>(null);
  const panDragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);

  const [mainEmblaRef, mainEmblaApi] = useEmblaCarousel(MAIN_EMBLA_OPTIONS);
  const [thumbEmblaRef, thumbEmblaApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const isZoomed = zoomScale > 1.05;

  useEffect(() => {
    const hasTouchInput = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    setShowPinchHint(hasTouchInput);
  }, []);

  const scrollPrev = useCallback(() => {
    mainEmblaApi?.scrollPrev();
  }, [mainEmblaApi]);

  const scrollNext = useCallback(() => {
    mainEmblaApi?.scrollNext();
  }, [mainEmblaApi]);

  const resetZoom = useCallback(() => {
    pinchRef.current = null;
    panDragRef.current = null;
    setIsPanning(false);
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const toggleZoom = useCallback(() => {
    setZoomScale((currentScale) => (currentScale > 1 ? 1 : DESKTOP_ZOOM));
    pinchRef.current = null;
    panDragRef.current = null;
    setIsPanning(false);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleDownload = useCallback(() => {
    const imageName = images[selectedIndex];
    if (!imageName) return;

    const anchor = document.createElement("a");
    anchor.href = `/images/galeria/${imageName}`;
    anchor.download = imageName;
    anchor.rel = "noopener noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }, [images, selectedIndex]);

  const handleImageTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (event.touches.length === 2) {
        panDragRef.current = null;
        pinchRef.current = {
          distance: getTouchDistance(event.touches[0], event.touches[1]),
          scale: zoomScale,
        };
        event.stopPropagation();
        return;
      }

      if (isZoomed) {
        const touch = event.touches[0];
        panDragRef.current = {
          startX: touch.clientX,
          startY: touch.clientY,
          originX: pan.x,
          originY: pan.y,
        };
        event.stopPropagation();
      }
    },
    [isZoomed, pan.x, pan.y, zoomScale],
  );

  const handleImageTouchMove = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (event.touches.length === 2 && pinchRef.current) {
        event.preventDefault();
        event.stopPropagation();

        const distance = getTouchDistance(event.touches[0], event.touches[1]);
        const nextScale = clampZoom((distance / pinchRef.current.distance) * pinchRef.current.scale);
        setZoomScale(nextScale);
        return;
      }

      if (isZoomed && panDragRef.current && event.touches.length === 1) {
        event.preventDefault();
        event.stopPropagation();

        const touch = event.touches[0];
        const nextX = clampPan(panDragRef.current.originX + (touch.clientX - panDragRef.current.startX), zoomScale);
        const nextY = clampPan(panDragRef.current.originY + (touch.clientY - panDragRef.current.startY), zoomScale);
        setPan({ x: nextX, y: nextY });
        return;
      }

      if (isZoomed) {
        event.stopPropagation();
      }
    },
    [isZoomed, zoomScale],
  );

  const handleImageTouchEnd = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length < 2) {
      pinchRef.current = null;
    }

    if (event.touches.length === 0) {
      panDragRef.current = null;
    }
  }, []);

  const handleImagePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isZoomed || event.pointerType !== "mouse") return;

      event.preventDefault();
      panDragRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        originX: pan.x,
        originY: pan.y,
      };
      setIsPanning(true);
      event.currentTarget.setPointerCapture(event.pointerId);
      event.stopPropagation();
    },
    [isZoomed, pan.x, pan.y],
  );

  const handleImagePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isZoomed || event.pointerType !== "mouse" || !panDragRef.current) return;

      event.preventDefault();
      event.stopPropagation();

      const nextX = clampPan(panDragRef.current.originX + (event.clientX - panDragRef.current.startX), zoomScale);
      const nextY = clampPan(panDragRef.current.originY + (event.clientY - panDragRef.current.startY), zoomScale);
      setPan({ x: nextX, y: nextY });
    },
    [isZoomed, zoomScale],
  );

  const handleImagePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return;
      panDragRef.current = null;
      setIsPanning(false);
    },
    [],
  );

  const onSelect = useCallback(() => {
    if (!mainEmblaApi) return;
    const index = mainEmblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbEmblaApi?.scrollTo(index);
  }, [mainEmblaApi, thumbEmblaApi]);

  useEffect(() => {
    if (!mainEmblaApi) return;
    mainEmblaApi.on("select", onSelect);
    mainEmblaApi.on("reInit", onSelect);

    return () => {
      mainEmblaApi.off("select", onSelect);
      mainEmblaApi.off("reInit", onSelect);
    };
  }, [mainEmblaApi, onSelect]);

  useEffect(() => {
    if (!mainEmblaApi) return;
    mainEmblaApi.reInit({ ...MAIN_EMBLA_OPTIONS, watchDrag: !isZoomed });
  }, [isZoomed, mainEmblaApi]);

  useEffect(() => {
    if (!isOpen || !mainEmblaApi) return;
    mainEmblaApi.scrollTo(startIndex, true);
  }, [isOpen, mainEmblaApi, startIndex]);

  useEffect(() => {
    if (!isOpen) {
      resetZoom();
      return;
    }

    resetZoom();
  }, [isOpen, selectedIndex, resetZoom]);

  useEffect(() => {
    if (!isOpen || images.length === 0) return;

    const total = images.length;
    const nextIndex = (selectedIndex + 1) % total;
    const prevIndex = (selectedIndex - 1 + total) % total;
    const preloadIndices = [nextIndex, prevIndex];

    preloadIndices.forEach((index) => {
      const preload = new window.Image();
      preload.src = `/images/galeria/${images[index]}`;
    });
  }, [isOpen, selectedIndex, images]);

  function openAt(index: number) {
    setStartIndex(index);
    setSelectedIndex(index);
    resetZoom();
    setIsOpen(true);
  }

  function handleModalKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Galeria de Fotos</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <button
            key={img}
            className="focus:outline-none w-full gallery-item-enter"
            style={{ animationDelay: `${index * 70}ms` }}
            onClick={() => openAt(index)}
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

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

          <Dialog.Content
            onKeyDown={handleModalKeyDown}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 outline-none"
          >
            <Dialog.Title className="sr-only">Visualizador de fotos da galeria</Dialog.Title>
            <div className="w-full max-w-6xl">
              <div className="mb-3 flex items-center justify-between gap-3 text-white/90">
                <span className="text-sm font-medium md:text-base">
                  {selectedIndex + 1} de {images.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleZoom}
                    aria-label={isZoomed ? "Reduzir zoom" : "Ampliar imagem"}
                    className="rounded-full bg-black/45 p-2 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  >
                    {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    aria-label="Baixar imagem"
                    className="rounded-full bg-black/45 p-2 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <Dialog.Close
                    aria-label="Fechar imagem"
                    className="rounded-full bg-black/45 p-2 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  >
                    <X className="h-5 w-5" />
                  </Dialog.Close>
                </div>
              </div>

              <div className="relative">
                <button
                  type="button"
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:left-4"
                  onClick={scrollPrev}
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <div className="overflow-hidden rounded-xl" ref={mainEmblaRef}>
                  <div className={isZoomed ? "flex touch-none" : "flex touch-pan-y"}>
                    {images.map((img, index) => (
                      <div key={img} className="relative min-w-0 shrink-0 grow-0 basis-full px-1">
                        <div className="relative h-[66vh] overflow-hidden rounded-xl bg-transparent md:h-[72vh]">
                          <div
                            className={`absolute inset-0 ${index === selectedIndex && isZoomed ? "" : "transition-transform duration-200 ease-out"}`}
                            style={{
                              transform: `translate3d(${index === selectedIndex ? pan.x : 0}px, ${index === selectedIndex ? pan.y : 0}px, 0) scale(${index === selectedIndex ? zoomScale : 1})`,
                              transformOrigin: "center center",
                              touchAction: index === selectedIndex && isZoomed ? "none" : "pan-y",
                            }}
                            onPointerDown={index === selectedIndex ? handleImagePointerDown : undefined}
                            onPointerMove={index === selectedIndex ? handleImagePointerMove : undefined}
                            onPointerUp={index === selectedIndex ? handleImagePointerUp : undefined}
                            onPointerCancel={index === selectedIndex ? handleImagePointerUp : undefined}
                            onTouchStart={index === selectedIndex ? handleImageTouchStart : undefined}
                            onTouchMove={index === selectedIndex ? handleImageTouchMove : undefined}
                            onTouchEnd={index === selectedIndex ? handleImageTouchEnd : undefined}
                            onTouchCancel={index === selectedIndex ? handleImageTouchEnd : undefined}
                          >
                            <div className="relative h-full w-full">
                              <Image
                                src={`/images/galeria/${img}`}
                                alt={`Foto ampliada ${index + 1}`}
                                fill
                                priority={Math.abs(index - selectedIndex) <= 1}
                                sizes="100vw"
                                draggable={false}
                                className={`select-none object-contain ${index === selectedIndex && isZoomed ? (isPanning ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"}`}
                              />
                            </div>
                          </div>

                          {index === selectedIndex && showPinchHint ? (
                            <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-xs text-white/90 md:text-sm">
                              {isZoomed ? "Toque na lupa para voltar" : "Pinça para ampliar"}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:right-4"
                  onClick={scrollNext}
                  aria-label="Próxima foto"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-4 overflow-hidden" ref={thumbEmblaRef}>
                <div className="flex gap-2 px-1 pb-1">
                  {images.map((img, index) => (
                    <button
                      key={`${img}-thumb`}
                      type="button"
                      disabled={isZoomed}
                      onClick={() => mainEmblaApi?.scrollTo(index)}
                      aria-label={`Ir para foto ${index + 1}`}
                      aria-current={selectedIndex === index}
                      className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border transition md:h-20 md:w-28 ${
                        selectedIndex === index
                          ? "border-white ring-2 ring-white/80"
                          : "border-white/30 opacity-70 hover:opacity-100"
                      } ${isZoomed ? "cursor-not-allowed opacity-40" : ""}`}
                    >
                      <Image
                        src={`/images/galeria/${img}`}
                        alt={`Miniatura ${index + 1}`}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
