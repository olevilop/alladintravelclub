import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { tours, japanTours, koreaTours, chinaTours, northKoreaTours, russiaTours } from "@/data/tours";
import TourCarousel from "./TourCarousel";

const regions = ["Все", "Арктика", "Антарктида", "Африка", "Азия", "Острова", "Южная Америка"];

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center gap-4">
    <span className="hidden sm:block flex-shrink-0 h-[1px] w-24 bg-gradient-to-r from-transparent to-primary" />
    <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground">{children}</h2>
    <span className="hidden sm:block flex-shrink-0 h-[1px] w-24 bg-gradient-to-l from-transparent to-primary" />
  </div>
);

const ToursSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeRegion, setActiveRegion] = useState("Все");

  const filtered = activeRegion === "Все" ? tours : tours.filter((t) => t.region === activeRegion);

  const categories = [
    { tours: japanTours, label: <><span style={{ fontSize: '0.85em' }}>Т</span>уры по <span className="italic text-gold-gradient">Японии</span></> },
    { tours: koreaTours, label: <><span style={{ fontSize: '0.85em' }}>Т</span>уры по <span className="italic text-gold-gradient">Южной Корее</span></> },
    { tours: chinaTours, label: <><span style={{ fontSize: '0.85em' }}>Т</span>уры по <span className="italic text-gold-gradient">Китаю</span></> },
    { tours: northKoreaTours, label: <><span style={{ fontSize: '0.85em' }}>Т</span>уры по <span className="italic text-gold-gradient">Северной Корее</span></> },
    { tours: russiaTours, label: <><span style={{ fontSize: '0.85em' }}>Т</span>уры по <span className="italic text-gold-gradient">России</span></> },
  ];

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
            Каталог туров
          </span>
          <div className="mt-4">
            <SectionHeading>
              <span style={{ fontSize: '0.85em' }}>Э</span>кспедиционные <span className="italic text-gold-gradient">круизы</span>
            </SectionHeading>
          </div>
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

        <TourCarousel tours={filtered.slice(0, Math.max(filtered.length, 4))} />

        {filtered.length > 4 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mt-20 mb-12"
            >
              <SectionHeading>
                <span style={{ fontSize: '0.85em' }}>К</span>лассические <span className="italic text-gold-gradient">круизы</span>
              </SectionHeading>
            </motion.div>
            <TourCarousel tours={filtered.slice(4)} />
          </>
        )}

        {categories.map((cat, idx) => (
          <div key={idx}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + idx * 0.1 }}
              className="text-center mt-20 mb-12"
            >
              <SectionHeading>{cat.label}</SectionHeading>
            </motion.div>
            <TourCarousel tours={cat.tours} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ToursSection;
