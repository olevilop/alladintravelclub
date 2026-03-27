import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "20+", label: "лет опыта" },
  { value: "500+", label: "экспедиций" },
  { value: "50+", label: "стран" },
  { value: "90%", label: "повторных клиентов" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-section-gradient">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary text-sm font-sans uppercase tracking-[0.3em]">
            О компании
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mt-4">
            <span style={{ fontSize: '0.85em' }}>М</span>ы открываем мир для тех, кто уже{" "}
            <span className="italic text-gold-gradient">всё видел</span>
          </h2>
          <p className="mt-6 text-muted-foreground font-sans leading-relaxed">
            Алладин – это клуб путешественников, объединённых страстью к исследованию
            нашей планеты в экспедиционных круизах и уникальных турах премиум-класса.
            Мы работаем с ведущими мировыми операторами и создаём маршруты, которые
            невозможно найти в обычных турагентствах.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="text-center p-6 border border-border/50 bg-card/30 backdrop-blur-sm"
            >
              <div className="font-serif text-4xl md:text-5xl font-semibold text-gold-gradient">
                {stat.value}
              </div>
              <div className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
