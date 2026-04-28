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
  const filledCount = 12;
  const totalCount = 40;
  
  return (
    <section ref={containerRef} className="relative min-h-[95vh] flex flex-col justify-center pt-20 pb-32 px-6 md:px-12 overflow-hidden">
      {/* Subtle Grain Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      <div className="absolute inset-0 bg-radial-gradient from-primary/5 to-transparent opacity-50" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Animated Counter */}
        <div className="mb-12 flex flex-col gap-4">
          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground/60 select-none font-mono">
            <span className="text-foreground/80">12 / 40</span>
            <div className="w-12 h-px bg-border relative overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 w-full bg-primary/60"
              />
            </div>
            <span className="text-primary">40 / 40</span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: totalCount }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: i < filledCount ? 1 : 0.2 }}
                transition={{ delay: 0.5 + i * 0.02, duration: 0.4, ease: "easeOut" }}
                className={`w-1.5 h-4 md:h-5 rounded-full origin-bottom ${i < filledCount ? 'bg-primary' : 'bg-border'}`}
              />
            ))}
          </div>
        </div>
        
        {/* Staggered Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-[5rem] leading-[1.05] font-serif text-foreground max-w-4xl mb-8 tracking-tight flex flex-wrap">
          {"Закрытое комьюнити, в которое сейчас набираем первых 40 человек".split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: prefersReducedMotion ? "none" : "blur(8px)", y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="inline-block mr-3 md:mr-4 lg:mr-5 mb-2"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-12 font-sans font-light"
        >
          Если ты хочешь расти быстрее и не в одиночку — это место, где ты будешь двигаться вместе с другими
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col items-start gap-5"
        >
          <JoinButton />
          <p className="text-sm text-muted-foreground italic tracking-wide">Сейчас нас мало — и в этом главный плюс</p>
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
    <section ref={ref} className="py-32 px-6 md:px-12 bg-white/40 border-y border-border/40 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 relative h-64 md:h-80 w-full flex items-center justify-center bg-background rounded-3xl border border-border/50 overflow-hidden">
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
  
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="space-y-16 md:space-y-24">
        <FadeIn>
          <p className="text-2xl md:text-4xl font-light text-muted-foreground/80 leading-relaxed">
            Ты вроде что-то делаешь — но один.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <p className="text-3xl md:text-5xl font-light text-foreground leading-tight">
            И поэтому быстро{" "}
            <span className="relative inline-block">
              сливаешься,
              <motion.span 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                className="absolute top-1/2 left-0 w-full h-[2px] bg-destructive origin-left"
              />
            </span>{" "}
            <span className="relative inline-block">
              откладываешь,
              <motion.span 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                className="absolute top-1/2 left-0 w-full h-[2px] bg-destructive origin-left"
              />
            </span>{" "}
            <span className="relative inline-block">
              теряешь темп.
              <motion.span 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
                className="absolute top-1/2 left-0 w-full h-[2px] bg-destructive origin-left"
              />
            </span>
          </p>
        </FadeIn>
      </div>
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
    <section ref={ref} className="relative py-40 px-6 md:px-12 bg-background min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-4xl mx-auto text-center relative h-[300px] flex flex-col justify-center">
        <motion.p 
          style={{ opacity: opacity1 }}
          className="text-3xl md:text-5xl font-serif text-muted-foreground absolute inset-x-0 top-1/4 -translate-y-1/2"
        >
          Проблема не в знаниях.
        </motion.p>
        <motion.p 
          style={{ opacity: opacity2, y: y2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary absolute inset-x-0 top-1/2 -translate-y-1/2"
        >
          А в отсутствии среды.
        </motion.p>
      </div>
    </section>
  );
};

const Solution = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-primary/5 border-y border-primary/10">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start md:items-center">
            <div className="flex-1 space-y-6 text-2xl md:text-4xl font-serif text-muted-foreground/50">
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
    <section ref={sectionRef} className="py-32 px-6 md:px-12 max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-16">Как это работает</h2>
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const topics = [
    { id: 'career', label: 'Карьера', desc: 'Расти в найме, пробивай потолок.' },
    { id: 'business', label: 'Бизнес', desc: 'Строй своё, тестируй гипотезы.' },
    { id: 'ai', label: 'Нейросети', desc: 'Ускоряй работу, делегируй рутину.' }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-white/40 border-y border-border/40">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-16 text-center md:text-left">Что внутри</h2>
        </FadeIn>
        
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`flex-1 p-8 rounded-3xl border transition-all duration-500 cursor-default
                ${hoveredIndex === i ? 'bg-primary text-primary-foreground border-primary scale-[1.02] shadow-xl' : 'bg-background border-border hover:border-primary/30'}
                ${hoveredIndex !== null && hoveredIndex !== i ? 'opacity-50 scale-[0.98]' : 'opacity-100'}
              `}
            >
              <div className={`text-xs font-mono mb-4 transition-colors duration-500 ${hoveredIndex === i ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                {topic.id.toUpperCase()}
              </div>
              <h3 className="text-2xl font-serif mb-2">{topic.label}</h3>
              <p className={`text-sm transition-colors duration-500 ${hoveredIndex === i ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                {topic.desc}
              </p>
            </motion.div>
          ))}
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
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 10a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3h-8l-5 4v-4a3 3 0 01-3-3z" />
          <path d="M10 13h8M10 16h5" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <FadeIn>
        <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-16 text-center">Основа</h2>
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
              <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

const WhoItsFor = () => {
  const items = [
    "Тем, кто не хочет стоять на месте.",
    "Тем, кто устал пытаться в одиночку.",
    "Тем, кто хочет двигаться быстрее."
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-foreground text-background">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-16">Для кого</h2>
        </FadeIn>
        
        <div className="space-y-12">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3, duration: 0.8 }}
              className="flex items-start gap-6"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.3, type: "spring" }}
                className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0"
              />
              <p className="text-3xl md:text-5xl font-serif font-light leading-tight">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EarlyAccess = () => {
  const cols = 8;
  const rows = 5;
  const total = cols * rows;
  const baseFilled = 12;
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
    <section className="py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-8">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
              Сейчас открываем набор первых 40 человек.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Дальше вход станет сложнее, дороже и с отбором.
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              <span className="relative flex h-2 w-2">
                {!prefersReducedMotion && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
                )}
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span>набор открыт прямо сейчас</span>
            </div>
          </FadeIn>
        </div>
        
        <div className="flex-1 w-full max-w-md">
          <div className="grid grid-cols-8 gap-2 p-6 rounded-3xl border border-border bg-white/50 shadow-sm">
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
    <section className="py-32 px-6 md:px-12 bg-white/60 border-y border-border/40">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-16 text-center">Тарифы</h2>
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
      </div>
    </section>
  );
};

const FinalCTA = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <section className="relative py-48 px-6 md:px-12 min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-radial-gradient from-primary/10 to-transparent opacity-50" />
      
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-serif text-foreground mb-16 leading-tight">
            Если тебе откликается — заходи.
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <motion.div
            animate={prefersReducedMotion ? {} : { 
              boxShadow: ["0px 0px 0px 0px rgba(var(--primary), 0)", "0px 0px 40px 10px rgba(var(--primary), 0.15)", "0px 0px 0px 0px rgba(var(--primary), 0)"] 
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full"
          >
            <JoinButton className="text-lg px-12 py-5" />
          </motion.div>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <p className="mt-8 text-sm font-mono text-muted-foreground uppercase tracking-widest">
            осталось 28 из 40 мест
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
      <HowItWorks />
      
      <div className="py-20 flex justify-center border-y border-border/40 bg-white/20">
        <FadeIn>
          <JoinButton variant="quiet" />
        </FadeIn>
      </div>
      
      <EarlyAccess />
      <Pricing />
      
      <div ref={finalCTARef}>
        <FinalCTA />
      </div>

      <footer className="py-12 text-center text-sm font-mono text-muted-foreground/40 border-t border-border/30">
        <p>Закрытое комьюнити &copy; {new Date().getFullYear()}</p>
      </footer>

      {/* Fixed Bottom CTA */}
      <AnimatePresence>
        {showFixedCTA && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40"
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
        )}
      </AnimatePresence>
    </main>
  );
}
