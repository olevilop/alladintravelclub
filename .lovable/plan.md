

## Переместить блок FAQ после блока «Что включено»

### Изменение в `src/pages/TourDetail.tsx`

Сейчас `<FAQSection>` находится в конце страницы (после SimilarTours и SpecialOffers, строка 249). Нужно переместить его внутрь основного контента (левая колонка `lg:col-span-2`), сразу после блока «Что включено / Не включено» (после строки ~163).

1. Удалить строку 249: `<FAQSection isCruise={isCruise} />`
2. Вставить `<FAQSection isCruise={isCruise} />` после закрывающего `</motion.div>` блока «Что включено» (после существующих секций Description → Itinerary → Included/NotIncluded)

### Файл
- `src/pages/TourDetail.tsx`

