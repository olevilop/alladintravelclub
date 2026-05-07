## Цель
Увеличить размер эмодзи-флага 🇷🇺 в бейдже «Русская группа» в сайдбаре страниц туров.

## Изменение

**`src/pages/TourDetail.tsx`** — добавить классы размера к `<span aria-hidden>`:

```tsx
<span aria-hidden className="text-base leading-none">🇷🇺</span>
```

(Текст «Русская группа» остаётся прежним размером — `text-[12px]`.)