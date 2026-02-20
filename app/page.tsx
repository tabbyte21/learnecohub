"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  BookOpen, Users, Play, GraduationCap, BarChart3, Globe, Heart,
  ArrowRight, CheckCircle2, Sparkles, ChevronRight, ChevronDown, Star, Menu, X,
  Zap, Target, TrendingUp, Award, Clock, Download, MessageCircle,
  Layers, Monitor, Headphones, PenTool, FileText, Video, Gamepad2,
  Puzzle, Trophy, Flame, Shield, CircleCheck, Lock, Crown, Rocket,
  Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin,
} from "lucide-react";

/* ─── Hooks ─── */
function useAnim() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    ref.current?.querySelectorAll(".anim, .anim-left, .anim-right, .anim-scale").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useAnim();
  return <div ref={ref} className={className}>{children}</div>;
}

function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, 1 - (rect.top - vh * 0.5) / (vh * 0.7)));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
  return progress;
}

/* ─── Animated Counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const p = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ═══════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════ */
/* Dropdown for main page navbar (light variant) */
function MainNavDropdown({ label, href, sub }: {
  label: string; href: string;
  sub: { label: string; href: string; icon: React.ElementType; desc: string }[];
}) {
  return (
    <div className="relative group/dd">
      <a href={href} className="px-4 py-2 text-[0.85rem] font-semibold text-slate-500 hover:text-brand-600 rounded-xl hover:bg-brand-50 transition-all flex items-center gap-1">
        {label}
        <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover/dd:rotate-180" />
      </a>
      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/dd:opacity-100 group-hover/dd:visible transition-all duration-200">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 min-w-[220px]">
          {sub.map((s) => (
            <a key={s.label} href={s.href} className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors group/item">
              <s.icon className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0 group-hover/item:text-brand-600 transition-colors" />
              <div>
                <span className="block text-[0.82rem] font-semibold text-slate-700 group-hover/item:text-brand-600 transition-colors">{s.label}</span>
                <span className="block text-[0.72rem] text-slate-400 leading-snug">{s.desc}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const mobileLinks = [
    { label: "Hikayemiz", href: "/hikayemiz" },
    { label: "İş Birlikleri", href: "/is-birlikleri" },
    { label: "İçeriklerimiz", href: "/iceriklerimiz" },
    { label: "Kurslarımız", href: "/kurslarimiz" },
    { label: "Blog", href: "/blog" },
    { label: "İletişim", href: "/contact" },
  ];
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "nav-scrolled py-3 opacity-100 translate-y-0" : "bg-transparent py-5 opacity-0 -translate-y-4 pointer-events-none"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <img src="https://learnecohub.com/wp-content/uploads/2025/03/logo-3-e1749328376385.png" alt="LearnecoHub" className="h-10 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-1">
          <MainNavDropdown label="Hikayemiz" href="/hikayemiz" sub={[
            { label: "İş Birlikleri", href: "/is-birlikleri", icon: Users, desc: "Kurumsal ortaklıklar" },
          ]} />
          <MainNavDropdown label="İçeriklerimiz" href="/iceriklerimiz" sub={[
            { label: "Kurslarımız", href: "/kurslarimiz", icon: GraduationCap, desc: "Canlı grup dersleri" },
          ]} />
          <a href="/blog" className="px-4 py-2 text-[0.85rem] font-semibold text-slate-500 hover:text-brand-600 rounded-xl hover:bg-brand-50 transition-all">Blog</a>
          <a href="/contact" className="px-4 py-2 text-[0.85rem] font-semibold text-slate-500 hover:text-brand-600 rounded-xl hover:bg-brand-50 transition-all">İletişim</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="https://lms.learnecohub.com" className="text-[0.85rem] font-bold text-slate-600 hover:text-brand-600 transition-colors px-4 py-2">Giriş Yap</a>
          <a href="#cta" className="btn-3d btn-3d-brand !py-2.5 !px-5 !text-[0.85rem]">Hemen Başla</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden absolute top-full inset-x-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 p-6 shadow-lg">
          <div className="flex flex-col gap-1">
            {mobileLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold text-slate-600 rounded-xl hover:bg-brand-50 transition-all">{l.label}</a>
            ))}
            <div className="border-t border-slate-100 pt-4 mt-2 flex flex-col gap-2">
              <a href="https://lms.learnecohub.com" className="px-4 py-3 text-sm font-bold text-slate-600">Giriş Yap</a>
              <a href="#cta" className="btn-3d btn-3d-brand justify-center">Hemen Başla</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════
   HERO — Floating rounded tab
   ═══════════════════════════════════════ */
function Hero() {
  const [heroMenuOpen, setHeroMenuOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex flex-col p-3 sm:p-4 overflow-hidden bg-[#E8F4FD]">
      {/* Rounded dark-blue tab */}
      <div className="hero-dark-tab relative z-10 flex-1 flex flex-col overflow-hidden">
        {/* Inner bg + orbs */}
        <div className="absolute inset-0 bg-[#1B3A7B]" />
        <div className="absolute inset-0 dots-pattern opacity-[0.06]" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#4D7EC4]/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[400px] h-[400px] bg-[#2ECC71]/15 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-[#F5C518]/10 rounded-full blur-[80px]" />

        {/* Hero Nav */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-8 pt-5 pb-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group">
            <img src="https://learnecohub.com/wp-content/uploads/2025/03/logo-3-e1749328376385.png" alt="LearnecoHub" className="h-10 w-auto brightness-0 invert" />
          </a>
          <div className="hidden md:flex items-center gap-1">
            {/* Hikayemiz with dropdown */}
            <div className="relative group/dd">
              <a href="/hikayemiz" className="px-4 py-2 text-[0.84rem] font-semibold text-white/60 hover:text-white rounded-xl hover:bg-white/8 transition-all flex items-center gap-1">
                Hikayemiz <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover/dd:rotate-180" />
              </a>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/dd:opacity-100 group-hover/dd:visible transition-all duration-200">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 min-w-[220px]">
                  <a href="/is-birlikleri" className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors group/item">
                    <Users className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0 group-hover/item:text-brand-600 transition-colors" />
                    <div>
                      <span className="block text-[0.82rem] font-semibold text-slate-700 group-hover/item:text-brand-600 transition-colors">İş Birlikleri</span>
                      <span className="block text-[0.72rem] text-slate-400 leading-snug">Kurumsal ortaklıklar</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {/* İçeriklerimiz with dropdown */}
            <div className="relative group/dd2">
              <a href="/iceriklerimiz" className="px-4 py-2 text-[0.84rem] font-semibold text-white/60 hover:text-white rounded-xl hover:bg-white/8 transition-all flex items-center gap-1">
                İçeriklerimiz <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover/dd2:rotate-180" />
              </a>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/dd2:opacity-100 group-hover/dd2:visible transition-all duration-200">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 min-w-[220px]">
                  <a href="/kurslarimiz" className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors group/item">
                    <GraduationCap className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0 group-hover/item:text-brand-600 transition-colors" />
                    <div>
                      <span className="block text-[0.82rem] font-semibold text-slate-700 group-hover/item:text-brand-600 transition-colors">Kurslarımız</span>
                      <span className="block text-[0.72rem] text-slate-400 leading-snug">Canlı grup dersleri</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <a href="/blog" className="px-4 py-2 text-[0.84rem] font-semibold text-white/60 hover:text-white rounded-xl hover:bg-white/8 transition-all">Blog</a>
            <a href="/contact" className="px-4 py-2 text-[0.84rem] font-semibold text-white/60 hover:text-white rounded-xl hover:bg-white/8 transition-all">İletişim</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://lms.learnecohub.com" className="hidden sm:block text-[0.84rem] font-bold text-white/60 hover:text-white transition-colors px-3 py-2">Giriş Yap</a>
            <a href="#cta" className="hidden sm:inline-flex btn-3d btn-3d-mint !py-2.5 !px-6 !text-[0.84rem] !rounded-xl !gap-1.5">
              Hemen Başla
            </a>
            <button onClick={() => setHeroMenuOpen(!heroMenuOpen)} className="md:hidden w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70">
              {heroMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {/* Mobile menu overlay */}
          {heroMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-[#1B3A7B]/95 backdrop-blur-xl border-t border-white/10 p-5 z-50">
              <div className="flex flex-col gap-1">
                {[
                  { label: "Hikayemiz", href: "/hikayemiz" },
                  { label: "İş Birlikleri", href: "/is-birlikleri" },
                  { label: "İçeriklerimiz", href: "/iceriklerimiz" },
                  { label: "Kurslarımız", href: "/kurslarimiz" },
                  { label: "Blog", href: "/blog" },
                  { label: "İletişim", href: "/contact" },
                ].map((l) => (
                  <a key={l.label} href={l.href} className="px-4 py-3 text-sm font-semibold text-white/70 rounded-xl hover:bg-white/10 transition-all">{l.label}</a>
                ))}
                <div className="border-t border-white/10 pt-3 mt-2 flex flex-col gap-2">
                  <a href="https://lms.learnecohub.com" className="px-4 py-3 text-sm font-bold text-white/70">Giriş Yap</a>
                  <a href="#cta" className="btn-3d btn-3d-mint justify-center">Hemen Başla</a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hero Content — centered text with balloon-burst cards */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-8 pt-8 sm:pt-12 lg:pt-16 pb-10 flex-1 flex items-center justify-center">
          {/* 6 cards bursting outward from center like balloons */}
          <div className="hidden lg:block absolute inset-0 z-20 pointer-events-none">
            {[
              { icon: MessageCircle, label: "İletişim", count: "32 Ders", progress: 85, color: "#4D7EC4", bg: "#EBF2FB", border: "#A8C2E3", pos: "left-[6%] xl:left-[10%] top-[18%]", delay: "0.2s", float: "heroB1", rot: "-4deg" },
              { icon: Heart, label: "Empati", count: "28 Ders", progress: 91, color: "#F5C518", bg: "#FFFBEB", border: "#FFEA99", pos: "left-[2%] xl:left-[6%] top-[44%]", delay: "0.45s", float: "heroB2", rot: "3deg" },
              { icon: Shield, label: "Öz Farkındalık", count: "18 Ders", progress: 73, color: "#2ECC71", bg: "#ECFBF2", border: "#A3EBC1", pos: "left-[8%] xl:left-[12%] bottom-[18%]", delay: "0.7s", float: "heroB3", rot: "-2deg" },
              { icon: Users, label: "Takım Çalışması", count: "24 Ders", progress: 62, color: "#2ECC71", bg: "#ECFBF2", border: "#A3EBC1", pos: "right-[6%] xl:right-[10%] top-[18%]", delay: "0.35s", float: "heroB4", rot: "4deg" },
              { icon: Puzzle, label: "Problem Çözme", count: "20 Ders", progress: 45, color: "#1B3A7B", bg: "#EBF2FB", border: "#A8C2E3", pos: "right-[2%] xl:right-[6%] top-[44%]", delay: "0.6s", float: "heroB5", rot: "-3deg" },
              { icon: Target, label: "Duygu Yönetimi", count: "22 Ders", progress: 58, color: "#F5C518", bg: "#FFFBEB", border: "#FFEA99", pos: "right-[8%] xl:right-[12%] bottom-[18%]", delay: "0.85s", float: "heroB6", rot: "2deg" },
            ].map((c, i) => (
              <div
                key={i}
                className={`absolute ${c.pos} w-[190px] hero-card-burst pointer-events-auto cursor-pointer`}
                style={{ animationDelay: c.delay, "--burst-rot": c.rot } as React.CSSProperties}
              >
                <div className={`hero-card-float-${c.float} bg-white rounded-2xl p-3.5 border-2 shadow-xl shadow-black/10`}
                  style={{ borderColor: c.border, borderBottomWidth: "5px", borderBottomColor: c.color }}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: c.bg }}>
                      <c.icon className="w-4 h-4" style={{ color: c.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display font-bold text-[0.78rem] text-slate-800 leading-tight">{c.label}</p>
                      <span className="text-[0.6rem] font-semibold text-slate-400">{c.count}</span>
                    </div>
                  </div>
                  <div className="progress-bar !h-1.5">
                    <div className="progress-fill" style={{ width: `${c.progress}%`, background: c.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center — Text */}
          <div className="text-center max-w-2xl mx-auto relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5C518] text-[#1A1A2E] text-[0.72rem] font-bold uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5" /> K-12 Sosyal Beceri Platformu
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-white/80 text-[0.72rem] font-bold uppercase tracking-wide border border-white/10">
                Bilimsel Temelli
              </span>
            </div>

            <h1 className="font-display text-[2.2rem] sm:text-[2.8rem] lg:text-[3.4rem] font-extrabold leading-[1.06] tracking-tight text-white mb-6">
              Sosyal becerileri çocuklara kazandırmanın{" "}
              <span className="text-[#F5C518]">en kolay yolu.</span>
            </h1>

            <p className="text-[1rem] sm:text-[1.05rem] text-white/70 leading-relaxed mb-4 max-w-xl mx-auto">
              Empati, duygu yönetimi ve öz farkındalık gibi <strong className="text-white font-semibold">60&apos;tan fazla</strong> sosyal-duygusal beceriyi çocuklara ve gençlere sistemli, kolay ve etkili biçimde kazandırıyoruz.
            </p>
            <p className="text-[0.9rem] text-white/50 leading-relaxed mb-8 max-w-lg mx-auto">
              İlgi çekici videolar, etkileşimli oyunlar ve yazdırılabilir materyallerle kapsamlı bir sosyal beceri müfredatı sizi bekliyor.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <a href="#cta" className="btn-3d btn-3d-mint !text-base">
                <Rocket className="w-5 h-5" />
                Ücretsiz Başla
              </a>
              <a href="#steps" className="btn-3d !bg-white/10 !text-white !border-white/15 !shadow-none hover:!bg-white/15 !border-2">
                Nasıl Çalışır?
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5">
              {[
                { icon: CheckCircle2, text: "Ücretsiz Başlangıç", color: "text-[#2ECC71]" },
                { icon: Shield, text: "Güvenli Platform", color: "text-[#F5C518]" },
                { icon: Award, text: "MEB Uyumlu", color: "text-[#4D7EC4]" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[0.8rem] font-semibold text-white/50">
                  <b.icon className={`w-4 h-4 ${b.color}`} />
                  {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gold band — Partner Logos scrolling (inside the tab, at bottom) */}
        <div className="relative z-10 bg-[#F5C518] mt-auto overflow-hidden">
          <div className="py-4">
            <div className="ref-marquee-inner flex gap-10 w-max items-center">
              {[...["Koç Holding", "Penta Teknoloji", "Başakşehir Living Lab", "Aygaz", "Limer", "Lüleburgaz Belediyesi", "Kocaeli Belediyesi", "YEKUV"], ...["Koç Holding", "Penta Teknoloji", "Başakşehir Living Lab", "Aygaz", "Limer", "Lüleburgaz Belediyesi", "Kocaeli Belediyesi", "YEKUV"]].map((name, i) => (
                <div key={i} className="flex items-center gap-2 text-[#1A1A2E]/60 flex-shrink-0">
                  <div className="w-5 h-5 rounded bg-[#1A1A2E]/10 flex items-center justify-center">
                    <Globe className="w-3 h-3" />
                  </div>
                  <span className="text-[0.75rem] font-bold tracking-tight whitespace-nowrap">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   STATS
   ═══════════════════════════════════════ */
function Stats() {
  const stats = [
    { value: 500, suffix: "+", label: "Dijital İçerik ve Materyal", icon: Layers, cls: "card-3d-brand" },
    { value: 100, suffix: "+", label: "Sosyal-Duygusal Beceri Modülü", icon: BookOpen, cls: "card-3d-mint" },
    { value: 60, suffix: "+", label: "Temel Yaşam Becerisi", icon: Target, cls: "card-3d-lavender" },
    { value: 20, suffix: " Yıl+", label: "Bilimsel Araştırma Temeli", icon: Award, cls: "card-3d-peach" },
  ];
  return (
    <Section>
      <section className="py-20 bg-[#FFFBEB] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute top-10 right-[10%] w-48 h-48 bg-gold-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[8%] w-40 h-40 bg-brand-200/20 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className={`anim d${i + 1} card-3d ${s.cls} p-6 text-center`}>
                <s.icon className="w-7 h-7 mx-auto mb-3 opacity-40" />
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-slate-800 mb-1">
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-[0.78rem] text-slate-500 font-medium leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   YOUTUBE SHOWCASE — Embedded Video
   ═══════════════════════════════════════ */
function YoutubeShowcase() {
  const [playing, setPlaying] = useState(false);

  return (
    <Section>
      <section className="relative py-0 overflow-hidden">
        {/* Top subtle fade */}
        <div className="absolute top-0 left-0 right-0 h-8 z-10" style={{ background: "linear-gradient(to bottom, #FFFBEB, transparent)" }} />

        {/* Main background */}
        <div className="absolute inset-0 bg-[#1B3A7B]" />
        <div className="absolute inset-0 dots-pattern opacity-[0.05]" />

        {/* Orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#4D7EC4]/25 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[400px] h-[400px] bg-[#2ECC71]/12 rounded-full blur-[100px]" />
        <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] bg-[#F5C518]/8 rounded-full blur-[90px]" />

        {/* Bottom subtle fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 z-10" style={{ background: "linear-gradient(to top, #ffffff, transparent)" }} />

        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 sm:py-24">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-12 items-center">
            {/* Left — Text */}
            <div>
              <div className="anim">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-[0.72rem] font-bold uppercase tracking-wide mb-5">
                  <Play className="w-3.5 h-3.5" /> TANITIM VİDEOSU
                </span>
              </div>

              <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white mb-5 tracking-tight leading-[1.12]">
                Çocukları hayata{" "}
                <span className="text-[#F5C518]">hazırlıyoruz.</span>
              </h2>

              <p className="anim d2 text-white/60 text-[0.95rem] leading-[1.85] mb-8 max-w-lg">
                Sosyal-duygusal öğrenme müfredatımızın nasıl çalıştığını, çocuklara ne kazandırdığını ve platformumuzu yakından tanıyın.
              </p>

              {/* Square stat cards */}
              <div className="anim d3 grid grid-cols-3 gap-2 sm:gap-3 mb-8">
                {[
                  { icon: BookOpen, value: "100+", label: "Beceri", color: "#2ECC71", bg: "rgba(46,204,113,0.12)" },
                  { icon: Video, value: "200+", label: "Video", color: "#F5C518", bg: "rgba(245,197,24,0.12)" },
                  { icon: Users, value: "10K+", label: "Öğrenci", color: "#4D7EC4", bg: "rgba(77,126,196,0.15)" },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl border border-white/10 p-3 sm:p-4 text-center backdrop-blur-sm" style={{ background: s.bg }}>
                    <s.icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1.5 sm:mb-2" style={{ color: s.color }} />
                    <p className="font-display text-lg sm:text-xl font-extrabold text-white leading-none mb-0.5">{s.value}</p>
                    <p className="text-[0.62rem] sm:text-[0.68rem] text-white/50 font-semibold">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="anim d4">
                <a href="#cta" className="btn-3d btn-3d-mint">
                  <Rocket className="w-5 h-5" /> Hemen Başla
                </a>
              </div>
            </div>

            {/* Right — YouTube Video */}
            <div className="anim d2 relative">
              {/* Glow behind video */}
              <div className="absolute -inset-3 rounded-3xl bg-[#F5C518]/10 blur-2xl" />

              <div
                className="relative rounded-2xl overflow-hidden border-2 border-white/10"
                style={{ boxShadow: "0 6px 0 rgba(77,126,196,0.25), 0 20px 50px rgba(0,0,0,0.35)" }}
              >
                {/* 16:9 aspect ratio container */}
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  {!playing ? (
                    <>
                      {/* Thumbnail */}
                      <img
                        src="https://img.youtube.com/vi/GcjqT6zb1Ts/maxresdefault.jpg"
                        alt="LearnecoHub Tanıtım Videosu"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />

                      {/* Centered play button — large */}
                      <button
                        onClick={() => setPlaying(true)}
                        className="absolute inset-0 z-10 flex items-center justify-center group cursor-pointer"
                      >
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F5C518] flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ boxShadow: "0 4px 0 #D4A816, 0 8px 30px rgba(245,197,24,0.4)" }}>
                          <Play className="w-9 h-9 sm:w-11 sm:h-11 text-[#1A1A2E] ml-1" fill="#1A1A2E" />
                        </div>
                      </button>

                      {/* Bottom-right "Videoyu İzle" label */}
                      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-sm">
                        <Youtube className="w-4 h-4 text-[#FF0000]" />
                        <span className="font-display font-bold text-white text-[0.78rem]">Videoyu İzle</span>
                      </div>
                    </>
                  ) : (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/GcjqT6zb1Ts?autoplay=1&rel=0"
                      title="LearnecoHub Tanıtım Videosu"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   MATERIALS — 3 Interactive Cards
   ═══════════════════════════════════════ */
function Materials() {
  const cards = [
    {
      icon: Video, label: "Etkileşimli Videolar", count: "200+", color: "#1B3A7B", bg: "#EBF2FB", accent: "#4D7EC4",
      lines: ["Hikaye temelli animasyonlar", "Yaşa özel senaryolar", "Karakter gelişim serileri", "Bilimsel temelli içerik", "Oyunlaştırılmış anlatım"],
    },
    {
      icon: Gamepad2, label: "Beceri Oyunları", count: "80+", color: "#2ECC71", bg: "#ECFBF2", accent: "#69DC9A",
      lines: ["Etkileşimli karar oyunları", "Takım çalışması görevleri", "Empati simülasyonları", "Ödül ve rozet sistemi", "Anlık geri bildirim"],
    },
    {
      icon: FileText, label: "Çalışma Sayfaları", count: "500+", color: "#7F63CB", bg: "#F0EDF9", accent: "#9F8AD8",
      lines: ["Yazdırılabilir etkinlikler", "Dijital dolgu formları", "Bireysel ve grup çalışmaları", "Ev ödevi materyalleri", "Değerlendirme formları"],
    },
    {
      icon: Monitor, label: "Dijital Dersler", count: "120+", color: "#EE7A45", bg: "#FEF5F0", accent: "#F49668",
      lines: ["Sınıf içi ders modülleri", "Uzaktan eğitim uyumlu", "Adım adım rehberler", "Öğretmen kılavuzları", "Hazır ders planları"],
    },
    {
      icon: Headphones, label: "Sesli İçerikler", count: "60+", color: "#F5C518", bg: "#FFFBEB", accent: "#FFDF66",
      lines: ["Farkındalık meditasyonları", "Hikaye dinleme serileri", "Duygusal düzenleme sesleri", "Nefes egzersizleri", "Rahatlatıcı müzikler"],
    },
    {
      icon: Users, label: "Grup Etkinlikleri", count: "90+", color: "#1B3A7B", bg: "#EBF2FB", accent: "#7BA0D3",
      lines: ["Takım kurma aktiviteleri", "Empati çemberleri", "Rol yapma egzersizleri", "Tartışma kartları", "İşbirliği projeleri"],
    },
    {
      icon: PenTool, label: "Yaratıcı Atölyeler", count: "40+", color: "#2ECC71", bg: "#ECFBF2", accent: "#A3EBC1",
      lines: ["Sanat terapi etkinlikleri", "Hikaye yazma atölyeleri", "Drama çalışmaları", "Görsel ifade projeleri", "Müzik ve hareket"],
    },
    {
      icon: BarChart3, label: "Değerlendirme", count: "75+", color: "#7F63CB", bg: "#F0EDF9", accent: "#BFB1E5",
      lines: ["Beceri ölçüm testleri", "Gelişim takip raporları", "Öğrenci portfolyoları", "Veli bilgilendirme formları", "Sınıf analiz araçları"],
    },
  ];

  return (
    <Section>
      <section id="materials" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-gold-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-brand-100 text-brand-700 mb-4"><Sparkles className="w-3.5 h-3.5" /> MATERYALLER</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Sosyal Becerileri Öğretmeyi Kolaylaştıran <span className="text-gradient">İlgi Çekici Materyaller</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              İlkokuldan liseye kadar tüm seviyelerdeki öğrencilere, 100&apos;den fazla sosyal-duygusal beceri kazandırıyoruz. Müfredatımız animasyonlu videolar, etkileşimli beceri oyunları ve zengin araçlarla destekleniyor.
            </p>
          </div>

          {/* Horizontal scrolling A4 file-icon cards */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, white, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, white, transparent)" }} />
            <div className="material-marquee overflow-hidden">
              <div className="material-marquee-inner flex gap-8 w-max py-12 px-10">
                {[...cards, ...cards].map((c, i) => (
                  <div key={i} className="a4-file group relative flex-shrink-0 w-[240px] cursor-pointer">
                    {/* A4 document body */}
                    <div className="relative transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.08))" }}>
                      {/* Main A4 page with dog-ear clip */}
                      <div
                        className="relative overflow-hidden"
                        style={{
                          height: "340px",
                          background: "#ffffff",
                          clipPath: "polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)",
                          borderRadius: "14px",
                          border: `2px solid ${c.accent}40`,
                        }}
                      >
                        {/* Lined paper background */}
                        <div className="absolute inset-0 a4-lines" style={{ "--line-color": c.accent + "18" } as React.CSSProperties} />

                        {/* Left margin line */}
                        <div className="absolute top-0 bottom-0 left-[42px] w-[1.5px]" style={{ background: c.color + "15" }} />

                        {/* Dog-ear fold */}
                        <div className="absolute top-0 right-0 w-[36px] h-[36px] z-10">
                          <div className="absolute inset-0" style={{ background: c.bg, clipPath: "polygon(0 0, 100% 100%, 0 100%)" }} />
                          <div className="absolute inset-0" style={{ background: c.accent + "20", clipPath: "polygon(0 0, 0 100%, 100% 100%)" }} />
                          <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: c.accent + "30" }} />
                        </div>

                        {/* Header strip */}
                        <div className="relative z-10 px-5 pt-6 pb-3 flex items-end gap-3" style={{ borderBottom: `2px solid ${c.accent}25` }}>
                          <div className="flex-1 min-w-0 pl-5">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[0.6rem] font-extrabold uppercase tracking-widest" style={{ color: c.color }}>{c.count} MATERYAL</span>
                            </div>
                            <h4 className="font-display font-extrabold text-[1.05rem] text-slate-800 leading-tight">{c.label}</h4>
                          </div>
                        </div>

                        {/* Content lines — like handwritten notes */}
                        <div className="relative z-10 px-5 pt-4 space-y-0">
                          {c.lines.map((line, j) => (
                            <div
                              key={j}
                              className="a4-content-line flex items-center gap-2.5 pl-5"
                              style={{ height: "38px", animationDelay: `${j * 0.12}s` }}
                            >
                              <div className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: c.color }} />
                              <span className="text-[0.8rem] text-slate-600 font-medium">{line}</span>
                            </div>
                          ))}
                        </div>

                        {/* Bottom accent bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-[6px]" style={{ background: c.color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   FREE MATERIAL BANNER
   ═══════════════════════════════════════ */
function FreeBanner() {
  return (
    <Section>
      <section className="py-16 bg-[#F5C518] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.08]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h3 className="anim font-display text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] mb-3 tracking-tight">
            Her ay <span className="font-extrabold underline decoration-[#1B3A7B] decoration-2 underline-offset-4">ücretsiz</span> sosyal beceri materyalleri edinin.
          </h3>
          <p className="anim d1 text-[#1A1A2E]/70 text-[0.9rem] leading-relaxed max-w-2xl mx-auto mb-7">
            Stres yönetimi, empati, öz farkındalık, eleştirel düşünme, duygu yönetimi, motivasyon, hedef belirleme ve uygulama odaklı eğitim materyalleri.
          </p>
          <a href="#cta" className="anim d2 btn-3d btn-3d-brand">
            <Download className="w-5 h-5" /> Kayıt Ol ve İndir
          </a>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   VIDEO SHOWCASE — Notebook Style Cards
   ═══════════════════════════════════════ */
function VideoShowcase() {
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const videos = [
    { title: "Tanıtım Videosu", desc: "LearnecoHub platformunun kapsamlı sosyal beceri müfredatını ve öğrenme deneyimini keşfedin.", accent: "#1B3A7B", tabColor: "#1B3A7B", src: "https://learnecohub.com/wp-content/uploads/2025/07/Tanitim-Videosu-Guncel.mp4" },
    { title: "Etkileşimli Video", desc: "Hikayeleştirilmiş, animasyon destekli ve oyunlaştırılmış etkileşimli video içeriklerimize göz atın.", accent: "#2ECC71", tabColor: "#2ECC71", src: "https://learnecohub.com/wp-content/uploads/2025/07/Etkilesimli-Video-Tanitim-1.mp4" },
    { title: "Platform Güvenliği", desc: "Çocuklarınız için güvenli ve kontrollü bir dijital öğrenme ortamı sunuyoruz.", accent: "#F5C518", tabColor: "#F5C518", src: "https://learnecohub.com/wp-content/uploads/2025/07/Web-Sitesi-Guvenlik-2.mp4" },
    { title: "Empati Gelişimi", desc: "Çocukların empati becerilerini hikayeler ve interaktif senaryolarla geliştiren video dersler.", accent: "#7F63CB", tabColor: "#7F63CB", src: "https://learnecohub.com/wp-content/uploads/2025/07/Tanitim-Videosu-Guncel.mp4" },
    { title: "Duygu Yönetimi", desc: "Öfke, kaygı ve üzüntü gibi duyguları tanıma ve yönetme stratejilerini öğreten içerikler.", accent: "#EE7A45", tabColor: "#EE7A45", src: "https://learnecohub.com/wp-content/uploads/2025/07/Etkilesimli-Video-Tanitim-1.mp4" },
    { title: "Sosyal Beceriler", desc: "Arkadaşlık kurma, iş birliği ve iletişim becerilerini destekleyen animasyonlu dersler.", accent: "#1B3A7B", tabColor: "#1B3A7B", src: "https://learnecohub.com/wp-content/uploads/2025/07/Web-Sitesi-Guvenlik-2.mp4" },
  ];

  return (
    <Section>
      <section className="py-24 bg-[#E8F4FD] relative overflow-hidden">
        <div className="absolute top-20 right-[8%] w-60 h-60 bg-brand-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[5%] w-52 h-52 bg-mint-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-lavender-100 text-lavender-700 mb-4"><Video className="w-3.5 h-3.5" /> VİDEO İÇERİKLER</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Hikayeleştirilmiş <span className="text-gradient">video dersler</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Yaş gruplarına özel, animasyon destekli ve oyunlaştırılmış video içeriklerimizi keşfedin.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((v, i) => {
              const isPlaying = playingIdx === i;
              return (
                <div key={i} className={`anim d${i <= 2 ? i + 1 : 3} group relative`}>
                  <div
                    className="relative bg-white rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                    style={{
                      boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
                    }}
                  >
                    {/* Top colored tab */}
                    <div className="relative h-10 flex items-center px-4" style={{ background: v.tabColor }}>
                      <div className="w-5 h-5 rounded-full border-[2.5px] border-white/60 bg-transparent" />
                      <div className="ml-auto flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-sm">
                        <span className="text-[0.65rem] font-bold text-white/90 uppercase tracking-wide">Ders {i + 1}</span>
                      </div>
                    </div>

                    {/* Lined paper area with video */}
                    <div className="relative" style={{
                      backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, #e8e8e8 27px, #e8e8e8 28px)`,
                      backgroundPosition: "0 12px",
                    }}>
                      <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-red-300/40 z-20 pointer-events-none" />

                      {/* Video */}
                      <div className="relative mx-4 mt-4 mb-0 rounded-lg overflow-hidden border border-slate-200/60" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                        <div className="relative aspect-video">
                          <video
                            src={v.src}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                            ref={(el) => {
                              if (el) {
                                if (isPlaying) { el.play().catch(() => {}); }
                                else { el.pause(); el.currentTime = 0; }
                              }
                            }}
                          />
                          {!isPlaying && (
                            <button
                              onClick={() => setPlayingIdx(i)}
                              className="absolute inset-0 bg-black/20 flex items-center justify-center group/play cursor-pointer transition-colors hover:bg-black/30"
                              aria-label="Videoyu oynat"
                              type="button"
                            >
                              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl transition-transform group-hover/play:scale-110">
                                <Play className="w-6 h-6 ml-0.5" style={{ color: v.accent }} />
                              </div>
                            </button>
                          )}
                          {isPlaying && (
                            <button
                              onClick={() => setPlayingIdx(null)}
                              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white/80 hover:bg-black/60 transition-colors z-10 cursor-pointer"
                              aria-label="Durdur"
                              type="button"
                            >
                              <span className="text-xs font-bold">✕</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Title & desc */}
                      <div className="px-5 pl-14 py-4 h-[96px]">
                        <h3 className="font-display text-[1rem] font-extrabold text-slate-800 mb-1.5 leading-tight line-clamp-1">
                          {v.title}
                        </h3>
                        <p className="text-[0.82rem] text-slate-400 leading-relaxed line-clamp-2">
                          {v.desc}
                        </p>
                      </div>
                    </div>

                    {/* Torn edge */}
                    <div className="h-3 w-full" style={{
                      background: `linear-gradient(135deg, white 33.33%, transparent 33.33%) -6px 0, linear-gradient(225deg, white 33.33%, transparent 33.33%) -6px 0`,
                      backgroundSize: "12px 12px",
                      backgroundColor: v.tabColor + "18",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fade overlay on bottom row */}
          <div className="relative -mt-44 h-52 z-10 pointer-events-none" style={{
            background: "linear-gradient(to bottom, transparent 0%, #E8F4FD 75%)",
          }} />

          {/* Devamını Gör button */}
          <div className="relative z-20 flex justify-center -mt-10">
            <a
              href="/iceriklerimiz"
              className="btn-3d btn-3d-brand !text-[0.85rem] group"
            >
              Tüm Video Dersleri Gör
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   LEARNING STEPS — 6 Steps
   ═══════════════════════════════════════ */
function LearningSteps() {
  const steps = [
    { num: "1", title: "Tanışma ve Değerlendirme", desc: "Alanında uzman psikologlar çocuğunuzun sosyal-duygusal gelişim ihtiyaçlarını kapsamlı değerlendirir. Yaşa ve ihtiyaca uygun gruplara yönlendirme yapılır.", icon: Target, cls: "card-3d-brand" },
    { num: "2", title: "Asenkron Öğrenme", desc: "Çocuklar, animasyonlu hikayeleştirilmiş videolar ve oyunlarla becerileri bireysel olarak öğrenir. Aileye evde uygulayabileceği etkinlik önerileri sunulur.", icon: Video, cls: "card-3d-mint" },
    { num: "3", title: "Canlı Grup Seansları", desc: "10-12 kişilik özel gruplarda yapılan canlı oturumlarda, öğrenciler öğrendikleri becerileri grup içinde aktif şekilde uygular.", icon: Users, cls: "card-3d-lavender" },
    { num: "4", title: "Uygulama ve Derinleşme", desc: "Canlı derslerde öğrencilere evde uygulayabilecekleri görevler verilir. Öğrenilen becerinin gerçek yaşamda pratiği sağlanır.", icon: PenTool, cls: "card-3d-peach" },
    { num: "5", title: "Ölçme ve Geri Bildirim", desc: "Her beceri sonunda kısa değerlendirmelerle gelişim izlenir. İlerleme kişisel gelişim portfolyosuna yansır.", icon: BarChart3, cls: "card-3d-gold" },
    { num: "6", title: "Aile Katılımı", desc: "Velilere haftalık videolar, öneriler ve kolay uygulanabilir rehber materyaller sunulur. Çocuk evde de desteklenir.", icon: Heart, cls: "card-3d-brand" },
  ];

  return (
    <Section>
      <section id="steps" className="py-24 bg-[#FFFBEB] relative overflow-hidden">
        <div className="absolute top-16 left-[10%] w-56 h-56 bg-gold-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-[5%] w-64 h-64 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-mint-100 text-mint-700 mb-4"><Layers className="w-3.5 h-3.5" /> NASIL ÇALIŞIR</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              6 Adımda <span className="highlight">Kapsamlı Müfredat</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Tanışmadan gelişim takibine kadar, her aşamada öğrencilerinize ve ailelerine bilimsel temelli destek sağlıyoruz.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <div key={i} className={`anim d${Math.min(i + 1, 6)} card-3d ${s.cls} p-7 relative`}>
                <div className="absolute top-5 right-5 font-display text-5xl font-extrabold text-slate-200/40">{s.num}</div>
                <s.icon className="w-7 h-7 mb-4 opacity-50" />
                <h3 className="font-display text-lg font-extrabold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-[0.85rem] text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   3D LEARNING MAP (Duolingo-style)
   ═══════════════════════════════════════ */
function LearningMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const progress = useScrollProgress(containerRef);

  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, []);

  const nodes = [
    { icon: BookOpen, title: "Temel Kavramlar", status: "completed", bg: "#1B3A7B", shadow: "#112755", glow: "rgba(27,58,123,0.3)", ring: "rgba(27,58,123,0.15)" },
    { icon: MessageCircle, title: "İletişim Becerileri", status: "completed", bg: "#2ECC71", shadow: "#1F8E4E", glow: "rgba(46,204,113,0.3)", ring: "rgba(46,204,113,0.15)" },
    { icon: Heart, title: "Empati Geliştirme", status: "completed", bg: "#F5C518", shadow: "#B5910B", glow: "rgba(245,197,24,0.3)", ring: "rgba(245,197,24,0.15)" },
    { icon: Users, title: "Takım Çalışması", status: "current", bg: "#4D7EC4", shadow: "#1B3A7B", glow: "rgba(77,126,196,0.3)", ring: "rgba(77,126,196,0.15)" },
    { icon: Puzzle, title: "Problem Çözme", status: "locked", bg: "#e2e8f0", shadow: "#cbd5e1", glow: "rgba(0,0,0,0.04)", ring: "rgba(0,0,0,0)" },
    { icon: Trophy, title: "Mezuniyet", status: "locked", bg: "#e2e8f0", shadow: "#cbd5e1", glow: "rgba(0,0,0,0.04)", ring: "rgba(0,0,0,0)" },
  ];

  const positions = [
    { x: 83, y: 90 }, { x: 250, y: 230 }, { x: 417, y: 90 },
    { x: 583, y: 230 }, { x: 750, y: 90 }, { x: 917, y: 230 },
  ];

  const svgPath = "M 83,90 C 150,90 183,230 250,230 C 317,230 350,90 417,90 C 484,90 516,230 583,230 C 650,230 683,90 750,90 C 817,90 850,230 917,230";
  const dashOffset = pathLength > 0 ? pathLength * (1 - Math.min(progress * 1.3, 1)) : pathLength;

  return (
    <section id="map" className="map-section py-24" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="tag bg-lavender-100 text-lavender-700 mb-4"><Rocket className="w-3.5 h-3.5" /> ÖĞRENME YOLU</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight mt-3">
            Adım adım <span className="highlight">ustalaşın</span>
          </h2>
          <p className="text-slate-400 text-[0.95rem] leading-relaxed">
            Kademeli öğrenme yoluyla sosyal becerilerde ilerleme sağlayın.
          </p>
        </div>

        {/* Desktop: SVG path map */}
        <div className="hidden md:block relative overflow-x-auto pb-4">
          <div className="relative min-w-[700px] h-[360px] mx-auto max-w-[1000px]">
            <svg viewBox="0 0 1000 320" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1B3A7B" />
                  <stop offset="50%" stopColor="#2ECC71" />
                  <stop offset="100%" stopColor="#4D7EC4" />
                </linearGradient>
              </defs>
              <path d={svgPath} className="map-path-bg" />
              <path d={svgPath} className="map-path-dash" />
              {pathLength > 0 && (
                <path ref={pathRef} d={svgPath} className="map-path-fill" strokeDasharray={pathLength} strokeDashoffset={dashOffset} />
              )}
              {pathLength === 0 && (
                <path ref={pathRef} d={svgPath} fill="none" stroke="transparent" />
              )}
            </svg>

            {nodes.map((node, i) => {
              const pos = positions[i];
              const nodeProgress = progress * 1.3;
              const threshold = i / nodes.length;
              const isVisible = nodeProgress > threshold;
              const delay = i * 120;
              return (
                <div key={i} className="absolute flex flex-col items-center" style={{ left: `${pos.x / 10}%`, top: `${pos.y / 3.2}%`, transform: "translate(-50%, -50%)" }}>
                  {node.status === "completed" && (
                    <div className="flex items-center gap-0.5 mb-1.5">
                      {[0, 1, 2].map((s) => (
                        <Star key={s} className={`w-3.5 h-3.5 fill-gold-400 text-gold-400 map-star ${isVisible ? "visible" : ""}`} style={{ transitionDelay: `${delay + 300 + s * 100}ms` }} />
                      ))}
                    </div>
                  )}
                  {node.status === "current" && (
                    <div className={`mb-1 map-star ${isVisible ? "visible" : ""}`} style={{ transitionDelay: `${delay + 300}ms` }}>
                      <Crown className="w-5 h-5 text-gold-400 fill-gold-400" />
                    </div>
                  )}
                  <div
                    className={`map-node map-node-enter ${isVisible ? "visible" : ""} ${node.status === "completed" ? "map-node-completed" : node.status === "current" ? "map-node-current" : "map-node-locked"}`}
                    style={{ background: node.bg, "--node-shadow": node.shadow, "--node-glow": node.glow, "--node-ring": node.ring, transitionDelay: `${delay}ms` } as React.CSSProperties}
                  >
                    {node.status === "locked" ? <Lock className="w-6 h-6 text-slate-400" /> : node.status === "completed" ? <CheckCircle2 className="w-7 h-7 text-white" /> : <node.icon className="w-7 h-7 text-white" />}
                  </div>
                  <p className={`mt-2 text-[0.75rem] font-bold text-center max-w-[90px] leading-tight map-node-enter ${isVisible ? "visible" : ""} ${node.status === "locked" ? "text-slate-300" : "text-slate-600"}`} style={{ transitionDelay: `${delay + 150}ms` }}>
                    {node.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden relative pl-8">
          {/* Vertical line */}
          <div className="absolute left-[22px] top-0 bottom-0 w-[3px] rounded-full bg-slate-200" />
          <div className="absolute left-[22px] top-0 w-[3px] rounded-full bg-gradient-to-b from-[#1B3A7B] via-[#2ECC71] to-[#4D7EC4] transition-all duration-700" style={{ height: `${Math.min(progress * 130, 100)}%` }} />

          <div className="space-y-6">
            {nodes.map((node, i) => {
              const nodeProgress = progress * 1.3;
              const threshold = i / nodes.length;
              const isVisible = nodeProgress > threshold;
              return (
                <div key={i} className={`relative flex items-start gap-4 transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  {/* Node circle */}
                  <div
                    className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 -ml-8"
                    style={{
                      background: node.bg,
                      boxShadow: node.status !== "locked" ? `0 0 0 4px ${node.ring}, 0 4px 12px ${node.glow}` : "0 0 0 4px rgba(0,0,0,0.04)",
                    }}
                  >
                    {node.status === "locked" ? <Lock className="w-4.5 h-4.5 text-slate-400" /> : node.status === "completed" ? <CheckCircle2 className="w-5 h-5 text-white" /> : <node.icon className="w-5 h-5 text-white" />}
                  </div>
                  {/* Content */}
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className={`font-display font-extrabold text-[0.9rem] ${node.status === "locked" ? "text-slate-300" : "text-slate-700"}`}>{node.title}</h4>
                      {node.status === "completed" && (
                        <div className="flex items-center gap-0.5">
                          {[0, 1, 2].map((s) => (
                            <Star key={s} className="w-3 h-3 fill-gold-400 text-gold-400" />
                          ))}
                        </div>
                      )}
                      {node.status === "current" && <Crown className="w-4 h-4 text-gold-400 fill-gold-400" />}
                    </div>
                    <p className={`text-[0.78rem] ${node.status === "locked" ? "text-slate-300" : "text-slate-400"}`}>
                      {node.status === "completed" ? "Tamamlandı" : node.status === "current" ? "Devam ediyor" : "Kilitli"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          {[
            { color: "bg-mint-400", label: "Tamamlandı" },
            { color: "bg-lavender-400", label: "Devam Ediyor" },
            { color: "bg-slate-200", label: "Kilitli" },
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-2 text-[0.78rem] font-semibold text-slate-400">
              <div className={`w-3 h-3 rounded-full ${l.color}`} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   PRICING — 3 Plans
   ═══════════════════════════════════════ */
function Pricing() {
  const plans = [
    {
      title: "Bireysel Kullanıcı",
      subtitle: "Aileler ve Öğrenciler İçin",
      cls: "card-3d-brand",
      features: [
        "Animasyonlarla öğrenme deneyimi",
        "100+ sosyal ve duygusal beceri müfredatı",
        "Psikolog eşliğinde 10-12 kişilik canlı grup dersleri",
        "Uluslararası geçerli dijital portfolyo",
        "Haftalık gelişim raporları ve ebeveyn içerikleri",
        "Günlük yaşama entegre eğitici oyunlar ve görevler",
      ],
      cta: "Detaylı Bilgi Al",
      popular: false,
    },
    {
      title: "Uzman Hesabı",
      subtitle: "Psikolog, Öğretmen ve PDR Uzmanları İçin",
      cls: "card-3d-mint",
      features: [
        "Sıfır hazırlık ile sosyal becerileri öğretme imkanı",
        "Her beceri için: animasyon video + oyun + etkinlik + ölçme aracı",
        "İçerik yönetimi, öğrenci gelişim takibi ve raporlama paneli",
        "500+ hazır etkinlik ve yazdırılabilir materyale erişim",
        "Birebir veya grup eğitimlerinde kullanıma uygun hazır müfredat",
      ],
      cta: "Detaylı Bilgi Al",
      popular: true,
    },
    {
      title: "Kurum Hesabı",
      subtitle: "Okullar, Kurumlar ve STK'lar İçin",
      cls: "card-3d-lavender",
      features: [
        "Seviyeye özel yapılandırılmış, 100+ beceriyi kapsayan hazır müfredat",
        "Her beceri için modüler sistem (video + oyun + etkinlik + ölçme)",
        "Kurumsal dashboard ile çoklu kullanıcı yönetimi (1000+ kullanıcı)",
        "Öğrenci beceri CV'lerini kurumsal olarak raporlama",
        "Öğretmen ve PDR uzmanları için uygulama rehberleri",
      ],
      cta: "Bizimle İletişime Geçin",
      popular: false,
    },
  ];

  return (
    <Section>
      <section id="pricing" className="py-24 bg-[#ECFBF2] relative overflow-hidden">
        <div className="absolute top-20 right-[8%] w-72 h-72 bg-mint-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[5%] w-56 h-56 bg-gold-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 dots-pattern opacity-[0.06]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-gold-100 text-gold-700 mb-4"><Crown className="w-3.5 h-3.5" /> KURSLARIMIZ</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              <span className="highlight">Planınızı</span> seçin, hemen başlayın
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Herkesin öğrenme yolculuğu farklı. Size özel sosyal-duygusal gelişim planınızı seçin.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {plans.map((p, i) => (
              <div key={i} className={`anim d${i + 1} card-3d ${p.cls} p-7 relative flex flex-col ${p.popular ? "ring-2 ring-mint-400 ring-offset-2" : ""}`}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="tag bg-mint-500 text-white font-bold">En Popüler</span>
                  </div>
                )}
                <h3 className="font-display text-xl font-extrabold text-slate-800 mb-1">{p.title}</h3>
                <p className="text-[0.82rem] text-slate-400 font-medium mb-5">{p.subtitle}</p>
                <ul className="space-y-3 mb-7 flex-1">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[0.84rem] text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-mint-500 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#cta" className={`btn-3d ${p.popular ? "btn-3d-mint" : "btn-3d-white"} w-full justify-center`}>
                  {p.cta} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   TEAM — Ekibimiz
   ═══════════════════════════════════════ */
function Team() {
  const members = [
    { name: "Dr. Melih Taha Aytep", title: "Psikiyatri / Tıp Doktoru & Kurucu", img: "/ekip/Dr.Melih Taha AYTEP.png", color: "#1B3A7B", bg: "#EBF2FB" },
    { name: "Derya Aydın", title: "Operasyon Yöneticisi", img: "/ekip/Derya AYDIN.png", color: "#2ECC71", bg: "#ECFBF2" },
    { name: "Dr. Kaan Mert Güven", title: "Tıp Doktoru & Öğrenme Deneyimi Tasarımcısı", img: "/ekip/Dr.Kaan Mert GÜVEN.png", color: "#F5C518", bg: "#FFFBEB" },
    { name: "Kübra Demirci", title: "Eğitsel İçerik & E-Öğrenme Tasarımcısı", img: "/ekip/Kübra DEMİRCİ.png", color: "#7F63CB", bg: "#F0EDF9" },
    { name: "Sayid Özcan", title: "Eğitim Teknolojileri Yöneticisi", img: "/ekip/Sayid ÖZCAN.png", color: "#EE7A45", bg: "#FEF5F0" },
    { name: "Buse Aksoy", title: "Psikolog & E-Öğrenme Tasarımcısı", img: "/ekip/Buse AKSOY.png", color: "#1B3A7B", bg: "#EBF2FB" },
  ];

  return (
    <Section>
      <section className="py-24 bg-[#ECFBF2] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute top-16 right-[10%] w-72 h-72 bg-[#2ECC71]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-[8%] w-60 h-60 bg-[#1B3A7B]/8 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-mint-100 text-mint-700 mb-4"><Users className="w-3.5 h-3.5" /> EKİBİMİZ</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Tutkulu Bir <span className="text-gradient">Ekiple</span> Çalışıyoruz
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Her biri alanında uzman, çocukların geleceğine inanan bir ekip.
            </p>
          </div>

          {/* Scrolling team cards */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #ECFBF2, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #ECFBF2, transparent)" }} />
            <div className="overflow-hidden">
              <div className="team-marquee-inner flex gap-7 w-max py-6 px-8">
                {[...members, ...members].map((m, i) => (
                  <div key={i} className="group flex-shrink-0 w-[280px] cursor-pointer team-card-wrapper">
                    <div className="relative rounded-[1.25rem] overflow-hidden bg-white transition-all duration-500 group-hover:-translate-y-4" style={{ boxShadow: `0 4px 0 ${m.color}30, 0 8px 24px rgba(0,0,0,0.06)` }}>
                      {/* Image area with colored backdrop */}
                      <div className="relative h-[320px] overflow-hidden" style={{ background: m.bg }}>
                        <img
                          src={m.img}
                          alt={m.name}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Bottom fade into white */}
                        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to top, white, transparent)" }} />

                        {/* Colored accent line at top */}
                        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: m.color }} />
                      </div>

                      {/* Info */}
                      <div className="p-5 pt-0 -mt-4 relative z-10">
                        <h3 className="font-display text-[1.35rem] font-extrabold text-slate-800 leading-tight mb-1.5">{m.name}</h3>
                        <p className="text-[0.78rem] font-bold" style={{ color: m.color }}>{m.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════ */
function Testimonials() {
  const items = [
    {
      name: "Prof.Dr. Sevgi İrtegün Kandemir",
      role: "Dicle Üniversitesi Tıp Fakültesi",
      initials: "SK",
      color: "bg-[#1B3A7B]",
      quote: "Bu program yalnızca çocuklarımıza değil, bize de çok şey öğretti. Ebeveyn kitlerini düzenli olarak uyguladıkça evde daha sakin, anlayışlı ve destekleyici bir iletişim ortamı kurduk. Tüm aile için bir dönüşüm süreci sundu.",
    },
    {
      name: "Klinik Psikolog Yılmaz Kaplan",
      role: "Munzur Üniversitesi Psikoloji Bölümü",
      initials: "YK",
      color: "bg-[#2ECC71]",
      quote: "Akademik ve çocuk gelişimi açısından bu kadar yoğun teoriyle şekillenen bir içeriği çocuklara bu kadar sade, anlaşılır ve uygulanabilir şekilde sunmak gerçekten büyük bir emek. Her kurumun altından kalkabileceği bir iş kesinlikle değil.",
    },
    {
      name: "Saliha Öztoprak",
      role: "CORENvision Kurucu",
      initials: "SÖ",
      color: "bg-[#F5C518]",
      quote: "Canlı dersler ve uzman psikologların rehberliğindeki interaktif aktiviteler, çocuğumun sosyal ve duygusal becerilerini hızla geliştirdi. Etkileşimli oyunlar öğrenmeyi eğlenceli hale getiriyor. Gelişim portfolyosu sayesinde ilerlemesini anlık takip edebiliyoruz.",
    },
    {
      name: "Ayşe Demir",
      role: "Veli - 2 Çocuk Annesi",
      initials: "AD",
      color: "bg-[#4D7EC4]",
      quote: "Çocuğumun empati ve iletişim becerilerindeki gelişimi inanılmazdı. Okul arkadaşlarıyla ilişkileri gözle görülür şekilde iyileşti. Artık duygularını çok daha sağlıklı ifade edebiliyor.",
    },
    {
      name: "Mehmet Yılmaz",
      role: "Rehber Öğretmen - Özel Okul",
      initials: "MY",
      color: "bg-[#2ECC71]",
      quote: "Sıfır hazırlıkla sosyal beceri dersi verebilmek benim için büyük kolaylık. Animasyonlu videolar ve hazır etkinlik setleri sayesinde öğrencilerim derslere aktif katılım sağlıyor. Gelişim raporları velilerle paylaşım için mükemmel.",
    },
    {
      name: "Zeynep Acar",
      role: "Çocuk Psikoloğu",
      initials: "ZA",
      color: "bg-[#1B3A7B]",
      quote: "Danışanlarıma terapi süreçleri arasında ev ödevi olarak veriyorum. Bilimsel temelli, yaşa uygun ve etkileşimli olması hem çocukların motivasyonunu artırıyor hem de terapötik süreci destekliyor.",
    },
    {
      name: "Burak Kaya",
      role: "İlkokul Müdürü",
      initials: "BK",
      color: "bg-[#F5C518]",
      quote: "Okulumuzda 300 öğrenciyle kullanıyoruz. Kurum paneli sayesinde tüm sınıfları tek ekrandan takip edebiliyoruz. Öğretmenlerimiz hazır müfredatı çok seviyor. Veli memnuniyetinde ciddi artış gördük.",
    },
    {
      name: "Elif Şahin",
      role: "Veli - Lise Öğrenci Annesi",
      initials: "EŞ",
      color: "bg-[#4D7EC4]",
      quote: "Kızım ergenlik döneminde çok zorlanıyordu. Bu programdaki stres yönetimi ve öz farkındalık modülleri sayesinde hem kendini hem de çevresini daha iyi anlamaya başladı. Sertifika sistemi de motivasyonunu artırdı.",
    },
  ];

  return (
    <Section>
      <section id="testimonials" className="py-24 bg-[#E8F4FD] relative overflow-hidden">
        <div className="absolute top-16 left-[5%] w-64 h-64 bg-brand-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[10%] w-52 h-52 bg-gold-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 dots-pattern opacity-[0.05]" />
        <div className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14 px-6">
            <div className="anim"><span className="tag bg-gold-100 text-gold-700 mb-4"><Heart className="w-3.5 h-3.5" /> REFERANSLAR</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Hakkımızda <span className="text-gradient">ne dediler?</span>
            </h2>
          </div>

          {/* Marquee with edge fade */}
          <div className="relative">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-20 pointer-events-none" style={{ background: "linear-gradient(to right, #E8F4FD, transparent)" }} />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-20 pointer-events-none" style={{ background: "linear-gradient(to left, #E8F4FD, transparent)" }} />

            <div className="marquee-track">
              <div className="marquee-inner">
                {[...items, ...items].map((t, i) => (
                  <div key={i} className="testimonial flex-shrink-0 w-[340px] sm:w-[380px]">
                    <div className="flex items-center gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-[#F5C518] text-[#F5C518]" />
                      ))}
                    </div>
                    <p className="text-[0.86rem] text-slate-500 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                      <div className={`avatar ${t.color}`}>{t.initials}</div>
                      <div>
                        <p className="font-display font-extrabold text-[0.82rem] text-slate-700">{t.name}</p>
                        <p className="text-[0.72rem] text-slate-400 font-medium">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   FAQ — Interactive Accordion
   ═══════════════════════════════════════ */
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = [
    {
      q: "Sosyal ve duygusal beceri müfredatınız gerçekten işe yarıyor mu?",
      a: "Bu soruya kocaman bir evet diyoruz. Tasarladığımız müfredat, 20 yılı aşkın bilimsel araştırmalara ve sosyal-duygusal öğrenme alanındaki uluslararası standartlara dayanıyor. Her beceri; yaş grubuna özel olarak hazırlanmış animasyon videolar, etkileşimli beceri oyunları ve uygulamalı etkinliklerle destekleniyor. Program; empati, öz düzenleme, iletişim, stres yönetimi gibi 100'den fazla sosyal ve duygusal beceriyi sistemli biçimde kazandırmak üzere kurgulandı.",
    },
    {
      q: "Bu program çocuğumun akademik başarısına da katkı sağlar mı?",
      a: "Kesinlikle katkı sağlar. Araştırmalar gösteriyor ki duygularını tanıyan, stresle başa çıkabilen, odaklanma ve öz düzenleme becerisi gelişmiş çocuklar, akademik alanda çok daha başarılı oluyor. Biz önce çocuğun duygusal ve sosyal temellerini güçlendiriyor, ardından bu gücü akademik başarıya ve yaşam becerilerine dönüştürüyoruz.",
    },
    {
      q: "Ders gibi mi yoksa oyun gibi mi?",
      a: "İkisi birden! Öğrenme süreci, hikayeleştirilmiş animasyon videolarla başlıyor, ardından oyunlarla pekiştiriliyor. Çocuklar hem eğleniyor hem de öğrendiklerini kalıcı şekilde içselleştiriyor. Müfredatımız kapsamında çocuklar, ruh sağlığı alanında çalışan uzman eğitmenlerle canlı sosyal beceri grup derslerine katılıyor; grup çalışmalarıyla becerilerini gerçek hayatta uygulama fırsatı buluyor.",
    },
    {
      q: "Evde destekleyici bir ortam oluşturmam gerekiyor mu?",
      a: "Ebeveynler olarak uzun uzun ders anlatmanıza ya da etkinlik hazırlamanıza gerek yok. Çocuğunuzun müfredatımız aracılığıyla öğrendiği sosyal ve duygusal becerileri evde nasıl destekleyebileceğinizi, size özel hazırlanmış basit öneriler ve yazdırılabilir materyallerle sunuyoruz. Aile-çocuk iş birliğini kolaylaştıran, yaşam becerilerini geliştiren zahmetsiz ama etkili bir dijital müfredat sizi bekliyor.",
    },
    {
      q: "Kazanılan beceriler sertifikalandırılıyor mu?",
      a: "Evet, öğrencilerin sosyal-duygusal beceri kazanımları sistemli şekilde takip edilip sertifikalandırılır. Her öğrenci için dijital olarak oluşturulan Gelişim Portfolyosu, tüm süreci görünür ve takip edilebilir hale getirir. Her beceri sonunda gelişim karnesi ve program bitiminde resmi bir başarı sertifikası sunulur. Bu portfolyo, hem yurt içi hem de yurt dışı okul ve program başvurularında çocuğun gelişimini belgeleyen interaktif bir CV niteliği taşır.",
    },
    {
      q: "Müfredatınız hangi aşamalardan oluşuyor?",
      a: "Müfredatımız 6 aşamadan oluşuyor: (1) Tanışma ve Profesyonel Değerlendirme, (2) Asenkron Öğrenme ile kendi hızında başlangıç, (3) 10-12 kişilik canlı grup seansları, (4) Uygulama ve derinleşme görevleri, (5) Ölçme-değerlendirme ve geri bildirim, (6) Aile katılımı ve destekleyici ev ortamı. Tüm süreç boyunca aileler sisteme anlık erişebilir ve çocuğun gelişimini takip edebilir.",
    },
  ];

  return (
    <Section>
      <section id="faq" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-10 left-[8%] w-60 h-60 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[10%] w-52 h-52 bg-gold-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="anim"><span className="tag bg-peach-100 text-peach-700 mb-4"><MessageCircle className="w-3.5 h-3.5" /> SSS</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Sıkça Sorulan <span className="highlight">Sorular</span>
            </h2>
          </div>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className={`anim d${Math.min(i + 1, 6)}`}>
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className={`w-full text-left card-3d card-3d-white p-5 flex items-start justify-between gap-4 transition-all duration-200 ${openIdx === i ? "!border-brand-200 !bg-brand-50/30" : ""}`}
                >
                  <span className="font-display font-bold text-[0.92rem] text-slate-700 leading-snug">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5 transition-transform duration-300 ${openIdx === i ? "rotate-180 text-brand-500" : ""}`} />
                </button>
                <div
                  className="overflow-hidden transition-all duration-500 ease-out"
                  style={{ maxHeight: openIdx === i ? "500px" : "0px", opacity: openIdx === i ? 1 : 0 }}
                >
                  <div className="px-5 pb-5 pt-2">
                    <p className="text-[0.86rem] text-slate-500 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   IMPACT BANNER
   ═══════════════════════════════════════ */
function ImpactBanner() {
  return (
    <Section>
      <section className="py-20 bg-[#FFFBEB] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.12]" />
        <div className="absolute top-16 right-[8%] w-60 h-60 bg-gold-200/35 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[12%] w-52 h-52 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h2 className="anim font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 mb-3 tracking-tight">
            Çocuğunuzun sosyal ve duygusal becerilerde <span className="highlight">zorlandığını</span> fark ediyor musunuz?
          </h2>
          <p className="anim d1 text-slate-500 text-[0.95rem] leading-relaxed max-w-2xl mx-auto mb-7">
            Uzman ekibimizle, çocuğunuzun duygusal zeka, iletişim, stres yönetimi, özgüven ve liderlik gibi becerilerini geliştiriyoruz. Çocuğunuzun gelişimi için ilk adımı bugün atın!
          </p>
          <a href="#cta" className="anim d2 btn-3d btn-3d-brand">Ücretsiz Web Seminerine Kaydolun <ArrowRight className="w-5 h-5" /></a>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   MANIFESTO — Neden Biz?
   ═══════════════════════════════════════ */
function Manifesto() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      icon: Heart, label: "Neden Önemli?", color: "#1B3A7B", bg: "#EBF2FB", accent: "#4D7EC4",
      content: (
        <>
          <p className="text-[1.05rem] text-slate-700 leading-[1.9] font-medium mb-5">
            Her anne baba gibi biz de çocuklarımızın iyi okullarda okuyup yüksek notlar almasını isteriz.
            Ama bir noktada fark ederiz: <strong className="text-slate-900">Hayat sadece sınavlardan ibaret değildir.</strong>
          </p>
          <p className="text-[1.05rem] text-slate-700 leading-[1.9] font-medium mb-5">
            Zor bir duygu yaşadıklarında, kendilerini yalnız hissettiklerinde ya da bir krizle karşılaştıklarında,
            çocuklarımızın karşısına çıkan şey bir test değil &mdash; <strong className="text-slate-900">hayatın ta kendisidir.</strong>
          </p>
          <p className="text-[1.05rem] text-slate-700 leading-[1.9] font-medium">
            O anlarda onları ayakta tutacak şey; sadece bilgi değil,
            <strong className="text-[#1B3A7B]"> özgüven, empati, farkındalık ve duygusal dayanıklılık</strong> olacaktır.
          </p>
        </>
      ),
    },
    {
      icon: TrendingUp, label: "Mevcut Durum", color: "#F5C518", bg: "#FFFBEB", accent: "#FFDF66",
      content: (
        <>
          <p className="text-[1.05rem] text-slate-700 leading-[1.9] font-medium mb-5">
            Bugün Türkiye&apos;de bu becerilere dair hâlâ sistemli, uygulanabilir ve sürdürülebilir bir eğitim modeli yok.
            Duygusal gelişim, ne yazık ki birçok okulda hâlâ &quot;ekstra&quot; bir konu olarak görülüyor.
          </p>
          <div className="bg-[#FFFBEB] border-2 border-[#FFEA99] rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-3 left-5 text-[3rem] leading-none font-display font-extrabold text-[#F5C518]/25">&ldquo;</div>
            <p className="relative z-10 text-[1.08rem] text-slate-800 leading-[1.85] font-semibold text-center">
              Geleceğin başarılı insanı, sadece akademik olarak donanımlı değil; aynı zamanda
              <span className="text-[#1B3A7B]"> duygusal olarak güçlü</span>, iletişim becerileri yüksek ve zor zamanlarda
              <span className="text-[#2ECC71]"> dirençli</span> birey olacaktır.
            </p>
          </div>
        </>
      ),
    },
    {
      icon: Sparkles, label: "Çözümümüz", color: "#2ECC71", bg: "#ECFBF2", accent: "#69DC9A",
      content: (
        <>
          <p className="text-[1.05rem] text-slate-700 leading-[1.9] font-medium mb-5">
            <strong className="text-[#1B3A7B]">Ve biz diyoruz ki:</strong> Bu beceriler her çocuğun ve gencin hakkıdır.
            LearnecoHub olarak, bu eksik halkayı tamamlayan bütünsel bir öğrenme müfredatı sunuyoruz.
          </p>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {[
              "Sosyal-duygusal becerilere dayalı sadeleştirilmiş müfredat",
              "Okullara özel içerik ve öğretmen destek sistemi",
              "Uzman tutorlar eşliğinde bireysel ve grup uygulamaları",
              "Ölçme-değerlendirme ve gelişim takibi",
              "Ailelere özel rehberlik ve ev destek araçları",
            ].map((item, j) => (
              <div key={j} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#ECFBF2] border border-[#A3EBC1]/40 manifesto-check-item" style={{ animationDelay: `${j * 0.1}s` }}>
                <CircleCheck className="w-4.5 h-4.5 text-[#2ECC71] flex-shrink-0 mt-0.5" />
                <span className="text-[0.85rem] text-slate-700 font-medium leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      icon: Rocket, label: "Vizyonumuz", color: "#7F63CB", bg: "#F0EDF9", accent: "#9F8AD8",
      content: (
        <>
          <p className="text-[1.05rem] text-slate-700 leading-[1.9] font-medium mb-6">
            Çocukların hem okulda hem evde ulaşabileceği, bilimsel temelli ve kolay uygulanabilir bir
            sosyal-duygusal öğrenme müfredatı oluşturduk.
          </p>
          <div className="text-center space-y-5 py-4">
            <p className="text-[1rem] text-slate-500 leading-relaxed max-w-xl mx-auto">
              <strong className="text-slate-700">Amacımız:</strong> Çocuklara yalnızca bilgi değil, yaşamı taşıyacak beceriler kazandırmak.
            </p>
            <div className="w-12 h-[3px] bg-[#F5C518] rounded-full mx-auto" />
            <p className="text-[1.2rem] sm:text-[1.35rem] font-extrabold text-[#1B3A7B] leading-snug">
              Bugünün çocukları sınavlara hazırlanıyor&hellip;<br />
              <span className="text-[#2ECC71]">Ama biz onları hayata hazırlıyoruz.</span>
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <Section>
      <section className="pt-32 sm:pt-36 pb-24 sm:pb-28 bg-[#D0DFEF] relative overflow-visible">
        {/* Cloud strip — sits on the border, half above half below, infinite loop */}
        <div className="absolute -top-10 sm:-top-14 left-0 right-0 z-30 overflow-hidden pointer-events-none h-20 sm:h-28">
          <div className="cloud-scroll-wrap flex">
            {/* First set */}
            <div className="flex flex-shrink-0">
              {Array.from({ length: 30 }).map((_, i) => (
                <img key={`a${i}`} src="/bulut.png" alt="" className="h-20 sm:h-28 w-auto flex-shrink-0" draggable={false} />
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex flex-shrink-0">
              {Array.from({ length: 30 }).map((_, i) => (
                <img key={`b${i}`} src="/bulut.png" alt="" className="h-20 sm:h-28 w-auto flex-shrink-0" draggable={false} />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute top-20 left-[8%] w-80 h-80 bg-[#4D7EC4]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[5%] w-72 h-72 bg-[#1B3A7B]/10 rounded-full blur-3xl" />
        <div className="absolute top-[40%] right-[30%] w-56 h-56 bg-[#2ECC71]/8 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="anim"><span className="tag bg-brand-100 text-brand-700 mb-4"><Heart className="w-3.5 h-3.5" /> MİSYONUMUZ</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 tracking-tight leading-[1.12]">
              Bütünsel bir müfredatla, çocuğunuzu<br />
              <span className="text-gradient">yaşam becerileriyle</span> güçlendiriyoruz.
            </h2>
          </div>

          {/* Tabs */}
          <div className="anim d2">
            {/* Tab buttons */}
            <div className="flex justify-start sm:justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 scrollbar-hide">
              {tabs.map((t, i) => {
                const active = activeTab === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className="manifesto-tab flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl font-display font-bold text-[0.75rem] sm:text-[0.88rem] transition-all duration-400 border-2 flex-shrink-0 whitespace-nowrap"
                    style={{
                      background: active ? t.color : "white",
                      color: active ? "#fff" : "#64748B",
                      borderColor: active ? t.color : "#E2E8F0",
                      boxShadow: active ? `0 4px 0 ${t.accent}55, 0 8px 20px ${t.color}20` : "0 2px 0 #E2E8F0",
                      transform: active ? "translateY(-2px)" : "translateY(0)",
                    }}
                  >
                    <t.icon className="w-4 h-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Tab content panel */}
            <div className="relative">
              {/* Progress indicator */}
              <div className="flex gap-1.5 mb-5 justify-center">
                {tabs.map((t, i) => (
                  <button key={i} onClick={() => setActiveTab(i)} className="h-1.5 rounded-full transition-all duration-500" style={{
                    width: activeTab === i ? "40px" : "12px",
                    background: activeTab === i ? t.color : "#E2E8F0",
                  }} />
                ))}
              </div>

              {/* Content card */}
              <div
                className="manifesto-panel rounded-2xl border-2 p-7 sm:p-10 transition-all duration-500 relative overflow-hidden"
                style={{
                  background: tabs[activeTab].bg,
                  borderColor: tabs[activeTab].accent + "40",
                  borderBottomWidth: "5px",
                  borderBottomColor: tabs[activeTab].color,
                }}
              >
                {/* Decorative corner number */}
                <div className="absolute top-4 right-5 font-display font-extrabold text-[3.5rem] leading-none select-none" style={{ color: tabs[activeTab].color + "10" }}>
                  0{activeTab + 1}
                </div>

                <div key={activeTab} className="manifesto-content relative z-10">
                  {tabs[activeTab].content}
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="flex items-center justify-between mt-5">
                <button
                  onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                  disabled={activeTab === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[0.82rem] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 text-slate-500"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" /> Önceki
                </button>
                <span className="text-[0.75rem] font-bold text-slate-400">{activeTab + 1} / {tabs.length}</span>
                <button
                  onClick={() => setActiveTab(Math.min(tabs.length - 1, activeTab + 1))}
                  disabled={activeTab === tabs.length - 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[0.82rem] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 text-slate-500"
                >
                  Sonraki <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════ */
function FinalCTA() {
  return (
    <Section>
      <section id="cta" className="py-24 bg-[#E8F4FD] relative overflow-hidden">
        <div className="absolute top-10 right-[15%] w-56 h-56 bg-brand-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[10%] w-48 h-48 bg-gold-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 dots-pattern opacity-[0.05]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="anim-scale bg-[#1B3A7B] rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 dots-pattern opacity-[0.04]" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-mint-500/8 rounded-full blur-3xl" />
            <div className="relative z-10 p-10 sm:p-14 text-center">
              <div className="flex items-center justify-center mx-auto mb-6">
                <img src="https://learnecohub.com/wp-content/uploads/2025/03/logo-3-e1749328376385.png" alt="LearnecoHub" className="h-8 w-auto brightness-0 invert" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                Size nasıl <span className="text-[#F5C518]">yardımcı</span> olabiliriz?
              </h2>
              <p className="text-slate-400 text-[0.95rem] leading-relaxed max-w-xl mx-auto mb-9">
                Akademik başarıyı artıran, sosyal-duygusal becerileri güçlendiren bilimsel yöntemlerimizi keşfedin. Çocuğunuzu en iyi nasıl destekleyebileceğinizi öğrenin.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-7">
                <a href="/contact/" className="btn-3d btn-3d-mint text-base">Hemen Başla <ArrowRight className="w-5 h-5" /></a>
                <a href="tel:08503023600" className="btn-3d btn-3d-gold text-base">
                  <Phone className="w-4 h-4" /> 0850 302 36 00
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-5 text-[0.78rem] text-white/40">
                {["Ücretsiz başlangıç", "Kredi kartı gerekmiyor", "Anında erişim"].map((t, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2ECC71]" />{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white/50 pt-16 pb-8 relative footer-glow">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2.5 mb-4">
              <img src="https://learnecohub.com/wp-content/uploads/2025/03/logo-3-e1749328376385.png" alt="LearnecoHub" className="h-9 w-auto" />
            </a>
            <p className="text-[0.82rem] leading-relaxed max-w-xs mb-5">
              Çocuklar ve gençler için sosyal becerileri öğrenmenin en kolay yolu. Hazırlık gerekmeden hemen kullanabileceğiniz dijital müfredat.
            </p>
            <div className="flex items-center gap-2.5">
              {[
                { icon: Facebook, label: "Fb", href: "https://facebook.com" },
                { icon: Instagram, label: "Ig", href: "https://instagram.com" },
                { icon: Youtube, label: "Yt", href: "https://youtube.com" },
                { icon: Linkedin, label: "Li", href: "https://linkedin.com" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/30 hover:bg-[#F5C518]/15 hover:text-[#F5C518] hover:border-[#F5C518]/30 transition-all">
                  <s.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-display font-bold text-[0.82rem] text-white mb-4 tracking-wide">Site Menü</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Ana Sayfa", href: "/" },
                { label: "Hikayemiz", href: "/hikayemiz" },
                { label: "Kurslarımız", href: "/kurslarimiz" },
                { label: "İçeriklerimiz", href: "/iceriklerimiz" },
                { label: "İş Birlikleri", href: "/is-birlikleri" },
                { label: "Blog", href: "/blog" },
                { label: "İletişim", href: "/contact" },
              ].map((l, j) => (
                <li key={j}><a href={l.href} className="text-[0.8rem] hover:text-[#F5C518] transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-display font-bold text-[0.82rem] text-white mb-4 tracking-wide">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Müfredat", href: "/iceriklerimiz" },
                { label: "Video Dersler", href: "/iceriklerimiz" },
                { label: "Kurslarımız", href: "/kurslarimiz" },
                { label: "Blog", href: "/blog" },
                { label: "İş Birlikleri", href: "/is-birlikleri" },
              ].map((l, j) => (
                <li key={j}><a href={l.href} className="text-[0.8rem] hover:text-[#F5C518] transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-[0.82rem] text-white mb-4 tracking-wide">Learneco Eğitim ve Danışmanlık</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" />
                <span className="text-[0.8rem]">İstanbul, Başakşehir</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" />
                <a href="tel:08503023600" className="text-[0.8rem] hover:text-[#F5C518] transition-colors">0850 302 36 00</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" />
                <a href="mailto:merhabay@learnecohub.co" className="text-[0.8rem] hover:text-[#F5C518] transition-colors">merhabay@learnecohub.co</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" />
                <span className="text-[0.8rem]">Pazartesi - Pazar / 09.00 - 21.00</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/8 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[0.72rem] text-white/25">&copy; 2025 LearnecoHub. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-5 text-[0.72rem] text-white/25">
            <a href="#" className="hover:text-white/50 transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-white/50 transition-colors">Kullanım Şartları</a>
            <a href="#" className="hover:text-white/50 transition-colors">KVKK</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   PAGE
   ═══════════════════════════════════════ */
export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <YoutubeShowcase />
      <Materials />
      <FreeBanner />
      <VideoShowcase />
      <LearningSteps />
      <LearningMap />
      <Pricing />
      <Manifesto />
      <Team />
      <ImpactBanner />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
