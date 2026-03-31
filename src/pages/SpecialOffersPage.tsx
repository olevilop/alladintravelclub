import { useMemo } from "react";
import { Link } from "react-router-dom";
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
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-20">
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

              {/* Price / Duration */}
              <div className="md:w-[200px] flex-shrink-0 p-6 md:p-8 flex flex-row md:flex-col items-center justify-center gap-4 text-center">
                <div>
                  <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Стоимость от</span>
                  <span className="text-2xl md:text-3xl font-bold text-primary">{tour.price}</span>
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Длительность</span>
                  <span className="text-lg text-foreground">от {tour.days} ночей</span>
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
