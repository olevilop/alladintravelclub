
## Контекст

Тур `china-grand-tour-2026` уже добавлен в `chinaTours`, поэтому он автоматически отображается в каталоге `/china-tours` и ведёт на `/tour/china-grand-tour-2026`. Но из-за того, что у тура `category: "Групповой тур"` (а не `expedition`/`classic`), несколько мест работают некорректно.

## Проблемы и правки

### 1. Хлебные крошки ведут "в никуда"
В `src/pages/TourDetail.tsx` (стр. 99) логика берёт `categoryToBreadcrumb[tour.category]` сначала, и только если `category` пуст — `regionToBreadcrumb[tour.region]`. Для "Групповой тур" в `categoryToBreadcrumb` записи нет → `label` падает на голое "Китай", `href` — на "/".

**Правка:** изменить порядок — использовать `categoryToBreadcrumb[tour.category]` только если запись существует, иначе `regionToBreadcrumb[tour.region]`. Тогда крошки станут: `Главная › Туры по Китаю (/china-tours) › Гранд Тур по Китаю`.

### 2. Бейдж "Экскурсионный тур" в карточке
В `src/data/tours.ts` для объекта `china-grand-tour-2026` добавить поле `badge: "Экскурсионный тур"`. `TourCarousel` уже умеет показывать `tour.badge` в левом верхнем углу карточки (стр. 86–90).

Также в `src/pages/CategoryToursPage.tsx` карточки списка не показывают `badge` — добавить вывод бейджа над названием тура (маленькая золотая надпись `tour.badge` в uppercase tracking-wider), чтобы он был виден и на странице `/china-tours`.

### 3. Блок "Похожие туры в Китай" после FAQ
В `src/components/SimilarTours.tsx` логика:
```ts
const isCruise = !!currentTour.category || tours.some(t => t.id === currentTour.id);
```
Для нашего тура `category = "Групповой тур"` → `isCruise = true` → фильтрует по `category === "Групповой тур"`, других таких нет → пусто.

**Правка:** считать `isCruise` только для категорий круизов:
```ts
const isCruise = currentTour.category === "expedition" || currentTour.category === "classic";
```
Тогда для "Групповой тур" сработает ветка по `region === "Китай"` и блок покажет все остальные китайские туры в карусели (`TourCarousel` уже даёт горизонтальную прокрутку со стрелками). Заголовок будет «Похожие туры в Китай» (через `regionLabels["Китай"]`).

Блок уже расположен после `FAQSection` (стр. 502 → 505) — порядок менять не нужно.

## Файлы

- `src/data/tours.ts` — добавить `badge: "Экскурсионный тур"` в объект `china-grand-tour-2026`.
- `src/pages/TourDetail.tsx` — поправить порядок выбора крошки (region для не-круизных категорий).
- `src/components/SimilarTours.tsx` — `isCruise` только для `expedition`/`classic`.
- `src/pages/CategoryToursPage.tsx` — вывод `tour.badge` в карточке списка.
