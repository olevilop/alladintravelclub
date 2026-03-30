import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { tours, japanTours, koreaTours, chinaTours, northKoreaTours, russiaTours } from "@/data/tours";

interface SpecialOffersProps {
  excludeTourId?: string;
}

const SpecialOffers = ({ excludeTourId }: SpecialOffersProps) => {
  const selected = useMemo(() => {
    const all = [...tours, ...japanTours, ...koreaTours, ...chinaTours, ...northKoreaTours, ...russiaTours]
      .filter(t => t.id !== excludeTourId);
    // Fisher-Yates shuffle
    const shuffled = [...all];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 4);
  }, [excludeTourId]);

  return (
    <div className="px-6 md:px-12 pb-16 md:pb-24">
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="hidden sm:block flex-shrink-0 h-[1px] w-24 bg-gradient-to-r from-transparent to-primary" />
        <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground">
          Спец<span className="italic text-gold-gradient">предложения</span>
        </h2>
        <span className="hidden sm:block flex-shrink-0 h-[1px] w-24 bg-gradient-to-l from-transparent to-primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {selected.map((t) => (
          <div
            key={t.id}
            className="group bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-colors duration-500 h-full"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={t.image}
                alt={t.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1 text-xs text-primary font-sans uppercase tracking-wider">
                {t.region}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg text-foreground leading-snug">{t.name}</h3>
              <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{t.days} дней</span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                <span className="font-serif text-lg text-primary">{t.price}</span>
                <Link to={`/tour/${t.id}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors group/btn">
                  Подробнее
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
