"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground/5 border-t py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">IBP</h3>
            <p className="text-muted-foreground">
              Igreja Batista do Pirangi - Uma comunidade de fé ao seu alcance
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#sobre" className="text-muted-foreground hover:foreground transition">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/#missao" className="text-muted-foreground hover:foreground transition">
                  Missão
                </Link>
              </li>
              <li>
                <Link href="/#contato" className="text-muted-foreground hover:foreground transition">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/historia" className="text-muted-foreground hover:foreground transition">
                  História
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <p className="text-muted-foreground text-sm mb-2">
              📞 (XX) XXXX-XXXX
            </p>
            <p className="text-muted-foreground text-sm">
              ✉️ contato@ibp.com.br
            </p>
          </div>
        </div>

        <div className="border-t pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Igreja Batista do Pirangi. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Desenvolvido com ❤️ para a comunidade
          </p>
        </div>
      </div>
    </footer>
  );
}
