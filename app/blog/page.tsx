"use client";

import { useState } from "react";
import {
  Section, SubpageNavbar, SubpageHero, FinalCTA, SubpageFooter,
} from "@/components/subpage-shared";
import {
  BookOpen, ArrowRight, Clock, User, Tag, Search,
  Heart, Brain, GraduationCap, Newspaper, TrendingUp,
  Sparkles, Bell, Mail, CheckCircle2, Calendar,
} from "lucide-react";

/* ─── Types ─── */
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  accentColor: string;
  categoryColor: string;
  categoryBg: string;
}

/* ─── Blog Data ─── */
const categories = [
  { label: "Tümü", icon: Sparkles, color: "#1B3A7B", bg: "#EBF2FB", accent: "#4D7EC4" },
  { label: "Sosyal-Duygusal Öğrenme", icon: Heart, color: "#2ECC71", bg: "#ECFBF2", accent: "#69DC9A" },
  { label: "Ebeveyn Rehberi", icon: User, color: "#7F63CB", bg: "#F0EDF9", accent: "#9F8AD8" },
  { label: "Eğitimci Köşesi", icon: GraduationCap, color: "#EE7A45", bg: "#FEF5F0", accent: "#F49668" },
  { label: "Araştırmalar", icon: Brain, color: "#F5C518", bg: "#FFFBEB", accent: "#FFDF66" },
  { label: "Haberler", icon: Newspaper, color: "#1B3A7B", bg: "#EBF2FB", accent: "#7BA0D3" },
];

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "cocuklarda-empati-gelistirmenin-7-etkili-yolu",
    title: "Çocuklarda Empati Geliştirmenin 7 Etkili Yolu",
    excerpt: "Empati, çocukların sosyal ilişkilerinin temelini oluşturur. Araştırmalar, empati becerisinin erken yaşlarda desteklenmesiyle çocukların daha sağlıklı ilişkiler kurduğunu göstermektedir. İşte bilimsel temelli 7 etkili strateji...",
    category: "Sosyal-Duygusal Öğrenme",
    date: "15 Şubat 2025",
    readTime: "8 dk",
    author: "Dr. Melih Taha Aytep",
    accentColor: "#1B3A7B",
    categoryColor: "#2ECC71",
    categoryBg: "#ECFBF2",
  },
  {
    id: 2,
    slug: "dijital-cagda-sosyal-beceriler-ekran-suresi-ve-cocuk-gelisimi",
    title: "Dijital Çağda Sosyal Beceriler: Ekran Süresi ve Çocuk Gelişimi",
    excerpt: "Teknolojinin hayatımızın her alanına nüfuz ettiği bu dönemde, çocukların dijital dünya ile sağlıklı bir ilişki kurması büyük önem taşıyor. Ekran süresinin sosyal beceriler üzerindeki etkisini inceliyoruz...",
    category: "Araştırmalar",
    date: "8 Şubat 2025",
    readTime: "12 dk",
    author: "Dr. Kaan Mert Güven",
    accentColor: "#2ECC71",
    categoryColor: "#F5C518",
    categoryBg: "#FFFBEB",
  },
  {
    id: 3,
    slug: "ogretmenler-icin-sinif-ici-sel-etkinlikleri-rehberi",
    title: "Öğretmenler İçin Sınıf İçi SEL Etkinlikleri Rehberi",
    excerpt: "Sosyal-duygusal öğrenme etkinliklerini sınıf ortamına entegre etmek, öğrencilerin hem akademik hem de kişisel gelişimlerini destekler. Hazırlık gerektirmeyen, uygulaması kolay 15 etkinlik önerisi...",
    category: "Eğitimci Köşesi",
    date: "1 Şubat 2025",
    readTime: "10 dk",
    author: "Kübra Demirci",
    accentColor: "#7F63CB",
    categoryColor: "#EE7A45",
    categoryBg: "#FEF5F0",
  },
  {
    id: 4,
    slug: "casel-cercevesi-nedir-sosyal-duygusal-ogrenme-standartlari",
    title: "CASEL Çerçevesi Nedir? Sosyal-Duygusal Öğrenme Standartları",
    excerpt: "CASEL (Collaborative for Academic, Social, and Emotional Learning), sosyal-duygusal öğrenmenin dünya genelinde kabul görmüş çerçevesini sunar. Beş temel yetkinlik alanını ve uygulama önerilerini detaylıca ele alıyoruz...",
    category: "Araştırmalar",
    date: "25 Ocak 2025",
    readTime: "15 dk",
    author: "Buse Aksoy",
    accentColor: "#F5C518",
    categoryColor: "#F5C518",
    categoryBg: "#FFFBEB",
  },
  {
    id: 5,
    slug: "ebeveynler-icin-duygu-koclugu-adim-adim-kilavuz",
    title: "Ebeveynler İçin Duygu Koçluğu: Adım Adım Kılavuz",
    excerpt: "Duygu koçluğu, ebeveynlerin çocuklarının duygusal dünyasını anlamalarına ve onlara rehberlik etmelerine yardımcı olan güçlü bir yaklaşımdır. John Gottman'ın araştırmalarına dayanan bu kılavuzla...",
    category: "Ebeveyn Rehberi",
    date: "18 Ocak 2025",
    readTime: "9 dk",
    author: "Dr. Melih Taha Aytep",
    accentColor: "#EE7A45",
    categoryColor: "#7F63CB",
    categoryBg: "#F0EDF9",
  },
  {
    id: 6,
    slug: "2025te-egitim-teknolojilerinde-yeni-trendler",
    title: "2025'te Eğitim Teknolojilerinde Yeni Trendler",
    excerpt: "Yapay zeka destekli kişiselleştirilmiş öğrenme, artırılmış gerçeklik uygulamaları ve oyunlaştırma stratejileri... 2025 yılında eğitim teknolojilerinde öne çıkan trendleri ve LearnecoHub'ın bu dönüşümdeki rolünü keşfedin...",
    category: "Haberler",
    date: "10 Ocak 2025",
    readTime: "7 dk",
    author: "Sayid Özcan",
    accentColor: "#1B3A7B",
    categoryColor: "#1B3A7B",
    categoryBg: "#EBF2FB",
  },
];

/* ═══════════════════════════════════════
   BLOG PAGE
   ═══════════════════════════════════════ */
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const filteredPosts =
    activeCategory === "Tümü"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <main>
      {/* ─── Navbar ─── */}
      <SubpageNavbar active="Blog" />

      {/* ─── Hero ─── */}
      <SubpageHero
        breadcrumb="Blog"
        tag="EĞİTİM BLOGU"
        tagIcon={BookOpen}
        title="Eğitim dünyasından"
        titleHighlight="güncel yazılar."
        description="Sosyal-duygusal öğrenme, çocuk gelişimi, ebeveyn rehberliği ve eğitim teknolojileri hakkında uzman kadromuzun hazırladığı blog yazılarını keşfedin."
        theme="peach"
      >
        <div className="grid grid-cols-2 gap-3 flex-shrink-0 w-full sm:w-auto">
          {[
            { icon: BookOpen, text: "50+", label: "Makale", color: "#1B3A7B", bg: "#EBF2FB", border: "#A8C2E3" },
            { icon: Heart, text: "6", label: "Kategori", color: "#2ECC71", bg: "#ECFBF2", border: "#A3EBC1" },
            { icon: User, text: "10+", label: "Uzman Yazar", color: "#7F63CB", bg: "#F0EDF9", border: "#BFB1E5" },
            { icon: TrendingUp, text: "5K+", label: "Okuyucu", color: "#EE7A45", bg: "#FEF5F0", border: "#FBCFB7" },
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

      {/* ═══════════════════════════════════════
         BLOG CATEGORIES & POSTS
         ═══════════════════════════════════════ */}
      <Section>
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-20 left-[5%] w-72 h-72 bg-brand-200/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-mint-200/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="anim">
                <span className="tag bg-brand-100 text-brand-700 mb-4">
                  <Tag className="w-3.5 h-3.5" /> KATEGORİLER
                </span>
              </div>
              <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
                İlgi alanınıza göre <span className="text-gradient">yazıları keşfedin</span>
              </h2>
              <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
                Farklı kategorilerdeki blog yazılarımıza göz atın ve size en uygun içerikleri bulun.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="anim d2">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
                {categories.map((c, i) => {
                  const isActive = activeCategory === c.label;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveCategory(c.label)}
                      className="manifesto-tab flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-display font-bold text-[0.78rem] sm:text-[0.85rem] transition-all duration-400 border-2"
                      style={{
                        background: isActive ? c.color : "white",
                        color: isActive ? "#fff" : "#64748B",
                        borderColor: isActive ? c.color : "#E2E8F0",
                        boxShadow: isActive
                          ? `0 4px 0 ${c.accent}55, 0 8px 20px ${c.color}20`
                          : "0 2px 0 #E2E8F0",
                        transform: isActive ? "translateY(-2px)" : "translateY(0)",
                      }}
                    >
                      <c.icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Blog Posts Grid — Notebook Style */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, i) => (
                <a
                  key={post.id}
                  href={"/blog/" + post.slug}
                  className={`anim d${Math.min(i + 1, 6)} group block`}
                >
                  <div className="relative bg-white rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)" }}>
                    {/* Top colored tab */}
                    <div className="relative h-9 flex items-center px-4" style={{ background: post.accentColor }}>
                      <div className="w-4 h-4 rounded-full border-[2px] border-white/60 bg-transparent" />
                      <div className="ml-auto flex items-center gap-2">
                        <span className="text-[0.6rem] font-bold text-white/70">{post.readTime}</span>
                        <div className="px-2 py-0.5 rounded-md bg-white/20">
                          <span className="text-[0.6rem] font-bold text-white/90 uppercase tracking-wide">{post.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Lined paper area */}
                    <div className="relative" style={{
                      backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #e8e8e8 27px, #e8e8e8 28px)",
                      backgroundPosition: "0 12px",
                    }}>
                      <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-red-300/40 pointer-events-none" />

                      <div className="px-5 pl-14 py-5">
                        {/* Title */}
                        <h3 className="font-display text-[1rem] font-extrabold text-slate-800 leading-tight mb-2.5 group-hover:text-[#1B3A7B] transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-[0.8rem] text-slate-400 leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Meta row */}
                        <div className="flex items-center gap-3 text-[0.72rem] text-slate-400 font-medium mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                        </div>

                        {/* Author + Read more */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100/80">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: post.categoryBg }}>
                              <User className="w-3 h-3" style={{ color: post.accentColor }} />
                            </div>
                            <span className="text-[0.72rem] font-semibold text-slate-500">{post.author}</span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-[0.72rem] font-bold transition-all group-hover:gap-2" style={{ color: post.accentColor }}>
                            Oku <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom torn edge */}
                    <div className="h-2 w-full" style={{
                      background: `linear-gradient(135deg, white 33.33%, transparent 33.33%) -6px 0, linear-gradient(225deg, white 33.33%, transparent 33.33%) -6px 0`,
                      backgroundSize: "12px 12px",
                      backgroundColor: post.accentColor + "18",
                    }} />
                  </div>
                </a>
              ))}
            </div>

            {/* No results message */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-slate-600 mb-2">
                  Bu kategoride henüz yazı bulunmuyor.
                </h3>
                <p className="text-slate-400 text-[0.9rem]">
                  Diğer kategorilere göz atabilir veya tüm yazıları görüntüleyebilirsiniz.
                </p>
                <button
                  onClick={() => setActiveCategory("Tümü")}
                  className="btn-3d btn-3d-brand mt-6 !text-[0.85rem]"
                >
                  Tüm Yazıları Gör
                </button>
              </div>
            )}

            {/* Load More */}
            {filteredPosts.length > 0 && (
              <div className="anim text-center mt-12">
                <button className="btn-3d btn-3d-brand !text-[0.85rem]">
                  <BookOpen className="w-4 h-4" />
                  Daha Fazla Yazı Yükle
                </button>
              </div>
            )}
          </div>
        </section>
      </Section>

      {/* ═══════════════════════════════════════
         POPULAR TOPICS
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
                  <TrendingUp className="w-3.5 h-3.5" /> POPÜLER KONULAR
                </span>
              </div>
              <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
                En çok okunan <span className="text-gradient">konu başlıkları</span>
              </h2>
              <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
                Okuyucularımızın en çok ilgi gösterdiği sosyal-duygusal öğrenme konuları.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: Heart,
                  cls: "card-3d-brand",
                  label: "Empati & Duygusal Zeka",
                  desc: "Çocuklarda empati gelişimi ve duygusal farkındalık üzerine yazılar.",
                  count: "12 yazı",
                },
                {
                  icon: Brain,
                  cls: "card-3d-mint",
                  label: "Öz Yönetim",
                  desc: "Stres yönetimi, dürtü kontrolü ve hedef belirleme becerileri.",
                  count: "9 yazı",
                },
                {
                  icon: User,
                  cls: "card-3d-lavender",
                  label: "Ebeveyn Desteği",
                  desc: "Ev ortamında sosyal-duygusal becerileri destekleme rehberleri.",
                  count: "15 yazı",
                },
                {
                  icon: GraduationCap,
                  cls: "card-3d-gold",
                  label: "Sınıf Uygulamaları",
                  desc: "Öğretmenler için pratik SEL etkinlikleri ve ders planları.",
                  count: "8 yazı",
                },
              ].map((card, i) => (
                <div key={i} className={`anim d${i + 1} card-3d ${card.cls} p-7 text-center`}>
                  <card.icon className="w-7 h-7 mx-auto mb-3 opacity-40" />
                  <h3 className="font-display text-lg font-extrabold text-slate-800 mb-2">
                    {card.label}
                  </h3>
                  <p className="text-[0.82rem] text-slate-500 leading-relaxed mb-3">{card.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold text-slate-400 uppercase tracking-wide">
                    <BookOpen className="w-3 h-3" /> {card.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* ═══════════════════════════════════════
         NEWSLETTER SUBSCRIBE BANNER
         ═══════════════════════════════════════ */}
      <Section>
        <section className="py-24 bg-[#FFFBEB] relative overflow-hidden">
          <div className="absolute top-16 right-[10%] w-60 h-60 bg-gold-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-16 left-[8%] w-56 h-56 bg-brand-200/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 dots-pattern opacity-[0.06]" />
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="anim-scale card-3d card-3d-gold p-10 sm:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-brand-400/5 rounded-full blur-3xl" />
              <div className="absolute inset-0 dots-pattern opacity-[0.04]" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="w-14 h-14 rounded-2xl bg-[#1B3A7B]/10 flex items-center justify-center mx-auto lg:mx-0 mb-5">
                    <Bell className="w-7 h-7 text-[#1B3A7B]" />
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">
                    Blogumuza <span className="text-[#1B3A7B]">abone olun!</span>
                  </h2>
                  <p className="text-[0.9rem] text-slate-500 leading-relaxed max-w-md mx-auto lg:mx-0 mb-6">
                    Sosyal-duygusal öğrenme hakkında en güncel yazılar, araştırma özetleri ve
                    pratik rehberler doğrudan e-posta kutunuza gelsin. Haftada bir, yalnızca
                    en kaliteli içerikler.
                  </p>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[0.78rem] text-slate-400">
                    {["Haftalık bülten", "Spam yok", "İstediğiniz zaman çıkın"].map((t, i) => (
                      <span key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2ECC71]" />{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right — Subscribe Form */}
                <div className="w-full lg:w-auto lg:min-w-[320px]">
                  <div className="card-3d card-3d-white p-6">
                    <label className="block text-[0.78rem] font-bold text-slate-600 mb-2">
                      E-posta Adresiniz
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input
                          type="email"
                          placeholder="ornek@email.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 text-[0.85rem] font-medium text-slate-700 placeholder:text-slate-300 focus:border-[#1B3A7B] focus:outline-none transition-colors"
                        />
                      </div>
                      <button className="btn-3d btn-3d-brand !py-3 !px-6 !text-[0.85rem] whitespace-nowrap">
                        <Bell className="w-4 h-4" />
                        Abone Ol
                      </button>
                    </div>
                    <p className="text-[0.7rem] text-slate-400 mt-3">
                      Abone olarak <a href="#" className="text-[#1B3A7B] font-semibold hover:underline">gizlilik politikamızı</a> kabul etmiş olursunuz.
                    </p>
                  </div>
                </div>
              </div>
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
