import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    name: "Александр К.",
    route: "Антарктида, 2024",
    text: "Когда айсберг высотой с двадцатиэтажный дом проплывает мимо на расстоянии вытянутой руки — ты понимаешь, что раньше не путешествовал. Terra Elite организовали невозможное: мы видели императорских пингвинов, китов и ледники, которые скоро исчезнут навсегда.",
  },
  {
    name: "Елена и Дмитрий В.",
    route: "Арктика, Шпицберген, 2023",
    text: "Мы объехали весь мир, но Арктика стала нашим главным впечатлением за 15 лет путешествий. Белый медведь в 50 метрах от лодки, полярное безмолвие, и команда, которая знает каждый фьорд. Уже забронировали следующую экспедицию.",
  },
  {
    name: "Марина Т.",
    route: "Галапагосы, 2024",
    text: "Я видела, как морской лев играл с моей маской для сноркелинга. Гигантские черепахи подходили на расстояние метра. Это не зоопарк — это мир, где животные не боятся людей. Благодарю Terra Elite за этот опыт.",
  },
  {
    name: "Игорь Н.",
    route: "Патагония, 2023",
    text: "Патагония — это место, где ветер имеет цвет, а горы разговаривают. Terra Elite продумали каждую деталь: от перелёта до частного трансфера на вертолёте к леднику Перито-Морено. Это был не тур, а произведение искусства.",
  },
];

const ReviewsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === reviews.length - 1 ? 0 : c + 1));

  return (
    <section id="reviews" className="py-24 md:py-32 bg-section-gradient">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-sans uppercase tracking-[0.3em]">
            Истории
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mt-4">
            Впечатления наших <span className="italic text-gold-gradient">путешественников</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <Quote className="w-12 h-12 text-primary/20 mb-6 mx-auto" />

          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="font-serif text-xl md:text-2xl text-foreground/90 leading-relaxed italic">
              "{reviews[current].text}"
            </p>
            <div className="mt-8">
              <div className="font-sans font-medium text-foreground">{reviews[current].name}</div>
              <div className="text-sm text-primary mt-1">{reviews[current].route}</div>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-6" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
