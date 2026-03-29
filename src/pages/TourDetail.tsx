import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Calendar, Moon, MapPin, Ship, Banknote, Route, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTourById } from "@/data/tours";
import { tourRoutes } from "@/data/tourRoutes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourBookingForm from "@/components/TourBookingForm";
import RouteMap from "@/components/RouteMap";

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const tour = getTourById(id || "");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const isCruise = tour?.name.toLowerCase().includes("круиз");
  const routePoints = tour ? tourRoutes[tour.id] : undefined;

  if (!tour) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6">
        <h1 className="font-serif text-4xl">Тур не найден</h1>
        <Link to="/" className="text-primary hover:underline">← На главную</Link>
      </div>
    );
  }

  const prevImage = () => setGalleryIndex((i) => (i === 0 ? tour.gallery.length - 1 : i - 1));
  const nextImage = () => setGalleryIndex((i) => (i === tour.gallery.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={tour.image}
          alt={tour.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-overlay" />
        <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-20 container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.8 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> На главную
            </Link>
            <span className="block text-primary text-sm font-sans uppercase tracking-[0.3em] mb-3">
              {tour.region} · {tour.days} дней
            </span>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-tight max-w-3xl">
              {tour.name}
            </h1>
            <p className="font-serif text-lg md:text-xl text-foreground/70 italic mt-4 max-w-2xl">
              {tour.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Gallery */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.6 }}>
              <div className="relative aspect-[16/9] overflow-hidden group">
                <img
                  src={tour.gallery[galleryIndex]}
                  alt={`${tour.name} — фото ${galleryIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/60 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/60 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {tour.gallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIndex(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${i === galleryIndex ? "bg-primary" : "bg-foreground/40"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {tour.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIndex(i)}
                    className={`aspect-[16/9] overflow-hidden border-2 transition-colors ${i === galleryIndex ? "border-primary" : "border-transparent"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.6 }}>
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-6">
                О <span className="italic text-gold-gradient">путешествии</span>
              </h2>
              <p className="text-foreground/80 leading-relaxed text-base md:text-lg">{tour.description}</p>
            </motion.div>

            {/* Itinerary */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.6 }}>
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-8">
                Маршрут <span className="italic text-gold-gradient">по дням</span>
              </h2>
              <div className="space-y-0">
                {tour.itinerary.map((day, i) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.03 * i, duration: 0.4 }}
                    className="flex gap-4 md:gap-6 group"
                  >
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full border border-primary/50 bg-card flex items-center justify-center text-xs text-primary font-sans shrink-0">
                        {day.day}
                      </div>
                      {i < tour.itinerary.length - 1 && (
                        <div className="w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="pb-8">
                      <h3 className="font-serif text-lg text-foreground">{day.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{day.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Included / Not Included */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.6 }}>
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-8">
                Что <span className="italic text-gold-gradient">включено</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h3 className="text-sm font-sans uppercase tracking-widest text-primary mb-4">Включено</h3>
                  {tour.included.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-sans uppercase tracking-widest text-muted-foreground mb-4">Не включено</h3>
                  {tour.notIncluded.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <X className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick info card */}
              <div className="bg-card border border-border p-6 space-y-5">
                <h3 className="font-serif text-lg md:text-xl font-light leading-snug">{tour.name}</h3>
                <div>
                  <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground mb-3">{isCruise ? "Дата круиза" : "Дата тура"}</h4>
                  <Select>
                    <SelectTrigger className="w-full bg-background border-border text-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <SelectValue placeholder="Выберите дату" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {tour.startDates.map((date) => (
                        <SelectItem key={date} value={date}>
                          {date}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-foreground/80">
                    <Moon className="w-4 h-4 text-primary shrink-0" />
                    <span>{tour.days} дней / {tour.days - 1} ночей</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/80">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span>{tour.region}</span>
                  </div>
                  {isCruise && tour.shipName && (
                    <div className="flex items-center gap-3 text-foreground/80">
                      <Ship className="w-4 h-4 text-primary shrink-0" />
                      <span>{tour.shipName}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-foreground/80">
                    <Banknote className="w-4 h-4 text-primary shrink-0" />
                    <span>Стоимость {tour.price}</span>
                  </div>
                  {routePoints && routePoints.length > 0 && (
                    <div className="flex items-start gap-3 text-foreground/80">
                      <Route className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{routePoints.map(p => p.label).filter((v, i, a) => a.indexOf(v) === i || i === a.length - 1).join(" → ")}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Route map */}
              <RouteMap tourId={tour.id} />

              {/* Booking form */}
              <TourBookingForm tourName={tour.name} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TourDetail;
