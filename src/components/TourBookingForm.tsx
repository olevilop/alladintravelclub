import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TourBookingFormProps {
  tourName: string;
  startDates: string[];
  cabins?: string[];
}

const TourBookingForm = ({ tourName, startDates, cabins }: TourBookingFormProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", cabin: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast({ title: "Заполните обязательные поля", variant: "destructive" });
      return;
    }
    toast({ title: "Заявка отправлена!", description: `Мы свяжемся с вами по поводу тура «${tourName}»` });
    setForm({ name: "", phone: "", email: "", date: "", cabin: "", message: "" });
  };

  const inputClass =
    "w-full bg-secondary border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-card border border-border p-6"
    >
      <h3 className="font-serif text-xl text-foreground mb-1">Забронировать тур</h3>
      <p className="text-xs text-muted-foreground mb-5">Оставьте заявку — мы свяжемся с вами в течение 24 часов</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Ваше имя *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass}
          maxLength={100}
        />
        <input
          type="tel"
          placeholder="Телефон *"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={inputClass}
          maxLength={20}
        />
        <input
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
          maxLength={255}
        />
        <Select value={form.date} onValueChange={(value) => setForm({ ...form, date: value })}>
          <SelectTrigger className={`${inputClass} h-auto`}>
            <SelectValue placeholder="Даты" />
          </SelectTrigger>
          <SelectContent>
            {startDates.map((date) => (
              <SelectItem key={date} value={date}>{date}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {cabins && cabins.length > 0 && (
          <Select value={form.cabin} onValueChange={(value) => setForm({ ...form, cabin: value })}>
            <SelectTrigger className={`${inputClass} h-auto`}>
              <SelectValue placeholder="Каюты" />
            </SelectTrigger>
            <SelectContent>
              {cabins.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <textarea
          placeholder="Пожелания"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} min-h-[80px] resize-none`}
          maxLength={1000}
        />
        <button
          type="submit"
          className="w-full bg-gold-gradient text-primary-foreground py-3 text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          Отправить заявку
        </button>
      </form>
    </motion.div>
  );
};

export default TourBookingForm;
