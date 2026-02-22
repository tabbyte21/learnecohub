"use client";

import {
  Section, SubpageNavbar, SubpageHero, FinalCTA, SubpageFooter,
} from "@/components/subpage-shared";
import {
  Heart, CircleCheck, GraduationCap, PenTool, Users, TrendingUp,
  Layers, Quote,
} from "lucide-react";

/* ═══════════════════════════════════════
   HIKAYEMIZ PAGE
   ═══════════════════════════════════════ */
export default function HikayemizPage() {
  const teamMembers = [
    { name: "Dr. Melih Taha Aytep", title: "Psikiyatri / Tıp Doktoru & Kurucu", img: "/ekip/Dr.Melih Taha AYTEP.png", color: "#1B3A7B", bg: "#EBF2FB" },
    { name: "Derya Aydın", title: "Operasyon Yöneticisi", img: "/ekip/Derya AYDIN.png", color: "#2ECC71", bg: "#ECFBF2" },
    { name: "Dr. Kaan Mert Güven", title: "Tıp Doktoru & Öğrenme Deneyimi Tasarımcısı", img: "/ekip/Dr.Kaan Mert GÜVEN.png", color: "#F5C518", bg: "#FFFBEB" },
    { name: "Kübra Demirci", title: "Eğitsel İçerik & E-Öğrenme Tasarımcısı", img: "/ekip/Kübra DEMİRCİ.png", color: "#7F63CB", bg: "#F0EDF9" },
    { name: "Sayid Özcan", title: "Eğitim Teknolojileri Yöneticisi", img: "/ekip/Sayid ÖZCAN.png", color: "#EE7A45", bg: "#FEF5F0" },
    { name: "Buse Aksoy", title: "Psikolog & E-Öğrenme Tasarımcısı", img: "/ekip/Buse AKSOY.png", color: "#1B3A7B", bg: "#EBF2FB" },
  ];

  const checklist = [
    "Sosyal-duygusal becerilere dayalı sadeleştirilmiş müfredat",
    "Okullara özel içerik ve öğretmen destek sistemi",
    "Uzman tutorlar eşliğinde bireysel ve grup uygulamaları",
    "Ölçme-değerlendirme ve gelişim takibi",
    "Ailelere özel rehberlik ve ev destek araçları",
  ];

  return (
    <main>
      {/* ─── Navbar ─── */}
      <SubpageNavbar active="Hikayemiz" />

      {/* ─── Hero ─── */}
      <SubpageHero
        breadcrumb="Hikayemiz"
        tag="HİKAYEMİZ"
        tagIcon={Heart}
        title="Merhaba, bu bizim"
        titleHighlight="hikayemiz."
        description="Her anne baba gibi biz de çocuklarımızın iyi okullarda okuyup yüksek notlar almasını isteriz. Ama hayat sadece sınavlardan ibaret değildir."
        theme="brand"
      >
        <div className="card-3d card-3d-brand p-6 sm:p-7 max-w-md w-full flex-shrink-0">
          <Quote className="w-7 h-7 text-brand-300 mb-3 opacity-50" />
          <p className="font-display text-[1rem] sm:text-[1.1rem] font-bold text-slate-700 leading-relaxed">
            &ldquo;Bugünün çocukları sınavlara hazırlanıyor... Ama biz onları{" "}
            <span className="text-gradient font-extrabold">hayata hazırlıyoruz.</span>&rdquo;
          </p>
        </div>
      </SubpageHero>

      {/* ═══════════════════════════════════════
         STORY / MISSION SECTION — Sticky Board
         ═══════════════════════════════════════ */}
      <Section>
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-20 left-[5%] w-72 h-72 bg-brand-200/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-mint-200/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="anim">
                <span className="tag bg-brand-100 text-brand-700 mb-4">
                  <Heart className="w-3.5 h-3.5" /> MİSYONUMUZ
                </span>
              </div>
              <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
                {"\u00C7"}ocu{"\u011F"}unuzu{" "}
                <span className="highlight">ya{"\u015F"}am becerileriyle</span> g{"\u00FC\u00E7"}lendiriyoruz.
              </h2>
            </div>

            {/* Clipboard — Story */}
            <div className="anim d2 max-w-3xl mx-auto mb-14">
              <div className="relative bg-[#FAFAF8] rounded-2xl border border-slate-200 shadow-md overflow-visible">
                {/* Clipboard clip */}
                <div className="flex justify-center -mt-4 relative z-20">
                  <div className="w-20 h-8 rounded-b-xl bg-slate-400 border-2 border-slate-500 shadow-sm flex items-end justify-center pb-1">
                    <div className="w-10 h-1.5 rounded-full bg-slate-300" />
                  </div>
                </div>
                <div className="px-8 py-6 space-y-4">
                  <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                    {"\u00C7"}ocuklar{"\u0131"}m{"\u0131"}z{"\u0131"}n akademik ba{"\u015F"}ar{"\u0131"}s{"\u0131"} kadar, duygusal zekas{"\u0131"}, sosyal becerileri ve
                    ya{"\u015F"}am yetkinlikleri de en az o kadar {"\u00F6"}nemlidir. Ancak mevcut e{"\u011F"}itim sistemi,
                    bu becerileri yeterince destekleyecek ara{"\u00E7"}lardan yoksun.{" "}
                    <span className="font-bold text-slate-800">Biz bu bo{"\u015F"}lu{"\u011F"}u doldurmak i{"\u00E7"}in yola {"\u00E7\u0131"}kt{"\u0131"}k.</span>
                  </p>
                  <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                    Amac{"\u0131"}m{"\u0131"}z sadece bilgi aktarmak de{"\u011F"}il; {"\u00E7"}ocuklara hayat boyu
                    kullanabilecekleri sosyal-duygusal becerileri kazand{"\u0131"}rmakt{"\u0131"}r.{" "}
                    <span className="font-bold text-slate-800">E{"\u011F"}itimcilere, ailelere ve {"\u00F6\u011F"}rencilere g{"\u00FC\u00E7"} veren bir ekosistem in{"\u015F"}a ediyoruz.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky notes board — checklist */}
            <div
              className="relative rounded-3xl p-8 sm:p-10 lg:p-12"
              style={{
                background: "linear-gradient(145deg, #f5f0e8 0%, #ebe4d8 100%)",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              {/* Cork texture */}
              <div className="absolute inset-0 rounded-3xl opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)", backgroundSize: "12px 12px" }} />

              <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {[
                  { text: checklist[0], color: "#1B3A7B", bg: "#EBF2FB", rotate: "-1.5deg" },
                  { text: checklist[1], color: "#2ECC71", bg: "#ECFBF2", rotate: "2deg" },
                  { text: checklist[2], color: "#7F63CB", bg: "#F0EDF9", rotate: "-1deg" },
                  { text: checklist[3], color: "#F5C518", bg: "#FFFBEB", rotate: "1.5deg" },
                  { text: checklist[4], color: "#EE7A45", bg: "#FEF5F0", rotate: "-2deg" },
                ].map((n, i) => (
                  <div
                    key={i}
                    className={`anim d${i + 1} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                    style={{ transform: `rotate(${n.rotate})` }}
                  >
                    <div
                      className="relative rounded-sm p-6 min-h-[140px]"
                      style={{
                        background: n.bg,
                        boxShadow: "3px 4px 12px rgba(0,0,0,0.1), 1px 1px 3px rgba(0,0,0,0.05)",
                      }}
                    >
                      {/* Tape */}
                      <div
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm opacity-60"
                        style={{
                          background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(240,235,220,0.5) 100%)",
                          border: "1px solid rgba(0,0,0,0.06)",
                        }}
                      />
                      {/* Folded corner */}
                      <div
                        className="absolute bottom-0 right-0 w-6 h-6"
                        style={{
                          background: `linear-gradient(135deg, ${n.bg} 50%, transparent 50%)`,
                          filter: "brightness(0.92)",
                        }}
                      />
                      {/* Check icon */}
                      <CircleCheck className="w-6 h-6 mb-3" style={{ color: n.color }} />
                      {/* Text */}
                      <p className="text-[0.85rem] text-slate-600 font-medium leading-relaxed">
                        {n.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* ═══════════════════════════════════════
         EDUCATION APPROACH SECTION
         ═══════════════════════════════════════ */}
      <Section>
        <section className="py-24 bg-[#FFFBEB] relative overflow-hidden">
          <div className="absolute top-16 right-[10%] w-60 h-60 bg-gold-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-16 left-[8%] w-56 h-56 bg-brand-200/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 dots-pattern opacity-[0.06]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="anim">
                <span className="tag bg-gold-100 text-gold-700 mb-4">
                  <GraduationCap className="w-3.5 h-3.5" /> EĞİTİM YAKLAŞIMIMIZ
                </span>
              </div>
              <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
                Öğrenme; anlatılanların değil,{" "}
                <span className="highlight">yaşatılanların</span> izdir.
              </h2>
            </div>

            {/* Big Quote Card */}
            <div className="anim d2 card-3d card-3d-gold p-8 sm:p-10 mb-10 max-w-4xl mx-auto">
              <Quote className="w-8 h-8 text-gold-300 mb-4 opacity-50" />
              <p className="text-[1rem] sm:text-[1.05rem] text-slate-700 leading-[1.85] font-medium">
                Eğitimde en büyük değişim, öğrencinin pasif dinleyici olmaktan çıkıp aktif
                katılımcı olmasıyla başlar. Biz, çocukların yalnızca dinlemediği; deneyimlediği,
                hissettiği, keşfettiği ve ürettiği bir öğrenme ortamı tasarlıyoruz. Atölye
                temelli, oyunlaştırılmış ve deneyimsel yöntemlerle sosyal-duygusal becerileri
                kalıcı olarak kazandırıyoruz.
              </p>
            </div>

            {/* 3 Feature Cards — Sticky notes */}
            <div
              className="relative rounded-3xl p-8 sm:p-10"
              style={{
                background: "linear-gradient(145deg, #faf6ed 0%, #f0e9d8 100%)",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div className="absolute inset-0 rounded-3xl opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)", backgroundSize: "12px 12px" }} />
              <div className="relative z-10 grid sm:grid-cols-3 gap-7">
                {[
                  { icon: PenTool, title: "At\u00F6lye Temelli", desc: "At\u00F6lye temelli, oyunla\u015Ft\u0131r\u0131lm\u0131\u015F ve deneyimsel \u00F6\u011Frenme odakl\u0131 i\u00E7erikler.", color: "#1B3A7B", bg: "#EBF2FB", rotate: "-1.5deg" },
                  { icon: Users, title: "Tak\u0131m \u00C7al\u0131\u015Fmas\u0131", desc: "\u00C7ocuklar tak\u0131m \u00E7al\u0131\u015Fmas\u0131 yapar, fikir \u00FCretir, sunum becerisi kazan\u0131r.", color: "#2ECC71", bg: "#ECFBF2", rotate: "2deg" },
                  { icon: Heart, title: "Ya\u015Fam Becerileri", desc: "Stres y\u00F6netimi, ileti\u015Fim, \u00F6z \u015Fefkat, liderlik ve duygusal zeka becerileri.", color: "#7F63CB", bg: "#F0EDF9", rotate: "-1deg" },
                ].map((card, i) => (
                  <div
                    key={i}
                    className={`anim d${i + 1} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                    style={{ transform: `rotate(${card.rotate})` }}
                  >
                    <div
                      className="relative rounded-sm p-6 min-h-[180px]"
                      style={{
                        background: card.bg,
                        boxShadow: "3px 4px 12px rgba(0,0,0,0.1), 1px 1px 3px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm opacity-60"
                        style={{
                          background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(240,235,220,0.5) 100%)",
                          border: "1px solid rgba(0,0,0,0.06)",
                        }}
                      />
                      <div className="absolute bottom-0 right-0 w-6 h-6" style={{ background: `linear-gradient(135deg, ${card.bg} 50%, transparent 50%)`, filter: "brightness(0.92)" }} />
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: card.color + "18" }}>
                        <card.icon className="w-5 h-5" style={{ color: card.color }} />
                      </div>
                      <h4 className="font-display text-[0.95rem] font-extrabold mb-2 leading-tight" style={{ color: card.color }}>
                        {card.title}
                      </h4>
                      <p className="text-[0.82rem] text-slate-500 leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* ═══════════════════════════════════════
         IMPACT SECTION
         ═══════════════════════════════════════ */}
      <Section>
        <section className="py-24 bg-[#ECFBF2] relative overflow-hidden">
          <div className="absolute top-16 right-[10%] w-60 h-60 bg-mint-200/25 rounded-full blur-3xl" />
          <div className="absolute bottom-16 left-[8%] w-56 h-56 bg-brand-200/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="anim">
                <span className="tag bg-mint-100 text-mint-700 mb-4">
                  <TrendingUp className="w-3.5 h-3.5" /> ETKİMİZ
                </span>
              </div>
              <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
                Eğitimin kalbinde değer,{" "}
                <span className="text-gradient">gelişimin temelinde ilke.</span>
              </h2>
            </div>

            <div
              className="relative rounded-3xl p-8 sm:p-10"
              style={{
                background: "linear-gradient(145deg, #e8f5ee 0%, #d5ecdd 100%)",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05), 0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div className="absolute inset-0 rounded-3xl opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)", backgroundSize: "12px 12px" }} />
              <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Layers, color: "#1B3A7B", bg: "#EBF2FB", stat: "500+", label: "Dijital \u0130\u00E7erik", desc: "Her an, her yerde \u00F6\u011Fretmeye haz\u0131r olun.", rotate: "-1.5deg" },
                  { icon: Users, color: "#2ECC71", bg: "#ECFBF2", stat: "", label: "\u00D6\u011Frenci Merkezlilik", desc: "Her \u00F6\u011Frencinin potansiyeline sayg\u0131 duyan, ki\u015Fiselle\u015Ftirilmi\u015F \u00F6\u011Frenme f\u0131rsat\u0131.", rotate: "1deg" },
                  { icon: Heart, color: "#7F63CB", bg: "#F0EDF9", stat: "", label: "Tutku ve \u0130lham", desc: "Merak\u0131 g\u00FCd\u00FCleyen, \u00F6\u011Frenmeye heyecan katan i\u00E7erikler.", rotate: "-1deg" },
                  { icon: TrendingUp, color: "#F5C518", bg: "#FFFBEB", stat: "", label: "S\u00FCrekli Geli\u015Fim", desc: "Bilimsel yeniliklerle her zaman bir ad\u0131m \u00F6ndeyiz.", rotate: "1.5deg" },
                ].map((card, i) => (
                  <div
                    key={i}
                    className={`anim d${i + 1} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                    style={{ transform: `rotate(${card.rotate})` }}
                  >
                    <div
                      className="relative rounded-sm p-5 min-h-[160px] text-center"
                      style={{
                        background: card.bg,
                        boxShadow: "3px 4px 12px rgba(0,0,0,0.1), 1px 1px 3px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-5 rounded-sm opacity-60" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(240,235,220,0.5) 100%)", border: "1px solid rgba(0,0,0,0.06)" }} />
                      <div className="absolute bottom-0 right-0 w-5 h-5" style={{ background: `linear-gradient(135deg, ${card.bg} 50%, transparent 50%)`, filter: "brightness(0.92)" }} />
                      <card.icon className="w-6 h-6 mx-auto mb-2" style={{ color: card.color }} />
                      {card.stat && (
                        <p className="font-display text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: card.color }}>
                          {card.stat}
                        </p>
                      )}
                      <h4 className="font-display text-[0.9rem] font-extrabold mb-1.5" style={{ color: card.color }}>
                        {card.label}
                      </h4>
                      <p className="text-[0.78rem] text-slate-500 leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* ═══════════════════════════════════════
         TEAM SECTION
         ═══════════════════════════════════════ */}
      <Section>
        <section className="py-24 bg-[#E8F4FD] relative overflow-hidden">
          <div className="absolute top-20 right-[8%] w-60 h-60 bg-brand-200/25 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-[5%] w-52 h-52 bg-lavender-200/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="anim">
                <span className="tag bg-lavender-100 text-lavender-700 mb-4">
                  <Users className="w-3.5 h-3.5" /> EKİBİMİZ
                </span>
              </div>
              <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
                Tutkulu Bir{" "}
                <span className="text-gradient">Ekiple</span> Çalışıyoruz
              </h2>
              <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
                Her biri alanında uzman, çocukların geleceğine inanan bir ekip.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {teamMembers.map((m, i) => (
                <div
                  key={i}
                  className={`anim d${Math.min(i + 1, 6)} card-3d p-0 overflow-hidden`}
                  style={{
                    background: "white",
                    borderColor: m.color + "30",
                    borderBottomWidth: "5px",
                    borderBottomColor: m.color,
                  }}
                >
                  <div className="relative h-[280px] overflow-hidden" style={{ background: m.bg }}>
                    <img
                      src={m.img}
                      alt={m.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-20"
                      style={{ background: "linear-gradient(to top, white, transparent)" }}
                    />
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ background: m.color }}
                    />
                  </div>
                  <div className="p-5 pt-0 -mt-2">
                    <h3 className="font-display text-[1.1rem] font-extrabold text-slate-800 leading-tight mb-1">
                      {m.name}
                    </h3>
                    <p className="text-[0.78rem] font-bold" style={{ color: m.color }}>
                      {m.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* ─── Final CTA ─── */}
      <FinalCTA />

      {/* ─── Footer ─── */}
      <SubpageFooter />
    </main>
  );
}
