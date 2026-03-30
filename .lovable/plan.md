

## Убрать блок «Подписка на спецпредложения» из Footer

### Что делаем
Удаляем третью колонку (строки 46–64) с формой подписки из футера. Сетка меняется с `md:grid-cols-3` на `md:grid-cols-2`. Убираем неиспользуемые импорты (`useState`, `Input`, `useToast`).

### Изменения в `src/components/Footer.tsx`
- Удалить `useState`, `Input`, `useToast` импорты
- Удалить переменные `toast`, `email`, `setEmail`, `handleSubscribe`
- Удалить блок `<div>` с формой подписки (строки 46–64)
- Сетка: `md:grid-cols-3` → `md:grid-cols-2`

### Файл
- `src/components/Footer.tsx`

