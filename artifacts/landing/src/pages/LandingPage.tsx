import React from "react";
import { motion } from "framer-motion";

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

const JoinButton = ({ className = "" }: { className?: string }) => (
  <a
    href="https://t.me/"
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-primary/90 active:scale-[0.98] ${className}`}
  >
    Вступить через Telegram
  </a>
);

const FortyCounter = () => (
  <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground/60 select-none font-mono">
    <span>01 / 40</span>
    <div className="w-12 h-px bg-border"></div>
    <span className="text-primary">40 / 40</span>
  </div>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* 1. Hero */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-20 pb-32 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="absolute top-8 left-6 md:left-12">
          <FortyCounter />
        </div>
        
        <FadeIn>
          <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] md:leading-[1.1] font-serif text-foreground max-w-4xl mb-8">
            Закрытое комьюнити, в которое сейчас набираем первых 40 человек
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-12 font-sans font-light">
            Если ты хочешь расти быстрее и не в одиночку — это место, где ты будешь двигаться вместе с другими
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col items-start gap-4">
            <JoinButton />
            <p className="text-sm text-muted-foreground italic">Сейчас нас мало — и в этом главный плюс</p>
          </div>
        </FadeIn>
      </section>

      {/* 2. Why "few people" is the strength */}
      <section className="py-32 px-6 md:px-12 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-2xl md:text-4xl font-serif leading-snug text-foreground">
              "Ты заходишь не в переполненный чат, а в среду, где тебя реально замечают, с тобой общаются, и ты становишься частью ядра."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 3 & 4. The pain & The reframe */}
      <section className="py-32 px-6 md:px-12 max-w-3xl mx-auto">
        <FadeIn>
          <div className="space-y-8 md:space-y-12">
            <p className="text-2xl md:text-3xl font-light text-muted-foreground">
              Ты вроде что-то делаешь — но один.
            </p>
            <p className="text-2xl md:text-3xl font-light text-muted-foreground">
              И поэтому быстро сливаешься, откладываешь, теряешь темп.
            </p>
            <div className="w-12 h-px bg-primary/30 my-8"></div>
            <p className="text-3xl md:text-4xl font-serif text-foreground leading-tight">
              Проблема не в знаниях. <br/>
              А в отсутствии среды.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* 5. The solution */}
      <section className="py-32 px-6 md:px-12 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-2xl md:text-4xl font-serif text-foreground leading-snug">
              Это не курс и не обучение.<br/>
              Это среда, где ты не один, не теряешь темп, двигаешься вместе с другими.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 6. How it works & 7. What's inside */}
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <FadeIn>
              <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-12">Как это работает</h2>
              <ul className="space-y-12 relative before:absolute before:inset-y-2 before:left-3 before:w-px before:bg-border">
                {[
                  "Заходишь через Telegram-бота",
                  "Получаешь buddy — человека, с которым двигаешься",
                  "Начинаешь движение: weekly созвоны, задачи, поддержка"
                ].map((step, i) => (
                  <li key={i} className="relative pl-12">
                    <span className="absolute left-0 top-1 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-xs font-mono text-muted-foreground">{i + 1}</span>
                    <p className="text-lg md:text-xl font-medium text-foreground">{step}</p>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
          <div>
            <FadeIn delay={0.2}>
              <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-12">Что внутри</h2>
              <p className="text-xl leading-relaxed text-muted-foreground">
                У тебя есть доступ ко всему сразу: карьера, бизнес, нейросети — без выбора 'раз и навсегда'. Берёшь то, что нужно сейчас.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-20 px-6 md:px-12 text-center">
        <FadeIn>
          <JoinButton />
        </FadeIn>
      </section>

      {/* 8. The foundation & 9. Who it's for */}
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto border-t border-border/50">
        <div className="grid md:grid-cols-2 gap-20">
          <FadeIn>
            <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-12">Основа</h2>
            <div className="space-y-6">
              {["Buddy system", "Weekly созвоны", "Живое общение"].map((pillar, i) => (
                <div key={i} className="text-2xl md:text-3xl font-serif text-foreground">
                  {pillar}
                </div>
              ))}
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-12">Для кого</h2>
            <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed">
              Тем, кто не хочет стоять на месте. Устал пытаться в одиночку. Хочет двигаться быстрее.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 10. Early access & 11. Pricing */}
      <section className="py-32 px-6 md:px-12 bg-white/50">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <FadeIn>
            <div className="inline-flex justify-center mb-8">
              <FortyCounter />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">
              Сейчас открываем набор первых 40 человек.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Дальше вход станет сложнее, дороже и с отбором.
            </p>
          </FadeIn>
        </div>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
          <FadeIn delay={0.1}>
            <div className="p-8 md:p-12 rounded-3xl border border-border bg-background transition-colors hover:border-primary/30">
              <div className="text-muted-foreground mb-4">Ежемесячно</div>
              <div className="text-3xl md:text-4xl font-serif text-foreground">2 800 ₽</div>
              <div className="mt-2 text-sm text-muted-foreground">/ месяц</div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="p-8 md:p-12 rounded-3xl border border-primary/20 bg-primary/5 relative">
              <div className="absolute top-8 right-8 text-xs font-medium text-primary uppercase tracking-wider">
                Оптимально
              </div>
              <div className="text-primary/80 mb-4">На 3 месяца</div>
              <div className="text-3xl md:text-4xl font-serif text-foreground">7 500 ₽</div>
              <div className="mt-2 text-sm text-primary/80">/ 3 месяца</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 12. Final CTA */}
      <section className="py-32 px-6 md:px-12 max-w-3xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-12">
            Если тебе откликается — заходи.
          </h2>
          <JoinButton />
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-sm text-muted-foreground/50 pb-20">
        <FadeIn>
          <p>Закрытое комьюнити &copy; {new Date().getFullYear()}</p>
        </FadeIn>
      </footer>
    </main>
  );
}