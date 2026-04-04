import { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSocial from "@/components/NewsletterSocial";
import { Moon, MapPin, Ship, Banknote } from "lucide-react";
import { tours, japanTours, koreaTours, chinaTours, northKoreaTours, russiaTours } from "@/data/tours";

const SpecialOffersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allTours = useMemo(
    () => [...tours, ...japanTours, ...koreaTours, ...chinaTours, ...northKoreaTours, ...russiaTours],
    []
  );

  const heroTour = useMemo(() => allTours[Math.floor(Math.random() * allTours.length)], [allTours]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
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

      <Breadcrumbs items={[{ label: "Спецпредложения" }]} />

      {/* Tour cards */}
      <section className="container mx-auto px-10 md:px-16 lg:px-24 py-12 md:py-20 space-y-6">
        {/* Мальдивы — фиксированная первая карточка */}
        <Link to="/maldives" className="block bg-card overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-[300px] md:min-h-[220px] flex-shrink-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80"
                alt="Мальдивы"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-foreground uppercase tracking-wide">
                Мальдивы
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Там где время останавливается. Бирюзовый океан, виллы над водой и абсолютная приватность.
              </p>
            </div>
            <div className="hidden md:flex items-center">
              <div className="w-px h-2/3 bg-border" />
            </div>
            <div className="md:w-[240px] flex-shrink-0 p-6 md:p-8 flex flex-col justify-center space-y-3">
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Мальдивы</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <Banknote className="w-4 h-4 text-primary shrink-0" />
                <span>Индивидуальный подбор</span>
              </div>
            </div>
          </div>
        </Link>

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
                  src={tour.image}
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
