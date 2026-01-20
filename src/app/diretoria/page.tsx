import Footer from "@/components/Footer";

interface Diretor {
  role: string;
  name: string;
  description?: string;
  contact?: string;
  image?: string;
}

const diretoria: Diretor[] = [
  {
    role: "Presidente (Pastor Titular)",
    name: "Pr. Nome do Pastor",
    description: "Liderança geral, visão espiritual e ensino bíblico da igreja.",
    image: "/images/diretoria/presidente.jpg",
  },
  {
    role: "1º Vice-Presidente",
    name: "Pr. Nome do 1º Vice",
    description: "Apoia a presidência e substitui o presidente quando necessário.",
    image: "/images/diretoria/vice1.jpg",
  },
  {
    role: "2º Vice-Presidente",
    name: "Pr. Nome do 2º Vice",
    description: "Auxilia na coordenação dos ministérios e projetos estratégicos.",
    image: "/images/diretoria/vice2.jpg",
  },
  {
    role: "1º Secretário",
    name: "Nome do 1º Secretário",
    description: "Registra atas, comunicados oficiais e acompanha a agenda institucional.",
    image: "/images/diretoria/secretario1.jpg",
  },
  {
    role: "2º Secretário",
    name: "Nome do 2º Secretário",
    description: "Suporte administrativo, documentação e correspondências.",
    image: "/images/diretoria/secretario2.jpg",
  },
  {
    role: "Tesoureiro",
    name: "Nome do Tesoureiro",
    description: "Administra finanças, presta contas e zela pela transparência.",
    image: "/images/diretoria/tesoureiro.jpg",
  },
  {
    role: "Ministério de Louvor",
    name: "Responsável: Nome",
    description: "Coordena a equipe de louvor e a programação musical.",
    image: "/images/diretoria/louvor.jpg",
  },
  {
    role: "Ministério de Educação Cristã",
    name: "Responsável: Nome",
    description: "Supervisiona EBD, discipulado e formações.",
    image: "/images/diretoria/educacao.jpg",
  },
  {
    role: "Ministério de Ação Social",
    name: "Responsável: Nome",
    description: "Conduz projetos sociais e apoio à comunidade.",
    image: "/images/diretoria/acao-social.jpg",
  },
  {
    role: "Ministério de Comunicação",
    name: "Responsável: Nome",
    description: "Comunicação interna, mídias sociais e avisos oficiais.",
    image: "/images/diretoria/comunicacao.jpg",
  },
  {
    role: "Ministério de Jovens",
    name: "Responsável: Nome",
    description: "Acompanha e discipula a juventude, eventos e retiros.",
    image: "/images/diretoria/jovens.jpg",
  },
  {
    role: "Ministério Infantil",
    name: "Responsável: Nome",
    description: "Cuida das crianças, ensino bíblico e segurança nos cultos.",
    image: "/images/diretoria/infantil.jpg",
  },
];

const getInitials = (name: string) => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (!parts.length) return "";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
};

export default function DiretoriaPage() {
  return (
    <main className="min-h-screen">
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Diretoria
            </h1>
            <p className="text-lg text-muted-foreground">
              Conheça a liderança que serve e conduz a Igreja Batista do Planalto.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {diretoria.map((pessoa) => (
              <div
                key={pessoa.role}
                className="bg-card border rounded-lg p-6 shadow-sm flex gap-4 items-start"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center text-primary font-bold text-xl shrink-0">
                  {pessoa.image ? (
                    <img
                      src={pessoa.image}
                      alt={pessoa.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{getInitials(pessoa.name)}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-foreground">{pessoa.role}</h2>
                  <p className="text-primary font-medium">{pessoa.name}</p>
                  {pessoa.description && (
                    <p className="text-muted-foreground leading-relaxed">
                      {pessoa.description}
                    </p>
                  )}
                  {pessoa.contact && (
                    <p className="text-sm text-muted-foreground">Contato: {pessoa.contact}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="/#contato"
              className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              Falar com a diretoria
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
