"use client";

import {
  Section, SubpageNavbar, SubpageHero, FinalCTA, SubpageFooter,
} from "@/components/subpage-shared";
import {
  Award, Star, Trophy, Target, Zap, Shield, Heart, Users,
  BookOpen, Sparkles, ArrowRight, Lock,
} from "lucide-react";

/* =================================================
   BADGE DATA
   ================================================= */
const badgeCategories = [
  {
    category: "Ke\u015Fif Rozetleri",
    desc: "Platforma ilk ad\u0131mlar\u0131n\u0131 atarak \u00F6\u011Frenme yolculu\u011Funa ba\u015Flayan \u00F6\u011Frencilere verilir.",
    color: "#1B3A7B",
    bg: "#EBF2FB",
    badges: [
      { name: "Merhaba Ke\u015Fif Yolcusu", desc: "Platforma ilk giri\u015Fini yapt\u0131n!", unlocked: true },
      { name: "Merakl\u0131 Kahraman", desc: "\u0130lk video dersini tamamlad\u0131n.", unlocked: true },
      { name: "\u0130lk Ad\u0131m", desc: "Profilini tamamlad\u0131n ve haz\u0131rs\u0131n!", unlocked: true },
    ],
  },
  {
    category: "Empati Rozetleri",
    desc: "Empati becerilerini geli\u015Ftiren ve ba\u015Fkalar\u0131n\u0131n duygular\u0131n\u0131 anlayan \u00F6\u011Frenciler i\u00E7in.",
    color: "#2ECC71",
    bg: "#ECFBF2",
    badges: [
      { name: "Duygu Dedektifi", desc: "5 farkl\u0131 duyguyu do\u011Fru tan\u0131mlad\u0131n.", unlocked: true },
      { name: "Empati Y\u0131ld\u0131z\u0131", desc: "Empati mod\u00FCl\u00FCn\u00FC tamamlad\u0131n.", unlocked: false },
      { name: "Kalp Kahraman\u0131", desc: "3 arkada\u015F\u0131na yard\u0131m g\u00F6revi tamamlad\u0131n.", unlocked: false },
    ],
  },
  {
    category: "\u0130leti\u015Fim Rozetleri",
    desc: "Etkili ileti\u015Fim, dinleme ve kendini ifade etme becerilerini geli\u015Ftiren \u00F6\u011Frencilere.",
    color: "#7F63CB",
    bg: "#F0EDF9",
    badges: [
      { name: "S\u00F6z Ustas\u0131", desc: "Kendini ifade etme g\u00F6revini ba\u015Far\u0131yla tamamlad\u0131n.", unlocked: true },
      { name: "Dinleme \u015Eampiyonu", desc: "Aktif dinleme mod\u00FCl\u00FCn\u00FC bitirdin.", unlocked: false },
      { name: "\u0130leti\u015Fim Y\u0131ld\u0131z\u0131", desc: "T\u00FCm ileti\u015Fim becerilerinde ustala\u015Ft\u0131n.", unlocked: false },
    ],
  },
  {
    category: "Liderlik Rozetleri",
    desc: "Tak\u0131m \u00E7al\u0131\u015Fmas\u0131, sorumluluk alma ve liderlik becerilerini g\u00F6steren \u00F6\u011Frenciler i\u00E7in.",
    color: "#F5C518",
    bg: "#FFFBEB",
    badges: [
      { name: "Tak\u0131m Kaptan\u0131", desc: "\u0130lk grup aktivitesinde liderlik yapt\u0131n.", unlocked: false },
      { name: "Sorumluluk Y\u0131ld\u0131z\u0131", desc: "3 g\u00F6revi zaman\u0131nda tamamlad\u0131n.", unlocked: false },
      { name: "Gen\u00E7 Lider", desc: "Liderlik mod\u00FCl\u00FCn\u00FC ba\u015Far\u0131yla bitirdin.", unlocked: false },
    ],
  },
  {
    category: "Duygu Y\u00F6netimi Rozetleri",
    desc: "\u00D6fke, kayg\u0131 ve stres gibi duygular\u0131 tan\u0131y\u0131p y\u00F6netmeyi \u00F6\u011Frenen \u00F6\u011Frencilere.",
    color: "#EE7A45",
    bg: "#FEF5F0",
    badges: [
      { name: "Sakin Kahraman", desc: "Stres y\u00F6netimi tekniklerini \u00F6\u011Frendin.", unlocked: false },
      { name: "Duygu Ninjas\u0131", desc: "5 farkl\u0131 duygu y\u00F6netimi stratejisi kazand\u0131n.", unlocked: false },
      { name: "\u0130\u00E7 Huzur Ustas\u0131", desc: "T\u00FCm duygu y\u00F6netimi mod\u00FCl\u00FCn\u00FC tamamlad\u0131n.", unlocked: false },
    ],
  },
];

const stats = [
  { icon: Trophy, value: "50+", label: "Rozet", color: "#1B3A7B" },
  { icon: Target, value: "100+", label: "G\u00F6rev", color: "#2ECC71" },
  { icon: Star, value: "6", label: "Kategori", color: "#F5C518" },
  { icon: Zap, value: "\u221E", label: "Motivasyon", color: "#EE7A45" },
];

/* =================================================
   STATS SECTION
   ================================================= */
function BadgeStats() {
  return (
    <Section>
      <section className="py-20 bg-[#F5C518] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.08]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <div key={i} className={`anim d${i + 1}`}>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 text-center shadow-md">
                  <s.icon className="w-6 h-6 mx-auto mb-2" style={{ color: s.color }} />
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800">{s.value}</p>
                  <p className="text-[0.78rem] text-slate-500 font-bold mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

/* =================================================
   BADGE SHOWCASE — Sticky Notes Board
   ================================================= */
function BadgeShowcase() {
  return (
    <Section>
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-mint-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <div className="anim">
              <span className="tag bg-gold-100 text-gold-700 mb-4">
                <Award className="w-3.5 h-3.5" /> ROZET GALER{"\u0130"}S{"\u0130"}
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Her beceri bir <span className="highlight">rozet</span>, her rozet bir gurur
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              {"\u00D6\u011F"}renciler g{"\u00F6"}revleri tamamlad{"\u0131"}k{"\u00E7"}a dijital rozetler kazan{"\u0131"}r. Her rozet, geli{"\u015F"}im portfoly{"\u00F6"}s{"\u00FC"}ne eklenir.
            </p>
          </div>

          {/* Featured badge — big display */}
          <div className="anim d2 max-w-2xl mx-auto mb-16">
            <div className="relative bg-[#FAFAF8] rounded-2xl border border-slate-200 shadow-md overflow-visible">
              {/* Clipboard clip */}
              <div className="flex justify-center -mt-4 relative z-20">
                <div className="w-20 h-8 rounded-b-xl bg-slate-400 border-2 border-slate-500 shadow-sm flex items-end justify-center pb-1">
                  <div className="w-10 h-1.5 rounded-full bg-slate-300" />
                </div>
              </div>
              <div className="px-8 py-8 flex flex-col sm:flex-row items-center gap-8">
                <div className="w-36 h-36 flex-shrink-0">
                  <img src="/rozet1.png" alt="Merhaba Ke\u015Fif Yolcusu Rozeti" className="w-full h-full object-contain drop-shadow-lg" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider bg-[#EBF2FB] text-[#1B3A7B] mb-3">
                    {"\u00D6"}ne {"\u00C7\u0131"}kan Rozet
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-slate-800 mb-2">
                    Merhaba Ke{"\u015F"}if Yolcusu
                  </h3>
                  <p className="text-[0.9rem] text-slate-500 leading-relaxed">
                    Platforma ilk ad{"\u0131"}m{"\u0131"}n{"\u0131"} atan her {"\u00F6\u011F"}renciye verilen ilk rozet. {"\u00D6\u011F"}renme yolculu{"\u011F"}unun ba{"\u015F"}lang{"\u0131"}c{"\u0131"}n{"\u0131"} simgeler.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Badge categories on sticky board */}
          <div className="space-y-16">
            {badgeCategories.map((cat, ci) => (
              <div key={ci} className="anim">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: cat.bg }}>
                    <Award className="w-5 h-5" style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-slate-800">{cat.category}</h3>
                    <p className="text-[0.8rem] text-slate-400">{cat.desc}</p>
                  </div>
                </div>

                {/* Badges — sticky notes */}
                <div
                  className="relative rounded-3xl p-8 sm:p-10"
                  style={{
                    background: "linear-gradient(145deg, #f5f0e8 0%, #ebe4d8 100%)",
                    boxShadow: "inset 0 2px 8px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="absolute inset-0 rounded-3xl opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)", backgroundSize: "12px 12px" }} />
                  <div className="relative z-10 grid sm:grid-cols-3 gap-7">
                    {cat.badges.map((b, bi) => {
                      const rotations = ["-1.5deg", "1.5deg", "-1deg"];
                      return (
                        <div
                          key={bi}
                          className={`anim d${bi + 1} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                          style={{ transform: `rotate(${rotations[bi]})` }}
                        >
                          <div
                            className={`relative rounded-sm p-6 min-h-[200px] flex flex-col items-center text-center ${!b.unlocked ? "opacity-70" : ""}`}
                            style={{
                              background: b.unlocked ? cat.bg : "#f0eeeb",
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
                                background: `linear-gradient(135deg, ${b.unlocked ? cat.bg : "#f0eeeb"} 50%, transparent 50%)`,
                                filter: "brightness(0.92)",
                              }}
                            />

                            {/* Badge image or lock */}
                            <div className="w-20 h-20 mb-3 flex items-center justify-center relative">
                              {b.unlocked ? (
                                <img src="/rozet1.png" alt={b.name} className="w-full h-full object-contain drop-shadow-md" />
                              ) : (
                                <div className="w-16 h-16 rounded-full bg-slate-300/50 flex items-center justify-center">
                                  <Lock className="w-6 h-6 text-slate-400" />
                                </div>
                              )}
                            </div>

                            {/* Name */}
                            <h4 className="font-display text-[0.9rem] font-extrabold mb-1.5 leading-tight" style={{ color: b.unlocked ? cat.color : "#94a3b8" }}>
                              {b.name}
                            </h4>

                            {/* Desc */}
                            <p className="text-[0.78rem] text-slate-500 leading-relaxed">
                              {b.desc}
                            </p>

                            {/* Status */}
                            {b.unlocked && (
                              <span className="mt-auto pt-3 text-[0.68rem] font-bold uppercase tracking-wider" style={{ color: cat.color }}>
                                Kazan{"\u0131"}ld{"\u0131"}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
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

/* =================================================
   HOW IT WORKS
   ================================================= */
function HowBadgesWork() {
  const steps = [
    { icon: BookOpen, color: "#1B3A7B", bg: "#EBF2FB", title: "G\u00F6rev Tamamla", desc: "Video dersleri izle, etkinliklere kat\u0131l ve g\u00F6revlerini yerine getir.", rotate: "-1.5deg" },
    { icon: Award, color: "#2ECC71", bg: "#ECFBF2", title: "Rozet Kazan", desc: "Her tamamlanan beceri i\u00E7in dijital rozet kazanarak koleksiyonunu b\u00FCy\u00FCt.", rotate: "2deg" },
    { icon: Shield, color: "#7F63CB", bg: "#F0EDF9", title: "Portfoly\u00F6ne Ekle", desc: "Kazan\u0131lan rozetler otomatik olarak dijital geli\u015Fim portfoly\u00F6ne eklenir.", rotate: "-1deg" },
    { icon: Sparkles, color: "#F5C518", bg: "#FFFBEB", title: "Geli\u015Fimini Payla\u015F", desc: "Portfoly\u00F6n\u00FC ailene ve \u00F6\u011Fretmenlerine g\u00F6stererek ba\u015Far\u0131lar\u0131n\u0131 kutla.", rotate: "1.5deg" },
  ];

  return (
    <Section>
      <section className="py-24 bg-[#ECFBF2] relative overflow-hidden">
        <div className="absolute top-16 right-[10%] w-60 h-60 bg-mint-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-[8%] w-56 h-56 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-mint-100 text-mint-700 mb-4">
                <Zap className="w-3.5 h-3.5" /> NASIL {"\u00C7"}ALI{"\u015E"}IR
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Rozetler nas{"\u0131"}l <span className="text-gradient">kazan{"\u0131"}l{"\u0131"}r?</span>
            </h2>
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
            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`anim d${i + 1} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                  style={{ transform: `rotate(${s.rotate})` }}
                >
                  <div
                    className="relative rounded-sm p-6 min-h-[180px]"
                    style={{
                      background: s.bg,
                      boxShadow: "3px 4px 12px rgba(0,0,0,0.1), 1px 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm opacity-60" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(240,235,220,0.5) 100%)", border: "1px solid rgba(0,0,0,0.06)" }} />
                    <div className="absolute bottom-0 right-0 w-6 h-6" style={{ background: `linear-gradient(135deg, ${s.bg} 50%, transparent 50%)`, filter: "brightness(0.92)" }} />

                    {/* Step number */}
                    <div className="absolute top-4 right-4 font-display text-3xl font-extrabold opacity-10" style={{ color: s.color }}>
                      {i + 1}
                    </div>

                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.color + "18" }}>
                      <s.icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    <h4 className="font-display text-[0.95rem] font-extrabold mb-2 leading-tight" style={{ color: s.color }}>
                      {s.title}
                    </h4>
                    <p className="text-[0.82rem] text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* =================================================
   PAGE
   ================================================= */
export default function BasarilarPage() {
  return (
    <main>
      <SubpageNavbar active="Ba\u015Far\u0131lar" />

      <SubpageHero
        breadcrumb="Ba\u015Far\u0131lar"
        tag="BA\u015EARILAR"
        tagIcon={Trophy}
        title="Her ad\u0131m bir ba\u015Far\u0131,"
        titleHighlight="her rozet bir gurur."
        description="\u00D6\u011Frencilerimiz g\u00F6revleri tamamlad\u0131k\u00E7a dijital rozetler kazan\u0131r. Bu rozetler, geli\u015Fim portfoly\u00F6s\u00FCne eklenerek ki\u015Fisel ba\u015Far\u0131 hikayesini olu\u015Fturur."
        theme="brand"
      >
        {/* Hero video + badge */}
        <div className="flex-shrink-0 w-full sm:w-[320px] lg:w-[360px] space-y-3">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
            <video className="w-full h-auto" muted playsInline loop autoPlay>
              <source src="https://learnecohub.com/wp-content/uploads/2025/07/Tanitim-Videosu-Guncel.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
          </div>
          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl py-2.5 px-4">
            <img src="/rozet1.png" alt="Rozet" className="w-10 h-10 object-contain drop-shadow-md" />
            <div>
              <p className="text-[0.78rem] font-extrabold text-white leading-tight">50+ Rozet</p>
              <p className="text-[0.65rem] text-white/50 font-semibold">Koleksiyonunu b{"\u00FC"}y{"\u00FC"}t!</p>
            </div>
          </div>
        </div>
      </SubpageHero>

      <BadgeStats />
      <BadgeShowcase />
      <HowBadgesWork />
      <FinalCTA />
      <SubpageFooter />
    </main>
  );
}
