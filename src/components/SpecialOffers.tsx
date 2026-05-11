import { useMemo } from "react";
import { Link } from "react-router-dom";
import { tours, japanTours, koreaTours, chinaTours, northKoreaTours, russiaTours, eventTours } from "@/data/tours";
import TourCarousel from "@/components/TourCarousel";

interface SpecialOffersProps {
  excludeTourId?: string;
}

const SpecialOffers = ({ excludeTourId }: SpecialOffersProps) => {
  const selected = useMemo(() => {
    return [...tours, ...japanTours, ...koreaTours, ...chinaTours, ...northKoreaTours, ...russiaTours, ...eventTours]
      .filter(t => t.specialOfferTag && t.id !== excludeTourId);
  }, [excludeTourId]);

  if (selected.length === 0) return null;

  return (
    <div className="px-6 md:px-12 pb-16 md:pb-24">
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="hidden sm:block flex-shrink-0 h-[1px] w-24 bg-gradient-to-r from-transparent to-primary" />
        <Link to="/special-offers" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground">
            Спец<span className="italic text-gold-gradient">предложения</span>
          </h2>
        </Link>
        <span className="hidden sm:block flex-shrink-0 h-[1px] w-24 bg-gradient-to-l from-transparent to-primary" />
      </div>
      <TourCarousel tours={selected} hideSpecialOfferTag />
    </div>
  );
};

export default SpecialOffers;
