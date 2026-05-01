import { tours, japanTours, koreaTours, chinaTours, northKoreaTours, russiaTours } from "@/data/tours";
import TourCarousel from "@/components/TourCarousel";

const regionLabels: Record<string, string> = {
  "Япония": "туры в Японию",
  "Южная Корея": "туры в Корею",
  "Китай": "туры в Китай",
  "Северная Корея": "туры в Северную Корею",
  "Россия": "туры по России",
};

interface SimilarToursProps {
  currentTour: { id: string; region: string; category?: string };
}

const SimilarTours = ({ currentTour }: SimilarToursProps) => {
  const allTours = [...tours, ...japanTours, ...koreaTours, ...chinaTours, ...northKoreaTours, ...russiaTours];
  const isCruise = !!currentTour.category || tours.some(t => t.id === currentTour.id);
  const similarTours = allTours.filter(t => {
    if (t.id === currentTour.id) return false;
    if (isCruise && currentTour.category) return t.category === currentTour.category;
    return t.region === currentTour.region;
  });
  const label = isCruise
    ? (currentTour.category === "classic" ? "классические круизы" : "экспедиционные круизы")
    : (regionLabels[currentTour.region] || `туры — ${currentTour.region}`);

  return (
    <div className="px-6 md:px-12 pb-16 md:pb-24">
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="hidden sm:block flex-shrink-0 h-[1px] w-24 bg-gradient-to-r from-transparent to-primary" />
        <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground">
          Похожие <span className="italic text-gold-gradient">{label}</span>
        </h2>
        <span className="hidden sm:block flex-shrink-0 h-[1px] w-24 bg-gradient-to-l from-transparent to-primary" />
      </div>
      {similarTours.length > 0 ? (
        <TourCarousel tours={similarTours} />
      ) : (
        <p className="text-center text-muted-foreground">Похожих туров этого региона пока нет</p>
      )}
    </div>
  );
};

export default SimilarTours;
