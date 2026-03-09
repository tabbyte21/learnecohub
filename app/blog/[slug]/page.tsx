"use client";

import { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";

/* ─── Types ─── */
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  author: string | null;
  coverImage: string | null;
  status: string;
  createdAt: string;
}

/* ─── Color helpers ─── */
const accentColors = ["#1B3A7B", "#2ECC71", "#7F63CB", "#F5C518", "#EE7A45"];
const coverColors = ["#1B3A7B", "#16794A", "#5B41A8", "#8B6E00", "#D4602C"];

const categoryColorMap: Record<string, { color: string; bg: string }> = {
  "Sosyal-Duygusal Öğrenme": { color: "#2ECC71", bg: "#ECFBF2" },
  "Ebeveyn Rehberi": { color: "#7F63CB", bg: "#F0EDF9" },
  "Eğitimci Köşesi": { color: "#EE7A45", bg: "#FEF5F0" },
  "Araştırmalar": { color: "#F5C518", bg: "#FFFBEB" },
  "Haberler": { color: "#1B3A7B", bg: "#EBF2FB" },
};

function getPostColors(post: BlogPost, index: number) {
  const accent = accentColors[index % accentColors.length];
  const cover = coverColors[index % coverColors.length];
  const catStyle = categoryColorMap[post.category || ""] || { color: "#1B3A7B", bg: "#EBF2FB" };
  return { accent, cover, catColor: catStyle.color, catBg: catStyle.bg };
}

/* ─── Date formatter ─── */
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function estimateReadTime(content: string | null) {
  if (!content) return "1 dk";
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} dk`;
}

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

/* ─── HTML content renderer ─── */
function renderHTMLContent(content: string) {
  return (
    <div
      className="prose prose-slate max-w-none
        prose-headings:font-display prose-headings:font-extrabold prose-headings:tracking-tight
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-p:text-[0.95rem] prose-p:leading-[1.9] prose-p:text-slate-600 prose-p:mb-5
        prose-li:text-[0.95rem] prose-li:text-slate-600 prose-li:leading-[1.9]
        prose-blockquote:border-l-4 prose-blockquote:border-[#F5C518] prose-blockquote:bg-[#FFFBEB]
        prose-blockquote:py-5 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
        prose-blockquote:italic prose-blockquote:text-slate-600
        prose-strong:text-slate-800
        prose-a:text-[#1B3A7B] prose-a:font-semibold"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

/* ═══════════════════════════════════════
   BLOG DETAIL PAGE
   ═══════════════════════════════════════ */
export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const wrap = useAnim();

  useEffect(() => {
    // Fetch single blog post
    fetch(`/api/blog/${slug}?t=${Date.now()}`)
      .then((r) => {
        if (!r.ok) {
          setNotFound(true);
          setLoading(false);
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data && !data.error) {
          setPost(data);
          // Fetch related posts
          fetch(`/api/blog?t=${Date.now()}`)
            .then((r) => r.json())
            .then((all) => {
              if (Array.isArray(all)) {
                setRelatedPosts(
                  all.filter((p: BlogPost) => p.id !== data.id).slice(0, 3)
                );
              }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
        } else {
          setNotFound(true);
          setLoading(false);
        }
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  /* ─── Loading state ─── */
  if (loading) {
    return (
      <main>
        <SubpageNavbar active="Blog" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-slate-300 mx-auto mb-4 animate-spin" />
            <p className="text-slate-400 text-[0.9rem]">Yazı yükleniyor...</p>
          </div>
        </div>
        <SubpageFooter />
      </main>
    );
  }

  /* ─── Not found state ─── */
  if (notFound || !post) {
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

  const colors = getPostColors(post, 0);
  const readTime = estimateReadTime(post.content);

  /* Detect if content is HTML or markdown-like plain text */
  const isHTML = post.content
    ? /<[a-z][\s\S]*>/i.test(post.content)
    : false;

  const parsedContent = !isHTML && post.content
    ? parseContent(post.content, colors.accent)
    : null;

  return (
    <main ref={wrap}>
      {/* ─── A) Navbar ─── */}
      <SubpageNavbar active="Blog" />

      {/* ─── B) Cover / Hero ─── */}
      <section
        className="relative pt-24 pb-0 overflow-hidden"
        style={{ background: colors.cover }}
      >
        {/* Texture */}
        <div className="absolute inset-0 dots-pattern opacity-[0.06]" />

        {/* Orbs */}
        <div
          className="absolute top-[-20%] right-[5%] w-[450px] h-[450px] rounded-full blur-[120px]"
          style={{ background: colors.accent, opacity: 0.25 }}
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
          {post.category && (
            <div className="anim d1 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold uppercase tracking-wide bg-white/15 text-white backdrop-blur-sm">
                <Tag className="w-3.5 h-3.5" /> {post.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="anim d2 font-display text-[1.8rem] sm:text-[2.2rem] lg:text-[2.8rem] font-extrabold text-white leading-[1.1] tracking-tight mb-6 max-w-3xl">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="anim d3 flex flex-wrap items-center gap-5 mb-10 text-white/60 text-[0.82rem] font-medium">
            {post.author && (
              <span className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full flex items-center justify-center bg-white/15">
                  <User className="w-4 h-4 text-white" />
                </span>
                {post.author}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readTime} okuma
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
            {/* Render HTML content or parsed markdown content */}
            {isHTML && post.content ? (
              renderHTMLContent(post.content)
            ) : parsedContent ? (
              parsedContent.map((el, idx) => {
                // Insert video section at placeholder
                if (el === "__VIDEO_PLACEHOLDER__") {
                  return (
                    <div key={`video-${idx}`} className="my-10">
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
              })
            ) : (
              <p className="text-[0.95rem] text-slate-600 leading-[1.9]">
                {post.content || "Bu yazının içeriği henüz eklenmemiş."}
              </p>
            )}

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
                style={{ background: colors.catBg }}
              >
                <User
                  className="w-7 h-7"
                  style={{ color: colors.accent }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-extrabold text-slate-800 mb-1">
                  {post.author || "Anonim"}
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
                  style={{ color: colors.accent }}
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
      {relatedPosts.length > 0 && (
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
                {relatedPosts.map((rp, i) => {
                  const rpColors = getPostColors(rp, i);
                  const rpCatStyle = categoryColorMap[rp.category || ""] || { color: "#1B3A7B", bg: "#EBF2FB" };
                  return (
                    <a
                      key={rp.id}
                      href={`/blog/${rp.slug}`}
                      className={`anim d${i + 1} card-3d card-3d-white p-0 overflow-hidden group block`}
                    >
                      {/* Top accent bar */}
                      <div
                        className="h-1.5 w-full"
                        style={{ background: rpColors.accent }}
                      />
                      <div className="p-6">
                        {/* Category */}
                        {rp.category && (
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wide mb-3"
                            style={{
                              background: rpCatStyle.bg,
                              color: rpCatStyle.color,
                            }}
                          >
                            <Tag className="w-3 h-3" />
                            {rp.category}
                          </span>
                        )}

                        {/* Title */}
                        <h3 className="font-display text-[1rem] font-extrabold text-slate-800 leading-tight mb-3 group-hover:text-[#1B3A7B] transition-colors">
                          {rp.title}
                        </h3>

                        {/* Date */}
                        <div className="flex items-center gap-3 mb-4 text-[0.75rem] text-slate-400 font-medium">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(rp.createdAt)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {estimateReadTime(rp.content)}
                          </span>
                        </div>

                        {/* Read more */}
                        <span
                          className="inline-flex items-center gap-1.5 text-[0.78rem] font-bold transition-all group-hover:gap-2.5"
                          style={{ color: rpColors.accent }}
                        >
                          Devamını Oku
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </Section>
      )}

      {/* ─── G) Final CTA ─── */}
      <FinalCTA />

      {/* ─── H) Footer ─── */}
      <SubpageFooter />
    </main>
  );
}
