## Цель
Добавить блок «Условия оплаты» под «Маршрут по дням» на странице тура «Тропические ритмы Сейшельских островов».

## Изменения

### 1. `src/data/tours.ts`
- В интерфейс `Tour` добавить опциональное поле `paymentTerms?: string[]`.
- В записи `seychelles-tropical-rhythms` добавить:
```ts
paymentTerms: [
  "Депозит 30% для подтверждения бронирования",
  "Финальная оплата за 60 дней до начала круиза",
],
```

### 2. `src/pages/TourDetail.tsx`
Сразу после блока «Маршрут по дням» (после `</div>` itinerary, перед блоком Extras) добавить:
```tsx
{tour.paymentTerms && tour.paymentTerms.length > 0 && (
  <div>
    <h2 className="font-serif text-2xl md:text-3xl font-light mb-6">
      Условия <span className="italic text-gold-gradient">оплаты</span>
    </h2>
    <div className="bg-card border border-border p-6 space-y-3">
      {tour.paymentTerms.map((term) => (
        <div key={term} className="flex items-start gap-3">
          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <span className="text-foreground/80 text-sm md:text-base">{term}</span>
        </div>
      ))}
    </div>
  </div>
)}
```

## Результат
Под расписанием появится новый блок «Условия оплаты» с двумя пунктами в фирменной карточке.
