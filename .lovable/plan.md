

## Исправить разделение туров на экспедиционные и классические

**Проблема:** В `ToursSection.tsx` строка 48 использует `tours.slice(0, Math.max(tours.length, 4))` — это возвращает ВСЕ туры, а не только первые 4 экспедиционных. Круиз по Ближнему Востоку (category: classic) попадает в оба блока.

**Решение:** Заменить жёсткую нарезку по индексу на фильтрацию по полю `category`.

**Файл: `src/pages/ExpeditionCruisesPage.tsx`**
- Заменить `tours.slice(0, 4)` на `tours.filter(t => t.category === "expedition")`

**Файл: `src/pages/ClassicCruisesPage.tsx`**
- Заменить `tours.slice(4)` на `tours.filter(t => t.category === "classic")`

**Файл: `src/components/ToursSection.tsx`**
- Строка 48: заменить `tours.slice(0, Math.max(tours.length, 4))` на `tours.filter(t => t.category === "expedition")`
- Строка 64 (внутри условного блока): заменить `tours.slice(4)` на `tours.filter(t => t.category === "classic")`
- Условие `tours.length > 4` заменить на проверку наличия классических круизов: `tours.some(t => t.category === "classic")`

Все три файла — одинаковый принцип: фильтрация по `category` вместо нарезки по индексу.

