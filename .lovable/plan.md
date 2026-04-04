

## Растянуть текст копирайта на всю ширину

**Файл: `src/components/Footer.tsx`** (строка ~154)

Убрать ограничение `max-w-[50%]` у параграфа, чтобы текст занимал всю ширину контейнера, оставив выравнивание по левому краю.

**Было:**
```tsx
<p className="text-xs text-muted-foreground text-left max-w-[50%]">
```

**Станет:**
```tsx
<p className="text-xs text-muted-foreground text-left">
```

