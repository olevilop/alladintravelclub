## План: удаление трёх туров по Китаю

Удалить туры:
- `china-great-wall` — «Великая Китайская стена»
- `china-zhangjiajie` — «Горы Аватара — Чжанцзяцзе»
- `china-guilin-li-river` — «Река Ли и карстовые горы Гуйлиня»

Эти туры не имеют отдельных страниц — они используют общий маршрут `/tour/:id` и автоматически появляются и в каталоге `/china-tours`, и в блоке «Туры по Китаю» на главной (через `chinaTours` в `ToursSection.tsx`). После удаления записей карточки исчезнут везде автоматически.

## Изменения

1. **`src/data/tours.ts`** — удалить три объекта из массива `chinaTours` (строки ~1822–1925).
2. **`src/data/tourRoutes.ts`** — удалить три ключа маршрутов: `china-great-wall`, `china-zhangjiajie`, `china-guilin-li-river`.

## Что НЕ трогаем

- `china-zhangjiajie-2026` (другой тур, остаётся).
- `china-grand-tour-2026`, `china-avatar-mountains-2026` — остаются.
- Импорты картинок (`chinaWallImg`, `chinaZhangjiajieImg`, `chinaGuilinImg`) оставляем — они используются в `gallery` других китайских туров.
