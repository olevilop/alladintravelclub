import { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTours } from "@/lib/useTours";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSocial from "@/components/NewsletterSocial";
import SpecialOffers from "@/components/SpecialOffers";
import SimilarTours from "@/components/SimilarTours";
import { Moon, MapPin, Ship, Banknote, Globe } from "lucide-react";
import type { Tour } from "@/data/tours";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getSpecialOfferLabel } from "@/config/specialOfferTags";

interface CategoryToursPageProps {
  tours: Tour[];
  title: React.ReactNode;
  subtitle: string;
  backLink?: string;
  breadcrumbLabel: string;
  breadcrumbParent?: { label: string; href: string };
  category?: string;
  source?: string;
  hideSpecialOfferTag?: boolean;
  fallbackHeroImage?: string;
}

const CategoryToursPage = ({ tours, title, subtitle, breadcrumbLabel, breadcrumbParent, category, source, hideSpecialOfferTag, fallbackHeroImage }: CategoryToursPageProps) => {
  // Берём программы из базы (чтобы фото/данные совпадали с главной и менялись из админки),
  // иначе — статический список из кода (фолбэк).
  const { data: apiAll, isError } = useTours();
  const loading = !apiAll && !isError;
  const list: Tour[] = useMemo(() => {
    const all: any[] = apiAll || [];
    let derived: any[] | null = null;
    if (source) derived = all.filter((t) => t.source === source);
    else if (category) derived = all.filter((t) => t.category === category);
    if (derived && derived.length) return derived;
    // пока грузится — пусто (не мигаем старыми фото); если база недоступна — фолбэк на код
    return isError ? tours : [];
  }, [apiAll, source, category, tours, isError]);

  // Стабильно берём первый тур раздела (без случайности) — иначе шапка «мигает» при обновлении данных
  const heroTour = list[0];
  const heroImage = heroTour?.image ?? fallbackHeroImage;
  const heroAlt = heroTour?.name ?? breadcrumbLabel;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className={`relative h-[75vh] overflow-hidden bg-muted ${loading ? "animate-pulse" : ""}`}>
        {heroImage && (
          <img
            src={heroImage}
            alt={heroAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        <div className="relative z-10 h-full flex flex-col justify-end items-start pb-12 md:pb-20 container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-6xl font-light text-white">
            {title}
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl">
            {subtitle}
          </p>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbParent ? [breadcrumbParent, { label: breadcrumbLabel }] : [{ label: breadcrumbLabel }]} />

      {/* Tour cards */}
      <section className="container mx-auto px-10 md:px-16 lg:px-24 py-12 md:py-20 space-y-6">
        {loading ? [0, 1, 2, 3].map((i) => <div key={i} className="h-[220px] rounded-lg bg-muted animate-pulse" />) : list.map((tour) => (
          <Link
            key={tour.id}
            to={`/tour/${tour.id}`}
            className="block bg-card overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-[300px] md:min-h-[220px] flex-shrink-0 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">

                <h2 className="text-xl md:text-2xl font-bold text-foreground uppercase tracking-wide">
                  {tour.name}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {tour.description}
                </p>
              </div>
              <div className="hidden md:flex items-center">
                <div className="w-px h-2/3 bg-border" />
              </div>
              <div className="md:w-[240px] flex-shrink-0 p-6 md:p-8 flex flex-col justify-center space-y-3">
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <Globe className="w-4 h-4 text-primary shrink-0" />
                  <span>{tour.continent || tour.region}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <Moon className="w-4 h-4 text-primary shrink-0" />
                  <span>{tour.days} дней / {tour.days - 1} ночей</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{tour.subRegion || tour.region}</span>
                </div>
                {tour.shipName && (
                  <div className="flex items-center gap-3 text-sm text-foreground/80">
                    <Ship className="w-4 h-4 text-primary shrink-0" />
                    <span>{tour.shipName}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <Banknote className="w-4 h-4 text-primary shrink-0" />
                  <span>{tour.price}</span>
                </div>
                {!hideSpecialOfferTag && getSpecialOfferLabel(tour.specialOfferTag) && (
                  <div className="pt-3 mt-1 border-t border-primary/20 text-[11px] uppercase tracking-[0.25em] text-primary text-center">
                    {getSpecialOfferLabel(tour.specialOfferTag)}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </section>

      {category && (
        <SimilarTours currentTour={{ id: "", region: "", category }} />
      )}
      <SpecialOffers />
      <NewsletterSocial />
      <Footer />
    </div>
  );
};

export default CategoryToursPage;
