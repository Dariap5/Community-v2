import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// --- UI Utility Components ---

const JoinButton = ({ className = "", variant = "default" }: { className?: string, variant?: "default" | "quiet" }) => {
  const isQuiet = variant === "quiet";
  
  return (
    <a
      href="https://t.me/"
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        isQuiet 
          ? "px-6 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80" 
          : "px-8 py-4 bg-primary text-primary-foreground hover:shadow-[0_0_40px_-10px_hsl(var(--primary))]"
      } ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        Вступить через Telegram
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      {!isQuiet && (
        <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
      )}
    </a>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Sections ---

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Animated Counter Motif
  const filledCount = 4;
  const totalCount = 40;
  
  return (
    <section ref={containerRef} className="relative min-h-[100svh] md:min-h-[95vh] flex flex-col justify-center pt-16 pb-16 md:pt-20 md:pb-32 px-5 md:px-12 overflow-hidden">
      {/* Subtle Grain Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      <div className="absolute inset-0 bg-radial-gradient from-primary/5 to-transparent opacity-50" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-5 md:mb-8 inline-flex items-center gap-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span className="relative flex h-1.5 w-1.5">
            {!prefersReducedMotion && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
            )}
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          Telegram-комьюнити · набор открыт
        </motion.div>

        {/* Animated Counter — compact on mobile */}
        <div className="mb-7 md:mb-12 flex flex-col gap-3 md:gap-4">
          <div className="flex items-end gap-3 md:gap-4 text-xs md:text-sm font-medium text-muted-foreground/60 select-none font-mono">
            <div className="flex flex-col items-start">
              <span className="text-foreground/80">04 / 40</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground/60 mt-0.5">заняли</span>
            </div>
            <div className="w-8 md:w-12 h-px bg-border relative overflow-hidden mb-3">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 w-full bg-primary/60"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-primary">36 / 40</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-primary/70 mt-0.5">свободно</span>
            </div>
          </div>
          <div className="flex gap-[3px] md:gap-1">
            {Array.from({ length: totalCount }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: i < filledCount ? 1 : 0.2 }}
                transition={{ delay: 0.5 + i * 0.02, duration: 0.4, ease: "easeOut" }}
                className={`flex-1 max-w-[6px] h-3 md:h-5 rounded-full origin-bottom ${i < filledCount ? 'bg-primary' : 'bg-border'}`}
              />
            ))}
          </div>
        </div>

        {/* Headline — natural inline wrapping for clean mobile, blur-in animation */}
        <h1 className="text-[1.75rem] sm:text-4xl md:text-6xl lg:text-[5rem] leading-[1.12] md:leading-[1.05] font-serif text-foreground max-w-4xl mb-5 md:mb-8 tracking-tight">
          {"Закрытое комьюнити, в которое сейчас набираем первых 40 человек".split(" ").map((word, i) => (
            <React.Fragment key={i}>
              <motion.span
                initial={{ opacity: 0, filter: prefersReducedMotion ? "none" : "blur(8px)", y: prefersReducedMotion ? 0 : 14 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="inline"
              >
                {word}
              </motion.span>
              {i < "Закрытое комьюнити, в которое сейчас набираем первых 40 человек".split(" ").length - 1 && " "}
            </React.Fragment>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-[15px] md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-6 md:mb-12 font-sans font-light"
        >
          Хочешь расти быстрее и не в одиночку — это место, где ты будешь двигаться вместе с другими.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col items-start gap-3 md:gap-4"
        >
          <JoinButton className="w-full sm:w-auto" />
          <p className="text-xs md:text-sm text-muted-foreground tracking-wide">
            <span className="text-foreground/80 font-medium">4 из 40 мест</span> заняты · набор закроется автоматически
          </p>
        </motion.div>

        {/* Three micro-markers — set context in 1 sec */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mt-8 md:mt-14 flex flex-wrap gap-x-5 md:gap-x-8 gap-y-2 md:gap-y-3 text-[11px] md:text-sm font-mono uppercase tracking-wider text-muted-foreground"
        >
          {["Buddy 1-на-1", "Weekly созвоны", "Карьера · Бизнес · AI"].map((m, i) => (
            <div key={m} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-primary/70" />
              {m}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

const WhySmall = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="py-20 md:py-32 px-5 md:px-12 bg-white/40 border-y border-border/40 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 w-full">
          <div className="relative h-64 md:h-80 w-full flex items-center justify-center bg-background rounded-3xl border border-border/50 overflow-hidden">
            {/* Crowded vs Clean Visualization */}
            <div className="absolute inset-0 flex">
              {/* Left: Crowded (Noisy Chat) */}
              <div className="w-1/2 relative border-r border-border/50 bg-muted/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  {Array.from({ length: 80 }).map((_, i) => (
                    <motion.div
                      key={`noise-${i}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 0.2 + Math.random() * 0.3, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ delay: Math.random() * 0.5, duration: 0.8 }}
                      className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-foreground/40"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: `${10 + Math.random() * 80}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* Right: Small Core */}
              <div className="w-1/2 relative bg-primary/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-24 h-24">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i / 12) * Math.PI * 2;
                      const radius = 24;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      return (
                        <motion.div
                          key={`core-${i}`}
                          initial={{ opacity: 0, x: 0, y: 0 }}
                          animate={isInView ? { opacity: 1, x, y } : { opacity: 0, x: 0, y: 0 }}
                          transition={{ delay: 0.6 + i * 0.05, duration: 0.8, type: "spring" }}
                          className="absolute left-1/2 top-1/2 -ml-1.5 -mt-1.5 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary"
                        />
                      );
                    })}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className={`absolute left-1/2 top-1/2 -ml-2 -mt-2 w-4 h-4 rounded-full bg-primary/30 ${prefersReducedMotion ? '' : 'animate-pulse'}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison labels under visualization */}
          <div className="mt-6 grid grid-cols-2 gap-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="px-1 md:px-3"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground/70 mb-1">Обычный чат</div>
              <div className="text-sm md:text-base text-muted-foreground leading-snug">1 000+ участников. Ты теряешься в потоке.</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="px-1 md:px-3"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-primary mb-1">Наше ядро</div>
              <div className="text-sm md:text-base text-foreground leading-snug">40 человек. Ты на виду — и тебя замечают.</div>
            </motion.div>
          </div>
        </div>

        <div className="order-1 lg:order-2 max-w-xl">
          <FadeIn>
            <p className="text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed text-foreground">
              "Ты заходишь не в переполненный чат, а в среду, где тебя реально замечают, с тобой общаются, и ты становишься частью ядра."
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const Pain = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  const thoughts = [
    "Купил курс — забросил на третьей неделе.",
    "Записал план на год — забыл к февралю.",
    "Хочешь обсудить идею — а не с кем.",
    "Знаешь, что надо делать — но всё откладываешь."
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-40 px-5 md:px-12 max-w-4xl mx-auto">
      <FadeIn>
        <h2 className="text-xs md:text-sm font-semibold tracking-widest text-primary uppercase mb-8 md:mb-12">Знакомо?</h2>
      </FadeIn>

      {/* Stack of "thoughts" — each one fades in with a slight blur, like a passing reflection */}
      <div className="space-y-5 md:space-y-7 mb-14 md:mb-28">
        {thoughts.map((t, i) => (
          <motion.p
            key={i}
            initial={{
              opacity: 0,
              x: prefersReducedMotion ? 0 : -16,
              filter: prefersReducedMotion ? "none" : "blur(6px)",
            }}
            animate={isInView ? {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
            } : {}}
            transition={{ delay: 0.2 + i * 0.35, duration: 0.7, ease: "easeOut" }}
            className="text-lg md:text-2xl lg:text-3xl font-serif text-muted-foreground/80 leading-relaxed flex items-start gap-3 md:gap-4"
          >
            <span className="font-mono text-[10px] md:text-xs text-primary/50 mt-2 md:mt-3 shrink-0 w-5 md:w-6">0{i + 1}</span>
            <span>«{t}»</span>
          </motion.p>
        ))}
      </div>

      {/* The verdict — pops in with weight after all thoughts settled */}
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 + thoughts.length * 0.35 + 0.3, duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-[1.75rem] sm:text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-[1.15]">
          Не потому что лень.{" "}
          <span className="text-primary">А потому что один.</span>
        </p>
      </motion.div>
    </section>
  );
};

const Reframe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 1, 0.2]);
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.6, 1], [0.2, 1, 1]);
  const y2 = useTransform(scrollYProgress, [0.4, 0.6], prefersReducedMotion ? [0, 0] : [20, 0]);

  return (
    <section ref={ref} className="relative py-24 md:py-40 px-5 md:px-12 bg-background min-h-[55vh] md:min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-4xl mx-auto text-center relative h-[200px] md:h-[300px] flex flex-col justify-center w-full">
        <motion.p
          style={{ opacity: opacity1 }}
          className="text-2xl sm:text-3xl md:text-5xl font-serif text-muted-foreground absolute inset-x-0 top-1/4 -translate-y-1/2"
        >
          Проблема не в знаниях.
        </motion.p>
        <motion.p
          style={{ opacity: opacity2, y: y2 }}
          className="text-[1.75rem] sm:text-4xl md:text-6xl lg:text-7xl font-serif text-primary absolute inset-x-0 top-1/2 -translate-y-1/2 leading-[1.1]"
        >
          А в отсутствии среды.
        </motion.p>
      </div>
    </section>
  );
};

const Solution = () => {
  return (
    <section className="py-20 md:py-32 px-5 md:px-12 bg-primary/5 border-y border-primary/10">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-start md:items-center">
            <div className="flex-1 space-y-4 md:space-y-6 text-xl sm:text-2xl md:text-4xl font-serif text-muted-foreground/50">
              <p className="relative inline-block">
                Это не курс
                <motion.span 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute top-1/2 left-[-5%] w-[110%] h-[2px] bg-foreground/40 origin-left"
                />
              </p>
              <br />
              <p className="relative inline-block">
                и не обучение
                <motion.span 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute top-1/2 left-[-5%] w-[110%] h-[2px] bg-foreground/40 origin-left"
                />
              </p>
            </div>
            
            <div className="w-12 h-px bg-border hidden md:block"></div>
            
            <div className="flex-[2] space-y-6">
              <p className="text-2xl md:text-4xl lg:text-5xl font-serif text-foreground leading-snug">
                Это среда, где ты{" "}
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 }}>не один,</motion.span>{" "}
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5 }}>не теряешь темп,</motion.span>{" "}
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.8 }} className="text-primary">двигаешься вместе с другими.</motion.span>
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "Заходишь через Telegram-бота", icon: <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" /> },
    { title: "Получаешь buddy — человека, с которым двигаешься", icon: <><circle cx="8" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" /><circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" /><line x1="12" y1="12" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></> },
    { title: "Начинаешь движение: weekly созвоны, задачи, поддержка", icon: <><line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" /><polyline points="12 5 19 12 12 19" stroke="currentColor" strokeWidth="2" fill="none" /></> }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const stepDelay = 0.45;

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-5 md:px-12 max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-10 md:mb-16">Как это работает</h2>
      </FadeIn>
      
      <div className="relative">
        {/* Track */}
        <div className="absolute left-[27px] top-0 bottom-0 w-px bg-border/50" aria-hidden="true">
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={isSectionInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: stepDelay * steps.length + 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="absolute top-0 left-0 w-full h-full bg-primary origin-top"
          />
        </div>

        <div className="space-y-12 md:space-y-20">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: i * stepDelay + 0.2, duration: 0.6, ease: "easeOut" }}
              className="relative pl-20 group"
            >
              <motion.div
                initial={{ scale: 0.6, borderColor: "hsl(var(--border))", backgroundColor: "hsl(var(--background))" }}
                animate={isSectionInView ? { scale: 1 } : { scale: 0.6 }}
                transition={{ delay: i * stepDelay + 0.35, type: "spring", stiffness: 220, damping: 18 }}
                className="absolute left-0 top-1 w-[54px] h-[54px] rounded-full bg-background border-2 border-border flex items-center justify-center z-10 transition-colors duration-500 group-hover:border-primary group-hover:bg-primary/5 shadow-sm"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isSectionInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: i * stepDelay + 0.55, duration: 0.4 }}
                  className="absolute inset-0 rounded-full ring-2 ring-primary/30"
                />
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-muted-foreground group-hover:text-primary transition-colors duration-500 relative z-10">
                  {step.icon}
                </svg>
              </motion.div>
              <div className="pt-3">
                <div className="text-xs font-mono text-primary/60 mb-2">Шаг 0{i + 1}</div>
                <p className="text-xl md:text-3xl font-serif text-foreground">{step.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhatsInside = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const topics = [
    {
      id: 'career',
      label: 'Карьера',
      desc: 'Расти в найме, пробивай потолок.',
      items: [
        "Резюме под рынок 2026",
        "Переговоры о зарплате",
        "Переход в новый стек / роль",
        "Собесы: подготовка и разбор",
      ],
    },
    {
      id: 'business',
      label: 'Бизнес',
      desc: 'Строй своё, тестируй гипотезы.',
      items: [
        "Первый клиент за 30 дней",
        "Гипотезы и быстрые тесты",
        "Юнит-экономика на пальцах",
        "Поиск со-основателя / команды",
      ],
    },
    {
      id: 'ai',
      label: 'Нейросети',
      desc: 'Ускоряй работу, делегируй рутину.',
      items: [
        "AI-ассистент в твоей работе",
        "Автоматизация рутины",
        "Промптинг под задачи",
        "Связки GPT + n8n / no-code",
      ],
    },
  ];

  return (
    <section className="py-20 md:py-32 px-5 md:px-12 bg-white/40 border-y border-border/40">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-10 md:mb-16 text-center md:text-left">Что внутри</h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {topics.map((topic, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onHoverStart={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                className={`relative p-8 rounded-3xl border cursor-pointer transition-all duration-500 self-start
                  ${isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/10'
                    : 'bg-background border-border hover:border-primary/30 hover:-translate-y-0.5'}
                `}
              >
                <div className={`text-xs font-mono mb-4 transition-colors duration-500 ${isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {String(i + 1).padStart(2, "0")} · {topic.id.toUpperCase()}
                </div>
                <h3 className="text-2xl font-serif mb-2">{topic.label}</h3>
                <p className={`text-sm transition-colors duration-500 ${isActive ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                  {topic.desc}
                </p>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="items"
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-5 border-t border-primary-foreground/20">
                        <ul className="space-y-2.5">
                          {topic.items.map((it, j) => (
                            <motion.li
                              key={it}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + j * 0.06, duration: 0.35 }}
                              className="text-sm flex items-start gap-2.5 text-primary-foreground/90"
                            >
                              <span className="mt-2 w-1 h-1 rounded-full bg-primary-foreground/60 shrink-0" />
                              <span>{it}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <FadeIn delay={0.4}>
          <div className="text-center mt-12">
            <p className="inline-block text-xl md:text-2xl font-light text-foreground border-b border-primary/20 pb-1">
              У тебя есть доступ ко всему сразу — без выбора «раз и навсегда».
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Foundation = () => {
  const pillars = [
    {
      title: "Buddy system",
      desc: "Связка 1-на-1 для еженедельного контроля прогресса.",
      meta: "1 встреча в неделю · 30–45 минут",
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="13" r="4" />
          <circle cx="21" cy="13" r="4" />
          <path d="M4 26c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
          <path d="M14 26c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
        </svg>
      )
    },
    {
      title: "Weekly созвоны",
      desc: "Синхронизация небольшими группами. Планы, победы, затыки.",
      meta: "1 раз в неделю · группа до 8 человек",
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="8" width="18" height="16" rx="2" />
          <path d="M22 14l6-3v10l-6-3z" />
          <circle cx="10" cy="14" r="1.5" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "Живое общение",
      desc: "Закрытый чат, где можно спросить что угодно и получить ответ.",
      meta: "24/7 · все участники в одном чате",
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 10a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3h-8l-5 4v-4a3 3 0 01-3-3z" />
          <path d="M10 13h8M10 16h5" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 md:py-32 px-5 md:px-12 max-w-6xl mx-auto">
      <FadeIn>
        <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-10 md:mb-16 text-center">Основа</h2>
      </FadeIn>
      
      <div className="grid md:grid-cols-3 gap-12 md:gap-8">
        {pillars.map((pillar, i) => (
          <FadeIn key={i} delay={i * 0.2} className="relative group">
            {/* Animated Accent Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border/40">
              <motion.div 
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.2, duration: 1, ease: "easeOut" }}
                className="absolute top-0 left-0 w-full h-full bg-primary origin-top"
              />
            </div>
            
            <div className="pl-8 py-4">
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
                {pillar.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {pillar.desc}
              </p>
              <div className="text-xs font-mono uppercase tracking-wider text-primary/70">
                {pillar.meta}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

const WhoItsFor = () => {
  const yes = [
    "Ты не хочешь стоять на месте.",
    "Ты устал пытаться в одиночку.",
    "Ты готов двигаться быстрее — с другими.",
  ];
  const no = [
    "Ищешь готовые ответы, а не работу с собой.",
    "Тебе нужен ментор сверху, а не равные рядом.",
    "Не готов отдавать 1–2 часа в неделю.",
  ];

  return (
    <section className="py-20 md:py-32 px-5 md:px-12 bg-foreground text-background">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-10 md:mb-16">Для кого</h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* YES column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono uppercase tracking-widest text-primary mb-8"
            >
              Тебе сюда, если
            </motion.div>
            <ul className="space-y-7">
              {yes.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.18, duration: 0.6 }}
                  className="flex items-start gap-4"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.18, type: "spring", stiffness: 220, damping: 16 }}
                    className="mt-1.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/15 text-primary shrink-0"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.span>
                  <p className="text-2xl md:text-3xl font-serif font-light leading-snug">
                    {item}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* NO column */}
          <div className="md:border-l md:border-background/15 md:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-xs font-mono uppercase tracking-widest text-background/50 mb-8"
            >
              Тебе сюда не надо, если
            </motion.div>
            <ul className="space-y-7">
              {no.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.18, duration: 0.6 }}
                  className="flex items-start gap-4"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: 90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.18, type: "spring", stiffness: 220, damping: 16 }}
                    className="mt-1.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-background/10 text-background/60 shrink-0"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="6" y1="6" x2="18" y2="18" />
                      <line x1="18" y1="6" x2="6" y2="18" />
                    </svg>
                  </motion.span>
                  <p className="text-xl md:text-2xl font-light leading-snug text-background/70">
                    {item}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const EarlyAccess = () => {
  const cols = 8;
  const rows = 5;
  const total = cols * rows;
  const baseFilled = 4;
  const prefersReducedMotion = useReducedMotion();
  const [pulseIndex, setPulseIndex] = useState<number | null>(null);

  // Periodically "light up" one of the empty cells to give a sense
  // of someone joining the community right now.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const tick = () => {
      const i = baseFilled + Math.floor(Math.random() * (total - baseFilled));
      setPulseIndex(i);
      window.setTimeout(() => setPulseIndex(null), 1400);
    };
    const interval = window.setInterval(tick, 3200);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section className="py-20 md:py-32 px-5 md:px-12 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
        <div className="flex-1 space-y-6 md:space-y-8 w-full">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-[1.1]">
              Сейчас открываем набор первых 40 человек.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-2xl text-muted-foreground font-light leading-relaxed">
              Дальше вход станет сложнее, дороже и с отбором.
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <div className="flex items-center gap-3 text-xs md:text-sm font-mono uppercase tracking-wider text-muted-foreground">
              <span className="relative flex h-2 w-2">
                {!prefersReducedMotion && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
                )}
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span>набор открыт прямо сейчас</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div className="pt-2">
              <JoinButton className="w-full sm:w-auto" />
            </div>
          </FadeIn>
        </div>

        <div className="flex-1 w-full max-w-md">
          <div className="grid grid-cols-8 gap-1.5 md:gap-2 p-4 md:p-6 rounded-3xl border border-border bg-white/50 shadow-sm">
            {Array.from({ length: total }).map((_, i) => {
              const isFilled = i < baseFilled;
              const isPulse = pulseIndex === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02, duration: 0.4 }}
                  className="aspect-square"
                >
                  <motion.div
                    animate={isPulse ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className={`w-full h-full rounded-sm md:rounded-md transition-colors duration-500 ${
                      isFilled
                        ? 'bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.4)]'
                        : isPulse
                          ? 'bg-primary/40 shadow-[0_0_14px_hsl(var(--primary)/0.45)]'
                          : 'border border-border/60 bg-muted/10'
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>
          <FadeIn delay={0.8}>
            <div className="mt-6 flex items-center justify-between px-2 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              <span>Статус набора</span>
              <span className="text-primary font-medium">осталось {total - baseFilled} из {total} мест</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section className="py-20 md:py-32 px-5 md:px-12 bg-white/60 border-y border-border/40">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-10 md:mb-16 text-center">Тарифы</h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <FadeIn delay={0.1} className="h-full">
            <div className="h-full flex flex-col p-10 rounded-[2rem] border border-border bg-background transition-all duration-500 hover:border-primary/30 hover:shadow-lg">
              <div className="text-muted-foreground mb-6 font-medium">Ежемесячно</div>
              <div className="text-4xl md:text-5xl font-serif text-foreground mb-2">2 800 ₽</div>
              <div className="text-sm text-muted-foreground mb-8">/ месяц</div>
              <div className="mt-auto pt-8 border-t border-border/50">
                <JoinButton variant="quiet" className="w-full" />
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="h-full">
            <div className="h-full flex flex-col p-10 rounded-[2rem] border border-primary bg-primary/5 relative transition-all duration-500 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
                Рекомендуем
              </div>
              <div className="text-primary/80 mb-6 font-medium">На 3 месяца</div>
              <div className="flex flex-col mb-8">
                <div className="text-4xl md:text-5xl font-serif text-foreground mb-2">7 500 ₽</div>
                <div className="text-sm font-medium text-primary">≈ 2 500 ₽ / месяц</div>
              </div>
              <div className="mt-auto pt-8 border-t border-primary/20">
                <JoinButton className="w-full" />
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-12 max-w-2xl mx-auto text-center">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              В обе версии входит всё: buddy-связка, weekly-созвоны, чат и темы.
              Оплата — через бота в Telegram после короткого знакомства. Если в первую неделю
              чувствуешь, что не твоё, — возвращаем деньги без вопросов.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Routine = () => {
  const prefersReducedMotion = useReducedMotion();
  const days = [
    { d: "Пн", title: "Цели на неделю", desc: "Короткий чек-ин с buddy. Что сделаем за 7 дней.", active: true },
    { d: "Вт", title: "Работа", desc: "Глубокая работа. Спрашивай в чате — отвечают равные.", active: false },
    { d: "Ср", title: "Weekly-созвон", desc: "Группа до 8 человек. Планы, победы, затыки.", active: true },
    { d: "Чт", title: "Работа", desc: "Прогресс по плану. Делишься промежуточным.", active: false },
    { d: "Пт", title: "Итоги недели", desc: "Что сделал, что застряло. Закрепили — пошли дальше.", active: true },
    { d: "Сб", title: "Пауза", desc: "Отдых. Чат живой — но без обязательств.", active: false },
    { d: "Вс", title: "Подготовка", desc: "Лёгкая планёрка для себя. Готовимся к понедельнику.", active: false },
  ];

  return (
    <section className="py-20 md:py-32 px-5 md:px-12 max-w-6xl mx-auto">
      <FadeIn>
        <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-4 text-center md:text-left">Ритм недели</h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="text-3xl md:text-5xl font-serif text-foreground leading-tight mb-12 md:mb-10 md:mb-16 max-w-3xl">
          Не курс, а <span className="text-primary">постоянная среда</span> — встроенная в твою неделю.
        </p>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
        {days.map((day, i) => (
          <motion.div
            key={day.d}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: "easeOut" }}
            className={`relative p-5 rounded-2xl border transition-all duration-500 group min-h-[180px] flex flex-col
              ${day.active
                ? 'bg-primary/8 border-primary/40 hover:border-primary hover:bg-primary/12'
                : 'bg-background border-border/60 hover:border-primary/20'}
            `}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-mono uppercase tracking-widest ${day.active ? 'text-primary' : 'text-muted-foreground'}`}>
                {day.d}
              </span>
              {day.active && (
                <span className="relative flex h-1.5 w-1.5">
                  {!prefersReducedMotion && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
                  )}
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                </span>
              )}
            </div>
            <h3 className={`font-serif text-lg leading-tight mb-2 ${day.active ? 'text-foreground' : 'text-muted-foreground'}`}>
              {day.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mt-auto">
              {day.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <FadeIn delay={0.5}>
        <p className="mt-10 text-sm font-mono uppercase tracking-wider text-muted-foreground text-center md:text-left">
          итого: ~ 1–2 часа в неделю · остальное — на твой ритм
        </p>
      </FadeIn>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = [
    {
      q: "Сколько времени это займёт?",
      a: "Минимум — 1 час в неделю на созвон. Плюс короткий чек-ин с buddy и переписка в чате. Всё гибко: участники — взрослые занятые люди, и формат под это заточен.",
    },
    {
      q: "Что если я не из Москвы / другого часового пояса?",
      a: "Всё проходит онлайн. Созвоны планируем под удобное окно для всех. Чат и buddy-формат вообще не привязаны ко времени.",
    },
    {
      q: "Я не из IT. Подойдёт ли мне?",
      a: "Да. Мы не про конкретную индустрию — мы про людей, которые двигают свою карьеру, бизнес или новые навыки. AI-инструменты сейчас работают для всех, а карьерные и бизнес-вопросы — универсальны.",
    },
    {
      q: "Это очередной курс или мастермайнд?",
      a: "Ни то, ни другое. Здесь нет лекций и нет «гуру». Это среда из 40 равных, где ты получаешь конкретного buddy, регулярную сверку и чат, в котором всегда есть кому ответить.",
    },
    {
      q: "Что будет, когда наберётся 40 человек?",
      a: "Набор закроется. Дальше — только лист ожидания и более жёсткий отбор. Цена для следующих наборов будет выше.",
    },
    {
      q: "А если не зайдёт?",
      a: "Если в первую неделю поймёшь, что не твоё — возвращаем деньги без вопросов. Никто никого не держит.",
    },
  ];

  return (
    <section className="py-20 md:py-32 px-5 md:px-12 bg-white/40 border-y border-border/40">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-4 text-center">FAQ</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-3xl md:text-5xl font-serif text-foreground leading-tight mb-12 md:mb-10 md:mb-16 text-center">
            Что обычно спрашивают
          </p>
        </FadeIn>

        <div className="divide-y divide-border/60 border-y border-border/60">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left py-6 md:py-7 flex items-start justify-between gap-6 group outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-lg md:text-xl font-serif leading-snug transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`mt-1 inline-flex items-center justify-center w-7 h-7 rounded-full border shrink-0 transition-colors duration-300 ${isOpen ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground group-hover:border-primary/40 group-hover:text-primary'}`}
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-12 text-base md:text-lg text-muted-foreground leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <section className="relative py-24 md:py-48 px-5 md:px-12 min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-radial-gradient from-primary/10 to-transparent opacity-50" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center w-full">
        <FadeIn>
          <h2 className="text-[2.25rem] sm:text-5xl md:text-7xl font-serif text-foreground mb-10 md:mb-16 leading-[1.1]">
            Если тебе откликается — заходи.
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} className="w-full sm:w-auto">
          <motion.div
            animate={prefersReducedMotion ? {} : {
              boxShadow: ["0px 0px 0px 0px rgba(var(--primary), 0)", "0px 0px 40px 10px rgba(var(--primary), 0.15)", "0px 0px 0px 0px rgba(var(--primary), 0)"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full"
          >
            <JoinButton className="text-base md:text-lg px-8 md:px-12 py-4 md:py-5 w-full sm:w-auto" />
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-6 md:mt-8 text-xs md:text-sm font-mono text-muted-foreground uppercase tracking-widest">
            осталось 36 из 40 мест
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

// --- App Shell ---

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const [showFixedCTA, setShowFixedCTA] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const finalCTARef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !finalCTARef.current) return;
      
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      const finalCTATop = finalCTARef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Show when hero is passed, hide when final CTA comes into view
      if (heroBottom < 0 && finalCTATop > windowHeight - 100) {
        setShowFixedCTA(true);
      } else {
        setShowFixedCTA(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary relative font-sans">
      {/* Scroll Progress Bar */}
      {!prefersReducedMotion && (
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      )}

      <div ref={heroRef}>
        <Hero />
      </div>
      
      <Pain />
      <Reframe />
      <WhySmall />
      <Solution />
      <WhoItsFor />
      <WhatsInside />
      <Foundation />
      <Routine />
      <HowItWorks />
      
      <div className="py-20 flex justify-center border-y border-border/40 bg-white/20">
        <FadeIn>
          <JoinButton variant="quiet" />
        </FadeIn>
      </div>
      
      <EarlyAccess />
      <Pricing />
      <FAQ />
      
      <div ref={finalCTARef}>
        <FinalCTA />
      </div>

      <footer className="py-12 text-center text-sm font-mono text-muted-foreground/40 border-t border-border/30">
        <p>Закрытое комьюнити &copy; {new Date().getFullYear()}</p>
      </footer>

      {/* Sticky CTA — full-width bar on mobile, floating pill on desktop */}
      <AnimatePresence>
        {showFixedCTA && (
          <>
            {/* Mobile: full-width bottom bar */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-2 pointer-events-none"
            >
              <div className="pointer-events-auto rounded-2xl bg-background/95 backdrop-blur-md border border-border shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.15)] p-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary mb-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      {!prefersReducedMotion && (
                        <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
                      )}
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                    </span>
                    набор открыт
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    осталось <span className="text-foreground font-medium">36 / 40</span> мест
                  </div>
                </div>
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-md active:scale-95 transition-transform outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Вступить
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Desktop: floating pill */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
              className="hidden md:block fixed bottom-6 right-6 z-40"
            >
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Вступить
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
