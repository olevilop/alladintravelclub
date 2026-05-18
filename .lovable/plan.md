## Цена с выпадающим меню «Отели 3* / 4*» для туров по Южной Корее

Сейчас блок «Стоимость тура на 1 человека» на странице тура (`src/pages/TourDetail.tsx`, строки 420–433) рендерит фиксированный список из `tour.occupancyPricing.rows`. Все 5 туров Кореи используют общую константу `koreaOccupancyPricing` (`src/data/tours.ts`, строка 162):

- 1 чел. в номере — $2 200
- 2 чел. в номере — $1 599
- 3 чел. в номере — $1 549

Нужно: добавить в этот блок выпадающий select с двумя опциями — «Отели 3*» и «Отели 4*». Категории и цены 3* остаются прежними; цены 4* = цены 3* + $100 к каждой строке.

### Что меняем

**1. `src/data/tours.ts`**
- Расширить тип `occupancyPricing` на тип-объединение:
  ```ts
  occupancyPricing?:
    | { rows: { label: string; price: string }[] }
    | {
        defaultHotel?: string;
        hotels: { label: string; rows: { label: string; price: string }[] }[];
      };
  ```
- Переписать `koreaOccupancyPricing` в новый формат:
  ```ts
  export const koreaOccupancyPricing = {
    defaultHotel: "Отели 3*",
    hotels: [
      { label: "Отели 3*", rows: [
        { label: "1 чел. в номере", price: "$2 200" },
        { label: "2 чел. в номере", price: "$1 599" },
        { label: "3 чел. в номере", price: "$1 549" },
      ]},
      { label: "Отели 4*", rows: [
        { label: "1 чел. в номере", price: "$2 300" },
        { label: "2 чел. в номере", price: "$1 699" },
        { label: "3 чел. в номере", price: "$1 649" },
      ]},
    ],
  };
  ```

**2. `src/pages/TourDetail.tsx`**
- Добавить локальный state `selectedOccupancyHotel`.
- В блоке `occupancyPricing` (строки 421–433): если у объекта есть поле `hotels`, рендерим `Select` (как уже используется для `hotelPricing`) с опциями `hotels[].label`, ниже — строки выбранной категории. Если `rows` — оставляем старый рендер (обратная совместимость с другими турами, если такие появятся).

Остальные туры (не Корея) не используют `occupancyPricing`, так что регрессий не будет. Применится автоматически ко всем 5 корейским турам через общую константу.
