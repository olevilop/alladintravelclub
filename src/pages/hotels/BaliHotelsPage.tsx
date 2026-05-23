import { useEffect, useState } from "react";
import {
  BadgePercent, Lock, MessageCircle, Heart, Users, Waves, Sparkles,
  UtensilsCrossed, Fish, Crown, Plane, Gift, Star, ShieldCheck,
  Phone, ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSocial from "@/components/NewsletterSocial";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import HotelQuiz from "@/components/hotels/HotelQuiz";

const REGIONS = [
  {
    name: "Семиньяк / Чангу",
    img: "https://placehold.co/600x400/a57d37/faf8f5?text=Seminyak+Canggu+Beach+Club",
    desc: "Модный западный берег. Бутиковые виллы с приватными бассейнами, мировые beach-club'ы, лучшие кафе и рестораны острова. Серф-споты Echo Beach и Old Man's в шаговой доступности. Выбор тех, кто хочет вайб, ритм и стиль.",
  },
  {
    name: "Убуд",
    img: "https://placehold.co/600x400/1a2942/faf8f5?text=Ubud+Rice+Terraces+Jungle",
    desc: "Культурное и духовное сердце Бали. Виллы среди джунглей и рисовых террас, йога-шалы, аюрведа, музыка гамелана по вечерам. Без моря, но с особенной энергетикой — для тех, кто едет за внутренним перезагрузом.",
  },
  {
    name: "Нуса-Дуа",
    img: "https://placehold.co/600x400/a57d37/faf8f5?text=Nusa+Dua+Beach+Resort",
    desc: "Гейтед-район премиум-resort'ов мировых сетей. Белый песок, спокойный океан, безопасно для детей, всё включено или полупансион. Идеален для семей и тех, кто хочет «не думать ни о чём» две недели подряд.",
  },
  {
    name: "Улувату / Букит",
    img: "https://placehold.co/600x400/1a2942/faf8f5?text=Uluwatu+Cliff+Villa+Ocean",
    desc: "Южный полуостров со скалами над океаном. Клифф-виллы с инфинити-бассейнами и видом на закат, легендарные серф-споты (Padang Padang, Bingin, Uluwatu). Для романтики, фотосессий и эстетов океана.",
  },
  {
    name: "Джимбаран / Санур",
    img: "https://placehold.co/600x400/a57d37/faf8f5?text=Jimbaran+Sunset+Seafood",
    desc: "Тихие пляжные районы для размеренного отдыха. Джимбаран — закаты и ужин с морепродуктами прямо на песке, luxury resort'ы Four Seasons и AYANA. Санур — спокойный восточный берег, удобен для пожилых и семей с малышами.",
  },
  {
    name: "Нуса-Пенида / Гили",
    img: "https://placehold.co/600x400/1a2942/faf8f5?text=Nusa+Penida+Diving+Islands",
    desc: "Соседние острова в радиусе быстрого катера. Нуса-Пенида — дикие клиффы, манта-рэи, дайвинг мирового уровня. Острова Гили — пешеходные, без машин, для романтики и снорклинга. Часто включаем как «второй акт» поездки.",
  },
];

const SCENARIOS = [
  { key: "Романтика", icon: Heart, title: "Медовый месяц на вилле с приватным бассейном", desc: "Клифф-виллы Улувату с видом на закат или интимные resort'ы Убуда среди джунглей. Завтрак, поданный в бассейн. Ужин при свечах над океаном." },
  { key: "Семья", icon: Users, title: "Семья с детьми — без забот", desc: "Безопасный океан Нуса-Дуа, kids-club при resort'е, аквапарки в шаговой доступности. Виллы с няней по запросу. Часто — формат «всё включено»." },
  { key: "Серф", icon: Waves, title: "Серф-путешествие", desc: "Чангу для начинающих и middle-level, Улувату и Букит для опытных. Бутик-отели рядом с лайн-апами, доски в аренду, локальные серф-кэмпы." },
  { key: "Йога", icon: Sparkles, title: "Йога-ретрит и духовное путешествие", desc: "Убуд: виллы рядом с лучшими шалами (Yoga Barn, Radiantly Alive), аюрведа, ритриты у местных гуру. Подбираем под уровень практики и язык." },
  { key: "Гастро", icon: UtensilsCrossed, title: "Гастрономия и кафе-культура", desc: "Чангу и Семиньяк: мировой уровень новой азиатской кухни, healthy-кафе, авторские бары, винные подвалы. Размещение в шаговой доступности." },
  { key: "Дайвинг", icon: Fish, title: "Дайвинг и снорклинг", desc: "Нуса-Пенида (манта-рэи и mola-mola), Менджанган и Туламбен (рэки), Амед (макро-дайвинг). Подбираем дайв-resort'ы с PADI/SSI-центрами." },
  { key: "Luxury", icon: Crown, title: "Luxury cliff-виллы с видом на океан", desc: "Букит и Улувату: Bulgari, Six Senses, Alila Villas Uluwatu и сравнимые. Закаты, инфинити-бассейны на скалах, butler-сервис." },
  { key: "Острова", icon: Plane, title: "Бали + соседние острова в одной поездке", desc: "Комбинированные маршруты: Бали → Гили → Ломбок, или Бали → Нуса-Пенида, или Бали → Ява (Боробудур). Логистика катеров и перелётов — на нас." },
];

const PERKS = [
  { icon: MessageCircle, text: "Личный консьерж до и во время поездки" },
  { icon: Star, text: "Гарантированный апгрейд номера при наличии (по запросу к resort'у)" },
  { icon: Gift, text: "Welcome-amenities от Travel Club Alladin (фрукты, шампанское, цветы — зависит от resort'а)" },
  { icon: Sparkles, text: "Помощь с трансферами, ресторанами и экскурсиями на месте" },
  { icon: ShieldCheck, text: "Поддержка 24/7 по WhatsApp/Telegram во время поездки" },
  { icon: BadgePercent, text: "Особые условия отмены/переноса (где это позволяет тариф)" },
];

const BaliHotelsPage = () => {
  const [presetScenario, setPresetScenario] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Подбор отеля на Бали — Travel Club Alladin";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta(
      "description",
      "Подберём виллу или resort на Бали под ваш сценарий: Семиньяк, Убуд, Нуса-Дуа, Улувату, Джимбаран, Нуса-Пенида. Клубные тарифы, личный консьерж. Виктория свяжется в течение 2 часов."
    );
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://alladintravelclub.ru/hotels/bali";
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
            src="https://placehold.co/1920x1080/1a2942/faf8f5?text=Bali+Uluwatu+Cliff+Villa"
            alt="Клифф-вилла Улувату, Бали"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
          <div className="relative container mx-auto px-6 h-full flex flex-col justify-end pb-16 text-white">
            <div className="max-w-3xl space-y-6">
              <p className="text-xs font-sans uppercase tracking-[0.3em] opacity-80">Подбор отеля · Бали</p>
              <h1 className="font-serif text-4xl md:text-6xl leading-tight">
                Бали — остров, который выбирает вас
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                Клифф-виллы Улувату, рисовые террасы Убуда, серф-побережье Чангу, спокойствие Нуса-Дуа — мы знаем, какой Бали подойдёт именно вам.
              </p>
              <p className="text-sm font-sans uppercase tracking-[0.25em] text-primary">
                Подбор отеля под ваш сценарий путешествия
              </p>
              <Button size="lg" onClick={scrollToQuiz} className="gap-2">
                Подобрать отель <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="mt-10 h-px w-24 bg-primary/70" />
          </div>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Подбор отеля" }, { label: "Бали" }]} />

      {/* Club Advantage */}
      <section className="py-16 md:py-24 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="font-serif text-3xl md:text-4xl">
            Почему отель через Travel Club Alladin — не то же самое, что бронирование на агрегаторе
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: Lock, title: "Знаем виллы изнутри", text: "Наш менеджер лично была в большинстве resort'ов Улувату, Семиньяка и Убуда, расскажет о реальном уровне сервиса, не по фотографиям." },
            { icon: Sparkles, title: "Сценарий, а не каталог", text: "Подбираем под цель поездки: серф, йога, медовый месяц, семья с детьми — а не «4 звезды у моря»." },
            { icon: BadgePercent, title: "Цена не выше прямого бронирования", text: "Работаем через клубные тарифы операторов, часто с бонусами (трансфер, ужин, апгрейд)." },
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

      {/* Regions */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <p className="text-xs font-sans uppercase tracking-widest text-primary">Регионы Бали — где остановиться</p>
            <h2 className="font-serif text-3xl md:text-5xl">Шесть лиц одного острова</h2>
            <p className="text-foreground/70">
              У каждого района Бали — свой характер. От серфовой энергии Чангу до тишины рисовых полей Убуда.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {REGIONS.map((r) => (
              <div key={r.name} className="bg-card border border-border overflow-hidden flex flex-col">
                <img src={r.img} alt={r.name} className="w-full h-48 object-cover" />
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
          <p className="text-xs font-sans uppercase tracking-widest text-primary">Сценарии</p>
          <h2 className="font-serif text-3xl md:text-5xl">За каким Бали вы едете?</h2>
          <p className="text-foreground/70">Восемь сценариев, под которые мы подбираем виллу и регион.</p>
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
                Подходит → пройти квиз
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
            <h2 className="font-serif text-3xl md:text-5xl">6 вопросов — и мы подберём вам три варианта</h2>
            <p className="text-foreground/70">
              Менеджер Виктория свяжется в течение 2 часов в рабочее время и пришлёт подборку с фото, ценами и нашими комментариями.
            </p>
          </div>
          <HotelQuiz presetScenario={presetScenario} variant="bali" />
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
              src="https://placehold.co/400x500/faf8f5/1a2942?text=Victoria"
              alt="Виктория Цой"
              className="w-40 h-48 md:w-48 md:h-56 object-cover border border-border mx-auto"
            />
            <div className="space-y-4">
              <p className="text-xs font-sans uppercase tracking-widest text-muted-foreground">
                Менеджер по подбору отелей и круизов
              </p>
              <h3 className="font-serif text-3xl">Виктория</h3>
              <p className="text-foreground/70 leading-relaxed">
                Лично знает виллы Улувату, Семиньяка, Чангу и Убуда. Подберёт вариант под характер вашей поездки, а не из общего каталога.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="tel:+79147051705">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Phone className="w-4 h-4" /> Позвонить
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

export default BaliHotelsPage;
