import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useTours } from "@/lib/useTours";
import TourCarousel from "./TourCarousel";

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center gap-4">
    <span className="hidden sm:block flex-shrink-0 h-[1px] w-24 bg-gradient-to-r from-transparent to-primary" />
    <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground text-center">{children}</h2>
    <span className="hidden sm:block flex-shrink-0 h-[1px] w-24 bg-gradient-to-l from-transparent to-primary" />
  </div>
);

// Подбор туров раздела по его настройкам
function pickTours(section: any, all: any[]): any[] {
  if (section.filter_type === "category") return all.filter((t) => t.category === section.filter_value);
  if (section.filter_type === "manual") {
    const ids: string[] = Array.isArray(section.tour_ids) ? section.tour_ids : [];
    const byId = new Map(all.map((t) => [t.id, t]));
    return ids.map((id) => byId.get(id)).filter(Boolean);
  }
  // по умолчанию — по набору (source)
  return all.filter((t) => t.source === section.filter_value);
}

const ToursSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { data: sections = [] } = useQuery({ queryKey: ["sections"], queryFn: api.getSections });
  const { data: tours = [] } = useTours();

  return (
    <section id="tours" className="py-24 md:py-32 bg-section-gradient">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="text-primary text-sm font-sans uppercase tracking-[0.3em]">Каталог туров</span>
        </motion.div>

        {sections.map((section: any, idx: number) => {
          const list = pickTours(section, tours);
          if (!list.length) return null;
          return (
            <div key={section.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + Math.min(idx, 6) * 0.1 }}
                className={`text-center mb-12 ${idx === 0 ? "mt-4" : "mt-20"}`}
              >
                {section.link ? (
                  <Link to={section.link} className="hover:opacity-80 transition-opacity">
                    <SectionHeading>{section.title}</SectionHeading>
                  </Link>
                ) : (
                  <SectionHeading>{section.title}</SectionHeading>
                )}
              </motion.div>
              <TourCarousel tours={list} hideSpecialOfferTag={section.filter_value === "expedition"} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ToursSection;
