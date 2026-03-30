

## Add "Similar Tours" block for all tour categories

### What
Currently the "Similar Tours" carousel only appears on expedition cruise pages. We need to show it on ALL tour detail pages — Japan, Korea, China, North Korea, Russia — with category-appropriate headings like "Похожие туры в Японию", "Похожие туры в Корею", etc.

### How

**`src/pages/TourDetail.tsx`**:

1. Import all tour arrays: `japanTours`, `koreaTours`, `chinaTours`, `northKoreaTours`, `russiaTours` from `@/data/tours`.

2. Create a category mapping to determine which array the current tour belongs to and what heading to show:
```ts
const categoryMap = [
  { list: tours, label: "экспедиционные круизы" },
  { list: japanTours, label: "туры в Японию" },
  { list: koreaTours, label: "туры в Корею" },
  { list: chinaTours, label: "туры в Китай" },
  { list: northKoreaTours, label: "туры в Северную Корею" },
  { list: russiaTours, label: "туры по России" },
];
const category = categoryMap.find(c => c.list.some(t => t.id === tour.id));
const similarTours = category ? category.list.filter(t => t.id !== tour.id) : [];
```

3. Replace the current hardcoded `tours.some(...)` check and heading with the dynamic `category`/`similarTours` logic. The heading becomes:
```
Похожие <span className="italic text-gold-gradient">{category.label}</span>
```

4. The carousel markup stays identical — just fed by `similarTours` from the matched category.

### Files changed
- `src/pages/TourDetail.tsx` — import additional tour arrays, add category detection logic, dynamic heading

