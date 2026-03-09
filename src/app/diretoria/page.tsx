import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { readdir } from "node:fs/promises";
import path from "node:path";

interface Diretor {
  role: string;
  name: string;
  description?: string;
  contact?: string;
  image?: string;
  category: "presidente" | "vice" | "adminsitrativo" | "ministerios";
}

const diretoria: Diretor[] = [
  {
    role: "Presidente (Pastor Titular)",
    name: "Pr. Diego Sousa",
    description: "Liderança geral, visão espiritual e ensino bíblico da igreja.",
    image: "/images/diretoria/presidente.jpg",
    category: "presidente",
  },
  {
    role: "1º Vice-Presidente",
    name: "Ana Lúcia",
    description: "Apoia a presidência e substitui o presidente quando necessário.",
    image: "/images/diretoria/vice1.jpg",
    category: "vice",
  },
  {
    role: "2º Vice-Presidente",
    name: "Jair de Souza",
    description: "Auxilia na coordenação dos ministérios e projetos estratégicos.",
    image: "/images/diretoria/vice2.png",
    category: "vice",
  },
  {
    role: "Diretoria Administrativa",
    name: "Aparecida Lima",
    description: "Registra atas, comunicados oficiais e acompanha a agenda institucional.",
    image: "/images/diretoria/adm1.jpg",
    category: "adminsitrativo",
  },
  {
    role: "Diretoria Administrativa",
    name: "Samá Silva",
    description: "Suporte administrativo, documentação e correspondências.",
    image: "/images/diretoria/adm2.jpg",
    category: "adminsitrativo",
  },
  {
    role: "Diretoria Administrativa",
    name: "Marcílio Dias",
    description: "Administra finanças, presta contas e zela pela transparência.",
    image: "/images/diretoria/adm3.jpg",
    category: "adminsitrativo",
  },
  {
    role: "Diretoria Administrativa",
    name: "Mateus Oliveira",
    description: "Administra finanças, presta contas e zela pela transparência.",
    image: "/images/diretoria/adm4.jpg",
    category: "adminsitrativo",
  },
  {
    role: "Ministério de Ação Social",
    name: "Responsável: Ana Lúcia",
    description: "Conduz projetos sociais e apoio à comunidade.",
    image: "/images/diretoria/vice1.jpg",
    category: "ministerios",
  },
  {
    role: "Ministério de Comunicação",
    name: "Responsável: Débora Dias",
    description: "Comunicação interna, mídias sociais e avisos oficiais.",
    image: "/images/diretoria/comunicacao.jpg",
    category: "ministerios",
  },
  {
    role: "Ministério de Jovens",
    name: "Responsável: João Vitor",
    description: "Acompanha e discipula a juventude, eventos e retiros.",
    image: "/images/diretoria/jovens.jpg",
    category: "ministerios",
  },
  {
    role: "Ministério Infantil",
    name: "Responsável: Filomena",
    description: "Cuida das crianças, ensino bíblico e segurança nos cultos.",
    image: "/images/diretoria/infantil.jpg",
    category: "ministerios",
  },
  {
    role: "Ministério de Recepção",
    name: "Responsável: Flávio e Aparecida",
    description: "Cuida da recepção, acolhimento e orientação aos visitantes.",
    image: "/images/diretoria/recepcao.jpg",
    category: "ministerios",
  },
  {
    role: "Conselho Missionário",
    name: "Responsável: Aparecida",
    description: "Responsável por coordenar e mobilizar as atividades missionárias da igreja.",
    image: "/images/diretoria/adm1.jpg",
    category: "ministerios",
  },
  {
    role: "Ministério de Casais",
    name: "Responsável: Pr. Diego Sousa e Ana Paula",
    description: "Acompanha e orienta os casais, promovendo encontros e atividades.",
    image: "/images/diretoria/casais.jpg",
    category: "ministerios",
  },
  {
    role: "Ministério de Intercessão",
    name: "Responsável: Mary",
    description: "Responsável por coordenar as atividades de intercessão e oração da igreja.",
    image: "/images/diretoria/intercessao.jpg",
    category: "ministerios",
  },
  {
    role: "Ministério de Visitação",
    name: "Responsável: Ana Lúcia",
    description: "Cuida da visitação, acolhimento e orientação aos membros e visitantes.",
    image: "/images/diretoria/vice1.jpg",
    category: "ministerios",
  },
  {
    role: "Ministério de Patrimônio",
    name: "Responsável: Jair de Souza",
    description: "Cuida da manutenção e preservação do patrimônio da igreja.",
    image: "/images/diretoria/vice2.png",
    category: "ministerios",
  },
];

const getInitials = (name: string) => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (!parts.length) return "";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
};

export default async function DiretoriaPage() {
  const diretoriaPath = path.join(process.cwd(), "public", "images", "diretoria");
  const arquivosDiretoria = await readdir(diretoriaPath);
  const imagensDisponiveis = new Set(arquivosDiretoria.map((arquivo) => arquivo.toLowerCase()));

  const temFoto = (pessoa: Diretor) => {
    const imagem = pessoa.image?.trim();
    if (!imagem) return false;

    const nomeArquivo = path.basename(imagem).toLowerCase();
    return imagensDisponiveis.has(nomeArquivo);
  };

  const diretoriaComFoto = diretoria.filter(temFoto);

  const presidente = diretoriaComFoto.filter((p) => p.category === "presidente");
  const vicepresidentes = diretoriaComFoto.filter((p) => p.category === "vice");
  const administrativo = diretoriaComFoto.filter((p) => p.category === "adminsitrativo");
  const ministerios = diretoriaComFoto.filter((p) => p.category === "ministerios");

  const hasPresidente = presidente.length > 0;
  const hasVicepresidentes = vicepresidentes.length > 0;
  const hasAdministrativo = administrativo.length > 0;
  const hasMinisterios = ministerios.length > 0;

  const getMemberKey = (pessoa: Diretor) => `${pessoa.role}-${pessoa.name}`;

  const CardMember = ({ pessoa }: { pessoa: Diretor }) => (
    <div className="flex flex-col items-center px-2 py-2 md:px-4 md:py-4">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-muted flex items-center justify-center text-primary font-bold text-2xl md:text-3xl shadow-lg border-4 border-primary/20 mb-3 md:mb-4">
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
      <h3 className="text-center font-semibold text-foreground text-base md:text-lg mb-1">{pessoa.role}</h3>
      <p className="text-center text-primary text-sm md:text-base">{pessoa.name}</p>
    </div>
  );

  return (
    <main
      className="min-h-screen pt-6 px-4 pb-20 relative bg-primary/40"
      style={{
        backgroundImage: "url('/images/paper-texture.jpeg')",
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
        backgroundRepeat: "repeat"
      }}
    >
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="down">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Diretoria
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <p className="text-lg text-white">
                Conheça a liderança que serve e conduz a Igreja Batista do Pirangi.
              </p>
            </ScrollReveal>
          </div>

          {/* Organograma em Cascata */}
          <div className="space-y-12">
            {/* Presidente */}
            {hasPresidente && (
              <ScrollReveal direction="down" delay={100}>
                <div className="flex justify-center">
                  <div className="relative">
                    {presidente.map((pessoa) => (
                      <CardMember key={getMemberKey(pessoa)} pessoa={pessoa} />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Linha conectora */}
            {hasPresidente && hasVicepresidentes && (
              <div className="flex justify-center">
                <div className="w-1 h-8 bg-primary/30"></div>
              </div>
            )}

            {/* Vice-Presidentes */}
            {hasVicepresidentes && (
              <ScrollReveal direction="left" delay={200}>
                <div className="relative">
                  {vicepresidentes.length > 1 && (
                    <div className="flex justify-center mb-8">
                      <div className="w-32 h-1 bg-primary/30"></div>
                    </div>
                  )}
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 max-w-2xl mx-auto">
                    {vicepresidentes.map((pessoa, idx) => (
                      <ScrollReveal
                        key={getMemberKey(pessoa)}
                        direction={idx === 0 ? "left" : "right"}
                        delay={250 + idx * 100}
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-1 h-6 bg-primary/30 mb-2"></div>
                          <CardMember pessoa={pessoa} />
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Linha conectora */}
            {hasVicepresidentes && hasAdministrativo && (
              <div className="flex justify-center">
                <div className="w-1 h-8 bg-primary/30"></div>
              </div>
            )}

            {/* Administrativo */}
            {hasAdministrativo && (
              <ScrollReveal direction="up" delay={300}>
                <div className="relative">
                  {administrativo.length > 1 && (
                    <div className="flex justify-center mb-8">
                      <div className="w-48 h-1 bg-primary/30"></div>
                    </div>
                  )}
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-8 max-w-4xl mx-auto">
                    {administrativo.map((pessoa, idx) => (
                      <ScrollReveal
                        key={getMemberKey(pessoa)}
                        direction="up"
                        delay={350 + idx * 100}
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-1 h-6 bg-primary/30 mb-2"></div>
                          <CardMember pessoa={pessoa} />
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Linha conectora */}
            {hasAdministrativo && hasMinisterios && (
              <div className="flex justify-center">
                <div className="w-1 h-8 bg-primary/30"></div>
              </div>
            )}

            {/* Líderes de Ministérios */}
            {hasMinisterios && (
              <ScrollReveal direction="up" delay={400}>
                <div className="relative">
                  {ministerios.length > 1 && (
                    <div className="flex justify-center mb-8">
                      <div className="w-full max-w-5xl h-1 bg-primary/30"></div>
                    </div>
                  )}
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-8 max-w-5xl mx-auto">
                    {ministerios.map((pessoa, idx) => (
                      <ScrollReveal
                        key={getMemberKey(pessoa)}
                        direction={idx % 2 === 0 ? "left" : "right"}
                        delay={450 + (idx % 4) * 100}
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-1 h-6 bg-primary/30 mb-2"></div>
                          <CardMember pessoa={pessoa} />
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          <div className="mt-16 text-center">
            <ScrollReveal direction="up" delay={500}>
              <a
                href="/#contato"
                className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Falar com a diretoria
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
