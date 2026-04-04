

## Убрать полосу прокрутки в карусели туров

**Файл: `src/components/TourCarousel.tsx`** (строка 66)

Проблема: CSS-класс `.tour-carousel::-webkit-scrollbar` определён в `<style>`, но класс `tour-carousel` не добавлен к контейнеру прокрутки. Из-за этого в Chrome/Safari видна горизонтальная полоса прокрутки.

**Исправление:** добавить класс `tour-carousel` к `div` с `ref={scrollRef}`:

```tsx
// Было:
className="flex gap-6 overflow-x-auto snap-x snap-mandatory"

// Станет:
className="tour-carousel flex gap-6 overflow-x-auto snap-x snap-mandatory"
```

Одна строка — одно изменение.

