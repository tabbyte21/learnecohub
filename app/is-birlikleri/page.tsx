"use client";

import {
  Section, SubpageNavbar, SubpageHero, FinalCTA, SubpageFooter,
} from "@/components/subpage-shared";
import {
  Globe, GraduationCap, Heart, BookOpen, Layers, Award, Monitor,
  ArrowRight, Star, Shield, TrendingUp, Sparkles, Video, Target,
  Users, BarChart3, Gamepad2,
} from "lucide-react";

/* ═══════════════════════════════════════
   SCHOOLS SEGMENT
   ═══════════════════════════════════════ */
function SchoolsSegment() {
  const features = [
    { icon: BookOpen, color: "#1B3A7B", bg: "#EBF2FB", text: "Ya\u015Fa \u00F6zel yap\u0131land\u0131r\u0131lm\u0131\u015F, 100+ beceriyi kapsayan haz\u0131r m\u00FCfredat" },
    { icon: Layers, color: "#2ECC71", bg: "#ECFBF2", text: "Her beceri i\u00E7in video + oyun + etkinlik + \u00F6l\u00E7me arac\u0131 i\u00E7eren mod\u00FCler sistem" },
    { icon: GraduationCap, color: "#7F63CB", bg: "#F0EDF9", text: "\u00D6\u011Fretmen ve psikolojik dan\u0131\u015Fmanlar i\u00E7in uygulama rehberleri" },
    { icon: Award, color: "#F5C518", bg: "#FFFBEB", text: "Dijital geli\u015Fim portf\u00F6y\u00FC ve rozet sistemi + kurumsal raporlama" },
    { icon: Monitor, color: "#EE7A45", bg: "#FEF5F0", text: "\u00D6\u011Frencilerin geli\u015Fimini anl\u0131k takip edebilece\u011Finiz y\u00F6netici ve \u00F6\u011Fretmen paneli" },
  ];

  return (
    <Section>
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-mint-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-brand-100 text-brand-700 mb-4">
                <GraduationCap className="w-3.5 h-3.5" /> OKULLAR İÇİN
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Fark Yaratmak İsteyen{" "}
              <span className="text-gradient">Okullar İçin</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left — Description */}
            <div className="anim d2 space-y-5">
              <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                {"Bug\u00FCn\u00FCn \u00F6\u011Frencileri sadece bilgiye de\u011Fil; duygular\u0131n\u0131 tan\u0131maya, ili\u015Fki kurmaya ve zor anlarda \u00E7\u00F6z\u00FCm \u00FCretmeye de ihtiya\u00E7 duyuyor. Ancak mevcut akademik m\u00FCfredatlar bu beceriler i\u00E7in yeterli de\u011Fil."}
              </p>
              <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                {"Hi\u00E7bir haz\u0131rl\u0131k gerektirmeden hemen uygulayabilece\u011Finiz m\u00FCfredat\u0131m\u0131zla, 100\u2019den fazla sosyal-duygusal beceriyi \u00F6\u011Frencilerinizde ad\u0131m ad\u0131m geli\u015Ftirin."}
              </p>
              <a href="/contact" className="btn-3d btn-3d-brand inline-flex">
                Okulunuz İçin Bilgi Alın <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Right — Feature cards */}
            <div className="space-y-3">
              {features.map((f, i) => (
                <div key={i} className="anim card-3d card-3d-white p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: f.bg }}>
                    <f.icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <p className="text-[0.85rem] text-slate-600 font-medium leading-snug">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   FAMILIES SEGMENT
   ═══════════════════════════════════════ */
function FamiliesSegment() {
  const features = [
    { icon: BookOpen, color: "#1B3A7B", bg: "#EBF2FB", text: "100\u2019\u00FC a\u015Fk\u0131n sosyal ve duygusal beceri kazand\u0131ran bilimsel geli\u015Fim m\u00FCfredat\u0131" },
    { icon: Video, color: "#2ECC71", bg: "#ECFBF2", text: "Animasyonlar ve dijital oyunlarla desteklenen yeni nesil \u00F6\u011Frenme deneyimi" },
    { icon: Target, color: "#F5C518", bg: "#FFFBEB", text: "Her hafta farkl\u0131 beceriye odaklanan tematik i\u00E7erikler" },
    { icon: Users, color: "#7F63CB", bg: "#F0EDF9", text: "10-12 ki\u015Filik canl\u0131 sosyal beceri grup dersleri ile akran \u00F6\u011Frenmesi" },
    { icon: Award, color: "#EE7A45", bg: "#FEF5F0", text: "Kazan\u0131lan her beceri i\u00E7in dijital rozet ve geli\u015Fim portf\u00F6y\u00FC" },
    { icon: BarChart3, color: "#1B3A7B", bg: "#EBF2FB", text: "Veli paneli \u00FCzerinden haftal\u0131k geli\u015Fim raporlar\u0131 ve rehber videolar" },
    { icon: Gamepad2, color: "#2ECC71", bg: "#ECFBF2", text: "Evde peki\u015Ftirme i\u00E7in g\u00FCnl\u00FCk ya\u015Famla entegre e\u011Fitici g\u00F6revler" },
  ];

  return (
    <Section>
      <section className="py-24 bg-[#ECFBF2] relative overflow-hidden">
        <div className="absolute top-16 right-[10%] w-60 h-60 bg-mint-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-[8%] w-56 h-56 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 dots-pattern opacity-[0.06]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-mint-100 text-mint-700 mb-4">
                <Heart className="w-3.5 h-3.5" /> AİLELER İÇİN
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Çocuğu İçin Sadece Not Değil,{" "}
              <span className="highlight">Gelecek İsteyen Ailelere</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Yalnızca akademik başarıyla yetinmeyen, çocuğu için güçlü bir gelecek planlamak isteyen ailelere yol arkadaşlığı yapıyoruz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, j) => (
              <div key={j} className={`anim d${Math.min(j + 1, 6)} card-3d card-3d-white p-5`}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: f.bg }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <p className="text-[0.85rem] text-slate-600 font-medium leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/contact" className="btn-3d btn-3d-mint inline-flex">
              Aileniz İçin Başlayın <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   CORPORATE SEGMENT
   ═══════════════════════════════════════ */
function CorporateSegment() {
  const leftFeatures = [
    { icon: Shield, color: "#1B3A7B", text: "Kuruma özel uyarlanmış, çalışan çocuklarına yönelik sosyal-duygusal gelişim müfredatları" },
    { icon: Heart, color: "#2ECC71", text: "Aile dostu kurum kültürünü destekleyen sürdürülebilir içerikler" },
    { icon: Globe, color: "#7F63CB", text: "Sosyal sorumluluk ve sürdürülebilirlik hedeflerine hizmet eden projeler" },
  ];

  const rightFeatures = [
    { icon: Award, color: "#F5C518", text: "Kurum çalışan çocuklarına özel dijital gelişim raporları ve rozet sistemi" },
    { icon: TrendingUp, color: "#EE7A45", text: "Çalışan memnuniyeti ve bağlılığında artış" },
    { icon: Sparkles, color: "#1B3A7B", text: "İşveren markasına güçlü katkı sağlayan projeler" },
  ];

  return (
    <Section>
      <section className="py-24 bg-[#FFFBEB] relative overflow-hidden">
        <div className="absolute top-16 left-[10%] w-56 h-56 bg-gold-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-[5%] w-64 h-64 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-peach-100 text-peach-700 mb-4">
                <Globe className="w-3.5 h-3.5" /> KURUMLAR İÇİN
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Toplumsal Etki Yaratan{" "}
              <span className="text-gradient">Kurumlar İçin</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed max-w-2xl mx-auto">
              LearnecoHub olarak, kurumsal şirketlerle iş birliği yapıyor; hem çalışanların çocuklarının sosyal-duygusal gelişimini destekliyor, hem de markaların sürdürülebilirlik hedeflerine değer katıyoruz.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            {/* Left column */}
            <div className="space-y-4">
              {leftFeatures.map((f, i) => (
                <div key={i} className={`anim d${i + 1} rounded-xl bg-white border border-slate-200 p-4 flex items-start gap-3`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: f.color + "12" }}>
                    <f.icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <p className="text-[0.85rem] text-slate-600 font-medium leading-snug">{f.text}</p>
                </div>
              ))}
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {rightFeatures.map((f, i) => (
                <div key={i} className={`anim d${i + 4} rounded-xl bg-white border border-slate-200 p-4 flex items-start gap-3`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: f.color + "12" }}>
                    <f.icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <p className="text-[0.85rem] text-slate-600 font-medium leading-snug">{f.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <a href="/contact" className="btn-3d btn-3d-brand inline-flex">
              Kurumsal İş Birliği İçin İletişime Geçin <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   REFERENCE LOGOS BANNER
   ═══════════════════════════════════════ */
function ReferenceLogos() {
  const logos = [
    "Koç Holding", "Penta Teknoloji", "Başakşehir Living Lab", "Aygaz",
    "Limer", "Lüleburgaz Belediyesi", "Kocaeli Belediyesi", "YEKUV",
  ];

  return (
    <Section>
      <section className="py-20 bg-[#E8F4FD] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute top-10 right-[15%] w-48 h-48 bg-brand-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[10%] w-40 h-40 bg-gold-200/15 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="anim">
              <span className="tag bg-gold-100 text-gold-700 mb-4">
                <Star className="w-3.5 h-3.5" /> REFERANSLARIMIZ
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #E8F4FD, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #E8F4FD, transparent)" }} />
            <div className="overflow-hidden">
              <div className="ref-marquee-inner flex gap-10 w-max items-center py-4">
                {[...logos, ...logos].map((name, i) => (
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
    </Section>
  );
}

/* ═══════════════════════════════════════
   PAGE
   ═══════════════════════════════════════ */
export default function IsBirlikleriPage() {
  return (
    <main>
      {/* --- Navbar --- */}
      <SubpageNavbar active="İş Birlikleri" />

      {/* --- Hero --- */}
      <SubpageHero
        breadcrumb="İş Birlikleri"
        tag="İŞ BİRLİKLERİ"
        tagIcon={Globe}
        title="Birlikte daha güçlü,"
        titleHighlight="birlikte daha etkili."
        description="Okullar, aileler ve kurumlarla iş birliği yaparak çocukların sosyal-duygusal gelişimini birlikte destekliyoruz."
        theme="gold"
      />

      {/* --- Schools --- */}
      <SchoolsSegment />

      {/* --- Families --- */}
      <FamiliesSegment />

      {/* --- Corporate --- */}
      <CorporateSegment />

      {/* --- Reference Logos --- */}
      <ReferenceLogos />

      {/* --- Final CTA --- */}
      <FinalCTA />

      {/* --- Footer --- */}
      <SubpageFooter />
    </main>
  );
}
