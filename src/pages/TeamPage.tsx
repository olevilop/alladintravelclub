import { useEffect } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSocial from "@/components/NewsletterSocial";
import Breadcrumbs from "@/components/Breadcrumbs";

const team = [
  {
    name: "Виктория",
    role: "Эксперт по экспедиционным круизам и отелям премиум-класса",
    photo: "https://placehold.co/600x750/faf8f5/a57d37?text=Виктория",
    description:
      "Более 10 лет в индустрии путешествий. Специализируется на круизных линиях Silversea, Regent, Seabourn и подборе курортных отелей категории 5★+ на Мальдивах, в Таиланде и на Бали. Лично инспектировала более 200 отелей и круизных судов.",
    motto: "Путешествие должно начинаться с предвкушения, а заканчиваться желанием вернуться.",
    phone: "+7 (914) 705-17-05",
    phoneLink: "tel:+79147051705",
    email: "tsoivika@alladin-club.ru",
    whatsapp: "https://wa.me/79147051705",
    telegram: "https://t.me/tsoivika",
  },
  {
    name: "Мария",
    role: "Эксперт по классическим круизам и подбору индивидуального тура",
    photo: "https://placehold.co/600x750/faf8f5/a57d37?text=Мария",
    description:
      "Заглушка описания — заменим позже. 3–5 предложений о бэкграунде, направлениях, авторских маршрутах.",
    motto: "Лучший маршрут — тот, который придуман под вас.",
    phone: "+7 (902) 522-83-22",
    phoneLink: "tel:+79025228322",
    email: "maria@alladin-club.ru",
    whatsapp: "https://wa.me/79025228322",
    telegram: "https://t.me/marizavse",
  },
  {
    name: "Елена",
    role: "Эксперт по азиатским направлениям и групповым турам",
    photo: "https://placehold.co/600x750/faf8f5/a57d37?text=Елена",
    description: "Заглушка — заменим позже.",
    motto: "Каждая страна раскрывается тому, кто умеет слушать.",
    phone: "+7 (902) 524-06-53",
    phoneLink: "tel:+79025240653",
    email: "elena@alladin-club.ru",
    whatsapp: "https://wa.me/79025240653",
    telegram: "https://t.me/travelredfox",
  },
  {
    name: "Юля",
    role: "Эксперт по Тайланду и Вьетнаму",
    photo: "https://placehold.co/600x750/faf8f5/a57d37?text=Юля",
    description: "Заглушка — заменим позже.",
    motto: "Клуб — это про людей, а не про маршруты.",
    phone: "+7 (914) 711-02-07",
    phoneLink: "tel:+79147110207",
    email: "uliya@alladin-club.ru",
    whatsapp: "https://wa.me/79147110207",
    telegram: "https://t.me/agent_tour",
  },
];

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <div className="pt-28 md:pt-32">
        <div className="container mx-auto px-6">
          <Breadcrumbs items={[{ label: "Наша команда" }]} />
        </div>

        <header className="container mx-auto px-6 pt-8 pb-12 md:pt-10 md:pb-16 text-center max-w-3xl">
          <span className="text-primary text-sm font-sans uppercase tracking-[0.3em]">
            Контакты
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-light text-foreground mt-4">
            <span className="italic text-gold-gradient">Наша</span> команда
          </h1>
          <p className="mt-6 text-muted-foreground font-sans leading-relaxed">
            Профессионалы, которые знают каждый маршрут лично и подберут
            путешествие, отвечающее именно вашим ожиданиям.
          </p>
        </header>

        <div className="container mx-auto px-6 pb-20 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {team.map((m) => (
              <article
                key={m.name}
                className="bg-card border border-border/60 overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground">
                    {m.name}
                  </h2>
                  <p className="mt-2 text-primary text-xs font-sans uppercase tracking-[0.2em]">
                    {m.role}
                  </p>
                  <p className="mt-5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                    {m.description}
                  </p>
                  <blockquote className="mt-5 pl-4 border-l-2 border-primary/60 font-serif italic text-foreground/80 text-base md:text-lg leading-snug">
                    «{m.motto}»
                  </blockquote>

                  <div className="mt-6 pt-5 border-t border-border/60 space-y-3">
                    <a
                      href={m.phoneLink}
                      className="flex items-center gap-3 text-sm text-foreground/80 hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      <span>{m.phone}</span>
                    </a>
                    <a
                      href={`mailto:${m.email}`}
                      className="flex items-center gap-3 text-sm text-foreground/80 hover:text-primary transition-colors break-all"
                    >
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      <span>{m.email}</span>
                    </a>
                    <a
                      href={m.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-foreground/80 hover:text-primary transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={m.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-foreground/80 hover:text-primary transition-colors"
                    >
                      <TelegramIcon className="w-4 h-4 text-primary shrink-0" />
                      <span>Telegram</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <NewsletterSocial />
      <Footer />
    </div>
  );
};

export default TeamPage;
