import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Заявка отправлена", description: "Мы свяжемся с вами в ближайшее время" });
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-section-gradient relative">
      <div ref={ref} className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm font-sans uppercase tracking-[0.3em]">
              Заявка
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mt-4">
              Начните ваше <span className="italic text-gold-gradient">путешествие</span>
            </h2>
            <p className="mt-4 text-muted-foreground font-sans">
              Оставьте заявку, и наш эксперт подберёт идеальный маршрут для вас
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                placeholder="Ваше имя"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="bg-card/50 border-border/50 focus:border-primary h-12 font-sans"
              />
              <Input
                placeholder="Телефон"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="bg-card/50 border-border/50 focus:border-primary h-12 font-sans"
              />
            </div>
            <Input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-card/50 border-border/50 focus:border-primary h-12 font-sans"
            />
            <Textarea
              placeholder="Куда бы вы хотели отправиться? Расскажите о ваших пожеланиях..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="bg-card/50 border-border/50 focus:border-primary font-sans resize-none"
            />
            <button
              type="submit"
              className="w-full bg-gold-gradient text-primary-foreground py-4 text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Отправить заявку
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
