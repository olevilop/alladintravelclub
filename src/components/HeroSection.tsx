import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      <img
        src={heroBg}
        alt="Экспедиционный круиз в Антарктиде"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-dark-overlay" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
        >
          <span className="inline-block text-primary text-sm font-sans uppercase tracking-[0.3em] mb-6">
            Luxury Expedition Club
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-foreground max-w-5xl leading-tight"
        >
          Уникальные путешествия в самые{" "}
          <span className="text-gold-gradient italic">недоступные</span>{" "}
          уголки планеты
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-6 text-foreground/60 font-sans text-lg md:text-xl max-w-2xl"
        >
          Экспедиционные круизы и туры премиум-класса для тех, кто ищет настоящие приключения
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={() =>
            document.querySelector("#tours")?.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-10 bg-gold-gradient text-primary-foreground px-10 py-4 text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-all duration-300"
        >
          Подобрать путешествие
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-6 h-6 text-primary animate-scroll-indicator" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
