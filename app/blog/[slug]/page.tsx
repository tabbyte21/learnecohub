"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Section,
  SubpageNavbar,
  FinalCTA,
  SubpageFooter,
  useAnim,
} from "@/components/subpage-shared";
import {
  ArrowRight,
  Clock,
  User,
  Tag,
  Calendar,
  ChevronRight,
  Play,
  Video,
  CheckCircle2,
  BookOpen,
  Quote,
} from "lucide-react";

/* ─── Types ─── */
interface BlogPostDetail {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  accentColor: string;
  coverColor: string;
  categoryColor: string;
  categoryBg: string;
  content: string;
}

/* ─── Blog Data ─── */
const blogPosts: BlogPostDetail[] = [
  {
    id: 1,
    slug: "cocuklarda-empati-gelistirmenin-7-etkili-yolu",
    title: "Çocuklarda Empati Geliştirmenin 7 Etkili Yolu",
    excerpt:
      "Empati, çocukların sosyal ilişkilerinin temelini oluşturur. Araştırmalar, empati becerisinin erken yaşlarda desteklenmesiyle çocukların daha sağlıklı ilişkiler kurduğunu göstermektedir. İşte bilimsel temelli 7 etkili strateji...",
    category: "Sosyal-Duygusal Öğrenme",
    date: "15 Şubat 2025",
    readTime: "8 dk",
    author: "Dr. Melih Taha Aytep",
    accentColor: "#1B3A7B",
    coverColor: "#1B3A7B",
    categoryColor: "#2ECC71",
    categoryBg: "#ECFBF2",
    content: `Empati, bir başkasının duygularını anlama ve paylaşma yeteneğidir. Çocukluk döneminde empati becerisinin geliştirilmesi, sağlıklı sosyal ilişkilerin temelini oluşturur ve çocuğun ileriki yaşamında başarılı bir birey olmasına büyük katkı sağlar.

Araştırmalar, empati becerisinin doğuştan gelen bir özellik olmadığını, aksine öğrenilebilir ve geliştirilebilir bir beceri olduğunu ortaya koymaktadır. Ebeveynlerin ve eğitimcilerin doğru yaklaşımlarla çocukların empati kapasitesini önemli ölçüde artırabilecekleri bilimsel olarak kanıtlanmıştır.

## 1. Duyguları Tanımlama ve İsimlendirme

Çocukların empati geliştirebilmesi için önce kendi duygularını tanımaları gerekir. Günlük yaşamda "Şu an üzgün hissediyorsun, değil mi?" gibi ifadeler kullanarak çocukların duygusal farkındalığını artırabilirsiniz. Bu yaklaşım, çocukların hem kendi hem de başkalarının duygusal durumlarını daha iyi anlamalarına yardımcı olur.

Duygusal kelime dağarcığını genişletmek, çocukların iç dünyalarını daha net ifade etmelerini sağlar. "Mutlu" yerine "heyecanlı", "gururlu" veya "rahatlamış" gibi daha spesifik duygu kelimeleri öğretmek bu süreci destekler.

## 2. Aktif Dinleme Pratiği

Çocuklara aktif dinlemenin temel unsurlarını öğretmek, empati gelişiminin en kritik adımlarından biridir. Göz teması kurma, beden diliyle ilgi gösterme ve karşıdakinin sözünü kesmeden dinleme gibi beceriler, empati için gerekli altyapıyı oluşturur.

Aile içinde "dinleme zamanları" oluşturarak, her aile üyesinin sırayla günlerini anlatmasını ve diğerlerinin dikkatle dinlemesini teşvik edebilirsiniz. Bu uygulama, çocukların başkalarının deneyimlerine odaklanma becerisini güçlendirir.

> Empati, başkalarının ayakkabılarıyla yürüme değil, onların ayaklarının acısını hissedebilme sanatıdır. — Dr. Brene Brown

## 3. Hikaye ve Kitap Okuma

Hikayeler, çocukların farklı karakterlerin bakış açılarını anlamaları için eşsiz bir fırsat sunar. Okuma sonrasında "Bu karakter ne hissetmiş olabilir?" veya "Sen onun yerinde olsaydın ne yapardın?" gibi sorular sorarak empati pratiği yapılabilir.

Araştırmalar, düzenli kitap okunan çocukların empati düzeylerinin akranlarına göre %40 daha yüksek olduğunu göstermektedir.

## 4. Rol Yapma Oyunları

Rol yapma etkinlikleri, çocukların farklı perspektiflerden dünyayı deneyimlemelerini sağlar. Evde veya sınıfta yapılacak basit drama etkinlikleri, çocukların başkalarının duygularını anlamalarına doğrudan katkı sağlar.

- Farklı meslekleri canlandırma ile toplumsal farkındalık kazanma
- Arkadaşlık senaryoları üzerinden çatışma çözme becerisi geliştirme
- Aile rollerini değiştirerek farklı bakış açıları deneyimleme
- Hayali durumlar yaratarak problem çözme yeteneğini güçlendirme
- Grup oyunları ile iş birliği ve takım çalışması pratiği yapma

## 5. Model Olma

Çocuklar, çevrelerindeki yetişkinleri gözlemleyerek öğrenir. Ebeveynlerin ve öğretmenlerin empatik davranışları modellemesi, çocukların bu becerileri doğal olarak edinmesini sağlar. Günlük hayatta başkalarının duygularına karşı gösterilen duyarlılık, çocuklar için en güçlü empati dersidir.

## 6. Sosyal Projeler ve Gönüllülük

Toplum hizmeti projeleri ve gönüllü çalışmalar, çocukların farklı yaşam koşullarını tanımalarını sağlar. Yardıma ihtiyacı olan insanlara destek olma deneyimi, empati duygusunu somut bir şekilde pekiştirir. Küçük yaştan itibaren çocukların toplumsal sorumluluk projelerine katılması teşvik edilmelidir.

## 7. Dijital Empati Eğitimi

Günümüz çocukları dijital ortamda da empati becerisine ihtiyaç duyar. LearnecoHub gibi platformlar, interaktif senaryolar ve oyunlaştırılmış aktiviteler aracılığıyla çocukların dijital empati becerilerini geliştirmelerine yardımcı olur. Online iletişimde de başkalarının duygularını gözetme alışkanlığı kazandırmak büyük önem taşır.`,
  },
  {
    id: 2,
    slug: "dijital-cagda-sosyal-beceriler-ekran-suresi-ve-cocuk-gelisimi",
    title:
      "Dijital Çağda Sosyal Beceriler: Ekran Süresi ve Çocuk Gelişimi",
    excerpt:
      "Teknolojinin hayatımızın her alanına nüfuz ettiği bu dönemde, çocukların dijital dünya ile sağlıklı bir ilişki kurması büyük önem taşıyor. Ekran süresinin sosyal beceriler üzerindeki etkisini inceliyoruz...",
    category: "Araştırmalar",
    date: "8 Şubat 2025",
    readTime: "12 dk",
    author: "Dr. Kaan Mert Güven",
    accentColor: "#2ECC71",
    coverColor: "#16794A",
    categoryColor: "#F5C518",
    categoryBg: "#FFFBEB",
    content: `Dijital teknolojiler, çocukların günlük yaşamının ayrılmaz bir parçası haline gelmiştir. Ancak aşırı ekran süresi, sosyal beceri gelişimini olumsuz etkileyebilmektedir. Bu yazıda, dengeyi nasıl kurabileceğinizi bilimsel veriler ışığında ele alıyoruz.

Son yıllarda yapılan araştırmalar, ekran süresinin çocukların yüz yüze iletişim becerilerine olan etkisini net bir şekilde ortaya koymaktadır. Ancak teknoloji doğru kullanıldığında, sosyal beceri gelişimine katkı da sağlayabilir.

## Ekran Süresinin Sosyal Beceriler Üzerindeki Etkisi

Amerikan Pediatri Akademisi'nin önerilerine göre, 2-5 yaş arası çocuklar günde en fazla 1 saat kaliteli ekran içeriğine maruz kalmalıdır. Bu sürenin aşılması durumunda, çocuklarda empati gelişimi, duygu tanıma ve sosyal etkileşim becerilerinde gerileme gözlemlenebilmektedir.

Araştırmalar, günde 3 saatten fazla ekran başında zaman geçiren çocukların, akranlarıyla sosyal etkileşimde %30 daha fazla zorluk yaşadığını göstermektedir.

## Dijital Okuryazarlık ve Sosyal Beceriler

Dijital okuryazarlık sadece teknik bir beceri değil, aynı zamanda sosyal bir beceridir. Çocukların online ortamda saygılı iletişim kurma, dijital ayak izlerinin farkında olma ve siber zorbalıkla başa çıkma gibi becerileri edinmesi büyük önem taşır.

> Teknolojiyi çocuklardan uzak tutmak değil, onlara teknolojiyi doğru kullanmayı öğretmek asıl hedefimiz olmalıdır. — CASEL Araştırma Raporu, 2024

## Dengeli Bir Yaklaşım İçin Öneriler

Ebeveynler ve eğitimciler için dijital denge kurma stratejileri kritik bir öneme sahiptir. Teknolojisiz aile zamanları, açık hava etkinlikleri ve yüz yüze sosyal aktiviteler ile ekran süresi arasında sağlıklı bir denge oluşturulabilir.

- Günlük ekran süresi sınırları belirleme ve tutarlı uygulama
- Eğitici ve interaktif dijital içerikleri tercih etme
- Aile olarak teknolojisiz aktivite saatleri planlama
- Çocuğun dijital deneyimlerini takip etme ve birlikte değerlendirme
- LearnecoHub gibi sosyal beceri platformlarını aktif kullanma

## Sonuç

Dijital çağda sosyal beceri gelişiminin korunması ve desteklenmesi, bilinçli ve planlı bir yaklaşım gerektirir. Ebeveynlerin ve eğitimcilerin teknolojiyi bir düşman olarak görmek yerine, onu bir araç olarak doğru konumlandırması en sağlıklı yaklaşımdır.`,
  },
  {
    id: 3,
    slug: "ogretmenler-icin-sinif-ici-sel-etkinlikleri-rehberi",
    title:
      "Öğretmenler İçin Sınıf İçi SEL Etkinlikleri Rehberi",
    excerpt:
      "Sosyal-duygusal öğrenme etkinliklerini sınıf ortamına entegre etmek, öğrencilerin hem akademik hem de kişisel gelişimlerini destekler. Hazırlık gerektirmeyen, uygulaması kolay 15 etkinlik önerisi...",
    category: "Eğitimci Köşesi",
    date: "1 Şubat 2025",
    readTime: "10 dk",
    author: "Kübra Demirci",
    accentColor: "#7F63CB",
    coverColor: "#5B41A8",
    categoryColor: "#EE7A45",
    categoryBg: "#FEF5F0",
    content: `Sosyal-duygusal öğrenme (SEL) etkinlikleri, öğrencilerin akademik başarısını ve kişisel gelişimini doğrudan destekleyen güçlü araçlardır. Bu rehberde, sınıf ortamında kolayca uygulanabilecek pratik etkinlikleri paylaşıyoruz.

Araştırmalar, SEL programlarının uygulandığı sınıflarda akademik başarının %11 oranında arttığını ve davranış problemlerinin %25 azaldığını göstermektedir. İşte sınıfınızda hemen uygulayabileceğiniz etkili stratejiler.

## Günlük Duygu Kontrolü

Her gün dersin başında öğrencilerin duygusal durumlarını paylaşmaları için kısa bir zaman ayırın. "Duygu termometresi" veya "ruh hali panosu" gibi görsel araçlar kullanarak, öğrencilerin kendilerini ifade etmelerini kolaylaştırabilirsiniz.

Bu basit ama etkili uygulama, sınıf içi iklimi olumlu yönde dönüştürür ve öğrencilerin birbirlerinin duygusal durumlarına duyarlılık geliştirmelerini sağlar.

## Empati Çemberleri

Haftada en az bir kez "empati çemberi" düzenleyerek öğrencilerin belirli bir konuda duygularını ve düşüncelerini paylaşmalarını teşvik edin. Bu etkinlik, aktif dinleme ve perspektif alma becerilerini güçlendirir.

> Bir öğretmenin en büyük gücü, sınıfında güvenli bir duygusal alan yaratabilme yeteneğidir. — John Hattie

## Grup Çalışmaları ve İş Birliği

İş birliğine dayalı öğrenme etkinlikleri, öğrencilerin sosyal becerilerini doğal bir ortamda pratik yapmalarını sağlar. Farklı rollerin atandığı grup projeleri, liderlik, uzlaşma ve iletişim becerilerini destekler.

- Sınıf başlangıç ritüelleri ile güvenli ortam oluşturma
- "Problem çözme köşesi" ile çatışma yönetimi pratiği
- Eşli okuma ve karşılıklı öğretim etkinlikleri
- Takdir ve minnettarlık günlükleri tutturma
- Bireysel güç alanlarını keşfetme projeleri

## Teknoloji Destekli SEL

LearnecoHub gibi dijital platformlar, sınıf içi SEL etkinliklerini zenginleştirebilir. İnteraktif senaryolar, video dersler ve oyunlaştırılmış aktiviteler, öğrencilerin sosyal becerileri eğlenerek öğrenmelerini sağlar.`,
  },
  {
    id: 4,
    slug: "casel-cercevesi-nedir-sosyal-duygusal-ogrenme-standartlari",
    title:
      "CASEL Çerçevesi Nedir? Sosyal-Duygusal Öğrenme Standartları",
    excerpt:
      "CASEL (Collaborative for Academic, Social, and Emotional Learning), sosyal-duygusal öğrenmenin dünya genelinde kabul görmüş çerçevesini sunar. Beş temel yetkinlik alanını ve uygulama önerilerini detaylıca ele alıyoruz...",
    category: "Araştırmalar",
    date: "25 Ocak 2025",
    readTime: "15 dk",
    author: "Buse Aksoy",
    accentColor: "#F5C518",
    coverColor: "#8B6E00",
    categoryColor: "#F5C518",
    categoryBg: "#FFFBEB",
    content: `CASEL (Collaborative for Academic, Social, and Emotional Learning), sosyal-duygusal öğrenme alanının en kapsamlı ve bilimsel temelli çerçevesini sunan uluslararası kuruluştur. Bu yazıda, CASEL çerçevesinin beş temel yetkinlik alanını detaylı olarak ele alıyoruz.

Dünya genelinde 100'den fazla ülkede uygulanan CASEL çerçevesi, milyonlarca öğrenci ve eğitimcinin sosyal-duygusal beceri gelişimini desteklemektedir. LearnecoHub olarak, müfredatımızı bu uluslararası standartlara uygun şekilde tasarlıyoruz.

## Öz Farkındalık (Self-Awareness)

Öz farkındalık, kişinin kendi duygularını, düşüncelerini ve değerlerini tanıması ve bunların davranışları üzerindeki etkisini anlamasıdır. Bu yetkinlik alanı, tüm sosyal-duygusal becerilerin temelini oluşturur.

Çocukların güçlü yönlerini keşfetmeleri, sınırlarını tanımaları ve öz güven geliştirmeleri bu alanın kapsamına girer.

## Öz Yönetim (Self-Management)

Stres yönetimi, dürtü kontrolü, motivasyon ve hedef belirleme gibi becerileri kapsayan öz yönetim, çocukların akademik ve kişisel yaşamlarında başarılı olmaları için kritik bir yetkinlik alanıdır.

> Sosyal-duygusal öğrenme, akademik başarı ile kişisel gelişim arasındaki köprüdür. — CASEL Kurucu Raporu, 2023

## Sosyal Farkındalık (Social Awareness)

Farklı bakış açılarını anlama, empati kurma ve çeşitliliğe saygı gösterme gibi becerileri içerir. Bu yetkinlik alanı, çocukların toplumsal sorumluluk bilinci geliştirmelerini destekler.

- Öz farkındalık ile duygu ve düşünceleri tanıma
- Öz yönetim ile stres ve hedefleri yönetme
- Sosyal farkındalık ile empati ve çeşitlilik anlayışı
- İlişki becerileri ile sağlıklı iletişim kurma
- Sorumlu karar verme ile etik ve güvenli tercihler yapma

## İlişki Becerileri ve Sorumlu Karar Verme

CASEL çerçevesinin son iki yetkinlik alanı, çocukların sağlıklı ilişkiler kurmasını ve etik, güvenli, sorumlu kararlar almasını destekler. Bu beceriler, çocukların hem okul hem de toplum yaşamında aktif ve yapıcı bireyler olmasını sağlar.`,
  },
  {
    id: 5,
    slug: "ebeveynler-icin-duygu-koclugu-adim-adim-kilavuz",
    title:
      "Ebeveynler İçin Duygu Koçluğu: Adım Adım Kılavuz",
    excerpt:
      "Duygu koçluğu, ebeveynlerin çocuklarının duygusal dünyasını anlamalarına ve onlara rehberlik etmelerine yardımcı olan güçlü bir yaklaşımdır. John Gottman'ın araştırmalarına dayanan bu kılavuzla...",
    category: "Ebeveyn Rehberi",
    date: "18 Ocak 2025",
    readTime: "9 dk",
    author: "Dr. Melih Taha Aytep",
    accentColor: "#EE7A45",
    coverColor: "#D4602C",
    categoryColor: "#7F63CB",
    categoryBg: "#F0EDF9",
    content: `Duygu koçluğu, psikolog John Gottman tarafından geliştirilen ve ebeveynlerin çocuklarının duygusal gelişimini desteklemelerine yardımcı olan bilimsel bir yaklaşımdır. Bu kılavuzda, duygu koçluğunun temel ilkelerini ve pratik uygulamalarını adım adım ele alıyoruz.

Araştırmalar, duygu koçluğu uygulayan ebeveynlerin çocuklarının daha yüksek duygusal zekaya, daha güçlü sosyal becerilere ve daha iyi akademik performansa sahip olduğunu göstermektedir.

## Adım 1: Duyguyu Fark Edin

Çocuğunuzun duygusal sinyallerini erken aşamada fark etmek, duygu koçluğunun ilk ve en kritik adımıdır. Beden dili, ses tonu ve davranış değişiklikleri, çocuğunuzun iç dünyası hakkında önemli ipuçları verir.

Günlük rutinde, çocuğunuzun duygusal durumunu gözlemlemek için bilinçli anlar yaratın. Okul dönüşü, yemek saati veya yatmadan önce gibi geçiş dönemleri, duygusal bağlantı için ideal zamanlardır.

## Adım 2: Duyguyu Bir Fırsat Olarak Görün

Özellikle olumsuz duygular, çocuğunuzla yakınlaşma ve öğretme fırsatı olarak değerlendirilmelidir. Kızgınlık, üzüntü veya korku gibi duygular, çocuğunuzun duygusal dünyasını anlamanız için açılan pencerelerdir.

> Çocuğunuz en zor duygularını yaşarken yanında olabilmek, bir ebeveynin verebileceği en değerli hediyedir. — John Gottman

## Adım 3: Empati ile Dinleyin ve Onaylayın

Çocuğunuzun duygularını yargılamadan dinleyin ve onaylayın. "Anlıyorum, bu durum seni gerçekten üzmüş" gibi ifadeler, çocuğunuzun duygusal deneyiminin normal ve kabul edilebilir olduğunu hissetmesini sağlar.

- Çocuğun duygusal sinyallerini erken aşamada fark etme
- Her duyguyu bir öğrenme fırsatına dönüştürme
- Empatik dinleme ve duyguları onaylama pratiği
- Duyguları isimlendirme ve kelimelerle ifade etme
- Birlikte çözüm üretme ve sınır koyma dengesi

## Adım 4: Birlikte Çözüm Üretin

Duygusal bağlantı kurulduktan sonra, çocuğunuzla birlikte sorunun çözümü için fikirler üretin. Bu süreçte çocuğunuzun aktif katılımını sağlamak, onun problem çözme ve öz yönetim becerilerini güçlendirir.`,
  },
  {
    id: 6,
    slug: "2025te-egitim-teknolojilerinde-yeni-trendler",
    title: "2025'te Eğitim Teknolojilerinde Yeni Trendler",
    excerpt:
      "Yapay zeka destekli kişiselleştirilmiş öğrenme, artırılmış gerçeklik uygulamaları ve oyunlaştırma stratejileri... 2025 yılında eğitim teknolojilerinde öne çıkan trendleri ve LearnecoHub'ın bu dönüşümdeki rolünü keşfedin...",
    category: "Haberler",
    date: "10 Ocak 2025",
    readTime: "7 dk",
    author: "Sayid Özcan",
    accentColor: "#1B3A7B",
    coverColor: "#1B3A7B",
    categoryColor: "#1B3A7B",
    categoryBg: "#EBF2FB",
    content: `2025 yılı, eğitim teknolojileri alanında devrim niteliğinde gelişmelere sahne oluyor. Yapay zeka destekli kişiselleştirilmiş öğrenme, artırılmış gerçeklik uygulamaları ve oyunlaştırma stratejileri, eğitimde yeni bir dönemin kapılarını aralıyor.

LearnecoHub olarak, bu dönüşümün öncü aktörlerinden biri olma vizyonuyla çalışıyoruz. Sosyal-duygusal öğrenme alanında teknoloji destekli çözümlerimizi sürekli geliştiriyoruz.

## Yapay Zeka ve Kişiselleştirilmiş Öğrenme

Yapay zeka, her öğrencinin bireysel öğrenme hızına ve stiline uygun içerik sunulmasını mümkün kılıyor. Adaptif öğrenme algoritmaları, öğrencilerin güçlü ve gelişime açık alanlarını tespit ederek kişiselleştirilmiş öğrenme yolları oluşturuyor.

LearnecoHub'ın AI destekli müfredatı, her çocuğun sosyal-duygusal beceri seviyesine göre optimize edilmiş etkinlikler sunarak maksimum öğrenme verimi sağlamaktadır.

## Oyunlaştırma (Gamification) Stratejileri

Oyunlaştırma, öğrenme motivasyonunu artırmanın en etkili yollarından biridir. Puan sistemleri, rozetler, liderlik tabloları ve interaktif senaryolar, öğrencilerin öğrenme sürecine aktif katılımını teşvik eder.

> Oyun, çocukların dünyayı anlamak için kullandığı en doğal ve güçlü araçtır. Eğitimde oyunlaştırma, bu doğal eğilimi en verimli şekilde değerlendirir. — James Paul Gee

## Artırılmış ve Sanal Gerçeklik

AR ve VR teknolojileri, sosyal beceri eğitiminde devrim niteliğinde fırsatlar sunuyor. Sanal ortamda sosyal senaryoları deneyimleme, çocukların güvenli bir ortamda empati, iletişim ve problem çözme pratiği yapmasını sağlıyor.

- Yapay zeka destekli bireyselleştirilmiş öğrenme yolları
- Oyunlaştırma ile motivasyon ve katılım artırma
- Artırılmış gerçeklik ile immersif deneyimler
- Veri analitiği ile gelişim takibi ve raporlama
- Mobil öncelikli platform tasarımı ile erişilebilirlik

## LearnecoHub'ın Rolü

LearnecoHub, bu teknolojik dönüşümü sosyal-duygusal öğrenme alanına entegre eden öncü platformlardan biridir. Bilimsel temelli müfredatımız, en son eğitim teknolojileri ile birleşerek çocuklara etkili ve eğlenceli bir öğrenme deneyimi sunmaktadır.`,
  },
];

/* ─── Content Parser ─── */
function parseContent(content: string, accentColor: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  let isFirstParagraph = true;
  let paragraphCount = 0;
  let videoInserted = false;

  while (i < lines.length) {
    const line = lines[i];

    // Heading
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="font-display text-2xl font-extrabold text-slate-800 mt-10 mb-4 pl-5 relative"
        >
          <span
            className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
            style={{ background: accentColor }}
          />
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={key++}
          className="my-8 py-5 px-6 bg-[#FFFBEB] border-l-4 rounded-r-xl italic text-slate-600 text-[0.95rem] leading-[1.9]"
          style={{ borderLeftColor: "#F5C518" }}
        >
          {line.slice(2)}
        </blockquote>
      );
      i++;
      continue;
    }

    // Bullet list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-6 space-y-3">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3">
              <CheckCircle2
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: accentColor }}
              />
              <span className="text-[0.95rem] text-slate-600 leading-[1.9]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    const pClass = isFirstParagraph
      ? "text-[1.05rem] text-slate-600 leading-[2] mb-6"
      : "text-[0.95rem] text-slate-600 leading-[1.9] mb-5";

    elements.push(
      <p key={key++} className={pClass}>
        {line}
      </p>
    );

    if (isFirstParagraph) isFirstParagraph = false;
    paragraphCount++;

    // Insert video placeholder after second paragraph
    if (paragraphCount === 2 && !videoInserted) {
      elements.push("__VIDEO_PLACEHOLDER__" as unknown as React.ReactNode);
      videoInserted = true;
    }

    i++;
  }

  return elements;
}

/* ═══════════════════════════════════════
   BLOG DETAIL PAGE
   ═══════════════════════════════════════ */
export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [videoPlaying, setVideoPlaying] = useState(false);

  const wrap = useAnim();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main>
        <SubpageNavbar active="Blog" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-extrabold text-slate-800 mb-4">
              Yazı Bulunamadı
            </h1>
            <p className="text-slate-500 mb-6">
              Aradığınız blog yazısı mevcut değil.
            </p>
            <a
              href="/blog"
              className="btn-3d btn-3d-brand !text-[0.85rem]"
            >
              <BookOpen className="w-4 h-4" /> Blog&apos;a Dön
            </a>
          </div>
        </div>
        <SubpageFooter />
      </main>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  const parsedContent = parseContent(post.content, post.accentColor);

  return (
    <main ref={wrap}>
      {/* ─── A) Navbar ─── */}
      <SubpageNavbar active="Blog" />

      {/* ─── B) Cover / Hero ─── */}
      <section
        className="relative pt-24 pb-0 overflow-hidden"
        style={{ background: post.coverColor }}
      >
        {/* Texture */}
        <div className="absolute inset-0 dots-pattern opacity-[0.06]" />

        {/* Orbs */}
        <div
          className="absolute top-[-20%] right-[5%] w-[450px] h-[450px] rounded-full blur-[120px]"
          style={{ background: post.accentColor, opacity: 0.25 }}
        />
        <div
          className="absolute bottom-[-30%] left-[-5%] w-[380px] h-[380px] rounded-full blur-[100px]"
          style={{ background: "#F5C518", opacity: 0.12 }}
        />
        <div
          className="absolute top-[40%] left-[50%] w-[280px] h-[280px] rounded-full blur-[90px]"
          style={{ background: "#2ECC71", opacity: 0.1 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-0">
          {/* Breadcrumb */}
          <div className="anim flex items-center gap-2 text-[0.78rem] font-semibold mb-6 text-white/50">
            <a href="/" className="hover:text-white/80 transition-colors">
              Ana Sayfa
            </a>
            <ChevronRight className="w-3.5 h-3.5" />
            <a href="/blog" className="hover:text-white/80 transition-colors">
              Blog
            </a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90 line-clamp-1">{post.title}</span>
          </div>

          {/* Category pill */}
          <div className="anim d1 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold uppercase tracking-wide bg-white/15 text-white backdrop-blur-sm">
              <Tag className="w-3.5 h-3.5" /> {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="anim d2 font-display text-[1.8rem] sm:text-[2.2rem] lg:text-[2.8rem] font-extrabold text-white leading-[1.1] tracking-tight mb-6 max-w-3xl">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="anim d3 flex flex-wrap items-center gap-5 mb-10 text-white/60 text-[0.82rem] font-medium">
            <span className="flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/15"
              >
                <User className="w-4 h-4 text-white" />
              </span>
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime} okuma
            </span>
          </div>

        </div>

        {/* Bottom fade line */}
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.15) 80%, transparent)" }} />
      </section>

      {/* ─── C) Article content ─── */}
      <Section>
        <section className="bg-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto px-6 pt-16 pb-16">
            {parsedContent.map((el, idx) => {
              // Insert video section at placeholder
              if (el === "__VIDEO_PLACEHOLDER__") {
                return (
                  <div key={`video-${idx}`} className="my-10">
                    {/* Video section */}
                    <div className="mb-4 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.72rem] font-bold uppercase tracking-wide bg-[#EBF2FB] text-[#1B3A7B]">
                        <Video className="w-3.5 h-3.5" /> İLGİLİ VİDEO
                      </span>
                    </div>
                    <div className="rounded-2xl overflow-hidden border-2 border-slate-100 shadow-lg">
                      {!videoPlaying ? (
                        <button
                          onClick={() => setVideoPlaying(true)}
                          className="relative w-full aspect-video group cursor-pointer"
                          aria-label="Videoyu oynat"
                          type="button"
                        >
                          <img
                            src="https://img.youtube.com/vi/GcjqT6zb1Ts/maxresdefault.jpg"
                            alt="LearnecoHub Tanıtım Videosu"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                              <Play className="w-7 h-7 sm:w-9 sm:h-9 text-[#1B3A7B] ml-1" />
                            </div>
                          </div>
                        </button>
                      ) : (
                        <div className="relative w-full aspect-video">
                          <iframe
                            src="https://www.youtube.com/embed/GcjqT6zb1Ts?autoplay=1"
                            title="LearnecoHub Tanıtım Videosu"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-[0.82rem] text-slate-400 mt-3 text-center italic">
                      LearnecoHub Tanıtım Videosu — Sosyal beceri eğitim platformumuzu yakından tanıyın.
                    </p>
                  </div>
                );
              }
              return el;
            })}

            {/* Key takeaways box */}
            <div className="mt-12 card-3d card-3d-brand p-7 sm:p-9">
              <h3 className="font-display text-xl font-extrabold text-slate-800 mb-5 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2ECC71]" />
                Önemli Noktalar
              </h3>
              <ul className="space-y-3">
                {[
                  "Sosyal-duygusal beceriler, erken yaşlarda desteklendiğinde en etkili sonuçları verir.",
                  "Ebeveynler ve eğitimciler, günlük yaşamda model olarak çocukların gelişimini destekleyebilir.",
                  "Bilimsel temelli programlar, çocukların akademik ve sosyal başarısını önemli ölçüde artırır.",
                  "Dijital araçlar, doğru kullanıldığında sosyal beceri eğitimini zenginleştirir.",
                  "Tutarlılık ve sabır, sosyal-duygusal öğrenme sürecinin en kritik bileşenleridir.",
                ].map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#2ECC71] flex-shrink-0 mt-0.5" />
                    <span className="text-[0.9rem] text-slate-600 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Section>

      {/* ─── E) Author box ─── */}
      <Section>
        <section className="bg-white pb-16">
          <div className="max-w-3xl mx-auto px-6">
            <div className="anim card-3d card-3d-white p-7 sm:p-9 flex flex-col sm:flex-row items-start gap-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: post.categoryBg }}
              >
                <User
                  className="w-7 h-7"
                  style={{ color: post.accentColor }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-extrabold text-slate-800 mb-1">
                  {post.author}
                </h3>
                <p className="text-[0.82rem] font-semibold text-slate-400 mb-3">
                  Sosyal-Duygusal Öğrenme Uzmanı
                </p>
                <p className="text-[0.88rem] text-slate-500 leading-relaxed mb-4">
                  Sosyal-duygusal öğrenme alanında uzmanlaşmış, çocuk gelişimi ve
                  eğitim psikolojisi konularında deneyimli bir eğitimcidir.
                  LearnecoHub ekibinde içerik ve müfredat geliştirme çalışmalarına
                  katkıda bulunmaktadır.
                </p>
                <a
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-[0.82rem] font-bold transition-all hover:gap-2.5"
                  style={{ color: post.accentColor }}
                >
                  Tüm Yazıları Gör
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* ─── F) Related posts ─── */}
      <Section>
        <section className="py-20 bg-[#E8F4FD] relative overflow-hidden">
          <div className="absolute top-16 right-[10%] w-60 h-60 bg-brand-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-16 left-[8%] w-56 h-56 bg-mint-200/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="anim">
                <span className="tag bg-brand-100 text-brand-700 mb-4">
                  <BookOpen className="w-3.5 h-3.5" /> İLGİLİ YAZILAR
                </span>
              </div>
              <h2 className="anim d1 font-display text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3 tracking-tight">
                Bunları da <span className="text-gradient">okuyun</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rp, i) => (
                <a
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className={`anim d${i + 1} card-3d card-3d-white p-0 overflow-hidden group block`}
                >
                  {/* Top accent bar */}
                  <div
                    className="h-1.5 w-full"
                    style={{ background: rp.accentColor }}
                  />
                  <div className="p-6">
                    {/* Category */}
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wide mb-3"
                      style={{
                        background: rp.categoryBg,
                        color: rp.categoryColor,
                      }}
                    >
                      <Tag className="w-3 h-3" />
                      {rp.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-display text-[1rem] font-extrabold text-slate-800 leading-tight mb-3 group-hover:text-[#1B3A7B] transition-colors">
                      {rp.title}
                    </h3>

                    {/* Date */}
                    <div className="flex items-center gap-3 mb-4 text-[0.75rem] text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {rp.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {rp.readTime}
                      </span>
                    </div>

                    {/* Read more */}
                    <span
                      className="inline-flex items-center gap-1.5 text-[0.78rem] font-bold transition-all group-hover:gap-2.5"
                      style={{ color: rp.accentColor }}
                    >
                      Devamını Oku
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* ─── G) Final CTA ─── */}
      <FinalCTA />

      {/* ─── H) Footer ─── */}
      <SubpageFooter />
    </main>
  );
}
