## Цель
Добавить блок «Стоимость кают» с интерактивным селектором между картой маршрута и формой бронирования в сайдбаре страницы тура. Применяется только к туру `seychelles-tropical-rhythms`.

## Изменения

### 1. `src/data/tours.ts`
Добавить в интерфейс `Tour`:
```ts
cabinPricing?: {
  note?: string;
  footnote?: string;
  defaultCabin?: string;
  cabins: { name: string; price?: string; soldOut?: boolean }[];
};
```

В записи `seychelles-tropical-rhythms` добавить:
```ts
cabinPricing: {
  note: "На 1 человека при двухместном размещении",
  footnote: "*Цены указаны с учётом скидки раннего бронирования и могут быть изменены круизной компанией в любой момент.",
  defaultCabin: "Люкс с балконом B (31 м²)",
  cabins: [
    { name: "Стандартная каюта (21–23 м²)", soldOut: true },
    { name: "Люкс с балконом B (31 м²)", price: "€7 025" },
    { name: "Люкс с балконом A (31 м²)", price: "€7 305" },
    { name: "Люкс с балконом AB (31 м²)", soldOut: true },
    { name: "Люкс Делюкс с балконом (44 м²)", soldOut: true },
    { name: "Люкс Судовладельца (131 м²)", price: "€17 035" },
  ],
},
```

### 2. `src/pages/TourDetail.tsx`
- Добавить `useState` для `selectedCabin`.
- Сразу после блока `RouteMap` (и до `occupancyPricing` / прочих pricing-блоков, чтобы он был между картой и формой бронирования) вставить:

```tsx
{tour.cabinPricing && (() => {
  const def = tour.cabinPricing.defaultCabin
    || tour.cabinPricing.cabins.find(c => !c.soldOut)?.name
    || "";
  const current = selectedCabin || def;
  const cabin = tour.cabinPricing.cabins.find(c => c.name === current);
  return (
    <div className="bg-card border border-border p-4 space-y-3">
      <div>
        <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground mb-1">Стоимость кают</h4>
        {tour.cabinPricing.note && (
          <p className="text-xs text-muted-foreground">{tour.cabinPricing.note}</p>
        )}
      </div>
      <Select value={current} onValueChange={setSelectedCabin}>
        <SelectTrigger className="w-full bg-background border-border text-foreground">
          <SelectValue placeholder="Выбрать каюту" />
        </SelectTrigger>
        <SelectContent>
          {tour.cabinPricing.cabins.map(c => (
            <SelectItem
              key={c.name}
              value={c.name}
              disabled={c.soldOut}
              className={c.soldOut ? "opacity-50" : ""}
            >
              <span>{c.name}</span>
              {c.soldOut
                ? <span className="ml-2 text-muted-foreground">— продано</span>
                : c.price && <span className="ml-2 text-primary">— {c.price}</span>}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {cabin?.price && (
        <div className="font-serif text-3xl text-primary pt-1">{cabin.price}</div>
      )}
      {tour.cabinPricing.footnote && (
        <p className="text-[11px] text-muted-foreground leading-snug">{tour.cabinPricing.footnote}</p>
      )}
    </div>
  );
})()}
```

## Результат
В сайдбаре между картой маршрута и формой бронирования появится карточка «Стоимость кают» с подсказкой, селектом (с серыми «продано» позициями) и крупной ценой выбранной каюты в фирменном цвете.
