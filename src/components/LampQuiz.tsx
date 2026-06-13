import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTours } from "@/lib/useTours";

type Opt = { label: string; score: (t: any) => number };
type Q = { id: string; title: string; options: Opt[] };

const COUNTRY_SOURCES = ["japanTours", "koreaTours", "chinaTours", "northKoreaTours", "russiaTours", "eventTours"];
const ASIA_SOURCES = ["japanTours", "koreaTours", "chinaTours", "northKoreaTours"];
const txt = (t: any) => `${t.name || ""} ${t.subtitle || ""} ${t.region || ""} ${t.continent || ""}`.toLowerCase();
const priceNum = (t: any) => parseInt(String(t.price || "").replace(/[^\d]/g, ""), 10) || 0;

// Страницы «Подбор отеля» как варианты подбора (у них нет тура — ведут на свою страницу)
const HOTELS = [
  { id: "hotels-maldives", name: "Подбор отеля на Мальдивах", region: "Мальдивы", url: "/hotels/maldives", image: "/tour-assets/hero-maldives.jpg", subtitle: "пляжный отдых, море, острова, релакс, спа, отель", isHotel: true },
  { id: "hotels-thailand", name: "Подбор отеля в Таиланде", region: "Таиланд", url: "/hotels/thailand", image: "/tour-assets/islands.jpg", subtitle: "пляж, море, острова, отдых, отель, релакс", isHotel: true },
  { id: "hotels-bali", name: "Подбор отеля на Бали", region: "Бали", url: "/hotels/bali", image: "/tour-assets/islands.jpg", subtitle: "пляж, океан, острова, отдых, отель, релакс", isHotel: true },
];

const QUESTIONS: Q[] = [
  {
    id: "type",
    title: "Что ближе по душе?",
    options: [
      { label: "Морской круиз", score: (t) => (t.category === "expedition" || t.category === "classic" || t.shipName) ? 3 : 0 },
      { label: "Путешествие по стране (тур)", score: (t) => COUNTRY_SOURCES.includes(t.source) ? 3 : 0 },
      { label: "Отдых в отеле у моря", score: (t) => t.isHotel ? 4 : (/пляж|остров|море/.test(txt(t)) ? 1 : 0) },
      { label: "Без разницы", score: () => 0 },
    ],
  },
  {
    id: "direction",
    title: "Куда тянет?",
    options: [
      { label: "Азия (Япония, Корея, Китай)", score: (t) => (ASIA_SOURCES.includes(t.source) || /япони|коре|кита/.test(txt(t))) ? 3 : 0 },
      { label: "Россия", score: (t) => (t.source === "russiaTours" || /росси|байкал|камчатк|алтай/.test(txt(t))) ? 3 : 0 },
      { label: "Тёплые моря и острова", score: (t) => (t.isHotel || /сейшел|мальдив|остров|тропик|пляж|бали|таиланд/.test(txt(t))) ? 3 : 0 },
      { label: "Полярные широты", score: (t) => /антаркт|аркт|пингвин|ледник|полярн/.test(txt(t)) ? 3 : 0 },
      { label: "Без разницы", score: () => 0 },
    ],
  },
  {
    id: "style",
    title: "Что важнее в путешествии?",
    options: [
      { label: "Спокойствие и комфорт", score: (t) => (t.isHotel || t.category === "classic" || t.isWellness || /релакс|спа|отдых|пляж|комфорт/.test(txt(t))) ? 3 : 0 },
      { label: "Приключения и природа", score: (t) => (t.category === "expedition" || t.isSafari || t.isDiving || /экспедиц|сафари|дайвинг|природ|треккинг|приключ/.test(txt(t))) ? 3 : 0 },
      { label: "Культура и города", score: (t) => ASIA_SOURCES.includes(t.source) ? 2 : 0 },
      { label: "Яркие события и фестивали", score: (t) => (t.source === "eventTours" || t.specialOfferTag) ? 3 : 0 },
    ],
  },
  {
    id: "vibe",
    title: "Какие впечатления хочется?",
    options: [
      { label: "Дикая природа и животные", score: (t) => (t.isSafari || t.isDiving || t.category === "expedition" || /сафари|животн|природ|пингвин|кит/.test(txt(t))) ? 3 : 0 },
      { label: "Архитектура и история", score: (t) => (ASIA_SOURCES.includes(t.source) || /храм|истори|дворец|стена|город/.test(txt(t))) ? 3 : 0 },
      { label: "Пляж и море", score: (t) => (t.isHotel || /пляж|море|остров|тропик|океан/.test(txt(t))) ? 3 : 0 },
      { label: "Гастрономия и местный колорит", score: (t) => COUNTRY_SOURCES.includes(t.source) ? 2 : 0 },
    ],
  },
  {
    id: "duration",
    title: "Сколько длится поездка?",
    options: [
      { label: "Короткая (до 8 дней)", score: (t) => (t.days && t.days <= 8) ? 2 : 0 },
      { label: "Средняя (9–13 дней)", score: (t) => (t.days && t.days >= 9 && t.days <= 13) ? 2 : 0 },
      { label: "Длинная (от 14 дней)", score: (t) => (t.days && t.days >= 14) ? 2 : 0 },
      { label: "Не важно", score: () => 0 },
    ],
  },
  {
    id: "budget",
    title: "Ориентир по бюджету на человека?",
    options: [
      { label: "До 2000", score: (t) => { const p = priceNum(t); return p > 0 && p <= 2000 ? 2 : 0; } },
      { label: "2000–5000", score: (t) => { const p = priceNum(t); return p >= 2000 && p <= 5000 ? 2 : 0; } },
      { label: "От 5000", score: (t) => priceNum(t) >= 5000 ? 2 : 0 },
      { label: "Не важно", score: () => 0 },
    ],
  },
];

export default function LampQuiz({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { data: tours = [] } = useTours();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const reset = () => { setStep(0); setAnswers([]); };
  const close = () => { onClose(); setTimeout(reset, 300); };

  const choose = (optIndex: number) => {
    const next = [...answers];
    next[step] = optIndex;
    setAnswers(next);
    setStep(step + 1);
  };

  const isResults = step >= QUESTIONS.length;

  const recommendations = useMemo(() => {
    if (!isResults) return [];
    // только активные программы + страницы подбора отелей
    const activeTours = (tours as any[]).filter((t) => t.isActive !== false);
    const candidates = [...activeTours, ...HOTELS];
    const scored = candidates.map((t) => {
      let s = 0;
      QUESTIONS.forEach((q, i) => {
        const a = answers[i];
        if (a != null && q.options[a]) s += q.options[a].score(t);
      });
      return { t, s };
    });
    scored.sort((a, b) => b.s - a.s);
    const top = scored.filter((x) => x.s > 0).slice(0, 3);
    return (top.length ? top : scored.slice(0, 3)).map((x) => x.t);
  }, [isResults, tours, answers]);

  const goTo = (item: any) => { close(); navigate(item.url || `/tour/${item.id}`); };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-w-lg">
        {!isResults ? (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-primary">✦</span> Помощник подбора · вопрос {step + 1} из {QUESTIONS.length}
            </div>
            <h2 className="font-serif text-2xl font-light">{QUESTIONS[step].title}</h2>
            <div className="space-y-2">
              {QUESTIONS[step].options.map((o, i) => (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  className="w-full text-left px-4 py-3 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm"
                >
                  {o.label}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="text-xs text-muted-foreground hover:text-foreground">← Назад</button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-light">Вам подойдёт ✨</h2>
            <p className="text-sm text-muted-foreground">По вашим ответам мы подобрали:</p>
            <div className="space-y-3 max-h-[55vh] overflow-y-auto">
              {recommendations.length === 0 && <p className="text-sm">Пока не нашли точного совпадения — посмотрите весь каталог.</p>}
              {recommendations.map((t: any) => (
                <button key={t.id} onClick={() => goTo(t)}
                  className="w-full flex gap-3 items-center text-left border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                  <img src={(t.imageHome || t.image)} alt="" className="h-20 w-28 object-cover flex-shrink-0" />
                  <div className="py-2 pr-3">
                    <div className="font-medium text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.region}{t.days ? ` · ${t.days} дн.` : ""}{t.price ? ` · ${t.price}` : ""}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={reset} variant="outline" className="flex-1">Пройти заново</Button>
              <Button onClick={close} className="flex-1">Закрыть</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
