import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const NewsletterSocial = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Введите email");
      return;
    }
    toast.success("Вы успешно подписались на рассылку!");
    setEmail("");
  };

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
        {/* Newsletter */}
        <div className="bg-card border border-border p-6 md:p-8 space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-light">
            Подпишитесь на нашу <span className="italic text-gold-gradient">рассылку</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Будьте в курсе новостей и специальных предложений
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background border-border"
            />
            <Select>
              <SelectTrigger className="w-full sm:w-[160px] bg-background border-border">
                <SelectValue placeholder="Кто вы?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tourist">Турист</SelectItem>
                <SelectItem value="agent">Турагент</SelectItem>
                <SelectItem value="company">Компания</SelectItem>
              </SelectContent>
            </Select>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-sans uppercase tracking-widest hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              <Send className="w-4 h-4" />
              Подписаться
            </button>
          </form>
        </div>

        {/* Social */}
        <div className="bg-card border border-border p-6 md:p-8 space-y-4 flex flex-col">
          <h3 className="font-serif text-xl md:text-2xl font-light">
            Мы в <span className="italic text-gold-gradient">соцсетях</span>
          </h3>
          <div className="flex flex-col gap-3 mt-auto">
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm text-sm font-sans uppercase tracking-widest transition-colors"
              style={{ backgroundColor: "#2AABEE", color: "#fff" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              Telegram
            </a>
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm text-sm font-sans uppercase tracking-widest transition-colors"
              style={{ backgroundColor: "#FF0000", color: "#fff" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSocial;
