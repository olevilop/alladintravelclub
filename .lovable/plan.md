## Добавить specialOfferTag к экспедиционным турам

В `src/data/tours.ts` добавить поле `specialOfferTag` к турам экспедиционной категории, кроме «Антарктический полуостров и море Уэдделла» (`antarctic-penguins`).

| ID тура | specialOfferTag |
|---|---|
| seychelles-tropical-rhythms | russian-group (уже есть) |
| indonesia-raja-ampat-cruise | russian-group |
| vietnam-cambodia-mekong-cruise | russian-group |
| china-yangtze-cruise-2026 | russian-group |
| brazil-scenic-eclipse-2027 | russian-group (уже есть) |
| antarctica-newyear-2027 | new-year |
| antarctic-penguins | — (не добавлять) |

Итог: блок «Спецпредложения» на главной автоматически покажет 6 туров.
