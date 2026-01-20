import { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pequenos Grupos - IBP",
  description: "Pequenos Grupos da Igreja Batista do Planalto",
};

export default function PGPage() {
  return (
    <main className="min-h-screen">
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Pequenos Grupos
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Os Pequenos Grupos são o coração da nossa comunhão e crescimento espiritual.
          </p>

          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-semibold mb-4">O que são Pequenos Grupos?</h2>
              <p className="text-muted-foreground">
                Os Pequenos Grupos (PGs) são encontros semanais em casas ou na igreja, 
                onde membros e amigos se reúnem para compartilhar a vida, estudar a Palavra 
                de Deus, orar uns pelos outros e edificar relacionamentos significativos.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-semibold mb-4">Benefícios</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Comunhão genuína e amizades profundas</li>
                <li>Crescimento espiritual através do estudo bíblico</li>
                <li>Apoio mútuo nas dificuldades da vida</li>
                <li>Oportunidade de servir e usar seus dons</li>
                <li>Ambiente acolhedor para convidar amigos</li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-semibold mb-4">Como Participar</h2>
              <p className="text-muted-foreground mb-4">
                Temos diversos grupos que se reúnem em diferentes dias e horários. 
                Entre em contato conosco para encontrar o grupo ideal para você e sua família.
              </p>
              <a 
                href="/#contato" 
                className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Entre em Contato
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
