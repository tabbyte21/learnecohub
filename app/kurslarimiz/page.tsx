"use client";

import {
  Section,
  SubpageNavbar,
  SubpageHero,
  FinalCTA,
  SubpageFooter,
} from "@/components/subpage-shared";

import {
  Crown,
  CheckCircle2,
  ArrowRight,
  Rocket,
  Layers,
  Target,
  Video,
  Users,
  PenTool,
  BarChart3,
  Heart,
} from "lucide-react";

/* ═══════════════════════════════════════
   PLAN DATA
   ═══════════════════════════════════════ */
const plans = [
  {
    title: "Bireysel Kullan\u0131c\u0131",
    subtitle: "Aileler ve \u00D6\u011Frenciler \u0130\u00E7in",
    cls: "card-3d-brand",
    popular: false,
    features: [
      "Animasyonlarla \u00F6\u011Frenme deneyimi",
      "100+ sosyal ve duygusal beceri m\u00FCfredat\u0131",
      "Psikolog e\u015Fli\u011Finde 10-12 ki\u015Filik canl\u0131 grup dersleri",
      "Uluslararas\u0131 ge\u00E7erli dijital portfolyo",
      "Haftal\u0131k geli\u015Fim raporlar\u0131 ve ebeveyn i\u00E7erikleri",
      "G\u00FCnl\u00FCk ya\u015Fama entegre e\u011Fitici oyunlar ve g\u00F6revler",
    ],
    cta: "Detayl\u0131 Bilgi Al",
    ctaCls: "btn-3d btn-3d-white",
  },
  {
    title: "Uzman Hesab\u0131",
    subtitle: "Psikolog, \u00D6\u011Fretmen ve PDR Uzmanlar\u0131 \u0130\u00E7in",
    cls: "card-3d-mint",
    popular: true,
    features: [
      "S\u0131f\u0131r haz\u0131rl\u0131k ile sosyal becerileri \u00F6\u011Fretme imkan\u0131",
      "Her beceri i\u00E7in: animasyon video + oyun + etkinlik + \u00F6l\u00E7me arac\u0131",
      "\u0130\u00E7erik y\u00F6netimi, \u00F6\u011Frenci geli\u015Fim takibi ve raporlama paneli",
      "500+ haz\u0131r etkinlik ve yazd\u0131r\u0131labilir materyale eri\u015Fim",
      "Birebir veya grup e\u011Fitimlerinde kullan\u0131ma uygun haz\u0131r m\u00FCfredat",
    ],
    cta: "Detayl\u0131 Bilgi Al",
    ctaCls: "btn-3d btn-3d-mint",
  },
  {
    title: "Kurum Hesab\u0131",
    subtitle: "Okullar, Kurumlar ve STK\u2019lar \u0130\u00E7in",
    cls: "card-3d-lavender",
    popular: false,
    features: [
      "Seviyeye \u00F6zel yap\u0131land\u0131r\u0131lm\u0131\u015F, 100+ beceriyi kapsayan haz\u0131r m\u00FCfredat",
      "Her beceri i\u00E7in mod\u00FCler sistem (video + oyun + etkinlik + \u00F6l\u00E7me)",
      "Kurumsal dashboard ile \u00E7oklu kullan\u0131c\u0131 y\u00F6netimi (1000+ kullan\u0131c\u0131)",
      "\u00D6\u011Frenci beceri CV\u2019lerini kurumsal olarak raporlama",
      "\u00D6\u011Fretmen ve PDR uzmanlar\u0131 i\u00E7in uygulama rehberleri",
    ],
    cta: "Bizimle \u0130leti\u015Fime Ge\u00E7in",
    ctaCls: "btn-3d btn-3d-white",
  },
];

/* ═══════════════════════════════════════
   LEARNING STEPS DATA
   ═══════════════════════════════════════ */
const steps = [
  { num: "1", title: "Tanışma ve Değerlendirme", desc: "Alanında uzman psikologlar çocuğunuzun sosyal-duygusal gelişim ihtiyaçlarını kapsamlı değerlendirir. Yaşa ve ihtiyaca uygun gruplara yönlendirme yapılır.", icon: Target, tabColor: "#1B3A7B" },
  { num: "2", title: "Asenkron Öğrenme", desc: "Çocuklar, animasyonlu hikayeleştirilmiş videolar ve oyunlarla becerileri bireysel olarak öğrenir. Aileye evde uygulayabileceği etkinlik önerileri sunulur.", icon: Video, tabColor: "#2ECC71" },
  { num: "3", title: "Canlı Grup Seansları", desc: "10-12 kişilik özel gruplarda yapılan canlı oturumlarda, öğrenciler öğrendikleri becerileri grup içinde aktif şekilde uygular.", icon: Users, tabColor: "#7F63CB" },
  { num: "4", title: "Uygulama ve Derinleşme", desc: "Canlı derslerde öğrencilere evde uygulayabilecekleri görevler verilir. Öğrenilen becerinin gerçek yaşamda pratiği sağlanır.", icon: PenTool, tabColor: "#EE7A45" },
  { num: "5", title: "Ölçme ve Geri Bildirim", desc: "Her beceri sonunda kısa değerlendirmelerle gelişim izlenir. İlerleme kişisel gelişim portfolyosuna yansır.", icon: BarChart3, tabColor: "#F5C518" },
  { num: "6", title: "Aile Katılımı", desc: "Velilere haftalık videolar, öneriler ve kolay uygulanabilir rehber materyaller sunulur. Çocuk evde de desteklenir.", icon: Heart, tabColor: "#1B3A7B" },
];

/* ═══════════════════════════════════════
   HERO BADGE DATA
   ═══════════════════════════════════════ */
const heroBadges = [
  { label: "Bireysel Kullan\u0131c\u0131", sub: "Aileler ve \u00D6\u011Frenciler", color: "#1B3A7B", bg: "#EBF2FB", border: "#A8C2E3" },
  { label: "Uzman Hesab\u0131", sub: "Psikolog ve \u00D6\u011Fretmenler", color: "#2ECC71", bg: "#ECFBF2", border: "#A3EBC1" },
  { label: "Kurum Hesab\u0131", sub: "Okullar ve STK\u2019lar", color: "#7F63CB", bg: "#F0EDF9", border: "#BFB1E5" },
];

/* ═══════════════════════════════════════
   PRICING SECTION
   ═══════════════════════════════════════ */
function PricingSection() {
  return (
    <Section>
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-mint-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-gold-100 text-gold-700 mb-4">
                <Crown className="w-3.5 h-3.5" /> PLANLAR
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              <span className="highlight">Plan{"\u0131"}n{"\u0131"}z{"\u0131"}</span> se{"\u00E7"}in, hemen ba{"\u015F"}lay{"\u0131"}n
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Herkesin {"\u00F6\u011F"}renme yolculu{"\u011F"}u farkl{"\u0131"}. Size {"\u00F6"}zel sosyal-duygusal geli{"\u015F"}im plan{"\u0131"}n{"\u0131"}z{"\u0131"} se{"\u00E7"}in.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`anim d${i + 1} card-3d ${plan.cls} p-7 flex flex-col relative ${
                  plan.popular ? "ring-2 ring-mint-400" : ""
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-mint-500 text-white text-[0.72rem] font-bold uppercase tracking-wide shadow-md">
                    En Pop{"\u00FC"}ler
                  </span>
                )}

                <h3 className="font-display text-xl font-extrabold text-slate-800 mb-1">
                  {plan.title}
                </h3>
                <p className="text-[0.82rem] text-slate-400 font-medium mb-5">
                  {plan.subtitle}
                </p>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[0.84rem] text-slate-600">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-mint-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a href="/contact" className={`${plan.ctaCls} mt-7 w-full justify-center`}>
                  {plan.cta} <ArrowRight className="w-4 h-4" />
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
   IMPACT BANNER
   ═══════════════════════════════════════ */
function ImpactBanner() {
  return (
    <Section>
      <section className="py-16 bg-[#F5C518] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.08]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h3 className="anim font-display text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] mb-3 tracking-tight">
            {"\u00C7"}ocu{"\u011F"}unuzun sosyal ve duygusal becerilerde{" "}
            <span className="font-extrabold underline decoration-[#1B3A7B] decoration-2 underline-offset-4">
              zorland{"\u0131\u011F\u0131"}n{"\u0131"}
            </span>{" "}
            fark ediyor musunuz?
          </h3>
          <p className="anim d1 text-[#1A1A2E]/70 text-[0.9rem] leading-relaxed max-w-2xl mx-auto mb-7">
            Uzman ekibimizle, {"\u00E7"}ocu{"\u011F"}unuzun duygusal zeka, ileti{"\u015F"}im, stres y{"\u00F6"}netimi, {"\u00F6"}zg{"\u00FC"}ven ve liderlik gibi becerilerini geli{"\u015F"}tiriyoruz.
          </p>
          <a href="/contact" className="anim d2 btn-3d btn-3d-brand">
            <Rocket className="w-5 h-5" /> {"\u00DC"}cretsiz Web Seminerine Kaydolun
          </a>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   LEARNING STEPS
   ═══════════════════════════════════════ */
function LearningSteps() {
  return (
    <Section>
      <section className="py-24 bg-[#FFFBEB] relative overflow-hidden">
        <div className="absolute top-16 left-[10%] w-56 h-56 bg-gold-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-[5%] w-64 h-64 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-mint-100 text-mint-700 mb-4">
                <Layers className="w-3.5 h-3.5" /> NASIL {"\u00C7"}ALI{"\u015E"}IR
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              6 Ad{"\u0131"}mda <span className="highlight">Kapsaml{"\u0131"} M{"\u00FC"}fredat</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Tan{"\u0131\u015F"}madan geli{"\u015F"}im takibine kadar, her a{"\u015F"}amada {"\u00F6\u011F"}rencilerinize ve ailelerine bilimsel temelli destek sa{"\u011F"}l{"\u0131"}yoruz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <div key={i} className={`anim d${Math.min(i + 1, 6)} group`}>
                {/* Notebook card */}
                <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white">
                  {/* Colored tab strip */}
                  <div className="h-9 relative flex items-center px-4 gap-3" style={{ background: s.tabColor }}>
                    {/* Single spiral ring */}
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-[3px] border-white/80 bg-slate-300" />
                    {/* Step label */}
                    <span className="ml-4 text-white/90 text-[0.7rem] font-bold tracking-wider uppercase">
                      Adım {s.num}
                    </span>
                  </div>

                  {/* Lined paper body */}
                  <div
                    className="relative p-6 pl-10 min-h-[180px]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(transparent, transparent 27px, #e5e7eb 27px, #e5e7eb 28px)",
                      backgroundSize: "100% 28px",
                    }}
                  >
                    {/* Red margin line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-red-300/50" />

                    {/* Step number watermark */}
                    <div className="absolute top-3 right-4 font-display text-5xl font-extrabold text-slate-100">
                      {s.num}
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-center gap-2.5 mb-3 relative z-10">
                      <s.icon className="w-5 h-5 flex-shrink-0" style={{ color: s.tabColor }} />
                      <h3 className="font-display text-lg font-extrabold text-slate-800 leading-tight line-clamp-1">
                        {s.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-[0.84rem] text-slate-500 leading-relaxed relative z-10 line-clamp-4">
                      {s.desc}
                    </p>
                  </div>

                  {/* Torn edge */}
                  <div
                    className="h-4 w-full"
                    style={{
                      background: `url("data:image/svg+xml,%3Csvg width='20' height='16' viewBox='0 0 20 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L10 12 L20 0 Z' fill='white'/%3E%3C/svg%3E") repeat-x`,
                      backgroundColor: s.tabColor + "18",
                    }}
                  />
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
   PAGE
   ═══════════════════════════════════════ */
export default function KurslarimizPage() {
  return (
    <main>
      <SubpageNavbar active={"Kurslar\u0131m\u0131z"} />

      <SubpageHero
        breadcrumb={"Kurslar\u0131m\u0131z"}
        tag="KURSLARIMIZ"
        tagIcon={Crown}
        title={"\u00D6\u011Frenme yolculu\u011Funuza"}
        titleHighlight={"bug\u00FCn ba\u015Flay\u0131n."}
        description={"Herkesin \u00F6\u011Frenme yolculu\u011Fu farkl\u0131. \u0130ster \u00E7ocu\u011Funuz, ister \u00F6\u011Frenciniz, ister bir kurum olun; size \u00F6zel sosyal-duygusal geli\u015Fim plan\u0131n\u0131z\u0131 se\u00E7in."}
        theme="mint"
      >
        {/* Mini badge cards showing the 3 plan types */}
        <div className="flex flex-col gap-3 flex-shrink-0 w-full sm:w-auto">
          {heroBadges.map((b, i) => (
            <div
              key={i}
              className="card-3d px-5 py-4 flex items-center gap-4 sm:min-w-[280px]"
              style={{
                background: b.bg,
                borderColor: b.border,
                borderBottomWidth: "5px",
                borderBottomColor: b.color,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: b.color + "15" }}
              >
                <Crown className="w-5 h-5" style={{ color: b.color }} />
              </div>
              <div>
                <p className="font-display font-extrabold text-[0.92rem] text-slate-800 leading-tight">
                  {b.label}
                </p>
                <p className="text-[0.72rem] text-slate-400 font-medium">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </SubpageHero>

      <PricingSection />
      <ImpactBanner />
      <LearningSteps />
      <FinalCTA />
      <SubpageFooter />
    </main>
  );
}
