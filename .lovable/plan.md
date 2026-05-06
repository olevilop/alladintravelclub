## Правки в `src/pages/TourDetail.tsx`

### 1. Сайдбар «Информация о туре» (строки 245–259)
Для `category === "Групповой тур"` показывать обе строки в порядке:
1. «Экскурсионный тур» (Compass) — только если `badge === "Экскурсионный тур"`
2. «Групповой тур» (Users) — всегда

### 2. Удалить бронзовый бейдж внизу карточки (строки 315–319)
Удалить блок:
```tsx
{tour.badge && (
  <div className="flex items-center gap-2 pt-1 text-sm text-primary font-sans uppercase tracking-wider">
    <span>{tour.badge}</span>
  </div>
)}
```
— нижняя надпись «Экскурсионный тур» больше не нужна, поскольку она теперь выведена сверху рядом с иконкой.

## Файлы
- `src/pages/TourDetail.tsx`
