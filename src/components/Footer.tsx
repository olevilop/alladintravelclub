import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <span className="font-serif text-2xl font-semibold text-gold-gradient">TERRA ELITE</span>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Клуб эксклюзивных путешествий в самые уникальные и труднодоступные места планеты.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">Контакты</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@terraelite.ru</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Москва, Пресненская наб., 12</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Terra Elite. Все права защищены.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">Политика конфиденциальности</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
