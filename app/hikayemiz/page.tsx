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
         STORY / MISSION SECTION
         ═══════════════════════════════════════ */}
      <Section>
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-20 left-[5%] w-72 h-72 bg-brand-200/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-mint-200/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="anim">
                <span className="tag bg-brand-100 text-brand-700 mb-4">
                  <Heart className="w-3.5 h-3.5" /> MİSYONUMUZ
                </span>
              </div>
              <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
                Bütünsel bir müfredatla, çocuğunuzu{" "}
                <span className="highlight">yaşam becerileriyle</span> güçlendiriyoruz.
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Left — Story paragraphs */}
              <div className="anim d2 space-y-5">
                <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                  Çocuklarımızın akademik başarısı kadar, duygusal zekası, sosyal becerileri ve
                  yaşam yetkinlikleri de en az o kadar önemlidir. Ancak mevcut eğitim sistemi,
                  bu becerileri yeterince destekleyecek araçlardan yoksun. Biz bu boşluğu
                  doldurmak için yola çıktık.
                </p>
                <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                  LearnecoHub olarak; çocukların empati kurabildiği, duygularını
                  yönetebildiği, takım çalışması yapabildiği ve stresle başa çıkabildiği bir
                  dünya hayal ediyoruz. Bu hayali gerçeğe dönüştürmek için bilimsel
                  araştırmalarla desteklenen, dijital ortamda sunulan bütünsel bir müfredat
                  geliştirdik.
                </p>
                <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                  Amacımız sadece bilgi aktarmak değil; çocuklara hayat boyu
                  kullanabilecekleri sosyal-duygusal becerileri kazandırmaktır. Eğitimcilere,
                  ailelere ve öğrencilere güç veren bir ekosistem inşa ediyoruz.
                </p>
              </div>

              {/* Right — Checklist cards */}
              <div className="space-y-3">
                {checklist.map((item, i) => (
                  <div
                    key={i}
                    className={`anim d${Math.min(i + 1, 6)} card-3d flex items-start gap-3 bg-[#ECFBF2] border border-[#A3EBC1]/40 rounded-xl p-3.5`}
                  >
                    <CircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#2ECC71" }} />
                    <span className="text-[0.88rem] text-slate-700 font-medium leading-snug">{item}</span>
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

            {/* 3 Feature Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: PenTool,
                  title: "Atölye Temelli",
                  desc: "Atölye temelli, oyunlaştırılmış ve deneyimsel öğrenme odaklı içerikler.",
                  color: "#1B3A7B",
                  bg: "#EBF2FB",
                },
                {
                  icon: Users,
                  title: "Takım Çalışması",
                  desc: "Çocuklar takım çalışması yapar, fikir üretir, sunum becerisi kazanır.",
                  color: "#2ECC71",
                  bg: "#ECFBF2",
                },
                {
                  icon: Heart,
                  title: "Yaşam Becerileri",
                  desc: "Stres yönetimi, iletişim, öz şefkat, liderlik ve duygusal zeka becerileri.",
                  color: "#7F63CB",
                  bg: "#F0EDF9",
                },
              ].map((card, i) => (
                <div key={i} className={`anim d${i + 1} card-3d card-3d-white p-7 relative`}>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: card.bg }}
                  >
                    <card.icon className="w-6 h-6" style={{ color: card.color }} />
                  </div>
                  <h3 className="font-display text-lg font-extrabold text-slate-800 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[0.85rem] text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              ))}
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

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: Layers,
                  cls: "card-3d-brand",
                  stat: "500+",
                  label: "Dijital İçerik",
                  desc: "Her an, her yerde öğretmeye hazır olun.",
                },
                {
                  icon: Users,
                  cls: "card-3d-mint",
                  stat: "",
                  label: "Öğrenci Merkezlilik",
                  desc: "Her öğrencinin potansiyeline saygı duyan, kişiselleştirilmiş öğrenme fırsatı.",
                },
                {
                  icon: Heart,
                  cls: "card-3d-lavender",
                  stat: "",
                  label: "Tutku ve İlham",
                  desc: "Merakı güdüleyen, öğrenmeye heyecan katan içerikler.",
                },
                {
                  icon: TrendingUp,
                  cls: "card-3d-gold",
                  stat: "",
                  label: "Sürekli Gelişim",
                  desc: "Bilimsel yeniliklerle her zaman bir adım öndeyiz.",
                },
              ].map((card, i) => (
                <div key={i} className={`anim d${i + 1} card-3d ${card.cls} p-7 text-center`}>
                  <card.icon className="w-7 h-7 mx-auto mb-3 opacity-40" />
                  {card.stat && (
                    <p className="font-display text-3xl sm:text-4xl font-extrabold text-slate-800 mb-1">
                      {card.stat}
                    </p>
                  )}
                  <h3 className="font-display text-lg font-extrabold text-slate-800 mb-2">
                    {card.label}
                  </h3>
                  <p className="text-[0.82rem] text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              ))}
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
