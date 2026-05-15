import emeraldKaiaShip from "@/assets/emerald-kaia-ship.jpg";
import scenicEclipseShip from "@/assets/scenic-eclipse-ship.jpg";

export interface LinerCabin {
  name: string;
  description: string;
  image?: string;
}

export interface LinerSpec {
  label: string;
  value: string;
}

export interface Liner {
  slug: string;
  name: string;
  image: string;
  shortDescription: string;
  longDescription?: string;
  specs?: LinerSpec[];
  cabins?: LinerCabin[];
  deckPlanImage?: string;
  gallery?: string[];
}

export const liners: Liner[] = [
  {
    slug: "scenic-eclipse",
    name: "Scenic Eclipse 6*",
    image: scenicEclipseShip,
    shortDescription:
      "Дискавери-яхта класса 6* всего на 200 гостей: вертолёт, подводная лодка, 10 ресторанов и сьюты с дворецким для самых требовательных путешественников.",
  },
  {
    slug: "emerald-kaia",
    name: "Яхта Emerald Kaia",
    image: emeraldKaiaShip,
    shortDescription:
      "Новая суперъяхта Emerald Cruises всего на 100 гостей: панорамные сьюты, морская платформа с тендерами и кэмповый сервис в стиле бутик-отеля.",
  },
  {
    slug: "aqua-blu",
    name: "Aqua Blu 5*",
    image: "https://placehold.co/1600x1000/0d1b2a/e7d9b4?text=Aqua+Blu+5%2A",
    shortDescription:
      "Долгоходный экспедиционный корабль Aqua Expeditions: 15 кают-сьютов, две лаунж-зоны и индонезийская команда дайв-гидов и шеф-поваров.",
  },
  {
    slug: "scenic-spirit",
    name: "Scenic Spirit 5*",
    image: "https://placehold.co/1600x1000/0d1b2a/e7d9b4?text=Scenic+Spirit+5%2A",
    shortDescription:
      "Камерная all-inclusive яхта Scenic для круизов по Меконгу: 34 сьюта с приватными балконами, спа-пакетом и французской кухней.",
  },
  {
    slug: "century-legend",
    name: "Century Legend 5*",
    image: "https://placehold.co/1600x1000/0d1b2a/e7d9b4?text=Century+Legend+5%2A",
    shortDescription:
      "Флагман Century Cruises на Янцзы: панорамные каюты с видом на ущелья, открытый бассейн, спа и авторские лекции о китайской культуре.",
  },
  {
    slug: "arabian-pearl",
    name: "Arabian Pearl",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&auto=format&fit=crop",
    shortDescription:
      "Премиальный лайнер для маршрутов по Персидскому заливу: восточный декор интерьеров, инфинити-бассейн и приватные сьюты с террасами.",
  },
  {
    slug: "galapagos-explorer",
    name: "Galápagos Explorer",
    image:
      "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1600&auto=format&fit=crop",
    shortDescription:
      "Экспедиционная яхта для архипелага Галапагос: натуралисты-гиды на борту, программа высадок Zodiac и подводный мир в шаговой доступности.",
  },
  {
    slug: "aegean-star",
    name: "Aegean Star",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&auto=format&fit=crop",
    shortDescription:
      "Средиземноморский яхтенный лайнер: маршруты по Эгейскому морю, греческая гастрономия на борту и приватные тендеры в скрытые бухты.",
  },
];

const stripStars = (s: string) => s.replace(/\s*\d\*$/u, "").trim().toLowerCase();

export const findLinerByShipName = (shipName?: string): Liner | undefined => {
  if (!shipName) return undefined;
  const norm = stripStars(shipName);
  return liners.find(
    (l) => l.name.toLowerCase() === shipName.toLowerCase() || stripStars(l.name) === norm,
  );
};
