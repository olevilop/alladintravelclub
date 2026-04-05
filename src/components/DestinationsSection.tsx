import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import arcticImg from "@/assets/arctic.jpg";
import antarcticaImg from "@/assets/antarctica.jpg";
import africaImg from "@/assets/africa.jpg";
import asiaImg from "@/assets/asia.jpg";
import islandsImg from "@/assets/islands.jpg";
import southAmericaImg from "@/assets/south-america.jpg";

const destinations = [
  { name: "Арктика", desc: "Северный полюс, Шпицберген, Гренландия", image: arcticImg },
  { name: "Антарктида", desc: "Ледяной континент и Южный океан", image: antarcticaImg },
  { name: "Африка", desc: "Сафари, Килиманджаро, Мадагаскар", image: africaImg },
  { name: "Азия", desc: "Япония, Китай, Россия, Южная Корея, Мальдивы", image: asiaImg, link: "/destinations/asia" },
  { name: "Острова", desc: "Галапагосы, Мальдивы, Сейшелы", image: islandsImg },
  { name: "Южная Америка", desc: "Патагония, Амазонка, Мачу-Пикчу", image: southAmericaImg },
];

const DestinationsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="destinations" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-sans uppercase tracking-[0.3em]">
            Направления для путешествия
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => {
            const content = (
              <>
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl text-foreground mb-1">{dest.name}</h3>
                  <p className="text-sm text-foreground/60 font-sans">{dest.desc}</p>
                  <div className="mt-3 w-8 h-[1px] bg-primary group-hover:w-16 transition-all duration-500" />
                </div>
              </>
            );

            return (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              >
                {dest.link ? (
                  <Link to={dest.link} className="absolute inset-0">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
