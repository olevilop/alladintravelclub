

## Возврат на место на главной, откуда зашли

### Подход
Использовать `navigate(-1)` (браузерная история) вместо `<Link to="/">`. Это автоматически вернёт пользователя на то место страницы, откуда он пришёл, включая позицию прокрутки. Если истории нет (прямой заход по ссылке) — fallback на `/`.

### Изменения

**1. `src/pages/CategoryToursPage.tsx`**
- Заменить `<Link to={backLink}>` на `<button onClick={goBack}>` с логикой: если есть история — `navigate(-1)`, иначе — `navigate("/")`

**2. `src/pages/TourDetail.tsx`**
- Аналогичная замена `<Link to="/">` на кнопку с `navigate(-1)` / fallback на `"/"`

### Техническая деталь
```tsx
const navigate = useNavigate();
const goBack = () => {
  if (window.history.length > 1) {
    navigate(-1);
  } else {
    navigate("/");
  }
};
```

Внешний вид ссылки сохраняется — меняется только тег и обработчик.

