

## Сместить текст копирайта вправо на половину страницы

**Файл: `src/components/Footer.tsx`** (строка 153)

Изменить контейнер нижней строки: вместо `flex justify-center` использовать `flex justify-end`, а тексту задать `max-w-[50%]` и `text-right`, чтобы он занимал правую половину страницы.

**Было:**
```tsx
<div className="container mx-auto px-6 py-6 flex justify-center items-center">
  <p className="text-xs text-muted-foreground text-center">
```

**Станет:**
```tsx
<div className="container mx-auto px-6 py-6 flex justify-end items-center">
  <p className="text-xs text-muted-foreground text-right max-w-[50%]">
```

