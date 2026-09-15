"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  const handleMenuClick = () => setOpen(false);
  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);

    if (window.location.pathname !== "/") return;

    event.preventDefault();
    window.history.pushState(null, "", "/#contato");
    requestAnimationFrame(() => {
      document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
    });
  };
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-foreground/10 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl text-foreground flex items-center gap-2">
          <Image
            src="/logos_Ibp/logo_redonda.png"
            alt="Logo Igreja Batista do Pirangi"
            width={40}
            height={40}
            className="drop-shadow-lg"
          />
          IBP
        </Link>

        {/* Menu Desktop */}
        <div className="hidden lg:flex gap-1">
          {/*<Link href="/#sobre"><Button variant="ghost">Sobre</Button></Link>*/}
          {/*<Link href="/#missao"><Button variant="ghost">Missão</Button></Link>*/}
          <Button variant="ghost" asChild><Link href="/historia">História</Link></Button>
          <Button variant="ghost" asChild><Link href="/diretoria">Diretoria</Link></Button>
          <Button variant="ghost" asChild><Link href="/instituto-biblico">Instituto Bíblico</Link></Button>
          <Button variant="ghost" asChild><Link href="/pg">Pequenos Grupos</Link></Button>
          <Button variant="ghost" asChild><Link href="/galeria">Galeria</Link></Button>
          <Button variant="ghost" asChild><Link href="/#contato" onClick={handleContactClick}>Contato</Link></Button>
          <Button variant="ghost" asChild><Link href="/calendario">Calendário</Link></Button>
        </div>

        {/* Menu Mobile */}
        {isClient && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Abrir menu de navegação">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {/*<Link href="/#sobre"><Button variant="ghost" className="w-full justify-start">Sobre</Button></Link>*/}
                {/*<Link href="/#missao"><Button variant="ghost" className="w-full justify-start">Missão</Button></Link>*/}
                <Button variant="ghost" className="w-full justify-start" asChild><Link href="/historia" onClick={handleMenuClick}>História</Link></Button>
                <Button variant="ghost" className="w-full justify-start" asChild><Link href="/diretoria" onClick={handleMenuClick}>Diretoria</Link></Button>
                <Button variant="ghost" className="w-full justify-start" asChild><Link href="/instituto-biblico" onClick={handleMenuClick}>Instituto Bíblico</Link></Button>
                <Button variant="ghost" className="w-full justify-start" asChild><Link href="/pg" onClick={handleMenuClick}>Pequenos Grupos</Link></Button>
                <Button variant="ghost" className="w-full justify-start" asChild><Link href="/galeria" onClick={handleMenuClick}>Galeria</Link></Button>
                <Button variant="ghost" className="w-full justify-start" asChild><Link href="/#contato" onClick={handleContactClick}>Contato</Link></Button>
                <Button variant="ghost" className="w-full justify-start" asChild><Link href="/calendario" onClick={handleMenuClick}>Calendário</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </nav>
  );
}
