"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Image
                src="/logos_Ibp/logo_redonda.png"
                alt="Logo Igreja Batista do Pirangi"
                width={30}
                height={30}
                className="drop-shadow-lg"
              />
              IBP
              </h3>
            <p className="text-muted-foreground">
              Igreja Batista do Pirangi - Bíblica, Integral e Relevante
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:foreground transition">Início</Link>
              </li>
              <li>
                <Link href="/#sobre" className="text-muted-foreground hover:foreground transition">Sobre</Link>
              </li>
              <li>
                <Link href="/#missao" className="text-muted-foreground hover:foreground transition">Missão</Link>
              </li>
              <li>
                <Link href="/pg" className="text-muted-foreground hover:foreground transition">Pequenos Grupos</Link>
              </li>
              <li>
                <Link href="/instituto-biblico" className="text-muted-foreground hover:foreground transition">Instituto Bíblico</Link>
              </li>
              <li>
                <Link href="/diretoria" className="text-muted-foreground hover:foreground transition">Diretoria</Link>
              </li>
              <li>
                <Link href="/galeria" className="text-muted-foreground hover:foreground transition">Galeria</Link>
              </li>
              <li>
                <Link href="/historia" className="text-muted-foreground hover:foreground transition">História</Link>
              </li>
              <li>
                <Link href="/#contato" className="text-muted-foreground hover:foreground transition">Contato</Link>
              </li>
              <li>
                <Link href="/calendario" className="text-muted-foreground hover:foreground transition">Calendário</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <p className="text-muted-foreground text-sm">
              ✉️ somosibp@gmail.com
            </p>
          </div>
        </div>

        <div className="border-t pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Igreja Batista do Pirangi. Bíblica, Integral e Relevante.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Desenvolvido com amor para a comunidade
          </p>
        </div>
      </div>
    </footer>
  );
}
