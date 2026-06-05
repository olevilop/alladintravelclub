import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

const SOURCE_LABEL: Record<string, string> = {
  tours: "Круизы/экспедиции",
  japanTours: "Япония",
  koreaTours: "Корея",
  chinaTours: "Китай",
  northKoreaTours: "КНДР",
  russiaTours: "Россия",
  eventTours: "События",
};

export default function ToursAdminPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const { data: tours = [], isLoading } = useQuery({ queryKey: ["admin-tours"], queryFn: api.adminTours });

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-tours"] });

  const activeMut = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => api.setTourActive(id, isActive),
    onSuccess: refresh,
    onError: (e: any) => toast.error(e.message),
  });
  const reorderMut = useMutation({
    mutationFn: (ids: string[]) => api.reorderTours(ids),
    onSuccess: refresh,
    onError: (e: any) => toast.error(e.message),
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => api.deleteTour(id),
    onSuccess: () => { toast.success("Программа удалена"); refresh(); },
    onError: (e: any) => toast.error(e.message),
  });

  const filtered = useMemo(
    () => tours.filter((t: any) => t.name?.toLowerCase().includes(search.toLowerCase())),
    [tours, search]
  );

  const move = (index: number, dir: -1 | 1) => {
    const arr = [...tours];
    const j = index + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[index], arr[j]] = [arr[j], arr[index]];
    reorderMut.mutate(arr.map((t: any) => t.id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">Программы</h1>
        <Badge variant="secondary">{tours.length}</Badge>
        <div className="ml-auto flex items-center gap-2">
          <Input placeholder="Поиск по названию…" value={search}
            onChange={(e) => setSearch(e.target.value)} className="w-56" />
          <Button asChild><Link to="/admin/tours/new">+ Добавить программу</Link></Button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Загрузка…</p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-2 w-20">Порядок</th>
                <th className="p-2 w-14">Фото</th>
                <th className="p-2">Название</th>
                <th className="p-2 w-40">Раздел</th>
                <th className="p-2 w-28">Цена</th>
                <th className="p-2 w-24 text-center">Активна</th>
                <th className="p-2 w-40 text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t: any) => {
                const idx = tours.findIndex((x: any) => x.id === t.id);
                return (
                  <tr key={t.id} className="border-t hover:bg-muted/30">
                    <td className="p-2">
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="h-7 w-7" disabled={idx === 0}
                          onClick={() => move(idx, -1)} title="Выше">↑</Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7" disabled={idx === tours.length - 1}
                          onClick={() => move(idx, 1)} title="Ниже">↓</Button>
                      </div>
                    </td>
                    <td className="p-2">
                      {t.image ? <img src={t.image} alt="" className="h-10 w-10 object-cover rounded" /> : null}
                    </td>
                    <td className="p-2 font-medium">{t.name}</td>
                    <td className="p-2 text-muted-foreground">{SOURCE_LABEL[t.source] || t.source}</td>
                    <td className="p-2">{t.price}</td>
                    <td className="p-2 text-center">
                      <Switch checked={!!t.isActive}
                        onCheckedChange={(v) => activeMut.mutate({ id: t.id, isActive: v })} />
                    </td>
                    <td className="p-2 text-right space-x-1">
                      <Button size="sm" variant="outline" asChild><Link to={`/admin/tours/${t.id}`}>Изменить</Link></Button>
                      <Button size="sm" variant="ghost" className="text-destructive"
                        onClick={() => { if (confirm(`Удалить «${t.name}»?`)) deleteMut.mutate(t.id); }}>Удалить</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!filtered.length && <p className="p-4 text-muted-foreground text-center">Ничего не найдено</p>}
        </div>
      )}
    </div>
  );
}
