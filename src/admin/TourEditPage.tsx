import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { api } from "@/lib/api";

const SOURCES = [
  ["tours", "Круизы/экспедиции"], ["japanTours", "Япония"], ["koreaTours", "Корея"],
  ["chinaTours", "Китай"], ["northKoreaTours", "КНДР"], ["russiaTours", "Россия"],
  ["eventTours", "События"],
];
const FLAGS: [string, string][] = [
  ["isActive", "Активна (показывать на сайте)"], ["russianGroup", "Русская группа"],
  ["isAuthor", "Авторский тур"], ["isCorporate", "Корпоративный"], ["isWellness", "Велнес"],
  ["isSafari", "Сафари"], ["isDiving", "Дайвинг"],
];
// Поля, которые редактируются отдельными контролами (не попадают в «расширенный JSON»)
const KNOWN = new Set([
  "id", "name", "region", "continent", "subRegion", "category", "source", "days", "price",
  "image", "subtitle", "description", "difficulty", "groupSize", "shipName", "shipImage",
  "extras", "badge", "specialOfferTag", "sortOrder",
  ...FLAGS.map((f) => f[0]),
  "gallery", "startDates", "included", "notIncluded",
]);

const linesToArr = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);
const arrToLines = (a: any) => (Array.isArray(a) ? a.join("\n") : "");

export default function TourEditPage() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  const [f, setF] = useState<any>({ source: "tours", isActive: true });
  const [gallery, setGallery] = useState("");
  const [startDates, setStartDates] = useState("");
  const [included, setIncluded] = useState("");
  const [notIncluded, setNotIncluded] = useState("");
  const [advanced, setAdvanced] = useState("{}");

  const imageInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNew) return;
    api.adminTour(id!)
      .then((t: any) => {
        setGallery(arrToLines(t.gallery));
        setStartDates(arrToLines(t.startDates));
        setIncluded(arrToLines(t.included));
        setNotIncluded(arrToLines(t.notIncluded));
        const adv: any = {};
        for (const [k, v] of Object.entries(t)) if (!KNOWN.has(k)) adv[k] = v;
        setAdvanced(JSON.stringify(adv, null, 2));
        setF(t);
      })
      .catch((e: any) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const set = (k: string, v: any) => setF((p: any) => ({ ...p, [k]: v }));

  const uploadImage = async (file: File, target: "image" | "gallery") => {
    try {
      const { url } = await api.upload(file);
      if (target === "image") set("image", url);
      else setGallery((g) => (g ? g + "\n" + url : url));
      toast.success("Фото загружено");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const save = async () => {
    let adv: any = {};
    if (advanced.trim()) {
      try { adv = JSON.parse(advanced); }
      catch { toast.error("Расширенный JSON некорректен — проверьте синтаксис"); return; }
    }
    if (!f.id || !f.name) { toast.error("Заполните «Ссылка (id)» и «Название»"); return; }

    const payload: any = {
      ...adv,
      ...f,
      days: f.days ? Number(f.days) : undefined,
      gallery: linesToArr(gallery),
      startDates: linesToArr(startDates),
      included: linesToArr(included),
      notIncluded: linesToArr(notIncluded),
    };
    setSaving(true);
    try {
      if (isNew) await api.createTour(payload);
      else await api.updateTour(id!, payload);
      toast.success("Сохранено");
      navigate("/admin");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted-foreground">Загрузка…</p>;

  const field = (k: string, label: string, props: any = {}) => (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={f[k] ?? ""} onChange={(e) => set(k, e.target.value)} {...props} />
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => navigate("/admin")}>← Назад</Button>
        <h1 className="text-2xl font-bold">{isNew ? "Новая программа" : "Редактирование программы"}</h1>
      </div>

      <section className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Ссылка (id) {isNew && <span className="text-destructive">*</span>}</Label>
          <Input value={f.id ?? ""} disabled={!isNew} placeholder="напр. japan-classic-tour"
            onChange={(e) => set("id", e.target.value.replace(/[^a-z0-9-]/g, "-"))} />
        </div>
        {field("name", "Название *")}
        <div className="space-y-1.5">
          <Label>Раздел</Label>
          <select className="w-full h-10 border rounded-md px-3 bg-background"
            value={f.source ?? "tours"} onChange={(e) => set("source", e.target.value)}>
            {SOURCES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        {field("region", "Регион")}
        {field("category", "Категория (expedition/classic)")}
        {field("price", "Цена (текстом, напр. «от €7 025»)")}
        {field("days", "Дней", { type: "number" })}
        {field("badge", "Бейдж (напр. 🇷🇺 РУССКАЯ ГРУППА)")}
        {field("specialOfferTag", "Тег спецпредложения (hot-deal/new-year/…)")}
        {field("difficulty", "Сложность")}
        {field("groupSize", "Размер группы")}
        {field("shipName", "Название судна (для круизов)")}
      </section>

      <div className="space-y-1.5">
        <Label>Главное фото</Label>
        <div className="flex gap-2">
          <Input value={f.image ?? ""} onChange={(e) => set("image", e.target.value)} placeholder="URL или загрузите файл" />
          <Button type="button" variant="outline" onClick={() => imageInput.current?.click()}>Загрузить</Button>
          <input ref={imageInput} type="file" accept="image/*" hidden
            onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "image")} />
        </div>
        {f.image && <img src={f.image} alt="" className="h-24 rounded object-cover" />}
      </div>

      <div className="space-y-1.5">
        <Label>Подзаголовок</Label>
        <Input value={f.subtitle ?? ""} onChange={(e) => set("subtitle", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label>Описание</Label>
        <Textarea rows={5} value={f.description ?? ""} onChange={(e) => set("description", e.target.value)} />
      </div>

      <section className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label>Галерея (по одной ссылке в строке)</Label>
            <Button type="button" size="sm" variant="outline" onClick={() => galleryInput.current?.click()}>+ фото</Button>
            <input ref={galleryInput} type="file" accept="image/*" hidden
              onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "gallery")} />
          </div>
          <Textarea rows={5} value={gallery} onChange={(e) => setGallery(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Даты заездов (по одной в строке)</Label>
          <Textarea rows={5} value={startDates} onChange={(e) => setStartDates(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Включено (по одному в строке)</Label>
          <Textarea rows={5} value={included} onChange={(e) => setIncluded(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Не включено (по одному в строке)</Label>
          <Textarea rows={5} value={notIncluded} onChange={(e) => setNotIncluded(e.target.value)} />
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-3 border rounded-lg p-4">
        {FLAGS.map(([k, label]) => (
          <label key={k} className="flex items-center gap-3 cursor-pointer">
            <Switch checked={!!f[k]} onCheckedChange={(v) => set(k, v)} />
            <span className="text-sm">{label}</span>
          </label>
        ))}
      </section>

      <div className="space-y-1.5">
        <Label>Расширенные данные (JSON): маршрут по дням, таблицы цен, FAQ и т.п.</Label>
        <Textarea rows={10} className="font-mono text-xs" value={advanced}
          onChange={(e) => setAdvanced(e.target.value)} />
        <p className="text-xs text-muted-foreground">
          Здесь хранятся сложные поля (itinerary, hotelPricing, cabinPricing, faq…). Меняйте осторожно — это формат JSON.
        </p>
      </div>

      <div className="flex gap-2 sticky bottom-0 bg-background py-3 border-t">
        <Button onClick={save} disabled={saving}>{saving ? "Сохранение…" : "Сохранить"}</Button>
        <Button variant="outline" onClick={() => navigate("/admin")}>Отмена</Button>
      </div>
    </div>
  );
}
