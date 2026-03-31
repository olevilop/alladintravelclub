

## Заменить поле «Кто вы?» на поле «Имя»

### Что делаем
В `src/components/NewsletterSocial.tsx` заменяем Select-компонент (выбор роли: турист/агент/компания) на текстовое поле Input для ввода имени.

### Изменения в `src/components/NewsletterSocial.tsx`
- Убрать импорт `Select, SelectContent, SelectItem, SelectTrigger, SelectValue`
- Добавить state `name` (useState)
- Заменить `<Select>...</Select>` на `<Input placeholder="Ваше имя" value={name} onChange={...} />`  с теми же классами ширины (`w-full sm:w-[160px]`)

### Файл
- `src/components/NewsletterSocial.tsx`

