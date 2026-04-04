

## Заменить основную картинку тура «Королевские пингвины Антарктиды»

**Что делаем:** Копируем загруженное фото пингвинов в `src/assets/` и заменяем им основное изображение тура `antarctic-penguins`.

**Шаги:**

1. **Скопировать изображение** `user-uploads://IMG_9778.jpg` → `src/assets/antarctic-penguins-hero.jpg`

2. **Файл `src/data/tours.ts`:**
   - Добавить импорт: `import antarcticPenguinsHero from "@/assets/antarctic-penguins-hero.jpg";`
   - Строка 177: заменить `image: tourPenguins` → `image: antarcticPenguinsHero`
   - Строка 178: заменить первый элемент gallery `tourPenguins` → `antarcticPenguinsHero`

Остальные туры, использующие `tourPenguins` в своих gallery, останутся без изменений.

