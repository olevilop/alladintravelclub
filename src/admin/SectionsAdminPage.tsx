import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";

const SOURCES = [
  ["tours", "Круизы/экспедиции (набор tours)"], ["japanTours", "Япония"], ["koreaTours", "Корея"],
  ["chinaTours", "Китай"], ["northKoreaTours", "КНДР"], ["russiaTours", "Россия"], ["eventTours", "События"],
];

export default function SectionsAdminPage() {
  const qc = useQueryClient();
  const { data: sections = [], isLoading } = useQuery({ queryKey: ["admin-sections"], queryFn: api.adminSections });
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-sections"] });

  const [open, setOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [f, setF] = useState<any>({ filterType: "source", isActive: true });
  const set = (k: string, v: any) => setF((p: any) => ({ ...p, [k]: v }));

  const openNew = () => { setIsNew(true); setF({ filterType: "source", filterValue: "japanTours", isActive: true }); setOpen(true); };
  const openEdit = (s: any) => {
    setIsNew(false);
    setF({
      id: s.id, title: s.title, filterType: s.filter_type, filterValue: s.filter_value,
      tourIdsText: Array.isArray(s.tour_ids) ? s.tour_ids.join("\n") : "", link: s.link, isActive: s.is_active,
    });
    setOpen(true);
  };

  const payload = () => ({
    title: f.title, filterType: f.filterType, filterValue: f.filterValue,
    tourIds: (f.tourIdsText || "").split("\n").map((x: string) => x.trim()).filter(Boolean),
    link: f.link, isActive: f.isActive,
  });

  const saveMut = useMutation({
    mutationFn: () => isNew ? api.createSection(payload()) : api.updateSection(f.id, payload()),
    onSuccess: () => { toast.success("Сохранено"); setOpen(false); refresh(); },
    onError: (e: any) => toast.error(e.message),
  });
  const delMut = useMutation({
    mutationFn: (id: number) => api.deleteSection(id),
    onSuccess: () => { toast.success("Удалено"); refresh(); }, onError: (e: any) => toast.error(e.message),
  });
  const activeMut = useMutation({
    mutationFn: (s: any) => api.updateSection(s.id, {
      title: s.title, filterType: s.filter_type, filterValue: s.filter_value,
      tourIds: s.tour_ids, link: s.link, isActive: !s.is_active,
    }),
    onSuccess: refresh, onError: (e: any) => toast.error(e.message),
  });
  const reorderMut = useMutation({
    mutationFn: (ids: number[]) => api.reorderSections(ids), onSuccess: refresh, onError: (e: any) => toast.error(e.message),
  });

  const move = (idx: number, dir: -1 | 1) => {
    const arr = [...sections]; const j = idx + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[idx], arr[j]] = [arr[j], arr[idx]];
    reorderMut.mutate(arr.map((s: any) => s.id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Разделы главной страницы</h1>
        <Button className="ml-auto" onClick={openNew}>+ Добавить раздел</Button>
      </div>
      <p className="text-sm text-muted-foreground">Блоки с турами на главной. Можно менять название, порядок, включать/выключать и добавлять новые.</p>

      {isLoading ? <p className="text-muted-foreground">Загрузка…</p> : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr><th className="p-2 w-20">Порядок</th><th className="p-2">Название</th><th className="p-2 w-48">Что показывает</th>
              <th className="p-2 w-24 text-center">Активен</th><th className="p-2 w-40 text-right">Действия</th></tr>
            </thead>
            <tbody>
              {sections.map((s: any, idx: number) => (
                <tr key={s.id} className="border-t hover:bg-muted/30">
                  <td className="p-2"><div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-7 w-7" disabled={idx === 0} onClick={() => move(idx, -1)}>↑</Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" disabled={idx === sections.length - 1} onClick={() => move(idx, 1)}>↓</Button>
                  </div></td>
                  <td className="p-2 font-medium">{s.title}</td>
                  <td className="p-2 text-muted-foreground">
                    {s.filter_type === "category" ? `категория: ${s.filter_value}` :
                     s.filter_type === "manual" ? `выбранные (${(s.tour_ids || []).length})` :
                     `набор: ${s.filter_value}`}
                  </td>
                  <td className="p-2 text-center"><Switch checked={s.is_active} onCheckedChange={() => activeMut.mutate(s)} /></td>
                  <td className="p-2 text-right space-x-1">
                    <Button size="sm" variant="outline" onClick={() => openEdit(s)}>Изменить</Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => { if (confirm(`Удалить «${s.title}»?`)) delMut.mutate(s.id); }}>Удалить</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{isNew ? "Новый раздел" : "Редактирование раздела"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5"><Label>Название *</Label>
              <Input value={f.title ?? ""} onChange={(e) => set("title", e.target.value)} /></div>
            <div className="space-y-1.5">
              <Label>Что показывать</Label>
              <select className="w-full h-10 border rounded-md px-3 bg-background"
                value={f.filterType ?? "source"} onChange={(e) => set("filterType", e.target.value)}>
                <option value="source">Готовый набор туров</option>
                <option value="category">Категория круизов</option>
                <option value="manual">Выбрать туры вручную</option>
              </select>
            </div>
            {f.filterType === "source" && (
              <div className="space-y-1.5"><Label>Набор</Label>
                <select className="w-full h-10 border rounded-md px-3 bg-background"
                  value={f.filterValue ?? ""} onChange={(e) => set("filterValue", e.target.value)}>
                  <option value="">— выберите —</option>
                  {SOURCES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            )}
            {f.filterType === "category" && (
              <div className="space-y-1.5"><Label>Категория</Label>
                <select className="w-full h-10 border rounded-md px-3 bg-background"
                  value={f.filterValue ?? ""} onChange={(e) => set("filterValue", e.target.value)}>
                  <option value="">— выберите —</option>
                  <option value="expedition">Экспедиционные</option>
                  <option value="classic">Классические</option>
                </select>
              </div>
            )}
            {f.filterType === "manual" && (
              <div className="space-y-1.5"><Label>id туров (по одному в строке)</Label>
                <Textarea rows={5} className="font-mono text-xs" value={f.tourIdsText ?? ""}
                  onChange={(e) => set("tourIdsText", e.target.value)} placeholder="japan-classic-tour&#10;korea-grand-tour" />
              </div>
            )}
            <div className="space-y-1.5"><Label>Ссылка заголовка (необязательно)</Label>
              <Input value={f.link ?? ""} onChange={(e) => set("link", e.target.value)} placeholder="/japan-tours" /></div>
            <label className="flex items-center gap-3 cursor-pointer">
              <Switch checked={!!f.isActive} onCheckedChange={(v) => set("isActive", v)} />
              <span className="text-sm">Активен (показывать на главной)</span>
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Отмена</Button>
            <Button onClick={() => saveMut.mutate()} disabled={saveMut.isPending}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
