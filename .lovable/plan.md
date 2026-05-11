Удалить блок «Направления для путешествия» с главной страницы.

Шаги:
1. Убрать импорт `DestinationsSection` из `src/pages/Index.tsx`.
2. Убрать JSX-элемент `<DestinationsSection />` из разметки страницы.

Технические детали:
- Файл: `src/pages/Index.tsx`.
- Компонент `DestinationsSection` остаётся в кодовой базе, но не используется на главной.