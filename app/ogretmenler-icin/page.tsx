"use client";

import {
  Section, SubpageNavbar, SubpageHero, FinalCTA, SubpageFooter,
} from "@/components/subpage-shared";
import {
  GraduationCap, BookOpen, FileText, Gamepad2, BarChart3,
  CheckCircle2, Video, PenTool, ClipboardList, Users,
  TrendingUp, MessageCircle, Printer, Compass, Quote,
  ArrowRight, Layers, Monitor, Star,
} from "lucide-react";

/* ===============================================
   HERO
   =============================================== */
function Hero() {
  return (
    <SubpageHero
      breadcrumb={"\u00D6\u011Fretmenler \u0130\u00E7in"}
      tag={"\u00D6\u011FRETMENLER \u0130\u00C7\u0130N"}
      tagIcon={GraduationCap}
      title={"\u00D6\u011Fretmenler i\u00E7in haz\u0131r"}
      titleHighlight={"dijital m\u00FCfredat."}
      description={"S\u0131n\u0131f i\u00E7i ve rehberlik uygulamalar\u0131n\u0131z i\u00E7in s\u0131f\u0131r haz\u0131rl\u0131kla kullanabilece\u011Finiz sosyal-duygusal beceri m\u00FCfredat\u0131. Ders planlar\u0131, etkinlik materyalleri ve \u00F6l\u00E7me ara\u00E7lar\u0131 haz\u0131r."}
      theme="lavender"
    >
      {/* Right side - video + stat pills */}
      <div className="flex-shrink-0 w-full sm:w-[320px] lg:w-[360px] space-y-3">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
          <video
            className="w-full h-auto"
            muted
            playsInline
            loop
            autoPlay
          >
            <source src="https://learnecohub.com/wp-content/uploads/2025/07/Etkilesimli-Video-Tanitim-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
        </div>
        {/* Mini stat row under video */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { text: "500+", label: "Materyal" },
            { text: "200+", label: "Video" },
            { text: "80+", label: "Oyun" },
            { text: "120+", label: "Ders" },
          ].map((s, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl py-2 text-center">
              <p className="font-display text-sm font-extrabold text-white leading-none">{s.text}</p>
              <p className="text-[0.6rem] text-white/50 font-semibold mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SubpageHero>
  );
}

/* ===============================================
   SECTION 1 — Sifir Hazirlikla Ogretin
   Clipboard for main text + Notebook style cards for 6 teacher tools
   bg-white
   =============================================== */
function SifirHazirlik() {
  const benefits = [
    { icon: ClipboardList, title: "Haz\u0131r Ders Planlar\u0131", desc: "Her ders i\u00E7in ad\u0131m ad\u0131m haz\u0131rlanm\u0131\u015F, an\u0131nda uygulanabilir ders planlar\u0131.", tabColor: "#1B3A7B" },
    { icon: PenTool, title: "Etkinlik Materyalleri", desc: "S\u0131n\u0131f i\u00E7i ve bireysel uygulamalar i\u00E7in tasarlanm\u0131\u015F zengin etkinlik seti.", tabColor: "#2ECC71" },
    { icon: BarChart3, title: "\u00D6l\u00E7me Ara\u00E7lar\u0131", desc: "\u00D6\u011Frenci geli\u015Fimini takip eden de\u011Ferlendirme formlar\u0131 ve rubrikler.", tabColor: "#7F63CB" },
    { icon: Monitor, title: "\u00D6\u011Frenci Takip Paneli", desc: "Her \u00F6\u011Frencinin geli\u015Fimini anl\u0131k izleyebilece\u011Finiz dijital panel.", tabColor: "#EE7A45" },
    { icon: Printer, title: "500+ Yazd\u0131r\u0131labilir Sayfa", desc: "Dijital ve bask\u0131ya haz\u0131r \u00E7al\u0131\u015Fma sayfalar\u0131, g\u00F6zlem formlar\u0131.", tabColor: "#F5C518" },
    { icon: Compass, title: "Uygulama K\u0131lavuzlar\u0131", desc: "Her mod\u00FCl i\u00E7in detayl\u0131 \u00F6\u011Fretmen rehberi ve uygulama \u00F6nerileri.", tabColor: "#1B3A7B" },
  ];

  return (
    <Section>
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-lavender-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="anim">
              <span className="tag bg-lavender-100 text-lavender-700 mb-4">
                <GraduationCap className="w-3.5 h-3.5" /> SIFIR HAZIRLIK
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              S{"\u0131"}f{"\u0131"}r haz{"\u0131"}rl{"\u0131"}kla{" "}
              <span className="highlight">{"\u00F6\u011F"}retin</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              T{"\u00FC"}m ders planlar{"\u0131"}, materyaller ve {"\u00F6"}l{"\u00E7"}me ara{"\u00E7"}lar{"\u0131"} haz{"\u0131"}r. Sadece a{"\u00E7"}{"\u0131"}n ve {"\u00F6\u011F"}retmeye ba{"\u015F"}lay{"\u0131"}n.
            </p>
          </div>

          {/* Clipboard — main description block */}
          <div className="anim d2 max-w-3xl mx-auto mb-14">
            <div className="relative bg-[#FAFAF8] rounded-2xl border border-slate-200 shadow-md overflow-visible">
              {/* Metal clip */}
              <div className="flex justify-center -mt-4 relative z-20">
                <div className="w-20 h-8 rounded-b-xl bg-slate-400 border-2 border-slate-500 shadow-sm flex items-end justify-center pb-1">
                  <div className="w-10 h-1.5 rounded-full bg-slate-300" />
                </div>
              </div>
              <div className="px-8 py-6 space-y-4">
                <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                  {"\u00D6\u011F"}retmenler ve okul rehber dan{"\u0131\u015F"}manlar{"\u0131"} (PDR) i{"\u00E7"}in{" "}
                  <span className="font-bold text-slate-800 underline decoration-[#F5C518] decoration-2 underline-offset-2">kullan{"\u0131"}ma haz{"\u0131"}r dijital m{"\u00FC"}fredat</span> sunuyoruz.
                  Ders plan{"\u0131"} haz{"\u0131"}rlamaya, materyal aramaya, i{"\u00E7"}erik {"\u00FC"}retmeye son.
                  T{"\u00FC"}m i{"\u00E7"}eriklerimiz bilimsel temelli, ya{"\u015F"} grubuna uygun ve MEB m{"\u00FC"}fredat{"\u0131"}yla uyumludur.
                </p>
                <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                  Her mod{"\u00FC"}l{" "}
                  <span className="font-bold text-slate-800 underline decoration-[#7F63CB] decoration-2 underline-offset-2">animasyonlu video, etkile{"\u015F"}imli oyun, etkinlik ve {"\u00F6"}l{"\u00E7"}me arac{"\u0131"}</span>{" "}
                  i{"\u00E7"}erir. {"\u00D6\u011F"}retmen panelinizden {"\u00F6\u011F"}renci geli{"\u015F"}imini takip edebilir,
                  s{"\u0131"}n{"\u0131"}f raporlar{"\u0131"} olu{"\u015F"}turabilir ve velilerle payla{"\u015F"}abilirsiniz.
                </p>
              </div>
            </div>
          </div>

          {/* Notebook style cards — 6 teacher tools */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((n, i) => (
              <div key={i} className={`anim d${Math.min(i + 1, 6)} group`}>
                <div className="relative bg-white rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)" }}>
                  {/* Colored tab strip */}
                  <div className="relative h-9 flex items-center px-4" style={{ background: n.tabColor }}>
                    {/* Spiral ring hole */}
                    <div className="w-4 h-4 rounded-full border-[2px] border-white/60 bg-transparent" />
                    <div className="ml-auto">
                      <n.icon className="w-4 h-4 text-white/70" />
                    </div>
                  </div>
                  {/* Lined paper body */}
                  <div className="relative p-5 pl-12" style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #e8e8e8 27px, #e8e8e8 28px)",
                    backgroundPosition: "0 12px",
                  }}>
                    {/* Red margin line */}
                    <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-red-300/40 pointer-events-none" />
                    <h4 className="font-display text-[0.95rem] font-extrabold text-slate-800 mb-1.5 leading-tight">{n.title}</h4>
                    <p className="text-[0.82rem] text-slate-500 leading-relaxed">{n.desc}</p>
                  </div>
                  {/* Bottom torn edge */}
                  <div className="h-2 w-full" style={{
                    background: `linear-gradient(135deg, white 33.33%, transparent 33.33%) -6px 0, linear-gradient(225deg, white 33.33%, transparent 33.33%) -6px 0`,
                    backgroundSize: "12px 12px",
                    backgroundColor: n.tabColor + "18",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ===============================================
   SECTION 2 — Moduler Mufredat Sistemi
   Sticky notes board for 4 module steps (Video -> Oyun -> Etkinlik -> Olcme)
   bg-[#FFFBEB]
   =============================================== */
function ModulerMufredat() {
  const modules = [
    {
      icon: Video,
      num: "01",
      title: "Animasyon Video",
      desc: "Hikayele\u015Ftirilmi\u015F, ya\u015F grubuna uygun animasyonlu videolarla beceriyi tan\u0131t\u0131n. \u00D6\u011Frenciler izlerken ke\u015Ffeder.",
      color: "#1B3A7B",
      bg: "#EBF2FB",
      rotate: "-2deg",
    },
    {
      icon: Gamepad2,
      num: "02",
      title: "Etkile\u015Fimli Oyun",
      desc: "Karar oyunlar\u0131, empati sim\u00FClasyonlar\u0131 ve tak\u0131m g\u00F6revleriyle \u00F6\u011Frenileni peki\u015Ftirin.",
      color: "#2ECC71",
      bg: "#ECFBF2",
      rotate: "1.5deg",
    },
    {
      icon: PenTool,
      num: "03",
      title: "Etkinlik & Uygulama",
      desc: "\u00C7al\u0131\u015Fma sayfalar\u0131, grup etkinlikleri ve bireysel uygulamalarla beceriyi hayata ge\u00E7irin.",
      color: "#EE7A45",
      bg: "#FEF5F0",
      rotate: "-1deg",
    },
    {
      icon: BarChart3,
      num: "04",
      title: "De\u011Ferlendirme",
      desc: "Rubrikler, g\u00F6zlem formlar\u0131 ve dijital de\u011Ferlendirme ara\u00E7lar\u0131yla ilerlemeyi \u00F6l\u00E7\u00FCn.",
      color: "#7F63CB",
      bg: "#F0EDF9",
      rotate: "2deg",
    },
  ];

  return (
    <Section>
      <section className="py-24 bg-[#FFFBEB] relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-16 left-[10%] w-56 h-56 bg-gold-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-[5%] w-64 h-64 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 dots-pattern opacity-[0.06]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-gold-100 text-gold-700 mb-4">
                <Layers className="w-3.5 h-3.5" /> MOD{"\u00DC"}LER S{"\u0130"}STEM
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Mod{"\u00FC"}ler{" "}
              <span className="highlight">m{"\u00FC"}fredat sistemi</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Her beceri mod{"\u00FC"}l{"\u00FC"} 4 a{"\u015F"}amal{"\u0131"} {"\u00F6\u011F"}renme d{"\u00F6"}ng{"\u00FC"}s{"\u00FC"}yle tasarlanm{"\u0131\u015F"}t{"\u0131"}r.
            </p>
          </div>

          {/* Cork board with sticky notes */}
          <div
            className="relative rounded-3xl p-8 sm:p-10 lg:p-12"
            style={{
              background: "linear-gradient(145deg, #f5f0e8 0%, #ebe4d8 100%)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            {/* Cork texture dots */}
            <div className="absolute inset-0 rounded-3xl opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)", backgroundSize: "12px 12px" }} />

            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {modules.map((m, i) => (
                <div
                  key={i}
                  className={`anim d${i + 1} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                  style={{ transform: `rotate(${m.rotate})` }}
                >
                  <div
                    className="relative rounded-sm p-6 min-h-[220px]"
                    style={{
                      background: m.bg,
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
                        background: `linear-gradient(135deg, ${m.bg} 50%, transparent 50%)`,
                        filter: "brightness(0.92)",
                      }}
                    />
                    {/* Large step number watermark */}
                    <div
                      className="absolute top-3 right-4 font-display text-5xl font-black select-none"
                      style={{ color: m.color, opacity: 0.08 }}
                    >
                      {m.num}
                    </div>
                    {/* Icon */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: m.color + "15" }}
                    >
                      <m.icon className="w-5.5 h-5.5" style={{ color: m.color }} />
                    </div>
                    {/* Title */}
                    <h4 className="font-display text-[1rem] font-extrabold mb-2 leading-tight" style={{ color: m.color }}>
                      {m.title}
                    </h4>
                    {/* Description */}
                    <p className="text-[0.82rem] text-slate-500 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow flow connectors for desktop */}
            <div className="hidden lg:flex items-center justify-center mt-8 gap-2">
              {["Video", "Oyun", "Etkinlik", "De\u011Ferlendirme"].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="text-[0.78rem] font-bold px-3 py-1 rounded-full"
                    style={{
                      color: modules[i].color,
                      background: modules[i].bg,
                    }}
                  >
                    {step}
                  </span>
                  {i < 3 && <ArrowRight className="w-4 h-4 text-slate-300" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ===============================================
   SECTION 3 — Ogretmen Paneli
   Clipboard for dashboard description + Notebook cards for 4 dashboard features
   bg-[#E8F4FD]
   =============================================== */
function OgretmenPaneli() {
  const capabilities = [
    { icon: TrendingUp, title: "\u00D6\u011Frenci Geli\u015Fimi", desc: "Her \u00F6\u011Frencinin beceri geli\u015Fimini anl\u0131k takip edin, bireysel geli\u015Fim grafikleri olu\u015Fturun.", tabColor: "#1B3A7B" },
    { icon: Users, title: "Grup Raporlar\u0131", desc: "S\u0131n\u0131f ve grup baz\u0131nda kar\u015F\u0131la\u015Ft\u0131rmal\u0131 raporlar haz\u0131rlay\u0131n, g\u00FC\u00E7l\u00FC ve geli\u015Fim alanlar\u0131n\u0131 belirleyin.", tabColor: "#2ECC71" },
    { icon: BookOpen, title: "Ders Planlama", desc: "Haftal\u0131k ve ayl\u0131k ders planlar\u0131n\u0131z\u0131 olu\u015Fturun, i\u00E7erikleri takvime ekleyin.", tabColor: "#F5C518" },
    { icon: MessageCircle, title: "Veli \u0130leti\u015Fimi", desc: "Geli\u015Fim raporlar\u0131n\u0131 velilerle payla\u015F\u0131n, \u00F6neriler ve geri bildirimler g\u00F6nderin.", tabColor: "#7F63CB" },
  ];

  const stats = [
    { num: "500+", label: "Materyal", color: "#1B3A7B", bg: "#EBF2FB" },
    { num: "200+", label: "Video Ders", color: "#2ECC71", bg: "#ECFBF2" },
    { num: "%95", label: "Memnuniyet", color: "#F5C518", bg: "#FFFBEB" },
    { num: "50+", label: "Okul", color: "#7F63CB", bg: "#F0EDF9" },
  ];

  return (
    <Section>
      <section className="py-24 bg-[#E8F4FD] relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-20 right-[8%] w-60 h-60 bg-brand-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[5%] w-52 h-52 bg-mint-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="anim">
              <span className="tag bg-brand-100 text-brand-700 mb-4">
                <Monitor className="w-3.5 h-3.5" /> {"\u00D6\u011F"}RETMEN PANEL{"\u0130"}
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              G{"\u00FC\u00E7"}l{"\u00FC"}{" "}
              <span className="text-gradient">{"\u00F6\u011F"}retmen paneli</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              {"\u00D6\u011F"}renci geli{"\u015F"}imini takip edin, raporlar olu{"\u015F"}turun, ders planlar{"\u0131"}n{"\u0131"}z{"\u0131"} y{"\u00F6"}netin.
            </p>
          </div>

          {/* Clipboard — Dashboard description */}
          <div className="anim d2 max-w-3xl mx-auto mb-14">
            <div className="relative bg-[#FAFAF8] rounded-2xl border border-slate-200 shadow-md overflow-visible">
              {/* Metal clip */}
              <div className="flex justify-center -mt-4 relative z-20">
                <div className="w-20 h-8 rounded-b-xl bg-[#1B3A7B] border-2 border-[#13305f] shadow-sm flex items-end justify-center pb-1">
                  <div className="w-10 h-1.5 rounded-full bg-white/30" />
                </div>
              </div>
              <div className="px-8 py-6 space-y-4">
                <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                  {"\u00D6\u011F"}retmen paneliniz, t{"\u00FC"}m s{"\u0131"}n{"\u0131"}f{"\u0131"}n{"\u0131"}z{"\u0131"} tek bir ekrandan y{"\u00F6"}netmenizi sa{"\u011F"}lar.{" "}
                  <span className="font-bold text-slate-800 underline decoration-[#1B3A7B] decoration-2 underline-offset-2">Her {"\u00F6\u011F"}rencinin hangi beceri mod{"\u00FC"}l{"\u00FC"}nde oldu{"\u011F"}unu, tamamlama oranlar{"\u0131"}n{"\u0131"} ve de{"\u011F"}erlendirme sonu{"\u00E7"}lar{"\u0131"}n{"\u0131"}</span>{" "}
                  anl{"\u0131"}k olarak g{"\u00F6"}rebilirsiniz.
                </p>
                <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                  Haftal{"\u0131"}k ve ayl{"\u0131"}k{" "}
                  <span className="font-bold text-slate-800 underline decoration-[#F5C518] decoration-2 underline-offset-2">otomatik raporlar</span>{" "}
                  sayesinde PDR uzmanlar{"\u0131"} ve okul y{"\u00F6"}neticileriyle kolayca bilgi payla{"\u015F"}abilir,
                  velilere d{"\u00FC"}zenli geli{"\u015F"}im bildirimleri g{"\u00F6"}nderebilirsiniz.
                </p>
              </div>
            </div>
          </div>

          {/* Notebook cards — 4 dashboard features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {capabilities.map((c, i) => (
              <div key={i} className={`anim d${i + 1} group`}>
                <div className="relative bg-white rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)" }}>
                  {/* Colored tab strip */}
                  <div className="relative h-9 flex items-center px-4" style={{ background: c.tabColor }}>
                    <div className="w-4 h-4 rounded-full border-[2px] border-white/60 bg-transparent" />
                    <div className="ml-auto">
                      <c.icon className="w-4 h-4 text-white/70" />
                    </div>
                  </div>
                  {/* Lined paper body */}
                  <div className="relative p-5 pl-12 min-h-[130px]" style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #e8e8e8 27px, #e8e8e8 28px)",
                    backgroundPosition: "0 12px",
                  }}>
                    {/* Red margin line */}
                    <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-red-300/40 pointer-events-none" />
                    <h4 className="font-display text-[0.95rem] font-extrabold text-slate-800 mb-1.5 leading-tight">{c.title}</h4>
                    <p className="text-[0.82rem] text-slate-500 leading-relaxed">{c.desc}</p>
                  </div>
                  {/* Bottom torn edge */}
                  <div className="h-2 w-full" style={{
                    background: `linear-gradient(135deg, white 33.33%, transparent 33.33%) -6px 0, linear-gradient(225deg, white 33.33%, transparent 33.33%) -6px 0`,
                    backgroundSize: "12px 12px",
                    backgroundColor: c.tabColor + "18",
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Stats row — pastel cards */}
          <div className="anim d3">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="card-3d p-6 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: s.bg,
                    borderBottomWidth: "5px",
                    borderBottomColor: s.color,
                  }}
                >
                  <p className="font-display text-3xl sm:text-4xl font-extrabold leading-none mb-1" style={{ color: s.color }}>
                    {s.num}
                  </p>
                  <p className="text-[0.82rem] font-semibold text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ===============================================
   SECTION 4 — Ogretmenlerden Geri Bildirimler
   Sticky notes board for 3 teacher testimonials
   bg-[#ECFBF2]
   =============================================== */
function GeriBildirimler() {
  const testimonials = [
    {
      quote: "LearnecoHub sayesinde ders haz\u0131rl\u0131\u011F\u0131na harcad\u0131\u011F\u0131m s\u00FCre yar\u0131 yar\u0131ya azald\u0131. Haz\u0131r ders planlar\u0131 ve materyaller hayat\u0131m\u0131 kolayla\u015Ft\u0131rd\u0131.",
      name: "Ay\u015Fe K.",
      role: "S\u0131n\u0131f \u00D6\u011Fretmeni, \u0130stanbul",
      color: "#1B3A7B",
      bg: "#EBF2FB",
      rotate: "-1.5deg",
    },
    {
      quote: "PDR \u00E7al\u0131\u015Fmalar\u0131m\u0131zda kullan\u0131yoruz. \u00D6\u011Frencilerin sosyal-duygusal geli\u015Fimini \u00F6l\u00E7\u00FClebilir hale getirmemize b\u00FCy\u00FCk katk\u0131 sa\u011Flad\u0131.",
      name: "Mehmet Y.",
      role: "Rehber Dan\u0131\u015Fman, Ankara",
      color: "#2ECC71",
      bg: "#ECFBF2",
      rotate: "2deg",
    },
    {
      quote: "Animasyonlu videolar \u00F6\u011Frencilerin ilgisini hemen \u00E7ekiyor. De\u011Ferlendirme ara\u00E7lar\u0131 ile geli\u015Fimi somut olarak g\u00F6rebiliyoruz.",
      name: "Zeynep T.",
      role: "Okul \u00D6ncesi \u00D6\u011Fretmeni, \u0130zmir",
      color: "#7F63CB",
      bg: "#F0EDF9",
      rotate: "-1deg",
    },
  ];

  return (
    <Section>
      <section className="py-24 bg-[#ECFBF2] relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-16 right-[10%] w-60 h-60 bg-mint-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-[8%] w-56 h-56 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 dots-pattern opacity-[0.06]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-mint-100 text-mint-700 mb-4">
                <Star className="w-3.5 h-3.5" /> GER{"\u0130"} B{"\u0130"}LD{"\u0130"}R{"\u0130"}MLER
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              {"\u00D6\u011F"}retmenlerden{" "}
              <span className="highlight">geri bildirimler</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              LearnecoHub kullanan {"\u00F6\u011F"}retmen ve uzmanlar{"\u0131"}n deneyimleri.
            </p>
          </div>

          {/* Cork board with sticky note testimonials */}
          <div
            className="relative rounded-3xl p-8 sm:p-10 lg:p-12"
            style={{
              background: "linear-gradient(145deg, #f5f0e8 0%, #ebe4d8 100%)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            {/* Cork texture dots */}
            <div className="absolute inset-0 rounded-3xl opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)", backgroundSize: "12px 12px" }} />

            <div className="relative z-10 grid sm:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`anim d${i + 1} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                  style={{ transform: `rotate(${t.rotate})` }}
                >
                  <div
                    className="relative rounded-sm p-6 min-h-[230px] flex flex-col"
                    style={{
                      background: t.bg,
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
                        background: `linear-gradient(135deg, ${t.bg} 50%, transparent 50%)`,
                        filter: "brightness(0.92)",
                      }}
                    />
                    {/* Quote icon */}
                    <Quote className="w-6 h-6 mb-3 opacity-40" style={{ color: t.color }} />
                    {/* Quote text */}
                    <p className="text-[0.88rem] text-slate-600 leading-[1.85] font-medium flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    {/* Author */}
                    <div className="flex items-center gap-3 mt-4 pt-3 border-t" style={{ borderColor: t.color + "20" }}>
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-display font-extrabold text-[0.78rem]"
                        style={{ background: t.color + "15", color: t.color }}
                      >
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-display text-[0.85rem] font-extrabold text-slate-700">{t.name}</p>
                        <p className="text-[0.72rem] text-slate-400 font-medium">{t.role}</p>
                      </div>
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

/* ===============================================
   PAGE
   =============================================== */
export default function OgretmenlerIcinPage() {
  return (
    <main>
      <SubpageNavbar active={"\u00D6\u011Fretmenler \u0130\u00E7in"} />
      <Hero />
      <SifirHazirlik />
      <ModulerMufredat />
      <OgretmenPaneli />
      <GeriBildirimler />
      <FinalCTA />
      <SubpageFooter />
    </main>
  );
}
