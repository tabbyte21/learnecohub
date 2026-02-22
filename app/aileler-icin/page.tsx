"use client";

import {
  Section, SubpageNavbar, FinalCTA, SubpageFooter, Counter,
} from "@/components/subpage-shared";
import {
  Heart, Shield, BarChart3, Users, FileText, Video, Star,
  BookOpen, CheckCircle2, Target, Calendar, TrendingUp,
  Quote, Award, UserCheck, MapPin, ChevronRight, Camera,
  Smile, Compass, Fingerprint,
} from "lucide-react";

/* =================================================================
   CUSTOM HERO \u2014 Scrapbook style (NOT using SubpageHero)
   ================================================================= */
function CustomHero() {
  return (
    <section className="relative pt-24 pb-0 overflow-hidden" style={{ background: "#1B3A7B" }}>
      {/* Texture */}
      <div className="absolute inset-0 dots-pattern" style={{ opacity: 0.06 }} />

      {/* Orbs */}
      <div
        className="absolute top-[-20%] right-[5%] w-[450px] h-[450px] rounded-full blur-[120px]"
        style={{ background: "#EE7A45", opacity: 0.3 }}
      />
      <div
        className="absolute bottom-[-30%] left-[-5%] w-[380px] h-[380px] rounded-full blur-[100px]"
        style={{ background: "#F5C518", opacity: 0.15 }}
      />
      <div
        className="absolute top-[40%] left-[50%] w-[280px] h-[280px] rounded-full blur-[90px]"
        style={{ background: "#7F63CB", opacity: 0.1 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-14">
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-2 text-[0.78rem] font-semibold mb-8"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <a href="/" className="transition-colors hover:opacity-80">Ana Sayfa</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: "rgba(255,255,255,0.9)" }}>Aileler {"\u0130\u00E7"}in</span>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* LEFT: Text content */}
          <div className="max-w-2xl">
            {/* Tag badge */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold uppercase tracking-wide"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Heart className="w-3.5 h-3.5" /> A{"\u0130"}LELER {"\u0130\u00C7\u0130"}N
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold leading-[1.08] tracking-tight mb-4 text-white">
              {"\u00C7"}ocu{"\u011F"}unuzun gelece{"\u011F"}ine{" "}
              <span style={{ color: "#F5C518" }}>birlikte yat{"\u0131"}r{"\u0131"}m yap{"\u0131"}n.</span>
            </h1>

            {/* Description */}
            <p
              className="text-[0.95rem] leading-relaxed max-w-lg mb-6"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Sosyal-duygusal geli{"\u015F"}im alan{"\u0131"}nda bilimsel y{"\u00F6"}ntemlerle tasarlanm{"\u0131\u015F"} m{"\u00FC"}fredat,
              uzman rehberli{"\u011F"}i ve aile kat{"\u0131"}l{"\u0131"}ml{"\u0131"} programlarla {"\u00E7"}ocu{"\u011F"}unuzun yan{"\u0131"}nday{"\u0131"}z.
            </p>

            {/* Mini highlights */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "%96 Memnuniyet", dot: "#2ECC71" },
                { label: "5000+ Aile", dot: "#F5C518" },
                { label: "200+ Uzman", dot: "#fff" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-sm"
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: s.dot }} />
                  <span className="text-[0.78rem] font-bold text-white/90">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Scrapbook page with polaroid cards */}
          <div className="flex-shrink-0 w-full sm:w-[340px] lg:w-[380px]">
            <div
              className="relative bg-[#FFF8F0] rounded-2xl p-6 shadow-2xl"
              style={{ transform: "rotate(2deg)" }}
            >
              {/* Washi tape top */}
              <div
                className="absolute -top-3 left-8 w-24 h-6 rounded-sm z-10"
                style={{
                  background: "repeating-linear-gradient(45deg, #EE7A45, #EE7A45 4px, #F5C518 4px, #F5C518 8px)",
                  opacity: 0.7,
                  transform: "rotate(-5deg)",
                }}
              />
              {/* Washi tape right side */}
              <div
                className="absolute top-12 -right-2 w-20 h-5 rounded-sm z-10"
                style={{
                  background: "repeating-linear-gradient(45deg, #7F63CB, #7F63CB 3px, #9F8AD8 3px, #9F8AD8 6px)",
                  opacity: 0.5,
                  transform: "rotate(80deg)",
                }}
              />

              {/* Subtle paper texture */}
              <div
                className="absolute inset-0 rounded-2xl opacity-[0.03]"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 23px, #ccc 23px, #ccc 24px)",
                }}
              />

              {/* 3 mini polaroid cards */}
              <div className="relative z-[2] grid grid-cols-2 gap-3">
                {/* Polaroid 1 */}
                <div
                  className="bg-white p-2 rounded-sm shadow-md"
                  style={{ transform: "rotate(-3deg)" }}
                >
                  <div className="w-full h-20 rounded-sm bg-[#EBF2FB] flex items-center justify-center">
                    <Heart className="w-8 h-8 text-[#1B3A7B]/30" />
                  </div>
                  <p className="text-[0.6rem] text-center text-slate-400 mt-1.5 font-semibold">Empati</p>
                </div>

                {/* Polaroid 2 */}
                <div
                  className="bg-white p-2 rounded-sm shadow-md"
                  style={{ transform: "rotate(2deg)" }}
                >
                  <div className="w-full h-20 rounded-sm bg-[#ECFBF2] flex items-center justify-center">
                    <Smile className="w-8 h-8 text-[#2ECC71]/30" />
                  </div>
                  <p className="text-[0.6rem] text-center text-slate-400 mt-1.5 font-semibold">{"\u00D6"}z G{"\u00FC"}ven</p>
                </div>

                {/* Polaroid 3 - spanning full width */}
                <div
                  className="col-span-2 bg-white p-2 rounded-sm shadow-md"
                  style={{ transform: "rotate(1deg)" }}
                >
                  <div className="w-full h-16 rounded-sm bg-[#FFFBEB] flex items-center justify-center gap-3">
                    <Users className="w-7 h-7 text-[#F5C518]/30" />
                    <Compass className="w-7 h-7 text-[#EE7A45]/30" />
                  </div>
                  <p className="text-[0.6rem] text-center text-slate-400 mt-1.5 font-semibold">Sosyal Beceriler</p>
                </div>
              </div>

              {/* Stamp decoration */}
              <div
                className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full border-2 border-dashed border-[#2ECC71]/40 flex items-center justify-center bg-white/80"
                style={{ transform: "rotate(-15deg)" }}
              >
                <span className="text-[0.55rem] font-extrabold text-[#2ECC71]/60 uppercase">Onayl{"\u0131"}</span>
              </div>

              {/* Photo corner top-left */}
              <div className="absolute top-2 left-2 w-5 h-5 z-[1]">
                <div className="absolute top-0 left-0 w-0 h-0 border-l-[10px] border-l-[#EE7A45]/20 border-b-[10px] border-b-transparent" />
              </div>
              {/* Photo corner bottom-right */}
              <div className="absolute bottom-2 right-2 w-5 h-5 z-[1]">
                <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[10px] border-r-[#EE7A45]/20 border-t-[10px] border-t-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade line */}
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.15) 80%, transparent)",
        }}
      />
    </section>
  );
}

/* =================================================================
   SECTION 1 \u2014 Aileniz \u0130\u00E7in Ne Sunuyoruz?
   Polaroid-style scattered cards on cream scrapbook background
   ================================================================= */
function SunuyoruzSection() {
  const items = [
    {
      icon: Shield,
      title: "G\u00FCvenli Ortam",
      desc: "Uzmanlar taraf\u0131ndan denetlenen, ya\u015Fa uygun i\u00E7eriklerle \u00E7ocu\u011Funuz g\u00FCvende.",
      imgBg: "#EBF2FB",
      color: "#1B3A7B",
      rotate: "-2deg",
      tape: { color1: "#1B3A7B", color2: "#4D7EC4", angle: "-8deg", pos: "left-4" },
    },
    {
      icon: BarChart3,
      title: "Aile Raporlar\u0131",
      desc: "\u00C7ocu\u011Funuzun geli\u015Fimini haftal\u0131k ve ayl\u0131k detayl\u0131 raporlarla takip edin.",
      imgBg: "#ECFBF2",
      color: "#2ECC71",
      rotate: "1.5deg",
      tape: { color1: "#2ECC71", color2: "#7DDEAA", angle: "5deg", pos: "right-6" },
    },
    {
      icon: UserCheck,
      title: "Uzman Rehberlik",
      desc: "Psikolog ve pedagog deste\u011Fiyle \u00E7ocu\u011Funuzun sosyal-duygusal geli\u015Fimini y\u00F6nlendirin.",
      imgBg: "#F0EDF9",
      color: "#7F63CB",
      rotate: "-1deg",
      tape: { color1: "#7F63CB", color2: "#B5A3E0", angle: "-3deg", pos: "left-8" },
    },
    {
      icon: FileText,
      title: "Dijital Portfoly\u00F6",
      desc: "\u00C7ocu\u011Funuzun t\u00FCm ba\u015Far\u0131lar\u0131, rozetleri ve geli\u015Fimi tek bir dijital dosyada.",
      imgBg: "#FEF5F0",
      color: "#EE7A45",
      rotate: "2.5deg",
      tape: { color1: "#EE7A45", color2: "#F5C518", angle: "7deg", pos: "right-4" },
    },
    {
      icon: Video,
      title: "Canl\u0131 Seanslar",
      desc: "K\u00FC\u00E7\u00FCk gruplarla uzman e\u015Fli\u011Finde canl\u0131 oturumlar ve aile kat\u0131l\u0131ml\u0131 etkinlikler.",
      imgBg: "#FFFBEB",
      color: "#F5C518",
      rotate: "-3deg",
      tape: { color1: "#F5C518", color2: "#FFE066", angle: "-6deg", pos: "left-6" },
    },
    {
      icon: Users,
      title: "Uygun Ya\u015F Gruplar\u0131",
      desc: "4-17 ya\u015F aral\u0131\u011F\u0131nda, geli\u015Fim d\u00F6nemine \u00F6zel i\u00E7erikler ve etkinlikler.",
      imgBg: "#EBF2FB",
      color: "#1B3A7B",
      rotate: "1deg",
      tape: { color1: "#1B3A7B", color2: "#2ECC71", angle: "4deg", pos: "right-8" },
    },
  ];

  return (
    <Section>
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-peach-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-mint-200/15 rounded-full blur-3xl" />
        <div className="absolute top-[40%] right-[25%] w-48 h-48 bg-gold-200/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-orange-100 text-orange-700 mb-4">
                <Camera className="w-3.5 h-3.5" /> NE SUNUYORUZ?
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Aileniz {"\u0130\u00E7"}in Ne{" "}
              <span className="highlight">Sunuyoruz?</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              {"\u00C7"}ocu{"\u011F"}unuzun sosyal-duygusal geli{"\u015F"}imini bilimsel y{"\u00F6"}ntemlerle destekleyin,
              her ad{"\u0131"}m{"\u0131"}n{"\u0131"} birlikte takip edin.
            </p>
          </div>

          {/* Scrapbook board */}
          <div
            className="relative rounded-3xl p-6 sm:p-8 lg:p-10"
            style={{
              background: "linear-gradient(145deg, #FFF8F0 0%, #FFF5E8 100%)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.03)",
            }}
          >
            {/* Graph paper texture */}
            <div
              className="absolute inset-0 rounded-3xl opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(#999 1px, transparent 1px), linear-gradient(90deg, #999 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, i) => (
                <div
                  key={i}
                  className={`anim d${Math.min(i + 1, 4)} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                  style={{ transform: `rotate(${item.rotate})` }}
                >
                  {/* Polaroid card */}
                  <div
                    className="relative bg-white p-2.5 rounded-sm"
                    style={{
                      boxShadow: "3px 4px 14px rgba(0,0,0,0.1), 1px 1px 4px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Washi tape */}
                    <div
                      className={`absolute -top-2.5 ${item.tape.pos} w-20 h-5 rounded-sm z-10`}
                      style={{
                        background: `repeating-linear-gradient(45deg, ${item.tape.color1}, ${item.tape.color1} 3px, ${item.tape.color2} 3px, ${item.tape.color2} 6px)`,
                        opacity: 0.55,
                        transform: `rotate(${item.tape.angle})`,
                      }}
                    />

                    {/* Photo area */}
                    <div
                      className="w-full h-32 rounded-sm flex items-center justify-center relative overflow-hidden"
                      style={{ background: item.imgBg }}
                    >
                      {/* Decorative subtle dots inside photo area */}
                      <div
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                          backgroundImage: "radial-gradient(circle, currentColor 0.5px, transparent 0.5px)",
                          backgroundSize: "10px 10px",
                          color: item.color,
                        }}
                      />
                      <item.icon className="w-12 h-12 relative z-[1]" style={{ color: item.color, opacity: 0.35 }} />
                    </div>

                    {/* Caption area */}
                    <div className="pt-3 pb-1.5 px-1">
                      <h4
                        className="font-display text-[0.95rem] font-extrabold mb-1 leading-tight"
                        style={{ color: item.color }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-[0.78rem] text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Photo corner accents */}
                    {i % 2 === 0 && (
                      <>
                        <div className="absolute top-2 left-2">
                          <div
                            className="w-0 h-0 border-l-[8px] border-b-[8px] border-l-transparent"
                            style={{ borderBottomColor: item.color + "25" }}
                          />
                        </div>
                        <div className="absolute top-2 right-2">
                          <div
                            className="w-0 h-0 border-r-[8px] border-b-[8px] border-r-transparent"
                            style={{ borderBottomColor: item.color + "25" }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Floating stamp on the board */}
            <div
              className="hidden lg:flex absolute -bottom-4 -right-4 w-20 h-20 rounded-full border-[3px] border-dashed items-center justify-center bg-white/80 z-20"
              style={{ borderColor: "#EE7A45" + "50", transform: "rotate(12deg)" }}
            >
              <div className="text-center">
                <span className="block text-[0.5rem] font-extrabold uppercase" style={{ color: "#EE7A45" + "70" }}>G{"\u00FC"}venli</span>
                <span className="block text-[0.45rem] font-bold" style={{ color: "#EE7A45" + "50" }}>2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* =================================================================
   SECTION 2 \u2014 Aile Rehberlik Program\u0131
   Dotted-line timeline path with polaroid step cards
   ================================================================= */
function RehberlikSection() {
  const steps = [
    {
      icon: Target,
      step: "01",
      title: "De\u011Ferlendirme",
      text: "\u00C7ocu\u011Funuzun geli\u015Fim d\u00FCzeyini ve ailenizin beklentilerini anlamak i\u00E7in kapsaml\u0131 bir de\u011Ferlendirme s\u00FCreci ba\u015Flat\u0131yoruz.",
      color: "#EE7A45",
      imgBg: "#FEF5F0",
      rotate: "-2deg",
      stampLabel: "Ba\u015Flang\u0131\u00E7",
    },
    {
      icon: Fingerprint,
      step: "02",
      title: "Bireysel Plan",
      text: "\u00C7ocu\u011Funuzun ya\u015F\u0131na, ilgi alanlar\u0131na ve geli\u015Fim ihtiya\u00E7lar\u0131na \u00F6zel ki\u015Fiselle\u015Ftirilmi\u015F bir \u00F6\u011Frenme plan\u0131 olu\u015Fturuyoruz.",
      color: "#7F63CB",
      imgBg: "#F0EDF9",
      rotate: "1.5deg",
      stampLabel: "Ki\u015Fisel",
    },
    {
      icon: Calendar,
      step: "03",
      title: "Haftal\u0131k Takip",
      text: "Uzman psikologlar ve pedagoglar e\u015Fli\u011Finde haftal\u0131k seanslar ve d\u00FCzenli geri bildirimlerle s\u00FCreci y\u00F6netiyoruz.",
      color: "#2ECC71",
      imgBg: "#ECFBF2",
      rotate: "-1deg",
      stampLabel: "Aktif",
    },
    {
      icon: TrendingUp,
      step: "04",
      title: "Geli\u015Fim Raporu",
      text: "Ayl\u0131k detayl\u0131 geli\u015Fim raporlar\u0131, dijital portfoly\u00F6 ve aile g\u00F6r\u00FC\u015Fmeleriyle ilerlemeyi birlikte de\u011Ferlendiriyoruz.",
      color: "#F5C518",
      imgBg: "#FFFBEB",
      rotate: "2deg",
      stampLabel: "Sonu\u00E7",
    },
  ];

  return (
    <Section>
      <section className="py-24 bg-[#FFFBEB] relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-16 left-[10%] w-56 h-56 bg-gold-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-[5%] w-64 h-64 bg-peach-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-gold-100 text-gold-700 mb-4">
                <BookOpen className="w-3.5 h-3.5" /> REHBERL{"\u0130"}K PROGRAMI
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Aile Rehberlik{" "}
              <span className="highlight">Program{"\u0131"}</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              D{"\u00F6"}rt ad{"\u0131"}mda {"\u00E7"}ocu{"\u011F"}unuzun geli{"\u015F"}imini birlikte planl{"\u0131"}yor, uyguluyoruz ve {"\u00F6"}l{"\u00E7\u00FC"}yoruz.
            </p>
          </div>

          {/* Timeline path with polaroid cards */}
          <div className="relative">
            {/* Dotted connector line (desktop) */}
            <div
              className="hidden lg:block absolute top-1/2 left-[8%] right-[8%] h-0 z-[1]"
              style={{
                borderTop: "3px dashed rgba(245,197,24,0.35)",
                transform: "translateY(-50%)",
              }}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-[2]">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`anim d${Math.min(i + 1, 4)} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                  style={{ transform: `rotate(${s.rotate})` }}
                >
                  {/* Step number stamp on the dotted line */}
                  <div className="flex justify-center mb-4">
                    <div
                      className="w-12 h-12 rounded-full border-[3px] border-dashed flex items-center justify-center bg-white shadow-sm"
                      style={{ borderColor: s.color + "60" }}
                    >
                      <span
                        className="text-[0.75rem] font-extrabold"
                        style={{ color: s.color }}
                      >
                        {s.step}
                      </span>
                    </div>
                  </div>

                  {/* Polaroid card */}
                  <div
                    className="relative bg-white p-2.5 rounded-sm"
                    style={{
                      boxShadow: "3px 4px 14px rgba(0,0,0,0.1), 1px 1px 4px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Photo area with icon */}
                    <div
                      className="w-full h-28 rounded-sm flex items-center justify-center relative overflow-hidden"
                      style={{ background: s.imgBg }}
                    >
                      <s.icon className="w-10 h-10" style={{ color: s.color, opacity: 0.35 }} />

                      {/* Washi tape across corner */}
                      <div
                        className="absolute -top-1 -right-2 w-16 h-4 rounded-sm"
                        style={{
                          background: `repeating-linear-gradient(45deg, ${s.color}, ${s.color} 3px, ${s.color}40 3px, ${s.color}40 6px)`,
                          opacity: 0.4,
                          transform: "rotate(35deg)",
                        }}
                      />
                    </div>

                    {/* Caption */}
                    <div className="pt-3 pb-2 px-1">
                      <h4
                        className="font-display text-[0.95rem] font-extrabold mb-1.5 leading-tight"
                        style={{ color: s.color }}
                      >
                        {s.title}
                      </h4>
                      <p className="text-[0.78rem] text-slate-500 leading-relaxed">
                        {s.text}
                      </p>
                    </div>

                    {/* Mini stamp label */}
                    <div
                      className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded border border-dashed text-[0.5rem] font-bold uppercase bg-white"
                      style={{ borderColor: s.color + "50", color: s.color + "80", transform: "rotate(-8deg)" }}
                    >
                      {s.stampLabel}
                    </div>
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

/* =================================================================
   SECTION 3 \u2014 Aileler Ne Diyor?
   Polaroid testimonials on scrapbook page
   ================================================================= */
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "O\u011Flumun \u00F6z g\u00FCveninde inan\u0131lmaz bir de\u011Fi\u015Fim ya\u015Fand\u0131. Art\u0131k arkada\u015Flar\u0131yla \u00E7ok daha sa\u011Fl\u0131kl\u0131 ili\u015Fkiler kuruyor. Haftal\u0131k raporlar sayesinde geli\u015Fimini ad\u0131m ad\u0131m takip edebiliyorum.",
      name: "Ay\u015Fe K.",
      role: "2 \u00E7ocuk annesi, \u0130stanbul",
      color: "#1B3A7B",
      photoBg: "#EBF2FB",
      rotate: "-2.5deg",
      tapeColor1: "#1B3A7B",
      tapeColor2: "#4D7EC4",
    },
    {
      quote:
        "K\u0131z\u0131m canl\u0131 seanslar\u0131 \u00E7ok seviyor. Grup i\u00E7inde konu\u015Fmaktan \u00E7ekinen bir \u00E7ocuktu; \u015Fimdi fikirlerini rahatl\u0131kla ifade edebiliyor. LearnecoHub ger\u00E7ekten hayat\u0131m\u0131z\u0131 de\u011Fi\u015Ftirdi.",
      name: "Mehmet T.",
      role: "1 \u00E7ocuk babas\u0131, Ankara",
      color: "#EE7A45",
      photoBg: "#FEF5F0",
      rotate: "2deg",
      tapeColor1: "#EE7A45",
      tapeColor2: "#F5C518",
    },
    {
      quote:
        "Dijital portfoly\u00F6 \u00F6zelli\u011Fi harika! \u00C7ocu\u011Fumun kazand\u0131\u011F\u0131 rozetleri ve geli\u015Fim grafiklerini g\u00F6rmek bizi \u00E7ok motive ediyor. Uzmanlarla birebir g\u00F6r\u00FC\u015Fme imkan\u0131 da \u00E7ok de\u011Ferli.",
      name: "Zeynep A.",
      role: "3 \u00E7ocuk annesi, Bursa",
      color: "#7F63CB",
      photoBg: "#F0EDF9",
      rotate: "-1deg",
      tapeColor1: "#7F63CB",
      tapeColor2: "#B5A3E0",
    },
  ];

  return (
    <Section>
      <section className="py-24 bg-[#E8F4FD] relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-16 right-[10%] w-60 h-60 bg-brand-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-[8%] w-56 h-56 bg-peach-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-blue-100 text-blue-700 mb-4">
                <Star className="w-3.5 h-3.5" /> A{"\u0130"}LELER NE D{"\u0130"}YOR?
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Ailelerden{" "}
              <span className="text-gradient">Ger{"\u00E7"}ek Yorumlar</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              LearnecoHub ailesinin {"\u00FC"}yelerinden ilham verici deneyimler.
            </p>
          </div>

          {/* Scrapbook page container */}
          <div
            className="relative rounded-3xl p-6 sm:p-8 lg:p-10"
            style={{
              background: "linear-gradient(145deg, #FFF8F0 0%, #FFF5E8 100%)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.03)",
            }}
          >
            {/* Subtle lined paper texture */}
            <div
              className="absolute inset-0 rounded-3xl opacity-[0.03]"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 27px, #aaa 27px, #aaa 28px)",
              }}
            />

            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`anim d${i + 1} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                  style={{ transform: `rotate(${t.rotate})` }}
                >
                  {/* Polaroid testimonial card */}
                  <div
                    className="relative bg-white p-3 rounded-sm"
                    style={{
                      boxShadow: "3px 5px 16px rgba(0,0,0,0.1), 1px 1px 4px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Washi tape */}
                    <div
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 rounded-sm z-10"
                      style={{
                        background: `repeating-linear-gradient(45deg, ${t.tapeColor1}, ${t.tapeColor1} 3px, ${t.tapeColor2} 3px, ${t.tapeColor2} 6px)`,
                        opacity: 0.5,
                        transform: "rotate(-3deg)",
                      }}
                    />

                    {/* Quote area (simulating the "photo" part of polaroid) */}
                    <div
                      className="w-full rounded-sm p-4 relative min-h-[160px]"
                      style={{ background: t.photoBg }}
                    >
                      {/* Quote icon */}
                      <Quote className="w-6 h-6 mb-2 opacity-25" style={{ color: t.color }} />

                      {/* Quote text */}
                      <p className="text-[0.82rem] text-slate-600 leading-relaxed italic">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    {/* Caption area (like polaroid bottom) */}
                    <div className="pt-3 pb-1.5 px-1">
                      {/* Stars */}
                      <div className="flex items-center gap-0.5 mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className="w-3.5 h-3.5 fill-[#F5C518] text-[#F5C518]"
                          />
                        ))}
                      </div>

                      {/* Author info */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-[0.78rem]"
                          style={{ background: t.color }}
                        >
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <span className="block text-[0.82rem] font-bold text-slate-700">
                            {t.name}
                          </span>
                          <span className="block text-[0.72rem] text-slate-400">{t.role}</span>
                        </div>
                      </div>
                    </div>

                    {/* Photo corner accents */}
                    <div className="absolute top-2 left-2">
                      <div
                        className="w-0 h-0 border-l-[8px] border-b-[8px] border-l-transparent"
                        style={{ borderBottomColor: t.color + "20" }}
                      />
                    </div>
                    <div className="absolute top-2 right-2">
                      <div
                        className="w-0 h-0 border-r-[8px] border-b-[8px] border-r-transparent"
                        style={{ borderBottomColor: t.color + "20" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative stamps on the scrapbook */}
            <div
              className="hidden lg:flex absolute top-4 right-6 w-14 h-14 rounded-full border-2 border-dashed items-center justify-center z-20"
              style={{ borderColor: "#2ECC71" + "40", transform: "rotate(20deg)" }}
            >
              <CheckCircle2 className="w-5 h-5" style={{ color: "#2ECC71" + "50" }} />
            </div>
            <div
              className="hidden lg:flex absolute bottom-6 left-6 w-16 h-16 rounded-full border-2 border-dashed items-center justify-center bg-white/60 z-20"
              style={{ borderColor: "#F5C518" + "40", transform: "rotate(-10deg)" }}
            >
              <span className="text-[0.5rem] font-extrabold uppercase" style={{ color: "#F5C518" + "70" }}>
                5 Y{"\u0131"}ld{"\u0131"}z
              </span>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* =================================================================
   SECTION 4 \u2014 Rakamlarla LearnecoHub
   Stamp/postmark style stat cards
   ================================================================= */
function RakamlarSection() {
  const stats = [
    {
      icon: Users,
      value: 5000,
      suffix: "+",
      label: "Aile",
      text: "LearnecoHub ailesine kat\u0131lan ve \u00E7ocuklar\u0131n\u0131n geli\u015Fimini destekleyen aile say\u0131s\u0131.",
      color: "#EE7A45",
      stampLines: 3,
    },
    {
      icon: Award,
      value: 96,
      suffix: "%",
      label: "Memnuniyet",
      text: "Ailelerin programa verdikleri genel memnuniyet puan\u0131.",
      color: "#2ECC71",
      stampLines: 4,
    },
    {
      icon: UserCheck,
      value: 200,
      suffix: "+",
      label: "Uzman",
      text: "Psikolog, pedagog ve e\u011Fitim uzmanlar\u0131ndan olu\u015Fan deneyimli kadromuz.",
      color: "#7F63CB",
      stampLines: 3,
    },
    {
      icon: MapPin,
      value: 50,
      suffix: "+",
      label: "\u0130l\u00E7e",
      text: "T\u00FCrkiye genelinde hizmet verdi\u011Fimiz il\u00E7e say\u0131s\u0131.",
      color: "#1B3A7B",
      stampLines: 4,
    },
  ];

  return (
    <Section>
      <section className="py-24 bg-[#ECFBF2] relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-16 right-[12%] w-56 h-56 bg-mint-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-[6%] w-64 h-64 bg-gold-200/15 rounded-full blur-3xl" />
        <div className="absolute top-[40%] left-[40%] w-48 h-48 bg-peach-200/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-emerald-100 text-emerald-700 mb-4">
                <BarChart3 className="w-3.5 h-3.5" /> RAKAMLARLA LEARNECOHUB
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Rakamlarla{" "}
              <span className="highlight">LearnecoHub</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Binlerce ailenin g{"\u00FC"}vendi{"\u011F"}i, uzmanlar taraf{"\u0131"}ndan desteklenen bir platform.
            </p>
          </div>

          {/* Stamp / postmark style stat cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className={`anim d${Math.min(i + 1, 4)}`}>
                <div
                  className="relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 p-6 text-center"
                  style={{
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Large circular stamp border overlay */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full border-[3px] border-dashed pointer-events-none"
                    style={{ borderColor: s.color + "18", transform: "translate(-50%, -50%) rotate(15deg)" }}
                  />
                  {/* Inner stamp circle */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] rounded-full border-[2px] border-dashed pointer-events-none"
                    style={{ borderColor: s.color + "10", transform: "translate(-50%, -50%) rotate(-10deg)" }}
                  />

                  {/* Postmark horizontal lines */}
                  <div className="absolute top-3 right-3 w-12 flex flex-col gap-[3px] pointer-events-none">
                    {Array.from({ length: s.stampLines }).map((_, j) => (
                      <div
                        key={j}
                        className="h-[1.5px] w-full rounded-full"
                        style={{ background: s.color + "15" }}
                      />
                    ))}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center relative z-[1]"
                    style={{ background: s.color + "12" }}
                  >
                    <s.icon className="w-7 h-7" style={{ color: s.color }} />
                  </div>

                  {/* Counter */}
                  <p
                    className="font-display text-4xl font-extrabold leading-none mb-1 relative z-[1]"
                    style={{ color: s.color }}
                  >
                    <Counter target={s.value} suffix={s.suffix} />
                  </p>

                  {/* Label */}
                  <h4
                    className="font-display text-[0.95rem] font-extrabold mb-2 relative z-[1]"
                    style={{ color: s.color }}
                  >
                    {s.label}
                  </h4>

                  {/* Dashed divider like a stamp perforation */}
                  <div
                    className="h-0 w-16 mx-auto mb-3 border-t-2 border-dashed relative z-[1]"
                    style={{ borderColor: s.color + "30" }}
                  />

                  {/* Text */}
                  <p className="text-[0.78rem] text-slate-500 leading-relaxed relative z-[1]">
                    {s.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

/* =================================================================
   PAGE EXPORT
   ================================================================= */
export default function AilelerIcinPage() {
  return (
    <main>
      {/* --- Navbar --- */}
      <SubpageNavbar active={"Aileler \u0130\u00E7in"} />

      {/* --- Custom Hero (Scrapbook style) --- */}
      <CustomHero />

      {/* --- Aileniz İçin Ne Sunuyoruz? --- */}
      <SunuyoruzSection />

      {/* --- Aile Rehberlik Programı --- */}
      <RehberlikSection />

      {/* --- Aileler Ne Diyor? --- */}
      <TestimonialsSection />

      {/* --- Rakamlarla LearnecoHub --- */}
      <RakamlarSection />

      {/* --- Final CTA --- */}
      <FinalCTA />

      {/* --- Footer --- */}
      <SubpageFooter />
    </main>
  );
}
