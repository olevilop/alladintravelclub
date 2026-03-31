

## Сделать заголовок «Туры по Японии» ссылкой на /japan-tours

### Файл: `src/components/ToursSection.tsx`

1. Добавить `link` поле в массив `categories` для Японии:
   ```ts
   { tours: japanTours, link: "/japan-tours", label: ... }
   ```

2. Добавить импорт `Link` из `react-router-dom`.

3. В рендере категорий (строка 92) обернуть `<SectionHeading>` в `<Link>` если у категории есть `link`, иначе оставить как есть. Добавить стиль `hover:opacity-80 transition-opacity` для интерактивности.

### Технические детали

- Тип `categories` расширяется полем `link?: string`
- Только у Японии будет ссылка, остальные категории останутся без изменений
- При клике на заголовок произойдёт переход на `/japan-tours`

