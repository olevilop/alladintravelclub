

## Сделать ссылку «На главную» белой на всех страницах

### Изменения

Ссылка «На главную» расположена поверх тёмного Hero-изображения, поэтому цвет `text-foreground/70` плохо читается. Нужно заменить на белый.

**1. `src/pages/JapanToursPage.tsx` (строка 29)**
- Заменить `text-foreground/70 hover:text-primary` на `text-white/70 hover:text-white`

**2. `src/pages/TourDetail.tsx` (строка 65)**
- Заменить `text-foreground/70 hover:text-primary` на `text-white/70 hover:text-white`

Ссылка на странице «Тур не найден» (строка 41) остаётся без изменений — там нет Hero-фона.

