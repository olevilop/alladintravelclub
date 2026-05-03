## Изменить стиль бейджа «🇷🇺 РУССКАЯ ГРУППА»

В `src/components/TourCarousel.tsx` сделать бейдж в том же стиле, что и тег региона «СЕЙШЕЛЫ» — полупрозрачный светлый фон с золотым текстом, без красного цвета. Флаг и текст сохраняются.

Заменить:
```tsx
<div className="absolute top-3 left-3 bg-[#a02828] text-white px-3 py-1 text-xs font-sans uppercase tracking-wider">
  {tour.badge}
</div>
```
на:
```tsx
<div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm px-3 py-1 text-xs text-primary font-sans uppercase tracking-wider">
  {tour.badge}
</div>
```
