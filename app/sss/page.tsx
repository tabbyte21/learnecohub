"use client";

import { useState } from "react";
import {
  Section, SubpageNavbar, SubpageHero, FinalCTA, SubpageFooter,
} from "@/components/subpage-shared";
import {
  HelpCircle, ChevronDown, BookOpen, Users, Shield,
  CreditCard, Video, UserPlus, BarChart3, Award,
  Monitor, Building2, GraduationCap, FileText, Layers,
} from "lucide-react";

/* =================================================
   FAQ DATA
   ================================================= */
const generalFaqs = [
  {
    q: "LearnecoHub nedir?",
    a: "LearnecoHub, çocuklar ve gençler için geliştirilmiş dijital bir sosyal-duygusal öğrenme platformudur. Bilimsel yöntemlerle hazırlanmış müfredatımız; empati, iletişim, özgüven, liderlik ve stres yönetimi gibi temel yaşam becerilerini çocuklara eğlenceli bir şekilde kazandırır. Animasyonlu videolar, etkileşimli oyunlar, dijital rozetler ve canlı grup seansları ile öğrenme deneyimini zenginleştiriyoruz.",
    icon: BookOpen,
    color: "#1B3A7B",
    tabColor: "#1B3A7B",
  },
  {
    q: "Hangi yaş gruplarına hitap ediyor?",
    a: "Platformumuz 6-17 yaş aralığındaki çocuk ve gençlere yönelik içerikler sunmaktadır. İçerikler yaş grubuna uygun olarak üç farklı seviyede hazırlanmıştır: 6-9 yaş (keşif dönemi), 10-13 yaş (gelişim dönemi) ve 14-17 yaş (gençlik dönemi). Her yaş grubuna özel senaryolar, aktiviteler ve etkileşim yöntemleri kullanılmaktadır.",
    icon: Users,
    color: "#2ECC71",
    tabColor: "#2ECC71",
  },
  {
    q: "Platform güvenli mi?",
    a: "Evet, çocuk güvenliği bizim en öncelikli konumuzdur. Tüm içerikler uzman psikologlar ve eğitimciler tarafından denetlenmektedir. KVKK uyumlu veri koruma politikaları uygulanır, çocukların kişisel verileri en yüksek güvenlik standartlarıyla korunur. Canlı oturumlarda her zaman uzman bir eğitimci bulunur ve ebeveyn erişim paneli ile tüm aktiviteler takip edilebilir.",
    icon: Shield,
    color: "#7F63CB",
    tabColor: "#7F63CB",
  },
  {
    q: "Nasıl kayıt olunur?",
    a: "Kayıt işlemi oldukça basittir. Web sitemizden veya mobil uygulamamızdan 'Hemen Başla' butonuna tıklayarak ücretsiz deneme hesabı oluşturabilirsiniz. Kayıt için yalnızca ebeveyn e-posta adresi, çocuğun adı ve yaş bilgisi yeterlidir. Kayıt sonrası hemen platforma erişim sağlanır ve ilk modüle başlayabilirsiniz.",
    icon: UserPlus,
    color: "#F5C518",
    tabColor: "#F5C518",
  },
  {
    q: "Ücretlendirme nasıl?",
    a: "Ücretsiz başlangıç paketi ile platformumuzu deneyebilirsiniz. Aylık ve yıllık abonelik seçeneklerimiz mevcuttur. Yıllık planlarda %30&apos;a varan indirimler sunulmaktadır. Kardeş indirimi, çoklu çocuk paketleri ve kurumsal fiyatlandırma seçenekleri de bulunmaktadır. Detaylı fiyat bilgisi için bizimle iletişime geçebilirsiniz.",
    icon: CreditCard,
    color: "#EE7A45",
    tabColor: "#EE7A45",
  },
  {
    q: "Canlı dersler nasıl işliyor?",
    a: "Canlı dersler, 10-12 kişilik küçük gruplar halinde uzman psikolog veya eğitimci eşliğinde gerçekleştirilir. Haftada 1-2 seans olarak planlanır ve her seans yaklaşık 45-60 dakika sürer. Canlı derslerde rol yapma, grup tartışması, senaryo çözümleme ve etkileşimli aktiviteler yapılır. Dersler kaydedilmez, böylece çocuklar rahatça katılım sağlayabilir.",
    icon: Video,
    color: "#1B3A7B",
    tabColor: "#1B3A7B",
  },
];

const parentFaqs = [
  {
    q: "Çocuğumun gelişimini nasıl takip ederim?",
    a: "Ebeveyn paneli üzerinden çocuğunuzun tüm gelişim süreci detaylı olarak takip edilebilir. Haftalık ilerleme raporları, tamamlanan modüller, kazanılan rozetler ve beceri puanı grafikleri ebeveyn panelinizde görüntülenir. Ayrıca düzenli olarak e-posta ile özet raporlar gönderilmektedir.",
    color: "#F5C518",
    bg: "#FFFBEB",
    rotate: "-1.5deg",
  },
  {
    q: "Aile olarak ne yapmalıyız?",
    a: "Platformda öğrenilen becerilerin günlük hayata aktarılması için aile katılımı çok önemlidir. Her modül sonunda aileler için önerilen ev aktiviteleri paylaşılır. Çocuğunuzla birlikte yapabileceğiniz empati oyunları, iletişim egzersizleri ve aile sözleşmeleri gibi kaynaklara erişebilirsiniz.",
    color: "#EE7A45",
    bg: "#FEF5F0",
    rotate: "2deg",
  },
  {
    q: "Rozetler ve ödüller nasıl çalışıyor?",
    a: "Rozet sistemi, çocukların motivasyonunu artırmak için tasarlanmış bir oyunlaştırma mekanizmasıdır. Her tamamlanan görev, modül veya beceri alanı için dijital rozetler kazanılır. Rozetler dijital portfolyöye eklenir ve aile ile paylaşılabilir. Rozet toplama süreci, çocuğun öz değerlendirme yapmasını ve başarı hissini deneyimlemesini sağlar.",
    color: "#7F63CB",
    bg: "#F0EDF9",
    rotate: "-1deg",
  },
  {
    q: "Hangi cihazlardan erişebiliriz?",
    a: "LearnecoHub, tüm modern cihazlardan erişilebilir. Bilgisayar, tablet ve akıllı telefonlardan web tarayıcı üzerinden kullanılabilir. iOS ve Android uygulamalarımız da mevcuttur. Tek hesapla birden fazla cihazdan giriş yapılabilir. Canlı derslere katılım için kamera ve mikrofon bulunan bir cihaz önerilmektedir.",
    color: "#1B3A7B",
    bg: "#EBF2FB",
    rotate: "1.5deg",
  },
];

const corporateFaqs = [
  {
    q: "Kurumsal programlar nasıl başlıyor?",
    a: "Kurumsal programlarımız, okulunuzun veya kurumunuzun ihtiyaçlarına özel olarak tasarlanır. İlk adım olarak ücretsiz bir keşif görüşmesi gerçekleştiriyoruz. Ardından ihtiyaç analizi yapılır, özel müfredat planı hazırlanır ve pilot uygulama başlatılır. Tüm süreç boyunca size özel bir proje yöneticisi atanmaktadır.",
    icon: Building2,
    color: "#1B3A7B",
  },
  {
    q: "Öğretmen eğitimi sağlıyor musunuz?",
    a: "Evet, kurumsal paketlerimizin tümünde öğretmen eğitimi dahildir. Platformun etkili kullanımı, müfredat entegrasyonu ve sınıf içi uygulama teknikleri konularında kapsamlı eğitimler sunuyoruz. Eğitimler hem çevrim içi hem de yüz yüze olarak düzenlenebilir. Ayrıca düzenli olarak geliştirme atölyeleri de sağlıyoruz.",
    icon: GraduationCap,
    color: "#2ECC71",
  },
  {
    q: "Raporlama sistemi nasıl çalışıyor?",
    a: "Kurumsal raporlama panelimiz, tüm öğrenci verilerini detaylı olarak analiz etmenizi sağlar. Sınıf bazında ilerleme raporları, bireysel öğrenci gelişim grafikleri, beceri alanı bazında karşılaştırmalar ve dönemsel özet raporlar sunulmaktadır. Raporlar PDF ve Excel formatında indirilebilir, veli toplantılarında kullanılabilir.",
    icon: FileText,
    color: "#7F63CB",
  },
  {
    q: "Toplu fiyatlandırma var mı?",
    a: "Evet, okullar ve kurumlar için özel toplu fiyatlandırma seçeneklerimiz mevcuttur. Öğrenci sayısına göre kademeli indirimler uygulanmaktadır. 50+ öğrenci için %25, 100+ öğrenci için %35 ve 500+ öğrenci için %50&apos;ye varan indirimler sunulmaktadır. Özel fiyat teklifi almak için bizimle iletişime geçebilirsiniz.",
    icon: Layers,
    color: "#F5C518",
  },
];

/* =================================================
   SECTION 1 -- Genel Sorular (Notebook Accordion)
   ================================================= */
function GeneralFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section>
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-[#F5C518]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-[#1B3A7B]/10 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-brand-100 text-brand-700 mb-4">
                <HelpCircle className="w-3.5 h-3.5" /> GENEL SORULAR
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              En {"ç"}ok sorulan <span className="highlight">sorular</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              LearnecoHub hakk{"ı"}nda merak etti{"ğ"}iniz her {"ş"}eyin cevab{"ı"} burada. Sorular{"ı"}n{"ı"}za yan{"ı"}t bulamad{"ı"}ysan{"ı"}z bizimle ileti{"ş"}ime ge{"ç"}ebilirsiniz.
            </p>
          </div>

          {/* Notebook-style accordion FAQ cards */}
          <div className="space-y-4">
            {generalFaqs.map((faq, i) => {
              const isOpen = openIndex === i;
              const Icon = faq.icon;
              return (
                <div key={i} className={`anim d${Math.min(i + 1, 6)} group`}>
                  <div
                    className="relative bg-white rounded-xl overflow-hidden transition-all duration-300"
                    style={{
                      boxShadow: isOpen
                        ? "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)"
                        : "0 2px 12px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)",
                    }}
                  >
                    {/* Colored tab strip at top */}
                    <div
                      className="relative h-2"
                      style={{ background: faq.tabColor }}
                    />

                    {/* Question (clickable) */}
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full text-left px-6 py-5 flex items-center gap-4 transition-colors hover:bg-slate-50/60"
                    >
                      {/* Spiral ring hole */}
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <div
                          className="w-3.5 h-3.5 rounded-full border-[2px] bg-transparent"
                          style={{ borderColor: faq.tabColor + "50" }}
                        />
                        <div
                          className="w-3.5 h-3.5 rounded-full border-[2px] bg-transparent"
                          style={{ borderColor: faq.tabColor + "30" }}
                        />
                      </div>

                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: faq.tabColor + "14" }}
                      >
                        <Icon className="w-5 h-5" style={{ color: faq.color }} />
                      </div>

                      {/* Question text */}
                      <span className="flex-1 font-display text-[0.95rem] font-bold text-slate-700 leading-snug">
                        {faq.q}
                      </span>

                      {/* Chevron */}
                      <ChevronDown
                        className="w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>

                    {/* Answer (expandable) */}
                    {isOpen && (
                      <div className="px-6 pb-6">
                        <div
                          className="relative pl-12 ml-[3.25rem]"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(transparent, transparent 27px, #e8e8e8 27px, #e8e8e8 28px)",
                            backgroundPosition: "0 4px",
                          }}
                        >
                          {/* Red margin line */}
                          <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-red-300/30 pointer-events-none" />

                          <p className="text-[0.88rem] text-slate-500 leading-[1.9] py-2">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Torn edge bottom when open */}
                    {isOpen && (
                      <div
                        className="h-2 w-full"
                        style={{
                          background: `linear-gradient(135deg, white 33.33%, transparent 33.33%) -6px 0, linear-gradient(225deg, white 33.33%, transparent 33.33%) -6px 0`,
                          backgroundSize: "12px 12px",
                          backgroundColor: faq.tabColor + "12",
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Section>
  );
}

/* =================================================
   SECTION 2 -- Ebeveynler Icin (Sticky Notes Board)
   ================================================= */
function ParentFAQ() {
  const [openParent, setOpenParent] = useState<number | null>(null);

  return (
    <Section>
      <section className="py-24 bg-[#FFFBEB] relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-16 left-[10%] w-56 h-56 bg-[#F5C518]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-[5%] w-64 h-64 bg-[#EE7A45]/10 rounded-full blur-3xl" />
        {/* Dots pattern */}
        <div className="absolute inset-0 dots-pattern opacity-[0.06]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-gold-100 text-gold-700 mb-4">
                <Users className="w-3.5 h-3.5" /> EBEVEYNLER {"İÇİ"}N
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Aileler i{"ç"}in <span className="highlight">rehber</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              {"Ç"}ocu{"ğ"}unuzun {"öğ"}renme s{"ü"}recinde ailelerin en {"ç"}ok merak etti{"ğ"}i konular ve cevaplar{"ı"}.
            </p>
          </div>

          {/* Cork board container */}
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

            <div className="relative z-10 grid sm:grid-cols-2 gap-7">
              {parentFaqs.map((faq, i) => {
                const isOpen = openParent === i;
                return (
                  <div
                    key={i}
                    className={`anim d${Math.min(i + 1, 4)} transition-all duration-300 hover:scale-[1.02] ${isOpen ? "rotate-0" : ""}`}
                    style={{ transform: isOpen ? "rotate(0deg)" : `rotate(${faq.rotate})` }}
                  >
                    <div
                      className="relative rounded-sm p-6 min-h-[200px] cursor-pointer"
                      style={{
                        background: faq.bg,
                        boxShadow: isOpen
                          ? "4px 6px 20px rgba(0,0,0,0.15), 2px 2px 6px rgba(0,0,0,0.08)"
                          : "3px 4px 12px rgba(0,0,0,0.1), 1px 1px 3px rgba(0,0,0,0.05)",
                      }}
                      onClick={() => setOpenParent(isOpen ? null : i)}
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
                          background: `linear-gradient(135deg, ${faq.bg} 50%, transparent 50%)`,
                          filter: "brightness(0.92)",
                        }}
                      />

                      {/* Question header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: faq.color + "18" }}
                        >
                          <HelpCircle className="w-4.5 h-4.5" style={{ color: faq.color }} />
                        </div>
                        <div className="flex-1 flex items-start justify-between gap-2">
                          <h4
                            className="font-display text-[0.95rem] font-extrabold leading-tight"
                            style={{ color: faq.color }}
                          >
                            {faq.q}
                          </h4>
                          <ChevronDown
                            className="w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-300"
                            style={{
                              color: faq.color,
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Answer */}
                      {isOpen ? (
                        <p className="text-[0.82rem] text-slate-600 leading-relaxed mt-2 animate-fadeIn">
                          {faq.a}
                        </p>
                      ) : (
                        <p className="text-[0.78rem] text-slate-400 leading-relaxed line-clamp-2">
                          {faq.a.substring(0, 80)}...
                        </p>
                      )}

                      {/* Click hint */}
                      {!isOpen && (
                        <span className="inline-block mt-3 text-[0.7rem] font-bold uppercase tracking-wider" style={{ color: faq.color + "90" }}>
                          Devam{"ı"}n{"ı"} oku
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* =================================================
   SECTION 3 -- Kurumlar ve Okullar Icin (Clipboard)
   ================================================= */
function CorporateFAQ() {
  const [openCorp, setOpenCorp] = useState<number | null>(null);

  return (
    <Section>
      <section className="py-24 bg-[#E8F4FD] relative overflow-hidden">
        {/* Blur blobs */}
        <div className="absolute top-20 right-[8%] w-60 h-60 bg-[#1B3A7B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[5%] w-52 h-52 bg-[#2ECC71]/10 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim">
              <span className="tag bg-brand-100 text-brand-700 mb-4">
                <Building2 className="w-3.5 h-3.5" /> KURUMLAR VE OKULLAR
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Kurumsal <span className="highlight">sorular</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              Okullar ve kurumlar i{"ç"}in {"ö"}zel {"çö"}z{"ü"}mlerimiz hakk{"ı"}nda s{"ı"}k{"ç"}a sorulan sorular.
            </p>
          </div>

          {/* Clipboard-style FAQ cards */}
          <div className="space-y-6">
            {corporateFaqs.map((faq, i) => {
              const isOpen = openCorp === i;
              const Icon = faq.icon;
              return (
                <div key={i} className={`anim d${Math.min(i + 1, 4)}`}>
                  <div className="relative bg-[#FAFAF8] rounded-2xl border border-slate-200 shadow-md overflow-visible">
                    {/* Metal clip */}
                    <div className="flex justify-center -mt-4 relative z-20">
                      <div
                        className="w-16 h-7 rounded-b-xl border-2 shadow-sm flex items-end justify-center pb-1"
                        style={{
                          background: faq.color + "90",
                          borderColor: faq.color,
                        }}
                      >
                        <div className="w-8 h-1.5 rounded-full" style={{ background: faq.color + "40" }} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-7 py-5">
                      {/* Question header */}
                      <button
                        onClick={() => setOpenCorp(isOpen ? null : i)}
                        className="w-full text-left flex items-center gap-4 group/btn"
                      >
                        {/* Icon */}
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/btn:scale-110"
                          style={{ background: faq.color + "14" }}
                        >
                          <Icon className="w-5.5 h-5.5" style={{ color: faq.color }} />
                        </div>

                        {/* Question text */}
                        <span className="flex-1 font-display text-[1rem] font-bold text-slate-700 leading-snug">
                          {faq.q}
                        </span>

                        {/* Chevron */}
                        <ChevronDown
                          className="w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                      </button>

                      {/* Answer (expandable) */}
                      {isOpen && (
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <div className="flex gap-3">
                            {/* Decorative dots column */}
                            <div className="flex flex-col items-center gap-2 pt-1 flex-shrink-0">
                              {[0, 1, 2].map((d) => (
                                <div
                                  key={d}
                                  className="w-2 h-2 rounded-full"
                                  style={{ background: faq.color + "30" }}
                                />
                              ))}
                            </div>
                            <p className="text-[0.88rem] text-slate-500 leading-[1.85]">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom accent line */}
                    <div
                      className="h-1 rounded-b-2xl"
                      style={{ background: `linear-gradient(90deg, ${faq.color}40, ${faq.color}15)` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Section>
  );
}

/* =================================================
   MAIN PAGE
   ================================================= */
export default function SSSPage() {
  return (
    <main className="overflow-hidden">
      <SubpageNavbar active="SSS" />

      <SubpageHero
        theme="gold"
        tagIcon={HelpCircle}
        tag="SSS"
        breadcrumb="SSS"
        title="Sıkça Sorulan"
        titleHighlight="Sorular"
        description="LearnecoHub hakkında merak ettiğiniz her şeyin cevabını burada bulabilirsiniz. Platformumuz, içeriklerimiz ve hizmetlerimiz hakkında detaylı bilgilere ulaşın."
      />

      <GeneralFAQ />
      <ParentFAQ />
      <CorporateFAQ />

      <FinalCTA />
      <SubpageFooter />
    </main>
  );
}
