

## Переместить FAQ после «Похожие туры»

### Изменение в `src/pages/TourDetail.tsx`

Поменять местами строки 259 и 261-262: сначала `<SimilarTours />`, затем `<FAQSection />`.

```
<SimilarTours currentTour={tour} />
<FAQSection isCruise={isCruise} />
<Footer />
```

### Файлы
- `src/pages/TourDetail.tsx` — swap order of FAQSection and SimilarTours (lines 259-262)

