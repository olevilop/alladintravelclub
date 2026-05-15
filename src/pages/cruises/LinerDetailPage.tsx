import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSocial from "@/components/NewsletterSocial";
import SpecialOffers from "@/components/SpecialOffers";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getLinerBySlug, findLinerByShipName } from "@/data/liners";
import { tours } from "@/data/tours";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const LinerDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const liner = getLinerBySlug(slug);
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
          <span className="text-xs uppercase tracking-[0.3em] text-primary/90 mb-3">
            Премиальный флот
          </span>
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
          { label: "Круизы", href: "/expedition-cruises" },
          { label: "Лайнеры", href: "/cruises/liners" },
          { label: liner.name },
        ]}
      />

      {/* Specs */}
      {liner.specs && liner.specs.length > 0 && (
        <section className="container mx-auto px-6 md:px-10 pt-6 md:pt-10">
          <div className="bg-card border border-border/60 p-6 md:p-10">
            <h2 className="font-serif text-2xl md:text-3xl mb-6 md:mb-8">
              Технические характеристики
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {liner.specs.map((s) => (
                <div key={s.label}>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {s.label}
                  </div>
                  <div className="font-serif text-xl md:text-2xl text-foreground">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Long description */}
      {liner.longDescription && liner.longDescription.length > 0 && (
        <section className="container mx-auto px-6 md:px-10 py-12 md:py-20">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 md:mb-8">О судне</h2>
          <div className="md:columns-2 md:gap-10 space-y-5 text-muted-foreground leading-relaxed">
            {liner.longDescription.map((p, i) => (
              <p key={i} className="break-inside-avoid">
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Cabins */}
      {liner.cabins && liner.cabins.length > 0 && (
        <section className="bg-muted/30 border-y border-border/50">
          <div className="container mx-auto px-6 md:px-10 py-12 md:py-20">
            <h2 className="font-serif text-3xl md:text-4xl mb-8 md:mb-10">
              Варианты кают
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div>
        </section>
      )}

      {/* Deck plan */}
      {liner.deckPlanImage && (
        <section className="container mx-auto px-6 md:px-10 py-12 md:py-20">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 md:mb-8">План палуб</h2>
          <div className="border border-border/60 bg-card overflow-hidden">
            <img
              src={liner.deckPlanImage}
              alt={`План палуб ${liner.name}`}
              loading="lazy"
              className="w-full h-auto object-contain bg-background"
            />
          </div>
        </section>
      )}

      {/* Tours on this liner */}
      {linerTours.length > 0 && (
        <section className="bg-muted/30 border-y border-border/50">
          <div className="container mx-auto px-6 md:px-10 py-12 md:py-20">
            <h2 className="font-serif text-3xl md:text-4xl mb-8 md:mb-10">
              Круизы на этом лайнере
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        </section>
      )}

      {/* Gallery */}
      {liner.gallery && liner.gallery.length > 0 && (
        <section className="container mx-auto px-6 md:px-10 py-12 md:py-20">
          <h2 className="font-serif text-3xl md:text-4xl mb-8 md:mb-10">Галерея</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {liner.gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightbox(src)}
                className="group relative aspect-[4/3] overflow-hidden bg-muted border border-border/40"
              >
                <img
                  src={src}
                  alt={`${liner.name} — фото ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
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
