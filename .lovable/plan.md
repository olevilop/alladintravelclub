

## Привязать ссылку «Спецпредложения» к странице /special-offers

### Изменение в `src/components/Navbar.tsx`

В массиве `navLinks` изменить элемент «Спецпредложения»: вместо `href: "#why-us"` сделать `href: "/special-offers"`.

Обновить функцию `scrollTo`: если `href` начинается не с `#`, выполнять `navigate(href)` вместо прокрутки.

### Файл
- `src/components/Navbar.tsx`

