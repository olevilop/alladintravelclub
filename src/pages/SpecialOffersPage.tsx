import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tours, japanTours, koreaTours, chinaTours, northKoreaTours, russiaTours } from "@/data/tours";

const SpecialOffersPage = () => {
  const allTours = useMemo(
    () => [...tours, ...japanTours, ...koreaTours, ...chinaTours, ...northKoreaTours, ...russiaTours],
    []
  );

  const heroTour = useMemo(() => allTours[Math.floor(Math.random() * allTours.length)], [allTours]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={heroTour.image}
          alt={heroTour.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-serif text-4xl md:text-6xl font-light text-white">
            Спец<span className="italic">предложения</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl">
            Лучшие туры по специальным ценам
          </p>
        </div>
      </section>

      {/* Tour cards */}
      <section className="container mx-auto px-6 py-12 md:py-20 space-y-6">
        {allTours.map((tour) => (
          <Link
            key={tour.id}
            to={`/tour/${tour.id}`}
            className="group block bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-colors duration-500"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-1/3 aspect-[16/10] md:aspect-auto overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="flex-1 p-6 flex flex-col justify-center">
                <span className="text-xs font-sans uppercase tracking-widest text-primary mb-2">
                  {tour.region}
                </span>
                <h2 className="font-serif text-xl md:text-2xl text-foreground uppercase tracking-wide">
                  {tour.name}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {tour.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm text-primary group-hover:translate-x-1 transition-transform">
                  Подробнее <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Price / Duration */}
              <div className="md:w-1/4 p-6 flex flex-row md:flex-col items-center justify-center gap-4 border-t md:border-t-0 md:border-l border-border/50 text-center">
                <div>
                  <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Стоимость</span>
                  <span className="font-serif text-2xl md:text-3xl text-primary">{tour.price}</span>
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Длительность</span>
                  <div className="flex items-center justify-center gap-1.5 text-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-serif text-lg">{tour.days} дней</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default SpecialOffersPage;
