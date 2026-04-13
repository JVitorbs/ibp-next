"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, PlayCircle } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

type VideoInput = {
  url: string;
  description: string;
};

type YoutubeMeta = {
  title?: string;
  author_name?: string;
};

const videos: VideoInput[] = [
  {
    url: "https://www.youtube.com/watch?v=A3__ZbP5lsA",
    description: "Musical de Páscoa - A jornada da Redenção - em 2026.",
  },
  {
    url: "https://www.youtube.com/watch?v=uwHY_HIMDEE&t=486s",
    description: "Aniversário de 42 anos da IBP em 2025.",
  },
  {
    url: "https://www.youtube.com/watch?v=14Tx2mBRAHQ&t=4s",
    description: "Homenagem do dia das mães em 2025.",
  },
  {
    url: "https://www.youtube.com/watch?v=iTBgsPNE8xY",
    description: "Trilha com a juventude START em 2025.",
  },
  {
    url: "https://www.youtube.com/watch?v=BnSAfIu8fds",
    description: "Episódio 1 da Série dos 40 anos da IBP.",
  },
  {
    url: "https://www.youtube.com/watch?v=CAcG4scb08E&t=73s",
    description: "Episódio 2 da Série dos 40 anos da IBP.",
  },
  {
    url: "https://www.youtube.com/watch?v=vpNE93Qew8A&t=197s",
    description: "Episódio 3 da Série dos 40 anos da IBP.",
  },
  {
    url: "https://www.youtube.com/watch?v=cq2egr63TGs",
    description: "Episódio 4 da Série dos 40 anos da IBP.",
  },
  {
    url: "https://www.youtube.com/watch?v=Ip1GMZ4uWdE&t=7s",
    description: "Episódio 5 da Série dos 40 anos da IBP.",
  },
  {
    url: "https://www.youtube.com/watch?v=W9dm2ND9ep0&t=2587s",
    description: "Musical de Páscoa - A jornada da Redenção - em 2024.",
  },
];

function getYoutubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "").trim();
      return id || null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const queryId = parsed.searchParams.get("v");
      if (queryId) return queryId;

      const shortsMatch = parsed.pathname.match(/\/shorts\/([^/]+)/);
      if (shortsMatch?.[1]) return shortsMatch[1];

      const embedMatch = parsed.pathname.match(/\/embed\/([^/]+)/);
      if (embedMatch?.[1]) return embedMatch[1];
    }
  } catch {
    return null;
  }

  return null;
}

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const isAdjustingRef = useRef(false);
  const currentTrackIndexRef = useRef(0);
  const [metaById, setMetaById] = useState<Record<string, YoutubeMeta>>({});
  const [trackIndex, setTrackIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const parsedVideos = useMemo(() => {
    return videos
      .map((video) => {
        const id = getYoutubeVideoId(video.url);
        if (!id) return null;

        return {
          ...video,
          id,
          thumb: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        };
      })
      .filter((video): video is NonNullable<typeof video> => Boolean(video));
  }, []);

  const carouselVideos = useMemo(() => {
    if (parsedVideos.length <= 1) return parsedVideos;
    return [...parsedVideos, ...parsedVideos];
  }, [parsedVideos]);

  const loopSize = parsedVideos.length;
  const maxTrackIndex = carouselVideos.length - 1;

  const getSafeLoopIndex = () => {
    if (parsedVideos.length <= 1) return 0;
    return Math.max(0, Math.min(currentTrackIndexRef.current, maxTrackIndex));
  };

  const normalizeToFirstLoop = (index: number) => {
    if (parsedVideos.length <= 1) return 0;
    return index >= loopSize ? index - loopSize : index;
  };

  const goToNextTrack = () => {
    if (parsedVideos.length <= 1) {
      scrollToTrackIndex(0);
      return;
    }

    const current = normalizeToFirstLoop(getSafeLoopIndex());
    scrollToTrackIndex(current + 1);
  };

  const goToPrevTrack = () => {
    if (parsedVideos.length <= 1) {
      scrollToTrackIndex(0);
      return;
    }

    let current = normalizeToFirstLoop(getSafeLoopIndex());

    if (current === 0) {
      scrollToTrackIndex(loopSize, false);
      current = loopSize;
    }

    scrollToTrackIndex(current - 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadMeta = async () => {
      const entries = await Promise.all(
        parsedVideos.map(async (video) => {
          try {
            const response = await fetch(
              `https://www.youtube.com/oembed?url=${encodeURIComponent(video.url)}&format=json`
            );

            if (!response.ok) {
              return [video.id, {}] as const;
            }

            const data = (await response.json()) as YoutubeMeta;
            return [video.id, data] as const;
          } catch {
            return [video.id, {}] as const;
          }
        })
      );

      if (!isCancelled) {
        setMetaById(Object.fromEntries(entries));
      }
    };

    void loadMeta();

    return () => {
      isCancelled = true;
    };
  }, [parsedVideos]);

  const scrollToTrackIndex = (index: number, smooth = true) => {
    if (!carouselVideos.length) return;

    const maxIndex = carouselVideos.length - 1;
    const normalized = Math.max(0, Math.min(index, maxIndex));
    const target = cardRefs.current[normalized];
    const scroller = scrollerRef.current;

    if (!target || !scroller) return;

    scroller.scrollTo({
      left: target.offsetLeft,
      behavior: smooth ? "smooth" : "auto",
    });

    setTrackIndex(normalized);
  };

  useEffect(() => {
    currentTrackIndexRef.current = trackIndex;
  }, [trackIndex]);

  useEffect(() => {
    if (parsedVideos.length <= 1) {
      scrollToTrackIndex(0, false);
      return;
    }

    let attempts = 0;

    const setInitialPosition = () => {
      const scroller = scrollerRef.current;

      if (scroller) {
        scroller.scrollTo({ left: 0, behavior: "auto" });
        requestAnimationFrame(() => {
          scroller.scrollTo({ left: 0, behavior: "auto" });
        });
        setTrackIndex(0);
        currentTrackIndexRef.current = 0;
        return;
      }

      if (attempts < 12) {
        attempts += 1;
        requestAnimationFrame(setInitialPosition);
      }
    };

    requestAnimationFrame(setInitialPosition);
  }, [parsedVideos.length]);

  useEffect(() => {
    if (!isVisible || isPaused || parsedVideos.length <= 1) return;

    const interval = setInterval(() => {
      goToNextTrack();
    }, 4500);

    return () => clearInterval(interval);
  }, [isVisible, isPaused, parsedVideos.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        if (isAdjustingRef.current) return;

        const currentLeft = scroller.scrollLeft;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          const distance = Math.abs(card.offsetLeft - currentLeft);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        currentTrackIndexRef.current = closestIndex;
        setTrackIndex(closestIndex);

        if (parsedVideos.length > 1 && closestIndex >= loopSize) {
          isAdjustingRef.current = true;

          const correctedTrackIndex = closestIndex - loopSize;
          currentTrackIndexRef.current = correctedTrackIndex;
          scrollToTrackIndex(correctedTrackIndex, false);

          requestAnimationFrame(() => {
            isAdjustingRef.current = false;
          });
        }

      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loopSize, parsedVideos.length]);

  const pauseTemporarily = () => {
    setIsPaused(true);

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), 2800);
  };

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  if (!parsedVideos.length) return null;

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="py-16 md:py-24 px-4 bg-[radial-gradient(circle_at_top,#f1dfbe,transparent_60%),linear-gradient(180deg,rgba(130,90,30,0.2),rgba(255,255,255,0.95))]"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs tracking-[0.22em] uppercase text-primary/80 mb-2">Canal SomosIBP</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">Videos Em Destaque</h2>
            <p className="text-lg text-muted-foreground">
              Confira também nosso canal no YouTube para conhecer mais da nossa comunidade.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex justify-end gap-2 mb-4">
          <button
            type="button"
            aria-label="Video anterior"
            className="h-10 w-10 rounded-full border border-primary/30 bg-white/80 hover:bg-white"
            onClick={() => {
              pauseTemporarily();
              goToPrevTrack();
            }}
          >
            <ChevronLeft className="h-5 w-5 mx-auto" />
          </button>
          <button
            type="button"
            aria-label="Proximo video"
            className="h-10 w-10 rounded-full border border-primary/30 bg-white/80 hover:bg-white"
            onClick={() => {
              pauseTemporarily();
              goToNextTrack();
            }}
          >
            <ChevronRight className="h-5 w-5 mx-auto" />
          </button>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={pauseTemporarily}
        >
          {carouselVideos.map((video, index) => {
            const meta = metaById[video.id];
            const title = meta?.title ?? "Video no YouTube";

            return (
              <a
                key={`${video.id}-${index}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                href={video.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group min-w-[84%] sm:min-w-[60%] lg:min-w-[36%] snap-start rounded-2xl overflow-hidden border border-primary/20 bg-white/85 shadow-lg shadow-primary/10 hover:shadow-xl transition-all"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumb}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                    <PlayCircle className="h-6 w-6" />
                    <span className="text-sm font-medium">Assistir no YouTube</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg leading-snug mb-2 line-clamp-2">{title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{video.description}</p>
                  <p className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                    Abrir video
                    <ExternalLink className="h-4 w-4" />
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
