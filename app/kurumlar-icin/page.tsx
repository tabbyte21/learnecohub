"use client";

import {
  Section, SubpageNavbar, SubpageHero, FinalCTA, SubpageFooter, Counter,
} from "@/components/subpage-shared";
import {
  Globe, Shield, Heart, Award, TrendingUp, Sparkles, ArrowRight,
  Star, BarChart3, Users, FileText, Target, Layers, CheckCircle2,
  Building2, Briefcase, Leaf, Play,
} from "lucide-react";

/* =================================================================
   SECTION 1 — Neden LearnecoHub?
   Bento grid / magazine layout — unique to this page
   ================================================================= */
function NedenSection() {
  return (
    <Section>
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-mint-200/15 rounded-full blur-3xl" />
        <div className="absolute top-[50%] right-[30%] w-48 h-48 bg-gold-200/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-brand-100 text-brand-700 mb-4">
                <Globe className="w-3.5 h-3.5" /> NEDEN LEARNECOHUB?
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Kurumunuz {"\u0130\u00E7"}in{" "}
              <span className="highlight">Neden LearnecoHub?</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              {"\u00C7"}al{"\u0131\u015F"}anlar{"\u0131"}n{"\u0131"}z{"\u0131"}n {"\u00E7"}ocuklar{"\u0131"}na yat{"\u0131"}r{"\u0131"}m yapmak, kurumsal de{"\u011F"}erinize yat{"\u0131"}r{"\u0131"}m yapmakt{"\u0131"}r.
            </p>
          </div>

          {/* Bento grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">

            {/* CARD 1 — Large feature card spanning 2 columns */}
            <div className="anim d1 md:col-span-2 lg:col-span-2 lg:row-span-2">
              <div
                className="relative h-full rounded-2xl overflow-hidden p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(135deg, #1B3A7B 0%, #2a52a0 100%)",
                  boxShadow: "0 8px 32px rgba(27,58,123,0.25), 0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                {/* Decorative pattern */}
                <div className="absolute inset-0 dots-pattern opacity-[0.05]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F5C518]/10 rounded-full blur-[60px]" />

                <div className="relative z-10">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm mb-6">
                    <Building2 className="w-3.5 h-3.5 text-[#F5C518]" />
                    <span className="text-[0.72rem] font-bold text-white/90 uppercase tracking-wide">De{"\u011F"}er {"\u00D6"}nerisi</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
                    {"\u00C7"}al{"\u0131\u015F"}anlar{"\u0131"}n{"\u0131"}z{"\u0131"}n ailelerine sundu{"\u011F"}unuz{" "}
                    <span className="text-[#F5C518]">e{"\u015F"}siz bir yan hak</span>
                  </h3>

                  <p className="text-white/70 text-[0.92rem] leading-[1.85] mb-6 max-w-lg">
                    LearnecoHub, kurumsal {"\u015F"}irketlerle i{"\u015F"} birli{"\u011F"}i yaparak {"\u00E7"}al{"\u0131\u015F"}an {"\u00E7"}ocuklar{"\u0131"}n{"\u0131"}n
                    sosyal-duygusal geli{"\u015F"}imini destekliyor. Bilimsel y{"\u00F6"}ntemlerle tasarlanm{"\u0131\u015F"}
                    m{"\u00FC"}fredat{"\u0131"}m{"\u0131"}z, kurumunuzun CSR hedeflerine de{"\u011F"}er katar.
                  </p>

                  {/* Mini stat pills */}
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "%92 Memnuniyet", color: "#2ECC71" },
                      { label: "1000+ Kullan\u0131c\u0131", color: "#F5C518" },
                      { label: "50+ Rapor", color: "#EE7A45" },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-sm"
                      >
                        <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                        <span className="text-[0.78rem] font-bold text-white/90">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2 — CSR */}
            <div className="anim d2">
              <div
                className="relative rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 border"
                style={{
                  background: "#ECFBF2",
                  borderColor: "#2ECC7130",
                  boxShadow: "0 4px 20px rgba(46,204,113,0.08)",
                }}
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full" style={{ background: "#2ECC7115" }} />
                </div>

                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#2ECC7118" }}>
                  <Shield className="w-6 h-6 text-[#2ECC71]" />
                </div>
                <h4 className="font-display text-lg font-extrabold text-[#2ECC71] mb-2 leading-tight">
                  Kurumsal Sosyal Sorumluluk
                </h4>
                <p className="text-[0.82rem] text-slate-500 leading-relaxed">
                  {"\u00C7"}al{"\u0131\u015F"}an {"\u00E7"}ocuklar{"\u0131"}na y{"\u00F6"}nelik sosyal-duygusal geli{"\u015F"}im programlar{"\u0131"} ile toplumsal de{"\u011F"}er {"\u00FC"}retimi.
                </p>

                {/* Mini progress bar */}
                <div className="mt-4 pt-4 border-t border-[#2ECC7120]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[0.72rem] font-bold text-slate-400">CSR Etki Oran{"\u0131"}</span>
                    <span className="text-[0.72rem] font-extrabold text-[#2ECC71]">%100</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#2ECC7115]">
                    <div className="w-full h-full rounded-full bg-[#2ECC71]" />
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3 — Çalışan Memnuniyeti */}
            <div className="anim d3">
              <div
                className="relative rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 border"
                style={{
                  background: "#FFFBEB",
                  borderColor: "#F5C51830",
                  boxShadow: "0 4px 20px rgba(245,197,24,0.08)",
                }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full" style={{ background: "#F5C51815" }} />
                </div>

                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#F5C51818" }}>
                  <Heart className="w-6 h-6 text-[#F5C518]" />
                </div>
                <h4 className="font-display text-lg font-extrabold text-[#d4a80e] mb-2 leading-tight">
                  {"\u00C7"}al{"\u0131\u015F"}an Memnuniyeti
                </h4>
                <p className="text-[0.82rem] text-slate-500 leading-relaxed">
                  Aile dostu kurum k{"\u00FC"}lt{"\u00FC"}r{"\u00FC"}n{"\u00FC"} g{"\u00FC\u00E7"}lendiren, {"\u00E7"}al{"\u0131\u015F"}an ba{"\u011F"}l{"\u0131"}l{"\u0131\u011F\u0131"}n{"\u0131"} art{"\u0131"}ran s{"\u00FC"}rd{"\u00FC"}r{"\u00FC"}lebilir programlar.
                </p>

                {/* Satisfaction meter */}
                <div className="mt-4 pt-4 border-t border-[#F5C51820]">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#d4a80e]" />
                    <span className="text-[0.72rem] font-extrabold text-[#d4a80e]">+%34 Ba{"\u011F"}l{"\u0131"}l{"\u0131"}k Art{"\u0131\u015F\u0131"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 4 — İşveren Markası (wide) */}
            <div className="anim d4 md:col-span-2 lg:col-span-1">
              <div
                className="relative rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 border"
                style={{
                  background: "#F0EDF9",
                  borderColor: "#7F63CB30",
                  boxShadow: "0 4px 20px rgba(127,99,203,0.08)",
                }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full" style={{ background: "#7F63CB15" }} />
                </div>

                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#7F63CB18" }}>
                  <Sparkles className="w-6 h-6 text-[#7F63CB]" />
                </div>
                <h4 className="font-display text-lg font-extrabold text-[#7F63CB] mb-2 leading-tight">
                  {"\u0130\u015F"}veren Markas{"\u0131"}
                </h4>
                <p className="text-[0.82rem] text-slate-500 leading-relaxed">
                  Farkl{"\u0131"}la{"\u015F"}an {"\u00E7"}al{"\u0131\u015F"}an yan haklar{"\u0131"}yla i{"\u015F"}veren markan{"\u0131"}za g{"\u00FC\u00E7"}l{"\u00FC"} katk{"\u0131"} sa{"\u011F"}lay{"\u0131"}n.
                </p>

                {/* Stars */}
                <div className="mt-4 pt-4 border-t border-[#7F63CB20] flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#7F63CB] text-[#7F63CB]" />
                  ))}
                  <span className="text-[0.72rem] font-extrabold text-[#7F63CB] ml-2">5.0</span>
                </div>
              </div>
            </div>

            {/* CARD 5 — Sürdürülebilirlik */}
            <div className="anim d5">
              <div
                className="relative rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 border"
                style={{
                  background: "#EBF2FB",
                  borderColor: "#1B3A7B30",
                  boxShadow: "0 4px 20px rgba(27,58,123,0.08)",
                }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full" style={{ background: "#1B3A7B15" }} />
                </div>

                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#1B3A7B18" }}>
                  <Leaf className="w-6 h-6 text-[#1B3A7B]" />
                </div>
                <h4 className="font-display text-lg font-extrabold text-[#1B3A7B] mb-2 leading-tight">
                  S{"\u00FC"}rd{"\u00FC"}r{"\u00FC"}lebilirlik
                </h4>
                <p className="text-[0.82rem] text-slate-500 leading-relaxed">
                  ESG ve s{"\u00FC"}rd{"\u00FC"}r{"\u00FC"}lebilirlik raporlar{"\u0131"}n{"\u0131"}za somut sosyal etki verileri ekleyin.
                </p>
              </div>
            </div>

            {/* CARD 6 — Dijital Raporlama */}
            <div className="anim d5">
              <div
                className="relative rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 border"
                style={{
                  background: "#FEF5F0",
                  borderColor: "#EE7A4530",
                  boxShadow: "0 4px 20px rgba(238,122,69,0.08)",
                }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full" style={{ background: "#EE7A4515" }} />
                </div>

                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#EE7A4518" }}>
                  <BarChart3 className="w-6 h-6 text-[#EE7A45]" />
                </div>
                <h4 className="font-display text-lg font-extrabold text-[#EE7A45] mb-2 leading-tight">
                  Dijital Raporlama
                </h4>
                <p className="text-[0.82rem] text-slate-500 leading-relaxed">
                  Kurum {"\u00F6"}zelinde detayl{"\u0131"} dijital geli{"\u015F"}im raporlar{"\u0131"} ve {"\u00F6"}l{"\u00E7\u00FC"}lebilir sonu{"\u00E7"}lar.
                </p>

                {/* Mini bar chart */}
                <div className="mt-4 pt-4 border-t border-[#EE7A4520] flex items-end gap-1.5 h-10">
                  {[40, 60, 80, 55, 90, 70, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all duration-300"
                      style={{ height: `${h}%`, background: i === 6 ? "#EE7A45" : "#EE7A4530" }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* CARD 7 — Özel Müfredat */}
            <div className="anim d6">
              <div
                className="relative rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 border"
                style={{
                  background: "#ECFBF2",
                  borderColor: "#2ECC7130",
                  boxShadow: "0 4px 20px rgba(46,204,113,0.08)",
                }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full" style={{ background: "#2ECC7115" }} />
                </div>

                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#2ECC7118" }}>
                  <Layers className="w-6 h-6 text-[#2ECC71]" />
                </div>
                <h4 className="font-display text-lg font-extrabold text-[#2ECC71] mb-2 leading-tight">
                  {"\u00D6"}zel M{"\u00FC"}fredat
                </h4>
                <p className="text-[0.82rem] text-slate-500 leading-relaxed">
                  Kurumunuzun de{"\u011F"}erlerine uyumlu, {"\u00F6"}zel olarak tasarlanm{"\u0131\u015F"} sosyal-duygusal geli{"\u015F"}im m{"\u00FC"}fredat{"\u0131"}.
                </p>

                {/* Check list */}
                <div className="mt-4 pt-4 border-t border-[#2ECC7120] space-y-1.5">
                  {["Ya\u015Fa uygun", "Bilimsel temelli", "MEB uyumlu"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2ECC71]" />
                      <span className="text-[0.72rem] font-semibold text-slate-500">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* =================================================================
   SECTION 2 — Nasıl Çalışır?
   Notebook style cards for 4 process steps
   ================================================================= */
function NasilCalisirSection() {
  const steps = [
    { icon: Target, tabColor: "#F5C518", step: "01", title: "İhtiyaç Analizi", text: "Kurumunuzun önceliklerini, çalışan profilini ve hedeflerinizi birlikte belirliyoruz; size özel bir yol haritası çiziyoruz." },
    { icon: Layers, tabColor: "#7F63CB", step: "02", title: "Özel Müfredat", text: "Kurumunuzun değerlerine ve hedeflerine uygun, yaşa göre yapılandırılmış sosyal-duygusal gelişim müfredatı tasarlıyoruz." },
    { icon: Users, tabColor: "#2ECC71", step: "03", title: "Uygulama", text: "Çalışan çocukları programlara dahil ediliyor. Uzman tutorlar eşliğinde bireysel ve grup uygulamaları başlıyor." },
    { icon: BarChart3, tabColor: "#EE7A45", step: "04", title: "Raporlama", text: "Dönemsel gelişim raporları, dijital portfolyolar ve etki analizleriyle süreci ölçülebilir kılıyoruz." },
  ];

  return (
    <Section>
      <section className="py-24 bg-[#FFFBEB] relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-16 left-[10%] w-56 h-56 bg-gold-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-[5%] w-64 h-64 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-gold-100 text-gold-700 mb-4">
                <Target className="w-3.5 h-3.5" /> NASIL ÇALIŞIR?
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Dört Adımda{" "}
              <span className="highlight">Kurumsal Dönüşüm</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Kurumunuza özel tasarlanan süreç, ihtiyaç analizinden raporlamaya kadar uçtan uca yönetilir.
            </p>
          </div>

          {/* Arrow connectors for desktop */}
          <div className="hidden lg:flex items-center justify-center mb-8 gap-2">
            {["Analiz", "Müfredat", "Uygulama", "Raporlama"].map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="text-[0.78rem] font-bold px-3 py-1 rounded-full"
                  style={{
                    color: steps[i].tabColor,
                    background: steps[i].tabColor + "18",
                  }}
                >
                  {step}
                </span>
                {i < 3 && <ArrowRight className="w-4 h-4 text-slate-300" />}
              </div>
            ))}
          </div>

          {/* Notebook style cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`anim d${Math.min(i + 1, 4)} group`}
              >
                <div
                  className="relative bg-white rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                  style={{
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Colored tab strip at top */}
                  <div
                    className="relative h-9 flex items-center px-4"
                    style={{ background: s.tabColor }}
                  >
                    {/* Spiral ring hole */}
                    <div className="w-4 h-4 rounded-full border-[2px] border-white/60 bg-transparent" />
                    {/* Step number badge */}
                    <div className="ml-auto px-2 py-0.5 rounded-md bg-white/20">
                      <span className="text-[0.6rem] font-bold text-white/90 uppercase tracking-wide">
                        Adım {s.step}
                      </span>
                    </div>
                  </div>

                  {/* Lined paper body */}
                  <div
                    className="relative p-5 pl-12 min-h-[200px]"
                    style={{
                      backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #e8e8e8 27px, #e8e8e8 28px)",
                      backgroundPosition: "0 12px",
                    }}
                  >
                    {/* Red margin line */}
                    <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-red-300/40 pointer-events-none" />

                    {/* Icon */}
                    <s.icon className="w-6 h-6 mb-3 opacity-50" style={{ color: s.tabColor }} />

                    {/* Step number watermark */}
                    <div
                      className="absolute top-12 right-4 font-display text-6xl font-black select-none pointer-events-none"
                      style={{ color: s.tabColor, opacity: 0.06 }}
                    >
                      {s.step}
                    </div>

                    {/* Title */}
                    <h4 className="font-display text-[0.95rem] font-extrabold text-slate-800 mb-2 leading-tight">
                      {s.title}
                    </h4>

                    {/* Text */}
                    <p className="text-[0.82rem] text-slate-500 leading-relaxed">
                      {s.text}
                    </p>
                  </div>

                  {/* Bottom torn edge */}
                  <div
                    className="h-2 w-full"
                    style={{
                      background: `linear-gradient(135deg, white 33.33%, transparent 33.33%) -6px 0, linear-gradient(225deg, white 33.33%, transparent 33.33%) -6px 0`,
                      backgroundSize: "12px 12px",
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

/* =================================================================
   SECTION 3 — Kurumsal Etki
   Sticky notes for impact stats
   ================================================================= */
function KurumsalEtkiSection() {
  const stats = [
    { icon: Users, color: "#1B3A7B", bg: "#EBF2FB", value: 1000, suffix: "+", label: "Kullanıcı", text: "Kurumsal programlarımızdan faydalanan çocuk ve genç sayısı.", rotate: "-1.5deg" },
    { icon: FileText, color: "#7F63CB", bg: "#F0EDF9", value: 50, suffix: "+", label: "Markalı Rapor", text: "Kuruma özel hazırlanan detaylı gelişim ve etki raporları.", rotate: "2deg" },
    { icon: Leaf, color: "#F5C518", bg: "#FFFBEB", value: 100, suffix: "%", label: "ESG Uyumu", text: "Sürdürülebilirlik ve sosyal sorumluluk hedeflerinize tam uyum.", rotate: "-1deg" },
    { icon: TrendingUp, color: "#EE7A45", bg: "#FEF5F0", value: 92, suffix: "%", label: "Memnuniyet", text: "Çalışan memnuniyetinde ölçülen artış oranı.", rotate: "1.5deg" },
  ];

  return (
    <Section>
      <section className="py-24 bg-[#E8F4FD] relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-16 right-[10%] w-60 h-60 bg-brand-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-[8%] w-56 h-56 bg-gold-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-lavender-100 text-lavender-700 mb-4">
                <BarChart3 className="w-3.5 h-3.5" /> KURUMSAL ETKİ
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Ölçülebilir{" "}
              <span className="text-gradient">Kurumsal Etki</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Programlarımızın kurumunuza ve topluma olan katkısını somut verilerle takip edin.
            </p>
          </div>

          {/* Sticky notes board for stats */}
          <div
            className="relative rounded-3xl p-8 sm:p-10 lg:p-12"
            style={{
              background: "linear-gradient(145deg, #e4eef8 0%, #d4e4f2 100%)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05), 0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            {/* Cork texture dots */}
            <div
              className="absolute inset-0 rounded-3xl opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)",
                backgroundSize: "12px 12px",
              }}
            />

            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`anim d${Math.min(i + 1, 4)} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                  style={{ transform: `rotate(${s.rotate})` }}
                >
                  <div
                    className="relative rounded-sm p-5 min-h-[200px] text-center"
                    style={{
                      background: s.bg,
                      boxShadow: "3px 4px 12px rgba(0,0,0,0.1), 1px 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Tape */}
                    <div
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-5 rounded-sm opacity-60"
                      style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(240,235,220,0.5) 100%)",
                        border: "1px solid rgba(0,0,0,0.06)",
                      }}
                    />
                    {/* Folded corner */}
                    <div
                      className="absolute bottom-0 right-0 w-5 h-5"
                      style={{
                        background: `linear-gradient(135deg, ${s.bg} 50%, transparent 50%)`,
                        filter: "brightness(0.92)",
                      }}
                    />

                    {/* Icon */}
                    <s.icon className="w-6 h-6 mx-auto mb-3" style={{ color: s.color }} />

                    {/* Counter */}
                    <p
                      className="font-display text-3xl sm:text-4xl font-extrabold leading-none mb-1"
                      style={{ color: s.color }}
                    >
                      <Counter target={s.value} suffix={s.suffix} />
                    </p>

                    {/* Label */}
                    <h4
                      className="font-display text-[0.9rem] font-extrabold mb-2"
                      style={{ color: s.color }}
                    >
                      {s.label}
                    </h4>

                    {/* Text */}
                    <p className="text-[0.78rem] text-slate-500 leading-relaxed">
                      {s.text}
                    </p>
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
   SECTION 4 — Referanslarımız
   Reference logos marquee
   ================================================================= */
function ReferanslarSection() {
  const logos = [
    "Koç Holding", "Penta Teknoloji", "Başakşehir Living Lab", "Aygaz",
    "Limer", "Lüleburgaz Belediyesi", "Kocaeli Belediyesi", "YEKUV",
  ];

  return (
    <Section>
      <section className="py-20 bg-[#ECFBF2] relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-10 right-[15%] w-48 h-48 bg-mint-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[10%] w-40 h-40 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="anim">
              <span className="tag bg-mint-100 text-mint-700 mb-4">
                <Star className="w-3.5 h-3.5" /> REFERANSLARIMIZ
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Güvendikleri İçin{" "}
              <span className="highlight">Tercih Edenler</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              LearnecoHub ile çalışan lider kurumlar.
            </p>
          </div>

          {/* Marquee */}
          <div className="relative anim d3">
            <div
              className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #ECFBF2, transparent)" }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, #ECFBF2, transparent)" }}
            />
            <div className="overflow-hidden">
              <div className="ref-marquee-inner flex gap-10 w-max items-center py-4">
                {[...logos, ...logos].map((name, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 flex-shrink-0"
                  >
                    <div
                      className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center"
                    >
                      <Building2 className="w-5 h-5 text-slate-400" />
                    </div>
                    <span className="text-[0.88rem] font-bold text-slate-600 tracking-tight whitespace-nowrap">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a href="/contact" className="anim d4 btn-3d btn-3d-mint inline-flex">
              Referanslarımız Hakkında Bilgi Alın <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* =================================================================
   PAGE
   ================================================================= */
export default function KurumlarIcinPage() {
  return (
    <main>
      {/* --- Navbar --- */}
      <SubpageNavbar active={"Kurumlar İçin"} />

      {/* --- Hero --- */}
      <SubpageHero
        breadcrumb={"Kurumlar \u0130\u00E7in"}
        tag={"KURUMLAR \u0130\u00C7\u0130N"}
        tagIcon={Building2}
        title={"\u00C7al\u0131\u015Fanlar\u0131n\u0131z\u0131n \u00E7ocuklar\u0131na"}
        titleHighlight={"yat\u0131r\u0131m yap\u0131n."}
        description={"Kurumsal sosyal sorumluluk projelerinize de\u011Fer katan, \u00E7al\u0131\u015Fan memnuniyetini art\u0131ran bilimsel sosyal-duygusal geli\u015Fim programlar\u0131."}
        theme="brand"
      >
        {/* Hero video */}
        <div className="relative flex-shrink-0 w-full sm:w-[320px] lg:w-[360px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
          <video
            className="w-full h-auto"
            poster=""
            muted
            playsInline
            loop
            autoPlay
          >
            <source src="https://learnecohub.com/wp-content/uploads/2025/07/Tanitim-Videosu-Guncel.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
        </div>
      </SubpageHero>

      {/* --- Neden LearnecoHub? --- */}
      <NedenSection />

      {/* --- Nasıl Çalışır? --- */}
      <NasilCalisirSection />

      {/* --- Kurumsal Etki --- */}
      <KurumsalEtkiSection />

      {/* --- Referanslarımız --- */}
      <ReferanslarSection />

      {/* --- Final CTA --- */}
      <FinalCTA />

      {/* --- Footer --- */}
      <SubpageFooter />
    </main>
  );
}
