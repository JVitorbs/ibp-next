"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiInstagram } from "react-icons/si";

export default function ContactSection() {
  return (
    <section id="contato" className="py-16 md:py-24 px-4 bg-primary/10">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Informações de Contato
            </h2>
            <p className="text-lg text-muted-foreground">
              Estamos aqui para acolhê-lo
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Informações */}
          <div className="space-y-6">
            <ScrollReveal direction="left" delay={200}>
              <Card className="bg-white/75 shadow-xl">
                <CardHeader>
                  <MapPin className="h-6 w-6 mb-2" />
                  <CardTitle>Endereço</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="https://www.google.com/maps/place/Rua+Umbelino+Coelho,+140" className="text-lg hover:underline" target="_blank" rel="noopener noreferrer">
                    Rua Umbelino Coelho, 140
                  </a>
                  <p className="text-muted-foreground">Natal, RN - CEP: 59088-310</p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={400}>
              <Card className="bg-white/75 shadow-xl">
                <CardHeader>
                  <Mail className="h-6 w-6 mb-2" />
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="mailto:somosibp@gmail.com" className="text-lg hover:underline">
                    somosibp@gmail.com
                  </a>
                </CardContent>
              </Card>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={400}>
              <Card className="bg-white/75 shadow-xl">
                <CardHeader>
                  <SiInstagram className="h-6 w-6 mb-2" />
                  <CardTitle>Instagram</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="https://www.instagram.com/somosibp" className="text-lg hover:underline" target="_blank" rel="noopener noreferrer">
                    @somosibp
                  </a>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Horários */}
          <ScrollReveal direction="right" delay={200}>
            <Card className="h-fit bg-white/75 shadow-xl">
              <CardHeader>
                <Clock className="h-6 w-6 mb-2" />
                <CardTitle>Programações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-b pb-4">
                  <p className="font-semibold text-lg">Quartas, Quintas e Sextas</p>
                  <p className="text-muted-foreground">Pequenos Grupos de Discipulados</p>
                </div>
                <div className="border-b pb-4">
                  <p className="font-semibold text-lg">Sábado</p>
                  <p className="text-muted-foreground">6:00 - Oração Matutina</p>
                </div>
                <div className="border-b pb-4">
                  <p className="font-semibold text-lg">Domingo</p>
                  <p className="text-muted-foreground">9:00 - Instituto Bíblico</p>
                </div>
                <div className="border-b pb-4">
                  <p className="font-semibold text-lg">Domingo</p>
                  <p className="text-muted-foreground">18:00 - Culto Domingo</p>
                </div>
                <Button className="w-full mt-4 h-12 text-base">
                  <a
                    href="https://share.google/FkjcJEuBwCKcCdaeJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full h-full"
                  >
                    Nos Visite
                  </a>
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
