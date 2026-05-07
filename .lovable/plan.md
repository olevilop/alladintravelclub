## Цель
Убрать золотую полоску-плашку у бейджа «🇷🇺 Русская группа» в сайдбаре страниц туров — оставить только надпись с флагом, без рамки и подложки.

## Изменение

**`src/pages/TourDetail.tsx`** (блок `tour.russianGroup`, ~строки 317–322)

Заменить:
```tsx
<div className="-mx-6 -mb-6 mt-2 px-6 py-3 border-t border-primary/30 bg-primary/10 flex items-center justify-center gap-2 text-[12px] uppercase tracking-[0.25em] text-primary font-sans">
```
на простой инлайн-блок без фона/границ, в стилистике остальных строк сайдбара:
```tsx
<div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.25em] text-primary font-sans">
  <span aria-hidden>🇷🇺</span>
  <span>Русская группа</span>
</div>
```

Остальное не меняется.