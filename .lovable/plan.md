

## Показывать все экспедиционные круизы в блоке «Похожие»

**Проблема:** `SimilarTours` фильтрует по `region`. Экспедиционные круизы имеют разные регионы (Арктика, Антарктида, Африка…), поэтому показывается только 1–2 тура вместо всех.

**Решение:** Для круизов фильтровать по `category` вместо `region`.

**Файл: `src/components/SimilarTours.tsx`**

1. Расширить интерфейс `currentTour` — добавить `category?: string`
2. Изменить фильтрацию (строка 19):
   ```tsx
   // Было:
   const similarTours = allTours.filter(t => t.id !== currentTour.id && t.region === currentTour.region);

   // Станет:
   const isCruise = tours.some(t => t.id === currentTour.id);
   const similarTours = allTours.filter(t => {
     if (t.id === currentTour.id) return false;
     if (isCruise && currentTour.category) return t.category === currentTour.category;
     return t.region === currentTour.region;
   });
   ```
3. Убрать дублирующее определение `isCruise` со строки 21 (теперь оно выше)
4. Обновить label (строка 22) — для `category === "classic"` показывать «классические круизы»:
   ```tsx
   const label = isCruise
     ? (currentTour.category === "classic" ? "классические круизы" : "экспедиционные круизы")
     : (regionLabels[currentTour.region] || `туры — ${currentTour.region}`);
   ```

Один файл, одна логическая правка. Все остальные компоненты уже передают полный объект тура с полем `category`.

