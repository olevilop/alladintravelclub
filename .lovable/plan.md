

## Привести ссылку «На главную» к стилю страницы тура

### Проблема
На JapanToursPage ссылка выглядит иначе: текст «← Главная», центрирована, uppercase, tracking-widest. На TourDetail — иконка `ArrowLeft`, текст «На главную», выровнена влево, стиль `text-foreground/70 hover:text-primary`.

### Решение

**Файл: `src/pages/JapanToursPage.tsx`**

1. Импортировать `ArrowLeft` из `lucide-react`
2. Изменить Hero-контейнер: вместо центрированного flex — выровнять контент влево снизу (`justify-end items-start pb-12 md:pb-20`), как на TourDetail
3. Заменить ссылку на:
```tsx
<Link to="/" className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors mb-6">
  <ArrowLeft className="w-4 h-4" /> На главную
</Link>
```
4. Заголовок и подзаголовок — выровнять влево (убрать `text-center`, `items-center`)

