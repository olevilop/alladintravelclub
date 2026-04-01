

## Создать страницу «Мальдивы»

Это не страница категории туров (CategoryToursPage), а уникальная лендинг-страница с собственными блоками. Создаём один новый файл + маршрут.

### Файлы

**1. Создать `src/pages/MaldivesPage.tsx`**

Единый файл со всеми секциями, используя существующие паттерны (framer-motion `useInView`, шрифты serif/sans, цвета primary/gold-gradient, стиль кнопок bg-gold-gradient).

Структура:
- `<Navbar />`
- **Hero** — 100vh, фото с Unsplash (бирюзовая вода, бунгало), тёмный оверлей `bg-gradient-to-b from-black/40 via-black/30 to-black/60`, заголовок «Мальдивы», подзаголовок, CTA-кнопка «Узнать стоимость» (скролл к форме), кнопка «На главную» с `navigate(-1)`
- **«Когда ехать»** — 3 карточки (иконки Sun/CloudSun/Umbrella из lucide-react), стиль как WhyUsSection: `border border-border/50 bg-card/20 hover:border-primary/30`, анимация stagger
- **«Где остановиться»** — 4 карточки отелей с фото (Unsplash), название + фраза-атмосфера, без цен. Сетка 2x2 на десктопе
- **«Всё проще чем кажется»** — 3 шага (иконки Plane/Ship/Palmtree), стиль аналогичен WhyUsSection
- **«Не знаете с чего начать?»** — форма по образцу ContactSection: Input (имя, телефон, даты), Select для бюджета (4 варианта), кнопка «Получить подборку» (bg-gold-gradient), подпись «Ответим в течение 2 часов»
- `<Footer />`

**2. `src/App.tsx`** — добавить маршрут `/maldives`

### Стилевое соответствие
- Заголовки секций: `font-serif text-3xl md:text-5xl font-light`, лейбл `text-primary text-sm uppercase tracking-[0.3em]`, italic + `text-gold-gradient` для акцентных слов
- Карточки: `border border-border/50 bg-card/20 hover:border-primary/30 transition-all duration-500`
- Кнопки: `bg-gold-gradient text-primary-foreground py-3 text-sm font-medium uppercase tracking-widest`
- Анимации: `motion.div` с `useInView`, `initial={{ opacity: 0, y: 30 }}`, stagger delay `0.1 * i`
- Форма: Input с `bg-card/50 border-border/50 focus:border-primary h-12 font-sans`

