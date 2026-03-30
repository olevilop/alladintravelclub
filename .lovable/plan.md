

## Блок «Спецпредложения» — новый компонент

### Что делаем
Создаём компонент `SpecialOffers.tsx` в стиле `SimilarTours` (та же сетка 4 колонки, тот же дизайн карточек, тот же заголовок с золотыми линиями). Блок показывает случайную подборку из всех категорий туров (экспедиционные, классические, региональные).

### Логика выборки
- Собираем все туры из всех массивов (`tours`, `japanTours`, `koreaTours`, `chinaTours`, `northKoreaTours`, `russiaTours`)
- На странице тура — исключаем текущий тур
- Перемешиваем и берём 4 случайных (стабильно при ремаунте через `useMemo`)
- На главной — без исключений, просто 4 случайных

### Новый файл: `src/components/SpecialOffers.tsx`
- Проп `excludeTourId?: string` (для страницы тура)
- Дизайн: копия структуры `SimilarTours` — заголовок с линиями, сетка `grid-cols-1 sm:grid-cols-2 md:grid-cols-4`, те же карточки
- Заголовок: «Спец<span italic gold>предложения</span>»

### Изменения в существующих файлах

**`src/pages/TourDetail.tsx`** — добавить `<SpecialOffers excludeTourId={tour.id} />` после `<SimilarTours />` и перед `<FAQSection />`

**`src/pages/Index.tsx`** — добавить `<SpecialOffers />` после `<WhyUsSection />` и перед `<ReviewsSection />`

### Файлы
- `src/components/SpecialOffers.tsx` — новый
- `src/pages/TourDetail.tsx` — вставка компонента
- `src/pages/Index.tsx` — вставка компонента

