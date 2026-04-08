"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function GalleryClient({ images }: { images: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [mainEmblaRef, mainEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [thumbEmblaRef, thumbEmblaApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    mainEmblaApi?.scrollPrev();
  }, [mainEmblaApi]);

  const scrollNext = useCallback(() => {
    mainEmblaApi?.scrollNext();
  }, [mainEmblaApi]);

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
    if (!isOpen || !mainEmblaApi) return;
    mainEmblaApi.scrollTo(startIndex, true);
  }, [isOpen, mainEmblaApi, startIndex]);

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
              <div className="mb-3 flex items-center justify-between text-white/90">
                <span className="text-sm md:text-base font-medium">
                  {selectedIndex + 1} de {images.length}
                </span>
                <Dialog.Close
                  aria-label="Fechar imagem"
                  className="rounded-full bg-black/45 p-2 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  <X className="h-5 w-5" />
                </Dialog.Close>
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
                  <div className="flex touch-pan-y">
                    {images.map((img, index) => (
                      <div key={img} className="relative min-w-0 shrink-0 grow-0 basis-full px-1">
                        <div className="relative h-[66vh] md:h-[72vh]">
                          <Image
                            src={`/images/galeria/${img}`}
                            alt={`Foto ampliada ${index + 1}`}
                            fill
                            priority={Math.abs(index - selectedIndex) <= 1}
                            sizes="100vw"
                            className="rounded-xl object-contain"
                          />
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
                      onClick={() => mainEmblaApi?.scrollTo(index)}
                      aria-label={`Ir para foto ${index + 1}`}
                      aria-current={selectedIndex === index}
                      className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border transition md:h-20 md:w-28 ${
                        selectedIndex === index
                          ? "border-white ring-2 ring-white/80"
                          : "border-white/30 opacity-70 hover:opacity-100"
                      }`}
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
