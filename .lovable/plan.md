

## Сместить текст копирайта влево

**Файл: `src/components/Footer.tsx`** (строка ~153–155)

Изменить выравнивание нижней строки подвала с правого на левое:

**Было:**
```tsx
<div className="container mx-auto px-6 py-6 flex justify-end items-center">
  <p className="text-xs text-muted-foreground text-right max-w-[50%]">
```

**Станет:**
```tsx
<div className="container mx-auto px-6 py-6 flex justify-start items-center">
  <p className="text-xs text-muted-foreground text-left max-w-[50%]">
```

Текст останется ограничен половиной ширины, но будет прижат к левому краю.

