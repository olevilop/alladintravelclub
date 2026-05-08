import { useRef, useState, useEffect, useCallback } from "react";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getSpecialOfferLabel } from "@/config/specialOfferTags";

interface Tour {
  id: string;
  name: string;
  image: string;
  region: string;
  days: number;
  price: string;
  badge?: string;
  specialOfferTag?: string;
}

const TourCarousel = ({ tours, hideSpecialOfferTag = false }: { tours: Tour[]; hideSpecialOfferTag?: boolean }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, tours]);

  const scroll = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(":scope > div")?.offsetWidth ?? 300;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel">
      {canScrollLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 flex items-center justify-center bg-background/90 border border-border rounded-full shadow-lg hover:bg-primary/10 hover:border-primary transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 flex items-center justify-center bg-background/90 border border-border rounded-full shadow-lg hover:bg-primary/10 hover:border-primary transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="tour-carousel flex gap-6 overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        <style>{`.tour-carousel::-webkit-scrollbar { display: none; }`}</style>
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="snap-start flex-shrink-0 w-[calc(100%-0px)] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] group bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-colors duration-500"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={tour.image}
                alt={tour.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1 text-xs text-primary font-sans uppercase tracking-wider">
                {tour.region}
              </div>
              {tour.badge && (
                <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm px-3 py-1 text-xs text-primary font-sans uppercase tracking-wider">
                  {tour.badge}
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg text-foreground leading-snug">{tour.name}</h3>
              <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{tour.days} дней</span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                <span className="font-serif text-lg text-primary">{tour.price}</span>
                <Link
                  to={`/tour/${tour.id}`}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors group/btn"
                >
                  Подробнее
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
              {getSpecialOfferLabel(tour.specialOfferTag) && (
                <div className="-mx-5 -mb-5 mt-4 px-5 py-2 border-t border-primary/20 bg-primary/5 text-center text-[11px] uppercase tracking-[0.25em] text-primary font-sans">
                  {getSpecialOfferLabel(tour.specialOfferTag)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourCarousel;
