import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import lampLogo from "@/assets/lamp-logo.png";

const tourLinks = [
  { label: "Япония", to: "/japan-tours" },
  { label: "Китай", to: "/china-tours" },
  { label: "Россия", to: "/russia-tours" },
  { label: "Южная Корея", to: "/korea-tours" },
  { label: "Северная Корея", to: "/nkorea-tours" },
];

const footerLinks = [
  {
    title: "Программы",
    links: ["Экспедиционные круизы", "Авторские туры", "Групповые туры", "Индивидуальные туры", "Корпоративные туры"],
  },
  {
    title: "Виды туров",
    links: ["Экспедиции", "Сафари", "Круизы", "Треккинг", "Дайвинг", "Культурные туры"],
  },
  {
    title: "О нас",
    links: ["О компании", "Вопросы и ответы", "Контакты", "Наша команда"],
  },
  {
    title: "Полезное",
    links: ["Отзывы", "Спецпредложения", "Блог", "Политика конфиденциальности"],
  },
];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50">
      {/* Top section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={lampLogo} alt="Лампа Алладина" className="h-16 w-auto lamp-logo-gold" />
              <span className="font-serif text-2xl font-semibold text-gold-gradient">Travel Club Alladin</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Клуб эксклюзивных путешествий в самые уникальные и труднодоступные места планеты. Более 15 лет мы создаём незабываемые экспедиции и круизы премиум-класса.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+7 (800) 100-20-30</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>info@alladin.travel</span>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Москва, Пресненская наб., 12</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Пн–Пт: 10:00–19:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle section — nav links */}
      <div className="border-t border-b border-border/30">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div>
              <h4 className="font-sans text-xs uppercase tracking-widest font-bold text-foreground mb-4">
                Туры
              </h4>
              <ul className="space-y-2">
                {tourLinks.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <span className="text-primary mr-1.5">›</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="font-sans text-xs uppercase tracking-widest font-bold text-foreground mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button className="text-sm text-muted-foreground hover:text-primary transition-colors text-left">
                        <span className="text-primary mr-1.5">›</span>
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Travel Club Alladin. Все права защищены.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <Link to="/privacy" className="hover:text-primary transition-colors">Политика конфиденциальности</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Условия использования</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
