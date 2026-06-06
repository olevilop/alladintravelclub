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

// Страницы «Подбор отеля» в шапке — у них нет туров, ведут прямо на страницу.
const HOTELS = [
  { url: "/hotels/maldives", title: "Мальдивы" },
  { url: "/hotels/thailand", title: "Таиланд" },
  { url: "/hotels/bali", title: "Бали" },
];

// Какие туры входят в раздел (та же логика, что на главной)
function pickTours(section: any, all: any[]): any[] {
  if (!section) return [];
  if (section.filter_type === "category") return all.filter((t) => t.category === section.filter_value);
  if (section.filter_type === "manual") {
    const ids: string[] = Array.isArray(section.tour_ids) ? section.tour_ids : [];
    const byId = new Map(all.map((t) => [t.id, t]));
    return ids.map((id) => byId.get(id)).filter(Boolean);
  }
  return all.filter((t) => t.source === section.filter_value);
}

export default function HeroAdminPage() {
  const qc = useQueryClient();
  const { data: slides = [], isLoading } = useQuery({ queryKey: ["admin-hero"], queryFn: api.adminHero });
  const { data: tours = [] } = useQuery({ queryKey: ["admin-tours"], queryFn: api.adminTours });
  const { data: sections = [] } = useQuery({ queryKey: ["admin-sections"], queryFn: api.adminSections });
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-hero"] });

  const [open, setOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [f, setF] = useState<any>({ isActive: true, sectionKey: "", targetTourId: "" });
  const fileInput = useRef<HTMLInputElement>(null);
  const set = (k: string, v: any) => setF((p: any) => ({ ...p, [k]: v }));

  // Определить раздел и тур для уже сохранённого слайда
  const detect = (s: any) => {
    if (s.target_url) {
      return { sectionKey: `url:${s.target_url}`, targetTourId: "" };
    }
    if (s.target_tour_id) {
      const sec = sections.find((sec: any) => pickTours(sec, tours).some((t: any) => t.id === s.target_tour_id));
      return { sectionKey: sec ? `sec:${sec.id}` : "", targetTourId: s.target_tour_id };
    }
    return { sectionKey: "", targetTourId: "" };
  };

  const openNew = () => { setIsNew(true); setF({ isActive: true, sectionKey: "", targetTourId: "" }); setOpen(true); };
  const openEdit = (s: any) => {
    setIsNew(false);
    const d = detect(s);
    setF({ id: s.id, image: s.image, title: s.title, isActive: s.is_active, ...d });
    setOpen(true);
  };

  // Раздел, выбранный в первом списке (если это раздел туров)
  const selectedSection = f.sectionKey?.startsWith("sec:")
    ? sections.find((s: any) => String(s.id) === f.sectionKey.slice(4))
    : null;
  const sectionTours = selectedSection ? pickTours(selectedSection, tours) : [];

  const buildPayload = () => {
    let targetTourId: string | null = null;
    let targetUrl: string | null = null;
    if (f.sectionKey?.startsWith("url:")) {
      targetUrl = f.sectionKey.slice(4);
    } else if (f.sectionKey?.startsWith("sec:")) {
      if (f.targetTourId === "__first__") targetTourId = sectionTours[0]?.id || null;
      else targetTourId = f.targetTourId || null;
    }
    return { image: f.image || null, title: f.title || null, targetTourId, targetUrl, isActive: f.isActive };
  };

  const saveMut = useMutation({
    mutationFn: () => isNew ? api.createHero(buildPayload()) : api.updateHero(f.id, buildPayload()),
    onSuccess: () => { toast.success("Сохранено"); setOpen(false); refresh(); },
    onError: (e: any) => toast.error(e.message),
  });
  const delMut = useMutation({
    mutationFn: (id: number) => api.deleteHero(id),
    onSuccess: () => { toast.success("Удалено"); refresh(); }, onError: (e: any) => toast.error(e.message),
  });
  const activeMut = useMutation({
    mutationFn: (s: any) => api.updateHero(s.id, {
      image: s.image, title: s.title, targetTourId: s.target_tour_id, targetUrl: s.target_url, isActive: !s.is_active,
    }),
    onSuccess: refresh, onError: (e: any) => toast.error(e.message),
  });
  const reorderMut = useMutation({
    mutationFn: (ids: number[]) => api.reorderHero(ids), onSuccess: refresh, onError: (e: any) => toast.error(e.message),
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

  // Текст «куда ведёт» для таблицы
  const targetLabel = (s: any) => {
    if (s.target_url) {
      const h = HOTELS.find((h) => h.url === s.target_url);
      return h ? `Подбор отеля — ${h.title}` : s.target_url;
    }
    if (s.target_tour_id) return tours.find((t: any) => t.id === s.target_tour_id)?.name || s.target_tour_id;
    return "— не задано —";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Главный баннер (Hero)</h1>
        <Button className="ml-auto" onClick={openNew}>+ Добавить слайд</Button>
      </div>
      <p className="text-sm text-muted-foreground">Большие фото вверху главной страницы. У каждого можно задать, куда ведёт клик.</p>

      {isLoading ? <p className="text-muted-foreground">Загрузка…</p> : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr><th className="p-2 w-20">Порядок</th><th className="p-2 w-20">Фото</th><th className="p-2">Заголовок</th>
              <th className="p-2">Куда ведёт</th><th className="p-2 w-24 text-center">Активен</th><th className="p-2 w-40 text-right">Действия</th></tr>
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
                  <td className="p-2 text-muted-foreground">{targetLabel(s)}</td>
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
              <Label>Куда ведёт клик — сначала выбери раздел</Label>
              <select className="w-full h-10 border rounded-md px-3 bg-background"
                value={f.sectionKey ?? ""}
                onChange={(e) => setF((p: any) => ({ ...p, sectionKey: e.target.value, targetTourId: e.target.value.startsWith("sec:") ? "__first__" : "" }))}>
                <option value="">— не задано —</option>
                <optgroup label="Разделы туров">
                  {sections.map((s: any) => <option key={s.id} value={`sec:${s.id}`}>{s.title}</option>)}
                </optgroup>
                <optgroup label="Подбор отеля">
                  {HOTELS.map((h) => <option key={h.url} value={`url:${h.url}`}>{h.title}</option>)}
                </optgroup>
              </select>
            </div>

            {selectedSection && (
              <div className="space-y-1.5">
                <Label>Тур из раздела «{selectedSection.title}»</Label>
                <select className="w-full h-10 border rounded-md px-3 bg-background"
                  value={f.targetTourId ?? ""} onChange={(e) => set("targetTourId", e.target.value)}>
                  <option value="__first__">— первый тур раздела —</option>
                  {sectionTours.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                {!sectionTours.length && <p className="text-xs text-muted-foreground">В этом разделе пока нет туров.</p>}
              </div>
            )}

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
