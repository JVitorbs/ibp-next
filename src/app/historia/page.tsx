"use client";

import Footer from "../../components/Footer";
import { ScrollReveal } from "../../components/ScrollReveal";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: "foundation" | "milestone" | "reform" | "achievement";
  image?: string;
}

export default function Historia() {
  const events: TimelineEvent[] = [
    {
      year: "1983",
      title: "Fundação da Igreja",
      description: "Início da Igreja Batista do Planalto com um pequeno grupo de irmãos comprometidos com a fé e a missão de servir a comunidade.",
      type: "foundation",
      image: "/images/historia/fundacao-1983.jpg",
    },
    {
      year: "1990",
      title: "Primeira Sede Própria",
      description: "Aquisição do primeiro terreno e construção do templo, marco importante de crescimento e consolidação da congregação.",
      type: "milestone",
      image: "/images/historia/sede-1990.jpg",
    },
    {
      year: "1995",
      title: "Instituto Bíblico",
      description: "Implementação formal da Escola Bíblica Dominical, estruturando o ensino sistemático da Palavra de Deus para todas as idades.",
      type: "achievement",
      image: "/images/historia/instituto-1995.jpg",
    },
    {
      year: "2005",
      title: "Reforma e Ampliação",
      description: "Grande reforma do templo com ampliação das instalações para acomodar o crescimento da igreja e novos ministérios.",
      type: "reform",
      image: "/images/historia/reforma-2005.jpg",
    },
    {
      year: "2010",
      title: "Ministério de Pequenos Grupos",
      description: "Início oficial dos Pequenos Grupos, fortalecendo a comunhão e o cuidado pastoral através de células nas casas.",
      type: "achievement",
      image: "/images/historia/pequenos-grupos-2010.jpg",
    },
    {
      year: "2013",
      title: "30 Anos de História",
      description: "Celebração de três décadas de ministério, testemunhando a fidelidade de Deus e o impacto na comunidade local.",
      type: "milestone",
      image: "/images/historia/30anos-2013.jpg",
    },
    {
      year: "2020",
      title: "Modernização Digital",
      description: "Adaptação aos novos tempos com transmissões online, site moderno e fortalecimento da presença digital da igreja.",
      type: "reform",
      image: "/images/historia/cultos_pandemia.png",
    },
    {
      year: "2023",
      title: "40 Anos de Fé",
      description: "Comemorando quatro décadas de história, com uma comunidade vibrante e comprometida em fazer a diferença.",
      type: "milestone",
      image: "/images/historia/40anos-2023.png",
    },
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case "foundation":
        return "from-blue-500 to-blue-600";
      case "milestone":
        return "from-purple-500 to-purple-600";
      case "reform":
        return "from-green-500 to-green-600";
      case "achievement":
        return "from-orange-500 to-orange-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "foundation":
        return "🏛️";
      case "milestone":
        return "⭐";
      case "reform":
        return "🔨";
      case "achievement":
        return "🎯";
      default:
        return "📅";
    }
  };

  return (
    <>
      <main className="min-h-screen pt-6 px-4 pb-20 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="down">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
              Nossa História
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Marcos importantes que moldaram nossa jornada de fé
            </p>
          </ScrollReveal>

          {/* Linha do Tempo */}
          <div className="relative">
            {/* Linha vertical */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border"></div>

            {/* Eventos */}
            <div className="space-y-12">
              {events.map((event, index) => (
                <ScrollReveal
                  key={index}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={100 * (index % 3)}
                >
                  <div
                    className={`relative flex items-start ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                  {/* Ponto na linha */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>

                  {/* Conteúdo do evento */}
                  <div
                    className={`ml-8 md:ml-0 flex flex-col items-start md:items-stretch md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-4 md:items-end" : "md:pl-4 md:items-start"
                    }`}
                  >
                    {/* Ano */}
                    <div
                      className="inline-block px-4 py-1 rounded-full bg-primary text-primary-foreground font-bold text-sm mb-3 md:mb-4"
                      style={{
                        alignSelf: index % 2 === 0 ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {event.year}
                    </div>

                    {/* Card do evento */}
                    <div
                      className={`bg-card border overflow-hidden rounded-lg shadow-lg transform transition-all hover:scale-105 w-full max-w-md md:max-w-xl md:w-[420px] lg:w-[600px] xl:w-[600px]`}
                      style={{
                        alignSelf: index % 2 === 0 ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {/* Imagem */}
                      {event.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback se a imagem não carregar
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-full h-full bg-gradient-to-br ${getEventColor(
                                    event.type
                                  )} flex items-center justify-center">
                                    <span class="text-6xl">${getEventIcon(event.type)}</span>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>
                      )}

                      {/* Conteúdo */}
                      <div className={`p-6 bg-gradient-to-br ${getEventColor(
                        event.type
                      )}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl">{getEventIcon(event.type)}</span>
                          <h3 className="text-xl font-bold flex-1 text-white">
                            {event.title}
                          </h3>
                        </div>
                        <p className="text-white/90 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Legenda */}
          <ScrollReveal direction="up" delay={200}>
            <div className="mt-16 p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Legenda</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏛️</span>
                  <span className="text-sm text-muted-foreground">Fundação</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="text-sm text-muted-foreground">Marco</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔨</span>
                  <span className="text-sm text-muted-foreground">Reforma</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  <span className="text-sm text-muted-foreground">Conquista</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
