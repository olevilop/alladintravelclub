import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";

import heroBg from "@/assets/hero-bg.jpg";
import heroChinaMountains from "@/assets/hero-china-mountains.jpg";
import heroGreatWall from "@/assets/hero-great-wall.jpg";
import heroMaldives from "@/assets/hero-maldives.jpg";
import heroShanghai from "@/assets/hero-shanghai.jpg";
import heroAntarctica from "@/assets/hero-antarctica.jpg";
import lampButton from "@/assets/lamp-button.png";

// Запасные слайды (если API недоступен) — чтобы Hero никогда не был пустым.
const FALLBACK = [
  { image: heroBg, title: "Уникальные путешествия в самые недоступные уголки планеты", target: null },
  { image: heroChinaMountains, title: "Горы Аватара", target: null },
  { image: heroGreatWall, title: "Великая Китайская стена", target: null },
  { image: heroMaldives, title: "Роскошные отели на Мальдивах", target: null },
  { image: heroShanghai, title: "Путешествие по Шанхаю", target: null },
  { image: heroAntarctica, title: "Путешествие к Императорским пингвинам", target: null },
];

const INTERVAL = 30000;
const FADE_DURATION = 1.5;

type Slide = { image: string; title: string; target: string | null };

const HeroSection = () => {
  const navigate = useNavigate();
  const { data } = useQuery({ queryKey: ["hero"], queryFn: api.getHero });

  const slides: Slide[] = (data && data.length)
    ? data.map((s: any) => ({
        image: s.image,
        title: s.title || "",
        target: s.target_tour_id ? `/tour/${s.target_tour_id}` : (s.target_url || null),
      }))
    : FALLBACK;

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => { setCurrentIndex(0); }, [data]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const current = slides[currentIndex] || slides[0];

  const goToTarget = () => {
    const t = current?.target;
    if (!t) return;
    if (/^https?:\/\//.test(t)) window.location.href = t;
    else navigate(t);
  };

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Кликабельный фон-слайд */}
      <div
        className={`absolute inset-0 ${current?.target ? "cursor-pointer" : ""}`}
        onClick={goToTarget}
        role={current?.target ? "link" : undefined}
        aria-label={current?.target ? current.title : undefined}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={currentIndex}
            src={current?.image}
            alt={current?.title}
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_DURATION }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/40" />
      </div>

      {/* Контент поверх; клики по кнопке/точкам не должны вызывать переход */}
      <div className="relative z-10 h-full flex flex-col items-start justify-center px-6 sm:px-12 lg:px-24 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            onClick={goToTarget}
            className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white max-w-4xl leading-tight ${current?.target ? "cursor-pointer pointer-events-auto" : ""}`}
          >
            {current?.title}
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

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={(e) => { e.stopPropagation(); document.querySelector("#tours")?.scrollIntoView({ behavior: "smooth" }); }}
          className="absolute bottom-12 left-6 sm:left-12 lg:left-24 flex items-center gap-3 px-6 py-3 rounded-full text-white font-sans text-lg tracking-wide hover:brightness-110 transition-all duration-300 pointer-events-auto"
          style={{ backgroundColor: "#a87f39" }}
        >
          <img src={lampButton} alt="Лампа" className="h-8 w-auto invert" />
          Потри лампу
        </motion.button>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 items-center pointer-events-auto">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentIndex ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
