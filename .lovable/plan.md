

## Change "Даты круиза/тура" label based on tour type

### Approach
Determine whether the tour is a cruise by checking if `tour.name` contains the word "круиз" (case-insensitive). No need to add a new field to the data model — multiple tours already have "круиз" in their names.

### File: `src/pages/TourDetail.tsx`

In the sidebar info card, replace the hardcoded string `"Даты круиза/тура"` with a dynamic label:

```tsx
const isCruise = tour.name.toLowerCase().includes("круиз");
// ...
<h4>...{isCruise ? "Дата круиза" : "Дата тура"}</h4>
```

One line of logic, one line changed in the template. No other files affected.

