"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, BookOpen } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export default function AboutSection() {
  return (
    <section id="sobre" className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Sobre Nossa Igreja
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma comunidade de fé dedicada a servir a Deus e aos nossos próximos
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          {/* Imagem Placeholder */}
          <ScrollReveal direction="left">
            <div className="flex justify-center">
              <Card className="w-full max-w-sm overflow-hidden shadow-lg">
                <div className="relative w-full h-auto bg-gradient-to-br from-foreground/10 to-foreground/5">
                  <Image
                    src="/igreja_aniv.jpeg"
                    alt="Foto da Igreja Batista do Pirangi"
                    width={500}
                    height={500}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </Card>
            </div>
          </ScrollReveal>

          {/* Texto */}
          <ScrollReveal direction="right">
            <div className="space-y-4">
              <p className="text-lg leading-relaxed">
                Somos uma comunidade de fé dedicada a servir a Deus e aos nossos
                próximos. Fundada em 1995, nossa igreja tem sido um lugar de
                adoração, comunhão e crescimento espiritual.
              </p>
              <p className="text-lg leading-relaxed">
                Acreditamos na mensagem do Evangelho e no poder transformador de
                Jesus Cristo. Aqui você encontrará um ambiente acolhedor onde
                possa encontrar esperança, paz e comunidade.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Valores */}
        <div className="grid md:grid-cols-3 gap-6">
          <ScrollReveal direction="left" delay={0}>
            <Card>
              <CardHeader>
                <Heart className="h-8 w-8 mb-2 text-red-500" />
                <CardTitle>Amor e Compaixão</CardTitle>
              </CardHeader>
              <CardContent>
                Dedicados ao amor e compaixão ao próximo, seguindo o exemplo de Jesus Cristo.
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 mb-2 text-blue-500" />
                <CardTitle>Fidelidade à Palavra</CardTitle>
              </CardHeader>
              <CardContent>
                Baseados em princípios bíblicos sólidos e na verdade da Palavra de Deus.
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={200}>
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 mb-2 text-green-500" />
                <CardTitle>Comunidade</CardTitle>
              </CardHeader>
              <CardContent>
                Cultivando relacionamentos profundos baseados em comunidade e fraternidade genuína.
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
