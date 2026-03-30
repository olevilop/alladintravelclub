

## Блок «Фото корабля» в сайдбаре круизных туров

### Что делаем
Между блоком «Карта маршрута» (`RouteMap`) и «Забронировать тур» (`TourBookingForm`) добавляем блок с фото корабля и его названием — только для круизных туров (где есть `shipName`).

### Изменения

**1. `src/data/tours.ts`** — добавить поле `shipImage?: string` в интерфейс `Tour` и указать изображения для каждого тура с `shipName`. Использовать реальные фото кораблей из Unsplash (URL-ссылки), по одному для каждого судна:
- Ocean Explorer
- Polar Pioneer
- Antarctic Dream
- Nordic Voyager
- Galápagos Explorer

**2. `src/pages/TourDetail.tsx`** — между `<RouteMap />` (строка 247) и `<TourBookingForm />` (строка 250) вставить блок:

```tsx
{tour.shipName && tour.shipImage && (
  <div className="bg-card border border-border p-4 space-y-3">
    <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground flex items-center gap-2">
      <Ship className="w-3.5 h-3.5 text-primary" />
      {tour.shipName}
    </h4>
    <div className="aspect-[16/10] overflow-hidden rounded-sm border border-border">
      <img src={tour.shipImage} alt={tour.shipName} className="w-full h-full object-cover" />
    </div>
  </div>
)}
```

Дизайн повторяет стиль блока `RouteMap` — та же карточка `bg-card`, тот же заголовок uppercase с иконкой.

### Файлы
- `src/data/tours.ts` — интерфейс + данные
- `src/pages/TourDetail.tsx` — вставка блока

