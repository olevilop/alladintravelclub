

## Обновить карточку «Азия» и создать страницу направления

### Что делаем

1. **Обновить описание карточки «Азия»** в `DestinationsSection.tsx` — вместо «Бутан, Монголия, Камчатка» указать регионы, у которых материк = Азия: «Япония, Китай, Россия, Южная Корея, Мальдивы». Сделать карточку кликабельной (Link на `/destinations/asia`).

2. **Создать страницу `/destinations/asia`** — `src/pages/destinations/AsiaDestinationPage.tsx`:
   - Hero-баннер с фото Азии
   - Хлебные крошки: Главная → Азия
   - Сетка из крупных карточек (3 в ряд на десктопе) с фото каждого региона
   - Карточки: Япония (`/japan-tours`), Китай (`/china-tours`), Южная Корея (`/korea-tours`), Северная Корея (`/nkorea-tours`), Россия (`/russia-tours`), Мальдивы (`/maldives`)
   - Каждая карточка — Link с крупным фото, названием региона
   - Reuse существующих изображений из assets (japan-kyoto, china-wall, korea-seoul и т.д.)

3. **Добавить маршрут** в `App.tsx`: `/destinations/asia` → `AsiaDestinationPage`

### Технические детали

**`src/components/DestinationsSection.tsx`**:
- Добавить `link` поле в массив destinations
- Для «Азия»: `desc: "Япония, Китай, Россия, Южная Корея, Мальдивы"`, `link: "/destinations/asia"`
- Обернуть карточку в `Link` если есть `link`

**`src/pages/destinations/AsiaDestinationPage.tsx`**:
- Navbar, Hero (50vh), Breadcrumbs, сетка карточек `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, Footer
- Каждая карточка: `aspect-[3/4]`, фото, название, overlay — аналогично стилю DestinationsSection

**`src/App.tsx`**:
- Import + Route для `/destinations/asia`

Три файла: один новый, два изменения.

