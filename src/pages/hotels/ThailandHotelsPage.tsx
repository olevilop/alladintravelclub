import { useEffect, useState } from "react";
import {
  BadgePercent, Lock, MessageCircle, Heart, Users, Fish, Sparkles,
  Building2, Gem, Palmtree, Crown, Plane, Gift, Star, ShieldCheck,
  Phone, ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSocial from "@/components/NewsletterSocial";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import HotelQuiz from "@/components/hotels/HotelQuiz";

const REGIONS = [
  { name: "Пхукет", img: "Phuket", desc: "Крупный остров, развитая инфраструктура, рядом Пхи-Пхи и Симиланы." },
  { name: "Краби (Ao Nang, Railay)", img: "Krabi+Railay", desc: "Известняковые скалы, бутик-резорты, закрытые пляжи." },
  { name: "Самуи", img: "Koh+Samui", desc: "Тихий кокосовый остров, шарм и неторопливость." },
  { name: "Као Лак", img: "Khao+Lak", desc: "Спокойствие, дикий лес, ворота к Симиланам, семейные resort." },
  { name: "Бангкок", img: "Bangkok+skyline", desc: "Городская роскошь, Michelin-рестораны, ворота во всю страну." },
  { name: "Паттайя", img: "Pattaya+Bang+Saray+boutique+resort", desc: "Сиамский залив, 2 часа от Бангкока. Бутиковые resort'ы в Пранбури и Банг Сарай — вдали от шумного центра." },
];

const SCENARIOS = [
  { key: "Романтика", icon: Heart, title: "Медовый месяц / годовщина", desc: "Виллы на пляже, ужины на песке, Краби." },
  { key: "Семья", icon: Users, title: "Семья с детьми 4–12", desc: "Пхукет / Као Лак, аквапарки, детские клубы." },
  { key: "Дайвинг", icon: Fish, title: "Дайвинг и снорклинг", desc: "Симиланы, Пхи-Пхи, рифовые сафари." },
  { key: "Wellness", icon: Sparkles, title: "Wellness / детокс", desc: "Chiva-Som, Kamalaya, ретриты от 7 дней." },
  { key: "Бангкок", icon: Building2, title: "Бангкок + пляж", desc: "Город и Паттайя / Хуа-Хин в одной поездке." },
  { key: "Бутик", icon: Gem, title: "Бутик-минимализм", desc: "Aman, Six Senses, COMO, Soneva Kiri." },
  { key: "Острова", icon: Palmtree, title: "Острова без толпы", desc: "Ко Куд, Ко Яо Ной, Симиланы вне сезона." },
  { key: "Премиум", icon: Crown, title: "Премиум в разумной цене", desc: "5★ Хуа-Хин, межсезонье, Чанг-Май." },
];

const PERKS = [
  { icon: Star, text: "Welcome upgrade при заезде, где возможно" },
  { icon: ShieldCheck, text: "Поздний выезд до 18:00 без доплаты" },
  { icon: Gift, text: "Завтрак или ужин в подарок во многих отелях" },
  { icon: MessageCircle, text: "Личный ассистент в WhatsApp 24/7" },
  { icon: Sparkles, text: "Рекомендации шефов, экскурсоводов, дайв-центров" },
  { icon: Plane, text: "Помощь с трансферами, частным шеф-поваром на вилле" },
];

const ThailandHotelsPage = () => {
  const [presetScenario, setPresetScenario] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Подбор отеля в Тайланде — Travel Club Alladin";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Подбираем отель в Тайланде под ваш сценарий поездки — Пхукет, Краби, Самуи, Бангкок, Паттайя. Закрытые тарифы клуба и личный куратор на время поездки.");
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://alladintravelclub.ru/hotels/thailand";
  }, []);

  const scrollToQuiz = () => {
    document.getElementById("hotel-quiz")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pickScenario = (key: string) => {
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
            src="https://placehold.co/1920x1080?text=Thailand+limestone+cliffs+longtail+boat"
            alt="Лонг-тейл боат у скал Краби, Тайланд"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
          <div className="relative container mx-auto px-6 h-full flex flex-col justify-end pb-16 text-white">
            <div className="max-w-3xl space-y-6">
              <p className="text-xs font-sans uppercase tracking-[0.3em] opacity-80">Подбор отеля · Тайланд</p>
              <h1 className="font-serif text-4xl md:text-6xl leading-tight">
                Тайланд — это не одна страна, а семь.
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                Бангкок и Паттайя, острова Андаманского моря, тихий Самуи, дикие Симиланы. Подбираем направление и отель под характер вашей поездки.
              </p>
              <Button size="lg" onClick={scrollToQuiz} className="gap-2">
                Подобрать отель <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Подбор отеля" }, { label: "Тайланд" }]} />

      {/* Club Advantage */}
      <section className="py-16 md:py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: BadgePercent, title: "Цена не выше публичной", text: "Наши тарифы клуба, часто ниже Booking." },
            { icon: Lock, title: "Доступ к закрытым предложениям", text: "То, чего нет у агрегаторов." },
            { icon: MessageCircle, title: "Личный куратор 24/7 в WhatsApp", text: "На связи на время всей поездки." },
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

      {/* Destination — regions */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <p className="text-xs font-sans uppercase tracking-widest text-primary">Направления</p>
            <h2 className="font-serif text-3xl md:text-5xl">Каждый регион Тайланда — это разный отдых</h2>
            <p className="text-foreground/70">Мы помогаем выбрать тот, что подходит именно вам.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {REGIONS.map((r) => (
              <div key={r.name} className="bg-card border border-border overflow-hidden flex flex-col">
                <img
                  src={`https://placehold.co/600x400?text=${r.img}`}
                  alt={r.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 space-y-2">
                  <h4 className="font-serif text-xl">{r.name}</h4>
                  <p className="text-sm text-foreground/70">{r.desc}</p>
                </div>
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
            <p className="text-foreground/70">Виктория подберёт 3 варианта под этот запрос.</p>
          </div>
          <HotelQuiz presetScenario={presetScenario} variant="thailand" />
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
                Основатель клуба · подбор отелей в Тайланде
              </p>
              <h3 className="font-serif text-3xl">Виктория Цой</h3>
              <p className="text-foreground/70 leading-relaxed">
                Лично знает курорты от Пхукета и Краби до Самуи, Као Лака и бутиков Банг Сарай. Подбирает отель под характер поездки, а не из общего каталога.
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

export default ThailandHotelsPage;
