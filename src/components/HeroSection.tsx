import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
import heroChinaMountains from "@/assets/hero-china-mountains.jpg";
import heroGreatWall from "@/assets/hero-great-wall.jpg";
import heroMaldives from "@/assets/hero-maldives.jpg";
import heroShanghai from "@/assets/hero-shanghai.jpg";
import heroAntarctica from "@/assets/hero-antarctica.jpg";
import lampButton from "@/assets/lamp-button.png";

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
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-start justify-center px-6 sm:px-12 lg:px-24">

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

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={() => document.querySelector("#tours")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-12 left-6 sm:left-12 lg:left-24 flex items-center gap-3 px-6 py-3 rounded-full text-white font-sans text-lg tracking-wide hover:brightness-110 transition-all duration-300"
          style={{ backgroundColor: "#a87f39" }}
        >
          <img src={lampButton} alt="Лампа" className="h-8 w-auto invert" />
          Потри лампу
        </motion.button>

        {/* Slide indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 items-center">
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
