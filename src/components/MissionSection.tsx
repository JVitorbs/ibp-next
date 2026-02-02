"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Handshake, Zap } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export default function MissionSection() {
  return (
    <section id="missao" className="py-16 md:py-24 px-4 bg-primary/30">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nossa Missão
            </h2>
            <p className="text-lg text-muted-foreground">
              Guiados por propósito e visão compartilhada
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up">
          <Card className="mb-12 border-2 bg-white/75 shadow-xl">
            <CardContent className="pt-8">
              <p className="text-2xl md:text-3xl font-semibold text-center leading-relaxed">
                "Alcançar pessoas e ajudá-las a terem um relacionamento crescente com Cristo"
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          <ScrollReveal direction="left" delay={0}>
            <Card className="bg-white/75 shadow-xl">
              <CardHeader>
                <Eye className="h-8 w-8 mb-2" />
                <CardTitle>Nossa Visão</CardTitle>
              </CardHeader>
              <CardContent>
                Ser uma igreja Bíblica, Integral e Relevante que impacta positivamente a sociedade e transforma comunidades através do Evangelho.
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <Card className="bg-white/75 shadow-xl">
              <CardHeader>
                <Handshake className="h-8 w-8 mb-2" />
                <CardTitle>Comunidade</CardTitle>
              </CardHeader>
              <CardContent>
                Cultivar relacionamentos profundos baseados no amor de Cristo, onde cada pessoa se sente acolhida e valorizada.
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={200}>
            <Card className="bg-white/75 shadow-xl">
              <CardHeader>
                <Zap className="h-8 w-8 mb-2" />
                <CardTitle>Adoração</CardTitle>
              </CardHeader>
              <CardContent>
                Louvar a Deus com sinceridade em espírito e verdade, celebrando sua glória e poder transformador em nossas vidas.
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
