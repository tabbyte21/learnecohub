"use client";

import {
  Section, SubpageNavbar, SubpageHero, FinalCTA, SubpageFooter, Counter,
} from "@/components/subpage-shared";
import {
  Archive, Video, FileText, Gamepad2, BarChart3, Heart, BookOpen,
  Calendar, Users, Layers, Download, ArrowRight, Library,
  ClipboardList, PenTool, Award, TrendingUp, Star, Bookmark,
} from "lucide-react";

/* =================================================
   DATA
   ================================================= */

const resources = [
  {
    icon: Video,
    title: "Video Kütüphanesi",
    desc: "Animasyonlu eğitim videoları, canlı ders kayıtları ve uzman röportajları.",
    count: "200+",
    countLabel: "video",
    color: "#1B3A7B",
  },
  {
    icon: FileText,
    title: "Etkinlik Materyalleri",
    desc: "Baskıya hazır çalışma yaprakları, etkinlik kartları ve proje şablonları.",
    count: "500+",
    countLabel: "sayfa",
    color: "#2ECC71",
  },
  {
    icon: Gamepad2,
    title: "Oyun Arşivi",
    desc: "Sosyal beceri geliştiren dijital ve fiziksel oyunlar, rol yapma senaryoları.",
    count: "80+",
    countLabel: "oyun",
    color: "#F5C518",
  },
  {
    icon: ClipboardList,
    title: "Ölçme Araçları",
    desc: "Gelişim takip formları, değerlendirme anketleri ve gözlem çizelgeleri.",
    count: "120+",
    countLabel: "form",
    color: "#7F63CB",
  },
  {
    icon: Heart,
    title: "Aile Rehberleri",
    desc: "Evde uygulanabilir aktiviteler, iletişim rehberleri ve ebeveyn ipucları.",
    count: "50+",
    countLabel: "rehber",
    color: "#EE7A45",
  },
  {
    icon: BookOpen,
    title: "Öğretmen Kılavuzları",
    desc: "Ders planları, sınıf içi uygulama rehberleri ve müfredat destekleri.",
    count: "100+",
    countLabel: "kılavuz",
    color: "#1B3A7B",
  },
];

const pastEvents = [
  {
    title: "Empati Atölyesi",
    date: "Ocak 2025",
    desc: "Çocuklar için interaktif empati geliştirme atölyesi. 120 katılımcı ile tamamlandı.",
    color: "#1B3A7B",
    tabColor: "#1B3A7B",
  },
  {
    title: "Aile İletişim Semineri",
    date: "Şubat 2025",
    desc: "Aile içi sağlıklı iletişim teknikleri üzerine uzman seminer dizisi.",
    color: "#2ECC71",
    tabColor: "#2ECC71",
  },
  {
    title: "Sosyal Beceri Kampı",
    date: "Mart 2025",
    desc: "Bir haftalık yoğun sosyal beceri geliştirme programı ve etkinlikleri.",
    color: "#F5C518",
    tabColor: "#F5C518",
  },
  {
    title: "Duygu Yönetimi Workshop",
    date: "Nisan 2025",
    desc: "Öfke, kaygı ve stres yönetimi stratejileri üzerine uygulamalı çalıştay.",
    color: "#7F63CB",
    tabColor: "#7F63CB",
  },
  {
    title: "Liderlik Programı",
    date: "Mayıs 2025",
    desc: "Genç liderler yetiştirme programı. Takım çalışması ve sorumluluk eğitimi.",
    color: "#EE7A45",
    tabColor: "#EE7A45",
  },
  {
    title: "Yaz Okulu",
    date: "Haziran 2025",
    desc: "6 haftalık yaz okulu programı. Eğlenceli aktiviteler ve sosyal beceri atölyeleri.",
    color: "#1B3A7B",
    tabColor: "#1B3A7B",
  },
];

const publications = [
  {
    title: "Sosyal-Duygusal Gelişim Rehberi",
    desc: "Çocuklarda sosyal-duygusal becerilerin gelişimi, yaş dönemlerine göre beklentiler ve destekleme yöntemleri.",
    type: "Rehber",
    typeBg: "#EBF2FB",
    typeColor: "#1B3A7B",
    accent: "#1B3A7B",
  },
  {
    title: "Aile Eğitim El Kitabı",
    desc: "Ebeveynler için hazırlanmış kapsamlı el kitabı. Ev ortamında uygulanabilir teknikler.",
    type: "PDF",
    typeBg: "#ECFBF2",
    typeColor: "#2ECC71",
    accent: "#2ECC71",
  },
  {
    title: "Öğretmen Uygulama Kılavuzu",
    desc: "Sınıf ortamında sosyal-duygusal öğrenme uygulamaları için adım adım kılavuz.",
    type: "Kılavuz",
    typeBg: "#F0EDF9",
    typeColor: "#7F63CB",
    accent: "#7F63CB",
  },
  {
    title: "Yıllık Etki Raporu",
    desc: "LearnecoHub’un yıllık faaliyetleri, ulaşılan öğrenci sayısı ve etki değerlendirmesi.",
    type: "Rapor",
    typeBg: "#FFFBEB",
    typeColor: "#D4A007",
    accent: "#F5C518",
  },
];

const archiveStats = [
  { value: 1000, suffix: "+", label: "İçerik", icon: Layers, bg: "#EBF2FB", color: "#1B3A7B", rotate: "-2deg" },
  { value: 50, suffix: "+", label: "Etkinlik", icon: Calendar, bg: "#ECFBF2", color: "#2ECC71", rotate: "1.5deg" },
  { value: 30, suffix: "+", label: "Yayın", icon: BookOpen, bg: "#FFFBEB", color: "#D4A007", rotate: "-1deg" },
  { value: 10000, suffix: "+", label: "Kullanıcı", icon: Users, bg: "#F0EDF9", color: "#7F63CB", rotate: "2.5deg" },
];

/* =================================================
   SHELF DIVIDER COMPONENT
   ================================================= */
function ShelfDivider() {
  return (
    <div className="my-6 mx-auto max-w-5xl">
      <div
        className="h-3 rounded-sm shadow-md"
        style={{
          background: "linear-gradient(180deg, #d4c4a8 0%, #c9b896 40%, #bead84 100%)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
      />
      <div
        className="h-[3px] mx-1"
        style={{
          background: "linear-gradient(180deg, #b09e78 0%, #c4b38a 100%)",
        }}
      />
    </div>
  );
}

/* =================================================
   SECTION 1 — RESOURCE LIBRARY (BOOKSHELF)
   ================================================= */
function ResourceLibrary() {
  const firstRow = resources.slice(0, 3);
  const secondRow = resources.slice(3, 6);

  return (
    <Section>
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.03]" />
        <div className="absolute top-0 right-[10%] w-72 h-72 bg-[#EBF2FB] rounded-full blur-[100px] opacity-40" />
        <div className="absolute bottom-0 left-[5%] w-64 h-64 bg-[#F0EDF9] rounded-full blur-[90px] opacity-30" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14 anim">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold uppercase tracking-wide bg-[#EBF2FB] text-[#1B3A7B] mb-4">
              <Library className="w-3.5 h-3.5" /> Kaynak Kütüphanesi
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
              Zengin İçerik <span className="text-[#1B3A7B]">Arşivimiz</span>
            </h2>
            <p className="text-slate-500 text-[0.92rem] leading-relaxed max-w-lg mx-auto">
              Yıllar içinde oluşturduğumuz kapsamlı eğitim kaynaklarına göz atın.
            </p>
          </div>

          {/* Shelf label */}
          <div className="flex items-center gap-3 mb-4 anim">
            <Bookmark className="w-4 h-4 text-[#b09e78]" />
            <span className="text-[0.75rem] font-bold text-[#b09e78] uppercase tracking-widest">Raf 1</span>
            <div className="flex-1 h-px bg-[#d4c4a8]/40" />
          </div>

          {/* Row 1 */}
          <div className="grid md:grid-cols-3 gap-5 mb-1">
            {firstRow.map((r, i) => (
              <div
                key={i}
                className={`anim d${i + 1} group bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex overflow-hidden`}
              >
                {/* Book spine */}
                <div
                  className="w-[6px] flex-shrink-0 rounded-l-xl transition-all duration-300 group-hover:w-[10px]"
                  style={{ background: `linear-gradient(180deg, ${r.color}, ${r.color}dd)` }}
                />
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${r.color}12` }}
                    >
                      <r.icon className="w-5 h-5" style={{ color: r.color }} />
                    </div>
                    <span
                      className="text-[0.68rem] font-extrabold px-2.5 py-1 rounded-full"
                      style={{ background: `${r.color}15`, color: r.color }}
                    >
                      {r.count} {r.countLabel}
                    </span>
                  </div>
                  <h3 className="font-display text-[0.95rem] font-bold text-slate-800 mb-1.5">{r.title}</h3>
                  <p className="text-[0.78rem] text-slate-500 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <ShelfDivider />

          {/* Shelf label 2 */}
          <div className="flex items-center gap-3 mb-4 anim">
            <Bookmark className="w-4 h-4 text-[#b09e78]" />
            <span className="text-[0.75rem] font-bold text-[#b09e78] uppercase tracking-widest">Raf 2</span>
            <div className="flex-1 h-px bg-[#d4c4a8]/40" />
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-3 gap-5">
            {secondRow.map((r, i) => (
              <div
                key={i}
                className={`anim d${i + 1} group bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex overflow-hidden`}
              >
                {/* Book spine */}
                <div
                  className="w-[6px] flex-shrink-0 rounded-l-xl transition-all duration-300 group-hover:w-[10px]"
                  style={{ background: `linear-gradient(180deg, ${r.color}, ${r.color}dd)` }}
                />
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${r.color}12` }}
                    >
                      <r.icon className="w-5 h-5" style={{ color: r.color }} />
                    </div>
                    <span
                      className="text-[0.68rem] font-extrabold px-2.5 py-1 rounded-full"
                      style={{ background: `${r.color}15`, color: r.color }}
                    >
                      {r.count} {r.countLabel}
                    </span>
                  </div>
                  <h3 className="font-display text-[0.95rem] font-bold text-slate-800 mb-1.5">{r.title}</h3>
                  <p className="text-[0.78rem] text-slate-500 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom shelf */}
          <div className="mt-6">
            <div
              className="h-3 rounded-sm shadow-md"
              style={{
                background: "linear-gradient(180deg, #d4c4a8 0%, #c9b896 40%, #bead84 100%)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            />
          </div>
        </div>
      </section>
    </Section>
  );
}

/* =================================================
   SECTION 2 — PAST EVENTS (FILING CABINET TABS)
   ================================================= */
function PastEvents() {
  return (
    <Section>
      <section className="py-20 bg-[#FFFBEB] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.04]" />
        <div className="absolute top-[10%] left-[5%] w-56 h-56 bg-[#F5C518]/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-[10%] right-[8%] w-48 h-48 bg-[#EE7A45]/8 rounded-full blur-[70px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14 anim">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold uppercase tracking-wide bg-[#F5C518]/20 text-[#9A7B00] mb-4">
              <Calendar className="w-3.5 h-3.5" /> Geçmiş Etkinlikler
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
              Etkinlik <span className="text-[#D4A007]">Arşivi</span>
            </h2>
            <p className="text-slate-500 text-[0.92rem] leading-relaxed max-w-lg mx-auto">
              Başarıyla tamamladığımız geçmiş etkinlik ve programlarımız.
            </p>
          </div>

          {/* Filing cabinet cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
            {pastEvents.map((ev, i) => (
              <div key={i} className={`anim d${(i % 3) + 1} group relative`}>
                {/* Folder tab sticking out */}
                <div
                  className="absolute -top-3 left-6 px-4 py-1 rounded-t-lg text-[0.68rem] font-bold text-white z-10 shadow-sm"
                  style={{ background: ev.tabColor }}
                >
                  {ev.date}
                </div>

                {/* Folder card */}
                <div
                  className="bg-[#FAFAF5] rounded-xl pt-5 pb-5 px-5 border border-[#e8e4d9] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  style={{ borderTop: `3px solid ${ev.color}` }}
                >
                  {/* Subtle folder texture */}
                  <div
                    className="absolute top-0 right-0 w-16 h-16 opacity-[0.06]"
                    style={{
                      background: `linear-gradient(135deg, ${ev.color} 50%, transparent 50%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <h3 className="font-display text-[1rem] font-bold text-slate-800 mb-2">{ev.title}</h3>
                    <p className="text-[0.78rem] text-slate-500 leading-relaxed mb-3">{ev.desc}</p>
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1 text-[0.7rem] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: `${ev.color}12`, color: ev.color }}
                      >
                        <Archive className="w-3 h-3" /> Tamamlandı
                      </span>
                    </div>
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
   SECTION 3 — PUBLICATIONS (LIBRARY CARD CATALOG)
   ================================================= */
function Publications() {
  return (
    <Section>
      <section className="py-20 bg-[#E8F4FD] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.04]" />
        <div className="absolute top-[15%] right-[10%] w-60 h-60 bg-[#1B3A7B]/5 rounded-full blur-[90px]" />
        <div className="absolute bottom-[10%] left-[5%] w-52 h-52 bg-[#7F63CB]/5 rounded-full blur-[80px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14 anim">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold uppercase tracking-wide bg-white/70 text-[#1B3A7B] mb-4">
              <FileText className="w-3.5 h-3.5" /> Yayınlarımız
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
              Yayın <span className="text-[#1B3A7B]">Kataloğu</span>
            </h2>
            <p className="text-slate-500 text-[0.92rem] leading-relaxed max-w-lg mx-auto">
              Uzman ekibimiz tarafından hazırlanan rehber, kılavuz ve raporlar.
            </p>
          </div>

          {/* Library card catalog */}
          <div className="grid sm:grid-cols-2 gap-6">
            {publications.map((pub, i) => (
              <div key={i} className={`anim d${(i % 2) + 1} group`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                  {/* Red header stripe (like a library card) */}
                  <div
                    className="h-2"
                    style={{ background: pub.accent }}
                  />

                  {/* Card content with horizontal lines */}
                  <div className="p-6 relative">
                    {/* Subtle horizontal lines like lined index card */}
                    <div className="absolute inset-x-6 top-6 bottom-6 pointer-events-none">
                      {[...Array(7)].map((_, lineIdx) => (
                        <div
                          key={lineIdx}
                          className="h-px bg-[#d4e4f4]/40"
                          style={{ marginTop: lineIdx === 0 ? 0 : "1.25rem" }}
                        />
                      ))}
                    </div>

                    {/* Content over lines */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-display text-[0.98rem] font-bold text-slate-800 leading-snug pr-4">
                          {pub.title}
                        </h3>
                        <span
                          className="flex-shrink-0 text-[0.65rem] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wide"
                          style={{ background: pub.typeBg, color: pub.typeColor }}
                        >
                          {pub.type}
                        </span>
                      </div>
                      <p className="text-[0.8rem] text-slate-500 leading-relaxed mb-4">{pub.desc}</p>
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold transition-colors cursor-pointer"
                          style={{ color: pub.accent }}
                        >
                          <Download className="w-3.5 h-3.5" /> İndir veya İncele
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>

                    {/* Left margin line (like a library card red margin) */}
                    <div
                      className="absolute top-0 bottom-0 left-[22px] w-px opacity-20"
                      style={{ background: pub.accent }}
                    />
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
   SECTION 4 — ARCHIVE STATS (CORK BOARD / STICKY NOTES)
   ================================================= */
function ArchiveStats() {
  return (
    <Section>
      <section className="py-20 bg-[#ECFBF2] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.04]" />
        <div className="absolute top-[10%] right-[15%] w-52 h-52 bg-[#2ECC71]/8 rounded-full blur-[80px]" />
        <div className="absolute bottom-[5%] left-[10%] w-48 h-48 bg-[#F5C518]/6 rounded-full blur-[70px]" />

        {/* Cork board texture background */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #8B7355 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14 anim">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold uppercase tracking-wide bg-white/70 text-[#16794A] mb-4">
              <BarChart3 className="w-3.5 h-3.5" /> Arşiv İstatistikleri
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
              Rakamlarla <span className="text-[#2ECC71]">Arşivimiz</span>
            </h2>
            <p className="text-slate-500 text-[0.92rem] leading-relaxed max-w-lg mx-auto">
              Yıllar içinde oluşturduğumuz içerik zenginliğimiz.
            </p>
          </div>

          {/* Sticky notes grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {archiveStats.map((stat, i) => (
              <div key={i} className={`anim d${i + 1}`}>
                <div
                  className="relative transition-all duration-300 hover:-translate-y-2 hover:scale-105 cursor-default"
                  style={{ transform: `rotate(${stat.rotate})` }}
                >
                  {/* Tape piece at top */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-5 rounded-sm opacity-60 z-20"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,220,0.9) 0%, rgba(245,240,200,0.7) 100%)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    }}
                  />

                  {/* Sticky note */}
                  <div
                    className="rounded-lg p-6 text-center shadow-md relative overflow-hidden"
                    style={{ background: stat.bg }}
                  >
                    {/* Folded corner */}
                    <div
                      className="absolute top-0 right-0 w-6 h-6"
                      style={{
                        background: `linear-gradient(135deg, transparent 50%, ${stat.color}15 50%)`,
                      }}
                    />

                    <stat.icon className="w-7 h-7 mx-auto mb-3" style={{ color: stat.color }} />
                    <p className="font-display text-3xl sm:text-4xl font-extrabold mb-1" style={{ color: stat.color }}>
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-[0.82rem] font-bold text-slate-600">{stat.label}</p>
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
   PAGE EXPORT
   ================================================= */
export default function ArsivPage() {
  return (
    <>
      <SubpageNavbar active="Arşiv" />

      <SubpageHero
        theme="lavender"
        tagIcon={Archive}
        tag="Arşiv"
        breadcrumb="Arşiv"
        title="Eğitim Kaynakları"
        titleHighlight="Arşivi"
        description="Geçmiş etkinliklerimiz, eğitim materyallerimiz ve yayınlarımıza tek bir noktadan ulaşın. Zengin içerik kütüphanemizi keşfedin."
      >
        {/* Stacked books visual */}
        <div className="flex-shrink-0 w-full sm:w-[280px] flex flex-col gap-1.5">
          {["Empati Eğitimi", "Sosyal Beceriler", "Duygu Yönetimi", "Liderlik", "İletişim"].map((book, i) => {
            const colors = ["#1B3A7B", "#2ECC71", "#F5C518", "#7F63CB", "#EE7A45"];
            return (
              <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2.5" style={{ borderLeft: `4px solid ${colors[i]}` }}>
                <span className="text-[0.78rem] font-bold text-white/90">{book}</span>
              </div>
            );
          })}
        </div>
      </SubpageHero>

      <ResourceLibrary />
      <PastEvents />
      <Publications />
      <ArchiveStats />
      <FinalCTA />
      <SubpageFooter />
    </>
  );
}
