import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BadgePercent, Lock, MessageCircle, Heart, Users, Fish, Sparkles,
  Gem, UsersRound, Palmtree, Crown, Plane, Gift, Star, ShieldCheck,
  Phone, ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSocial from "@/components/NewsletterSocial";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import HotelQuiz from "@/components/hotels/HotelQuiz";

const ATOLLS = [
  { name: "Северный Мале", desc: "Близко к аэропорту, классика" },
  { name: "Баа", desc: "Биосферный заповедник ЮНЕСКО, манты" },
  { name: "Раа", desc: "Уединение, премиум-резорты" },
  { name: "Ари", desc: "Лучший дайвинг, китовые акулы" },
  { name: "Лавияни", desc: "Тихий, семейные курорты" },
];

const SCENARIOS = [
  { key: "Романтика", icon: Heart, title: "Романтика и медовый месяц", desc: "Виллы над водой, ужин на пляже, спа для двоих." },
  { key: "Семья", icon: Users, title: "Семья с детьми", desc: "Детский клуб, мелкая лагуна, семейные виллы." },
  { key: "Дайвинг", icon: Fish, title: "Дайвинг и снорклинг", desc: "Дом-риф у виллы, дайв-центр PADI, манты." },
  { key: "Спа", icon: Sparkles, title: "Спа и велнес", desc: "Ретриты, аюрведа, йога над океаном." },
  { key: "Гастрономия", icon: Gem, title: "Гастрономия и винотека", desc: "Шефы Michelin, подводные рестораны." },
  { key: "Уединение", icon: UsersRound, title: "Уединение", desc: "Острова на 30 вилл, приватные пляжи." },
  { key: "Актив", icon: Palmtree, title: "Активный отдых", desc: "Сёрф, кайт, тренажёрный зал, водные виды." },
  { key: "Лакшери", icon: Crown, title: "Эксклюзив и лакшери", desc: "Бренды Soneva, Cheval Blanc, One&Only." },
];

const PERKS = [
  { icon: BadgePercent, text: "Цены отелей напрямую — без агентских наценок" },
  { icon: Gift, text: "Бонусы клуба: апгрейд, ужин, трансфер на гидросамолёте" },
  { icon: Plane, text: "Поможем с перелётом, визой и страховкой" },
  { icon: Star, text: "Личный менеджер 24/7 на время поездки" },
  { icon: ShieldCheck, text: "Бронируем только проверенные нами отели" },
  { icon: Lock, text: "Гарантия лучшей цены — найдёте дешевле, вернём разницу" },
];

const MaldivesHotelsPage = () => {
  const [presetScenario, setPresetScenario] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Подбор отеля на Мальдивах — Travel Club Alladin";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Подберём отель на Мальдивах под ваш сценарий — романтика, семья, дайвинг, спа. 180 курортов, личный менеджер, цены без наценок.");
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://alladintravelclub.ru/hotels/maldives";
  }, []);

  const scrollToQuiz = () => {
    document.getElementById("hotel-quiz")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pickScenario = (key: string) => {
    // re-trigger effect even if same key clicked
    setPresetScenario(null);
    setTimeout(() => setPresetScenario(key), 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
          <img
            src="https://placehold.co/1920x1080?text=Maldives+overwater+villa"
            alt="Вилла на Мальдивах над водой"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
          <div className="relative container mx-auto px-6 h-full flex flex-col justify-end pb-16 text-white">
            <div className="max-w-3xl space-y-6">
              <p className="text-xs font-sans uppercase tracking-[0.3em] opacity-80">Подбор отеля · Мальдивы</p>
              <h1 className="font-serif text-4xl md:text-6xl leading-tight">
                Один отель из 180. Под вас.
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                Расскажите о ваших ожиданиях — мы предложим 3–5 курортов, идеально подходящих вашему стилю отдыха.
              </p>
              <Button size="lg" onClick={scrollToQuiz} className="gap-2">
                Подобрать отель <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 pt-6">
        <Breadcrumbs
          items={[
            { label: "Главная", path: "/" },
            { label: "Подбор отеля" },
            { label: "Мальдивы" },
          ]}
        />
      </div>

      {/* Club Advantage */}
      <section className="py-16 md:py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: BadgePercent, title: "Цены без наценок", text: "Мы — клуб, а не агентство. Стоимость отеля напрямую от резорта." },
            { icon: Lock, title: "Только проверенные курорты", text: "Каждый отель в подборке мы посетили лично." },
            { icon: MessageCircle, title: "Личный менеджер 24/7", text: "Виктория Цой и команда — на связи до, во время и после поездки." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl">{title}</h3>
              <p className="text-foreground/70 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Destination */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <img
              src="https://placehold.co/900x700?text=Maldives+atolls+map"
              alt="Карта атоллов Мальдив"
              className="w-full h-auto border border-border"
            />
            <div className="space-y-6">
              <p className="text-xs font-sans uppercase tracking-widest text-primary">Направление</p>
              <h2 className="font-serif text-3xl md:text-5xl">Мальдивы — 26 атоллов, 180 курортов</h2>
              <p className="text-foreground/70 leading-relaxed">
                Каждый отель занимает свой собственный остров. От 30-минутного катера до часового перелёта на гидросамолёте —
                мы поможем выбрать атолл, который подходит именно вашему сценарию отдыха.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
            {ATOLLS.map((a) => (
              <div key={a.name} className="bg-card border border-border p-5 space-y-2">
                <h4 className="font-serif text-xl">{a.name}</h4>
                <p className="text-sm text-foreground/60">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="py-16 md:py-24 container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <p className="text-xs font-sans uppercase tracking-widest text-primary">Сценарии отдыха</p>
          <h2 className="font-serif text-3xl md:text-5xl">8 типов отдыха — выберите ближе всего</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {SCENARIOS.map(({ key, icon: Icon, title, desc }) => (
            <div key={key} className="bg-card border border-border p-6 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl leading-tight">{title}</h3>
              <p className="text-sm text-foreground/70 flex-grow">{desc}</p>
              <button
                onClick={() => pickScenario(key)}
                className="text-sm text-primary font-sans uppercase tracking-widest hover:underline text-left mt-2"
              >
                Подобрать в этом стиле →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section id="hotel-quiz" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-10 space-y-4">
            <p className="text-xs font-sans uppercase tracking-widest text-primary">Квиз · 6 шагов · 2 минуты</p>
            <h2 className="font-serif text-3xl md:text-5xl">Расскажите о поездке</h2>
            <p className="text-foreground/70">Ответы помогут подобрать 3–5 курортов под ваш сценарий.</p>
          </div>
          <HotelQuiz presetScenario={presetScenario} />
        </div>
      </section>

      {/* Club Perks */}
      <section className="py-16 md:py-24 container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <p className="text-xs font-sans uppercase tracking-widest text-primary">Преимущества клуба</p>
          <h2 className="font-serif text-3xl md:text-5xl">Что вы получаете</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PERKS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-4 bg-card border border-border p-5">
              <Icon className="w-5 h-5 text-primary shrink-0 mt-1" />
              <p className="text-foreground/80">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Manager */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-card border border-border p-8 md:p-12 grid md:grid-cols-[200px_1fr] gap-8 items-center">
            <img
              src="https://placehold.co/400x400?text=Victoria+Tsoy"
              alt="Виктория Цой"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border border-border mx-auto"
            />
            <div className="space-y-4">
              <p className="text-xs font-sans uppercase tracking-widest text-muted-foreground">
                Основатель клуба · подбор отелей на Мальдивах
              </p>
              <h3 className="font-serif text-3xl">Виктория Цой</h3>
              <p className="text-foreground/70 leading-relaxed">
                Лично посетила более 60 курортов на Мальдивах. Знает, какой отель подходит для медового месяца, а какой —
                для семьи с двумя детьми и бабушкой.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="tel:+79147051705">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Phone className="w-4 h-4" /> +7 (914) 705-17-05
                  </Button>
                </a>
                <a href="https://wa.me/79147051705" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="gap-2">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </Button>
                </a>
                <a href="https://t.me/+79147051705" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">Telegram</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSocial />
      <Footer />
    </div>
  );
};

export default MaldivesHotelsPage;
