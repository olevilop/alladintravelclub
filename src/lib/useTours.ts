import { useQuery } from "@tanstack/react-query";
import { api } from "./api";

const KEY = "atc-tours-cache";

// Туры из базы с мгновенным показом последних сохранённых (из localStorage),
// чтобы при обновлении страницы сразу были правильные фото, без мигания.
export function useTours() {
  return useQuery<any[]>({
    queryKey: ["tours-all"],
    queryFn: async () => {
      const data = await api.getTours();
      try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* ignore */ }
      return data as any[];
    },
    initialData: () => {
      try {
        const c = localStorage.getItem(KEY);
        return c ? (JSON.parse(c) as any[]) : undefined;
      } catch { return undefined; }
    },
    initialDataUpdatedAt: 0,     // считать кэш «устаревшим» → обновить в фоне
    staleTime: 5 * 60 * 1000,
  });
}
