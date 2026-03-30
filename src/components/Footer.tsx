import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Подписка оформлена", description: "Вы будете получать наши лучшие предложения" });
    setEmail("");
  };

  return (
    <footer className="border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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

          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">Подписка на спецпредложения</h4>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                placeholder="Ваш email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-card/50 border-border/50 focus:border-primary h-11 font-sans"
              />
              <button
                type="submit"
                className="bg-gold-gradient text-primary-foreground px-6 h-11 text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                OK
              </button>
            </form>
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
