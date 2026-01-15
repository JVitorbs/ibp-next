"use client";

import { useState } from "react";
import Footer from "../../components/Footer";

interface GalleryImage {
  id: number;
  title: string;
  description: string;
}

export default function Galeria() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Mock de imagens - você pode substituir com imagens reais
  const images: GalleryImage[] = [
    {
      id: 1,
      title: "Culto de Domingo",
      description: "Momento de adoração em família",
    },
    {
      id: 2,
      title: "Batismo",
      description: "Celebração de novos irmãos",
    },
    {
      id: 3,
      title: "Encontro em Comunidade",
      description: "Momentos de fraternidade",
    },
    {
      id: 4,
      title: "Voluntariado",
      description: "Servindo a comunidade",
    },
    {
      id: 5,
      title: "Estudo Bíblico",
      description: "Crescimento espiritual",
    },
    {
      id: 6,
      title: "Evento Especial",
      description: "Celebração comunitária",
    },
  ];

  return (
    <>
      <main className="min-h-screen pt-6 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-600">
            Galeria de Fotos
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Conheça os momentos especiais da nossa comunidade
          </p>

          {/* Grid de Fotos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image.id)}
                className="cursor-pointer group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all"
              >
                {/* Imagem Placeholder */}
                <div className="w-full h-48 md:h-56 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center group-hover:opacity-75 transition-opacity">
                  <div className="text-center text-white px-4">
                    <div className="text-4xl mb-2">📷</div>
                    <p className="text-sm md:text-base font-semibold">
                      {image.title}
                    </p>
                  </div>
                </div>

                {/* Overlay com Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all">
                    Ver Foto
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal de Visualização */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="bg-white rounded-lg max-w-2xl w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Imagem Modal */}
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-96 flex items-center justify-center rounded-t-lg">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">📷</div>
                    <p className="text-2xl font-semibold">
                      {images.find((img) => img.id === selectedImage)?.title}
                    </p>
                  </div>
                </div>

                {/* Informações */}
                <div className="p-6">
                  <p className="text-gray-700 text-center mb-6">
                    {images.find((img) => img.id === selectedImage)?.description}
                  </p>

                  {/* Botão Fechar */}
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
