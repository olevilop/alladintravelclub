import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import tourExpedition from "@/assets/tour-expedition.jpg";
import tourPenguins from "@/assets/tour-penguins.jpg";
import tourSafari from "@/assets/tour-safari.jpg";
import arcticImg from "@/assets/arctic.jpg";
import antarcticaImg from "@/assets/antarctica.jpg";
import islandsImg from "@/assets/islands.jpg";
import asiaImg from "@/assets/asia.jpg";
import southAmericaImg from "@/assets/south-america.jpg";

const regions = ["Все", "Арктика", "Антарктида", "Африка", "Азия", "Острова", "Южная Америка"];

const tours = [
  { name: "Арктический круиз на Шпицберген", region: "Арктика", days: 14, price: "от €12 500", image: arcticImg },
  { name: "Экспедиция к Южному полюсу", region: "Антарктида", days: 21, price: "по запросу", image: antarcticaImg },
  { name: "Королевские пингвины Антарктиды", region: "Антарктида", days: 16, price: "от €15 800", image: tourPenguins },
  { name: "Сафари в Серенгети Deluxe", region: "Африка", days: 10, price: "от €9 200", image: tourSafari },
  { name: "Фьорды Норвегии на яхте", region: "Арктика", days: 12, price: "от €18 000", image: tourExpedition },
  { name: "Галапагосские острова", region: "Острова", days: 11, price: "от €11 500", image: islandsImg },
  { name: "Затерянные храмы Бутана", region: "Азия", days: 9, price: "от €7 800", image: asiaImg },
  { name: "Патагония: край земли", region: "Южная Америка", days: 15, price: "от €13 200", image: southAmericaImg },
];

const ToursSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeRegion, setActiveRegion] = useState("Все");

  const filtered = activeRegion === "Все" ? tours : tours.filter((t) => t.region === activeRegion);

  return (
    <section id="tours" className="py-24 md:py-32 bg-section-gradient">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-sans uppercase tracking-[0.3em]">
            Каталог
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mt-4">
            Наши <span className="italic text-gold-gradient">путешествия</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-5 py-2 text-sm font-sans uppercase tracking-wider transition-all duration-300 border ${
                activeRegion === region
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((tour, i) => (
            <motion.div
              key={tour.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-colors duration-500"
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
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg text-foreground leading-snug">{tour.name}</h3>
                <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{tour.days} дней</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                  <span className="font-serif text-lg text-primary">{tour.price}</span>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors group/btn">
                    Подробнее
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToursSection;
