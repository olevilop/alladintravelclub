Изменить логотип в шапке: поставить «Alladin» первым (крупнее), затем «Travel Club» (чуть меньше).

## Изменения

**`src/components/Navbar.tsx`** (строки 79-83)
- Разделить текст логотипа на два `<span>`.
- Первый: «Alladin» — `text-3xl md:text-4xl font-semibold`.
- Второй: «Travel Club» — `text-lg md:text-xl font-medium`.
- Контейнер кнопки: `flex items-baseline gap-2`, стиль `text-gold-gradient` и `font-serif` сохраняются.