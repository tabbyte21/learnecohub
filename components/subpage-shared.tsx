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
export function useAnim() {
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

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useAnim();
  return <div ref={ref} className={className}>{children}</div>;
}

/* ─── Animated Counter ─── */
export function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
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
   SUBPAGE NAVBAR
   ═══════════════════════════════════════ */
/* Dropdown menu item for navbar */
function NavDropdown({ label, href, active, sub, variant = "light" }: {
  label: string; href: string; active: string;
  sub: { label: string; href: string; icon: React.ElementType; desc: string }[];
  variant?: "light" | "dark";
}) {
  const isActive = label === active || sub.some((s) => s.label === active);
  const light = variant === "light";
  return (
    <div className="relative group/dd">
      <a
        href={href}
        className={`px-4 py-2 text-[0.85rem] font-semibold rounded-xl transition-all flex items-center gap-1 ${
          light
            ? isActive ? "text-brand-600 bg-brand-50" : "text-slate-500 hover:text-brand-600 hover:bg-brand-50"
            : isActive ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/8"
        }`}
      >
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

export function SubpageNavbar({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const plainLinks = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "İletişim", href: "/contact" },
  ];
  const mobileLinks = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hikayemiz", href: "/hikayemiz" },
    { label: "\u0130\u015F Birlikleri", href: "/is-birlikleri" },
    { label: "Ba\u015Far\u0131lar", href: "/basarilar" },
    { label: "Kurslar\u0131m\u0131z", href: "/kurslarimiz" },
    { label: "\u00D6\u011Frenciler \u0130\u00E7in", href: "/ogrenciler-icin" },
    { label: "\u00D6\u011Fretmenler \u0130\u00E7in", href: "/ogretmenler-icin" },
    { label: "Kurumlar \u0130\u00E7in", href: "/kurumlar-icin" },
    { label: "Aileler \u0130\u00E7in", href: "/aileler-icin" },
    { label: "Ar\u015Fiv", href: "/arsiv" },
    { label: "SSS", href: "/sss" },
    { label: "Blog", href: "/blog" },
    { label: "\u0130leti\u015Fim", href: "/contact" },
  ];
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "nav-scrolled py-3" : "bg-white/90 backdrop-blur-xl border-b border-slate-200 py-3"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <img src="https://learnecohub.com/wp-content/uploads/2025/03/logo-3-e1749328376385.png" alt="LearnecoHub" className="h-10 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-1">
          <a href="/" className={`px-4 py-2 text-[0.85rem] font-semibold rounded-xl transition-all ${active === "Ana Sayfa" ? "text-brand-600 bg-brand-50" : "text-slate-500 hover:text-brand-600 hover:bg-brand-50"}`}>Ana Sayfa</a>
          <NavDropdown label="Hikayemiz" href="/hikayemiz" active={active} sub={[
            { label: "\u0130\u015F Birlikleri", href: "/is-birlikleri", icon: Users, desc: "Kurumsal ortakl\u0131klar" },
            { label: "Ba\u015Far\u0131lar", href: "/basarilar", icon: Trophy, desc: "Rozet ve ba\u015Far\u0131 sistemi" },
            { label: "Ar\u015Fiv", href: "/arsiv", icon: Layers, desc: "Kaynak k\u00FCt\u00FCphanesi" },
          ]} />
          <NavDropdown label="Hizmetlerimiz" href="/iceriklerimiz" active={active} sub={[
            { label: "Kurslar\u0131m\u0131z", href: "/kurslarimiz", icon: GraduationCap, desc: "Canl\u0131 grup dersleri" },
            { label: "\u00D6\u011Frenciler \u0130\u00E7in", href: "/ogrenciler-icin", icon: Sparkles, desc: "E\u011Flenceli \u00F6\u011Frenme deneyimi" },
            { label: "\u00D6\u011Fretmenler \u0130\u00E7in", href: "/ogretmenler-icin", icon: BookOpen, desc: "Haz\u0131r m\u00FCfredat ve ara\u00E7lar" },
            { label: "Kurumlar \u0130\u00E7in", href: "/kurumlar-icin", icon: Globe, desc: "Kurumsal \u00E7\u00F6z\u00FCmler" },
            { label: "Aileler \u0130\u00E7in", href: "/aileler-icin", icon: Heart, desc: "Aile rehberli\u011Fi" },
          ]} />
          <a href="/blog" className={`px-4 py-2 text-[0.85rem] font-semibold rounded-xl transition-all ${active === "Blog" ? "text-brand-600 bg-brand-50" : "text-slate-500 hover:text-brand-600 hover:bg-brand-50"}`}>Blog</a>
          <a href="/contact" className={`px-4 py-2 text-[0.85rem] font-semibold rounded-xl transition-all ${active === "İletişim" ? "text-brand-600 bg-brand-50" : "text-slate-500 hover:text-brand-600 hover:bg-brand-50"}`}>İletişim</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="https://lms.learnecohub.com" className="text-[0.85rem] font-bold text-slate-600 hover:text-brand-600 transition-colors px-4 py-2">Giriş Yap</a>
          <a href="/contact" className="btn-3d btn-3d-brand !py-2.5 !px-5 !text-[0.85rem]">Hemen Başla</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden absolute top-full inset-x-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 p-6 shadow-lg">
          <div className="flex flex-col gap-1">
            {mobileLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className={`px-4 py-3 text-sm font-semibold rounded-xl transition-all ${l.label === active ? "text-brand-600 bg-brand-50" : "text-slate-600 hover:bg-brand-50"}`}>{l.label}</a>
            ))}
            <div className="border-t border-slate-100 pt-4 mt-2 flex flex-col gap-2">
              <a href="https://lms.learnecohub.com" className="px-4 py-3 text-sm font-bold text-slate-600">Giriş Yap</a>
              <a href="/contact" className="btn-3d btn-3d-brand justify-center">Hemen Başla</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════
   SUBPAGE HERO — Colorful themes
   ═══════════════════════════════════════ */
type HeroTheme = "brand" | "mint" | "lavender" | "gold" | "peach";

const heroThemes: Record<HeroTheme, {
  bg: string;
  orb1: string; orb2: string; orb3: string;
  highlight: string;
  dark: boolean;
}> = {
  brand:    { bg: "#1B3A7B", orb1: "#4D7EC4", orb2: "#2ECC71", orb3: "#F5C518", highlight: "#F5C518", dark: true },
  mint:     { bg: "#16794A", orb1: "#2ECC71", orb2: "#F5C518", orb3: "#1B3A7B", highlight: "#F5C518", dark: true },
  lavender: { bg: "#5B41A8", orb1: "#9F8AD8", orb2: "#EE7A45", orb3: "#F5C518", highlight: "#F5C518", dark: true },
  gold:     { bg: "#F5C518", orb1: "#FFDF66", orb2: "#EE7A45", orb3: "#1B3A7B", highlight: "#1B3A7B", dark: false },
  peach:    { bg: "#D4602C", orb1: "#F49668", orb2: "#F5C518", orb3: "#7F63CB", highlight: "#F5C518", dark: true },
};

export function SubpageHero({
  breadcrumb,
  tag,
  tagIcon: TagIcon,
  title,
  titleHighlight,
  description,
  children,
  theme = "brand",
}: {
  breadcrumb: string;
  tag: string;
  tagIcon: React.ElementType;
  title: string;
  titleHighlight: string;
  description: string;
  children?: ReactNode;
  theme?: HeroTheme;
}) {
  const t = heroThemes[theme];
  const d = t.dark;

  return (
    <section className="relative pt-24 pb-0 overflow-hidden" style={{ background: t.bg }}>
      {/* Texture */}
      <div className="absolute inset-0 dots-pattern" style={{ opacity: d ? 0.06 : 0.08 }} />

      {/* Orbs */}
      <div className="absolute top-[-20%] right-[5%] w-[450px] h-[450px] rounded-full blur-[120px]" style={{ background: t.orb1, opacity: d ? 0.3 : 0.2 }} />
      <div className="absolute bottom-[-30%] left-[-5%] w-[380px] h-[380px] rounded-full blur-[100px]" style={{ background: t.orb2, opacity: d ? 0.15 : 0.12 }} />
      <div className="absolute top-[40%] left-[50%] w-[280px] h-[280px] rounded-full blur-[90px]" style={{ background: t.orb3, opacity: 0.1 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-14">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[0.78rem] font-semibold mb-8" style={{ color: d ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)" }}>
          <a href="/" className="transition-colors hover:opacity-80">Ana Sayfa</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: d ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)" }}>{breadcrumb}</span>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            {/* Tag badge */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold uppercase tracking-wide"
                style={{
                  background: d ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
                  color: d ? "#fff" : "#1A1A2E",
                  backdropFilter: "blur(8px)",
                }}
              >
                <TagIcon className="w-3.5 h-3.5" /> {tag}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-display text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold leading-[1.08] tracking-tight mb-4"
              style={{ color: d ? "#fff" : "#1A1A2E" }}
            >
              {title}{" "}
              <span style={{ color: t.highlight }}>{titleHighlight}</span>
            </h1>

            {/* Description */}
            <p
              className="text-[0.95rem] leading-relaxed max-w-lg mb-6"
              style={{ color: d ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}
            >
              {description}
            </p>
          </div>

          {children}
        </div>
      </div>

      {/* Bottom fade line */}
      <div className="h-px" style={{
        background: d
          ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.15) 80%, transparent)"
          : "linear-gradient(90deg, transparent, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.08) 80%, transparent)",
      }} />
    </section>
  );
}

/* ═══════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════ */
export function FinalCTA() {
  return (
    <Section>
      <section className="py-24 bg-[#E8F4FD] relative overflow-hidden">
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
                <a href="/contact" className="btn-3d btn-3d-mint text-base">Hemen Başla <ArrowRight className="w-5 h-5" /></a>
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
export function SubpageFooter() {
  return (
    <footer className="bg-[#1A1A2E] text-white/50 pt-16 pb-8 relative footer-glow">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
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
          <div>
            <h4 className="font-display font-bold text-[0.82rem] text-white mb-4 tracking-wide">Site Menü</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Ana Sayfa", href: "/" },
                { label: "Hikayemiz", href: "/hikayemiz" },
                { label: "Kurslar\u0131m\u0131z", href: "/kurslarimiz" },
                { label: "\u0130\u015F Birlikleri", href: "/is-birlikleri" },
                { label: "Ba\u015Far\u0131lar", href: "/basarilar" },
                { label: "Ar\u015Fiv", href: "/arsiv" },
                { label: "SSS", href: "/sss" },
                { label: "Blog", href: "/blog" },
                { label: "\u0130leti\u015Fim", href: "/contact" },
              ].map((l, j) => (
                <li key={j}><a href={l.href} className="text-[0.8rem] hover:text-[#F5C518] transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-[0.82rem] text-white mb-4 tracking-wide">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { label: "\u00D6\u011Frenciler \u0130\u00E7in", href: "/ogrenciler-icin" },
                { label: "\u00D6\u011Fretmenler \u0130\u00E7in", href: "/ogretmenler-icin" },
                { label: "Kurumlar \u0130\u00E7in", href: "/kurumlar-icin" },
                { label: "Aileler \u0130\u00E7in", href: "/aileler-icin" },
                { label: "\u0130\u015F Birlikleri", href: "/is-birlikleri" },
              ].map((l, j) => (
                <li key={j}><a href={l.href} className="text-[0.8rem] hover:text-[#F5C518] transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
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
                <a href="mailto:info@learnecohub.com" className="text-[0.8rem] hover:text-[#F5C518] transition-colors">info@learnecohub.com</a>
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
