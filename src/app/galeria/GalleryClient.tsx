"use client";
import { useState } from "react";
import Image from "next/image";

export default function GalleryClient({ images }: { images: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Galeria de Fotos</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <button
            key={img}
            className="focus:outline-none"
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
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            <Image
              src={`/images/galeria/${selected}`}
              alt="Foto ampliada"
              width={1200}
              height={900}
              className="rounded shadow-lg object-contain max-h-[90vh] max-w-[90vw]"
              priority
            />
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-80"
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
