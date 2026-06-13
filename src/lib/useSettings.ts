import { useQuery } from "@tanstack/react-query";
import { api } from "./api";

const KEY = "atc-settings-cache";

// Настройки сайта (переключатели) с мгновенным показом из localStorage.
export function useSettings() {
  const q = useQuery<Record<string, string>>({
    queryKey: ["settings"],
    queryFn: async () => {
      const data = await api.getSettings();
      try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* ignore */ }
      return data;
    },
    initialData: () => {
      try { const c = localStorage.getItem(KEY); return c ? JSON.parse(c) : undefined; }
      catch { return undefined; }
    },
    initialDataUpdatedAt: 0,
    staleTime: 5 * 60 * 1000,
  });
  const settings = q.data || {};
  // Переключатель включён, если значение не "false" (по умолчанию — включено)
  const isEnabled = (key: string) => settings[key] !== "false";
  return { settings, isEnabled };
}
