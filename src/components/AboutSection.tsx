"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, BookOpen } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export default function AboutSection() {
  return (
    <section id="sobre" className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/igreja_aniv.jpeg"
          alt="Igreja Batista do Pirangi"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay semi-transparente */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Sobre Nossa Igreja
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Uma comunidade de fé dedicada a servir a Deus e aos nossos próximos
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          {/* Card esquerdo */}
          <ScrollReveal direction="left">
            <Card className="bg-white/95 backdrop-blur shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Nossa História</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Espaço vazio ou outro card */}
          <ScrollReveal direction="right">
            <Card className="bg-white/95 backdrop-blur shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Bem-vindo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  Você é bem-vindo em nossa comunidade. Somos uma família em Cristo, unida pelo amor e pela missão de compartilhar o Evangelho.
                </p>
                <p className="text-lg leading-relaxed">
                  Visite-nos e sinta o acolhimento que existe em nosso meio. Queremos conhecer você e compartilhar essa jornada de fé juntos.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        {/* Valores */}
        <div className="grid md:grid-cols-3 gap-6">
          <ScrollReveal direction="left" delay={0}>
            <Card className="bg-white/95 backdrop-blur shadow-xl">
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
            <Card className="bg-white/95 backdrop-blur shadow-xl">
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
            <Card className="bg-white/95 backdrop-blur shadow-xl">
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
