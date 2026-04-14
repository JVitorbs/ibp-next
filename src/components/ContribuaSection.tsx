"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Banknote, Building2, Check, Copy, Mail, QrCode } from "lucide-react";
import { useState } from "react";

type ContributionItem = {
  title: string;
  icon: React.ReactNode;
  copyValue: string;
  note: string;
};

const contributions: ContributionItem[] = [
  {
    title: "Dízimos e Ofertas Gerais",
    icon: <Banknote className="h-6 w-6" />,
    copyValue: "41007436000190",
    note: "Use esta chave para ofertas e dízimos gerais da igreja.",
  },
  {
    title: "Missões",
    icon: <Mail className="h-6 w-6" />,
    copyValue: "missoesibprn@gmail.com",
    note: "Destino separado para contribuições missionárias.",
  },
  {
    title: "Reforma",
    icon: <Building2 className="h-6 w-6" />,
    copyValue: "somosibp@gmail.com",
    note: "Contribuições voltadas para a reforma e manutenção da igreja.",
  },
];

export default function ContribuaSection() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (value: string, title: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(title);
      window.setTimeout(() => setCopiedKey(null), 1600);
    } catch {
      setCopiedKey(null);
    }
  };

  return (
    <section id="contribua" className="py-16 md:py-24 px-4 bg-linear-to-b from-primary/10 via-background to-primary/5">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Dízimos, missões e reforma
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Contribua com a obra, 
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-3">
          {contributions.map((item, index) => (
            <ScrollReveal key={item.title} direction={index % 2 === 0 ? "left" : "right"} delay={120 * index}>
              <Card className="h-full overflow-hidden border-primary/15 bg-white/85 shadow-xl backdrop-blur-sm">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-foreground">{item.title}</CardTitle>
                      <CardDescription>{item.note}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4 overflow-hidden">
                    <p className="mb-3 text-sm font-medium text-muted-foreground">
                      Chave PIX
                    </p>
                    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-primary/10 bg-background/80 px-4 py-3">
                      <span className="min-w-0 flex-1 truncate text-sm md:text-base font-semibold text-foreground" title={item.copyValue}>
                        {item.copyValue}
                      </span>
                      <Button
                        type="button"
                        onClick={() => handleCopy(item.copyValue, item.title)}
                        variant="secondary"
                        className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium shadow-sm transition-colors"
                      >
                        {copiedKey === item.title ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Copiar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-dashed border-primary/20 bg-background/80 p-4 text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <QrCode className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">QR code reservado</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Assim que a imagem chegar, ela entra aqui.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}