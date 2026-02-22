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
  const notes = [
    { icon: BookOpen, color: "#1B3A7B", bg: "#EBF2FB", title: "Hazır Müfredat", text: "Yaşa özel yapılandırılmış, 100+ beceriyi kapsayan hazır müfredat. Sıfır hazırlıkla hemen uygulayın.", rotate: "-2deg" },
    { icon: Layers, color: "#2ECC71", bg: "#ECFBF2", title: "Modüler Sistem", text: "Her beceri için video + oyun + etkinlik + ölçme aracı içeren kapsamlı modüler yapı.", rotate: "1.5deg" },
    { icon: GraduationCap, color: "#7F63CB", bg: "#F0EDF9", title: "Uygulama Rehberleri", text: "Öğretmen ve psikolojik danışmanlar için adım adım uygulama rehberleri.", rotate: "-1deg" },
    { icon: Award, color: "#F5C518", bg: "#FFFBEB", title: "Dijital Portfolyo", text: "Dijital gelişim portfolyösü ve rozet sistemi ile kurumsal raporlama imkanı.", rotate: "2deg" },
    { icon: Monitor, color: "#EE7A45", bg: "#FEF5F0", title: "Yönetici Paneli", text: "Öğrencilerin gelişimini anlık takip edebileceğiniz yönetici ve öğretmen paneli.", rotate: "-1.5deg" },
  ];

  return (
    <Section>
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-mint-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-6">
            <div className="anim">
              <span className="tag bg-brand-100 text-brand-700 mb-4">
                <GraduationCap className="w-3.5 h-3.5" /> OKULLAR İÇİN
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Fark Yaratmak İsteyen{" "}
              <span className="text-gradient">Okullar İçin</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Bugünün öğrencileri sadece bilgiye değil; duygularını tanımaya, ilişki kurmaya ve zor anlarda çözüm üretmeye de ihtiyaç duyuyor.
            </p>
          </div>

          {/* Big description card — clipboard style */}
          <div className="anim d2 max-w-2xl mx-auto mb-16">
            <div className="relative bg-[#FAFAF8] rounded-2xl border border-slate-200 shadow-md pt-0 overflow-visible">
              {/* Clipboard clip */}
              <div className="flex justify-center -mt-4 relative z-20">
                <div className="w-20 h-8 rounded-b-xl bg-slate-400 border-2 border-slate-500 shadow-sm flex items-end justify-center pb-1">
                  <div className="w-10 h-1.5 rounded-full bg-slate-300" />
                </div>
              </div>
              <div className="px-8 py-6">
                <p className="text-[0.95rem] text-slate-600 leading-[1.85] mb-2">
                  Hiçbir hazırlık gerektirmeden hemen uygulayabileceğiniz müfredatımızla, <span className="font-bold text-slate-800">100&apos;den fazla sosyal-duygusal beceriyi</span> öğrencilerinizde adım adım geliştirin.
                </p>
              </div>
            </div>
          </div>

          {/* Sticky notes board */}
          <div
            className="relative rounded-3xl p-8 sm:p-10 lg:p-12"
            style={{
              background: "linear-gradient(145deg, #f5f0e8 0%, #ebe4d8 100%)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            {/* Subtle cork texture dots */}
            <div className="absolute inset-0 rounded-3xl opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)", backgroundSize: "12px 12px" }} />

            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {notes.map((n, i) => (
                <div
                  key={i}
                  className={`anim d${Math.min(i + 1, 5)} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                  style={{ transform: `rotate(${n.rotate})` }}
                >
                  <div
                    className="relative rounded-sm p-6 min-h-[180px]"
                    style={{
                      background: n.bg,
                      boxShadow: "3px 4px 12px rgba(0,0,0,0.1), 1px 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Tape strip at top */}
                    <div
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm opacity-60"
                      style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(240,235,220,0.5) 100%)",
                        border: "1px solid rgba(0,0,0,0.06)",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                      }}
                    />

                    {/* Folded corner */}
                    <div
                      className="absolute bottom-0 right-0 w-6 h-6"
                      style={{
                        background: `linear-gradient(135deg, ${n.bg} 50%, transparent 50%)`,
                        filter: "brightness(0.92)",
                        borderTopLeftRadius: "4px",
                      }}
                    />

                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: n.color + "18" }}>
                      <n.icon className="w-5 h-5" style={{ color: n.color }} />
                    </div>

                    {/* Title */}
                    <h4 className="font-display text-[0.95rem] font-extrabold mb-2 leading-tight" style={{ color: n.color }}>
                      {n.title}
                    </h4>

                    {/* Text */}
                    <p className="text-[0.82rem] text-slate-500 leading-relaxed">
                      {n.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a href="/contact" className="anim d6 btn-3d btn-3d-brand inline-flex">
              Okulunuz İçin Bilgi Alın <ArrowRight className="w-5 h-5" />
            </a>
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

          {/* Sticky notes board */}
          <div
            className="relative rounded-3xl p-8 sm:p-10 lg:p-12"
            style={{
              background: "linear-gradient(145deg, #f5f0e8 0%, #ebe4d8 100%)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <div className="absolute inset-0 rounded-3xl opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)", backgroundSize: "12px 12px" }} />
            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {features.map((f, j) => {
                const rotations = ["-1.5deg", "2deg", "-1deg", "1.5deg", "-2deg", "1deg", "-1.5deg"];
                return (
                  <div
                    key={j}
                    className={`anim d${Math.min(j + 1, 6)} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                    style={{ transform: `rotate(${rotations[j]})` }}
                  >
                    <div
                      className="relative rounded-sm p-6 min-h-[140px]"
                      style={{
                        background: f.bg,
                        boxShadow: "3px 4px 12px rgba(0,0,0,0.1), 1px 1px 3px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm opacity-60" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(240,235,220,0.5) 100%)", border: "1px solid rgba(0,0,0,0.06)" }} />
                      <div className="absolute bottom-0 right-0 w-6 h-6" style={{ background: `linear-gradient(135deg, ${f.bg} 50%, transparent 50%)`, filter: "brightness(0.92)" }} />
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: f.color + "18" }}>
                        <f.icon className="w-5 h-5" style={{ color: f.color }} />
                      </div>
                      <p className="text-[0.84rem] text-slate-600 font-medium leading-relaxed">{f.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-10">
            <a href="/contact" className="btn-3d btn-3d-mint inline-flex">
              Aileniz {"\u0130\u00E7"}in Ba{"\u015F"}lay{"\u0131"}n <ArrowRight className="w-5 h-5" />
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
  const allFeatures = [
    { icon: Shield, color: "#1B3A7B", bg: "#EBF2FB", text: "Kuruma \u00F6zel uyarlanm\u0131\u015F, \u00E7al\u0131\u015Fan \u00E7ocuklar\u0131na y\u00F6nelik sosyal-duygusal geli\u015Fim m\u00FCfredatlar\u0131", rotate: "-1.5deg" },
    { icon: Heart, color: "#2ECC71", bg: "#ECFBF2", text: "Aile dostu kurum k\u00FClt\u00FCr\u00FCn\u00FC destekleyen s\u00FCrd\u00FCr\u00FClebilir i\u00E7erikler", rotate: "2deg" },
    { icon: Globe, color: "#7F63CB", bg: "#F0EDF9", text: "Sosyal sorumluluk ve s\u00FCrd\u00FCr\u00FClebilirlik hedeflerine hizmet eden projeler", rotate: "-1deg" },
    { icon: Award, color: "#F5C518", bg: "#FFFBEB", text: "Kurum \u00E7al\u0131\u015Fan \u00E7ocuklar\u0131na \u00F6zel dijital geli\u015Fim raporlar\u0131 ve rozet sistemi", rotate: "1.5deg" },
    { icon: TrendingUp, color: "#EE7A45", bg: "#FEF5F0", text: "\u00C7al\u0131\u015Fan memnuniyeti ve ba\u011Fl\u0131l\u0131\u011F\u0131nda art\u0131\u015F", rotate: "-2deg" },
    { icon: Sparkles, color: "#1B3A7B", bg: "#EBF2FB", text: "\u0130\u015Fveren markas\u0131na g\u00FC\u00E7l\u00FC katk\u0131 sa\u011Flayan projeler", rotate: "1deg" },
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
                <Globe className="w-3.5 h-3.5" /> KURUMLAR {"\u0130\u00C7\u0130"}N
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Toplumsal Etki Yaratan{" "}
              <span className="text-gradient">Kurumlar {"\u0130\u00E7"}in</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed max-w-2xl mx-auto">
              LearnecoHub olarak, kurumsal {"\u015F"}irketlerle i{"\u015F"} birli{"\u011F"}i yap{"\u0131"}yor; hem {"\u00E7"}al{"\u0131\u015F"}anlar{"\u0131"}n {"\u00E7"}ocuklar{"\u0131"}n{"\u0131"}n sosyal-duygusal geli{"\u015F"}imini destekliyor, hem de markalar{"\u0131"}n s{"\u00FC"}rd{"\u00FC"}r{"\u00FC"}lebilirlik hedeflerine de{"\u011F"}er kat{"\u0131"}yoruz.
            </p>
          </div>

          {/* Sticky notes board */}
          <div
            className="relative rounded-3xl p-8 sm:p-10 lg:p-12"
            style={{
              background: "linear-gradient(145deg, #f5f0e8 0%, #ebe4d8 100%)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <div className="absolute inset-0 rounded-3xl opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)", backgroundSize: "12px 12px" }} />
            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {allFeatures.map((f, i) => (
                <div
                  key={i}
                  className={`anim d${Math.min(i + 1, 6)} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                  style={{ transform: `rotate(${f.rotate})` }}
                >
                  <div
                    className="relative rounded-sm p-6 min-h-[140px]"
                    style={{
                      background: f.bg,
                      boxShadow: "3px 4px 12px rgba(0,0,0,0.1), 1px 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm opacity-60" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(240,235,220,0.5) 100%)", border: "1px solid rgba(0,0,0,0.06)" }} />
                    <div className="absolute bottom-0 right-0 w-6 h-6" style={{ background: `linear-gradient(135deg, ${f.bg} 50%, transparent 50%)`, filter: "brightness(0.92)" }} />
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: f.color + "18" }}>
                      <f.icon className="w-5 h-5" style={{ color: f.color }} />
                    </div>
                    <p className="text-[0.84rem] text-slate-600 font-medium leading-relaxed">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <a href="/contact" className="btn-3d btn-3d-brand inline-flex">
              Kurumsal {"\u0130\u015F"} Birli{"\u011F"}i {"\u0130\u00E7"}in {"\u0130"}leti{"\u015F"}ime Ge{"\u00E7"}in <ArrowRight className="w-5 h-5" />
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
