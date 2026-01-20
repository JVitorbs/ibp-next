"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contato" className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Informações de Contato
          </h2>
          <p className="text-lg text-muted-foreground">
            Estamos aqui para acolhê-lo
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Informações */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <MapPin className="h-6 w-6 mb-2" />
                <CardTitle>Endereço</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">Rua Umbelino Coelho, 140</p>
                <p className="text-muted-foreground">Natal, RN - CEP: 59088-310</p>
              </CardContent>
            </Card>

            <Card>
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
          </div>

          {/* Horários */}
          <Card className="h-fit">
            <CardHeader>
              <Clock className="h-6 w-6 mb-2" />
              <CardTitle>Programações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-b pb-4">
                <p className="font-semibold text-lg">Domingo</p>
                <p className="text-muted-foreground">9:00 - Instituto Bíblico</p>
              </div>
              <div className="border-b pb-4">
                <p className="font-semibold text-lg">Domingo</p>
                <p className="text-muted-foreground">18:00 - Culto Domingo</p>
              </div>
              <Button className="w-full mt-4 h-12 text-base">
                Nos Visite
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
