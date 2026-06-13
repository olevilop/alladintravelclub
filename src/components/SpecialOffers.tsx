import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { tours, japanTours, koreaTours, chinaTours, northKoreaTours, russiaTours, eventTours } from "@/data/tours";
import TourCarousel from "@/components/TourCarousel";
import { useTours } from "@/lib/useTours";

interface SpecialOffersProps {
  excludeTourId?: string;
}

const SpecialOffers = ({ excludeTourId }: SpecialOffersProps) => {
  const { data: apiTours } = useTours();
  // Случайное «зерно» на один заход (меняется при каждом обновлении страницы).
  const [seed] = useState(() => Math.floor(Math.random() * 1e9));
  const selected = useMemo(() => {
    const all = (apiTours && apiTours.length)
      ? apiTours
      : [...tours, ...japanTours, ...koreaTours, ...chinaTours, ...northKoreaTours, ...russiaTours, ...eventTours];
    const list = all.filter((t: any) => t.specialOfferTag && t.id !== excludeTourId);
    // перемешиваем стабильно для этого захода (зависит от seed), при обновлении страницы — новый порядок
    const hash = (s: string) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h; };
    return [...list].sort((a: any, b: any) => hash(a.id + seed) - hash(b.id + seed));
  }, [apiTours, excludeTourId, seed]);

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
      <TourCarousel tours={selected} hideSpecialOfferTag imageField="imageOffer" />
    </div>
  );
};

export default SpecialOffers;
