// Преобразование между строками БД и объектами в формате фронтенда (Tour/Liner).

const TOUR_COLUMNS = {
  id: "id", name: "name", region: "region", continent: "continent",
  subRegion: "sub_region", category: "category", source: "source", days: "days",
  price: "price", image: "image", subtitle: "subtitle", description: "description",
  difficulty: "difficulty", groupSize: "group_size", shipName: "ship_name",
  shipImage: "ship_image", extras: "extras", badge: "badge",
  specialOfferTag: "special_offer_tag", russianGroup: "russian_group",
  isActive: "is_active", isAuthor: "is_author", isCorporate: "is_corporate",
  isWellness: "is_wellness", isSafari: "is_safari", isDiving: "is_diving",
  sortOrder: "sort_order",
};

// строка БД -> объект Tour (как ждёт фронтенд)
export function rowToTour(row) {
  const data = row.data || {};
  return {
    id: row.id,
    name: row.name,
    region: row.region ?? undefined,
    continent: row.continent ?? undefined,
    subRegion: row.sub_region ?? undefined,
    category: row.category ?? undefined,
    source: row.source,
    days: row.days ?? undefined,
    price: row.price ?? undefined,
    image: row.image ?? undefined,
    subtitle: row.subtitle ?? undefined,
    description: row.description ?? undefined,
    difficulty: row.difficulty ?? undefined,
    groupSize: row.group_size ?? undefined,
    shipName: row.ship_name ?? undefined,
    shipImage: row.ship_image ?? undefined,
    extras: row.extras ?? undefined,
    badge: row.badge ?? undefined,
    specialOfferTag: row.special_offer_tag ?? undefined,
    russianGroup: row.russian_group,
    isActive: row.is_active,
    isAuthor: row.is_author,
    isCorporate: row.is_corporate,
    isWellness: row.is_wellness,
    isSafari: row.is_safari,
    isDiving: row.is_diving,
    sortOrder: row.sort_order,
    ...data,
  };
}

// объект Tour (из админки) -> { columns: {colName: value}, data: {...} }
export function tourToRow(body) {
  const columns = {};
  const data = {};
  for (const [k, v] of Object.entries(body)) {
    if (k === "data") continue;
    if (TOUR_COLUMNS[k]) columns[TOUR_COLUMNS[k]] = v;
    else data[k] = v;
  }
  // если фронт прислал вложенный data — мержим
  if (body.data && typeof body.data === "object") Object.assign(data, body.data);
  return { columns, data };
}

export function rowToLiner(row) {
  const data = row.data || {};
  return {
    slug: row.slug,
    name: row.name,
    image: row.image ?? undefined,
    shortDescription: row.short_description ?? undefined,
    isActive: row.is_active,
    sortOrder: row.sort_order,
    ...data,
  };
}

const LINER_COLUMNS = {
  slug: "slug", name: "name", image: "image",
  shortDescription: "short_description", isActive: "is_active", sortOrder: "sort_order",
};

export function linerToRow(body) {
  const columns = {};
  const data = {};
  for (const [k, v] of Object.entries(body)) {
    if (k === "data") continue;
    if (LINER_COLUMNS[k]) columns[LINER_COLUMNS[k]] = v;
    else data[k] = v;
  }
  if (body.data && typeof body.data === "object") Object.assign(data, body.data);
  return { columns, data };
}
