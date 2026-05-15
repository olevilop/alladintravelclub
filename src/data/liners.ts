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
  longDescription?: string[];
  specs?: LinerSpec[];
  cabins?: LinerCabin[];
  deckPlanImage?: string;
  gallery?: string[];
}

const placeholder = (label: string, w = 1600, h = 1000) =>
  `https://placehold.co/${w}x${h}/0d1b2a/e7d9b4?text=${encodeURIComponent(label)}`;

export const liners: Liner[] = [
  {
    slug: "scenic-eclipse",
    name: "Scenic Eclipse 6*",
    image: scenicEclipseShip,
    shortDescription:
      "Дискавери-яхта класса 6* всего на 200 гостей: вертолёт, подводная лодка, 10 ресторанов и сьюты с дворецким для самых требовательных путешественников.",
    longDescription: [
      "Scenic Eclipse — первая в мире дискавери-яхта класса 6*, созданная для тех, кто хочет соединить экспедицию в самые удалённые уголки планеты с уровнем сервиса лучших отелей мира. На борту всего 200 гостей (228 в неполярных рейсах) и 172 члена экипажа — соотношение, недостижимое в классическом круизном флоте.",
      "Яхта оснащена двумя вертолётами Airbus H130 и подводной лодкой Scenic Neptune на шесть пассажиров — гости спускаются на 300 метров под воду и поднимаются над ледниками в одном путешествии. Десять ресторанов авторской кухни, спа Senses на двух палубах, обсерватория и приватный дворецкий в каждом сьюте делают каждый день не похожим на предыдущий.",
      "Маршруты Scenic Eclipse покрывают Антарктиду, Арктику, Северо-Западный проход, Японию, Средиземноморье и тихоокеанские архипелаги. Ледовый класс 1A Super, динамическое позиционирование и стабилизаторы Scenic нового поколения позволяют входить в самые неспокойные воды без потери комфорта.",
    ],
    specs: [
      { label: "Год постройки", value: "2019" },
      { label: "Длина", value: "168 м" },
      { label: "Гостей", value: "200 (228)" },
      { label: "Экипаж", value: "172" },
      { label: "Кают", value: "114 сьютов" },
      { label: "Ледовый класс", value: "1A Super" },
      { label: "Флаг", value: "Багамы" },
      { label: "Языки гидов", value: "EN, RU по запросу" },
    ],
    cabins: [
      {
        name: "Discovery Suite",
        description:
          "44 м² с приватным балконом, гостиной зоной и панорамным окном. Базовая категория, но с дворецким и линейкой L'Occitane в стандарте.",
        image: placeholder("Discovery Suite"),
      },
      {
        name: "Spa Suite",
        description:
          "Сьюты на спа-палубе с прямым доступом к термальным зонам и приватной джакузи на балконе.",
        image: placeholder("Spa Suite"),
      },
      {
        name: "Owner's Penthouse",
        description:
          "240 м² двух-уровневых апартаментов: спальня с гардеробной, библиотека, столовая на 8 персон и приватная терраса с подогреваемой ванной.",
        image: placeholder("Owner's Penthouse"),
      },
    ],
    deckPlanImage: placeholder("Deck Plan — Scenic Eclipse", 1800, 1100),
    gallery: [
      scenicEclipseShip,
      placeholder("Observation Lounge"),
      placeholder("Helicopter Deck"),
      placeholder("Submarine Bay"),
      placeholder("Senses Spa"),
      placeholder("Lumière Restaurant"),
    ],
  },
  {
    slug: "emerald-kaia",
    name: "Яхта Emerald Kaia",
    image: emeraldKaiaShip,
    shortDescription:
      "Новая суперъяхта Emerald Cruises всего на 100 гостей: панорамные сьюты, морская платформа с тендерами и кэмповый сервис в стиле бутик-отеля.",
    longDescription: [
      "Emerald Kaia — вторая суперъяхта линейки Emerald Yacht Cruises, спроектированная как плавучий бутик-отель Средиземноморья и Адриатики. На борту 50 кают для 100 гостей и команда из 70 человек, обеспечивающая сервис уровня пятизвёздочного резорта.",
      "Главная фишка — морская платформа в корме с парком тендеров, паддл-бордов, каяков и e-foil. Каждое утро яхта выходит на якорь в скрытой бухте, недоступной большим круизным судам. Бассейн с подогревом, инфинити-джакузи и спа Aqua довершают курортный опыт.",
      "Маршруты Emerald Kaia — Хорватия, Греция, Турция, Сицилия и Французская Ривьера. Ужины на открытой палубе, кулинарные мастер-классы с местными шефами и приватные экскурсии в сопровождении кураторов делают каждый порт частью большой авторской программы.",
    ],
    specs: [
      { label: "Год постройки", value: "2024" },
      { label: "Длина", value: "110 м" },
      { label: "Гостей", value: "100" },
      { label: "Экипаж", value: "70" },
      { label: "Кают", value: "50 сьютов" },
      { label: "Бассейнов", value: "2 + джакузи" },
      { label: "Флаг", value: "Мальта" },
      { label: "Языки гидов", value: "EN, IT, RU" },
    ],
    cabins: [
      {
        name: "Yacht Suite",
        description:
          "32 м² с французским балконом, кинг-сайз кроватью и мраморной ванной комнатой.",
        image: placeholder("Yacht Suite"),
      },
      {
        name: "Panorama Balcony Suite",
        description:
          "Угловые сьюты с панорамным остеклением и приватной террасой с шезлонгами.",
        image: placeholder("Panorama Suite"),
      },
      {
        name: "Owner's Suite",
        description:
          "85 м²: отдельная гостиная, гардеробная, ванная с видом на море и батлер-сервис 24/7.",
        image: placeholder("Owner's Suite"),
      },
    ],
    deckPlanImage: placeholder("Deck Plan — Emerald Kaia", 1800, 1100),
    gallery: [
      emeraldKaiaShip,
      placeholder("Marina Platform"),
      placeholder("Sky Bar"),
      placeholder("Pool Deck"),
      placeholder("Aqua Spa"),
      placeholder("La Cucina Restaurant"),
    ],
  },
  {
    slug: "aqua-blu",
    name: "Aqua Blu 5*",
    image: placeholder("Aqua Blu 5*"),
    shortDescription:
      "Долгоходный экспедиционный корабль Aqua Expeditions: 15 кают-сьютов, две лаунж-зоны и индонезийская команда дайв-гидов и шеф-поваров.",
    longDescription: [
      "Aqua Blu — переоборудованный британский разведывательный корабль 1968 года, превращённый в роскошную экспедиционную яхту на 30 гостей. Aqua Expeditions сохранила силуэт оригинального судна и добавила интерьеры от дизайнера Cor D. Rover.",
      "Маршруты — Индонезийский архипелаг: Раджа Ампат, Комодо, Альр и Молуккские острова. На борту команда натуралистов, дайв-инструкторов PADI и индонезийский шеф с авторской программой.",
    ],
    specs: [
      { label: "Год переоборудования", value: "2019" },
      { label: "Длина", value: "60 м" },
      { label: "Гостей", value: "30" },
      { label: "Экипаж", value: "29" },
      { label: "Кают", value: "15 сьютов" },
      { label: "Дайв-станция", value: "PADI 5*" },
    ],
    cabins: [
      { name: "Ocean View Suite", description: "Сьюты на главной палубе с панорамными окнами.", image: placeholder("Ocean View Suite") },
      { name: "Premium Suite", description: "Расширенные сьюты с гостиной зоной и приватной террасой.", image: placeholder("Premium Suite") },
      { name: "Owner's Suite", description: "Двухкомнатный сьют на верхней палубе с приватной джакузи.", image: placeholder("Owner's Suite") },
    ],
    deckPlanImage: placeholder("Deck Plan — Aqua Blu", 1800, 1100),
    gallery: [placeholder("Aqua Blu 1"), placeholder("Aqua Blu 2"), placeholder("Aqua Blu 3"), placeholder("Aqua Blu 4")],
  },
  {
    slug: "scenic-spirit",
    name: "Scenic Spirit 5*",
    image: placeholder("Scenic Spirit 5*"),
    shortDescription:
      "Камерная all-inclusive яхта Scenic для круизов по Меконгу: 34 сьюта с приватными балконами, спа-пакетом и французской кухней.",
    longDescription: [
      "Scenic Spirit — флагман Scenic на реке Меконг, построенный специально для маршрутов Камбоджа — Вьетнам. Просторные сьюты от 23 м², три ресторана, спа и кинотеатр на верхней палубе.",
      "Все экскурсии, напитки премиум-класса и сервис дворецкого включены в стоимость. Команда насчитывает 56 человек на 68 гостей.",
    ],
    specs: [
      { label: "Год постройки", value: "2016" },
      { label: "Длина", value: "84 м" },
      { label: "Гостей", value: "68" },
      { label: "Экипаж", value: "56" },
      { label: "Кают", value: "34 сьюта" },
      { label: "Маршруты", value: "Меконг" },
    ],
    cabins: [
      { name: "Balcony Suite", description: "23 м² с французским балконом и видом на реку.", image: placeholder("Balcony Suite") },
      { name: "Junior Balcony Suite", description: "Расширенный сьют с гостиной зоной.", image: placeholder("Junior Suite") },
      { name: "Royal Panorama Suite", description: "65 м² с приватной террасой и джакузи.", image: placeholder("Royal Suite") },
    ],
    deckPlanImage: placeholder("Deck Plan — Scenic Spirit", 1800, 1100),
    gallery: [placeholder("Scenic Spirit 1"), placeholder("Scenic Spirit 2"), placeholder("Scenic Spirit 3"), placeholder("Scenic Spirit 4")],
  },
  {
    slug: "century-legend",
    name: "Century Legend 5*",
    image: placeholder("Century Legend 5*"),
    shortDescription:
      "Флагман Century Cruises на Янцзы: панорамные каюты с видом на ущелья, открытый бассейн, спа и авторские лекции о китайской культуре.",
    longDescription: [
      "Century Legend — один из крупнейших речных лайнеров Китая, построенный для маршрутов по Янцзы между Чунцином и Ичаном. Современный дизайн, открытый бассейн и сад на верхней палубе.",
      "На борту лектории о династиях, традиционные чайные церемонии и шоу с участием Пекинской оперы. Английский и русский гид сопровождают группу на берегу.",
    ],
    specs: [
      { label: "Год постройки", value: "2013" },
      { label: "Длина", value: "150 м" },
      { label: "Гостей", value: "608" },
      { label: "Экипаж", value: "230" },
      { label: "Кают", value: "298" },
      { label: "Маршруты", value: "Янцзы" },
    ],
    cabins: [
      { name: "Standard Balcony", description: "Каюта 22 м² с балконом на реку.", image: placeholder("Standard Balcony") },
      { name: "Executive Suite", description: "44 м² с гостиной и панорамными окнами.", image: placeholder("Executive Suite") },
      { name: "Presidential Suite", description: "120 м² с приватным дворецким и террасой.", image: placeholder("Presidential Suite") },
    ],
    deckPlanImage: placeholder("Deck Plan — Century Legend", 1800, 1100),
    gallery: [placeholder("Century Legend 1"), placeholder("Century Legend 2"), placeholder("Century Legend 3"), placeholder("Century Legend 4")],
  },
  {
    slug: "arabian-pearl",
    name: "Arabian Pearl",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&auto=format&fit=crop",
    shortDescription:
      "Премиальный лайнер для маршрутов по Персидскому заливу: восточный декор интерьеров, инфинити-бассейн и приватные сьюты с террасами.",
    longDescription: [
      "Arabian Pearl — премиальный лайнер для коротких рейсов по Персидскому заливу: Дубай, Абу-Даби, Доха, Маскат. Интерьеры в стиле современного восточного дворца с мрамором, тиковым деревом и приглушённой латунью.",
      "На борту инфинити-бассейн с видом на закат, хаммам, сигарный салон и ресторан персидской кухни. Программа экскурсий включает приватные туры по дворцам и пустынные сафари.",
    ],
    specs: [
      { label: "Длина", value: "180 м" },
      { label: "Гостей", value: "320" },
      { label: "Экипаж", value: "180" },
      { label: "Кают", value: "160 сьютов" },
      { label: "Бассейнов", value: "2" },
      { label: "Маршруты", value: "Персидский залив" },
    ],
    cabins: [
      { name: "Deluxe Balcony", description: "Каюта с приватным балконом и восточным декором.", image: placeholder("Deluxe Balcony") },
      { name: "Pearl Suite", description: "Сьюты с гостиной и видом на залив с двух сторон.", image: placeholder("Pearl Suite") },
      { name: "Royal Terrace", description: "Двухуровневые апартаменты с приватной террасой и джакузи.", image: placeholder("Royal Terrace") },
    ],
    deckPlanImage: placeholder("Deck Plan — Arabian Pearl", 1800, 1100),
    gallery: [placeholder("Arabian Pearl 1"), placeholder("Arabian Pearl 2"), placeholder("Arabian Pearl 3"), placeholder("Arabian Pearl 4")],
  },
  {
    slug: "galapagos-explorer",
    name: "Galápagos Explorer",
    image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1600&auto=format&fit=crop",
    shortDescription:
      "Экспедиционная яхта для архипелага Галапагос: натуралисты-гиды на борту, программа высадок Zodiac и подводный мир в шаговой доступности.",
    longDescription: [
      "Galápagos Explorer — экспедиционная яхта на 48 гостей, спроектированная специально для строгих экологических норм национального парка Галапагос. Малая осадка позволяет заходить в бухты, недоступные крупным судам.",
      "На борту команда из четырёх натуралистов с лицензией парка, парк Zodiac, снаряжение для снорклинга и каяки. Каждый день — две высадки и лекции о биологии архипелага.",
    ],
    specs: [
      { label: "Длина", value: "70 м" },
      { label: "Гостей", value: "48" },
      { label: "Экипаж", value: "32" },
      { label: "Кают", value: "24 сьюта" },
      { label: "Натуралисты", value: "4 на борту" },
      { label: "Маршруты", value: "Галапагос" },
    ],
    cabins: [
      { name: "Standard Cabin", description: "Каюта 18 м² с панорамным окном.", image: placeholder("Standard Cabin") },
      { name: "Suite", description: "30 м² с приватным балконом и зоной отдыха.", image: placeholder("Suite") },
      { name: "Owner's Suite", description: "55 м² на верхней палубе с террасой 360°.", image: placeholder("Owner's Suite") },
    ],
    deckPlanImage: placeholder("Deck Plan — Galápagos Explorer", 1800, 1100),
    gallery: [placeholder("Galápagos 1"), placeholder("Galápagos 2"), placeholder("Galápagos 3"), placeholder("Galápagos 4")],
  },
  {
    slug: "aegean-star",
    name: "Aegean Star",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&auto=format&fit=crop",
    shortDescription:
      "Средиземноморский яхтенный лайнер: маршруты по Эгейскому морю, греческая гастрономия на борту и приватные тендеры в скрытые бухты.",
    longDescription: [
      "Aegean Star — камерная яхта для маршрутов по Эгейскому морю: Афины, Санторини, Миконос, Родос, турецкое побережье. Интерьеры в стиле минималистичной греческой эстетики — белый известняк, лён, оливковое дерево.",
      "На борту шеф с мишленовским опытом, приватные тендеры для высадки в скрытые бухты и сомелье, ведущий программу по греческим винам.",
    ],
    specs: [
      { label: "Длина", value: "95 м" },
      { label: "Гостей", value: "80" },
      { label: "Экипаж", value: "55" },
      { label: "Кают", value: "40 сьютов" },
      { label: "Маршруты", value: "Эгейское море" },
      { label: "Флаг", value: "Греция" },
    ],
    cabins: [
      { name: "Aegean Suite", description: "28 м² с французским балконом и видом на море.", image: placeholder("Aegean Suite") },
      { name: "Cyclades Suite", description: "Угловой сьют с панорамным остеклением.", image: placeholder("Cyclades Suite") },
      { name: "Olympus Penthouse", description: "70 м² с приватной террасой и джакузи на палубе.", image: placeholder("Olympus Penthouse") },
    ],
    deckPlanImage: placeholder("Deck Plan — Aegean Star", 1800, 1100),
    gallery: [placeholder("Aegean Star 1"), placeholder("Aegean Star 2"), placeholder("Aegean Star 3"), placeholder("Aegean Star 4")],
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

export const getLinerBySlug = (slug?: string): Liner | undefined =>
  slug ? liners.find((l) => l.slug === slug) : undefined;
