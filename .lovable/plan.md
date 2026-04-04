

## Выровнять текст описания компании в подвале

**Файл: `src/components/Footer.tsx`**

Добавить класс `text-justify` к параграфу с описанием компании (строка 48), чтобы текст был выровнен по обоим краям (по ширине).

**Было:**
```tsx
<p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
```

**Станет:**
```tsx
<p className="text-sm text-muted-foreground leading-relaxed max-w-2xl text-justify">
```

