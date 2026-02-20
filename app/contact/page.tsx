"use client";

import { useState } from "react";
import {
  Section, SubpageNavbar, SubpageHero, SubpageFooter,
} from "@/components/subpage-shared";
import {
  Mail, Phone, Clock, MessageCircle, MapPin, Heart,
  CheckCircle2, CircleCheck, ArrowRight,
} from "lucide-react";

/* ═══════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════ */
export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputCls =
    "w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-[0.88rem] font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-brand-400 focus:bg-white transition-all";
  const labelCls = "block text-[0.82rem] font-bold text-slate-600 mb-1.5";

  return (
    <main>
      {/* ─── Navbar ─── */}
      <SubpageNavbar active="İletişim" />

      {/* ─── Hero ─── */}
      <SubpageHero
        breadcrumb="İletişim"
        tag="İLETİŞİM"
        tagIcon={Mail}
        title="Bizimle iletişime"
        titleHighlight="geçin."
        description="Akademik başarıyı artıran, sosyal-duygusal becerileri güçlendiren bilimsel yöntemlerimizi paylaşmak için buradayız."
        theme="brand"
      >
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          {[
            { icon: Phone, text: "0850 302 36 00", color: "#1B3A7B", bg: "#EBF2FB" },
            { icon: Mail, text: "info@learnecohub.com", color: "#2ECC71", bg: "#ECFBF2" },
            { icon: Clock, text: "Pzt-Paz / 09:00 - 21:00", color: "#F5C518", bg: "#FFFBEB" },
          ].map((c, i) => (
            <div key={i} className="card-3d card-3d-white p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: c.bg }}>
                <c.icon className="w-4 h-4" style={{ color: c.color }} />
              </div>
              <span className="text-[0.85rem] font-semibold text-slate-700">{c.text}</span>
            </div>
          ))}
        </div>
      </SubpageHero>

      {/* ═══════════════════════════════════════
         CONTACT FORM + INFO SECTION
         ═══════════════════════════════════════ */}
      <Section>
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-20 left-[5%] w-72 h-72 bg-brand-200/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-mint-200/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* ─── Left Column: Form ─── */}
              <div>
                <div className="anim">
                  <span className="tag bg-brand-100 text-brand-700 mb-4">
                    <MessageCircle className="w-3.5 h-3.5" /> İLETİŞİM FORMU
                  </span>
                </div>
                <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-8 tracking-tight">
                  Size Nasıl{" "}
                  <span className="text-gradient">Yardımcı Olabiliriz?</span>
                </h2>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="anim d2 card-3d card-3d-white p-7 sm:p-9">
                    <div className="space-y-5">
                      {/* Ad Soyad */}
                      <div>
                        <label htmlFor="name" className={labelCls}>
                          Ad Soyad <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="Adınız ve soyadınız"
                          value={form.name}
                          onChange={handleChange}
                          className={inputCls}
                        />
                      </div>

                      {/* Telefon Numarası */}
                      <div>
                        <label htmlFor="phone" className={labelCls}>
                          Telefon Numarası
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="05XX XXX XX XX"
                          value={form.phone}
                          onChange={handleChange}
                          className={inputCls}
                        />
                      </div>

                      {/* E-posta Adresi */}
                      <div>
                        <label htmlFor="email" className={labelCls}>
                          E-posta Adresi <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="ornek@email.com"
                          value={form.email}
                          onChange={handleChange}
                          className={inputCls}
                        />
                      </div>

                      {/* İletişim Konusu */}
                      <div>
                        <label htmlFor="subject" className={labelCls}>
                          İletişim Konusu <span className="text-red-400">*</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          className={inputCls}
                        >
                          <option value="" disabled>
                            Konu seçiniz
                          </option>
                          <option value="Bireysel Kullanıcı">Bireysel Kullanıcı</option>
                          <option value="Uzman Hesabı">Uzman Hesabı</option>
                          <option value="Kurum Hesabı">Kurum Hesabı</option>
                          <option value="İş Birliği">İş Birliği</option>
                          <option value="Diğer">Diğer</option>
                        </select>
                      </div>

                      {/* Mesajınız */}
                      <div>
                        <label htmlFor="message" className={labelCls}>
                          Mesajınız <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          placeholder="Mesajınızı buraya yazabilirsiniz..."
                          value={form.message}
                          onChange={handleChange}
                          className={inputCls + " resize-none"}
                        />
                      </div>

                      {/* Submit */}
                      <button type="submit" className="btn-3d btn-3d-brand w-full justify-center">
                        Mesajı Gönder <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="anim d2 card-3d card-3d-mint p-8 text-center">
                    <CheckCircle2 className="w-14 h-14 mx-auto mb-4 text-[#2ECC71]" />
                    <h3 className="font-display text-xl font-extrabold text-slate-800 mb-2">
                      Mesajınız Alındı!
                    </h3>
                    <p className="text-[0.92rem] text-slate-600 leading-relaxed">
                      Teşekkür ederiz. En kısa zamanda sizinle iletişime geçilecektir.
                    </p>
                  </div>
                )}
              </div>

              {/* ─── Right Column: Info + Map ─── */}
              <div className="space-y-5">
                {/* Info Cards */}
                <div className="anim d1 card-3d card-3d-brand p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-brand-400" />
                    <h3 className="font-display text-lg font-extrabold text-slate-800">Merkez Ofis</h3>
                  </div>
                  <p className="text-[0.88rem] text-slate-600 font-medium pl-8">
                    İstanbul, Başakşehir
                  </p>
                </div>

                <div className="anim d2 card-3d card-3d-mint p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-mint-500" />
                    <h3 className="font-display text-lg font-extrabold text-slate-800">E-posta</h3>
                  </div>
                  <p className="text-[0.88rem] text-slate-600 font-medium pl-8">
                    info@learnecohub.com
                  </p>
                </div>

                <div className="anim d3 card-3d card-3d-gold p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-gold-500" />
                    <h3 className="font-display text-lg font-extrabold text-slate-800">Çalışma Saatleri</h3>
                  </div>
                  <p className="text-[0.88rem] text-slate-600 font-medium pl-8">
                    Pazartesi - Pazar / 09:00 - 21:00
                  </p>
                </div>

                {/* CTA Phone Button */}
                <a href="tel:08503023600" className="anim d4 btn-3d btn-3d-brand w-full justify-center">
                  <Phone className="w-4 h-4" /> 0850 302 36 00
                </a>
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* ═══════════════════════════════════════
         FOUNDER MESSAGE SECTION
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
                  <Heart className="w-3.5 h-3.5" /> KURUCUMUZDAN
                </span>
              </div>
              <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
                Kurucumuzdan{" "}
                <span className="text-gradient">Mesaj</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Left — Founder Photo */}
              <div className="anim d2">
                <div
                  className="card-3d p-0 overflow-hidden"
                  style={{
                    borderColor: "#1B3A7B30",
                    borderBottomWidth: "5px",
                    borderBottomColor: "#1B3A7B",
                  }}
                >
                  <div className="relative h-[350px] sm:h-[400px] overflow-hidden bg-[#EBF2FB]">
                    <img
                      src="/ekip/Dr.Melih Taha AYTEP.png"
                      alt="Dr. Melih Taha Aytep"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#1B3A7B]" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-extrabold text-slate-800 mb-0.5">
                      Dr. Melih Taha Aytep
                    </h3>
                    <p className="text-[0.8rem] font-bold text-[#1B3A7B]">
                      Psikiyatrist &amp; Kurucu
                    </p>
                  </div>
                </div>
              </div>

              {/* Right — Message Text */}
              <div className="anim d3 space-y-5">
                <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                  LearnecoHub&apos;ı kurarken hayalimiz; sadece bilgi aktaran değil, çocukların
                  kendini keşfettiği, duygularını tanıdığı ve hayal kurabildiği bir alan
                  oluşturmaktı. Ailelerin bu yolculuğa güvenle eşlik ettiği, kapsayıcı bir
                  öğrenme ekosistemi yaratmak istedik.
                </p>

                <p className="text-[0.95rem] text-slate-600 leading-[1.85]">
                  Bugün, 100&apos;den fazla sosyal-duygusal beceriyi geliştiren bilimsel temelli
                  dijital müfredatımızla:
                </p>

                <div className="space-y-3">
                  {[
                    "Öğrencilerin öz farkındalık, iletişim, duygu yönetimi ve empati gibi yaşamsal beceriler kazanmasını destekliyoruz.",
                    "Okullara, sınıf seviyelerine uygun, kolayca uygulanabilir hazır müfredatlar sunuyoruz.",
                    "Veliler için, evde çocuklarıyla birlikte uygulayabilecekleri pratik rehberler ve içeriklerle süreci birlikte örüyoruz.",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3"
                    >
                      <CircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#2ECC71" }} />
                      <span className="text-[0.92rem] text-slate-600 leading-[1.8]">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#EBF2FB] border-2 border-[#A8C2E3]/40 rounded-2xl p-5">
                  <p className="text-[0.92rem] text-slate-700 leading-[1.8] font-medium italic">
                    &ldquo;Her çocuğun içinde taşıdığı potansiyeli görünür kılmak için buradayız.
                    Bu yalnızca bir vizyon değil, her gün adım adım inşa ettiğimiz bir öğrenme
                    yolculuğu.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* ─── Footer ─── */}
      <SubpageFooter />
    </main>
  );
}
