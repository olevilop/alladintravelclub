import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSocial from "@/components/NewsletterSocial";
import SpecialOffers from "@/components/SpecialOffers";
import Breadcrumbs from "@/components/Breadcrumbs";
import { liners } from "@/data/liners";
import { tours } from "@/data/tours";
import { findLinerByShipName } from "@/data/liners";
import linersHero from "@/assets/liners-hero.jpg";

const LinersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Build the set of slugs that actually appear in cruise tours (classic/expedition).
  const usedSlugs = new Set<string>();
  for (const t of tours) {
    if (t.category !== "classic" && t.category !== "expedition") continue;
    const liner = findLinerByShipName(t.shipName);
    if (liner) usedSlugs.add(liner.slug);
  }

  const visibleLiners = liners
    .filter((l) => usedSlugs.has(l.slug))
    .sort((a, b) => a.name.localeCompare(b.name, "ru"));



  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[75vh] overflow-hidden bg-muted">
        <img
          src={linersHero}
          alt="Круизные лайнеры Alladin Travel Club"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        <div className="relative z-10 h-full flex flex-col justify-end items-start pb-12 md:pb-20 container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-6xl font-light text-white">
            Круизные <span className="italic">Лайнеры</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl">
            Премиальный флот для экспедиций и классических круизов — от арктических дискавери-яхт до речных судов Меконга.
          </p>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Круизы" }, { label: "Лайнеры" }]} />

      {/* Liner cards grid */}
      <section className="container mx-auto px-6 md:px-10 py-12 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleLiners.map((liner) => (
            <Link
              key={liner.slug}
              to={firstTourFor(liner.slug)}
              className="group bg-card border border-border/50 overflow-hidden hover:border-primary/40 transition-colors duration-500 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={liner.image}
                  alt={liner.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="font-serif text-2xl text-foreground leading-snug">
                  {liner.name}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {liner.shortDescription}
                </p>
                <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Премиальный флот
                  </span>
                  <span className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                    Подробнее
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SpecialOffers />
      <NewsletterSocial />
      <Footer />
    </div>
  );
};

export default LinersPage;
