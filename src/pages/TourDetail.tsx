import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useTours } from "@/lib/useTours";
import { Calendar, Moon, MapPin, Ship, Banknote, Route, Check, X, Compass, Globe, Users, ArrowUpRight, Mountain, Feather, Briefcase, HeartPulse, Binoculars, Waves } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTourById, regionToBreadcrumb, categoryToBreadcrumb, regionToContinent } from "@/data/tours";
import { findLinerByShipName } from "@/data/liners";
import SimilarTours from "@/components/SimilarTours";
import { tourRoutes } from "@/data/tourRoutes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourBookingForm from "@/components/TourBookingForm";
import RouteMap from "@/components/RouteMap";
import FAQSection from "@/components/FAQSection";
import SpecialOffers from "@/components/SpecialOffers";
import NewsletterSocial from "@/components/NewsletterSocial";
import Breadcrumbs from "@/components/Breadcrumbs";
import TourManagerCard from "@/components/TourManagerCard";
import ExpeditionManagerCard from "@/components/ExpeditionManagerCard";

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  // Сначала берём тур из базы (чтобы правки из админки были видны), иначе — из кода.
  const { data: apiTour } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => api.getTour(id!),
    enabled: !!id,
    retry: false,
  });
  // Кэш всех туров (из localStorage) — даёт правильное фото мгновенно при обновлении,
  // без вспышки старого из кода.
  const { data: allTours } = useTours();
  const fromCache = (allTours || []).find((t: any) => t.id === id);
  const tour: any = apiTour || fromCache || getTourById(id || "");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [selectedHotel, setSelectedHotel] = useState<string>("");
  const [selectedExcursion, setSelectedExcursion] = useState<string>("");
  const [selectedCabin, setSelectedCabin] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedGroupGH, setSelectedGroupGH] = useState<string>("");
  const [selectedHotelGH, setSelectedHotelGH] = useState<string>("");
  const [selectedOccupancyHotel, setSelectedOccupancyHotel] = useState<string>("");
  const isCruise = tour?.name.toLowerCase().includes("круиз");

  useEffect(() => {
    window.scrollTo(0, 0);
    setGalleryIndex(0);
  }, [id, apiTour]);
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
      <section className="relative h-[72vh] md:h-[88vh] overflow-hidden">
        <img
          src={tour.gallery[galleryIndex]}
          alt={tour.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className={`absolute inset-0 flex flex-col justify-end pb-12 md:pb-20 container mx-auto px-6 ${tour.heroTextAlign === "right" ? "items-end" : "items-start"}`}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.8 }}
            style={{ color: tour.heroTextColor || "#ffffff" }}
            className={`[text-shadow:0_2px_14px_rgba(0,0,0,0.8)] ${tour.heroTextAlign === "right" ? "text-right" : ""}`}>
            <span className="block text-primary text-sm font-sans uppercase tracking-[0.3em] mb-3">
              {tour.region} · {tour.days} дней
            </span>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-tight max-w-3xl">
              {tour.name}
            </h1>
            <p className="font-serif text-lg md:text-xl italic mt-4 max-w-2xl opacity-80">
              {tour.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Thumbnail strip */}
      <div className="container mx-auto px-6 mt-4">
        <div className="grid grid-cols-5 gap-2">
          {tour.gallery.slice(0, 5).map((img, i) => (
            <button
              key={i}
              onClick={() => setGalleryIndex(i)}
              className={`aspect-[16/9] overflow-hidden border-2 transition-colors ${
                i === galleryIndex ? "border-primary" : "border-transparent hover:border-primary/40"
              }`}
            >
              <img src={img} alt={`${tour.name} — фото ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {(() => {
        const crumb = (tour.category && categoryToBreadcrumb[tour.category]) || regionToBreadcrumb[tour.region];
        return <Breadcrumbs items={[{ label: crumb?.label || tour.region || "Туры", href: crumb?.path || "/" }, { label: tour.name }]} />;
      })()}

      <div className="container mx-auto px-6 pt-16 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Gallery */}

            {/* Description */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-6">
                О <span className="italic text-gold-gradient">путешествии</span>
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed text-base md:text-lg">
                {tour.description.split('\n').filter(Boolean).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-8">
                Маршрут <span className="italic text-gold-gradient">по дням</span>
              </h2>
              <div className="space-y-0">
                {tour.itinerary.map((day, i) => (
                  <div
                    key={day.day}
                    className="flex gap-4 md:gap-6 group"
                  >
                    <div className="flex flex-col items-start min-w-[140px]">
                      <div className="rounded-full border border-primary/50 bg-card flex items-center justify-center px-3 py-1 text-xs text-primary font-sans shrink-0 whitespace-nowrap">
                        {typeof day.day === 'number' ? `${day.day} день` : day.day}
                      </div>
                    </div>
                    <div className="pb-8">
                      <h3 className="font-serif text-lg text-foreground">{day.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment terms */}
            {tour.paymentTerms && tour.paymentTerms.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-light mb-6">
                  Условия <span className="italic text-gold-gradient">оплаты</span>
                </h2>
                <div className="bg-card border border-border p-6 space-y-3">
                  {tour.paymentTerms.map((term) => (
                    <div key={term} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground/80 text-sm md:text-base">{term}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cancellation terms */}
            {tour.cancellationTerms && tour.cancellationTerms.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-light mb-6">
                  Условия <span className="italic text-gold-gradient">аннуляции</span>
                </h2>
                <div className="bg-card border border-border p-6 space-y-3">
                  {tour.cancellationTerms.map((term) => (
                    <div key={term} className="flex items-start gap-3">
                      <X className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-foreground/80 text-sm md:text-base">{term}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Extras */}
            {tour.extras && (
              <div className="my-[4px]">
                <h2 className="font-serif text-2xl md:text-3xl font-light mb-6">
                  <span className="italic text-gold-gradient text-lg font-serif text-primary">Дополнительно</span>
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-base md:text-lg">
                  {tour.extras.split('\n').filter(Boolean).map((paragraph, idx) => (
                    <p key={idx} className={paragraph.startsWith('!!!') ? 'text-primary font-medium text-sm' : 'text-sm'}>
                      {paragraph.startsWith('!!!') ? paragraph.replace(/^!+\s*/, '') : paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Included / Not Included */}
            <div>
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
            </div>


          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick info card */}
              <div className="bg-card border border-border p-6 space-y-5">
                <h3 className="font-serif text-lg md:text-xl font-light leading-snug">{tour.name}</h3>
                {tour.category === "expedition" && (
                  <div className="flex items-center gap-3 text-sm text-foreground/80">
                    <Compass className="w-4 h-4 text-primary shrink-0" />
                    <span>Экспедиционный круиз</span>
                  </div>
                )}
                {tour.category === "classic" && (
                  <div className="flex items-center gap-3 text-sm text-foreground/80">
                    <Ship className="w-4 h-4 text-primary shrink-0" />
                    <span>Классический круиз</span>
                  </div>
                )}
                {tour.category === "Групповой тур" && (
                  <>
                    {tour.badge === "Экскурсионный тур" && (
                      <div className="flex items-center gap-3 text-sm text-foreground/80">
                        <Compass className="w-4 h-4 text-primary shrink-0" />
                        <span>Экскурсионный тур</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <Users className="w-4 h-4 text-primary shrink-0" />
                      <span>Групповой тур</span>
                    </div>
                  </>
                )}
                {(!tour.category || (tour.category !== "expedition" && tour.category !== "classic" && tour.category !== "Групповой тур")) && (
                  <div className="flex items-center gap-3 text-sm text-foreground/80">
                    <Compass className="w-4 h-4 text-primary shrink-0" />
                    <span>Экскурсионный тур</span>
                  </div>
                )}
                {tour.isActive && (
                  <div className="flex items-center gap-3 text-sm text-foreground/80">
                    <Mountain className="w-4 h-4 text-primary shrink-0" />
                    <span>Активный тур</span>
                  </div>
                )}
                {tour.isAuthor && (
                  <div className="flex items-center gap-3 text-sm text-foreground/80">
                    <Feather className="w-4 h-4 text-primary shrink-0" />
                    <span>Авторский тур</span>
                  </div>
                )}
                {tour.isCorporate && (
                  <div className="flex items-center gap-3 text-sm text-foreground/80">
                    <Briefcase className="w-4 h-4 text-primary shrink-0" />
                    <span>Корпоративный тур</span>
                  </div>
                )}
                {tour.isWellness && (
                  <div className="flex items-center gap-3 text-sm text-foreground/80">
                    <HeartPulse className="w-4 h-4 text-primary shrink-0" />
                    <span>Оздоровительный тур</span>
                  </div>
                )}
                {tour.isSafari && (
                  <div className="flex items-center gap-3 text-sm text-foreground/80">
                    <Binoculars className="w-4 h-4 text-primary shrink-0" />
                    <span>Сафари тур</span>
                  </div>
                )}
                {tour.isDiving && (
                  <div className="flex items-center gap-3 text-sm text-foreground/80">
                    <Waves className="w-4 h-4 text-primary shrink-0" />
                    <span>Дайвинг тур</span>
                  </div>
                )}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-foreground/80">
                    <Globe className="w-4 h-4 text-primary shrink-0" />
                    <span>{tour.continent || regionToContinent[tour.region] || tour.region}</span>
                  </div>
                </div>
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
                    <span>{tour.subRegion || tour.region}</span>
                  </div>
                  {tour.shipName && (
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
                      <span className="leading-relaxed">{routePoints.map(p => p.label).join(" → ")}</span>
                    </div>
                  )}
                </div>
                {tour.russianGroup && (
                  <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.25em] text-primary font-sans">
                    <span aria-hidden className="text-base leading-none">🇷🇺</span>
                    <span>Русская группа</span>
                  </div>
                )}
              </div>

              {/* Route map */}
              <RouteMap tourId={tour.id} />

              {/* Cabin pricing */}
              {tour.cabinPricing && (() => {
                const def = tour.cabinPricing.defaultCabin
                  || tour.cabinPricing.cabins.find(c => !c.soldOut)?.name
                  || "";
                const current = selectedCabin || def;
                const cabin = tour.cabinPricing.cabins.find(c => c.name === current);
                return (
                  <div className="bg-card border border-border p-4 space-y-3">
                    <div>
                      <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground mb-1">Стоимость кают</h4>
                      {tour.cabinPricing.note && (
                        <p className="text-xs text-muted-foreground">{tour.cabinPricing.note}</p>
                      )}
                    </div>
                    <Select value={current} onValueChange={setSelectedCabin}>
                      <SelectTrigger className="w-full bg-background border-border text-foreground">
                        <SelectValue placeholder="Выбрать каюту" />
                      </SelectTrigger>
                      <SelectContent>
                        {tour.cabinPricing.cabins.map(c => (
                          <SelectItem
                            key={c.name}
                            value={c.name}
                            disabled={c.soldOut}
                            className={c.soldOut ? "opacity-50" : ""}
                          >
                            <span>{c.name}</span>
                            {c.soldOut
                              ? <span className="ml-2 text-muted-foreground">— продано</span>
                              : c.price && <span className="ml-2 text-primary">— {c.price}</span>}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {cabin?.price && (
                      <div className="font-serif text-3xl text-primary pt-1">{cabin.price}</div>
                    )}
                    {tour.cabinPricing.footnote && (
                      <p className="text-[11px] text-muted-foreground leading-snug">{tour.cabinPricing.footnote}</p>
                    )}
                  </div>
                );
              })()}

              {tour.shipName && tour.shipImage && (() => {
                const linerForShip = findLinerByShipName(tour.shipName);
                const inner = (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Ship className="w-3.5 h-3.5 text-primary" />
                        {tour.shipName}
                      </h4>
                      {linerForShip && (
                        <span
                          className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          title="Открыть страницу лайнера"
                          aria-label="Открыть страницу лайнера"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                    <div className="aspect-[16/10] overflow-hidden rounded-sm border border-border">
                      <img
                        src={tour.shipImage}
                        alt={tour.shipName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    {linerForShip && (
                      <div className="text-[11px] uppercase tracking-[0.2em] text-primary group-hover:underline">
                        Подробнее о лайнере →
                      </div>
                    )}
                  </>
                );
                return linerForShip ? (
                  <Link
                    to={`/liner/${linerForShip.slug}`}
                    className="group block bg-card border border-border hover:border-primary hover:bg-primary/[0.03] hover:shadow-md transition-all p-4 space-y-3 cursor-pointer"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="bg-card border border-border p-4 space-y-3">{inner}</div>
                );
              })()}


              {/* Occupancy pricing (per-person by room occupancy) */}
              {tour.occupancyPricing && (
                <div className="bg-card border border-border p-4 space-y-3">
                  <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground">Стоимость тура на 1 человека</h4>
                  {(() => {
                    const op = tour.occupancyPricing!;
                    if ("hotels" in op) {
                      const current = op.hotels.find(h => h.label === selectedOccupancyHotel) || op.hotels.find(h => h.label === op.defaultHotel) || op.hotels[0];
                      return (
                        <>
                          <Select value={current.label} onValueChange={setSelectedOccupancyHotel}>
                            <SelectTrigger className="w-full bg-background border-border text-foreground">
                              <SelectValue placeholder="Выберите категорию" />
                            </SelectTrigger>
                            <SelectContent>
                              {op.hotels.map(h => (
                                <SelectItem key={h.label} value={h.label}>{h.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="space-y-2 pt-1">
                            {current.rows.map((row) => (
                              <div key={row.label} className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{row.label}</span>
                                <span className="text-foreground font-medium">{row.price}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    }
                    return (
                      <div className="space-y-2 pt-1">
                        {op.rows.map((row) => (
                          <div key={row.label} className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{row.label}</span>
                            <span className="text-foreground font-medium">{row.price}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Hotel pricing table */}
              {tour.hotelPricing && (
                <div className="bg-card border border-border p-4 space-y-3">
                  <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground">СТОИМОСТЬ ТУРА НА 1 ЧЕЛОВЕКА</h4>
                  <Select value={selectedHotel || tour.hotelPricing.rows[0]?.hotel} onValueChange={setSelectedHotel}>
                    <SelectTrigger className="w-full bg-background border-border text-foreground">
                      <SelectValue placeholder="Выберите отель" />
                    </SelectTrigger>
                    <SelectContent>
                      {tour.hotelPricing.rows.map((row) => (
                        <SelectItem key={row.hotel} value={row.hotel}>
                          {row.hotel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {(() => {
                    const hotel = selectedHotel || tour.hotelPricing!.rows[0]?.hotel;
                    const row = tour.hotelPricing!.rows.find(r => r.hotel === hotel);
                    if (!row) return null;
                    return (
                      <div className="space-y-2 pt-1">
                        {tour.hotelPricing!.categories.map((cat, i) => (
                          <div key={cat} className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{cat}</span>
                            <span className="text-foreground font-medium">{row.prices[i]}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Excursion pricing */}
              {tour.excursionPricing && (
                <div className="bg-card border border-border p-4 space-y-3">
                  <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground">СТОИМОСТЬ ДОП. ЭКСКУРСИЙ</h4>
                  <Select value={selectedExcursion || tour.excursionPricing.excursions[0]?.name} onValueChange={setSelectedExcursion}>
                    <SelectTrigger className="w-full bg-background border-border text-foreground">
                      <SelectValue placeholder="Выберите экскурсию" />
                    </SelectTrigger>
                    <SelectContent>
                      {tour.excursionPricing.excursions.map((exc) => (
                        <SelectItem key={exc.name} value={exc.name}>
                          {exc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {(() => {
                    const excName = selectedExcursion || tour.excursionPricing!.excursions[0]?.name;
                    const exc = tour.excursionPricing!.excursions.find(e => e.name === excName);
                    if (!exc) return null;
                    return (
                      <div className="space-y-2 pt-1">
                        {exc.prices.map((p) => (
                          <div key={p.label} className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{p.label}</span>
                            <span className="text-foreground font-medium">{p.value}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}
              {/* Group pricing (per group size) */}
              {tour.groupPricing && (() => {
                const def = tour.groupPricing.defaultGroup || tour.groupPricing.groups[0]?.label;
                const current = selectedGroup || def;
                const group = tour.groupPricing.groups.find(g => g.label === current);
                return (
                  <div className="bg-card border border-border p-4 space-y-3">
                    <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground">
                      {tour.groupPricing.title || "Стоимость тура на 1 человека"}
                    </h4>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Размер группы</label>
                      <Select value={current} onValueChange={setSelectedGroup}>
                        <SelectTrigger className="w-full bg-background border-border text-foreground">
                          <SelectValue placeholder="Выберите размер группы" />
                        </SelectTrigger>
                        <SelectContent>
                          {tour.groupPricing.groups.map(g => (
                            <SelectItem key={g.label} value={g.label}>{g.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {group && (
                      <div className="space-y-2 pt-1">
                        {group.rows.map(row => {
                          const isDash = row.price.trim() === "—" || row.price.trim() === "-";
                          return (
                            <div key={row.label} className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">{row.label}</span>
                              <span className={isDash ? "text-muted-foreground/50" : "text-foreground font-medium"}>{row.price}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })()}
              {/* Group + hotel pricing (two selectors) */}
              {tour.groupHotelPricing && (() => {
                const gh = tour.groupHotelPricing;
                const defGroup = gh.defaultGroup || gh.groups[0]?.label;
                const defHotel = gh.defaultHotel || gh.hotels[0];
                const curGroup = selectedGroupGH || defGroup;
                const curHotel = selectedHotelGH || defHotel;
                const grp = gh.groups.find(g => g.label === curGroup);
                return (
                  <div className="bg-card border border-border p-4 space-y-3">
                    <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground">
                      {gh.title || "Стоимость тура на 1 человека"}
                    </h4>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Размер группы</label>
                      <Select value={curGroup} onValueChange={setSelectedGroupGH}>
                        <SelectTrigger className="w-full bg-background border-border text-foreground">
                          <SelectValue placeholder="Выберите размер группы" />
                        </SelectTrigger>
                        <SelectContent>
                          {gh.groups.map(g => (
                            <SelectItem key={g.label} value={g.label}>{g.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Категория отеля</label>
                      <div className="flex gap-2">
                        {gh.hotels.map(h => {
                          const active = h === curHotel;
                          return (
                            <button
                              key={h}
                              type="button"
                              onClick={() => setSelectedHotelGH(h)}
                              className={`flex-1 px-3 py-2 text-xs border transition-colors ${
                                active
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-background text-foreground border-border hover:border-primary/50"
                              }`}
                            >
                              {h}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {grp && (
                      <div className="space-y-2 pt-1">
                        {grp.rows ? (
                          grp.rows.map(r => {
                            const v = r.pricesByHotel[curHotel];
                            const isDash = !v || v.trim() === "—" || v.trim() === "-";
                            return (
                              <div key={r.label} className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{r.label}</span>
                                <span className={isDash ? "text-muted-foreground/50" : "text-foreground font-medium"}>{v || "—"}</span>
                              </div>
                            );
                          })
                        ) : (
                          <>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">{gh.twinLabel || "Двухместный (½ TWIN)"}</span>
                              <span className="text-foreground font-medium">{grp.twinByHotel?.[curHotel]}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">{gh.sglLabel || "Доплата за SGL"}</span>
                              <span className="text-foreground font-medium">{gh.sglByHotel[curHotel]}</span>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}
              {/* Booking form */}
              <TourBookingForm tourName={tour.name} startDates={tour.startDates} cabins={tour.cabinPricing?.cabins.map(c => c.name)} />
              {(tour.region === "Япония" || tour.region === "Южная Корея")
                ? <TourManagerCard />
                : <ExpeditionManagerCard />}
            </div>
          </div>
        </div>
      </div>

      <FAQSection isCruise={isCruise} customFaq={tour.faq} />

      {/* Similar Tours — full width */}
      <SimilarTours currentTour={tour} />
      <SpecialOffers excludeTourId={tour.id} />


      <NewsletterSocial />
      <Footer />
    </div>
  );
};

export default TourDetail;
