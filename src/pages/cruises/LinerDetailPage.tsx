import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Moon, MapPin, Ship, Banknote, Globe, X, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSocial from "@/components/NewsletterSocial";
import SpecialOffers from "@/components/SpecialOffers";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getLinerBySlug, findLinerByShipName, type Liner } from "@/data/liners";
import { tours } from "@/data/tours";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const LinerPhotoCarousel = ({
  images,
  alt,
  onOpen,
}: {
  images: string[];
  alt: string;
  onOpen: (src: string) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const check = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [check, images]);

  const scroll = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(":scope > button")?.offsetWidth ?? 300;
    el.scrollBy({ left: dir * (card + 16), behavior: "smooth" });
  };

  return (
    <div className="relative">
      {canLeft && (
        <button
          onClick={() => scroll(-1)}
          aria-label="Назад"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 flex items-center justify-center bg-background/90 border border-border rounded-full shadow-lg hover:bg-primary/10 hover:border-primary transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
      )}
      {canRight && (
        <button
          onClick={() => scroll(1)}
          aria-label="Вперёд"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 flex items-center justify-center bg-background/90 border border-border rounded-full shadow-lg hover:bg-primary/10 hover:border-primary transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      )}
      <div
        ref={scrollRef}
        className="liner-photo-carousel flex gap-4 overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        <style>{`.liner-photo-carousel::-webkit-scrollbar { display: none; }`}</style>
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onOpen(src)}
            className="snap-start flex-shrink-0 w-[calc(100%-0px)] sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] group relative aspect-[4/3] overflow-hidden bg-muted border border-border/40"
          >
            <img
              src={src}
              alt={`${alt} — фото ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const LinerDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const liner: Liner | undefined = getLinerBySlug(slug);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!liner) return <Navigate to="/cruises/liners" replace />;

  const linerTours = tours.filter(
    (t) =>
      (t.category === "classic" || t.category === "expedition") &&
      findLinerByShipName(t.shipName)?.slug === liner.slug,
  );

  const tabs: { value: string; label: string; show: boolean }[] = [
    { value: "about", label: "О судне", show: !!liner.longDescription?.length },
    { value: "cabins", label: "Каюты", show: !!liner.cabins?.length },
    { value: "deck", label: "План палуб", show: !!liner.deckPlanImage },
    { value: "tours", label: "Круизы", show: linerTours.length > 0 },
  ].filter((t) => t.show);

  const defaultTab = tabs[0]?.value ?? "about";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden bg-muted">
        <img
          src={liner.image}
          alt={liner.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-end items-start pb-12 md:pb-20 container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-6xl font-light text-white max-w-3xl">
            {liner.name}
          </h1>
          <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl">
            {liner.shortDescription}
          </p>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: "Лайнеры", href: "/cruises/liners" },
          { label: liner.name },
        ]}
      />

      {/* Two-column layout */}
      {tabs.length > 0 && (
        <section className="container mx-auto px-6 md:px-10 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: tabs */}
            <div className="lg:col-span-8 order-2 lg:order-1 min-w-0">
              <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="bg-transparent p-0 h-auto rounded-none border-b border-border w-full justify-start gap-2 flex-wrap">
                  {tabs.map((t) => (
                    <TabsTrigger
                      key={t.value}
                      value={t.value}
                      className="rounded-none bg-transparent px-4 py-3 text-sm uppercase tracking-[0.18em] text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
                    >
                      {t.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {liner.longDescription?.length ? (
                  <TabsContent value="about" className="mt-8">
                    <div className="md:columns-2 md:gap-10 space-y-5 text-muted-foreground leading-relaxed">
                      {liner.longDescription.map((p, i) => (
                        <p key={i} className="break-inside-avoid">
                          {p}
                        </p>
                      ))}
                    </div>
                  </TabsContent>
                ) : null}

                {liner.cabins?.length ? (
                  <TabsContent value="cabins" className="mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {liner.cabins.map((c) => (
                        <div
                          key={c.name}
                          className="bg-card border border-border/60 overflow-hidden flex flex-col"
                        >
                          {c.image && (
                            <div className="aspect-[4/3] overflow-hidden bg-muted">
                              <img
                                src={c.image}
                                alt={c.name}
                                loading="lazy"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="p-5 flex flex-col flex-1">
                            <h3 className="font-serif text-xl text-foreground">{c.name}</h3>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                              {c.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ) : null}

                {liner.deckPlanImage ? (
                  <TabsContent value="deck" className="mt-8">
                    <div className="border border-border/60 bg-card overflow-hidden">
                      <img
                        src={liner.deckPlanImage}
                        alt={`План палуб ${liner.name}`}
                        loading="lazy"
                        className="w-full h-auto object-contain bg-background"
                      />
                    </div>
                  </TabsContent>
                ) : null}

                {linerTours.length > 0 ? (
                  <TabsContent value="tours" className="mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {linerTours.map((t) => (
                        <Link
                          key={t.id}
                          to={`/tour/${t.id}`}
                          className="group bg-card border border-border/60 overflow-hidden hover:border-primary/40 transition-colors duration-500 flex flex-col"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <img
                              src={t.image}
                              alt={t.name}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <h3 className="font-serif text-xl text-foreground leading-snug line-clamp-2">
                              {t.name}
                            </h3>
                            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              {t.days && (
                                <span className="inline-flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {t.days} дней
                                </span>
                              )}
                              {t.region && (
                                <span className="inline-flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {t.region}
                                </span>
                              )}
                            </div>
                            <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                              {t.price && (
                                <span className="font-serif text-lg text-foreground">
                                  {t.price}
                                </span>
                              )}
                              <span className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                                Подробнее
                                <ArrowRight className="w-4 h-4" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>
                ) : null}
              </Tabs>
            </div>

            {/* Right: specs */}
            {liner.specs && liner.specs.length > 0 && (
              <aside className="lg:col-span-4 order-1 lg:order-2">
                <div className="lg:sticky lg:top-24 bg-card border border-border/60 p-6 md:p-8">
                  <h2 className="font-serif text-xl md:text-2xl mb-6">
                    Технические характеристики
                  </h2>
                  <dl className="space-y-4">
                    {liner.specs.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-baseline justify-between gap-4 pb-3 border-b border-border/50 last:border-0 last:pb-0"
                      >
                        <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                          {s.label}
                        </dt>
                        <dd className="font-serif text-base md:text-lg text-foreground text-right">
                          {s.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </aside>
            )}
          </div>
        </section>
      )}

      {/* Photo carousel */}
      {liner.gallery && liner.gallery.length > 0 && (
        <section className="container mx-auto px-6 md:px-10 pb-12 md:pb-20">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 md:mb-8">Галерея</h2>
          <LinerPhotoCarousel
            images={liner.gallery}
            alt={liner.name}
            onOpen={setLightbox}
          />
        </section>
      )}

      <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-5xl bg-background border-border p-0 overflow-hidden">
          {lightbox && (
            <div className="relative">
              <img src={lightbox} alt={liner.name} className="w-full h-auto object-contain" />
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 bg-background/80 hover:bg-background border border-border p-2 rounded-full"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <SpecialOffers />
      <NewsletterSocial />
      <Footer />
    </div>
  );
};

export default LinerDetailPage;
