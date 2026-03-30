

## Добавить иконки корзины и личного кабинета в шапку

### Что делаем
В навбаре справа от меню (перед бургер-кнопкой на мобильных) добавляем две иконки:
- **Корзина** (`ShoppingCart` из lucide-react)
- **Личный кабинет** (`User` из lucide-react)

### Изменения в `src/components/Navbar.tsx`

1. Импортировать `ShoppingCart` и `User` из `lucide-react`
2. Добавить группу иконок `flex items-center gap-4` после навигации и перед бургер-кнопкой:
   - Кнопка корзины с `ShoppingCart` (размер 20)
   - Кнопка личного кабинета с `User` (размер 20)
   - Стиль: `text-foreground/70 hover:text-primary transition-colors`
3. На мобильных иконки остаются видимыми рядом с бургером

### Файлы
- `src/components/Navbar.tsx`

