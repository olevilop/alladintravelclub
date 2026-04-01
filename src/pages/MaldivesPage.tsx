import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sun, CloudSun, Umbrella, Plane, Ship, Palmtree, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const seasons = [
  { icon: Sun, title: "Декабрь — Март", subtitle: "Сухой сезон", desc: "Идеальная погода: +28–30 °C, минимум осадков, спокойный океан. Лучшее время для снорклинга и дайвинга." },
  { icon: CloudSun, title: "Апрель — Май", subtitle: "Переходный сезон", desc: "Меньше туристов, комфортная температура. Отличный выбор для тех, кто ценит уединение." },
  { icon: Umbrella, title: "Июнь — Ноябрь", subtitle: "Низкий сезон", desc: "Выгодные цены на отели и перелёты. Дожди кратковременные, сёрфинг в лучшей форме." },
];

const hotels = [
  { name: "Soneva Jani", phrase: "Тишина над водой", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80" },
  { name: "Six Senses Laamu", phrase: "Природа в каждой детали", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80" },
  { name: "Gili Lankanfushi", phrase: "Босиком по белому песку", image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80" },
  { name: "Cheval Blanc Randheli", phrase: "Французская утончённость в океане", image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80" },
];

const steps = [
  { icon: Plane, title: "Перелёт", desc: "Прямые рейсы или удобные стыковки через Дубай и Доху — от 9 часов в пути" },
  { icon: Ship, title: "Трансфер", desc: "Скоростной катер или гидроплан доставят вас прямо до отеля" },
  { icon: Palmtree, title: "Отдых", desc: "Всё включено, приватность, никакой суеты — только вы и океан" },
];

const MaldivesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", dates: "", budget: "" });

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Заявка отправлена", description: "Мы подберём отель и свяжемся с вами в течение 2 часов" });
    setForm({ name: "", phone: "", dates: "", budget: "" });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-white mb-4">Мальдивы</h1>
            <p className="font-sans text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto">
              Там где время останавливается
            </p>
            <button
              onClick={() => document.getElementById("maldives-form")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gold-gradient text-primary-foreground py-3 px-10 text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Узнать стоимость
            </button>
          </motion.div>
        </div>
        <button
          onClick={goBack}
          className="absolute top-24 left-6 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-sans"
        >
          <ArrowLeft className="w-4 h-4" /> На главную
        </button>
      </section>

      {/* Когда ехать */}
      <SectionBlock label="Сезоны" title="Когда" accent="ехать">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {seasons.map((s, i) => (
            <AnimCard key={s.title} index={i}>
              <s.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-xs text-primary font-sans uppercase tracking-widest mb-1">{s.subtitle}</p>
              <h3 className="font-serif text-xl text-foreground mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">{s.desc}</p>
            </AnimCard>
          ))}
        </div>
      </SectionBlock>

      {/* Где остановиться */}
      <SectionBlock label="Отели" title="Где" accent="остановиться" bg>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hotels.map((h, i) => (
            <AnimCard key={h.name} index={i} className="p-0 overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-serif text-xl text-white mb-1">{h.name}</h3>
                  <p className="text-sm text-white/80 font-sans italic">{h.phrase}</p>
                </div>
              </div>
            </AnimCard>
          ))}
        </div>
      </SectionBlock>

      {/* Всё проще чем кажется */}
      <SectionBlock label="Как это работает" title="Всё проще" accent="чем кажется">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <AnimCard key={s.title} index={i}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-serif text-primary/30">{i + 1}</span>
                <s.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">{s.desc}</p>
            </AnimCard>
          ))}
        </div>
      </SectionBlock>

      {/* Форма */}
      <section id="maldives-form" className="py-24 md:py-32 bg-section-gradient relative">
        <FormSection form={form} setForm={setForm} onSubmit={handleSubmit} />
      </section>

      <Footer />
    </main>
  );
};

/* Reusable section wrapper */
const SectionBlock = ({ label, title, accent, children, bg }: { label: string; title: string; accent: string; children: React.ReactNode; bg?: boolean }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section className={`py-24 md:py-32 ${bg ? "bg-section-gradient" : ""}`}>
      <div ref={ref} className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className="text-primary text-sm font-sans uppercase tracking-[0.3em]">{label}</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mt-4">
            {title} <span className="italic text-gold-gradient">{accent}</span>
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
};

/* Animated card */
const AnimCard = ({ children, index, className = "" }: { children: React.ReactNode; index: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className={`group p-8 border border-border/50 bg-card/20 hover:border-primary/30 transition-all duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
};

/* Form section */
const FormSection = ({ form, setForm, onSubmit }: { form: any; setForm: any; onSubmit: (e: React.FormEvent) => void }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} className="container mx-auto px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-12">
          <span className="text-primary text-sm font-sans uppercase tracking-[0.3em]">Заявка</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mt-4">
            Не знаете <span className="italic text-gold-gradient">с чего начать?</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-sans">Подберём отель под ваш бюджет и даты — бесплатно</p>
        </motion.div>
        <motion.form initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input placeholder="Ваше имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-card/50 border-border/50 focus:border-primary h-12 font-sans" />
            <Input placeholder="Телефон" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required className="bg-card/50 border-border/50 focus:border-primary h-12 font-sans" />
          </div>
          <Input placeholder="Даты поездки" value={form.dates} onChange={(e) => setForm({ ...form, dates: e.target.value })} className="bg-card/50 border-border/50 focus:border-primary h-12 font-sans" />
          <Select value={form.budget} onValueChange={(v) => setForm({ ...form, budget: v })}>
            <SelectTrigger className="bg-card/50 border-border/50 focus:border-primary h-12 font-sans">
              <SelectValue placeholder="Бюджет" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="300">до 300 тыс. ₽</SelectItem>
              <SelectItem value="300-500">300–500 тыс. ₽</SelectItem>
              <SelectItem value="500-1000">500 тыс. – 1 млн ₽</SelectItem>
              <SelectItem value="1000+">от 1 млн ₽</SelectItem>
            </SelectContent>
          </Select>
          <button type="submit" className="w-full bg-gold-gradient text-primary-foreground py-4 text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Send className="w-4 h-4" /> Получить подборку
          </button>
          <p className="text-center text-xs text-muted-foreground font-sans">Ответим в течение 2 часов</p>
        </motion.form>
      </div>
    </div>
  );
};

export default MaldivesPage;
