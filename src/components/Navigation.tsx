"use client";

import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-foreground/10 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl text-foreground">
          IBP
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-1">
          <Link href="/#sobre">
            <Button variant="ghost">Sobre</Button>
          </Link>
          <Link href="/#missao">
            <Button variant="ghost">Missão</Button>
          </Link>
          <Link href="/pg">
            <Button variant="ghost">PG</Button>
          </Link>
          <Link href="/instituto-biblico">
            <Button variant="ghost">Instituto Bíblico</Button>
          </Link>
          <Link href="/#contato">
            <Button variant="ghost">Contato</Button>
          </Link>
          <Link href="/historia">
            <Button variant="ghost">História</Button>
          </Link>
        </div>

        {/* Menu Mobile */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/#sobre">
                <Button variant="ghost" className="w-full justify-start">
                  Sobre
                </Button>
              </Link>
              <Link href="/#missao">
                <Button variant="ghost" className="w-full justify-start">
                  Missão
                </Button>
              </Link>
              <Link href="/pg">
                <Button variant="ghost" className="w-full justify-start">
                  PG
                </Button>
              </Link>
              <Link href="/instituto-biblico">
                <Button variant="ghost" className="w-full justify-start">
                  Instituto Bíblico
                </Button>
              </Link>
              <Link href="/#contato">
                <Button variant="ghost" className="w-full justify-start">
                  Contato
                </Button>
              </Link>
              <Link href="/historia">
                <Button variant="ghost" className="w-full justify-start">
                  História
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
