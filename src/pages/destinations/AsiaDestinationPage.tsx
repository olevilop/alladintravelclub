import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsletterSocial from "@/components/NewsletterSocial";
import asiaImg from "@/assets/asia.jpg";
import japanImg from "@/assets/japan-kyoto.jpg";
import chinaImg from "@/assets/china-wall.jpg";
import koreaImg from "@/assets/korea-seoul.jpg";
import nkoreaImg from "@/assets/nkorea-pyongyang.jpg";
import russiaImg from "@/assets/russia-kamchatka.jpg";
import maldivesImg from "@/assets/hero-maldives.jpg";

const regions = [
  { name: "Япония", desc: "Страна восходящего солнца", image: japanImg, link: "/japan-tours" },
  { name: "Китай", desc: "Империя тысячелетий", image: chinaImg, link: "/china-tours" },
  { name: "Южная Корея", desc: "Страна утренней свежести", image: koreaImg, link: "/korea-tours" },
  { name: "Северная Корея", desc: "Самая закрытая страна мира", image: nkoreaImg, link: "/nkorea-tours" },
  { name: "Россия", desc: "От Байкала до Камчатки", image: russiaImg, link: "/russia-tours" },
  { name: "Мальдивы", desc: "Райские острова Индийского океана", image: maldivesImg, link: "/maldives" },
];

const AsiaDestinationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src={asiaImg}
          alt="Азия"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        <div className="relative z-10 h-full flex flex-col justify-end items-start pb-12 md:pb-20 container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-6xl font-light text-white">
            Направления в <span className="italic">Азии</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl">
            Япония, Китай, Россия, Южная Корея, Мальдивы
          </p>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Азия" }]} />

      {/* Region cards */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region) => (
            <Link
              key={region.name}
              to={region.link}
              className="group relative aspect-[3/4] overflow-hidden block"
            >
              <img
                src={region.image}
                alt={region.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl text-foreground mb-1">{region.name}</h3>
                <p className="text-sm text-foreground/60 font-sans">{region.desc}</p>
                <div className="mt-3 w-8 h-[1px] bg-primary group-hover:w-16 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <NewsletterSocial />
      <Footer />
    </div>
  );
};

export default AsiaDestinationPage;
