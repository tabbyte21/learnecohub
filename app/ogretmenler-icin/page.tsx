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
      breadcrumb={"Öğretmenler İçin"}
      tag={"ÖğRETMENLER İÇİN"}
      tagIcon={GraduationCap}
      title={"Öğretmenler için hazır"}
      titleHighlight={"dijital müfredat."}
      description={"Sınıf içi ve rehberlik uygulamalarınız için sıfır hazırlıkla kullanabileceğiniz sosyal-duygusal beceri müfredatı. Ders planları, etkinlik materyalleri ve ölçme araçları hazır."}
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
    { icon: ClipboardList, title: "Hazır Ders Planları", desc: "Her ders için adım adım hazırlanmış, anında uygulanabilir ders planları.", tabColor: "#1B3A7B" },
    { icon: PenTool, title: "Etkinlik Materyalleri", desc: "Sınıf içi ve bireysel uygulamalar için tasarlanmış zengin etkinlik seti.", tabColor: "#2ECC71" },
    { icon: BarChart3, title: "Ölçme Araçları", desc: "Öğrenci gelişimini takip eden değerlendirme formları ve rubrikler.", tabColor: "#7F63CB" },
    { icon: Monitor, title: "Öğrenci Takip Paneli", desc: "Her öğrencinin gelişimini anlık izleyebileceğiniz dijital panel.", tabColor: "#EE7A45" },
    { icon: Printer, title: "500+ Yazdırılabilir Sayfa", desc: "Dijital ve baskıya hazır çalışma sayfaları, gözlem formları.", tabColor: "#F5C518" },
    { icon: Compass, title: "Uygulama Kılavuzları", desc: "Her modül için detaylı öğretmen rehberi ve uygulama önerileri.", tabColor: "#1B3A7B" },
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
              S{"ı"}f{"ı"}r haz{"ı"}rl{"ı"}kla{" "}
              <span className="highlight">{"öğ"}retin</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              T{"ü"}m ders planlar{"ı"}, materyaller ve {"ö"}l{"ç"}me ara{"ç"}lar{"ı"} haz{"ı"}r. Sadece a{"ç"}{"ı"}n ve {"öğ"}retmeye ba{"ş"}lay{"ı"}n.
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
                  {"Öğ"}retmenler ve okul rehber dan{"ış"}manlar{"ı"} (PDR) i{"ç"}in{" "}
                  <span className="font-bold text-slate-800 underline decoration-[#F5C518] decoration-2 underline-offset-2">kullan{"ı"}ma haz{"ı"}r dijital m{"ü"}fredat</span> sunuyoruz.
                  Ders plan{"ı"} haz{"ı"}rlamaya, materyal aramaya, i{"ç"}erik {"ü"}retmeye son.
                  T{"ü"}m i{"ç"}eriklerimiz bilimsel temelli, ya{"ş"} grubuna uygun ve MEB m{"ü"}fredat{"ı"}yla uyumludur.
                </p>
                <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                  Her mod{"ü"}l{" "}
                  <span className="font-bold text-slate-800 underline decoration-[#7F63CB] decoration-2 underline-offset-2">animasyonlu video, etkile{"ş"}imli oyun, etkinlik ve {"ö"}l{"ç"}me arac{"ı"}</span>{" "}
                  i{"ç"}erir. {"Öğ"}retmen panelinizden {"öğ"}renci geli{"ş"}imini takip edebilir,
                  s{"ı"}n{"ı"}f raporlar{"ı"} olu{"ş"}turabilir ve velilerle payla{"ş"}abilirsiniz.
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
      desc: "Hikayeleştirilmiş, yaş grubuna uygun animasyonlu videolarla beceriyi tanıtın. Öğrenciler izlerken keşfeder.",
      color: "#1B3A7B",
      bg: "#EBF2FB",
      rotate: "-2deg",
    },
    {
      icon: Gamepad2,
      num: "02",
      title: "Etkileşimli Oyun",
      desc: "Karar oyunları, empati simülasyonları ve takım görevleriyle öğrenileni pekiştirin.",
      color: "#2ECC71",
      bg: "#ECFBF2",
      rotate: "1.5deg",
    },
    {
      icon: PenTool,
      num: "03",
      title: "Etkinlik & Uygulama",
      desc: "Çalışma sayfaları, grup etkinlikleri ve bireysel uygulamalarla beceriyi hayata geçirin.",
      color: "#EE7A45",
      bg: "#FEF5F0",
      rotate: "-1deg",
    },
    {
      icon: BarChart3,
      num: "04",
      title: "Değerlendirme",
      desc: "Rubrikler, gözlem formları ve dijital değerlendirme araçlarıyla ilerlemeyi ölçün.",
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
                <Layers className="w-3.5 h-3.5" /> MOD{"Ü"}LER S{"İ"}STEM
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Mod{"ü"}ler{" "}
              <span className="highlight">m{"ü"}fredat sistemi</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Her beceri mod{"ü"}l{"ü"} 4 a{"ş"}amal{"ı"} {"öğ"}renme d{"ö"}ng{"ü"}s{"ü"}yle tasarlanm{"ış"}t{"ı"}r.
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
              {["Video", "Oyun", "Etkinlik", "Değerlendirme"].map((step, i) => (
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
    { icon: TrendingUp, title: "Öğrenci Gelişimi", desc: "Her öğrencinin beceri gelişimini anlık takip edin, bireysel gelişim grafikleri oluşturun.", tabColor: "#1B3A7B" },
    { icon: Users, title: "Grup Raporları", desc: "Sınıf ve grup bazında karşılaştırmalı raporlar hazırlayın, güçlü ve gelişim alanlarını belirleyin.", tabColor: "#2ECC71" },
    { icon: BookOpen, title: "Ders Planlama", desc: "Haftalık ve aylık ders planlarınızı oluşturun, içerikleri takvime ekleyin.", tabColor: "#F5C518" },
    { icon: MessageCircle, title: "Veli İletişimi", desc: "Gelişim raporlarını velilerle paylaşın, öneriler ve geri bildirimler gönderin.", tabColor: "#7F63CB" },
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
                <Monitor className="w-3.5 h-3.5" /> {"Öğ"}RETMEN PANEL{"İ"}
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              G{"üç"}l{"ü"}{" "}
              <span className="text-gradient">{"öğ"}retmen paneli</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              {"Öğ"}renci geli{"ş"}imini takip edin, raporlar olu{"ş"}turun, ders planlar{"ı"}n{"ı"}z{"ı"} y{"ö"}netin.
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
                  {"Öğ"}retmen paneliniz, t{"ü"}m s{"ı"}n{"ı"}f{"ı"}n{"ı"}z{"ı"} tek bir ekrandan y{"ö"}netmenizi sa{"ğ"}lar.{" "}
                  <span className="font-bold text-slate-800 underline decoration-[#1B3A7B] decoration-2 underline-offset-2">Her {"öğ"}rencinin hangi beceri mod{"ü"}l{"ü"}nde oldu{"ğ"}unu, tamamlama oranlar{"ı"}n{"ı"} ve de{"ğ"}erlendirme sonu{"ç"}lar{"ı"}n{"ı"}</span>{" "}
                  anl{"ı"}k olarak g{"ö"}rebilirsiniz.
                </p>
                <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                  Haftal{"ı"}k ve ayl{"ı"}k{" "}
                  <span className="font-bold text-slate-800 underline decoration-[#F5C518] decoration-2 underline-offset-2">otomatik raporlar</span>{" "}
                  sayesinde PDR uzmanlar{"ı"} ve okul y{"ö"}neticileriyle kolayca bilgi payla{"ş"}abilir,
                  velilere d{"ü"}zenli geli{"ş"}im bildirimleri g{"ö"}nderebilirsiniz.
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
      quote: "LearnecoHub sayesinde ders hazırlığına harcadığım süre yarı yarıya azaldı. Hazır ders planları ve materyaller hayatımı kolaylaştırdı.",
      name: "Ayşe K.",
      role: "Sınıf Öğretmeni, İstanbul",
      color: "#1B3A7B",
      bg: "#EBF2FB",
      rotate: "-1.5deg",
    },
    {
      quote: "PDR çalışmalarımızda kullanıyoruz. Öğrencilerin sosyal-duygusal gelişimini ölçülebilir hale getirmemize büyük katkı sağladı.",
      name: "Mehmet Y.",
      role: "Rehber Danışman, Ankara",
      color: "#2ECC71",
      bg: "#ECFBF2",
      rotate: "2deg",
    },
    {
      quote: "Animasyonlu videolar öğrencilerin ilgisini hemen çekiyor. Değerlendirme araçları ile gelişimi somut olarak görebiliyoruz.",
      name: "Zeynep T.",
      role: "Okul Öncesi Öğretmeni, İzmir",
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
                <Star className="w-3.5 h-3.5" /> GER{"İ"} B{"İ"}LD{"İ"}R{"İ"}MLER
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              {"Öğ"}retmenlerden{" "}
              <span className="highlight">geri bildirimler</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              LearnecoHub kullanan {"öğ"}retmen ve uzmanlar{"ı"}n deneyimleri.
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
      <SubpageNavbar active={"Öğretmenler İçin"} />
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
