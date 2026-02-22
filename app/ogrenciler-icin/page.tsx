"use client";

import {
  Section, SubpageNavbar, SubpageHero, FinalCTA, SubpageFooter, Counter,
} from "@/components/subpage-shared";

import {
  Sparkles, Video, Gamepad2, Award, Users, Flame, Briefcase,
  Heart, MessageCircle, Shield, Crown, Smile, Handshake,
  Trophy, Target, Zap, Star, BookOpen, ArrowRight,
} from "lucide-react";

/* =================================================
   STUDENT FEATURES DATA
   ================================================= */
const studentFeatures: {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
  bg: string;
  rotate: string;
  hasImage: boolean;
}[] = [
  {
    icon: Video,
    title: "Animasyonlu Hikaye Videoları",
    desc: "Eğlenceli karakterlerle dolu, hikayeleştirilmiş animasyon videolarla sosyal becerileri keşfet.",
    color: "#1B3A7B",
    bg: "#EBF2FB",
    rotate: "-1.5deg",
    hasImage: false,
  },
  {
    icon: Gamepad2,
    title: "Etkileşimli Oyunlar",
    desc: "Öğrendiklerini eğlenceli oyunlarla pekiştir, puanlar topla ve sıralamada yüksel.",
    color: "#2ECC71",
    bg: "#ECFBF2",
    rotate: "2deg",
    hasImage: false,
  },
  {
    icon: Award,
    title: "Dijital Rozetler",
    desc: "Her tamamladığın görev için özel rozetler kazan ve koleksiyonunu büyüt!",
    color: "#F5C518",
    bg: "#FFFBEB",
    rotate: "-1deg",
    hasImage: true,
  },
  {
    icon: Users,
    title: "Canlı Grup Seansları",
    desc: "10-12 kişilik küçük gruplarda psikolog eşliğinde canlı derslerle pratik yap.",
    color: "#7F63CB",
    bg: "#F0EDF9",
    rotate: "1.5deg",
    hasImage: false,
  },
  {
    icon: Flame,
    title: "Günlük Görevler",
    desc: "Her gün yeni bir macera! Günlük görevlerle becerilerini günlük hayata taşı.",
    color: "#EE7A45",
    bg: "#FEF5F0",
    rotate: "-2deg",
    hasImage: false,
  },
  {
    icon: Briefcase,
    title: "Kişisel Gelişim Portfolyösü",
    desc: "Tüm başarıların ve rozetlerin dijital portfolyönde birikiyor. Ailene göster!",
    color: "#1B3A7B",
    bg: "#EBF2FB",
    rotate: "1deg",
    hasImage: false,
  },
];

/* =================================================
   SKILL AREAS DATA
   ================================================= */
const skillAreas: {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
  bg: string;
  tabColor: string;
}[] = [
  {
    icon: Heart,
    title: "Empati",
    desc: "Başkalarının duygularını anlamayı, onların yerine kendini koymayı öğren.",
    color: "#1B3A7B",
    bg: "#EBF2FB",
    tabColor: "#1B3A7B",
  },
  {
    icon: MessageCircle,
    title: "İletişim",
    desc: "Duygularını doğru ifade etmeyi, etkili dinlemeyi ve konuşmayı keşfet.",
    color: "#2ECC71",
    bg: "#ECFBF2",
    tabColor: "#2ECC71",
  },
  {
    icon: Shield,
    title: "Stres Yönetimi",
    desc: "Zor anlarla başa çıkma, sakin kalma ve nefes egzersizlerini öğren.",
    color: "#EE7A45",
    bg: "#FEF5F0",
    tabColor: "#EE7A45",
  },
  {
    icon: Crown,
    title: "Liderlik",
    desc: "Takımına öncülük etmeyi, sorumluluk almayı ve kararlar vermeyi keşfet.",
    color: "#F5C518",
    bg: "#FFFBEB",
    tabColor: "#F5C518",
  },
  {
    icon: Smile,
    title: "Özgüven",
    desc: "Kendine güvenmeyi, güçlü yönlerini keşfetmeyi ve cesur olmayı öğren.",
    color: "#7F63CB",
    bg: "#F0EDF9",
    tabColor: "#7F63CB",
  },
  {
    icon: Handshake,
    title: "Takım Çalışması",
    desc: "Birlikte çalışmayı, paylaşmayı ve ortak hedefler için iş birliği yapmayı öğren.",
    color: "#1B3A7B",
    bg: "#EBF2FB",
    tabColor: "#1B3A7B",
  },
];

/* =================================================
   BADGE COLLECTION DATA
   ================================================= */
const badgeExamples: {
  name: string;
  desc: string;
  color: string;
  bg: string;
  rotate: string;
}[] = [
  {
    name: "Keşif Yolcusu",
    desc: "Platforma ilk adımını attın ve öğrenme macerana başladın!",
    color: "#1B3A7B",
    bg: "#EBF2FB",
    rotate: "-1.5deg",
  },
  {
    name: "Empati Yıldızı",
    desc: "Empati becerilerini geliştirdin ve başkalarının duygularını anladın.",
    color: "#2ECC71",
    bg: "#ECFBF2",
    rotate: "2deg",
  },
  {
    name: "İletişim Ustası",
    desc: "Etkili iletişim becerilerini kazandın ve kendini ifade etmeyi öğrendin.",
    color: "#7F63CB",
    bg: "#F0EDF9",
    rotate: "-1deg",
  },
  {
    name: "Liderlik Rozeti",
    desc: "Takımına liderlik yaptın, sorumluluk aldın ve öncü oldun.",
    color: "#F5C518",
    bg: "#FFFBEB",
    rotate: "1.5deg",
  },
];

/* =================================================
   STATS DATA
   ================================================= */
const statsData = [
  { icon: BookOpen, value: 100, suffix: "+", label: "Beceri" },
  { icon: Award, value: 50, suffix: "+", label: "Rozet" },
  { icon: Zap, value: 500, suffix: "+", label: "Aktivite" },
  { icon: Star, value: 0, suffix: "", label: "Eğlenceli Öğrenme", displayText: "∞" },
];

/* =================================================
   SECTION 1 -- Ogrenme Macerasi
   Clipboard intro + Sticky notes board for features
   ================================================= */
function LearningAdventure() {
  return (
    <Section>
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-[#7F63CB]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-[#2ECC71]/10 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="anim">
              <span className="tag bg-mint-100 text-mint-700 mb-4">
                <Sparkles className="w-3.5 h-3.5" /> MACERAYA BA{"Ş"}LA
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              {"Öğ"}renme <span className="highlight">Maceras{"ı"}</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Hikayeler, oyunlar ve rozetlerle dolu bir d{"ü"}nyada sosyal-duygusal becerilerini geli{"ş"}tir!
            </p>
          </div>

          {/* Clipboard -- intro text */}
          <div className="anim d2 max-w-3xl mx-auto mb-16">
            <div className="relative bg-[#FAFAF8] rounded-2xl border border-slate-200 shadow-md overflow-visible">
              {/* Metal clip */}
              <div className="flex justify-center -mt-4 relative z-20">
                <div className="w-20 h-8 rounded-b-xl bg-slate-400 border-2 border-slate-500 shadow-sm flex items-end justify-center pb-1">
                  <div className="w-10 h-1.5 rounded-full bg-slate-300" />
                </div>
              </div>
              <div className="px-8 py-6 space-y-4">
                <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                  LearnecoHub&apos;da seni e{"ğ"}lenceli bir {"öğ"}renme maceras{"ı"} bekliyor! Animasyonlu hikaye videolar{"ı"} izleyecek,
                  e{"ğ"}lenceli oyunlar oynayacak, rozetler kazanacak ve arkada{"ş"}lar{"ı"}nla birlikte canl{"ı"} derslere kat{"ı"}lacaks{"ı"}n.
                </p>
                <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                  Her g{"ü"}n yeni bir g{"ö"}rev, her hafta yeni bir beceri!{" "}
                  <span className="font-bold text-slate-800">Empati, ileti{"ş"}im, {"ö"}zg{"ü"}ven ve liderlik</span> gibi
                  s{"ü"}per g{"üç"}leri ke{"ş"}fetmeye haz{"ı"}r m{"ı"}s{"ı"}n?
                </p>
              </div>
            </div>
          </div>

          {/* Sticky notes board -- 6 student features */}
          <div
            className="relative rounded-3xl p-8 sm:p-10 lg:p-12"
            style={{
              background: "linear-gradient(145deg, #f5f0e8 0%, #ebe4d8 100%)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.05)",
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

            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {studentFeatures.map((f, i) => (
                <div
                  key={i}
                  className={`anim d${Math.min(i + 1, 6)} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                  style={{ transform: `rotate(${f.rotate})` }}
                >
                  <div
                    className="relative rounded-sm p-6 min-h-[180px]"
                    style={{
                      background: f.bg,
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
                        background: `linear-gradient(135deg, ${f.bg} 50%, transparent 50%)`,
                        filter: "brightness(0.92)",
                      }}
                    />

                    {/* Icon + optional badge image */}
                    {f.hasImage ? (
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: f.color + "18" }}
                        >
                          <f.icon className="w-5 h-5" style={{ color: f.color }} />
                        </div>
                        <img src="/rozet1.png" alt="Rozet" className="w-12 h-12 object-contain drop-shadow-md" />
                      </div>
                    ) : (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: f.color + "18" }}
                      >
                        <f.icon className="w-5 h-5" style={{ color: f.color }} />
                      </div>
                    )}

                    <h4
                      className="font-display text-[0.95rem] font-extrabold mb-2 leading-tight"
                      style={{ color: f.color }}
                    >
                      {f.title}
                    </h4>
                    <p className="text-[0.82rem] text-slate-500 leading-relaxed">{f.desc}</p>
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
   SECTION 2 -- Beceri Dunyasi (Notebook style cards)
   ================================================= */
function SkillWorld() {
  return (
    <Section>
      <section className="py-24 bg-[#FFFBEB] relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-16 left-[10%] w-56 h-56 bg-[#F5C518]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-[5%] w-64 h-64 bg-[#7F63CB]/10 rounded-full blur-3xl" />
        {/* Dots pattern */}
        <div className="absolute inset-0 dots-pattern opacity-[0.06]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-gold-100 text-gold-700 mb-4">
                <Target className="w-3.5 h-3.5" /> BECER{"İ"} D{"Ü"}NYASI
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              S{"ü"}per <span className="text-gradient">G{"üç"}lerini</span> Ke{"ş"}fet
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              6 farkl{"ı"} beceri alan{"ı"}nda kendini geli{"ş"}tir, her birinde birer s{"ü"}per kahraman ol!
            </p>
          </div>

          {/* Notebook-style skill cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillAreas.map((s, i) => (
              <div key={i} className={`anim d${Math.min(i + 1, 6)} group`}>
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
                    <div className="ml-auto px-2 py-0.5 rounded-md bg-white/20">
                      <span className="text-[0.6rem] font-bold text-white/90 uppercase tracking-wide">
                        Beceri
                      </span>
                    </div>
                  </div>

                  {/* Lined paper body */}
                  <div
                    className="relative p-5 pl-12"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(transparent, transparent 27px, #e8e8e8 27px, #e8e8e8 28px)",
                      backgroundPosition: "0 12px",
                    }}
                  >
                    {/* Red margin line */}
                    <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-red-300/40 pointer-events-none" />

                    {/* Skill icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: s.bg }}
                    >
                      <s.icon className="w-6 h-6" style={{ color: s.color }} />
                    </div>

                    {/* Skill name */}
                    <h4
                      className="font-display text-lg font-extrabold mb-2 leading-tight"
                      style={{ color: s.color }}
                    >
                      {s.title}
                    </h4>

                    {/* Skill description */}
                    <p className="text-[0.82rem] text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>

                  {/* Torn edge bottom */}
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

/* =================================================
   SECTION 3 -- Rozet Koleksiyonu (Sticky notes board)
   ================================================= */
function BadgeCollection() {
  return (
    <Section>
      <section className="py-24 bg-[#E8F4FD] relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-20 right-[8%] w-60 h-60 bg-[#1B3A7B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[5%] w-52 h-52 bg-[#F5C518]/15 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-brand-100 text-brand-700 mb-4">
                <Award className="w-3.5 h-3.5" /> ROZET KOLEKS{"İ"}YONU
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Rozetlerini <span className="highlight">topla</span>, ba{"ş"}ar{"ı"}lar{"ı"}n{"ı"} kutla!
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Her tamamlad{"ığı"}n g{"ö"}rev sana yeni bir rozet kazand{"ı"}r{"ı"}r. {"İş"}te baz{"ı"} rozetler!
            </p>
          </div>

          {/* Sticky notes board -- 4 badges */}
          <div
            className="relative rounded-3xl p-8 sm:p-10 lg:p-12"
            style={{
              background: "linear-gradient(145deg, #e8f0f8 0%, #d5e3ef 100%)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05), 0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            {/* Cork texture */}
            <div
              className="absolute inset-0 rounded-3xl opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)",
                backgroundSize: "12px 12px",
              }}
            />

            {/* Album header */}
            <div className="text-center mb-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm border border-slate-200">
                <Trophy className="w-4 h-4 text-[#F5C518]" />
                <span className="text-[0.78rem] font-bold text-slate-600 uppercase tracking-wider">
                  Koleksiyon Alb{"ü"}m{"ü"}
                </span>
                <Trophy className="w-4 h-4 text-[#F5C518]" />
              </div>
            </div>

            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {badgeExamples.map((b, i) => (
                <div
                  key={i}
                  className={`anim d${Math.min(i + 1, 4)} transition-all duration-300 hover:scale-[1.03] hover:rotate-0`}
                  style={{ transform: `rotate(${b.rotate})` }}
                >
                  <div
                    className="relative rounded-sm p-5 min-h-[220px] flex flex-col items-center text-center"
                    style={{
                      background: b.bg,
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
                        background: `linear-gradient(135deg, ${b.bg} 50%, transparent 50%)`,
                        filter: "brightness(0.92)",
                      }}
                    />

                    {/* Badge image */}
                    <div
                      className="w-16 h-16 mb-3 rounded-full flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle, ${b.color}15 0%, transparent 70%)`,
                      }}
                    >
                      <img
                        src="/rozet1.png"
                        alt={b.name}
                        className="w-14 h-14 object-contain drop-shadow-lg"
                      />
                    </div>

                    {/* Badge name */}
                    <h4
                      className="font-display text-[0.95rem] font-extrabold mb-2 leading-tight"
                      style={{ color: b.color }}
                    >
                      {b.name}
                    </h4>

                    {/* Badge description */}
                    <p className="text-[0.8rem] text-slate-500 leading-relaxed flex-1">
                      {b.desc}
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

/* =================================================
   SECTION 4 -- Gold Stats Banner
   ================================================= */
function StatsBanner() {
  return (
    <Section>
      <section className="py-16 bg-[#F5C518] relative overflow-hidden">
        {/* Dots pattern */}
        <div className="absolute inset-0 dots-pattern opacity-[0.08]" />
        {/* Blur blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#1B3A7B]/8 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="anim font-display text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] mb-3 tracking-tight">
              Seni neler bekliyor?
            </h3>
            <p className="anim d1 text-[#1A1A2E]/60 text-[0.88rem] leading-relaxed max-w-lg mx-auto">
              E{"ğ"}lenerek {"öğ"}ren, oynayarak geli{"ş"}, rozetlerini toplayarak ba{"ş"}ar{"ı"}lar{"ı"}n{"ı"} kutla!
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {statsData.map((s, i) => (
              <div key={i} className={`anim d${i + 1}`}>
                <div
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 text-center shadow-md hover:-translate-y-1 transition-transform duration-300"
                  style={{
                    border: "2px solid rgba(27,58,123,0.1)",
                  }}
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center bg-[#1B3A7B]/8">
                    <s.icon className="w-5 h-5 text-[#1B3A7B]" />
                  </div>
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800 leading-none">
                    {s.displayText ? s.displayText : <Counter target={s.value} suffix={s.suffix} />}
                  </p>
                  <p className="text-[0.78rem] text-slate-500 font-bold mt-1">{s.label}</p>
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
   PAGE
   ================================================= */
export default function OgrencilerIcinPage() {
  return (
    <main>
      <SubpageNavbar active={"Öğrenciler İçin"} />

      <SubpageHero
        breadcrumb={"Öğrenciler İçin"}
        tag={"ÖĞRENCİLER İÇİN"}
        tagIcon={Sparkles}
        title={"Eğlenerek öğren,"}
        titleHighlight={"oynayarak geliş!"}
        description={"Hikayeler, oyunlar, rozetler ve canlı derslerle sosyal-duygusal becerilerini geliştir. Her gün yeni bir macera seni bekliyor!"}
        theme="mint"
      >
        {/* Right side - video + badge */}
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
          {/* Badge image below video */}
          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl py-2.5 px-4">
            <img src="/rozet1.png" alt="Rozet" className="w-10 h-10 object-contain drop-shadow-md" />
            <div>
              <p className="text-[0.78rem] font-extrabold text-white leading-tight">Rozetlerini topla!</p>
              <p className="text-[0.65rem] text-white/50 font-semibold">50+ rozet seni bekliyor</p>
            </div>
          </div>
        </div>
      </SubpageHero>

      <LearningAdventure />
      <SkillWorld />
      <BadgeCollection />
      <StatsBanner />
      <FinalCTA />
      <SubpageFooter />
    </main>
  );
}
