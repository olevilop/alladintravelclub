## Цель
Заменить 5 фото в галерее тура «Тропические ритмы Сейшельских островов» на предоставленные Unsplash-картинки.

## Изменения

### `src/data/tours.ts` — `seychelles-tropical-rhythms.gallery`
Заменить массив на 5 URL-ов (в качестве 1600px для Hero):
```ts
gallery: [
  "https://images.unsplash.com/photo-1589979481223-deb893043163?w=1600&q=80",
  "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1600&q=80",
  "https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=1600&q=80",
  "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1600&q=80",
  "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1600&q=80",
],
```

Также синхронизируем главный `image` тура с первым фото (пляж с пальмами).

## Результат
В Hero — пляж Сейшел; стрип превьюшек снизу: пляж, гранитные валуны Ла-Диг, красная сейшельская птица, подводный мир, яхта.
