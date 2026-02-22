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
    a: "LearnecoHub, \u00E7ocuklar ve gen\u00E7ler i\u00E7in geli\u015Ftirilmi\u015F dijital bir sosyal-duygusal \u00F6\u011Frenme platformudur. Bilimsel y\u00F6ntemlerle haz\u0131rlanm\u0131\u015F m\u00FCfredat\u0131m\u0131z; empati, ileti\u015Fim, \u00F6zg\u00FCven, liderlik ve stres y\u00F6netimi gibi temel ya\u015Fam becerilerini \u00E7ocuklara e\u011Flenceli bir \u015Fekilde kazand\u0131r\u0131r. Animasyonlu videolar, etkile\u015Fimli oyunlar, dijital rozetler ve canl\u0131 grup seanslar\u0131 ile \u00F6\u011Frenme deneyimini zenginle\u015Ftiriyoruz.",
    icon: BookOpen,
    color: "#1B3A7B",
    tabColor: "#1B3A7B",
  },
  {
    q: "Hangi ya\u015F gruplar\u0131na hitap ediyor?",
    a: "Platformumuz 6-17 ya\u015F aral\u0131\u011F\u0131ndaki \u00E7ocuk ve gen\u00E7lere y\u00F6nelik i\u00E7erikler sunmaktad\u0131r. \u0130\u00E7erikler ya\u015F grubuna uygun olarak \u00FC\u00E7 farkl\u0131 seviyede haz\u0131rlanm\u0131\u015Ft\u0131r: 6-9 ya\u015F (ke\u015Fif d\u00F6nemi), 10-13 ya\u015F (geli\u015Fim d\u00F6nemi) ve 14-17 ya\u015F (gen\u00E7lik d\u00F6nemi). Her ya\u015F grubuna \u00F6zel senaryolar, aktiviteler ve etkile\u015Fim y\u00F6ntemleri kullan\u0131lmaktad\u0131r.",
    icon: Users,
    color: "#2ECC71",
    tabColor: "#2ECC71",
  },
  {
    q: "Platform g\u00FCvenli mi?",
    a: "Evet, \u00E7ocuk g\u00FCvenli\u011Fi bizim en \u00F6ncelikli konumuzdur. T\u00FCm i\u00E7erikler uzman psikologlar ve e\u011Fitimciler taraf\u0131ndan denetlenmektedir. KVKK uyumlu veri koruma politikalar\u0131 uygulan\u0131r, \u00E7ocuklar\u0131n ki\u015Fisel verileri en y\u00FCksek g\u00FCvenlik standartlar\u0131yla korunur. Canl\u0131 oturumlarda her zaman uzman bir e\u011Fitimci bulunur ve ebeveyn eri\u015Fim paneli ile t\u00FCm aktiviteler takip edilebilir.",
    icon: Shield,
    color: "#7F63CB",
    tabColor: "#7F63CB",
  },
  {
    q: "Nas\u0131l kay\u0131t olunur?",
    a: "Kay\u0131t i\u015Flemi olduk\u00E7a basittir. Web sitemizden veya mobil uygulamamızdan 'Hemen Ba\u015Fla' butonuna t\u0131klayarak \u00FCcretsiz deneme hesab\u0131 olu\u015Fturabilirsiniz. Kay\u0131t i\u00E7in yaln\u0131zca ebeveyn e-posta adresi, \u00E7ocu\u011Fun ad\u0131 ve ya\u015F bilgisi yeterlidir. Kay\u0131t sonras\u0131 hemen platforma eri\u015Fim sa\u011Flan\u0131r ve ilk mod\u00FCle ba\u015Flayabilirsiniz.",
    icon: UserPlus,
    color: "#F5C518",
    tabColor: "#F5C518",
  },
  {
    q: "\u00DCcretlendirme nas\u0131l?",
    a: "\u00DCcretsiz ba\u015Flang\u0131\u00E7 paketi ile platformumuzu deneyebilirsiniz. Ayl\u0131k ve y\u0131ll\u0131k abonelik se\u00E7eneklerimiz mevcuttur. Y\u0131ll\u0131k planlarda %30&apos;a varan indirimler sunulmaktad\u0131r. Karde\u015F indirimi, \u00E7oklu \u00E7ocuk paketleri ve kurumsal fiyatland\u0131rma se\u00E7enekleri de bulunmaktad\u0131r. Detayl\u0131 fiyat bilgisi i\u00E7in bizimle ileti\u015Fime ge\u00E7ebilirsiniz.",
    icon: CreditCard,
    color: "#EE7A45",
    tabColor: "#EE7A45",
  },
  {
    q: "Canl\u0131 dersler nas\u0131l i\u015Fliyor?",
    a: "Canl\u0131 dersler, 10-12 ki\u015Filik k\u00FC\u00E7\u00FCk gruplar halinde uzman psikolog veya e\u011Fitimci e\u015Fli\u011Finde ger\u00E7ekle\u015Ftirilir. Haftada 1-2 seans olarak planlan\u0131r ve her seans yakla\u015F\u0131k 45-60 dakika s\u00FCrer. Canl\u0131 derslerde rol yapma, grup tart\u0131\u015Fmas\u0131, senaryo \u00E7\u00F6z\u00FCmleme ve etkile\u015Fimli aktiviteler yap\u0131l\u0131r. Dersler kaydedilmez, b\u00F6ylece \u00E7ocuklar rahat\u00E7a kat\u0131l\u0131m sa\u011Flayabilir.",
    icon: Video,
    color: "#1B3A7B",
    tabColor: "#1B3A7B",
  },
];

const parentFaqs = [
  {
    q: "\u00C7ocu\u011Fumun geli\u015Fimini nas\u0131l takip ederim?",
    a: "Ebeveyn paneli \u00FCzerinden \u00E7ocu\u011Funuzun t\u00FCm geli\u015Fim s\u00FCreci detayl\u0131 olarak takip edilebilir. Haftal\u0131k ilerleme raporlar\u0131, tamamlanan mod\u00FCller, kazan\u0131lan rozetler ve beceri puan\u0131 grafikleri ebeveyn panelinizde g\u00F6r\u00FCnt\u00FClenir. Ayr\u0131ca d\u00FCzenli olarak e-posta ile \u00F6zet raporlar g\u00F6nderilmektedir.",
    color: "#F5C518",
    bg: "#FFFBEB",
    rotate: "-1.5deg",
  },
  {
    q: "Aile olarak ne yapmal\u0131y\u0131z?",
    a: "Platformda \u00F6\u011Frenilen becerilerin g\u00FCnl\u00FCk hayata aktar\u0131lmas\u0131 i\u00E7in aile kat\u0131l\u0131m\u0131 \u00E7ok \u00F6nemlidir. Her mod\u00FCl sonunda aileler i\u00E7in \u00F6nerilen ev aktiviteleri payla\u015F\u0131l\u0131r. \u00C7ocu\u011Funuzla birlikte yapabilece\u011Finiz empati oyunlar\u0131, ileti\u015Fim egzersizleri ve aile s\u00F6zle\u015Fmeleri gibi kaynaklara eri\u015Febilirsiniz.",
    color: "#EE7A45",
    bg: "#FEF5F0",
    rotate: "2deg",
  },
  {
    q: "Rozetler ve \u00F6d\u00FCller nas\u0131l \u00E7al\u0131\u015F\u0131yor?",
    a: "Rozet sistemi, \u00E7ocuklar\u0131n motivasyonunu art\u0131rmak i\u00E7in tasarlanm\u0131\u015F bir oyunla\u015Ft\u0131rma mekanizmas\u0131d\u0131r. Her tamamlanan g\u00F6rev, mod\u00FCl veya beceri alan\u0131 i\u00E7in dijital rozetler kazan\u0131l\u0131r. Rozetler dijital portfoly\u00F6ye eklenir ve aile ile payla\u015F\u0131labilir. Rozet toplama s\u00FCreci, \u00E7ocu\u011Fun \u00F6z de\u011Ferlendirme yapmas\u0131n\u0131 ve ba\u015Far\u0131 hissini deneyimlemesini sa\u011Flar.",
    color: "#7F63CB",
    bg: "#F0EDF9",
    rotate: "-1deg",
  },
  {
    q: "Hangi cihazlardan eri\u015Febiliriz?",
    a: "LearnecoHub, t\u00FCm modern cihazlardan eri\u015Filebilir. Bilgisayar, tablet ve ak\u0131ll\u0131 telefonlardan web taray\u0131c\u0131 \u00FCzerinden kullan\u0131labilir. iOS ve Android uygulamalar\u0131m\u0131z da mevcuttur. Tek hesapla birden fazla cihazdan giri\u015F yap\u0131labilir. Canl\u0131 derslere kat\u0131l\u0131m i\u00E7in kamera ve mikrofon bulunan bir cihaz \u00F6nerilmektedir.",
    color: "#1B3A7B",
    bg: "#EBF2FB",
    rotate: "1.5deg",
  },
];

const corporateFaqs = [
  {
    q: "Kurumsal programlar nas\u0131l ba\u015Fl\u0131yor?",
    a: "Kurumsal programlar\u0131m\u0131z, okulunuzun veya kurumunuzun ihtiya\u00E7lar\u0131na \u00F6zel olarak tasarlan\u0131r. \u0130lk ad\u0131m olarak \u00FCcretsiz bir ke\u015Fif g\u00F6r\u00FC\u015Fmesi ger\u00E7ekle\u015Ftiriyoruz. Ard\u0131ndan ihtiya\u00E7 analizi yap\u0131l\u0131r, \u00F6zel m\u00FCfredat plan\u0131 haz\u0131rlan\u0131r ve pilot uygulama ba\u015Flat\u0131l\u0131r. T\u00FCm s\u00FCre\u00E7 boyunca size \u00F6zel bir proje y\u00F6neticisi atanmaktad\u0131r.",
    icon: Building2,
    color: "#1B3A7B",
  },
  {
    q: "\u00D6\u011Fretmen e\u011Fitimi sa\u011Fl\u0131yor musunuz?",
    a: "Evet, kurumsal paketlerimizin t\u00FCm\u00FCnde \u00F6\u011Fretmen e\u011Fitimi dahildir. Platformun etkili kullan\u0131m\u0131, m\u00FCfredat entegrasyonu ve s\u0131n\u0131f i\u00E7i uygulama teknikleri konular\u0131nda kapsaml\u0131 e\u011Fitimler sunuyoruz. E\u011Fitimler hem \u00E7evrim i\u00E7i hem de y\u00FCz y\u00FCze olarak d\u00FCzenlenebilir. Ayr\u0131ca d\u00FCzenli olarak geli\u015Ftirme at\u00F6lyeleri de sa\u011Fl\u0131yoruz.",
    icon: GraduationCap,
    color: "#2ECC71",
  },
  {
    q: "Raporlama sistemi nas\u0131l \u00E7al\u0131\u015F\u0131yor?",
    a: "Kurumsal raporlama panelimiz, t\u00FCm \u00F6\u011Frenci verilerini detayl\u0131 olarak analiz etmenizi sa\u011Flar. S\u0131n\u0131f baz\u0131nda ilerleme raporlar\u0131, bireysel \u00F6\u011Frenci geli\u015Fim grafikleri, beceri alan\u0131 baz\u0131nda kar\u015F\u0131la\u015Ft\u0131rmalar ve d\u00F6nemsel \u00F6zet raporlar sunulmaktad\u0131r. Raporlar PDF ve Excel format\u0131nda indirilebilir, veli toplant\u0131lar\u0131nda kullan\u0131labilir.",
    icon: FileText,
    color: "#7F63CB",
  },
  {
    q: "Toplu fiyatland\u0131rma var m\u0131?",
    a: "Evet, okullar ve kurumlar i\u00E7in \u00F6zel toplu fiyatland\u0131rma se\u00E7eneklerimiz mevcuttur. \u00D6\u011Frenci say\u0131s\u0131na g\u00F6re kademeli indirimler uygulanmaktad\u0131r. 50+ \u00F6\u011Frenci i\u00E7in %25, 100+ \u00F6\u011Frenci i\u00E7in %35 ve 500+ \u00F6\u011Frenci i\u00E7in %50&apos;ye varan indirimler sunulmaktad\u0131r. \u00D6zel fiyat teklifi almak i\u00E7in bizimle ileti\u015Fime ge\u00E7ebilirsiniz.",
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
              En {"\u00E7"}ok sorulan <span className="highlight">sorular</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              LearnecoHub hakk{"\u0131"}nda merak etti{"\u011F"}iniz her {"\u015F"}eyin cevab{"\u0131"} burada. Sorular{"\u0131"}n{"\u0131"}za yan{"\u0131"}t bulamad{"\u0131"}ysan{"\u0131"}z bizimle ileti{"\u015F"}ime ge{"\u00E7"}ebilirsiniz.
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
                <Users className="w-3.5 h-3.5" /> EBEVEYNLER {"\u0130\u00C7\u0130"}N
              </span>
            </div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              Aileler i{"\u00E7"}in <span className="highlight">rehber</span>
            </h2>
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">
              {"\u00C7"}ocu{"\u011F"}unuzun {"\u00F6\u011F"}renme s{"\u00FC"}recinde ailelerin en {"\u00E7"}ok merak etti{"\u011F"}i konular ve cevaplar{"\u0131"}.
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
                          Devam{"\u0131"}n{"\u0131"} oku
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
              Okullar ve kurumlar i{"\u00E7"}in {"\u00F6"}zel {"\u00E7\u00F6"}z{"\u00FC"}mlerimiz hakk{"\u0131"}nda s{"\u0131"}k{"\u00E7"}a sorulan sorular.
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
        title="S\u0131k\u00E7a Sorulan"
        titleHighlight="Sorular"
        description="LearnecoHub hakk\u0131nda merak etti\u011Finiz her \u015Feyin cevab\u0131n\u0131 burada bulabilirsiniz. Platformumuz, i\u00E7eriklerimiz ve hizmetlerimiz hakk\u0131nda detayl\u0131 bilgilere ula\u015F\u0131n."
      />

      <GeneralFAQ />
      <ParentFAQ />
      <CorporateFAQ />

      <FinalCTA />
      <SubpageFooter />
    </main>
  );
}
