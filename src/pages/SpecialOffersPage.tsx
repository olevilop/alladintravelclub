import { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSocial from "@/components/NewsletterSocial";
import { Moon, MapPin, Ship, Banknote } from "lucide-react";
import { tours, japanTours, koreaTours, chinaTours, northKoreaTours, russiaTours, eventTours } from "@/data/tours";
import { getSpecialOfferLabel } from "@/config/specialOfferTags";
import { useTours } from "@/lib/useTours";

const SpecialOffersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: apiTours } = useTours();
  const allTours = useMemo(() => {
    const all = (apiTours && apiTours.length)
      ? apiTours
      : [...tours, ...japanTours, ...koreaTours, ...chinaTours, ...northKoreaTours, ...russiaTours, ...eventTours];
    return all.filter((t: any) => t.specialOfferTag);
  }, [apiTours]);

  // стабильно (без случайности) — чтобы шапка не «прыгала» при обновлении
  const heroTour = allTours.length > 0 ? allTours[0] : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {heroTour && (
        <section className="relative h-[75vh] overflow-hidden">
          <img
            src={heroTour.image}
            alt={heroTour.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-20">
            <h1 className="font-serif text-4xl md:text-6xl font-light text-white">
              Спец<span className="italic">предложения</span>
            </h1>
            <p className="mt-4 text-white/70 text-lg max-w-xl">
              Лучшие туры по специальным ценам
            </p>
          </div>
        </section>
      )}

      <Breadcrumbs items={[{ label: "Спецпредложения" }]} />

      {/* Tour cards */}
      <section className="container mx-auto px-10 md:px-16 lg:px-24 py-12 md:py-20 space-y-6">
        {/* Мальдивы карточка удалена — на странице только туры с specialOfferTag */}

        {allTours.map((tour) => (
          <Link
            key={tour.id}
            to={`/tour/${tour.id}`}
            className="block bg-card overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-[300px] md:min-h-[220px] flex-shrink-0 overflow-hidden">
                <img
                  src={(tour as any).imageOffer || tour.image}
                  alt={tour.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-bold text-foreground uppercase tracking-wide">
                  {tour.name}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {tour.description}
                </p>
              </div>

              {/* Vertical divider */}
              <div className="hidden md:flex items-center">
                <div className="w-px h-2/3 bg-border" />
              </div>

              {/* Price / Duration */}
              <div className="md:w-[240px] flex-shrink-0 p-6 md:p-8 flex flex-col justify-center space-y-3">
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <Moon className="w-4 h-4 text-primary shrink-0" />
                  <span>{tour.days} дней / {tour.days - 1} ночей</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{tour.region}</span>
                </div>
                {tour.shipName && (
                  <div className="flex items-center gap-3 text-sm text-foreground/80">
                    <Ship className="w-4 h-4 text-primary shrink-0" />
                    <span>{tour.shipName}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <Banknote className="w-4 h-4 text-primary shrink-0" />
                  <span>от {tour.price}</span>
                </div>
                {getSpecialOfferLabel(tour.specialOfferTag) && (
                  <div className="pt-3 mt-1 border-t border-primary/20 text-[11px] uppercase tracking-[0.25em] text-primary text-center">
                    {getSpecialOfferLabel(tour.specialOfferTag)}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </section>

      <NewsletterSocial />
      <Footer />
    </div>
  );
};

export default SpecialOffersPage;
