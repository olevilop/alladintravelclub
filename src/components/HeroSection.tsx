import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
import heroChinaMountains from "@/assets/hero-china-mountains.jpg";
import heroGreatWall from "@/assets/hero-great-wall.jpg";
import heroMaldives from "@/assets/hero-maldives.jpg";
import heroShanghai from "@/assets/hero-shanghai.jpg";
import heroAntarctica from "@/assets/hero-antarctica.jpg";
import aladdinLamp from "@/assets/aladdin-lamp.png";

const slides = [
  { image: heroBg, title: "Уникальные путешествия в самые недоступные уголки планеты" },
  { image: heroChinaMountains, title: "Горы Аватара" },
  { image: heroGreatWall, title: "Великая Китайская стена" },
  { image: heroMaldives, title: "Роскошные отели на Мальдивах" },
  { image: heroShanghai, title: "Путешествие по Шанхаю" },
  { image: heroAntarctica, title: "Путешествие к Императорским пингвинам" },
];

const INTERVAL = 30000;
const FADE_DURATION = 1.5;

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Background slides */}
      <AnimatePresence mode="sync">
        <motion.img
          key={currentIndex}
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title}
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION }}
        />
      </AnimatePresence>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-start justify-center px-6 sm:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-4"
        >
          <span className="inline-block text-primary-foreground/80 text-sm font-sans uppercase tracking-[0.3em]">
            Travel Club Alladin
          </span>
        </motion.div>

        {/* Slide title */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white max-w-4xl leading-tight"
          >
            {slides[currentIndex].title}
          </motion.h1>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-6 text-white/70 font-sans text-lg md:text-xl max-w-2xl"
        >
          Авторские туры по всему миру
        </motion.p>

        {/* Aladdin lamp button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 flex flex-col items-center"
        >
          <button
            onClick={() =>
              document.querySelector("#tours")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-110"
          >
            <img
              src={aladdinLamp}
              alt="Лампа Алладина"
              className="w-14 h-14 object-contain drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-500"
            />
          </button>
          <span className="mt-3 text-white/80 text-sm font-sans tracking-wide">
            Потри лампу Алладина
          </span>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-24 left-6 sm:left-12 lg:left-24 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-8 bg-white"
                  : "w-4 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-6 h-6 text-white animate-scroll-indicator" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
