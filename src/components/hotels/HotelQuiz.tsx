import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Phone, MessageCircle, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const PRIORITIES = [
  "Романтика / медовый месяц",
  "Семья с детьми (детский клуб)",
  "Дайвинг и снорклинг",
  "Спа и велнес",
  "Премиум-кухня / винотека",
  "Уединение / приватность",
  "Активный отдых / спорт",
  "Эксклюзив / лакшери",
];

const STYLES = [
  "Современный / минимализм",
  "Классика / роскошь",
  "Натуральный / экологичный",
  "Аутентичный мальдивский",
];

const BUDGETS = [
  "до 500 000 ₽ на двоих",
  "500 000 – 1 000 000 ₽",
  "1 000 000 – 2 000 000 ₽",
  "от 2 000 000 ₽",
  "Без ограничений",
];

const DURATIONS = ["5–7 ночей", "8–10 ночей", "11–14 ночей", "Более 14 ночей"];

const MESSENGERS = ["WhatsApp", "Telegram", "Звонок"];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80),
  phone: z.string().trim().min(5, "Укажите телефон").max(40),
  messenger: z.string().min(1),
  email: z.string().trim().email("Некорректный email").max(120).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Нужно согласие" }) }),
});

interface HotelQuizProps {
  presetScenario?: string | null;
}

const TOTAL_STEPS = 6;

const HotelQuiz = ({ presetScenario }: HotelQuizProps) => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [datesPeriod, setDatesPeriod] = useState("");
  const [duration, setDuration] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [childrenAges, setChildrenAges] = useState("");
  const [budget, setBudget] = useState("");
  const [priorities, setPriorities] = useState<string[]>([]);
  const [style, setStyle] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [messenger, setMessenger] = useState("WhatsApp");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [comment, setComment] = useState("");

  // Preset from scenario card → jump to priorities (step 4)
  useEffect(() => {
    if (!presetScenario) return;
    const map: Record<string, string> = {
      "Романтика": "Романтика / медовый месяц",
      "Семья": "Семья с детьми (детский клуб)",
      "Дайвинг": "Дайвинг и снорклинг",
      "Спа": "Спа и велнес",
      "Гастрономия": "Премиум-кухня / винотека",
      "Уединение": "Уединение / приватность",
      "Актив": "Активный отдых / спорт",
      "Лакшери": "Эксклюзив / лакшери",
    };
    const match = map[presetScenario];
    if (match && !priorities.includes(match)) {
      setPriorities([match]);
    }
    setStep(4);
    setTimeout(() => {
      document.getElementById("hotel-quiz")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetScenario]);

  const togglePriority = (p: string) => {
    setPriorities((prev) => {
      if (prev.includes(p)) return prev.filter((x) => x !== p);
      if (prev.length >= 3) return prev;
      return [...prev, p];
    });
  };

  const canNext = useMemo(() => {
    switch (step) {
      case 1: return datesPeriod.trim().length > 0 && duration.length > 0;
      case 2: return Number(adults) >= 1;
      case 3: return budget.length > 0;
      case 4: return priorities.length >= 1;
      case 5: return style.length > 0;
      default: return true;
    }
  }, [step, datesPeriod, duration, adults, budget, priorities, style]);

  const submit = async () => {
    const parsed = contactSchema.safeParse({ name, phone, messenger, email, consent });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Проверьте поля");
      return;
    }
    setSubmitting(true);
    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      messenger,
      email: email.trim() || null,
      dates: { period: datesPeriod, duration },
      composition: { adults: Number(adults), children: Number(children), childrenAges: childrenAges.trim() },
      budget: { value: budget },
      priorities,
      style,
      scenario: presetScenario ?? null,
      consent,
      source: "hotels-maldives",
      raw: { comment },
    };
    const { error } = await supabase.from("hotel_leads").insert(payload);
    setSubmitting(false);
    if (error) {
      toast.error("Не удалось отправить заявку. Попробуйте позже или позвоните нам.");
      return;
    }
    toast.success("Заявка отправлена. Виктория свяжется с вами в течение часа.");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-card border border-border p-8 md:p-12 text-center space-y-6">
        <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="w-7 h-7 text-primary" />
        </div>
        <h3 className="font-serif text-3xl md:text-4xl">Спасибо, {name.split(" ")[0]}!</h3>
        <p className="text-foreground/70 max-w-xl mx-auto">
          Виктория Цой, основатель клуба, изучит ваши предпочтения и подберёт 3–5 отелей под ваш сценарий.
          Свяжемся в течение часа в рабочее время.
        </p>
        <img
          src="https://placehold.co/160x160?text=Victoria"
          alt="Виктория Цой"
          className="mx-auto w-32 h-32 rounded-full object-cover border border-border"
        />
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a href="tel:+79147051705">
            <Button variant="outline" className="gap-2">
              <Phone className="w-4 h-4" /> +7 (914) 705-17-05
            </Button>
          </a>
          <a href="https://wa.me/79147051705" target="_blank" rel="noopener noreferrer">
            <Button className="gap-2">
              <MessageCircle className="w-4 h-4" /> Написать в WhatsApp
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border p-6 md:p-10 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-sans uppercase tracking-widest text-muted-foreground">
          <span>Шаг {step} из {TOTAL_STEPS}</span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <Progress value={(step / TOTAL_STEPS) * 100} />
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl md:text-3xl">Когда планируете поездку?</h3>
          <div className="space-y-2">
            <Label>Желаемый период</Label>
            <Input
              placeholder="Например: вторая половина февраля 2026"
              value={datesPeriod}
              onChange={(e) => setDatesPeriod(e.target.value)}
              maxLength={120}
            />
          </div>
          <div className="space-y-2">
            <Label>Длительность</Label>
            <RadioGroup value={duration} onValueChange={setDuration} className="grid sm:grid-cols-2 gap-2">
              {DURATIONS.map((d) => (
                <Label key={d} className="flex items-center gap-3 border border-border p-3 cursor-pointer hover:border-primary transition-colors">
                  <RadioGroupItem value={d} /> <span className="text-sm">{d}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl md:text-3xl">Кто едет?</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Взрослых</Label>
              <Input type="number" min={1} max={20} value={adults} onChange={(e) => setAdults(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Детей</Label>
              <Input type="number" min={0} max={10} value={children} onChange={(e) => setChildren(e.target.value)} />
            </div>
          </div>
          {Number(children) > 0 && (
            <div className="space-y-2">
              <Label>Возрасты детей</Label>
              <Input
                placeholder="Например: 6 и 9 лет"
                value={childrenAges}
                onChange={(e) => setChildrenAges(e.target.value)}
                maxLength={80}
              />
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl md:text-3xl">Ориентировочный бюджет</h3>
          <p className="text-sm text-foreground/60">На всю поездку, без перелёта.</p>
          <RadioGroup value={budget} onValueChange={setBudget} className="space-y-2">
            {BUDGETS.map((b) => (
              <Label key={b} className="flex items-center gap-3 border border-border p-3 cursor-pointer hover:border-primary transition-colors">
                <RadioGroupItem value={b} /> <span className="text-sm">{b}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl md:text-3xl">Что важнее всего?</h3>
          <p className="text-sm text-foreground/60">Выберите от 1 до 3 приоритетов.</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {PRIORITIES.map((p) => {
              const active = priorities.includes(p);
              return (
                <Label
                  key={p}
                  className={`flex items-center gap-3 border p-3 cursor-pointer transition-colors ${
                    active ? "border-primary bg-primary/5" : "border-border hover:border-primary"
                  }`}
                >
                  <Checkbox checked={active} onCheckedChange={() => togglePriority(p)} />
                  <span className="text-sm">{p}</span>
                </Label>
              );
            })}
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl md:text-3xl">Стиль отеля</h3>
          <RadioGroup value={style} onValueChange={setStyle} className="space-y-2">
            {STYLES.map((s) => (
              <Label key={s} className="flex items-center gap-3 border border-border p-3 cursor-pointer hover:border-primary transition-colors">
                <RadioGroupItem value={s} /> <span className="text-sm">{s}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      )}

      {step === 6 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl md:text-3xl">Ваши контакты</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Имя *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
            </div>
            <div className="space-y-2">
              <Label>Телефон *</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={40} placeholder="+7..." />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={120} />
            </div>
            <div className="space-y-2">
              <Label>Как связаться *</Label>
              <RadioGroup value={messenger} onValueChange={setMessenger} className="flex flex-wrap gap-2">
                {MESSENGERS.map((m) => (
                  <Label key={m} className="flex items-center gap-2 border border-border px-3 py-2 cursor-pointer hover:border-primary transition-colors">
                    <RadioGroupItem value={m} /> <span className="text-sm">{m}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Комментарий (необязательно)</Label>
            <Textarea value={comment} onChange={(e) => setComment(e.target.value)} maxLength={800} rows={3} />
          </div>
          <Label className="flex items-start gap-3 cursor-pointer">
            <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-1" />
            <span className="text-xs text-foreground/70">
              Я согласен на обработку персональных данных в соответствии с{" "}
              <Link to="/privacy" className="text-primary underline">Политикой конфиденциальности</Link> (152-ФЗ).
            </span>
          </Label>
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1 || submitting}
        >
          Назад
        </Button>
        {step < TOTAL_STEPS ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext}>
            Далее →
          </Button>
        ) : (
          <Button onClick={submit} disabled={submitting || !consent}>
            {submitting ? "Отправляем..." : "Отправить заявку"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default HotelQuiz;
