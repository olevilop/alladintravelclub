import emeraldKaiaShip from "@/assets/yacht-emerald-kaia.jpg";
import scenicEclipseShip from "@/assets/scenic-eclipse.png";

export interface LinerCabin {
  name: string;
  description: string;
  image?: string;
  area?: string;
  features?: string[];
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
      { label: "Длина", value: "170 м" },
      { label: "Ширина", value: "26 м" },
      { label: "Скорость", value: "22 узла" },
      { label: "Пассажиры", value: "264" },
      { label: "Экипаж", value: "120" },
      { label: "Год постройки", value: "2022" },
      { label: "Флаг", value: "Багамы" },
    ],
    cabins: [
      {
        name: "Discovery Suite",
        description: "Базовая категория сьютов с дворецким и линейкой L'Occitane в стандарте.",
        area: "44 м² (включая балкон)",
        features: [
          "Приватный балкон с панорамным остеклением",
          "Гостиная зона с диваном и креслами",
          "Кровать king-size или две односпальные",
          "Гардеробная и сейф",
          "Мраморная ванная комната с душем",
          "Дворецкий и сервис 24/7",
        ],
        image: placeholder("Discovery Suite"),
      },
      {
        name: "Spa Suite",
        description: "Сьюты на спа-палубе с прямым доступом к термальным зонам.",
        area: "46 м² (включая балкон)",
        features: [
          "Приватная джакузи на балконе",
          "Прямой доступ к спа Senses",
          "Кровать king-size",
          "Авторские косметические наборы",
          "Дворецкий и сервис 24/7",
        ],
        image: placeholder("Spa Suite"),
      },
      {
        name: "Owner's Penthouse",
        description: "Двухуровневые апартаменты — флагманская категория яхты.",
        area: "240 м² (на двух уровнях)",
        features: [
          "Спальня с гардеробной",
          "Библиотека и столовая на 8 персон",
          "Приватная терраса с подогреваемой ванной",
          "Кабинет и кухня",
          "Личный дворецкий",
        ],
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
      { label: "Длина", value: "170 м" },
      { label: "Ширина", value: "26 м" },
      { label: "Скорость", value: "22 узла" },
      { label: "Пассажиры", value: "264" },
      { label: "Экипаж", value: "120" },
      { label: "Год постройки", value: "2022" },
      { label: "Флаг", value: "Багамы" },
    ],
    cabins: [
      {
        name: "Yacht Suite",
        description: "Базовая категория сьютов на средних палубах.",
        area: "32 м² (с французским балконом)",
        features: [
          "Французский балкон с панорамным остеклением",
          "Кровать king-size",
          "Мраморная ванная с дождевым душем",
          "Кофемашина Nespresso и мини-бар",
          "Сейф и гардеробная зона",
        ],
        image: placeholder("Yacht Suite"),
      },
      {
        name: "Panorama Balcony Suite",
        description: "Угловые сьюты с увеличенной площадью остекления.",
        area: "38 м² (включая балкон)",
        features: [
          "Панорамное остекление на две стороны",
          "Приватная терраса с шезлонгами",
          "Гостиная зона",
          "Мраморная ванная и отдельный душ",
          "Дворецкий и сервис 24/7",
        ],
        image: placeholder("Panorama Suite"),
      },
      {
        name: "Owner's Suite",
        description: "Флагманская категория с расширенной программой сервиса.",
        area: "85 м² (включая террасу)",
        features: [
          "Отдельная гостиная и кабинет",
          "Гардеробная",
          "Ванная с видом на море",
          "Батлер-сервис 24/7",
          "Приватный трансфер и тендер",
        ],
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
      { label: "Длина", value: "170 м" },
      { label: "Ширина", value: "26 м" },
      { label: "Скорость", value: "22 узла" },
      { label: "Пассажиры", value: "264" },
      { label: "Экипаж", value: "120" },
      { label: "Год постройки", value: "2022" },
      { label: "Флаг", value: "Багамы" },
    ],
    cabins: [
      {
        name: "Ocean View Suite",
        description: "Сьюты на главной палубе с панорамными окнами.",
        area: "22 м²",
        features: ["Панорамные окна на море", "Кровать king-size или две односпальные", "Ванная с душем", "Кондиционер и сейф"],
        image: placeholder("Ocean View Suite"),
      },
      {
        name: "Premium Suite",
        description: "Расширенные сьюты с гостиной зоной и приватной террасой.",
        area: "30 м² (включая террасу)",
        features: ["Приватная терраса с шезлонгами", "Гостиная зона", "Мини-бар и кофемашина", "Ванная с тропическим душем"],
        image: placeholder("Premium Suite"),
      },
      {
        name: "Owner's Suite",
        description: "Двухкомнатный сьют на верхней палубе.",
        area: "45 м² (на двух уровнях)",
        features: ["Приватная джакузи на палубе", "Отдельная гостиная", "Гардеробная", "Сервис дворецкого"],
        image: placeholder("Owner's Suite"),
      },
    ],
    deckPlanImage: placeholder("Deck Plan — Aqua Blu", 1800, 1100),
    gallery: [placeholder("Aqua Blu 1"), placeholder("Aqua Blu 2"), placeholder("Aqua Blu 3"), placeholder("Aqua Blu 4"), placeholder("Aqua Blu 5"), placeholder("Aqua Blu 6")],
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
      { label: "Длина", value: "170 м" },
      { label: "Ширина", value: "26 м" },
      { label: "Скорость", value: "22 узла" },
      { label: "Пассажиры", value: "264" },
      { label: "Экипаж", value: "120" },
      { label: "Год постройки", value: "2022" },
      { label: "Флаг", value: "Багамы" },
    ],
    cabins: [
      {
        name: "Balcony Suite",
        description: "Базовая категория с французским балконом и видом на Меконг.",
        area: "23 м²",
        features: ["Французский балкон", "Кровать king-size", "Мини-бар и кофемашина", "Ванная с дождевым душем"],
        image: placeholder("Balcony Suite"),
      },
      {
        name: "Junior Balcony Suite",
        description: "Расширенный сьют с дополнительной гостиной зоной.",
        area: "30 м²",
        features: ["Французский балкон", "Гостиная зона с диваном", "Гардеробная", "Сервис дворецкого"],
        image: placeholder("Junior Suite"),
      },
      {
        name: "Royal Panorama Suite",
        description: "Флагманская категория с приватной террасой.",
        area: "65 м² (включая террасу)",
        features: ["Приватная терраса с джакузи", "Отдельная гостиная", "Гардеробная", "Личный дворецкий", "Авторские косметические наборы"],
        image: placeholder("Royal Suite"),
      },
    ],
    deckPlanImage: placeholder("Deck Plan — Scenic Spirit", 1800, 1100),
    gallery: [placeholder("Scenic Spirit 1"), placeholder("Scenic Spirit 2"), placeholder("Scenic Spirit 3"), placeholder("Scenic Spirit 4"), placeholder("Scenic Spirit 5"), placeholder("Scenic Spirit 6")],
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
      { label: "Длина", value: "170 м" },
      { label: "Ширина", value: "26 м" },
      { label: "Скорость", value: "22 узла" },
      { label: "Пассажиры", value: "264" },
      { label: "Экипаж", value: "120" },
      { label: "Год постройки", value: "2022" },
      { label: "Флаг", value: "Багамы" },
    ],
    cabins: [
      {
        name: "Standard Balcony",
        description: "Каюта с балконом на реку.",
        area: "22 м²",
        features: ["Приватный балкон", "Кровать king-size или две односпальные", "Ванная с душем", "Кондиционер и сейф"],
        image: placeholder("Standard Balcony"),
      },
      {
        name: "Executive Suite",
        description: "Сьюты с гостиной и панорамными окнами.",
        area: "44 м²",
        features: ["Панорамные окна", "Отдельная гостиная зона", "Мини-бар и кофемашина", "Ванная с тропическим душем"],
        image: placeholder("Executive Suite"),
      },
      {
        name: "Presidential Suite",
        description: "Флагманская категория с приватной террасой.",
        area: "120 м² (включая террасу)",
        features: ["Личный дворецкий", "Терраса с видом на ущелья", "Гостиная и столовая", "Гардеробная", "Ванная с джакузи"],
        image: placeholder("Presidential Suite"),
      },
    ],
    deckPlanImage: placeholder("Deck Plan — Century Legend", 1800, 1100),
    gallery: [placeholder("Century Legend 1"), placeholder("Century Legend 2"), placeholder("Century Legend 3"), placeholder("Century Legend 4"), placeholder("Century Legend 5"), placeholder("Century Legend 6")],
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
      { label: "Длина", value: "170 м" },
      { label: "Ширина", value: "26 м" },
      { label: "Скорость", value: "22 узла" },
      { label: "Пассажиры", value: "264" },
      { label: "Экипаж", value: "120" },
      { label: "Год постройки", value: "2022" },
      { label: "Флаг", value: "Багамы" },
    ],
    cabins: [
      {
        name: "Deluxe Balcony",
        description: "Каюта с приватным балконом и восточным декором.",
        area: "26 м² (включая балкон)",
        features: ["Приватный балкон с видом на залив", "Кровать king-size", "Мраморная ванная", "Сейф и мини-бар"],
        image: placeholder("Deluxe Balcony"),
      },
      {
        name: "Pearl Suite",
        description: "Сьюты с гостиной и панорамным видом на залив с двух сторон.",
        area: "48 м²",
        features: ["Угловое остекление", "Отдельная гостиная зона", "Гардеробная", "Ванная с тропическим душем"],
        image: placeholder("Pearl Suite"),
      },
      {
        name: "Royal Terrace",
        description: "Двухуровневые апартаменты — флагманская категория лайнера.",
        area: "110 м² (на двух уровнях)",
        features: ["Приватная терраса с джакузи", "Гостиная и столовая на 6 персон", "Гардеробная и кабинет", "Личный дворецкий", "Хаммам в номере"],
        image: placeholder("Royal Terrace"),
      },
    ],
    deckPlanImage: placeholder("Deck Plan — Arabian Pearl", 1800, 1100),
    gallery: [placeholder("Arabian Pearl 1"), placeholder("Arabian Pearl 2"), placeholder("Arabian Pearl 3"), placeholder("Arabian Pearl 4"), placeholder("Arabian Pearl 5"), placeholder("Arabian Pearl 6")],
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
      { label: "Длина", value: "170 м" },
      { label: "Ширина", value: "26 м" },
      { label: "Скорость", value: "22 узла" },
      { label: "Пассажиры", value: "264" },
      { label: "Экипаж", value: "120" },
      { label: "Год постройки", value: "2022" },
      { label: "Флаг", value: "Багамы" },
    ],
    cabins: [
      {
        name: "Standard Cabin",
        description: "Каюта с панорамным окном на главной палубе.",
        area: "18 м²",
        features: ["Панорамное окно", "Кровать king-size или две односпальные", "Ванная с душем", "Сейф и кондиционер"],
        image: placeholder("Standard Cabin"),
      },
      {
        name: "Suite",
        description: "Сьюты с приватным балконом и зоной отдыха.",
        area: "30 м² (включая балкон)",
        features: ["Приватный балкон", "Гостиная зона", "Мини-бар", "Ванная с тропическим душем"],
        image: placeholder("Suite"),
      },
      {
        name: "Owner's Suite",
        description: "Флагманская каюта на верхней палубе.",
        area: "55 м² (с террасой 360°)",
        features: ["Терраса 360°", "Отдельная гостиная", "Гардеробная", "Сервис дворецкого"],
        image: placeholder("Owner's Suite"),
      },
    ],
    deckPlanImage: placeholder("Deck Plan — Galápagos Explorer", 1800, 1100),
    gallery: [placeholder("Galápagos 1"), placeholder("Galápagos 2"), placeholder("Galápagos 3"), placeholder("Galápagos 4"), placeholder("Galápagos 5"), placeholder("Galápagos 6")],
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
      { label: "Длина", value: "170 м" },
      { label: "Ширина", value: "26 м" },
      { label: "Скорость", value: "22 узла" },
      { label: "Пассажиры", value: "264" },
      { label: "Экипаж", value: "120" },
      { label: "Год постройки", value: "2022" },
      { label: "Флаг", value: "Багамы" },
    ],
    cabins: [
      {
        name: "Aegean Suite",
        description: "Базовая категория с французским балконом и видом на море.",
        area: "28 м²",
        features: ["Французский балкон", "Кровать king-size", "Мраморная ванная с душем", "Кофемашина и мини-бар"],
        image: placeholder("Aegean Suite"),
      },
      {
        name: "Cyclades Suite",
        description: "Угловой сьют с панорамным остеклением.",
        area: "42 м²",
        features: ["Угловое остекление на две стороны", "Гостиная зона", "Гардеробная", "Ванная с дождевым душем"],
        image: placeholder("Cyclades Suite"),
      },
      {
        name: "Olympus Penthouse",
        description: "Флагманская категория с приватной палубой.",
        area: "70 м² (включая террасу)",
        features: ["Приватная терраса с джакузи", "Отдельная гостиная и столовая", "Личный дворецкий", "Гардеробная", "Авторские косметические наборы"],
        image: placeholder("Olympus Penthouse"),
      },
    ],
    deckPlanImage: placeholder("Deck Plan — Aegean Star", 1800, 1100),
    gallery: [placeholder("Aegean Star 1"), placeholder("Aegean Star 2"), placeholder("Aegean Star 3"), placeholder("Aegean Star 4"), placeholder("Aegean Star 5"), placeholder("Aegean Star 6")],
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
