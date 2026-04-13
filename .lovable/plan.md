

## Добавление блока «Отели» в сайдбар страницы тура

### Что будет сделано

**1. `src/data/tours.ts`** — расширить интерфейс `Tour` новым необязательным полем:
```ts
hotelPricing?: {
  categories: string[];  // ["½ TWIN", "Доплата за SGL", ...]
  rows: { hotel: string; prices: string[] }[];
}
```

Добавить данные `hotelPricing` в объект тура `japan-fuji-lakes` (Япония с востока на запад) с тремя строками: Отели 2–3*, Отели 3* комфорт, Отели 4*.

**2. `src/pages/TourDetail.tsx`** — между `<RouteMap>` (строка 257) и секцией Ship photo / Booking form вставить условный блок:
```tsx
{tour.hotelPricing && (
  <div className="bg-card border border-border p-4 space-y-3">
    <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground">Отели</h4>
    <div className="overflow-x-auto">
      <table>...</table>
    </div>
  </div>
)}
```

Таблица будет компактной, со стилизацией под существующий дизайн сайдбара (мелкий шрифт, border-border, text-primary заголовки). Горизонтальный скролл для мобильных.

### Результат

На странице тура «Япония с востока на запад» между картой маршрута и формой бронирования появится таблица с ценами по категориям отелей.

