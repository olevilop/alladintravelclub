import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const cruiseFaqItems = [
  {
    q: "Что такое экспедиционный круиз?",
    a: "Экспедиционный круиз — это путешествие на специализированном судне ледового класса в труднодоступные регионы мира. В отличие от классических круизов, здесь акцент на исследовании, высадках на зодиаках, наблюдении за дикой природой и лекциях учёных на борту.",
  },
  {
    q: "Какой уровень комфорта на борту?",
    a: "Экспедиционные суда наших партнёров — это 5-звёздочные плавучие отели с ресторанами, спа, лекционными залами и каютами с панорамными окнами. Обслуживание, питание и сервис на уровне лучших мировых отелей.",
  },
  {
    q: "Нужна ли специальная подготовка для круиза?",
    a: "Специальная физическая подготовка не требуется. Круизы подходят путешественникам от 25 до 80 лет. Наша команда на борту проведёт инструктаж по безопасности и подготовит вас к высадкам на зодиаках.",
  },
  {
    q: "Как забронировать круиз?",
    a: "Оставьте заявку на сайте или свяжитесь с нами по телефону. Наш эксперт подберёт оптимальный маршрут, даты и каюту с учётом ваших пожеланий и бюджета. Предоплата составляет 30%, остаток — за 90 дней до отправления.",
  },
  {
    q: "Включена ли страховка в стоимость круиза?",
    a: "Базовая медицинская страховка включена во все экспедиции. Мы также рекомендуем и помогаем оформить расширенную страховку, покрывающую эвакуацию из удалённых регионов и отмену поездки.",
  },
];

const tourFaqItems = [
  {
    q: "Кому подходят такие туры?",
    a: "Нашим клиентам от 25 до 80 лет. Специальная физическая подготовка не требуется. Путешествия подходят парам, семьям и индивидуальным путешественникам, которые ищут глубокие впечатления и комфорт высокого уровня.",
  },
  {
    q: "Что входит в стоимость тура?",
    a: "В стоимость обычно входят проживание, трансферы, экскурсии с русскоговорящим гидом и часть питания. Точный перечень зависит от конкретного тура и указан в разделе «Что включено» на этой странице.",
  },
  {
    q: "Нужна ли виза для поездки?",
    a: "Визовые требования зависят от страны назначения и вашего гражданства. Мы консультируем по визовым вопросам и помогаем с подготовкой необходимых документов для подачи.",
  },
  {
    q: "Как забронировать тур?",
    a: "Оставьте заявку на сайте или свяжитесь с нами по телефону. Наш эксперт подберёт оптимальные даты и варианты размещения. Предоплата составляет 30%, остаток — за 30 дней до начала тура.",
  },
  {
    q: "Включена ли страховка в стоимость тура?",
    a: "Базовая медицинская страховка включена во все туры. Мы также рекомендуем оформить расширенную страховку, покрывающую отмену поездки и дополнительные медицинские расходы.",
  },
];

const FAQSection = ({ isCruise = false, customFaq }: { isCruise?: boolean; customFaq?: { q: string; a: string }[] }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const items = customFaq ?? (isCruise ? cruiseFaqItems : tourFaqItems);

  return (
    <section id="faq" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-sans uppercase tracking-[0.3em]">
            Вопросы
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mt-4">
            Частые <span className="italic text-gold-gradient">вопросы</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border/50 bg-card/20 px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="font-serif text-lg text-foreground hover:text-primary hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-sans leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
