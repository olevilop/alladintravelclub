

## Выпадающее меню «Туры» в навигации

**Файл: `src/components/Navbar.tsx`**

1. Выделить пункт «Туры» из общего массива `navLinks` и обработать его отдельно — при наведении/клике показывать dropdown-меню со списком направлений (те же что в футере):
   - Япония → `/japan-tours`
   - Китай → `/china-tours`
   - Россия → `/russia-tours`
   - Южная Корея → `/korea-tours`
   - Северная Корея → `/nkorea-tours`
   - Мальдивы → `/maldives`

2. Реализация через `DropdownMenu` из `@/components/ui/dropdown-menu` (уже есть в проекте). Кнопка «Туры» становится `DropdownMenuTrigger`, а пункты — `DropdownMenuItem` с `navigate` + `window.scrollTo(0,0)`.

3. На мобильной версии (бургер-меню): при нажатии на «Туры» раскрывается вложенный список тех же ссылок прямо внутри мобильного меню.

4. Добавить иконку `ChevronDown` рядом с «Туры» для визуального индикатора выпадающего меню.

**Технические детали:**
- Импортировать `DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem` и `ChevronDown`
- Создать массив `tourSubLinks` (идентичный `tourLinks` из Footer)
- Десктоп: обернуть кнопку «Туры» в `DropdownMenu`, пункты ведут на страницы через `navigate`
- Мобиль: добавить состояние `toursExpanded`, при клике на «Туры» показывать/скрывать вложенный список ссылок

