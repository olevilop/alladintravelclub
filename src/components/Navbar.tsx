import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import lampLogo from "@/assets/lamp-logo.png";

const navLinks = [
  { label: "Туры", href: "#tours" },
  { label: "Круизы", href: "#destinations" },
  { label: "Спецпредложения", href: "/special-offers" },
  { label: "Бронирование авиабилетов", href: "#about" },
  { label: "Контакты", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (!href.startsWith("#")) {
      navigate(href);
      return;
    }
    if (location.pathname !== "/") {
      navigate("/" + href);
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-background border-b border-border`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
        <button onClick={() => location.pathname === "/" ? scrollTo("#hero") : navigate("/")} className="flex items-center gap-2">
          <img src={lampLogo} alt="Лампа Алладина" className="h-24 w-auto lamp-logo-gold" />
          <span className="font-serif text-2xl font-semibold tracking-wider text-gold-gradient">
            Travel Club Alladin
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-sans uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-foreground/70 hover:text-primary transition-colors">
            <ShoppingCart size={20} />
          </button>
          <button className="text-foreground/70 hover:text-primary transition-colors">
            <User size={20} />
          </button>
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-sans uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors text-left py-2"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
