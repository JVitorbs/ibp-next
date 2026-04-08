"use client";

import Footer from "../../components/Footer";
import { ScrollReveal } from "../../components/ScrollReveal";
import { Carousel } from "./_components/Carousel";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: "foundation" | "milestone" | "reform" | "achievement";
  image?: string;
  images?: string[];
}

{/*{
      year: "1983",
      title: "Fundação da Igreja",
      description: "Início da Igreja Batista do Pirangi com um pequeno grupo de irmãos comprometidos com a fé e a missão de servir a comunidade.",
      type: "foundation",
      image: "/images/historia/fundacao-1983.jpg",
    },*/}

export default function Historia() {
  const events: TimelineEvent[] = [
    
    {
      year: "1990",
      title: "Crescimento e Consolidação",
      description: "Período de crescimento significativo, com a expansão dos ministérios e o fortalecimento da comunidade de fé.",
      type: "milestone",
      image: "/images/historia/inicio.png",
    },
    {
      year: "2011",
      title: "Início da Expansão",
      description: "Início da expansão da capela da comunidade de fé.",
      type: "milestone",
      image: "/images/historia/2011.png",
    },
    {
      year: "2013",
      title: "Reforma e Construção do Templo",
      description: "Grande reforma do templo com ampliação das instalações para acomodar o crescimento da igreja",
      type: "achievement",
      images: [
        "/images/historia/demolicao.jpg",
        "/images/historia/reconstrucao.jpg",
        "/images/historia/reconstrucao_2.jpg",
        "/images/historia/montagem.jpg",
        "/images/historia/montagem_2.jpg",

      ],
    },
    {
      year: "2013",
      title: "30 Anos de História",
      description: "Celebração de três décadas de ministério, testemunhando a fidelidade de Deus e o impacto na comunidade local.",
      type: "milestone",
      image: "/images/historia/desmontagem_templo.png",
    },
    {
      year: "2014",
      title: "Novo Templo",
      description: "Após a reforma, a igreja contou com um novo templo que melhorou a experiência dos membros.",
      type: "milestone",
      image: "/images/historia/2014.png",
    },
    {
      year: "2015",
      title: "Fachada da Igreja em 2015",
      description: "Registro da fachada em 2015, evidenciando a continuidade do processo de consolidação estrutural do templo.",
      type: "milestone",
      image: "/images/historia/2015.png",
    },
    {
      year: "2017",
      title: "Fachada da Igreja em 2017",
      description: "Imagem da frente da igreja em 2017, representando o cuidado permanente com o espaço de culto e comunhão.",
      type: "milestone",
      image: "/images/historia/2017.png",
    },
    {
      year: "2018",
      title: "Fachada da Igreja em 2018",
      description: "Registro da fachada em 2018, marcando mais uma etapa da caminhada da comunidade ao longo dos anos.",
      type: "milestone",
      image: "/images/historia/2018.png",
    },
    {
      year: "2019",
      title: "Fachada da Igreja em 2019",
      description: "Fotografia da frente da igreja em 2019, preservando a memória recente e a identidade visual do templo.",
      type: "milestone",
      image: "/images/historia/2019.png",
    },
    {
      year: "2020",
      title: "Modernização Digital",
      description: "Adaptação aos novos tempos com transmissões online.",
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
    {
      year: "2023",
      title: "Batismos",
      description: "Momento de batismos celebrando a fé e o compromisso dos novos membros.",
      type: "achievement",
      images: [
        "/images/historia/batismo_2023_1.png",
        "/images/historia/batismo_2023_2.jpg"
      ],
    },
    {
      year: "2024",
      title: "Melhorias na Estrutura",
      description: "Ao longo dos anos, a igreja continuou a evoluir e melhorar suas instalações.",
      type: "milestone",
      image: "/images/historia/2024.png",
    },
    {
      year: "2026",
      title: "Musical de Páscoa 2026",
      description: "Registros do musical de páscoa realizado em 2026, reunindo os momentos marcantes desse evento.",
      type: "milestone",
      images: [
        "/images/historia/IMG_5455.jpg",
        "/images/historia/IMG_5486.jpg",
        "/images/historia/IMG_5489.jpg",
        "/images/historia/IMG_5517.jpg",
        "/images/historia/IMG_5525.jpg",
        "/images/historia/IMG_5549.jpg",
        "/images/historia/IMG_5565.jpg",
        "/images/historia/IMG_5576.jpg",
        "/images/historia/IMG_5578.jpg",
        "/images/historia/IMG_5598.jpg",
        "/images/historia/IMG_5692.jpg",
        "/images/historia/IMG_5704.jpg",
        "/images/historia/IMG_5790.jpg",
        "/images/historia/IMG_5801.jpg",
        "/images/historia/IMG_5857.jpg",
        "/images/historia/IMG_5907.jpg",
        "/images/historia/IMG_5959.jpg",
        "/images/historia/IMG_5992.jpg",
        "/images/historia/IMG_6023.jpg",
        "/images/historia/IMG_6039.jpg",
        "/images/historia/IMG_6082.jpg",
        "/images/historia/IMG_6130.jpg",
        "/images/historia/IMG_6161.jpg",
        "/images/historia/IMG_6171.jpg",
        "/images/historia/IMG_6344.jpg",
      ],
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
      <main
        className="min-h-screen pt-6 px-4 pb-20 relative bg-primary/40"
        style={{
          backgroundImage: "url('/images/paper-texture.jpeg')",
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
          backgroundRepeat: "repeat"
        }}
      >
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="down">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
              Nossa História
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <p className="text-center text-white mb-12 text-lg">
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
                      className={`bg-card border border-primary overflow-hidden rounded-lg shadow-lg shadow-primary/30 shadow-b-2xl transform transition-all hover:scale-105 w-full max-w-md md:max-w-xl md:w-[420px] lg:w-[600px] xl:w-[600px]`}
                      style={{
                        alignSelf: index % 2 === 0 ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {/* Imagem ou Carrossel */}
                      {event.images && event.images.length > 0 ? (
                        <Carousel images={event.images} alt={event.title} fallbackBg={getEventColor(event.type)} fallbackIcon={getEventIcon(event.type)} />
                      ) : event.image ? (
                        <div className="relative h-72 overflow-hidden">
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
                                  <div class=\"w-full h-full bg-gradient-to-br ${getEventColor(event.type)} flex items-center justify-center\">
                                    <span class=\"text-6xl\">${getEventIcon(event.type)}</span>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>
                      ) : null}



                      {/* Conteúdo */}
                        <div className="p-6 bg-primary">
                          <h3 className="text-xl font-bold text-white mb-3">
                            {event.title}
                          </h3>
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
        </div>
      </main>
    </>
  );
}
