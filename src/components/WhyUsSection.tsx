import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Compass, Handshake, Route, Award, Users } from "lucide-react";

const advantages = [
  { icon: Award, title: "20+ лет опыта", desc: "Глубокая экспертиза в организации экспедиционных путешествий" },
  { icon: Shield, title: "Безопасность", desc: "Сертифицированные суда, страхование и медицинское сопровождение" },
  { icon: Handshake, title: "Премиум-партнёры", desc: "Сотрудничество с Quark, Ponant, Silversea и другими лидерами" },
  { icon: Route, title: "Уникальные маршруты", desc: "Авторские программы, недоступные у других операторов" },
  { icon: Compass, title: "Экспертные гиды", desc: "Учёные, фотографы и исследователи в каждой экспедиции" },
  { icon: Users, title: "90% возвращаются", desc: "Наши клиенты становятся друзьями и возвращаются снова" },
];

const WhyUsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-sans uppercase tracking-[0.3em]">
            Преимущества
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mt-4">
            Почему <span className="italic text-gold-gradient">выбирают нас</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="group p-8 border border-border/50 bg-card/20 hover:border-primary/30 transition-all duration-500"
            >
              <item.icon className="w-8 h-8 text-primary mb-5 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-serif text-xl text-foreground mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
