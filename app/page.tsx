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
    hasAnimated.current = false;
    setCount(0);
    const el = ref.current;
    if (!el || !target) return;
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
   ICON RESOLVER (for dynamic menu)
   ═══════════════════════════════════════ */
const homeIconMap: Record<string, React.ElementType> = {
  BookOpen, Users, Play, GraduationCap, BarChart3, Globe, Heart,
  ArrowRight, CheckCircle2, Sparkles, ChevronRight, ChevronDown, Star, Menu, X,
  Zap, Target, TrendingUp, Award, Clock, Download, MessageCircle,
  Layers, Monitor, Headphones, PenTool, FileText, Video, Gamepad2,
  Puzzle, Trophy, Flame, Shield, CircleCheck, Lock, Crown, Rocket,
  Phone, Mail, MapPin,
};
function homeResolveIcon(name?: string | null): React.ElementType {
  if (!name) return Sparkles;
  return homeIconMap[name] || Sparkles;
}

/* ═══════════════════════════════════════
   NAVBAR (dynamic from /api/menu)
   ═══════════════════════════════════════ */
const hakkimizdaRewrites: Record<string, string> = {
  "/misyonumuz": "/hakkimizda#misyonumuz",
  "/akademik-yaklasimimiz": "/hakkimizda#akademik-yaklasimimiz",
  "/ilkelerimiz": "/hakkimizda#ilkelerimiz",
  "/neden-learnecohub": "/hakkimizda#neden-learnecohub",
  "/ekibimiz": "/hakkimizda#ekibimiz",
  "/basari-hikayeleri": "/hakkimizda#basari-hikayeleri",
};
function rewriteMenuUrl(url: string | null | undefined): string {
  if (!url) return "#";
  return hakkimizdaRewrites[url] || url;
}
function rewriteParentUrl(item: any): string {
  if (item.label === "Hakkımızda") return "/hakkimizda";
  return item.url || "#";
}

function useMenuData() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  useEffect(() => {
    fetch(`/api/menu?t=${Date.now()}`)
      .then((r) => r.ok ? r.json() : [])
      .then((data) => { if (Array.isArray(data)) setMenuItems(data); })
      .catch(() => {});
  }, []);
  return menuItems;
}

/* Dropdown for main page navbar (light variant) */
function MainNavDropdown({ label, href, sub }: {
  label: string;
  href: string;
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

function Navbar({ menuItems }: { menuItems: any[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = menuItems.filter((m: any) => !m.isButton);
  const buttons = menuItems.filter((m: any) => m.isButton);

  // Mobil menü: tüm öğeleri düz liste olarak göster
  const mobileLinks: { label: string; href: string }[] = [];
  navLinks.forEach((item: any) => {
    if (item.url) mobileLinks.push({ label: item.label, href: rewriteMenuUrl(item.url) });
    if (item.children?.length) {
      item.children.forEach((child: any) => {
        if (child.url) mobileLinks.push({ label: child.label, href: rewriteMenuUrl(child.url) });
      });
    }
  });

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "nav-scrolled py-3 opacity-100 translate-y-0" : "bg-transparent py-5 opacity-0 -translate-y-4 pointer-events-none"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <img src="/logo.png" alt="LearnecoHub" className="h-10 w-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }} />
          <span className="hidden font-display font-extrabold text-xl text-brand-600">Learneco<span className="text-lavender-500">Hub</span></span>
        </a>
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((item: any) =>
            item.children?.length ? (
              <MainNavDropdown key={item.id} label={item.label} href={rewriteParentUrl(item)} sub={item.children.map((c: any) => ({
                label: c.label, href: rewriteMenuUrl(c.url || "#"), icon: homeResolveIcon(c.icon), desc: c.description || "",
              }))} />
            ) : (
              <a key={item.id} href={item.url || "#"} className="px-4 py-2 text-[0.85rem] font-semibold text-slate-500 hover:text-brand-600 rounded-xl hover:bg-brand-50 transition-all">{item.label}</a>
            )
          )}
        </div>
        <div className="hidden lg:flex items-center gap-3">
          {buttons.map((btn: any) =>
            btn.buttonStyle === "outline" ? (
              <a key={btn.id} href={btn.url || "#"} target={btn.openInNew ? "_blank" : undefined} rel={btn.openInNew ? "noopener noreferrer" : undefined} className="text-[0.85rem] font-bold text-slate-600 hover:text-brand-600 transition-colors px-4 py-2 rounded-xl border border-slate-200 hover:border-brand-200">{btn.label}</a>
            ) : (
              <a key={btn.id} href={btn.url || "#"} target={btn.openInNew ? "_blank" : undefined} rel={btn.openInNew ? "noopener noreferrer" : undefined} className="btn-3d btn-3d-brand !py-2.5 !px-5 !text-[0.85rem]">{btn.label}</a>
            )
          )}
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden absolute top-full inset-x-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 p-6 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {mobileLinks.map((l, i) => (
              <a key={i} href={l.href} onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold text-slate-600 rounded-xl hover:bg-brand-50 transition-all">{l.label}</a>
            ))}
            <div className="border-t border-slate-100 pt-4 mt-2 flex flex-col gap-2">
              {buttons.map((btn: any) =>
                btn.buttonStyle === "outline" ? (
                  <a key={btn.id} href={btn.url || "#"} target={btn.openInNew ? "_blank" : undefined} rel={btn.openInNew ? "noopener noreferrer" : undefined} className="px-4 py-3 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl text-center">{btn.label}</a>
                ) : (
                  <a key={btn.id} href={btn.url || "#"} target={btn.openInNew ? "_blank" : undefined} rel={btn.openInNew ? "noopener noreferrer" : undefined} className="btn-3d btn-3d-brand justify-center">{btn.label}</a>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════
   CLOUD DIVIDER
   ═══════════════════════════════════════ */
function CloudDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`relative z-30 overflow-hidden pointer-events-none h-16 sm:h-24 -my-8 sm:-my-12 ${flip ? "rotate-180" : ""}`}>
      <div className="cloud-scroll-wrap flex">
        <div className="flex flex-shrink-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <img key={`a${i}`} src="/bulut.png" alt="" className="h-16 sm:h-24 w-auto flex-shrink-0" draggable={false} />
          ))}
        </div>
        <div className="flex flex-shrink-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <img key={`b${i}`} src="/bulut.png" alt="" className="h-16 sm:h-24 w-auto flex-shrink-0" draggable={false} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   PARTNER LOGO BAND
   ═══════════════════════════════════════ */
function PartnerLogoBand() {
  const [logos, setLogos] = useState<{ name: string; fileName: string; imageData?: string | null; mimeType?: string }[]>([]);
  useEffect(() => {
    fetch(`/api/partner-logos?t=${Date.now()}`)
      .then((r) => r.json())
      .then((data) => { console.log("[PartnerLogoBand] loaded", data.length, "logos"); setLogos(data); })
      .catch((e) => console.error("[PartnerLogoBand] error:", e));
  }, []);

  if (logos.length === 0) return null;

  const doubled = [...logos, ...logos];
  return (
    <div className="relative z-10 bg-[#F5C518] mt-auto overflow-hidden">
      <div className="py-4">
        <div className="ref-marquee-inner flex gap-12 w-max items-center">
          {doubled.map((logo, i) => {
            const hasImage = logo.imageData && logo.imageData.length > 10;
            const src = hasImage
              ? (logo.imageData!.startsWith("data:") ? logo.imageData! : `data:${logo.mimeType || "image/png"};base64,${logo.imageData}`)
              : null;
            return (
              <div key={i} className="flex-shrink-0 flex items-center gap-2">
                {src ? (
                  <img
                    src={src}
                    alt={logo.name}
                    className="h-8 sm:h-9 w-auto object-contain"
                    style={{ filter: "brightness(0) invert(0.15)" }}
                  />
                ) : (
                  <span className="font-display font-extrabold text-sm text-[#1A1A2E]/60 whitespace-nowrap tracking-wide uppercase">{logo.name}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   HERO — Floating rounded tab
   ═══════════════════════════════════════ */
function Hero({ data, menuItems }: { data?: any; menuItems: any[] }) {
  const [heroMenuOpen, setHeroMenuOpen] = useState(false);
  const d = data || {};
  const navLinks = menuItems.filter((m: any) => !m.isButton);
  const buttons = menuItems.filter((m: any) => m.isButton);
  // Mobil menü: düz liste
  const heroMobileLinks: { label: string; href: string }[] = [];
  navLinks.forEach((item: any) => {
    if (item.url) heroMobileLinks.push({ label: item.label, href: item.url });
    if (item.children?.length) {
      item.children.forEach((child: any) => {
        if (child.url) heroMobileLinks.push({ label: child.label, href: child.url });
      });
    }
  });
  const tag = d.tag || "K-12 Sosyal Beceri Platformu";
  const tagSecondary = d.tagSecondary || "Bilimsel Temelli";
  const heroTitle = d.title || "Sosyal becerileri çocuklara kazandırmanın";
  const heroHighlight = d.titleHighlight || "en kolay yolu.";
  const heroDesc = d.description || "Empati, duygu yönetimi ve öz farkındalık gibi <strong class=\"text-white font-semibold\">60'tan fazla</strong> sosyal-duygusal beceriyi çocuklara ve gençlere sistemli, kolay ve etkili biçimde kazandırıyoruz.";
  const heroSubtitle = d.subtitle || "İlgi çekici videolar, etkileşimli oyunlar ve yazdırılabilir materyallerle kapsamlı bir sosyal beceri müfredatı sizi bekliyor.";
  const cta1 = d.cta1 || { text: "Ücretsiz Başla", href: "/demo" };
  const cta2 = d.cta2 || { text: "Nasıl Çalışır?", href: "#steps" };
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
            <img src="/logo.png" alt="LearnecoHub" className="h-10 w-auto brightness-0 invert" />
          </a>
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((item: any) =>
              item.children?.length ? (
                <div key={item.id} className="relative group/dd">
                  <a href="#" className="px-4 py-2 text-[0.84rem] font-semibold text-white/60 hover:text-white rounded-xl hover:bg-white/8 transition-all flex items-center gap-1">
                    {item.label} <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover/dd:rotate-180" />
                  </a>
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/dd:opacity-100 group-hover/dd:visible transition-all duration-200">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 min-w-[220px]">
                      {item.children.map((c: any) => {
                        const Icon = homeResolveIcon(c.icon);
                        return (
                          <a key={c.id} href={c.url || "#"} className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors group/item">
                            <Icon className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0 group-hover/item:text-brand-600 transition-colors" />
                            <div>
                              <span className="block text-[0.82rem] font-semibold text-slate-700 group-hover/item:text-brand-600 transition-colors">{c.label}</span>
                              <span className="block text-[0.72rem] text-slate-400 leading-snug">{c.description || ""}</span>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <a key={item.id} href={item.url || "#"} className="px-4 py-2 text-[0.84rem] font-semibold text-white/60 hover:text-white rounded-xl hover:bg-white/8 transition-all">{item.label}</a>
              )
            )}
          </div>
          <div className="flex items-center gap-3">
            {buttons.map((btn: any) =>
              btn.buttonStyle === "outline" ? (
                <a key={btn.id} href={btn.url || "#"} target={btn.openInNew ? "_blank" : undefined} rel={btn.openInNew ? "noopener noreferrer" : undefined} className="hidden sm:block text-[0.84rem] font-bold text-white/60 hover:text-white transition-colors px-3 py-2">{btn.label}</a>
              ) : (
                <a key={btn.id} href={btn.url || "#"} target={btn.openInNew ? "_blank" : undefined} rel={btn.openInNew ? "noopener noreferrer" : undefined} className="hidden sm:inline-flex btn-3d btn-3d-mint !py-2.5 !px-6 !text-[0.84rem] !rounded-xl !gap-1.5">{btn.label}</a>
              )
            )}
            <button onClick={() => setHeroMenuOpen(!heroMenuOpen)} className="lg:hidden w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70">
              {heroMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {/* Mobile menu overlay */}
          {heroMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-[#1B3A7B]/95 backdrop-blur-xl border-t border-white/10 p-5 z-50 max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col gap-1">
                {heroMobileLinks.map((l, i) => (
                  <a key={i} href={l.href} className="px-4 py-3 text-sm font-semibold text-white/70 rounded-xl hover:bg-white/10 transition-all">{l.label}</a>
                ))}
                <div className="border-t border-white/10 pt-3 mt-2 flex flex-col gap-2">
                  {buttons.map((btn: any) =>
                    btn.buttonStyle === "outline" ? (
                      <a key={btn.id} href={btn.url || "#"} target={btn.openInNew ? "_blank" : undefined} rel={btn.openInNew ? "noopener noreferrer" : undefined} className="px-4 py-3 text-sm font-bold text-white/70">{btn.label}</a>
                    ) : (
                      <a key={btn.id} href={btn.url || "#"} target={btn.openInNew ? "_blank" : undefined} rel={btn.openInNew ? "noopener noreferrer" : undefined} className="btn-3d btn-3d-mint justify-center">{btn.label}</a>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hero Content — centered text with balloon-burst cards */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-8 pt-8 sm:pt-12 lg:pt-16 pb-10 flex-1 flex items-center justify-center">
          {/* 6 cards bursting outward from center like balloons */}
          <div className="hidden lg:block absolute inset-0 z-20 pointer-events-none">
            {(d.heroCards?.length ? d.heroCards.map((c: any) => ({
              label: c.label || c.title || "",
              count: c.count || c.lessons || "",
              progress: c.progress || 0,
              color: c.color || "#4D7EC4",
            })) : [
              { label: "İletişim", count: "32 Ders", progress: 85, color: "#4D7EC4" },
              { label: "Empati", count: "28 Ders", progress: 91, color: "#F5C518" },
              { label: "Öz Farkındalık", count: "18 Ders", progress: 73, color: "#2ECC71" },
              { label: "Takım Çalışması", count: "24 Ders", progress: 62, color: "#2ECC71" },
              { label: "Problem Çözme", count: "20 Ders", progress: 45, color: "#1B3A7B" },
              { label: "Duygu Yönetimi", count: "22 Ders", progress: 58, color: "#F5C518" },
            ]).map((raw: any, i: number) => {
              const colorMap: Record<string, { bg: string; border: string }> = {
                "#4D7EC4": { bg: "#EBF2FB", border: "#A8C2E3" },
                "#F5C518": { bg: "#FFFBEB", border: "#FFEA99" },
                "#2ECC71": { bg: "#ECFBF2", border: "#A3EBC1" },
                "#1B3A7B": { bg: "#EBF2FB", border: "#A8C2E3" },
                "#7F63CB": { bg: "#F0EDF9", border: "#BFB1E5" },
                "#EE7A45": { bg: "#FEF5F0", border: "#FBCFB7" },
              };
              const clr = raw.color || "#4D7EC4";
              const mapped = colorMap[clr] || { bg: "#EBF2FB", border: "#A8C2E3" };
              const positions = [
                { pos: "left-[6%] xl:left-[10%] top-[18%]", delay: "0.2s", float: "heroB1", rot: "-4deg" },
                { pos: "left-[2%] xl:left-[6%] top-[44%]", delay: "0.45s", float: "heroB2", rot: "3deg" },
                { pos: "left-[8%] xl:left-[12%] bottom-[18%]", delay: "0.7s", float: "heroB3", rot: "-2deg" },
                { pos: "right-[6%] xl:right-[10%] top-[18%]", delay: "0.35s", float: "heroB4", rot: "4deg" },
                { pos: "right-[2%] xl:right-[6%] top-[44%]", delay: "0.6s", float: "heroB5", rot: "-3deg" },
                { pos: "right-[8%] xl:right-[12%] bottom-[18%]", delay: "0.85s", float: "heroB6", rot: "2deg" },
              ];
              const p = positions[i % positions.length];
              const c = { ...raw, bg: mapped.bg, border: mapped.border, ...p, icon: [MessageCircle, Heart, Shield, Users, Puzzle, Target][i % 6] };
              return c;
            }).map((c: any, i: number) => (
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
                <Sparkles className="w-3.5 h-3.5" /> {tag}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-white/80 text-[0.72rem] font-bold uppercase tracking-wide border border-white/10">
                {tagSecondary}
              </span>
            </div>

            <h1 className="font-display text-[2.2rem] sm:text-[2.8rem] lg:text-[3.4rem] font-extrabold leading-[1.06] tracking-tight text-white mb-6">
              {heroTitle}{" "}
              <span className="text-[#F5C518]">{heroHighlight}</span>
            </h1>

            <p className="text-[1rem] sm:text-[1.05rem] text-white/70 leading-relaxed mb-4 max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: heroDesc }} />
            <p className="text-[0.9rem] text-white/50 leading-relaxed mb-8 max-w-lg mx-auto">
              {heroSubtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <a href={cta1.href || "/demo"} className="btn-3d btn-3d-mint !text-base">
                <Rocket className="w-5 h-5" />
                {cta1.text || "Ücretsiz Başla"}
              </a>
              <a href={cta2.href || "#steps"} className="btn-3d !bg-white/10 !text-white !border-white/15 !shadow-none hover:!bg-white/15 !border-2">
                {cta2.text || "Nasıl Çalışır?"}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5">
              {(d.checklist?.length ? d.checklist.map((item: any) => ({ icon: CheckCircle2, text: item.text || item, color: "text-white/60" })) : [
                { icon: CheckCircle2, text: "Ücretsiz Başlangıç", color: "text-[#2ECC71]" },
                { icon: Shield, text: "Güvenli Platform", color: "text-[#F5C518]" },
                { icon: Award, text: "MEB Uyumlu", color: "text-[#4D7EC4]" },
              ]).map((b: any, i: number) => (
                <div key={i} className="flex items-center gap-1.5 text-[0.8rem] font-semibold text-white/50">
                  <b.icon className={`w-4 h-4 ${b.color}`} />
                  {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gold band — Partner Logos scrolling (inside the tab, at bottom) */}
        <PartnerLogoBand />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   STATS
   ═══════════════════════════════════════ */
function Stats({ data }: { data?: any }) {
  const defaultStats = [
    { value: 500, suffix: "+", label: "Dijital İçerik ve Materyal", icon: Layers, cls: "card-3d-brand" },
    { value: 100, suffix: "+", label: "Sosyal-Duygusal Beceri Modülü", icon: BookOpen, cls: "card-3d-mint" },
    { value: 60, suffix: "+", label: "Temel Yaşam Becerisi", icon: Target, cls: "card-3d-lavender" },
    { value: 20, suffix: " Yıl+", label: "Bilimsel Araştırma Temeli", icon: Award, cls: "card-3d-peach" },
  ];
  const cardClasses = ["card-3d-brand", "card-3d-mint", "card-3d-lavender", "card-3d-peach"];
  const iconList = [Layers, BookOpen, Target, Award, GraduationCap, Globe];
  const stats: typeof defaultStats = data?.items?.map((item: any, i: number) => ({
    value: Number(item.value) || 0,
    suffix: item.suffix || "",
    label: item.label || "",
    icon: iconList[i % iconList.length],
    cls: cardClasses[i % cardClasses.length],
  })) || defaultStats;
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
function YoutubeShowcase({ data }: { data?: any }) {
  const [playing, setPlaying] = useState(false);
  const d = data || {};
  const videoId = d.videoId || "GcjqT6zb1Ts";
  const ytTitle = d.title || "Çocukları hayata";
  const ytHighlight = d.titleHighlight || "hazırlıyoruz.";
  const ytDesc = d.description || "Sosyal-duygusal öğrenme müfredatımızın nasıl çalıştığını, çocuklara ne kazandırdığını ve platformumuzu yakından tanıyın.";
  const defaultYtStats = [
    { icon: BookOpen, value: "100+", label: "Beceri", color: "#2ECC71", bg: "rgba(46,204,113,0.12)" },
    { icon: Video, value: "200+", label: "Video", color: "#F5C518", bg: "rgba(245,197,24,0.12)" },
    { icon: Users, value: "10K+", label: "Öğrenci", color: "#4D7EC4", bg: "rgba(77,126,196,0.15)" },
  ];
  const colorBg = (c: string) => c ? `${c}1f` : "rgba(77,126,196,0.15)";
  const ytStats = d.stats?.map((s: any) => ({
    icon: BookOpen, value: s.value, label: s.label, color: s.color || "#4D7EC4", bg: colorBg(s.color),
  })) || defaultYtStats;

  return (
    <Section>
      <section className="relative py-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-8 z-10" style={{ background: "linear-gradient(to bottom, #FFFBEB, transparent)" }} />
        <div className="absolute inset-0 bg-[#1B3A7B]" />
        <div className="absolute inset-0 dots-pattern opacity-[0.05]" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#4D7EC4]/25 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[400px] h-[400px] bg-[#2ECC71]/12 rounded-full blur-[100px]" />
        <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] bg-[#F5C518]/8 rounded-full blur-[90px]" />
        <div className="absolute bottom-0 left-0 right-0 h-8 z-10" style={{ background: "linear-gradient(to top, #ffffff, transparent)" }} />

        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 sm:py-24">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-12 items-center">
            <div>
              <div className="anim">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-[0.72rem] font-bold uppercase tracking-wide mb-5">
                  <Play className="w-3.5 h-3.5" /> {d.tag || "TANITIM VİDEOSU"}
                </span>
              </div>
              <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white mb-5 tracking-tight leading-[1.12]">
                {ytTitle}{" "}
                <span className="text-[#F5C518]">{ytHighlight}</span>
              </h2>
              <p className="anim d2 text-white/60 text-[0.95rem] leading-[1.85] mb-8 max-w-lg">{ytDesc}</p>
              <div className="anim d3 grid grid-cols-3 gap-2 sm:gap-3 mb-8">
                {ytStats.map((s: any, i: number) => (
                  <div key={i} className="rounded-xl border border-white/10 p-3 sm:p-4 text-center backdrop-blur-sm" style={{ background: s.bg }}>
                    <s.icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1.5 sm:mb-2" style={{ color: s.color }} />
                    <p className="font-display text-lg sm:text-xl font-extrabold text-white leading-none mb-0.5">{s.value}</p>
                    <p className="text-[0.62rem] sm:text-[0.68rem] text-white/50 font-semibold">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="anim d4">
                <a href={d.cta?.href || "/demo"} className="btn-3d btn-3d-mint">
                  <Rocket className="w-5 h-5" /> {d.cta?.label || "Hemen Başla"}
                </a>
              </div>
            </div>
            <div className="anim d2 relative">
              <div className="absolute -inset-3 rounded-3xl bg-[#F5C518]/10 blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/10" style={{ boxShadow: "0 6px 0 rgba(77,126,196,0.25), 0 20px 50px rgba(0,0,0,0.35)" }}>
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  {!playing ? (
                    <>
                      <img src={d.thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt="LearnecoHub Tanıtım Videosu" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
                      <button onClick={() => setPlaying(true)} className="absolute inset-0 z-10 flex items-center justify-center group cursor-pointer">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F5C518] flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ boxShadow: "0 4px 0 #D4A816, 0 8px 30px rgba(245,197,24,0.4)" }}>
                          <Play className="w-9 h-9 sm:w-11 sm:h-11 text-[#1A1A2E] ml-1" fill="#1A1A2E" />
                        </div>
                      </button>
                      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-sm">
                        <Youtube className="w-4 h-4 text-[#FF0000]" />
                        <span className="font-display font-bold text-white text-[0.78rem]">{d.playLabel || "Videoyu İzle"}</span>
                      </div>
                    </>
                  ) : (
                    <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} title="LearnecoHub Tanıtım Videosu" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
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
function Materials({ data }: { data?: any }) {
  const d = data || {};
  const sectionTitle = d.titleHighlight ? `${d.title || ''} <span class="text-gradient">${d.titleHighlight}</span>` : (d.title || 'Sosyal Becerileri Öğretmeyi Kolaylaştıran <span class="text-gradient">İlgi Çekici Materyaller</span>');
  const sectionDesc = d.description || "İlkokuldan liseye kadar tüm seviyelerdeki öğrencilere, 100'den fazla sosyal-duygusal beceri kazandırıyoruz. Müfredatımız animasyonlu videolar, etkileşimli beceri oyunları ve zengin araçlarla destekleniyor.";
  const defaultCards = [
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
  const materialColors = [
    { color: "#1B3A7B", bg: "#EBF2FB", accent: "#4D7EC4" },
    { color: "#2ECC71", bg: "#ECFBF2", accent: "#69DC9A" },
    { color: "#7F63CB", bg: "#F0EDF9", accent: "#9F8AD8" },
    { color: "#EE7A45", bg: "#FEF5F0", accent: "#F49668" },
    { color: "#F5C518", bg: "#FFFBEB", accent: "#FFDF66" },
    { color: "#1B3A7B", bg: "#EBF2FB", accent: "#7BA0D3" },
    { color: "#2ECC71", bg: "#ECFBF2", accent: "#A3EBC1" },
    { color: "#7F63CB", bg: "#F0EDF9", accent: "#BFB1E5" },
  ];
  const rawCards = d.cards || d.items || [];
  const cards = rawCards.length ? rawCards.map((item: any, i: number) => {
    const mc = materialColors[i % materialColors.length];
    const rawFeatures = item.features || item.lines;
    const lines = Array.isArray(rawFeatures) ? rawFeatures : (typeof rawFeatures === 'string' ? rawFeatures.split('\n').filter(Boolean) : (defaultCards[i]?.lines || []));
    return {
      icon: homeResolveIcon(item.icon) || defaultCards[i]?.icon || Layers,
      label: item.label || item.title || defaultCards[i]?.label || "",
      count: item.count || defaultCards[i]?.count || "",
      color: mc.color, bg: mc.bg, accent: mc.accent,
      lines,
    };
  }) : defaultCards;

  // Images for the mosaic (admin can override via d.images array)
  const defaultMosaicImages = [
    { src: "/materials/katalog_page_1.png", alt: "Materyal 1" },
    { src: "/materials/katalog_page_2.png", alt: "Materyal 2" },
    { src: "/materials/katalog_page_3.png", alt: "Materyal 3" },
    { src: "/materials/katalog_page_4.png", alt: "Materyal 4" },
    { src: "/materials/katalog_page_5.png", alt: "Materyal 5" },
    { src: "/materials/katalog_page_6.png", alt: "Materyal 6" },
    { src: "/materials/katalog_page_7.png", alt: "Materyal 7" },
    { src: "/materials/katalog_page_8.png", alt: "Materyal 8" },
    { src: "/materials/katalog_page_9.png", alt: "Materyal 9" },
  ];
  const images = (d.images?.length ? d.images : defaultMosaicImages) as { src: string; alt: string }[];

  const ctaLabel = d.ctaLabel || "Şimdi Keşfetmeye Başlayın";
  const ctaHref = d.ctaHref || "https://lms.learnecohub.com/login/index.php";

  return (
    <Section>
      <section id="materials" className="relative overflow-hidden" style={{ background: "#FFF8E1" }}>
        {/* Hero-style: left content + right mosaic */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left content */}
            <div className="flex-1 max-w-xl">
              <div className="anim">
                <span className="tag bg-brand-100 text-brand-700 mb-6"><Sparkles className="w-3.5 h-3.5" /> {d.tag || "MATERYALLER"}</span>
              </div>
              <h2
                className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-slate-800 mb-6 tracking-tight leading-[1.15]"
                dangerouslySetInnerHTML={{ __html: sectionTitle }}
              />
              <p className="anim d2 text-slate-500 text-[0.95rem] leading-relaxed mb-8">
                {sectionDesc}
              </p>
              <div className="anim d3">
                <a
                  href={ctaHref}
                  className="inline-flex items-center gap-2 btn-3d btn-3d-brand !py-3.5 !px-8 !text-[0.9rem]"
                >
                  {ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right mosaic — vertical marquee columns with blur edges */}
            <div className="flex-1 w-full max-w-2xl relative">
              {/* Top & bottom blur masks */}
              <div className="absolute top-0 left-0 right-0 h-28 z-20 pointer-events-none" style={{ background: "linear-gradient(to bottom, #FFF8E1, transparent)" }} />
              <div className="absolute bottom-0 left-0 right-0 h-28 z-20 pointer-events-none" style={{ background: "linear-gradient(to top, #FFF8E1, transparent)" }} />

              {(() => {
                return (
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 h-[420px] sm:h-[480px] overflow-hidden">
                    {[0, 1, 2].map((col) => {
                      const direction = col % 2 === 0 ? "matScrollUp" : "matScrollDown";
                      const speed = 18 + col * 4;
                      const colImages = images.slice(col * 3, col * 3 + 3);
                      const tripled = [...colImages, ...colImages, ...colImages];
                      return (
                        <div key={col} className="relative overflow-hidden h-full">
                          <div className="flex flex-col gap-3 sm:gap-4" style={{ animation: `${direction} ${speed}s linear infinite` }}>
                            {tripled.map((img, i) => (
                              <div key={i} className="rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                                <img src={img.src} alt={img.alt} className="w-full h-auto object-cover aspect-[4/3]" loading="lazy" />
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Vertical marquee keyframes */}
        <style>{`
          @keyframes matScrollUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-33.333%); }
          }
          @keyframes matScrollDown {
            0% { transform: translateY(-33.333%); }
            100% { transform: translateY(0); }
          }
        `}</style>

        {/* Scrolling material cards below */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #FFF8E1, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #FFF8E1, transparent)" }} />
            <div className="material-marquee overflow-hidden">
              <div className="material-marquee-inner flex gap-8 w-max py-6 px-10">
                {[...cards, ...cards].map((c, i) => (
                  <div key={i} className="a4-file group relative flex-shrink-0 w-[300px] cursor-pointer">
                    <div className="relative transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.08))" }}>
                      <div
                        className="relative overflow-hidden"
                        style={{
                          height: "380px",
                          background: "#ffffff",
                          clipPath: "polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)",
                          borderRadius: "16px",
                          border: `2px solid ${c.accent}40`,
                        }}
                      >
                        <div className="absolute inset-0 a4-lines" style={{ "--line-color": c.accent + "18" } as React.CSSProperties} />
                        <div className="absolute top-0 bottom-0 left-[44px] w-[1.5px]" style={{ background: c.color + "15" }} />
                        <div className="absolute top-0 right-0 w-[36px] h-[36px] z-10">
                          <div className="absolute inset-0" style={{ background: c.bg, clipPath: "polygon(0 0, 100% 100%, 0 100%)" }} />
                          <div className="absolute inset-0" style={{ background: c.accent + "20", clipPath: "polygon(0 0, 0 100%, 100% 100%)" }} />
                        </div>
                        <div className="relative z-10 px-5 pt-6 pb-3 pl-[52px]" style={{ borderBottom: `2px solid ${c.accent}25` }}>
                          <span className="text-[0.6rem] font-extrabold uppercase tracking-widest" style={{ color: c.color }}>{c.count} MATERYAL</span>
                          <h4 className="font-display font-bold text-[0.95rem] text-slate-800 leading-tight mt-1">{c.label}</h4>
                        </div>
                        <div className="relative z-10 px-5 pt-4 pl-[52px]">
                          <p className="text-[0.82rem] text-slate-500 leading-relaxed">{c.lines.join(", ")}</p>
                        </div>
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
function FreeBanner({ data }: { data?: any }) {
  const d = data || {};
  const bannerTitle = d.title || 'Her ay <span class="font-extrabold underline decoration-[#1B3A7B] decoration-2 underline-offset-4">ücretsiz</span> sosyal beceri materyalleri edinin.';
  const bannerDesc = d.description || "Stres yönetimi, empati, öz farkındalık, eleştirel düşünme, duygu yönetimi, motivasyon, hedef belirleme ve uygulama odaklı eğitim materyalleri.";
  const cta = d.cta || { label: "Kayıt Ol ve İndir", href: "/ucretsiz-kaynaklar" };
  return (
    <Section>
      <section className="py-16 bg-[#F5C518] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.08]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h3 className="anim font-display text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] mb-3 tracking-tight" dangerouslySetInnerHTML={{ __html: bannerTitle }} />
          <p className="anim d1 text-[#1A1A2E]/70 text-[0.9rem] leading-relaxed max-w-2xl mx-auto mb-7">
            {bannerDesc}
          </p>
          <a href={cta.href || "/ucretsiz-kaynaklar"} className="anim d2 btn-3d btn-3d-brand">
            <Download className="w-5 h-5" /> {cta.label || "Kayıt Ol ve İndir"}
          </a>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   PIANO SHOWCASE — Real Piano Keys + Video
   ═══════════════════════════════════════ */
function PianoShowcase({ data }: { data?: any }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [pressedIdx, setPressedIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const d = data || {};
  const pianoTitle = d.titleHighlight ? `${d.title || ''} <span class="text-gradient">${d.titleHighlight}</span>` : (d.title || 'Platformumuzu <span class="text-gradient">keşfedin</span>');
  const pianoDesc = d.description || "Her tuşa basın, farklı bir öğrenme deneyimini keşfedin.";

  const defaultKeys = [
    { title: "Tanıtım", desc: "LearnecoHub platformunu yakından tanıyın", src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Tanitim-Videosu-Guncel.mp4" },
    { title: "Etkileşimli", desc: "Hikayeleştirilmiş animasyon destekli içerikler", src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Etkilesimli-Video-Tanitim-1.mp4" },
    { title: "Güvenlik", desc: "Çocuklarınız için güvenli dijital ortam", src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Web-Sitesi-Guvenlik-2.mp4" },
    { title: "Empati", desc: "Empati becerilerini geliştiren video dersler", src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Tanitim-Videosu-Guncel.mp4" },
    { title: "Duygular", desc: "Duyguları tanıma ve yönetme stratejileri", src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Etkilesimli-Video-Tanitim-1.mp4" },
  ];

  const keys: Array<{ title: string; desc: string; src: string; youtubeId: string }> = d.items?.length ? d.items.map((item: any, i: number) => ({
    title: item.title || defaultKeys[i]?.title || "",
    desc: item.description || item.desc || defaultKeys[i]?.desc || "",
    src: item.src || item.url || defaultKeys[i]?.src || "",
    youtubeId: item.youtubeId || "",
  })) : defaultKeys.map((k) => ({ ...k, youtubeId: "" }));

  const handleKeyClick = (idx: number) => {
    setPressedIdx(idx);
    setTimeout(() => setPressedIdx(null), 180);
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handlePlay = () => {
    if (keys[activeIdx]?.youtubeId) {
      setIsPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  /* Black keys between white keys — skip gap after 2nd and 5th (E-F, B-C in real piano) */
  const blackKeyPositions = keys.length <= 2 ? [] :
    Array.from({ length: keys.length - 1 }, (_, i) => i).filter((i) => {
      const mod = i % 7;
      return mod !== 2 && mod !== 6;
    });

  const whiteKeyH = 100 / keys.length;

  return (
    <Section>
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-16 right-[8%] w-60 h-60 bg-brand-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-[5%] w-52 h-52 bg-lavender-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-brand-100 text-brand-700 mb-4"><Play className="w-3.5 h-3.5" /> {d.tag || "İNTERAKTİF VİTRİN"}</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: pianoTitle }} />
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">{pianoDesc}</p>
          </div>

          <div className="anim d3 relative">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 6px 40px rgba(26,26,46,0.16)" }}
            >
              <div className="flex flex-col md:flex-row" style={{ minHeight: 440 }}>

                {/* ─── Piano Keyboard (Left) ─── */}
                <div className="md:w-[230px] lg:w-[270px] flex-shrink-0 relative select-none overflow-hidden">
                  <div className="relative h-full" style={{ background: "#111118" }}>

                    {/* White keys */}
                    {keys.map((key, i) => {
                      const isActive = i === activeIdx;
                      const isPressed = i === pressedIdx;
                      const pushed = isPressed || (isActive && pressedIdx === i);
                      return (
                        <button
                          key={i}
                          onClick={() => handleKeyClick(i)}
                          className="absolute left-0 w-full cursor-pointer"
                          style={{
                            top: `${i * whiteKeyH}%`,
                            height: `${whiteKeyH}%`,
                            zIndex: 1,
                            padding: "1px 0",
                          }}
                        >
                          <div
                            className="relative w-full h-full transition-all"
                            style={{
                              transitionDuration: pushed ? "60ms" : "200ms",
                              borderRadius: "0 10px 10px 0",
                              background: isActive
                                ? "linear-gradient(90deg, #e8eeff 0%, #f0f4ff 60%, #dce6f8 100%)"
                                : pushed
                                  ? "linear-gradient(90deg, #e0e0e0 0%, #d8d8d8 100%)"
                                  : "linear-gradient(90deg, #f8f8f8 0%, #ffffff 40%, #f5f5f5 80%, #ededed 100%)",
                              boxShadow: pushed
                                ? "inset 0 0 8px rgba(0,0,0,0.08), 0 1px 1px rgba(0,0,0,0.05)"
                                : isActive
                                  ? "0 3px 12px rgba(27,58,123,0.15), inset 0 -4px 0 #b8cce6, 0 1px 2px rgba(0,0,0,0.08)"
                                  : "inset 0 -5px 0 #d0d0d0, 0 2px 4px rgba(0,0,0,0.04), 0 1px 1px rgba(0,0,0,0.06)",
                              transform: pushed ? "scaleX(0.98) translateX(-2px)" : "scaleX(1) translateX(0)",
                              transformOrigin: "left center",
                              borderTop: "1px solid rgba(0,0,0,0.04)",
                              borderBottom: "1px solid rgba(0,0,0,0.06)",
                              borderRight: isActive ? "4px solid #1B3A7B" : "2px solid #c8c8c8",
                            }}
                          >
                            {/* Shine highlight along top */}
                            <div
                              className="absolute top-0 left-4 right-4 h-[1px]"
                              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)" }}
                            />

                            {/* Key label */}
                            <div className="absolute inset-0 flex items-center pl-5 lg:pl-6 pr-14">
                              <span
                                className="font-display text-[0.82rem] lg:text-[0.88rem] font-extrabold tracking-wide transition-all duration-200"
                                style={{
                                  color: isActive ? "#1B3A7B" : "#78788a",
                                  letterSpacing: isActive ? "0.04em" : "0.02em",
                                }}
                              >
                                {key.title}
                              </span>
                            </div>

                            {/* Active glow pulse */}
                            {isActive && (
                              <div
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                                style={{
                                  background: "#1B3A7B",
                                  boxShadow: "0 0 8px 2px rgba(27,58,123,0.35)",
                                }}
                              />
                            )}
                          </div>
                        </button>
                      );
                    })}

                    {/* ── Black keys (sharp tuşları) — SAĞA DAYALI ── */}
                    {blackKeyPositions.map((pos) => {
                      const topPct = (pos + 1) * whiteKeyH;
                      return (
                        <div
                          key={`bk-${pos}`}
                          className="absolute z-[3] pointer-events-none"
                          style={{
                            right: 0,
                            top: `${topPct - whiteKeyH * 0.2}%`,
                            width: "42%",
                            height: `${whiteKeyH * 0.4}%`,
                            minHeight: 20,
                          }}
                        >
                          <div
                            className="w-full h-full rounded-l-md relative overflow-hidden"
                            style={{
                              background: "linear-gradient(90deg, #1e1e24 0%, #18181e 50%, #111116 100%)",
                              boxShadow: "inset 0 -3px 0 #0a0a0e, 0 3px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                              borderLeft: "1px solid rgba(255,255,255,0.03)",
                              borderTop: "1px solid rgba(255,255,255,0.02)",
                            }}
                          >
                            {/* Gloss */}
                            <div
                              className="absolute inset-x-0 top-0 h-1/3"
                              style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)" }}
                            />
                          </div>
                        </div>
                      );
                    })}

                    {/* Side shadow where keys meet video */}
                    <div className="absolute top-0 bottom-0 right-0 w-2 z-[4] pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.15))" }} />
                  </div>
                </div>

                {/* ─── Video Player (Right) ─── */}
                <div className="flex-1 relative bg-[#0A0F1C] flex flex-col">
                  <div className="relative flex-1 min-h-[260px]">
                    {keys[activeIdx]?.youtubeId && isPlaying ? (
                      <iframe
                        key={keys[activeIdx].youtubeId}
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${keys[activeIdx].youtubeId}?autoplay=1&rel=0&hd=1&vq=hd1080`}
                        title={keys[activeIdx]?.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    ) : keys[activeIdx]?.youtubeId ? (
                      <img
                        src={`https://img.youtube.com/vi/${keys[activeIdx].youtubeId}/maxresdefault.jpg`}
                        alt={keys[activeIdx]?.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${keys[activeIdx].youtubeId}/hqdefault.jpg`; }}
                      />
                    ) : (
                      <video
                        ref={videoRef}
                        key={keys[activeIdx]?.src}
                        src={keys[activeIdx]?.src}
                        className="absolute inset-0 w-full h-full object-cover"
                        onEnded={() => setIsPlaying(false)}
                        playsInline
                      />
                    )}

                    {/* Play overlay */}
                    {!isPlaying && (
                      <div
                        className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
                        onClick={handlePlay}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C]/60 via-[#0A0F1C]/20 to-[#0A0F1C]/70" />
                        <div className="relative z-10 flex flex-col items-center gap-4">
                          <div
                            className="w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover/play:scale-110 group-hover/play:shadow-2xl"
                            style={{
                              width: 72, height: 72,
                              background: "rgba(255,255,255,0.95)",
                              boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
                            }}
                          >
                            <Play className="w-7 h-7 text-[#1B3A7B] ml-1" fill="#1B3A7B" />
                          </div>
                          <div className="text-center">
                            <p className="text-white font-display font-bold text-[0.95rem]">{keys[activeIdx]?.title}</p>
                            <p className="text-white/45 text-[0.78rem] mt-0.5 max-w-[280px]">{keys[activeIdx]?.desc}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Corner label */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] animate-pulse" />
                      <span className="text-white/70 text-[0.7rem] font-semibold">{activeIdx + 1} / {keys.length}</span>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="px-5 py-3.5 flex items-center justify-between" style={{ background: "linear-gradient(180deg, #0c1020 0%, #0F1629 100%)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-white/50 text-[0.75rem] font-medium truncate">{keys[activeIdx]?.desc}</span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {keys.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handleKeyClick(i)}
                          className="transition-all duration-200 rounded-full"
                          style={{
                            width: i === activeIdx ? 24 : 8,
                            height: 8,
                            background: i === activeIdx ? "#1B3A7B" : "rgba(255,255,255,0.08)",
                            boxShadow: i === activeIdx ? "0 0 12px rgba(27,58,123,0.4)" : "none",
                          }}
                        />
                      ))}
                    </div>
                  </div>
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
   VIDEO SHOWCASE — Notebook Style Cards
   ═══════════════════════════════════════ */
function VideoShowcase({ data }: { data?: any }) {
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const d = data || {};
  const vsTitle = d.titleHighlight ? `${d.title || ''} <span class="text-gradient">${d.titleHighlight}</span>` : (d.title || 'Hikayeleştirilmiş <span class="text-gradient">video dersler</span>');
  const vsDesc = d.description || "Yaş gruplarına özel, animasyon destekli ve oyunlaştırılmış video içeriklerimizi keşfedin.";
  const accentColors = ["#1B3A7B", "#2ECC71", "#F5C518", "#7F63CB", "#EE7A45", "#1B3A7B"];
  const defaultVideos = [
    { title: "Tanıtım Videosu", desc: "LearnecoHub platformunun kapsamlı sosyal beceri müfredatını ve öğrenme deneyimini keşfedin.", accent: "#1B3A7B", tabColor: "#1B3A7B", src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Tanitim-Videosu-Guncel.mp4" },
    { title: "Etkileşimli Video", desc: "Hikayeleştirilmiş, animasyon destekli ve oyunlaştırılmış etkileşimli video içeriklerimize göz atın.", accent: "#2ECC71", tabColor: "#2ECC71", src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Etkilesimli-Video-Tanitim-1.mp4" },
    { title: "Platform Güvenliği", desc: "Çocuklarınız için güvenli ve kontrollü bir dijital öğrenme ortamı sunuyoruz.", accent: "#F5C518", tabColor: "#F5C518", src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Web-Sitesi-Guvenlik-2.mp4" },
    { title: "Empati Gelişimi", desc: "Çocukların empati becerilerini hikayeler ve interaktif senaryolarla geliştiren video dersler.", accent: "#7F63CB", tabColor: "#7F63CB", src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Tanitim-Videosu-Guncel.mp4" },
    { title: "Duygu Yönetimi", desc: "Öfke, kaygı ve üzüntü gibi duyguları tanıma ve yönetme stratejilerini öğreten içerikler.", accent: "#EE7A45", tabColor: "#EE7A45", src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Etkilesimli-Video-Tanitim-1.mp4" },
    { title: "Sosyal Beceriler", desc: "Arkadaşlık kurma, iş birliği ve iletişim becerilerini destekleyen animasyonlu dersler.", accent: "#1B3A7B", tabColor: "#1B3A7B", src: "https://learnecohub.com/.old-wp/wp-content/uploads/2025/07/Web-Sitesi-Guvenlik-2.mp4" },
  ];
  const videos: Array<{ title: string; desc: string; accent: string; tabColor: string; src: string; youtubeId: string; label: string }> = d.items?.length ? d.items.map((item: any, i: number) => ({
    title: item.title || defaultVideos[i]?.title || "",
    desc: item.description || item.desc || defaultVideos[i]?.desc || "",
    accent: item.color || accentColors[i % accentColors.length],
    tabColor: item.color || accentColors[i % accentColors.length],
    src: item.src || item.url || defaultVideos[i]?.src || "",
    youtubeId: item.youtubeId || "",
    label: item.label || "",
  })) : defaultVideos.map(v => ({ ...v, youtubeId: "", label: "" }));

  return (
    <Section>
      <section className="py-24 bg-[#E8F4FD] relative overflow-hidden">
        <div className="absolute top-20 right-[8%] w-60 h-60 bg-brand-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[5%] w-52 h-52 bg-mint-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-lavender-100 text-lavender-700 mb-4"><Video className="w-3.5 h-3.5" /> {d.tag || "VİDEO İÇERİKLER"}</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: vsTitle }} />
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              {vsDesc}
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
                        <span className="text-[0.65rem] font-bold text-white/90 uppercase tracking-wide">{v.label || `Ders ${i + 1}`}</span>
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
                          {v.youtubeId ? (
                            <>
                              {!isPlaying ? (
                                <>
                                  <img src={`https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg`} alt={v.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`; }} />
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
                                </>
                              ) : (
                                <>
                                  <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
                                    title={v.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                  />
                                  <button
                                    onClick={() => setPlayingIdx(null)}
                                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white/80 hover:bg-black/60 transition-colors z-10 cursor-pointer"
                                    aria-label="Durdur"
                                    type="button"
                                  >
                                    <span className="text-xs font-bold">✕</span>
                                  </button>
                                </>
                              )}
                            </>
                          ) : (
                            <>
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
                            </>
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
              href={d.ctaHref || "/platform"}
              className="btn-3d btn-3d-brand !text-[0.85rem] group"
            >
              {d.ctaLabel || "Tüm Video Dersleri Gör"}
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
function LearningSteps({ data }: { data?: any }) {
  const d = data || {};
  const lsTitle = d.titleHighlight ? `${d.title || ''} <span class="highlight">${d.titleHighlight}</span>` : (d.title || '6 Adımda <span class="highlight">Kapsamlı Müfredat</span>');
  const lsDesc = d.description || "Tanışmadan gelişim takibine kadar, her aşamada öğrencilerinize ve ailelerine bilimsel temelli destek sağlıyoruz.";
  const stepClasses = ["card-3d-brand", "card-3d-mint", "card-3d-lavender", "card-3d-peach", "card-3d-gold", "card-3d-brand"];
  const defaultSteps = [
    { num: "1", title: "Tanışma ve Değerlendirme", desc: "Alanında uzman psikologlar çocuğunuzun sosyal-duygusal gelişim ihtiyaçlarını kapsamlı değerlendirir. Yaşa ve ihtiyaca uygun gruplara yönlendirme yapılır.", icon: Target, cls: "card-3d-brand" },
    { num: "2", title: "Asenkron Öğrenme", desc: "Çocuklar, animasyonlu hikayeleştirilmiş videolar ve oyunlarla becerileri bireysel olarak öğrenir. Aileye evde uygulayabileceği etkinlik önerileri sunulur.", icon: Video, cls: "card-3d-mint" },
    { num: "3", title: "Canlı Grup Seansları", desc: "10-12 kişilik özel gruplarda yapılan canlı oturumlarda, öğrenciler öğrendikleri becerileri grup içinde aktif şekilde uygular.", icon: Users, cls: "card-3d-lavender" },
    { num: "4", title: "Uygulama ve Derinleşme", desc: "Canlı derslerde öğrencilere evde uygulayabilecekleri görevler verilir. Öğrenilen becerinin gerçek yaşamda pratiği sağlanır.", icon: PenTool, cls: "card-3d-peach" },
    { num: "5", title: "Ölçme ve Geri Bildirim", desc: "Her beceri sonunda kısa değerlendirmelerle gelişim izlenir. İlerleme kişisel gelişim portfolyosuna yansır.", icon: BarChart3, cls: "card-3d-gold" },
    { num: "6", title: "Aile Katılımı", desc: "Velilere haftalık videolar, öneriler ve kolay uygulanabilir rehber materyaller sunulur. Çocuk evde de desteklenir.", icon: Heart, cls: "card-3d-brand" },
  ];
  const rawSteps = d.steps || d.items || [];
  const steps: typeof defaultSteps = rawSteps.length ? rawSteps.map((item: any, i: number) => ({
    num: String(i + 1),
    title: item.title || defaultSteps[i]?.title || "",
    desc: item.description || item.desc || defaultSteps[i]?.desc || "",
    icon: defaultSteps[i]?.icon || Layers,
    cls: stepClasses[i % stepClasses.length],
  })) : defaultSteps;

  return (
    <Section>
      <section id="steps" className="py-24 bg-[#FFFBEB] relative overflow-hidden">
        <div className="absolute top-16 left-[10%] w-56 h-56 bg-gold-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-[5%] w-64 h-64 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-mint-100 text-mint-700 mb-4"><Layers className="w-3.5 h-3.5" /> {d.tag || "NASIL ÇALIŞIR"}</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: lsTitle }} />
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              {lsDesc}
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
function LearningMap({ data }: { data?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const progress = useScrollProgress(containerRef);

  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, []);

  const dd = data || {};
  const mapTitle = dd.titleHighlight ? `${dd.title || ''} <span class="highlight">${dd.titleHighlight}</span>` : (dd.title || 'Adım adım <span class="highlight">ustalaşın</span>');
  const mapDesc = dd.description || "Kademeli öğrenme yoluyla sosyal becerilerde ilerleme sağlayın.";
  const nodeColors: Record<string, { bg: string; shadow: string; glow: string; ring: string }> = {
    completed_0: { bg: "#1B3A7B", shadow: "#112755", glow: "rgba(27,58,123,0.3)", ring: "rgba(27,58,123,0.15)" },
    completed_1: { bg: "#2ECC71", shadow: "#1F8E4E", glow: "rgba(46,204,113,0.3)", ring: "rgba(46,204,113,0.15)" },
    completed_2: { bg: "#F5C518", shadow: "#B5910B", glow: "rgba(245,197,24,0.3)", ring: "rgba(245,197,24,0.15)" },
    current: { bg: "#4D7EC4", shadow: "#1B3A7B", glow: "rgba(77,126,196,0.3)", ring: "rgba(77,126,196,0.15)" },
    locked: { bg: "#e2e8f0", shadow: "#cbd5e1", glow: "rgba(0,0,0,0.04)", ring: "rgba(0,0,0,0)" },
  };
  const defaultNodes = [
    { icon: BookOpen, title: "Temel Kavramlar", status: "completed" },
    { icon: MessageCircle, title: "İletişim Becerileri", status: "completed" },
    { icon: Heart, title: "Empati Geliştirme", status: "completed" },
    { icon: Users, title: "Takım Çalışması", status: "current" },
    { icon: Puzzle, title: "Problem Çözme", status: "locked" },
    { icon: Trophy, title: "Mezuniyet", status: "locked" },
  ];
  const nodeIcons = [BookOpen, MessageCircle, Heart, Users, Puzzle, Trophy];
  const nodes = (dd.nodes?.length ? dd.nodes.map((n: any, i: number) => ({
    icon: nodeIcons[i % nodeIcons.length],
    title: n.title || defaultNodes[i]?.title || "",
    status: n.status || defaultNodes[i]?.status || "locked",
  })) : defaultNodes).map((n: any, i: number) => {
    let colorKey = n.status === "locked" ? "locked" : n.status === "current" ? "current" : `completed_${i % 3}`;
    const c = nodeColors[colorKey] || nodeColors.locked;
    return { ...n, ...c };
  });

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
          <span className="tag bg-lavender-100 text-lavender-700 mb-4"><Rocket className="w-3.5 h-3.5" /> {dd.tag || "ÖĞRENME YOLU"}</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight mt-3" dangerouslySetInnerHTML={{ __html: mapTitle }} />
          <p className="text-slate-400 text-[0.95rem] leading-relaxed">
            {mapDesc}
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

            {nodes.slice(0, positions.length).map((node: any, i: number) => {
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
            {nodes.map((node: any, i: number) => {
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
                      {node.status === "completed" ? (dd.labelCompleted || "Tamamlandı") : node.status === "current" ? (dd.labelCurrent || "Devam ediyor") : (dd.labelLocked || "Kilitli")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          {[
            { color: "bg-mint-400", label: dd.labelCompleted || "Tamamlandı" },
            { color: "bg-lavender-400", label: dd.labelCurrent || "Devam Ediyor" },
            { color: "bg-slate-200", label: dd.labelLocked || "Kilitli" },
          ].map((l: any, i: number) => (
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
function Pricing({ data }: { data?: any }) {
  const d = data || {};
  const prTitle = d.titleHighlight ? `<span class="highlight">${d.titleHighlight}</span> ${d.title || ''}` : (d.title || '<span class="highlight">Planınızı</span> seçin, hemen başlayın');
  const prDesc = d.description || "Herkesin öğrenme yolculuğu farklı. Size özel sosyal-duygusal gelişim planınızı seçin.";
  const planClasses = ["card-3d-brand", "card-3d-mint", "card-3d-lavender"];
  const defaultPlans = [
    {
      title: "Bireysel Kullanıcı", subtitle: "Aileler ve Öğrenciler İçin", cls: "card-3d-brand",
      features: ["Animasyonlarla öğrenme deneyimi", "100+ sosyal ve duygusal beceri müfredatı", "Psikolog eşliğinde 10-12 kişilik canlı grup dersleri", "Uluslararası geçerli dijital portfolyo", "Haftalık gelişim raporları ve ebeveyn içerikleri", "Günlük yaşama entegre eğitici oyunlar ve görevler"],
      cta: "Detaylı Bilgi Al", ctaHref: "/iletisim", popular: false,
    },
    {
      title: "Uzman Hesabı", subtitle: "Psikolog, Öğretmen ve PDR Uzmanları İçin", cls: "card-3d-mint",
      features: ["Sıfır hazırlık ile sosyal becerileri öğretme imkanı", "Her beceri için: animasyon video + oyun + etkinlik + ölçme aracı", "İçerik yönetimi, öğrenci gelişim takibi ve raporlama paneli", "500+ hazır etkinlik ve yazdırılabilir materyale erişim", "Birebir veya grup eğitimlerinde kullanıma uygun hazır müfredat"],
      cta: "Detaylı Bilgi Al", ctaHref: "/iletisim", popular: true,
    },
    {
      title: "Kurum Hesabı", subtitle: "Okullar, Kurumlar ve STK'lar İçin", cls: "card-3d-lavender",
      features: ["Seviyeye özel yapılandırılmış, 100+ beceriyi kapsayan hazır müfredat", "Her beceri için modüler sistem (video + oyun + etkinlik + ölçme)", "Kurumsal dashboard ile çoklu kullanıcı yönetimi (1000+ kullanıcı)", "Öğrenci beceri CV'lerini kurumsal olarak raporlama", "Öğretmen ve PDR uzmanları için uygulama rehberleri"],
      cta: "Bizimle İletişime Geçin", ctaHref: "/iletisim", popular: false,
    },
  ];
  const rawPlans = d.plans || d.items || [];
  const plans = rawPlans.length ? rawPlans.map((item: any, i: number) => ({
    title: item.title || defaultPlans[i]?.title || "",
    subtitle: item.subtitle || defaultPlans[i]?.subtitle || "",
    cls: planClasses[i % planClasses.length],
    features: typeof item.features === "string" ? item.features.split("\n").filter(Boolean) : (Array.isArray(item.features) ? item.features : (defaultPlans[i]?.features || [])),
    cta: item.cta || defaultPlans[i]?.cta || "Detaylı Bilgi Al",
    ctaHref: item.ctaHref || "/iletisim",
    popular: item.popular ?? (i === 1),
  })) : defaultPlans.map(p => ({ ...p }));

  return (
    <Section>
      <section id="pricing" className="py-24 bg-[#ECFBF2] relative overflow-hidden">
        <div className="absolute top-20 right-[8%] w-72 h-72 bg-mint-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[5%] w-56 h-56 bg-gold-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 dots-pattern opacity-[0.06]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-gold-100 text-gold-700 mb-4"><Crown className="w-3.5 h-3.5" /> {d.tag || "KURSLARIMIZ"}</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: prTitle }} />
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              {prDesc}
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {plans.map((p: any, i: number) => (
              <div key={i} className={`anim d${i + 1} card-3d ${p.cls} p-7 relative flex flex-col`}>
                <h3 className="font-display text-xl font-extrabold text-slate-800 mb-1">{p.title}</h3>
                <p className="text-[0.82rem] text-slate-400 font-medium mb-4">{p.subtitle}</p>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {(p.features || []).map((f: string, fi: number) => (
                    <li key={fi} className="flex items-start gap-2.5 text-[0.82rem] text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-mint-500 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={p.ctaHref || "/iletisim"} className="btn-3d btn-3d-white w-full justify-center">
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
function Team({ data }: { data?: any }) {
  const d = data || {};
  const teamTitle = d.titleHighlight ? `${d.title || ''} <span class="text-gradient">${d.titleHighlight}</span>` : (d.title || 'Tutkulu Bir <span class="text-gradient">Ekiple</span> Çalışıyoruz');
  const teamDesc = d.description || "Her biri alanında uzman, çocukların geleceğine inanan bir ekip.";
  const teamColors = [
    { color: "#1B3A7B", bg: "#EBF2FB" },
    { color: "#2ECC71", bg: "#ECFBF2" },
    { color: "#F5C518", bg: "#FFFBEB" },
    { color: "#7F63CB", bg: "#F0EDF9" },
    { color: "#EE7A45", bg: "#FEF5F0" },
    { color: "#1B3A7B", bg: "#EBF2FB" },
  ];
  const defaultMembers = [
    { name: "Dr. Melih Taha Aytep", title: "Psikiyatri / Tıp Doktoru & Kurucu", img: "/ekip/Dr.Melih Taha AYTEP.png", color: "#1B3A7B", bg: "#EBF2FB" },
    { name: "Derya Aydın", title: "Operasyon Yöneticisi", img: "/ekip/Derya AYDIN.png", color: "#2ECC71", bg: "#ECFBF2" },
    { name: "Dr. Kaan Mert Güven", title: "Tıp Doktoru & Öğrenme Deneyimi Tasarımcısı", img: "/ekip/Dr.Kaan Mert GÜVEN.png", color: "#F5C518", bg: "#FFFBEB" },
    { name: "Kübra Demirci", title: "Eğitsel İçerik & E-Öğrenme Tasarımcısı", img: "/ekip/Kübra DEMİRCİ.png", color: "#7F63CB", bg: "#F0EDF9" },
    { name: "Sayid Özcan", title: "Eğitim Teknolojileri Yöneticisi", img: "/ekip/Sayid ÖZCAN.png", color: "#EE7A45", bg: "#FEF5F0" },
    { name: "Buse Aksoy", title: "Psikolog & E-Öğrenme Tasarımcısı", img: "/ekip/Buse AKSOY.png", color: "#1B3A7B", bg: "#EBF2FB" },
  ];
  const rawMembers = d.members || d.items;
  const members = rawMembers?.length ? rawMembers.map((item: any, i: number) => ({
    name: item.name || item.title || "",
    title: item.role || item.description || "",
    img: item.img || item.image || defaultMembers[i]?.img || "",
    color: teamColors[i % teamColors.length].color,
    bg: teamColors[i % teamColors.length].bg,
  })) : defaultMembers;

  return (
    <Section>
      <section className="py-24 bg-[#ECFBF2] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute top-16 right-[10%] w-72 h-72 bg-[#2ECC71]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-[8%] w-60 h-60 bg-[#1B3A7B]/8 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-mint-100 text-mint-700 mb-4"><Users className="w-3.5 h-3.5" /> {d.tag || "EKİBİMİZ"}</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: teamTitle }} />
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              {teamDesc}
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
function Testimonials({ data }: { data?: any }) {
  const d = data || {};
  const testTitle = d.title || 'Hakkımızda <span class="text-gradient">ne dediler?</span>';
  const testColors = ["bg-[#1B3A7B]", "bg-[#2ECC71]", "bg-[#F5C518]", "bg-[#4D7EC4]"];
  const getInitials = (name: string) => name.split(" ").filter(Boolean).map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const defaultItems = [
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
  const items = d.items?.length ? d.items.map((item: any, i: number) => ({
    name: item.name || "",
    role: item.role || "",
    initials: getInitials(item.name || ""),
    color: testColors[i % testColors.length],
    quote: item.quote || item.description || "",
  })) : defaultItems;

  return (
    <Section>
      <section id="testimonials" className="py-24 bg-[#E8F4FD] relative overflow-hidden">
        <div className="absolute top-16 left-[5%] w-64 h-64 bg-brand-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[10%] w-52 h-52 bg-gold-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 dots-pattern opacity-[0.05]" />
        <div className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14 px-6">
            <div className="anim"><span className="tag bg-gold-100 text-gold-700 mb-4"><Heart className="w-3.5 h-3.5" /> {d.tag || "REFERANSLAR"}</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: testTitle }} />
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
function FAQ({ data }: { data?: any }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const d = data || {};
  const faqTitle = d.title || 'Sıkça Sorulan <span class="highlight">Sorular</span>';
  const defaultFaqItems = [
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
  const items: typeof defaultFaqItems = d.items?.length ? d.items.map((item: any) => ({
    q: item.q || item.question || "",
    a: item.a || item.answer || "",
  })) : defaultFaqItems;

  return (
    <Section>
      <section id="faq" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-10 left-[8%] w-60 h-60 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[10%] w-52 h-52 bg-gold-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="anim"><span className="tag bg-peach-100 text-peach-700 mb-4"><MessageCircle className="w-3.5 h-3.5" /> {d.tag || "SSS"}</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: faqTitle }} />
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
function ImpactBanner({ data }: { data?: any }) {
  const d = data || {};
  const ibTitle = d.title || 'Çocuğunuzun sosyal ve duygusal becerilerde <span class="highlight">zorlandığını</span> fark ediyor musunuz?';
  const ibDesc = d.description || "Uzman ekibimizle, çocuğunuzun duygusal zeka, iletişim, stres yönetimi, özgüven ve liderlik gibi becerilerini geliştiriyoruz. Çocuğunuzun gelişimi için ilk adımı bugün atın!";
  const ibCta = d.cta || { label: "Ücretsiz Web Seminerine Kaydolun", href: "/demo" };
  return (
    <Section>
      <section className="py-20 bg-[#FFFBEB] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.12]" />
        <div className="absolute top-16 right-[8%] w-60 h-60 bg-gold-200/35 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[12%] w-52 h-52 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h2 className="anim font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 mb-3 tracking-tight" dangerouslySetInnerHTML={{ __html: ibTitle }} />
          <p className="anim d1 text-slate-500 text-[0.95rem] leading-relaxed max-w-2xl mx-auto mb-7">
            {ibDesc}
          </p>
          <a href={ibCta.href || "/demo"} className="anim d2 btn-3d btn-3d-brand">{ibCta.label || "Ücretsiz Web Seminerine Kaydolun"} <ArrowRight className="w-5 h-5" /></a>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   MANIFESTO — Neden Biz?
   ═══════════════════════════════════════ */
function Manifesto({ data }: { data?: any }) {
  const [activeTab, setActiveTab] = useState(0);
  const md = data || {};
  const mfTitle = md.title || 'Bütünsel bir müfredatla, çocuğunuzu <span class="text-gradient">yaşam becerileriyle</span> güçlendiriyoruz.';
  const defaultTabs = [
    { label: "Neden Önemli?", color: "#1B3A7B", bg: "#EBF2FB", accent: "#4D7EC4", content: "Her anne baba gibi biz de çocuklarımızın iyi okullarda okuyup yüksek notlar almasını isteriz. Ama bir noktada fark ederiz: Hayat sadece sınavlardan ibaret değildir.\n\nZor bir duygu yaşadıklarında, kendilerini yalnız hissettiklerinde ya da bir krizle karşılaştıklarında, çocuklarımızın karşısına çıkan şey bir test değil — hayatın ta kendisidir.\n\nO anlarda onları ayakta tutacak şey; sadece bilgi değil, özgüven, empati, farkındalık ve duygusal dayanıklılık olacaktır." },
    { label: "Mevcut Durum", color: "#F5C518", bg: "#FFFBEB", accent: "#FFDF66", content: "Bugün Türkiye'de bu becerilere dair hâlâ sistemli, uygulanabilir ve sürdürülebilir bir eğitim modeli yok. Duygusal gelişim, ne yazık ki birçok okulda hâlâ \"ekstra\" bir konu olarak görülüyor.\n\nGeleceğin başarılı insanı, sadece akademik olarak donanımlı değil; aynı zamanda duygusal olarak güçlü, iletişim becerileri yüksek ve zor zamanlarda dirençli birey olacaktır." },
    { label: "Çözümümüz", color: "#2ECC71", bg: "#ECFBF2", accent: "#69DC9A", content: "Ve biz diyoruz ki: Bu beceriler her çocuğun ve gencin hakkıdır. LearnecoHub olarak, bu eksik halkayı tamamlayan bütünsel bir öğrenme müfredatı sunuyoruz.\n\n• Sosyal-duygusal becerilere dayalı sadeleştirilmiş müfredat\n• Okullara özel içerik ve öğretmen destek sistemi\n• Uzman tutorlar eşliğinde bireysel ve grup uygulamaları\n• Ölçme-değerlendirme ve gelişim takibi\n• Ailelere özel rehberlik ve ev destek araçları" },
    { label: "Vizyonumuz", color: "#7F63CB", bg: "#F0EDF9", accent: "#9F8AD8", content: "Çocukların hem okulda hem evde ulaşabileceği, bilimsel temelli ve kolay uygulanabilir bir sosyal-duygusal öğrenme müfredatı oluşturduk.\n\nAmacımız: Çocuklara yalnızca bilgi değil, yaşamı taşıyacak beceriler kazandırmak.\n\nBugünün çocukları sınavlara hazırlanıyor… Ama biz onları hayata hazırlıyoruz." },
  ];
  const tabIcons = [Heart, TrendingUp, Sparkles, Rocket];
  const tabColorDefaults = [
    { color: "#1B3A7B", bg: "#EBF2FB", accent: "#4D7EC4" },
    { color: "#F5C518", bg: "#FFFBEB", accent: "#FFDF66" },
    { color: "#2ECC71", bg: "#ECFBF2", accent: "#69DC9A" },
    { color: "#7F63CB", bg: "#F0EDF9", accent: "#9F8AD8" },
  ];
  const tabsData = md.tabs?.length ? md.tabs.map((t: any, i: number) => ({
    icon: tabIcons[i % tabIcons.length],
    label: t.label || defaultTabs[i]?.label || "",
    color: tabColorDefaults[i % tabColorDefaults.length].color,
    bg: tabColorDefaults[i % tabColorDefaults.length].bg,
    accent: tabColorDefaults[i % tabColorDefaults.length].accent,
    content: t.content || defaultTabs[i]?.content || "",
  })) : defaultTabs.map((t, i) => ({ ...t, icon: tabIcons[i] }));

  const tabs = tabsData.map((t: any) => ({
    ...t,
    renderedContent: (
      <div className="space-y-4">
        {(t.content as string).split("\n").filter(Boolean).map((line: string, j: number) => {
          if (line.startsWith("• ") || line.startsWith("- ")) {
            return (
              <div key={j} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#ECFBF2] border border-[#A3EBC1]/40">
                <CircleCheck className="w-4.5 h-4.5 text-[#2ECC71] flex-shrink-0 mt-0.5" />
                <span className="text-[0.85rem] text-slate-700 font-medium leading-snug">{line.slice(2)}</span>
              </div>
            );
          }
          return <p key={j} className="text-[1.05rem] text-slate-700 leading-[1.9] font-medium">{line}</p>;
        })}
      </div>
    ),
  }));

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
            <div className="anim"><span className="tag bg-brand-100 text-brand-700 mb-4"><Heart className="w-3.5 h-3.5" /> {md.tag || "MİSYONUMUZ"}</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 tracking-tight leading-[1.12]" dangerouslySetInnerHTML={{ __html: mfTitle }} />
          </div>

          {/* Tabs */}
          <div className="anim d2">
            {/* Tab buttons */}
            <div className="flex justify-start sm:justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 scrollbar-hide">
              {tabs.map((t: any, i: number) => {
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
                {tabs.map((t: any, i: number) => (
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
                  {tabs[activeTab].renderedContent}
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
function FinalCTA({ data }: { data?: any }) {
  const d = data || {};
  const ctaTitle = d.title || 'Size nasıl <span class="text-[#F5C518]">yardımcı</span> olabiliriz?';
  const ctaDesc = d.description || "Akademik başarıyı artıran, sosyal-duygusal becerileri güçlendiren bilimsel yöntemlerimizi keşfedin. Çocuğunuzu en iyi nasıl destekleyebileceğinizi öğrenin.";
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
                <img src={d.logo || "/logo.png"} alt="LearnecoHub" className="h-8 w-auto brightness-0 invert" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: ctaTitle }} />
              <p className="text-slate-400 text-[0.95rem] leading-relaxed max-w-xl mx-auto mb-9">
                {ctaDesc}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-7">
                <a href={d.cta?.href || "/iletisim"} className="btn-3d btn-3d-mint text-base">{d.cta?.label || "Hemen Başla"} <ArrowRight className="w-5 h-5" /></a>
                <a href={d.phone?.href || "tel:+908503023600"} className="btn-3d btn-3d-gold text-base">
                  <Phone className="w-4 h-4" /> {d.phone?.label || "0850 302 36 00"}
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-5 text-[0.78rem] text-white/40">
                {(d.badges?.length ? d.badges : ["Ücretsiz başlangıç", "Kredi kartı gerekmiyor", "Anında erişim"]).map((t: any, i: number) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2ECC71]" />{typeof t === "string" ? t : t.text || t}
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
function Footer({ data }: { data?: any }) {
  const f = data || {};
  const logo = f.logo || "/logo.png";
  const desc = f.description || "Çocuklar ve gençler için sosyal becerileri öğrenmenin en kolay yolu. Hazırlık gerekmeden hemen kullanabileceğiniz dijital müfredat.";
  const socials = f.socials?.length ? f.socials : [
    { platform: "facebook", href: "https://www.facebook.com/learnecohub" },
    { platform: "instagram", href: "https://www.instagram.com/learnecohub" },
    { platform: "youtube", href: "https://www.youtube.com/@learnecohub" },
    { platform: "linkedin", href: "https://www.linkedin.com/company/learnecohub" },
  ];
  const socialIconMap: Record<string, any> = { facebook: Facebook, instagram: Instagram, youtube: Youtube, linkedin: Linkedin };
  const menuTitle = f.menuTitle || "Site Menü";
  const menuLinks = f.menuLinks?.length ? f.menuLinks : [
    { label: "Ana Sayfa", href: "/" },
    { label: "Misyonumuz", href: "/misyonumuz" },
    { label: "Ekibimiz", href: "/ekibimiz" },
    { label: "Platform", href: "/platform" },
    { label: "Blog", href: "/blog" },
    { label: "SSS", href: "/sss" },
    { label: "İletişim", href: "/iletisim" },
  ];
  const col2Title = f.col2Title || "Çözümlerimiz";
  const col2Links = f.col2Links?.length ? f.col2Links : [
    { label: "Aileler İçin", href: "/aileler-icin" },
    { label: "Profesyoneller İçin", href: "/profesyoneller-icin" },
    { label: "Okullar İçin", href: "/okullar-icin" },
    { label: "Kurumlar İçin", href: "/kurumlar-icin" },
    { label: "Başarı Hikayeleri", href: "/basari-hikayeleri" },
  ];
  const companyName = f.companyName || "Learneco Eğitim ve Danışmanlık";
  const address = f.address || "İstanbul, Başakşehir";
  const phone = f.phone || "0850 302 36 00";
  const phoneHref = f.phoneHref || "tel:+908503023600";
  const email = f.email || "info@learnecohub.com";
  const hours = f.hours || "Pazartesi - Pazar / 09.00 - 21.00";
  const copyright = f.copyright || `© ${new Date().getFullYear()} LearnecoHub. Tüm hakları saklıdır.`;
  const legalLinks = f.legalLinks?.length ? f.legalLinks : [
    { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
    { label: "Kullanım Şartları", href: "/kullanim-sartlari" },
    { label: "KVKK", href: "/kvkk" },
  ];
  return (
    <footer className="bg-[#1A1A2E] text-white/50 pt-16 pb-8 relative footer-glow">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="LearnecoHub" className="h-9 w-auto" />
            </a>
            <p className="text-[0.82rem] leading-relaxed max-w-xs mb-5">{desc}</p>
            <div className="flex items-center gap-2.5">
              {socials.map((s: any, i: number) => {
                const SIcon = socialIconMap[s.platform] || Globe;
                return (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/30 hover:bg-[#F5C518]/15 hover:text-[#F5C518] hover:border-[#F5C518]/30 transition-all">
                    <SIcon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-[0.82rem] text-white mb-4 tracking-wide">{menuTitle}</h4>
            <ul className="space-y-2.5">
              {menuLinks.map((l: any, j: number) => (
                <li key={j}><a href={l.href} className="text-[0.8rem] hover:text-[#F5C518] transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-[0.82rem] text-white mb-4 tracking-wide">{col2Title}</h4>
            <ul className="space-y-2.5">
              {col2Links.map((l: any, j: number) => (
                <li key={j}><a href={l.href} className="text-[0.8rem] hover:text-[#F5C518] transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-[0.82rem] text-white mb-4 tracking-wide">{companyName}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" />
                <span className="text-[0.8rem]">{address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" />
                <a href={phoneHref} className="text-[0.8rem] hover:text-[#F5C518] transition-colors">{phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" />
                <a href={`mailto:${email}`} className="text-[0.8rem] hover:text-[#F5C518] transition-colors">{email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" />
                <span className="text-[0.8rem]">{hours}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/8 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[0.72rem] text-white/25">{copyright}</p>
          <div className="flex items-center gap-5 text-[0.72rem] text-white/25">
            {legalLinks.map((l: any, i: number) => (
              <a key={i} href={l.href} className="hover:text-white/50 transition-colors">{l.label}</a>
            ))}
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
  const [sd, setSd] = useState<Record<string, any>>({});
  const [ready, setReady] = useState(false);
  const menuItems = useMenuData();
  useEffect(() => {
    fetch(`/api/pages/anasayfa?t=${Date.now()}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (!data?.sections) return;
        const map: Record<string, any> = {};
        data.sections.forEach((s: any) => {
          // Use first occurrence of each sectionType (some might have duplicates)
          if (!map[s.sectionType]) {
            try { map[s.sectionType] = JSON.parse(s.content); } catch { map[s.sectionType] = {}; }
          }
        });
        setSd(map);
        setReady(true);
      })
      .catch(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-44 h-44 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #F5C518 0%, #1B3A7B 60%, transparent 70%)", animation: "loadPulse 2s ease-in-out infinite" }} />
          <div className="absolute w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #F5C518 0%, transparent 70%)", animation: "loadPulse 2s ease-in-out infinite 0.3s" }} />
          <img src="/logo.png" alt="LearnecoHub" className="relative w-28 h-auto drop-shadow-sm" style={{ animation: "loadBreathe 2s ease-in-out infinite" }} />
        </div>
        <div className="flex gap-1.5 mt-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full" style={{ background: i === 1 ? "#F5C518" : "#1B3A7B", animation: `loadDot 1.4s ease-in-out ${i * 0.16}s infinite` }} />
          ))}
        </div>
        <style>{`
          @keyframes loadBreathe { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.06); opacity: 0.85; } }
          @keyframes loadPulse { 0%, 100% { transform: scale(0.8); opacity: 0.15; } 50% { transform: scale(1.2); opacity: 0.3; } }
          @keyframes loadDot { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; } }
        `}</style>
      </div>
    );
  }

  return (
    <main>
      <Navbar menuItems={menuItems} />
      <Hero data={sd.hero} menuItems={menuItems} />
      <Stats data={sd.stats} />
      <CloudDivider />
      <YoutubeShowcase data={sd.youtube_showcase} />
      <Materials data={sd.materials_scroll || sd.materials} />
      <CloudDivider />
      <FreeBanner data={sd.free_banner} />
      <PianoShowcase data={sd.piano_showcase} />
      <VideoShowcase data={sd.video_showcase} />
      <CloudDivider />
      <LearningSteps data={sd.learning_steps} />
      <LearningMap data={sd.learning_map} />
      <CloudDivider />
      <Pricing data={sd.pricing} />
      <Manifesto data={sd.manifesto} />
      <Team data={sd.team || sd.team_grid} />
      <CloudDivider />
      <ImpactBanner data={sd.impact_banner} />
      <Testimonials data={sd.testimonials} />
      <FAQ data={sd.faq || sd.faq_parents} />
      <FinalCTA data={sd.final_cta} />
      <Footer data={sd.footer} />
    </main>
  );
}
