## План: тур «Три волшебных мира: Шанхай для всей семьи» (`china-shanghai-disney-2026`)

Повторно используем модель `Tour`, страницу `TourDetail`, `ChinaToursPage`, `ToursSection`, `SimilarTours`, `RouteMap`. Нужно расширить дуальный селектор так, чтобы поддерживал 4 строки (TWIN/SGL/EXB/NOBED) с собственной ценой по каждому отелю — текущий `groupHotelPricing` поддерживает только 2 строки (TWIN + SGL-доплата).

## 1. Расширить модель `Tour` — `src/data/tours.ts`

В `groupHotelPricing` добавить опциональное поле `rows` для каждой группы:

```ts
groups: {
  label: string;
  twinByHotel?: Record<string, string>;       // (старый формат, оставляем)
  rows?: { label: string; pricesByHotel: Record<string, string> }[]; // новый формат
}[];
```

Если у группы есть `rows`, рендерим этот список; иначе — текущий рендер TWIN + SGL-доплата (бэкомпат с уже существующим `china-shanghai-fenghuang-2026`).

## 2. Новый объект тура в `chinaTours`

В конец массива `chinaTours`:

- `id: "china-shanghai-disney-2026"`
- `name: "Три волшебных мира: Шанхай для всей семьи"`
- `region: "Китай"`, `category: "Групповой тур"`, `badge: "Экскурсионный тур"`
- `days: 8`, `price: "от 4 935 ¥"`
- `image` + `gallery` — 5 placehold.co (Disney/Legoland/Safari/Yu Garden/Pearl Tower)
- `subtitle: "Семейный тур по паркам развлечений Шанхая для детей и взрослых"`
- `description` — 3 абзаца из ТЗ (вступление + парки + центр + финальный абзац)
- `itinerary` — 8 дней из ТЗ
- `included` — 6 пунктов из ТЗ
- `notIncluded` — 4 пункта
- `extras: undefined` — accordion «Доплаты» НЕ показывать. Особенности обслуживания вынесем в текст последнего абзаца `description` (или добавим отдельной строкой) — accordion в шаблоне рендерится только если `extras` непустой, проверим в TourDetail и оставим без `extras`. Особенности перенесём в `description` (последним абзацем) — это укладывается в текущий шаблон без правок UI.
- `groupSize: "от 2 до 40+ человек"`, `startDates: ["По запросу — 2026"]`
- `groupHotelPricing`:
  - `title: "Стоимость тура на 1 человека (CNY, ¥)"`
  - `defaultGroup: "6-9 человек"`, `defaultHotel: "3★"`
  - `hotels: ["3★", "4★"]`
  - `sglByHotel: {}` (пустое, не используется в новом формате)
  - `groups`: 8 элементов (`2-3 человека`, `4-5 человек`, `6-9 человек`, `10+1`, `15+1`, `20+1`, `30+2`, `40+3`), каждый с `rows` из 4 строк (TWIN, SGL, EXB, NOBED) и ценами по `3★` и `4★` из таблицы ТЗ.

## 3. Маршрут — `src/data/tourRoutes.ts`

```ts
"china-shanghai-disney-2026": [
  { lat: 31.15, lng: 121.67, label: "Диснейленд" },
  { lat: 31.13, lng: 121.71, label: "Леголенд" },
  { lat: 31.10, lng: 121.66, label: "Сафари-парк" },
  { lat: 31.11, lng: 121.05, label: "Чжуцзяцзяо" },
  { lat: 31.23, lng: 121.47, label: "Шанхай (центр)" },
],
```

## 4. UI — `src/pages/TourDetail.tsx`

В блоке `groupHotelPricing` (строки 548–559) заменить жёсткие два ряда на:

```tsx
{grp && (
  <div className="space-y-2 pt-1">
    {grp.rows ? (
      grp.rows.map(r => {
        const v = r.pricesByHotel[curHotel];
        const isDash = !v || v.trim() === "—" || v.trim() === "-";
        return (
          <div key={r.label} className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{r.label}</span>
            <span className={isDash ? "text-muted-foreground/50" : "text-foreground font-medium"}>{v || "—"}</span>
          </div>
        );
      })
    ) : (
      <>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{gh.twinLabel || "Двухместный (½ TWIN)"}</span>
          <span className="text-foreground font-medium">{grp.twinByHotel?.[curHotel]}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{gh.sglLabel || "Доплата за SGL"}</span>
          <span className="text-foreground font-medium">{gh.sglByHotel[curHotel]}</span>
        </div>
      </>
    )}
  </div>
)}
```

Обратная совместимость с `china-shanghai-fenghuang-2026` сохраняется (он использует ветку `else`).

## 5. Что заработает автоматически

- Карточка в `/china-tours` (через `chinaTours` → `ChinaToursPage`)
- Карточка на главной в блоке «Туры по Китаю» (через `ToursSection`)
- Страница тура `/tour/china-shanghai-disney-2026` (общий route `/tour/:id`)
- Хлебные крошки «Главная → Туры по Китаю → Три волшебных мира…»
- TourInfo сайдбар (region «Китай», category «Групповой тур», badge «Экскурсионный тур», days, price, маршрут)
- RouteMap по новым координатам
- Менеджер Виктория (Китай → `ExpeditionManagerCard`)
- `SimilarChinaToursSection`/`SimilarTours` — текущий тур исключается, появляется на других китайских

## Замечание про URL

ТЗ просит `/china-shanghai-disney-2026`, проект использует `/tour/:id`. Тур будет доступен по `/tour/china-shanghai-disney-2026`. Если нужен короткий URL без `/tour/` — добавлю редирект-роут в `App.tsx`, скажите.

## Замечание про accordion «Доплаты»

В этом туре ТЗ просит НЕ показывать accordion. Для этого оставляем `extras` пустым; «Особенности обслуживания» (про трансфер с гидом для группы 10+ и про отель Heyitang) добавим последним абзацем поля `description` без правок UI.
