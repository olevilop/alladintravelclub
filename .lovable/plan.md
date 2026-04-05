

## Заменить фото корабля Scenic Eclipse

**Файл 1**: Скопировать загруженное изображение в проект:
- `user-uploads://Снимок_экрана_2026-04-05_в_16.01.59.png` → `src/assets/scenic-eclipse.png`

**Файл 2**: `src/data/tours.ts`
- Добавить импорт: `import scenicEclipseShip from "@/assets/scenic-eclipse.png";`
- Строка 176: заменить `shipImage: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&auto=format&fit=crop"` → `shipImage: scenicEclipseShip`

Два изменения, два файла.

