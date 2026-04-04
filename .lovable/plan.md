

## Исправить хлебные крошки: добавить правильные ссылки на категории

### Проблема

На странице тура хлебные крошки показывают `Главная > Япония > Название тура`, но ссылка «Япония» ведёт на `/` (главную), а не на `/japan-tours`. Нужно, чтобы промежуточная крошка вела на соответствующую страницу категории.

### Решение

**Файл: `src/data/tours.ts`** — добавить маппинг `region → URL`:

```ts
export const regionToPath: Record<string, string> = {
  "Япония": "/japan-tours",
  "Южная Корея": "/korea-tours",
  "Китай": "/china-tours",
  "Северная Корея": "/nkorea-tours",
  "Россия": "/russia-tours",
  "Арктика": "/expedition-cruises",
  "Антарктика": "/expedition-cruises",
  "Мальдивы": "/maldives",
};
```

**Файл: `src/pages/TourDetail.tsx`** — обновить строку с `<Breadcrumbs>`:

Сейчас:
```tsx
<Breadcrumbs items={[{ label: tour.region || "Туры", href: "/" }, { label: tour.name }]} />
```

Заменить на:
```tsx
<Breadcrumbs items={[
  { label: tour.region || "Туры", href: regionToPath[tour.region] || "/" },
  { label: tour.name }
]} />
```

Импортировать `regionToPath` из `@/data/tours`.

### Результат

- `Главная > Япония > Тур` — «Япония» ведёт на `/japan-tours`
- `Главная > Южная Корея > Тур` — ведёт на `/korea-tours`
- И так далее для всех регионов

2 файла, минимальные изменения.

