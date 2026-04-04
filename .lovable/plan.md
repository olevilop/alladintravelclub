

## Выпадающее меню «Круизы» в навигации

**Файл: `src/components/Navbar.tsx`**

1. Создать массив `cruiseSubLinks` с теми же позициями, что в подвале, но с маршрутами. Поскольку страниц для каждого региона пока нет, создадим для них отдельные страницы-категории (по аналогии с турами).

2. Выделить «Круизы» из массива `navLinks` и обработать отдельно — как dropdown с иконкой ChevronDown (аналогично «Туры»).

3. На мобильной версии: добавить раскрывающийся список (аналогично турам, через состояние `cruisesExpanded`).

**Новые страницы-категории круизов (9 штук):**

Создать страницы на базе `CategoryToursPage.tsx` для каждого направления:
- `/cruises/arctic` — Арктика
- `/cruises/antarctica` — Антарктида
- `/cruises/africa` — Африка
- `/cruises/oceania` — Австралия и Океания
- `/cruises/middle-east` — Ближний Восток
- `/cruises/north-america` — Северная Америка
- `/cruises/south-america` — Южная Америка
- `/cruises/russia` — Россия
- `/cruises/asia` — Азия

Каждая страница — простая обёртка над `CategoryToursPage` с соответствующим заголовком и пустым массивом туров (для наполнения позже).

**Файлы для изменения/создания:**
- `src/components/Navbar.tsx` — добавить dropdown «Круизы» (десктоп + мобиль)
- `src/App.tsx` — добавить 9 маршрутов для круизов
- 9 новых файлов страниц в `src/pages/cruises/` (по одному на регион)
- `src/components/Footer.tsx` — сделать позиции круизов кликабельными ссылками

**Технические детали:**
- Массив `cruiseSubLinks` в Navbar: `[{ label: "Арктика", path: "/cruises/arctic" }, ...]`
- Десктоп: `DropdownMenu` с `DropdownMenuTrigger` и `DropdownMenuContent`
- Мобиль: новое состояние `cruisesExpanded`, аналогично `toursExpanded`
- Страницы круизов используют `CategoryToursPage` с пустым списком туров и соответствующим hero-баннером

