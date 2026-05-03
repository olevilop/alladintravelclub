## Шаги

1. **Создать `src/components/ExpeditionManagerCard.tsx`** — карточка аналогично TourManagerCard:
   - Заголовок «МЕНЕДЖЕР ПО НАПРАВЛЕНИЮ»
   - Подпись «Менеджер по Экспедиционным круизам — Виктория»
   - Telegram (SVG-иконка бронзовая `text-primary`, ссылка `https://t.me/+79147051705`)
   - WhatsApp (`MessageCircle`, `https://wa.me/79147051705`)
   - Phone (`Phone`, `tel:+79147051705`, отображение `+7 (914) 705-17-05`)

2. **`src/pages/TourDetail.tsx`**:
   - Импортировать `ExpeditionManagerCard`.
   - Заменить условие на:
     ```tsx
     {(tour.region === "Япония" || tour.region === "Южная Корея")
       ? <TourManagerCard />
       : <ExpeditionManagerCard />}
     ```
   Карточка показывается под формой бронирования для всех остальных туров.
