import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSocial from "@/components/NewsletterSocial";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useEffect } from "react";

const services = [
  "Разработка индивидуальных VIP-туров",
  "Бронирование отелей по всему миру",
  "Туры любой сложности в экзотические страны",
  "Горнолыжные / сафари / дайвинг-туры",
  "Групповые экскурсионные, а также топ-туры в Европу и Азию",
  "Морские путешествия на круизных лайнерах",
  "Отдых на термальных и SPA-курортах",
  "Организация посещения Олимпиады, Чемпионатов мира, театров, концертов, цирков, Формулы-1",
  "Визовая поддержка",
  "Авиабилеты на все направления",
  "Энергетические путешествия",
];

const advantages = [
  "Мы быстро реагируем на запросы",
  "Подбираем самые оптимальные варианты с точки зрения цен, дат и времени путешествия",
  "Имеем прямое сотрудничество с большим количеством отелей по всему миру, а также с авиакомпаниями Korean Air и Asiana, что даёт нам и нашим клиентам преимущества при бронировании",
];

const Section = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="py-12 md:py-16 border-b border-border/40 last:border-b-0">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-4">
        <div className="font-serif text-5xl md:text-6xl text-gold-gradient leading-none mb-3">
          {number}
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground">
          {title}
        </h2>
      </div>
      <div className="md:col-span-8 text-muted-foreground font-sans leading-relaxed text-base md:text-[17px] space-y-4">
        {children}
      </div>
    </div>
  </section>
);

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <div className="pt-28 md:pt-32">
        <div className="container mx-auto px-6">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "О нас" }]} />
        </div>

        <header className="container mx-auto px-6 pt-8 pb-12 md:pt-10 md:pb-16 text-center max-w-3xl">
          <span className="text-primary text-sm font-sans uppercase tracking-[0.3em]">
            О компании
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-light text-foreground mt-4">
            <span className="italic text-gold-gradient">О</span> нас
          </h1>
          <p className="mt-6 text-muted-foreground font-sans leading-relaxed">
            Клуб Путешественников Алладин — пространство для тех, кто ценит
            подлинные впечатления, безупречный сервис и индивидуальный подход
            в каждом путешествии.
          </p>
        </header>

        <div className="container mx-auto px-6 pb-16 max-w-6xl">
          <Section number="01" title="История создания">
            <p>
              Клуб Путешественников Алладин был создан в 2011 году. Это
              молодая, динамично развивающаяся компания. Возглавляет её
              опытный и энергичный управленец, профессионал в туристической
              области с десятилетним стажем — <strong className="text-foreground font-medium">Виктория Цой</strong>.
            </p>
            <p>
              Очень многие путешественники знают Викторию по её работе в
              штате крупных турфирм Приморья. Она зарекомендовала себя как
              очень талантливый специалист, делающий свою работу на высоком
              уровне.
            </p>
          </Section>

          <Section number="02" title="Наша миссия">
            <p>
              Миссия нашего клуба состоит в объединении увлечённых
              путешествиями людей для обмена интересной информацией и
              приятными эмоциями, совместного отдыха и туризма.
            </p>
            <p>
              Клуб Алладин может стать вашим наставником и надёжным
              проводником в увлекательных путешествиях по всему миру.
            </p>
          </Section>

          <Section number="03" title="Наши услуги">
            <p>В нашем клубе вы можете всегда получить следующие услуги:</p>
            <ul className="space-y-2 pt-2">
              {services.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="text-primary mt-1">›</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section number="04" title="Наши преимущества">
            <p>
              Клуб Путешественников Алладин — это профессиональная команда
              тур-менеджеров, обладающая богатым опытом, которая
              предоставляет качественный сервис по формированию путешествий.
            </p>
            <ul className="space-y-2 pt-2">
              {advantages.map((a) => (
                <li key={a} className="flex gap-3">
                  <span className="text-primary mt-1">›</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section number="05" title="Наше портфолио">
            <p>
              Путешественники нашего клуба уже посетили множество стран: США,
              Австралию, Новую Зеландию, континенты Южной Америки, Европы,
              Африки и многие другие места. Наш клуб посещают VIP-персоны,
              директора и менеджеры компаний.
            </p>
            <p>
              В нашей копилке туры различной сложности. Для VIP-клиентов нами
              разрабатывались туры с индивидуальными особенностями.
              Практически все туристы, обратившись к нам однажды, по сей день
              пользуются услугами Клуба Алладин для формирования своих
              путешествий.
            </p>
          </Section>
        </div>
      </div>

      <NewsletterSocial />
      <Footer />
    </div>
  );
};

export default AboutPage;
