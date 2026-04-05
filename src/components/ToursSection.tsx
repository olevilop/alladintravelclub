import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { tours, japanTours, koreaTours, chinaTours, northKoreaTours, russiaTours } from "@/data/tours";
import TourCarousel from "./TourCarousel";

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

  const categories = [
    { tours: japanTours, link: "/japan-tours", label: <><span style={{ fontSize: '0.85em' }}>Т</span>уры по <span className="italic text-gold-gradient">Японии</span></> },
    { tours: koreaTours, link: "/korea-tours", label: <><span style={{ fontSize: '0.85em' }}>Т</span>уры по <span className="italic text-gold-gradient">Южной Корее</span></> },
    { tours: chinaTours, link: "/china-tours", label: <><span style={{ fontSize: '0.85em' }}>Т</span>уры по <span className="italic text-gold-gradient">Китаю</span></> },
    { tours: northKoreaTours, link: "/nkorea-tours", label: <><span style={{ fontSize: '0.85em' }}>Т</span>уры по <span className="italic text-gold-gradient">Северной Корее</span></> },
    { tours: russiaTours, link: "/russia-tours", label: <><span style={{ fontSize: '0.85em' }}>Т</span>уры по <span className="italic text-gold-gradient">России</span></> },
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
            <Link to="/expedition-cruises" className="hover:opacity-80 transition-opacity">
              <SectionHeading>
                <span style={{ fontSize: '0.85em' }}>Э</span>кспедиционные <span className="italic text-gold-gradient">круизы</span>
              </SectionHeading>
            </Link>
          </div>
        </motion.div>

        <TourCarousel tours={tours.slice(0, Math.max(tours.length, 4))} />

        {tours.length > 4 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mt-20 mb-12"
            >
              <Link to="/classic-cruises" className="hover:opacity-80 transition-opacity">
                <SectionHeading>
                  <span style={{ fontSize: '0.85em' }}>К</span>лассические <span className="italic text-gold-gradient">круизы</span>
                </SectionHeading>
              </Link>
            </motion.div>
            <TourCarousel tours={tours.filter(t => t.category === "classic")} />
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
              {cat.link ? (
                <Link to={cat.link} className="hover:opacity-80 transition-opacity">
                  <SectionHeading>{cat.label}</SectionHeading>
                </Link>
              ) : (
                <SectionHeading>{cat.label}</SectionHeading>
              )}
            </motion.div>
            <TourCarousel tours={cat.tours} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ToursSection;
