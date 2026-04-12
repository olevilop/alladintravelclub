

## Замена иконки «Экскурсионный тур»

### Что будет сделано

В sidebar страницы тура заменить иконку `MapPin` на `Compass` для блока «Экскурсионный тур», чтобы она совпадала с иконкой «Экспедиционный круиз».

### Изменение

**`src/pages/TourDetail.tsx`**, строка 205:
- Заменить `<MapPin className="w-4 h-4 text-primary shrink-0" />` на `<Compass className="w-4 h-4 text-primary shrink-0" />`

Иконка `Compass` уже импортирована в файле.

