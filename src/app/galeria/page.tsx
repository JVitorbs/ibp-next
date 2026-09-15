// Este arquivo é um Server Component por padrão. Vamos buscar as imagens no lado do servidor e renderizar um Client Component para a galeria.
import GalleryClient from "./GalleryClient";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Galeria de Fotos - IBP",
  description: "Veja fotos da comunidade e dos momentos marcantes da Igreja Batista do Pirangi.",
};

export default function GaleriaPage() {
  const imagesDir = path.join(process.cwd(), "public", "images", "galeria");
  let files: string[] = [];
  try {
    files = fs.readdirSync(imagesDir).filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file));
  } catch {
    files = [];
  }
  return <GalleryClient images={files} />;
}
