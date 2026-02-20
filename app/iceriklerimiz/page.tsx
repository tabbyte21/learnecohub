"use client";

import { useState, type ReactNode } from "react";
import {
  BookOpen, Users, GraduationCap, BarChart3, Heart,
  ArrowRight, CheckCircle2, Sparkles, ChevronRight,
  Zap, Target, Award, MessageCircle,
  Layers, Monitor, Headphones, PenTool, FileText, Video, Gamepad2,
  Puzzle, Trophy, Shield, CircleCheck, Rocket,
  Brain, HandHeart, Smile, Compass, Phone,
} from "lucide-react";
import { useAnim, Section, Counter, SubpageNavbar, SubpageHero, SubpageFooter } from "@/components/subpage-shared";

/* Navbar and Footer now use shared components from subpage-shared.tsx */

/* ═══════════════════════════════════════
   HERO — Uses SubpageHero with lavender theme
   ═══════════════════════════════════════ */
function Hero() {
  return (
    <SubpageHero
      breadcrumb="İçeriklerimiz"
      tag="500+ DİJİTAL İÇERİK"
      tagIcon={Layers}
      title="Sosyal beceri müfredatımızı"
      titleHighlight="keşfedin."
      description="Animasyonlu videolar, etkileşimli oyunlar ve dijital çalışma sayfalarıyla 100'den fazla sosyal-duygusal beceriyi kapsayan zengin içerik kütüphanemizi inceleyin."
      theme="lavender"
    >
      {/* Right — Mini stat cards (2x2 grid) */}
      <div className="grid grid-cols-2 gap-3 flex-shrink-0 w-full sm:w-auto">
        {[
          { icon: Video, text: "200+", label: "Video", color: "#1B3A7B", bg: "#EBF2FB", border: "#A8C2E3" },
          { icon: Gamepad2, text: "80+", label: "Oyun", color: "#2ECC71", bg: "#ECFBF2", border: "#A3EBC1" },
          { icon: FileText, text: "500+", label: "Materyal", color: "#7F63CB", bg: "#F0EDF9", border: "#BFB1E5" },
          { icon: Monitor, text: "120+", label: "Ders", color: "#EE7A45", bg: "#FEF5F0", border: "#FBCFB7" },
        ].map((s, i) => (
          <div
            key={i}
            className="card-3d p-4 sm:p-5 text-center w-full sm:w-[140px]"
            style={{
              background: s.bg,
              borderColor: s.border,
              borderBottomWidth: "5px",
              borderBottomColor: s.color,
            }}
          >
            <s.icon className="w-5 h-5 mx-auto mb-2 opacity-50" style={{ color: s.color }} />
            <p className="font-display text-2xl font-extrabold text-slate-800 leading-none mb-0.5">{s.text}</p>
            <p className="text-[0.7rem] text-slate-500 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>
    </SubpageHero>
  );
}

/* ═══════════════════════════════════════
   CONTENT STATS
   ═══════════════════════════════════════ */
function ContentStats() {
  const stats = [
    { value: 200, suffix: "+", label: "Etkileşimli Video", desc: "Hikayeleştirilmiş, animasyon destekli ve oyunlaştırılmış video içerikleri", icon: Video, tabColor: "#1B3A7B" },
    { value: 80, suffix: "+", label: "Beceri Oyunu", desc: "Etkileşimli karar oyunları, takım görevleri ve empati simülasyonları", icon: Gamepad2, tabColor: "#2ECC71" },
    { value: 500, suffix: "+", label: "Çalışma Sayfası", desc: "Dijital ve yazdırılabilir etkinlikler, değerlendirme formları", icon: FileText, tabColor: "#7F63CB" },
    { value: 120, suffix: "+", label: "Dijital Ders", desc: "Sınıf içi kullanıma hazır, adım adım ilerleyen ders modülleri", icon: Monitor, tabColor: "#EE7A45" },
    { value: 60, suffix: "+", label: "Sesli İçerik", desc: "Farkındalık meditasyonları, hikaye serileri ve nefes egzersizleri", icon: Headphones, tabColor: "#F5C518" },
    { value: 90, suffix: "+", label: "Grup Etkinliği", desc: "Takım kurma aktiviteleri, empati çemberleri ve rol yapma egzersizleri", icon: Users, tabColor: "#1B3A7B" },
  ];
  return (
    <Section>
      <section className="py-20 bg-[#FFFBEB] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute top-10 right-[10%] w-48 h-48 bg-gold-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[8%] w-40 h-40 bg-brand-200/20 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="anim"><span className="tag bg-gold-100 text-gold-700 mb-4"><Sparkles className="w-3.5 h-3.5" /> RAKAMLARLA</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Zengin <span className="highlight">içerik kütüphanesi</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Her yaş grubuna ve beceri alanına özel, sürekli güncellenen dijital içerik havuzu.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {stats.map((s, i) => (
              <div key={i} className={`anim d${Math.min(i + 1, 6)} group`}>
                <div className="relative bg-white rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)" }}>
                  {/* Top colored tab */}
                  <div className="relative h-9 flex items-center px-4" style={{ background: s.tabColor }}>
                    <div className="w-4 h-4 rounded-full border-[2px] border-white/60 bg-transparent" />
                    <div className="ml-auto px-2 py-0.5 rounded-md bg-white/20">
                      <span className="text-[0.6rem] font-bold text-white/90 uppercase tracking-wide">{s.value}{s.suffix}</span>
                    </div>
                  </div>
                  {/* Lined paper */}
                  <div className="relative p-5 pl-12" style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #e8e8e8 27px, #e8e8e8 28px)",
                    backgroundPosition: "0 12px",
                  }}>
                    <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-red-300/40 pointer-events-none" />
                    <s.icon className="w-6 h-6 mb-2 opacity-40" style={{ color: s.tabColor }} />
                    <h4 className="font-display text-[0.95rem] font-extrabold text-slate-800 mb-1 leading-tight">{s.label}</h4>
                    <p className="text-[0.75rem] text-slate-400 leading-relaxed line-clamp-2">{s.desc}</p>
                  </div>
                  {/* Bottom torn edge */}
                  <div className="h-2 w-full" style={{
                    background: `linear-gradient(135deg, white 33.33%, transparent 33.33%) -6px 0, linear-gradient(225deg, white 33.33%, transparent 33.33%) -6px 0`,
                    backgroundSize: "12px 12px",
                    backgroundColor: s.tabColor + "18",
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

/* ═══════════════════════════════════════
   CONTENT CATEGORIES — Interactive Tabs
   ═══════════════════════════════════════ */
function ContentCategories() {
  const [activeTab, setActiveTab] = useState(0);

  const categories = [
    {
      icon: Video, label: "Etkileşimli Videolar", count: "200+",
      color: "#1B3A7B", bg: "#EBF2FB", accent: "#4D7EC4",
      desc: "Klasik ve pasif anlatımı geride bırakıyoruz. Yaş gruplarına özel, hikayeleştirilmiş, animasyon destekli ve oyunlaştırılmış video içerikleri sunuyoruz.",
      details: "Gerçek yaşamdan esinlenen senaryolar ve ilgi çekici karakterlerle tasarlanan bu içerikler, öğrenmeyi yalnızca etkili değil, unutulmaz da kılıyor. 20 yılı aşkın araştırmaya dayanan bilimsel yaklaşımımız, öğrencilerin sosyal, duygusal ve davranışsal becerilerini kalıcı biçimde geliştirmelerine destek olur.",
      features: ["Hikaye temelli animasyonlar", "Yaşa özel senaryolar", "Karakter gelişim serileri", "Bilimsel temelli içerik", "Oyunlaştırılmış anlatım", "Etkileşimli sorular"],
    },
    {
      icon: Gamepad2, label: "Beceri Oyunları", count: "80+",
      color: "#2ECC71", bg: "#ECFBF2", accent: "#69DC9A",
      desc: "Yeni öğrenilen becerilerin pekişmesini sağlayan etkileşimli oyunlarımız ile öğrenmeyi daha eğlenceli ve etkili hale getiriyoruz.",
      details: "Kısa, hedef odaklı ve bölümlere ayrılmış oyunlarımız; bireysel uygulamalar, takım çalışmaları ve evde pratik yapmak için ideal bir öğrenme ortamı sunuyor. Oyunlaştırılmış yapılar sayesinde sadece bilgiyi pekiştirmekle kalmıyor, öğrencilerin sosyal etkileşim becerilerini de geliştiriyoruz.",
      features: ["Etkileşimli karar oyunları", "Takım çalışması görevleri", "Empati simülasyonları", "Ödül ve rozet sistemi", "Anlık geri bildirim", "Puan tabloları"],
    },
    {
      icon: FileText, label: "Çalışma Sayfaları", count: "500+",
      color: "#7F63CB", bg: "#F0EDF9", accent: "#9F8AD8",
      desc: "500'den fazla dijital ve yazdırılabilir materyalle, öğrencilerinize gerçek dünya problemlerini çözme fırsatları sunuyoruz.",
      details: "İçeriklerimiz; sınıf içi derslerden küçük grup etkinliklerine, bireysel seanslardan evde çalışmalara kadar her öğrenme ortamında kolayca uygulanabilir esneklikte tasarlandı. Kapsamlı ve bilimsel temelli kaynak havuzumuz sayesinde eğitim planlarınız artık daha esnek, daha etkili ve her an elinizin altında.",
      features: ["Yazdırılabilir etkinlikler", "Dijital dolgu formları", "Bireysel ve grup çalışmaları", "Ev ödevi materyalleri", "Değerlendirme formları", "Gözlem şablonları"],
    },
    {
      icon: Monitor, label: "Dijital Dersler", count: "120+",
      color: "#EE7A45", bg: "#FEF5F0", accent: "#F49668",
      desc: "Sınıf içi kullanıma hazır, adım adım ilerleyen dijital ders modülleri ile öğretmenlerinize sıfır hazırlık avantajı sunuyoruz.",
      details: "Her ders modülü; giriş aktivitesi, ana içerik, uygulama etkinliği ve değerlendirme bölümünden oluşur. Uzaktan eğitime de uyumlu olan derslerimiz, öğretmen kılavuzları ve hazır ders planlarıyla birlikte sunulur.",
      features: ["Sınıf içi ders modülleri", "Uzaktan eğitim uyumlu", "Adım adım rehberler", "Öğretmen kılavuzları", "Hazır ders planları", "Değerlendirme araçları"],
    },
    {
      icon: Headphones, label: "Sesli İçerikler", count: "60+",
      color: "#F5C518", bg: "#FFFBEB", accent: "#FFDF66",
      desc: "Farkındalık meditasyonları, hikaye dinleme serileri ve duygusal düzenleme egzersizleri ile öğrencilerin iç dünyalarını keşfetmelerini sağlıyoruz.",
      details: "Sesli içeriklerimiz özellikle stres yönetimi, odaklanma ve duygusal düzenleme becerilerini geliştirmek için tasarlandı. Çocuklar günün herhangi bir anında bu içeriklere erişerek kendi kendilerine pratik yapabilir.",
      features: ["Farkındalık meditasyonları", "Hikaye dinleme serileri", "Duygusal düzenleme sesleri", "Nefes egzersizleri", "Rahatlatıcı müzikler", "Uyku hikayeleri"],
    },
    {
      icon: Users, label: "Grup Etkinlikleri", count: "90+",
      color: "#1B3A7B", bg: "#EBF2FB", accent: "#7BA0D3",
      desc: "Takım kurma aktiviteleri, empati çemberleri ve rol yapma egzersizleri ile sosyal becerilerin canlı ortamda uygulanmasını sağlıyoruz.",
      details: "Grup etkinliklerimiz, 10-12 kişilik gruplar halinde uygulanmak üzere tasarlanmıştır. Her etkinlik, belirli bir sosyal beceriyi hedefler ve çocukların güvenli bir ortamda pratik yapmasını sağlar.",
      features: ["Takım kurma aktiviteleri", "Empati çemberleri", "Rol yapma egzersizleri", "Tartışma kartları", "İşbirliği projeleri", "Çatışma çözme oyunları"],
    },
  ];

  const active = categories[activeTab];

  return (
    <Section>
      <section id="categories" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-mint-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-brand-100 text-brand-700 mb-4"><Layers className="w-3.5 h-3.5" /> İÇERİK KATEGORİLERİ</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Her beceri için <span className="text-gradient">zengin materyaller</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              6 farklı içerik türüyle sosyal-duygusal becerileri çok yönlü olarak öğretiyoruz.
            </p>
          </div>

          {/* Category tabs */}
          <div className="anim d2">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
              {categories.map((c, i) => {
                const isActive = activeTab === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className="manifesto-tab flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-display font-bold text-[0.78rem] sm:text-[0.85rem] transition-all duration-400 border-2"
                    style={{
                      background: isActive ? c.color : "white",
                      color: isActive ? "#fff" : "#64748B",
                      borderColor: isActive ? c.color : "#E2E8F0",
                      boxShadow: isActive ? `0 4px 0 ${c.accent}55, 0 8px 20px ${c.color}20` : "0 2px 0 #E2E8F0",
                      transform: isActive ? "translateY(-2px)" : "translateY(0)",
                    }}
                  >
                    <c.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{c.label}</span>
                    <span className="sm:hidden">{c.count}</span>
                  </button>
                );
              })}
            </div>

            {/* Progress dots */}
            <div className="flex gap-1.5 mb-5 justify-center">
              {categories.map((c, i) => (
                <button key={i} onClick={() => setActiveTab(i)} className="h-1.5 rounded-full transition-all duration-500" style={{
                  width: activeTab === i ? "40px" : "12px",
                  background: activeTab === i ? c.color : "#E2E8F0",
                }} />
              ))}
            </div>

            {/* Content panel */}
            <div
              key={activeTab}
              className="manifesto-content rounded-2xl border-2 overflow-hidden transition-all duration-500"
              style={{
                borderColor: active.accent + "40",
                borderBottomWidth: "5px",
                borderBottomColor: active.color,
              }}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left — Description */}
                <div className="p-7 sm:p-10 relative" style={{ background: active.bg }}>
                  <div className="absolute top-4 right-5 font-display font-extrabold text-[3.5rem] leading-none select-none" style={{ color: active.color + "10" }}>
                    {active.count}
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: active.color + "15" }}>
                        <active.icon className="w-6 h-6" style={{ color: active.color }} />
                      </div>
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-800">{active.label}</h3>
                        <span className="text-[0.75rem] font-bold" style={{ color: active.color }}>{active.count} İçerik</span>
                      </div>
                    </div>
                    <p className="text-[0.95rem] text-slate-700 leading-[1.8] font-medium mb-4">
                      {active.desc}
                    </p>
                    <p className="text-[0.88rem] text-slate-500 leading-[1.8]">
                      {active.details}
                    </p>
                  </div>
                </div>

                {/* Right — Features */}
                <div className="p-7 sm:p-10 bg-white">
                  <h4 className="font-display font-bold text-sm text-slate-400 uppercase tracking-wider mb-5">Bu kategoride neler var?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {active.features.map((f, j) => (
                      <div
                        key={j}
                        className="flex items-start gap-2.5 p-3.5 rounded-xl border manifesto-check-item"
                        style={{
                          background: active.bg,
                          borderColor: active.accent + "30",
                          animationDelay: `${j * 0.08}s`,
                        }}
                      >
                        <CircleCheck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: active.color }} />
                        <span className="text-[0.84rem] text-slate-700 font-medium leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="/#cta"
                    className="btn-3d mt-7 w-full justify-center"
                    style={{
                      background: active.color,
                      color: "#fff",
                      boxShadow: `0 4px 0 ${active.accent}88, 0 6px 16px ${active.color}30`,
                    }}
                  >
                    Bu İçeriklere Erişim Sağla <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center justify-between mt-5">
              <button
                onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                disabled={activeTab === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[0.82rem] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 text-slate-500"
              >
                <ChevronRight className="w-4 h-4 rotate-180" /> Önceki
              </button>
              <span className="text-[0.75rem] font-bold text-slate-400">{activeTab + 1} / {categories.length}</span>
              <button
                onClick={() => setActiveTab(Math.min(categories.length - 1, activeTab + 1))}
                disabled={activeTab === categories.length - 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[0.82rem] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 text-slate-500"
              >
                Sonraki <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   SKILL MODULES — Beceri Modülleri
   ═══════════════════════════════════════ */
function SkillModules() {
  const [activeGroup, setActiveGroup] = useState(0);

  const skillGroups = [
    {
      title: "Duygu Yönetimi",
      icon: Heart,
      color: "#1B3A7B",
      bg: "#EBF2FB",
      accent: "#4D7EC4",
      skills: [
        { name: "Duyguları Tanıma", level: "Temel", modules: 8 },
        { name: "Öfke Kontrolü", level: "Orta", modules: 6 },
        { name: "Stres Yönetimi", level: "İleri", modules: 7 },
        { name: "Kaygı ile Başa Çıkma", level: "İleri", modules: 5 },
        { name: "Olumlu Düşünme", level: "Temel", modules: 6 },
        { name: "Duygusal Esneklik", level: "Orta", modules: 4 },
      ],
    },
    {
      title: "İletişim Becerileri",
      icon: MessageCircle,
      color: "#2ECC71",
      bg: "#ECFBF2",
      accent: "#69DC9A",
      skills: [
        { name: "Aktif Dinleme", level: "Temel", modules: 7 },
        { name: "Etkili İfade", level: "Orta", modules: 6 },
        { name: "Beden Dili", level: "Temel", modules: 5 },
        { name: "Çatışma Çözme", level: "İleri", modules: 8 },
        { name: "İkna ve Müzakere", level: "İleri", modules: 5 },
        { name: "Geri Bildirim Verme", level: "Orta", modules: 4 },
      ],
    },
    {
      title: "Empati ve Sosyal Farkındalık",
      icon: HandHeart,
      color: "#F5C518",
      bg: "#FFFBEB",
      accent: "#FFDF66",
      skills: [
        { name: "Bakış Açısı Geliştirme", level: "Temel", modules: 7 },
        { name: "Duygu Okuma", level: "Orta", modules: 6 },
        { name: "Kültürel Farkındalık", level: "İleri", modules: 5 },
        { name: "Yardımseverlik", level: "Temel", modules: 4 },
        { name: "Toplumsal Sorumluluk", level: "Orta", modules: 6 },
        { name: "Farklılıklara Saygı", level: "Temel", modules: 5 },
      ],
    },
    {
      title: "Öz Farkındalık",
      icon: Brain,
      color: "#7F63CB",
      bg: "#F0EDF9",
      accent: "#9F8AD8",
      skills: [
        { name: "Kendini Tanıma", level: "Temel", modules: 8 },
        { name: "Güçlü Yönleri Keşfetme", level: "Temel", modules: 5 },
        { name: "Öz Güven", level: "Orta", modules: 7 },
        { name: "Değerler ve İnançlar", level: "İleri", modules: 4 },
        { name: "Öz Şefkat", level: "Orta", modules: 6 },
        { name: "Motivasyon", level: "Temel", modules: 5 },
      ],
    },
    {
      title: "Problem Çözme",
      icon: Puzzle,
      color: "#EE7A45",
      bg: "#FEF5F0",
      accent: "#F49668",
      skills: [
        { name: "Eleştirel Düşünme", level: "Orta", modules: 7 },
        { name: "Karar Verme", level: "İleri", modules: 6 },
        { name: "Yaratıcı Çözümler", level: "Orta", modules: 5 },
        { name: "Hedef Belirleme", level: "Temel", modules: 6 },
        { name: "Planlama ve Organizasyon", level: "İleri", modules: 5 },
        { name: "Zaman Yönetimi", level: "Orta", modules: 4 },
      ],
    },
  ];

  const group = skillGroups[activeGroup];
  const levelColors: Record<string, { bg: string; text: string }> = {
    "Temel": { bg: "#ECFBF2", text: "#2ECC71" },
    "Orta": { bg: "#FFFBEB", text: "#F5C518" },
    "İleri": { bg: "#F0EDF9", text: "#7F63CB" },
  };

  return (
    <Section>
      <section className="py-24 bg-[#E8F4FD] relative overflow-hidden">
        <div className="absolute top-20 right-[8%] w-60 h-60 bg-brand-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[5%] w-52 h-52 bg-mint-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-lavender-100 text-lavender-700 mb-4"><BookOpen className="w-3.5 h-3.5" /> BECERİ MODÜLLERİ</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              <span className="highlight">100+</span> sosyal-duygusal beceri
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              5 ana kategoride, temel seviyeden ileri seviyeye kadar yapılandırılmış beceri modülleri.
            </p>
          </div>

          <div className="anim d2">
            {/* Group selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
              {skillGroups.map((g, i) => {
                const isActive = activeGroup === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveGroup(i)}
                    className="card-3d p-4 text-center transition-all duration-300 cursor-pointer"
                    style={{
                      background: isActive ? g.bg : "#ffffff",
                      borderColor: isActive ? g.accent : "#E2E8F0",
                      borderBottomColor: isActive ? g.color : "#CBD5E1",
                      borderBottomWidth: "5px",
                      transform: isActive ? "translateY(-3px)" : "translateY(0)",
                    }}
                  >
                    <g.icon className="w-6 h-6 mx-auto mb-2" style={{ color: isActive ? g.color : "#94A3B8" }} />
                    <p className="font-display font-bold text-[0.78rem] leading-tight" style={{ color: isActive ? g.color : "#64748B" }}>{g.title}</p>
                  </button>
                );
              })}
            </div>

            {/* Skills grid */}
            <div key={activeGroup} className="manifesto-content grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.skills.map((skill, j) => {
                const lc = levelColors[skill.level];
                return (
                  <div
                    key={j}
                    className="card-3d card-3d-white p-5 flex items-start gap-4 manifesto-check-item"
                    style={{ animationDelay: `${j * 0.08}s` }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: group.bg }}>
                      <group.icon className="w-5 h-5" style={{ color: group.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-[0.92rem] text-slate-800 mb-1">{skill.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[0.68rem] font-bold px-2 py-0.5 rounded-full" style={{ background: lc.bg, color: lc.text }}>
                          {skill.level}
                        </span>
                        <span className="text-[0.72rem] text-slate-400 font-medium">{skill.modules} Modül</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0 mt-1" />
                  </div>
                );
              })}
            </div>

            {/* Info note */}
            <div className="mt-6 text-center">
              <p className="text-[0.82rem] text-slate-400 font-medium">
                Her modül: <span className="font-bold text-slate-500">Video</span> + <span className="font-bold text-slate-500">Oyun</span> + <span className="font-bold text-slate-500">Etkinlik</span> + <span className="font-bold text-slate-500">Ölçme Aracı</span> içerir.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   AGE GROUPS — Yaş Grupları
   ═══════════════════════════════════════ */
function AgeGroups() {
  const groups = [
    {
      title: "İlkokul",
      subtitle: "5-10 Yaş",
      icon: Smile,
      cls: "card-3d-mint",
      color: "#2ECC71",
      bg: "#ECFBF2",
      items: [
        "Temel duygu tanıma ve ifade etme",
        "Arkadaşlık kurma becerileri",
        "Paylaşma ve sıra bekleme",
        "Dinleme ve empati temelleri",
        "Öz bakım ve sorumluluk",
        "Basit problem çözme",
      ],
    },
    {
      title: "Ortaokul",
      subtitle: "11-14 Yaş",
      icon: Zap,
      cls: "card-3d-brand",
      color: "#1B3A7B",
      bg: "#EBF2FB",
      items: [
        "İleri empati ve bakış açısı geliştirme",
        "Akran baskısıyla başa çıkma",
        "Dijital vatandaşlık ve güvenlik",
        "Stres yönetimi teknikleri",
        "Takım çalışması ve liderlik",
        "Eleştirel düşünme",
      ],
    },
    {
      title: "Lise",
      subtitle: "14-18 Yaş",
      icon: Rocket,
      cls: "card-3d-lavender",
      color: "#7F63CB",
      bg: "#F0EDF9",
      items: [
        "Kariyer planlaması ve hedef belirleme",
        "İleri düzey çatışma çözme",
        "Öz farkındalık ve kimlik keşfi",
        "Duygusal zeka ve liderlik",
        "Toplumsal sorumluluk projeleri",
        "Resilience ve dayanıklılık",
      ],
    },
  ];

  return (
    <Section>
      <section className="py-24 bg-[#ECFBF2] relative overflow-hidden">
        <div className="absolute top-16 right-[10%] w-60 h-60 bg-mint-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-[8%] w-56 h-56 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 dots-pattern opacity-[0.06]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-peach-100 text-peach-700 mb-4"><GraduationCap className="w-3.5 h-3.5" /> YAŞ GRUPLARI</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Her yaşa <span className="highlight">özel müfredat</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              İlkokuldan liseye kadar, gelişim dönemine uygun yapılandırılmış içerikler.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {groups.map((g, i) => (
              <div key={i} className={`anim d${i + 1} card-3d ${g.cls} p-7 relative flex flex-col`}>
                <div className="absolute top-5 right-5">
                  <span className="tag font-bold" style={{ background: g.color + "15", color: g.color }}>{g.subtitle}</span>
                </div>
                <g.icon className="w-8 h-8 mb-4 opacity-50" style={{ color: g.color }} />
                <h3 className="font-display text-xl font-extrabold text-slate-800 mb-1">{g.title}</h3>
                <p className="text-[0.82rem] text-slate-400 font-medium mb-5">{g.subtitle} arası öğrenciler</p>
                <ul className="space-y-2.5 flex-1">
                  {g.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[0.84rem] text-slate-600">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: g.color }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/#cta"
                  className="btn-3d mt-6 w-full justify-center"
                  style={{
                    background: g.color,
                    color: "#fff",
                    boxShadow: `0 4px 0 ${g.color}88, 0 6px 16px ${g.color}30`,
                  }}
                >
                  {g.title} Müfredatını İncele <ArrowRight className="w-4 h-4" />
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
   CONTENT DELIVERY — Nasıl Sunuyoruz
   ═══════════════════════════════════════ */
function ContentDelivery() {
  const methods = [
    {
      icon: Video, title: "İzle", desc: "Hikayeleştirilmiş animasyon videolarla beceriyi keşfet.", color: "#1B3A7B", bg: "#EBF2FB",
      num: "01",
    },
    {
      icon: Gamepad2, title: "Oyna", desc: "Etkileşimli oyunlarla öğrenileni pekiştir ve pratik yap.", color: "#2ECC71", bg: "#ECFBF2",
      num: "02",
    },
    {
      icon: PenTool, title: "Uygula", desc: "Çalışma sayfaları ve etkinliklerle beceriyi hayata geçir.", color: "#F5C518", bg: "#FFFBEB",
      num: "03",
    },
    {
      icon: BarChart3, title: "Ölçüm", desc: "Gelişim takip araçlarıyla ilerlemeyi gözlemle ve raporla.", color: "#7F63CB", bg: "#F0EDF9",
      num: "04",
    },
  ];

  return (
    <Section>
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-10 left-[8%] w-60 h-60 bg-gold-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[10%] w-52 h-52 bg-lavender-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-gold-100 text-gold-700 mb-4"><Zap className="w-3.5 h-3.5" /> ÖĞRENME DÖNGÜSÜ</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Her beceri <span className="text-gradient">4 adımda</span> kazanılır
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Her beceri modülü izle, oyna, uygula ve ölçüm döngüsüyle tasarlanmıştır.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {methods.map((m, i) => (
              <div key={i} className={`anim d${i + 1} relative`}>
                <div
                  className="card-3d p-7 text-center relative h-full"
                  style={{
                    background: m.bg,
                    borderColor: m.color + "30",
                    borderBottomWidth: "5px",
                    borderBottomColor: m.color,
                  }}
                >
                  <div className="absolute top-4 right-4 font-display text-4xl font-extrabold select-none" style={{ color: m.color + "12" }}>{m.num}</div>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: m.color + "15" }}>
                    <m.icon className="w-7 h-7" style={{ color: m.color }} />
                  </div>
                  <h3 className="font-display text-lg font-extrabold text-slate-800 mb-2">{m.title}</h3>
                  <p className="text-[0.85rem] text-slate-500 leading-relaxed">{m.desc}</p>
                </div>
                {/* Connector arrow (not on last item) */}
                {i < methods.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 z-20 w-6 h-6 items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   DIFFERENCE BANNER
   ═══════════════════════════════════════ */
function DifferenceBanner() {
  return (
    <Section>
      <section className="py-16 bg-[#F5C518] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.08]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h3 className="anim font-display text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] mb-3 tracking-tight">
            Sıfır hazırlıkla, <span className="font-extrabold underline decoration-[#1B3A7B] decoration-2 underline-offset-4">hemen</span> kullanmaya başlayın.
          </h3>
          <p className="anim d1 text-[#1A1A2E]/70 text-[0.9rem] leading-relaxed max-w-2xl mx-auto mb-7">
            Tüm içeriklerimiz öğretmen ve uzmanlar tarafından anında uygulanabilir şekilde tasarlanmıştır. Ders planı hazırlamaya, materyal aramaya son.
          </p>
          <a href="/#cta" className="anim d2 btn-3d btn-3d-brand">
            <Rocket className="w-5 h-5" /> Ücretsiz Başla
          </a>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   WHY DIFFERENT — Fark Yaratan Özellikler
   ═══════════════════════════════════════ */
function WhyDifferent() {
  const items = [
    { icon: Shield, title: "Bilimsel Temelli", desc: "20 yılı aşkın bilimsel araştırmalara ve uluslararası standartlara dayanan müfredat.", color: "#1B3A7B", bg: "#EBF2FB" },
    { icon: Target, title: "Yaşa Özel İçerik", desc: "Her yaş grubunun gelişim ihtiyaçlarına göre yapılandırılmış, kademeli içerik sistemi.", color: "#2ECC71", bg: "#ECFBF2" },
    { icon: Layers, title: "Modüler Sistem", desc: "Her beceri için video + oyun + etkinlik + ölçme aracı içeren bütüncül modüler yapı.", color: "#F5C518", bg: "#FFFBEB" },
    { icon: BarChart3, title: "Gelişim Takibi", desc: "Dijital portfolyo, gelişim karnesi ve detaylı raporlama ile ilerlemeyi anlık takip edin.", color: "#7F63CB", bg: "#F0EDF9" },
    { icon: Award, title: "Sertifika Sistemi", desc: "Her beceri sonunda gelişim karnesi, program bitiminde uluslararası geçerli sertifika.", color: "#EE7A45", bg: "#FEF5F0" },
    { icon: GraduationCap, title: "MEB Uyumlu", desc: "Milli Eğitim Bakanlığı müfredatıyla uyumlu, okullarda kolayca uygulanabilir yapı.", color: "#1B3A7B", bg: "#EBF2FB" },
  ];

  return (
    <Section>
      <section className="py-24 bg-[#FFFBEB] relative overflow-hidden">
        <div className="absolute top-16 left-[10%] w-56 h-56 bg-gold-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-[5%] w-64 h-64 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-mint-100 text-mint-700 mb-4"><Trophy className="w-3.5 h-3.5" /> FARKLARIMIZ</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Neden <span className="text-gradient">LearnecoHub?</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              İçeriklerimizi diğerlerinden ayıran temel özellikler.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, i) => (
              <div key={i} className={`anim d${Math.min(i + 1, 6)} card-3d card-3d-white p-7 relative`}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: item.bg }}>
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="font-display text-lg font-extrabold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-[0.85rem] text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════ */
function IceriklerimizCTA() {
  return (
    <Section>
      <section className="py-24 bg-[#E8F4FD] relative overflow-hidden">
        <div className="absolute top-10 right-[15%] w-56 h-56 bg-brand-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[10%] w-48 h-48 bg-gold-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 dots-pattern opacity-[0.05]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="anim-scale bg-[#1B3A7B] rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 dots-pattern opacity-[0.04]" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-mint-500/8 rounded-full blur-3xl" />
            <div className="relative z-10 p-10 sm:p-14 text-center">
              <div className="flex items-center justify-center mx-auto mb-6">
                <img src="https://learnecohub.com/wp-content/uploads/2025/03/logo-3-e1749328376385.png" alt="LearnecoHub" className="h-8 w-auto brightness-0 invert" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                İçeriklerimizi <span className="text-[#F5C518]">deneyimleyin</span>
              </h2>
              <p className="text-slate-400 text-[0.95rem] leading-relaxed max-w-xl mx-auto mb-9">
                500+ dijital içerik, 100+ beceri modülü ve sürekli güncellenen zengin kütüphanemize hemen erişin. Çocuğunuzun sosyal-duygusal gelişimine bugün başlayın.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-7">
                <a href="/contact/" className="btn-3d btn-3d-mint text-base">Hemen Başla <ArrowRight className="w-5 h-5" /></a>
                <a href="tel:08503023600" className="btn-3d btn-3d-gold text-base">
                  <Phone className="w-4 h-4" /> 0850 302 36 00
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-5 text-[0.78rem] text-white/40">
                {["Ücretsiz başlangıç", "Kredi kartı gerekmiyor", "Anında erişim"].map((t, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2ECC71]" />{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* Footer uses SubpageFooter from subpage-shared.tsx */

/* ═══════════════════════════════════════
   PAGE
   ═══════════════════════════════════════ */
export default function IceriklerimizPage() {
  return (
    <main>
      <SubpageNavbar active="İçeriklerimiz" />
      <Hero />
      <ContentStats />
      <ContentCategories />
      <SkillModules />
      <ContentDelivery />
      <DifferenceBanner />
      <AgeGroups />
      <WhyDifferent />
      <IceriklerimizCTA />
      <SubpageFooter />
    </main>
  );
}
