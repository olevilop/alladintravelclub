

## Два блока перед подвалом: «Подпишитесь на рассылку» и «Мы в соцсетях»

### Что делаем
Создаём новый компонент `NewsletterSocial.tsx`, который размещается между `ContactSection` и `Footer` на всех страницах. Два блока в ряд по образцу из скриншота, адаптированные под стиль сайта.

### Компонент `src/components/NewsletterSocial.tsx`

Два блока в сетке `grid-cols-1 md:grid-cols-[2fr_1fr]`:

**Левый блок — «Подпишитесь на нашу рассылку»:**
- Карточка `bg-card border border-border` с паддингом
- Заголовок uppercase шрифтом serif
- Подзаголовок: «Будьте в курсе новостей и специальных предложений»
- Форма в ряд: Input email + Select «Кто вы?» (варианты: Турист, Турагент, Компания) + кнопка «Подписаться» (bg-navy/dark стиль)

**Правый блок — «Мы в соцсетях»:**
- Заголовок: «Следите за новостями и акциями на наших страницах в соцсетях»
- Две кнопки-ссылки: Telegram (голубой) и YouTube (красный) с иконками

### Изменения в существующих файлах

**`src/pages/Index.tsx`** — добавить `<NewsletterSocial />` после `<ContactSection />` и перед `<Footer />`

**`src/pages/TourDetail.tsx`** — добавить `<NewsletterSocial />` перед `<Footer />` (если Footer там есть, иначе в конец)

### Файлы
- `src/components/NewsletterSocial.tsx` — новый
- `src/pages/Index.tsx` — вставка
- `src/pages/TourDetail.tsx` — вставка

