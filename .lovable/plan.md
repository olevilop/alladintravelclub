

## Создать 6 страниц по образцу JapanToursPage

### Обзор
Создать отдельные страницы для каждой категории туров по аналогии с `/japan-tours`, добавить маршруты и ссылки.

### Страницы

| Страница | Путь | Данные | Заголовок Hero | Подзаголовок |
|----------|------|--------|----------------|--------------|
| Экспедиционные круизы | `/expedition-cruises` | `tours.slice(0, 4)` | Экспедиционные *круизы* | Путешествия к краю земли |
| Классические круизы | `/classic-cruises` | `tours.slice(4)` | Классические *круизы* | Откройте мир с комфортом |
| Туры по Южной Корее | `/korea-tours` | `koreaTours` | Туры по *Южной Корее* | Страна утренней свежести |
| Туры по Китаю | `/china-tours` | `chinaTours` | Туры по *Китаю* | Империя тысячелетий |
| Туры по Северной Корее | `/nkorea-tours` | `northKoreaTours` | Туры по *Северной Корее* | Самая закрытая страна мира |
| Туры по России | `/russia-tours` | `russiaTours` | Туры по *России* | От Байкала до Камчатки |

### Файлы

**1. Создать универсальный компонент `src/pages/CategoryToursPage.tsx`**
- Принимает пропсы: `tours`, `title` (JSX), `subtitle`, `backLink = "/"`
- Полностью повторяет структуру JapanToursPage: Hero с рандомным изображением, карточки, SpecialOffers, NewsletterSocial, Footer

**2. Создать 6 файлов страниц** (каждый — обёртка над CategoryToursPage с нужными данными):
- `src/pages/ExpeditionCruisesPage.tsx`
- `src/pages/ClassicCruisesPage.tsx`
- `src/pages/KoreaToursPage.tsx`
- `src/pages/ChinaToursPage.tsx`
- `src/pages/NorthKoreaToursPage.tsx`
- `src/pages/RussiaToursPage.tsx`

**3. `src/App.tsx`** — добавить 6 маршрутов

**4. `src/components/ToursSection.tsx`** — добавить ссылки (`link`) в массив `categories` для каждой категории, а также ссылки на экспедиционные и классические круизы (обернуть заголовки в `<Link>`)

### Технические детали
- JapanToursPage переписать на использование CategoryToursPage для единообразия
- CategoryToursPage — единый компонент, все 7 страниц (включая Japan) используют его
- Итого: 1 общий компонент + 7 тонких обёрток + правки App.tsx и ToursSection.tsx

