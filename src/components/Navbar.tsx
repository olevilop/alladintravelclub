import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "О нас", href: "#about" },
  { label: "Направления", href: "#destinations" },
  { label: "Туры", href: "#tours" },
  { label: "Преимущества", href: "#why-us" },
  { label: "Отзывы", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
        <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2">
          <span className="font-serif text-2xl font-semibold tracking-wider text-gold-gradient">
            TERRA ELITE
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
          <button
            onClick={() => scrollTo("#contact")}
            className="bg-gold-gradient text-primary-foreground px-6 py-2.5 text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Оставить заявку
          </button>
        </nav>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
            <button
              onClick={() => scrollTo("#contact")}
              className="bg-gold-gradient text-primary-foreground px-6 py-3 text-sm font-medium uppercase tracking-wider mt-2"
            >
              Оставить заявку
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
