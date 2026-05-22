import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const tourSubLinks = [
  { label: "Япония", path: "/japan-tours" },
  { label: "Китай", path: "/china-tours" },
  { label: "Россия", path: "/russia-tours" },
  { label: "Южная Корея", path: "/korea-tours" },
  { label: "Северная Корея", path: "/nkorea-tours" },
  { label: "Мальдивы", path: "/maldives" },
];

const cruiseSubLinks = [
  { label: "Все лайнеры", path: "/cruises/liners" },
  { label: "Арктика", path: "/cruises/arctic" },
  { label: "Антарктида", path: "/cruises/antarctica" },
  { label: "Африка", path: "/cruises/africa" },
  { label: "Австралия и Океания", path: "/cruises/oceania" },
  { label: "Ближний Восток", path: "/cruises/middle-east" },
  { label: "Северная Америка", path: "/cruises/north-america" },
  { label: "Южная Америка", path: "/cruises/south-america" },
  { label: "Россия", path: "/cruises/russia" },
  { label: "Азия", path: "/cruises/asia" },
  { label: "Европа", path: "/cruises/europe" },
];

const hotelSubLinks = [
  { label: "Мальдивы", path: "/hotels/maldives" },
  { label: "Тайланд", path: "/hotels/thailand" },
];

const navLinks = [
  { label: "Бронирование авиабилетов", href: "#about" },
  { label: "Контакты", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toursExpanded, setToursExpanded] = useState(false);
  const [cruisesExpanded, setCruisesExpanded] = useState(false);
  const [hotelsExpanded, setHotelsExpanded] = useState(false);
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

  const goToTour = (path: string) => {
    setMenuOpen(false);
    setToursExpanded(false);
    setCruisesExpanded(false);
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-background border-b border-border`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
        <button onClick={() => location.pathname === "/" ? scrollTo("#hero") : navigate("/")} className="flex items-baseline gap-2">
          <span className="font-serif text-3xl md:text-4xl font-semibold tracking-wider text-gold-gradient">
            Alladin
          </span>
          <span className="font-serif text-lg md:text-xl font-medium tracking-wider text-gold-gradient">
            Travel Club
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {/* Tours dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-sans uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors duration-300 outline-none">
              Туры
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {tourSubLinks.map((link) => (
                <DropdownMenuItem
                  key={link.path}
                  onClick={() => goToTour(link.path)}
                  className="cursor-pointer"
                >
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cruises dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-sans uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors duration-300 outline-none">
              Круизы
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {cruiseSubLinks.map((link) => (
                <DropdownMenuItem
                  key={link.path}
                  onClick={() => goToTour(link.path)}
                  className="cursor-pointer"
                >
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Hotels dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-sans uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors duration-300 outline-none">
              Подбор отеля
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {hotelSubLinks.map((link) => (
                <DropdownMenuItem
                  key={link.path}
                  onClick={() => goToTour(link.path)}
                  className="cursor-pointer"
                >
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>


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
            {/* Mobile Tours with expandable sub-links */}
            <div>
              <button
                onClick={() => setToursExpanded(!toursExpanded)}
                className="flex items-center gap-1 text-sm font-sans uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors text-left py-2 w-full"
              >
                Туры
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${toursExpanded ? "rotate-180" : ""}`} />
              </button>
            {toursExpanded && (
                <div className="pl-4 flex flex-col gap-2 mt-1">
                  {tourSubLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => goToTour(link.path)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors text-left py-1"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Cruises */}
            <div>
              <button
                onClick={() => setCruisesExpanded(!cruisesExpanded)}
                className="flex items-center gap-1 text-sm font-sans uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors text-left py-2 w-full"
              >
                Круизы
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${cruisesExpanded ? "rotate-180" : ""}`} />
              </button>
              {cruisesExpanded && (
                <div className="pl-4 flex flex-col gap-2 mt-1">
                  {cruiseSubLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => goToTour(link.path)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors text-left py-1"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Hotels */}
            <div>
              <button
                onClick={() => setHotelsExpanded(!hotelsExpanded)}
                className="flex items-center gap-1 text-sm font-sans uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors text-left py-2 w-full"
              >
                Подбор отеля
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${hotelsExpanded ? "rotate-180" : ""}`} />
              </button>
              {hotelsExpanded && (
                <div className="pl-4 flex flex-col gap-2 mt-1">
                  {hotelSubLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => goToTour(link.path)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors text-left py-1"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>



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
