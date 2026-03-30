

## Уменьшить кнопки соцсетей (реально)

### Проблема
Кнопки уже имели значения `px-4 py-2`, `text-xs`, `w-4 h-4` — предыдущий план не дал видимого эффекта.

### Изменения в `src/components/NewsletterSocial.tsx`
- Padding: `px-4 py-2` → `px-3 py-1.5`
- Иконки: `w-4 h-4` → `w-3.5 h-3.5`
- Текст: `text-xs` → `text-[10px]`
- Gap: `gap-2` → `gap-1.5`
- Tracking: `tracking-widest` → `tracking-wider`

### Файл
- `src/components/NewsletterSocial.tsx`

