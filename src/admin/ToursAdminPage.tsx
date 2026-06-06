import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

// Разделы (как на главной). Каждый знает, какие программы в него входят и что подставить при создании.
const GROUPS: { key: string; title: string; match: (t: any) => boolean; preset: Record<string, string> }[] = [
  { key: "expedition", title: "Экспедиционные круизы", match: (t) => t.source === "tours" && t.category !== "classic", preset: { source: "tours", category: "expedition" } },
  { key: "classic", title: "Классические круизы", match: (t) => t.source === "tours" && t.category === "classic", preset: { source: "tours", category: "classic" } },
  { key: "japanTours", title: "Туры по Японии", match: (t) => t.source === "japanTours", preset: { source: "japanTours" } },
  { key: "koreaTours", title: "Туры по Южной Корее", match: (t) => t.source === "koreaTours", preset: { source: "koreaTours" } },
  { key: "chinaTours", title: "Туры по Китаю", match: (t) => t.source === "chinaTours", preset: { source: "chinaTours" } },
  { key: "northKoreaTours", title: "Туры по Северной Корее", match: (t) => t.source === "northKoreaTours", preset: { source: "northKoreaTours" } },
  { key: "russiaTours", title: "Туры по России", match: (t) => t.source === "russiaTours", preset: { source: "russiaTours" } },
  { key: "eventTours", title: "Событийные туры", match: (t) => t.source === "eventTours", preset: { source: "eventTours" } },
];

export default function ToursAdminPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const { data: tours = [], isLoading } = useQuery({ queryKey: ["admin-tours"], queryFn: api.adminTours });
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-tours"] });

  const activeMut = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => api.setTourActive(id, isActive),
    onSuccess: refresh, onError: (e: any) => toast.error(e.message),
  });
  const reorderMut = useMutation({
    mutationFn: (ids: string[]) => api.reorderTours(ids), onSuccess: refresh, onError: (e: any) => toast.error(e.message),
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => api.deleteTour(id),
    onSuccess: () => { toast.success("Программа удалена"); refresh(); }, onError: (e: any) => toast.error(e.message),
  });

  // Группируем все программы по разделам (плюс «Прочее» для тех, что не попали ни в один)
  const groupsFull = useMemo(() => {
    const used = new Set<string>();
    const res = GROUPS.map((g) => {
      const items = tours.filter((t: any) => { const m = g.match(t); if (m) used.add(t.id); return m; });
      return { ...g, items };
    });
    const rest = tours.filter((t: any) => !used.has(t.id));
    if (rest.length) res.push({ key: "__rest", title: "Прочее", match: () => false, preset: {}, items: rest } as any);
    return res;
  }, [tours]);

  // Перемещение внутри раздела: меняем местами и пересохраняем общий порядок
  const move = (groupKey: string, idx: number, dir: -1 | 1) => {
    const groups = groupsFull.map((g) => ({ ...g, items: [...g.items] }));
    const g = groups.find((x) => x.key === groupKey);
    if (!g) return;
    const j = idx + dir;
    if (j < 0 || j >= g.items.length) return;
    [g.items[idx], g.items[j]] = [g.items[j], g.items[idx]];
    reorderMut.mutate(groups.flatMap((x) => x.items).map((t: any) => t.id));
  };

  const q = search.toLowerCase();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">Программы</h1>
        <Badge variant="secondary">{tours.length}</Badge>
        <Input placeholder="Поиск по названию…" value={search}
          onChange={(e) => setSearch(e.target.value)} className="w-56 ml-auto" />
      </div>

      {isLoading ? <p className="text-muted-foreground">Загрузка…</p> : groupsFull.map((g) => {
        const items = g.items.filter((t: any) => t.name?.toLowerCase().includes(q));
        if (search && !items.length) return null;
        const preset = new URLSearchParams(g.preset as Record<string, string>).toString();
        return (
          <section key={g.key} className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">{g.title}</h2>
              <Badge variant="outline">{g.items.length}</Badge>
              {g.key !== "__rest" && (
                <Button size="sm" variant="outline" className="ml-auto" asChild>
                  <Link to={`/admin/tours/new${preset ? "?" + preset : ""}`}>+ Добавить в этот раздел</Link>
                </Button>
              )}
            </div>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="p-2 w-20">Порядок</th><th className="p-2 w-14">Фото</th><th className="p-2">Название</th>
                    <th className="p-2 w-28">Цена</th><th className="p-2 w-24 text-center">Активна</th>
                    <th className="p-2 w-40 text-right">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((t: any) => {
                    const idx = g.items.findIndex((x: any) => x.id === t.id);
                    return (
                      <tr key={t.id} className="border-t hover:bg-muted/30">
                        <td className="p-2"><div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="h-7 w-7" disabled={idx === 0} onClick={() => move(g.key, idx, -1)}>↑</Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7" disabled={idx === g.items.length - 1} onClick={() => move(g.key, idx, 1)}>↓</Button>
                        </div></td>
                        <td className="p-2">{t.image && <img src={t.image} alt="" className="h-10 w-10 object-cover rounded" />}</td>
                        <td className="p-2 font-medium">{t.name}</td>
                        <td className="p-2">{t.price}</td>
                        <td className="p-2 text-center">
                          <Switch checked={!!t.isActive} onCheckedChange={(v) => activeMut.mutate({ id: t.id, isActive: v })} />
                        </td>
                        <td className="p-2 text-right space-x-1">
                          <Button size="sm" variant="outline" asChild><Link to={`/admin/tours/${t.id}`}>Изменить</Link></Button>
                          <Button size="sm" variant="ghost" className="text-destructive"
                            onClick={() => { if (confirm(`Удалить «${t.name}»?`)) deleteMut.mutate(t.id); }}>Удалить</Button>
                        </td>
                      </tr>
                    );
                  })}
                  {!items.length && <tr><td colSpan={6} className="p-3 text-center text-muted-foreground">Нет программ в этом разделе</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}
