## Проблема

На странице `/special-offers` сейчас выводятся ВСЕ туры (`allTours.map(...)`) плюс фиксированная карточка Мальдив. Это противоречит логике: должны показываться только туры с `specialOfferTag`.

## Что изменить

Файл: `src/pages/SpecialOffersPage.tsx`

1. Подключить также `eventTours` (как в `SpecialOffers.tsx`), чтобы источники были одинаковые.
2. Отфильтровать `allTours` по наличию `specialOfferTag`:
   ```ts
   const allTours = useMemo(
     () => [...tours, ...japanTours, ...koreaTours, ...chinaTours,
            ...northKoreaTours, ...russiaTours, ...eventTours]
            .filter(t => t.specialOfferTag),
     []
   );
   ```
3. Удалить захардкоженную карточку «Мальдивы» — она не имеет `specialOfferTag` и нарушает правило.
4. Hero-картинку брать из отфильтрованного списка (если пусто — fallback или скрыть hero).

## Итог

Страница `/special-offers` будет показывать ровно те же туры, что и блок «Спецпредложения» на главной — туры с проставленным `specialOfferTag` (сейчас 6 экспедиционных туров).
