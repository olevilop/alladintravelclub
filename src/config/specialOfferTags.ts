export const specialOfferTagLabels: Record<string, string> = {
  "hot-deal": "Горячее предложение",
  "new-year": "Новогодний тур",
  "exclusive": "Эксклюзив",
  "russian-group": "Русская группа",
  "author-tour": "Авторский тур",
  "best-seller": "Бестселлер",
  "early-booking": "Раннее бронирование",
};

export const getSpecialOfferLabel = (tag?: string | null): string | null => {
  if (!tag) return null;
  return specialOfferTagLabels[tag] ?? null;
};
