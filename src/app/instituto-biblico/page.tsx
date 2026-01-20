import { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Instituto Bíblico - IBP",
  description: "Escola Bíblica Dominical da Igreja Batista do Planalto",
};

export default function InstitutoBiblicoPage() {
  return (
    <main className="min-h-screen">
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Instituto Bíblico
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Escola Bíblica Dominical - Aprendendo e crescendo na Palavra de Deus
          </p>

          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-semibold mb-4">Sobre o Instituto Bíblico</h2>
              <p className="text-muted-foreground">
                O Instituto Bíblico (Escola Bíblica Dominical) é um tempo dedicado ao 
                estudo sistemático da Bíblia, onde toda a igreja se reúne para aprender 
                sobre a Palavra de Deus, crescer em conhecimento e aplicar os ensinamentos 
                bíblicos ao cotidiano.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-semibold mb-4">Horário e Local</h2>
              <div className="text-muted-foreground space-y-2">
                <p><strong>Quando:</strong> Todos os domingos</p>
                <p><strong>Horário:</strong> 9h00</p>
                <p><strong>Local:</strong> Igreja Batista do Pirangi</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-semibold mb-4">Classes Disponíveis</h2>
              <div className="text-muted-foreground space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Crianças</h3>
                  <p>Ensino bíblico adaptado para cada faixa etária, com atividades lúdicas e educativas.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Novos membros</h3>
                  <p>Estudo relevante para os interessados em se tornar membros da igreja.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Jovens</h3>
                  <p>Estudo aprofundado das Escrituras com aplicações práticas para a juventude.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Geral</h3>
                  <p>Estudo aprofundado das Escrituras com aplicações práticas para a vida.</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-semibold mb-4">Seja Bem-Vindo!</h2>
              <p className="text-muted-foreground mb-4">
                Você não precisa ser membro da igreja para participar. Todos são bem-vindos 
                para aprender mais sobre a Bíblia em um ambiente acolhedor e amigável.
              </p>
              <a 
                href="/#contato" 
                className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Mais Informações
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
