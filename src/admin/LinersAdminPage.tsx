import { useRef, useState } from "react";
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

const KNOWN = new Set(["slug", "name", "image", "shortDescription", "isActive", "sortOrder"]);

export default function LinersAdminPage() {
  const qc = useQueryClient();
  const { data: liners = [], isLoading } = useQuery({ queryKey: ["admin-liners"], queryFn: api.adminLiners });
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-liners"] });

  const [open, setOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [f, setF] = useState<any>({ isActive: true });
  const [advanced, setAdvanced] = useState("{}");
  const fileInput = useRef<HTMLInputElement>(null);

  const set = (k: string, v: any) => setF((p: any) => ({ ...p, [k]: v }));

  const openNew = () => { setIsNew(true); setF({ isActive: true }); setAdvanced("{}"); setOpen(true); };
  const openEdit = (l: any) => {
    setIsNew(false);
    const adv: any = {};
    for (const [k, v] of Object.entries(l)) if (!KNOWN.has(k)) adv[k] = v;
    setF(l); setAdvanced(JSON.stringify(adv, null, 2)); setOpen(true);
  };

  const saveMut = useMutation({
    mutationFn: async () => {
      let adv: any = {};
      if (advanced.trim()) { try { adv = JSON.parse(advanced); } catch { throw new Error("Расширенный JSON некорректен"); } }
      const payload = { ...adv, ...f };
      return isNew ? api.createLiner(payload) : api.updateLiner(f.slug, payload);
    },
    onSuccess: () => { toast.success("Сохранено"); setOpen(false); refresh(); },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (slug: string) => api.deleteLiner(slug),
    onSuccess: () => { toast.success("Удалено"); refresh(); },
    onError: (e: any) => toast.error(e.message),
  });

  const upload = async (file: File) => {
    try { const { url } = await api.upload(file); set("image", url); toast.success("Фото загружено"); }
    catch (e: any) { toast.error(e.message); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Лайнеры</h1>
        <Button className="ml-auto" onClick={openNew}>+ Добавить лайнер</Button>
      </div>

      {isLoading ? <p className="text-muted-foreground">Загрузка…</p> : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr><th className="p-2 w-14">Фото</th><th className="p-2">Название</th>
              <th className="p-2 w-40">slug</th><th className="p-2 w-40 text-right">Действия</th></tr>
            </thead>
            <tbody>
              {liners.map((l: any) => (
                <tr key={l.slug} className="border-t hover:bg-muted/30">
                  <td className="p-2">{l.image && <img src={l.image} className="h-10 w-10 object-cover rounded" />}</td>
                  <td className="p-2 font-medium">{l.name}</td>
                  <td className="p-2 text-muted-foreground">{l.slug}</td>
                  <td className="p-2 text-right space-x-1">
                    <Button size="sm" variant="outline" onClick={() => openEdit(l)}>Изменить</Button>
                    <Button size="sm" variant="ghost" className="text-destructive"
                      onClick={() => { if (confirm(`Удалить «${l.name}»?`)) deleteMut.mutate(l.slug); }}>Удалить</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!liners.length && <p className="p-4 text-center text-muted-foreground">Лайнеров нет</p>}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{isNew ? "Новый лайнер" : "Редактирование лайнера"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>slug *</Label>
              <Input value={f.slug ?? ""} disabled={!isNew}
                onChange={(e) => set("slug", e.target.value.replace(/[^a-z0-9-]/g, "-"))} />
            </div>
            <div className="space-y-1.5"><Label>Название *</Label>
              <Input value={f.name ?? ""} onChange={(e) => set("name", e.target.value)} /></div>
            <div className="space-y-1.5">
              <Label>Фото</Label>
              <div className="flex gap-2">
                <Input value={f.image ?? ""} onChange={(e) => set("image", e.target.value)} />
                <Button type="button" variant="outline" onClick={() => fileInput.current?.click()}>Загрузить</Button>
                <input ref={fileInput} type="file" accept="image/*" hidden
                  onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
              </div>
            </div>
            <div className="space-y-1.5"><Label>Краткое описание</Label>
              <Textarea rows={2} value={f.shortDescription ?? ""} onChange={(e) => set("shortDescription", e.target.value)} /></div>
            <label className="flex items-center gap-3 cursor-pointer">
              <Switch checked={!!f.isActive} onCheckedChange={(v) => set("isActive", v)} />
              <span className="text-sm">Активен (показывать на сайте)</span>
            </label>
            <div className="space-y-1.5">
              <Label>Расширенные данные (JSON): описание, характеристики, каюты, галерея</Label>
              <Textarea rows={8} className="font-mono text-xs" value={advanced} onChange={(e) => setAdvanced(e.target.value)} />
            </div>
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
