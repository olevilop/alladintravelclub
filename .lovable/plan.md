

## Добавить ссылку «Назад на главную» в Hero на странице туров по Японии

### Файл: `src/pages/JapanToursPage.tsx`

В Hero-секцию (внутри `div` с `relative z-10`) добавить ссылку-навигацию вверху, над заголовком:

```tsx
<Link to="/" className="text-white/70 hover:text-white transition-colors text-sm tracking-widest uppercase flex items-center gap-2">
  ← Главная
</Link>
```

Разместить её в начале flex-контейнера (перед `h1`), с `mb-4`. Импортировать `Link` из `react-router-dom`.

