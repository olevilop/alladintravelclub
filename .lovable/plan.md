

## Блок «Отели» через выпадающее меню

### Что будет сделано

**`src/pages/TourDetail.tsx`** (строки 260-290) — обернуть таблицу отелей в компонент `Collapsible` из `@radix-ui/react-collapsible`:

- Заголовок «Отели» станет кликабельным триггером с иконкой `ChevronDown`, которая поворачивается при раскрытии
- Таблица будет скрыта по умолчанию и раскрываться по клику
- Стилизация останется прежней, добавится только интерактивность

### Технические детали

- Импортировать `Collapsible, CollapsibleTrigger, CollapsibleContent` из `@/components/ui/collapsible`
- Импортировать `ChevronDown` из `lucide-react`
- Использовать `useState` для управления состоянием `open`
- Иконка будет вращаться через `transition-transform` + `rotate-180` при `open === true`

