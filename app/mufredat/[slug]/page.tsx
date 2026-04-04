"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SubpageNavbar, SubpageFooter, FinalCTA } from "@/components/subpage-shared";
import { curriculumSectionRenderers } from "@/components/curriculum-sections";
import {
  ArrowLeft, BookOpen, Clock, Users, Star, GraduationCap, ChevronRight,
} from "lucide-react";

interface CurriculumSection {
  id: string;
  sectionType: string;
  title: string;
  order: number;
  visible: boolean;
  content: string;
}

interface CurriculumData {
  id: string;
  slug: string;
  title: string;
  description?: string;
  heroColor: string;
  heroTag?: string;
  ageRange?: string;
  duration?: string;
  level?: string;
  sections: CurriculumSection[];
}

const heroBg: Record<string, { bg: string; accent: string; textColor: string }> = {
  brand:   { bg: "#1B3A7B", accent: "#F5C518", textColor: "text-white" },
  mint:    { bg: "#16794A", accent: "#F5C518", textColor: "text-white" },
  lavender:{ bg: "#5B41A8", accent: "#F5C518", textColor: "text-white" },
  gold:    { bg: "#D97706", accent: "#1B3A7B", textColor: "text-white" },
  peach:   { bg: "#C2410C", accent: "#F5C518", textColor: "text-white" },
};

export default function CurriculumDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [curriculum, setCurriculum] = useState<CurriculumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/mufredat/${slug}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then((d) => { if (d) setCurriculum(d); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <SubpageNavbar active="mufredat" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#1B3A7B] border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  if (notFound || !curriculum) {
    return (
      <>
        <SubpageNavbar active="mufredat" />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <BookOpen className="w-16 h-16 text-slate-300" />
          <h1 className="text-2xl font-bold text-slate-700">Müfredat bulunamadı</h1>
          <Link href="/mufredat" className="text-[#1B3A7B] font-medium hover:underline flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Tüm müfredatlara dön
          </Link>
        </div>
      </>
    );
  }

  const theme = heroBg[curriculum.heroColor] || heroBg.brand;
  const sections = [...curriculum.sections].sort((a, b) => a.order - b.order);

  return (
    <>
      <SubpageNavbar active="mufredat" />

      {/* ── Curriculum Hero ── */}
      <section className="relative overflow-hidden pt-28 pb-20" style={{ background: theme.bg }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl animate-pulse"
            style={{ background: theme.accent }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl animate-pulse"
            style={{ background: "#fff", animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/mufredat" className="hover:text-white transition-colors">Müfredatlar</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{curriculum.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {curriculum.heroTag && (
                <span className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-full mb-5"
                  style={{ background: "rgba(255,255,255,0.15)", color: theme.accent }}>
                  <GraduationCap className="w-4 h-4" />
                  {curriculum.heroTag}
                </span>
              )}
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
                {curriculum.title}
              </h1>
              {curriculum.description && (
                <p className="text-white/75 text-lg leading-relaxed mb-8">
                  {curriculum.description}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                {curriculum.ageRange && (
                  <span className="flex items-center gap-2 text-sm font-semibold text-white bg-white/15 px-4 py-2 rounded-full">
                    <Users className="w-4 h-4" />
                    {curriculum.ageRange}
                  </span>
                )}
                {curriculum.duration && (
                  <span className="flex items-center gap-2 text-sm font-semibold text-white bg-white/15 px-4 py-2 rounded-full">
                    <Clock className="w-4 h-4" />
                    {curriculum.duration}
                  </span>
                )}
                {curriculum.level && (
                  <span className="flex items-center gap-2 text-sm font-semibold text-white bg-white/15 px-4 py-2 rounded-full">
                    <Star className="w-4 h-4" />
                    {curriculum.level}
                  </span>
                )}
              </div>
            </div>

            {/* Decorative card */}
            <div className="hidden lg:block">
              <div className="rounded-3xl p-8 text-center"
                style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                  style={{ background: theme.accent }}>
                  <BookOpen className="w-10 h-10 text-white" style={{ color: theme.bg }} />
                </div>
                <p className="text-white font-bold text-xl mb-1 font-display">
                  {sections.length} Bölüm
                </p>
                <p className="text-white/60 text-sm">İnteraktif içerik hazır</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sections ── */}
      {sections.map((section) => {
        const renderer = curriculumSectionRenderers[section.sectionType];
        if (!renderer) return null;
        let data: any = {};
        try { data = JSON.parse(section.content); } catch {}
        data.__heroColor = curriculum.heroColor;
        return <div key={section.id}>{renderer(data)}</div>;
      })}

      {/* ── Back link ── */}
      <section className="py-12 bg-[#F8FAFC] text-center">
        <Link
          href="/mufredat"
          className="inline-flex items-center gap-2 text-[#1B3A7B] font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Tüm müfredatlara dön
        </Link>
      </section>

      <SubpageFooter />
    </>
  );
}
