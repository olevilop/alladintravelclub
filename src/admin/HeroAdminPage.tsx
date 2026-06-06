import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";

export default function HeroAdminPage() {
  const qc = useQueryClient();
  const { data: slides = [], isLoading } = useQuery({ queryKey: ["admin-hero"], queryFn: api.adminHero });
  const { data: tours = [] } = useQuery({ queryKey: ["admin-tours"], queryFn: api.adminTours });
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-hero"] });

  const [open, setOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [f, setF] = useState<any>({ isActive: true });
  const fileInput = useRef<HTMLInputElement>(null);

  const set = (k: string, v: any) => setF((p: any) => ({ ...p, [k]: v }));
  const openNew = () => { setIsNew(true); setF({ isActive: true }); setOpen(true); };
  const openEdit = (s: any) => {
    setIsNew(false);
    setF({ id: s.id, image: s.image, title: s.title, targetTourId: s.target_tour_id || "", isActive: s.is_active });
    setOpen(true);
  };

  const saveMut = useMutation({
    mutationFn: () => isNew ? api.createHero(f) : api.updateHero(f.id, f),
    onSuccess: () => { toast.success("Сохранено"); setOpen(false); refresh(); },
    onError: (e: any) => toast.error(e.message),
  });
  const delMut = useMutation({
    mutationFn: (id: number) => api.deleteHero(id),
    onSuccess: () => { toast.success("Удалено"); refresh(); },
    onError: (e: any) => toast.error(e.message),
  });
  const activeMut = useMutation({
    mutationFn: (s: any) => api.updateHero(s.id, { image: s.image, title: s.title, targetTourId: s.target_tour_id, isActive: !s.is_active }),
    onSuccess: refresh, onError: (e: any) => toast.error(e.message),
  });
  const reorderMut = useMutation({
    mutationFn: (ids: number[]) => api.reorderHero(ids),
    onSuccess: refresh, onError: (e: any) => toast.error(e.message),
  });

  const move = (idx: number, dir: -1 | 1) => {
    const arr = [...slides]; const j = idx + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[idx], arr[j]] = [arr[j], arr[idx]];
    reorderMut.mutate(arr.map((s: any) => s.id));
  };

  const upload = async (file: File) => {
    try { const { url } = await api.upload(file); set("image", url); toast.success("Фото загружено"); }
    catch (e: any) { toast.error(e.message); }
  };

  const tourName = (id: string) => tours.find((t: any) => t.id === id)?.name;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Главный баннер (Hero)</h1>
        <Button className="ml-auto" onClick={openNew}>+ Добавить слайд</Button>
      </div>
      <p className="text-sm text-muted-foreground">Большие фото вверху главной страницы. У каждого можно задать, на какой тур ведёт клик.</p>

      {isLoading ? <p className="text-muted-foreground">Загрузка…</p> : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr><th className="p-2 w-20">Порядок</th><th className="p-2 w-20">Фото</th><th className="p-2">Заголовок</th>
              <th className="p-2">Ведёт на тур</th><th className="p-2 w-24 text-center">Активен</th><th className="p-2 w-40 text-right">Действия</th></tr>
            </thead>
            <tbody>
              {slides.map((s: any, idx: number) => (
                <tr key={s.id} className="border-t hover:bg-muted/30">
                  <td className="p-2"><div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-7 w-7" disabled={idx === 0} onClick={() => move(idx, -1)}>↑</Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" disabled={idx === slides.length - 1} onClick={() => move(idx, 1)}>↓</Button>
                  </div></td>
                  <td className="p-2">{s.image && <img src={s.image} className="h-12 w-20 object-cover rounded" />}</td>
                  <td className="p-2">{s.title}</td>
                  <td className="p-2 text-muted-foreground">{s.target_tour_id ? (tourName(s.target_tour_id) || s.target_tour_id) : "— не задано —"}</td>
                  <td className="p-2 text-center"><Switch checked={s.is_active} onCheckedChange={() => activeMut.mutate(s)} /></td>
                  <td className="p-2 text-right space-x-1">
                    <Button size="sm" variant="outline" onClick={() => openEdit(s)}>Изменить</Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => { if (confirm("Удалить слайд?")) delMut.mutate(s.id); }}>Удалить</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{isNew ? "Новый слайд" : "Редактирование слайда"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Фото</Label>
              <div className="flex gap-2">
                <Input value={f.image ?? ""} onChange={(e) => set("image", e.target.value)} placeholder="URL или загрузите" />
                <Button type="button" variant="outline" onClick={() => fileInput.current?.click()}>Загрузить</Button>
                <input ref={fileInput} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
              </div>
              {f.image && <img src={f.image} className="h-24 rounded object-cover mt-1" />}
            </div>
            <div className="space-y-1.5"><Label>Заголовок</Label>
              <Input value={f.title ?? ""} onChange={(e) => set("title", e.target.value)} /></div>
            <div className="space-y-1.5">
              <Label>Ведёт на тур (по клику на фото)</Label>
              <select className="w-full h-10 border rounded-md px-3 bg-background"
                value={f.targetTourId ?? ""} onChange={(e) => set("targetTourId", e.target.value)}>
                <option value="">— не задано —</option>
                {tours.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <Switch checked={!!f.isActive} onCheckedChange={(v) => set("isActive", v)} />
              <span className="text-sm">Активен (показывать на сайте)</span>
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
