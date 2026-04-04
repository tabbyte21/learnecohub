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
      <section className="relative overflow-hidden pt-28 pb-24" style={{ background: theme.bg }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[20%] w-96 h-96 rounded-full opacity-15 blur-3xl animate-pulse"
            style={{ background: theme.accent }} />
          <div className="absolute bottom-0 left-[10%] w-72 h-72 rounded-full opacity-10 blur-3xl animate-pulse"
            style={{ background: "#fff", animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
            style={{ background: theme.accent }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-white/50 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/mufredat" className="hover:text-white transition-colors">Müfredatlar</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80">{curriculum.title}</span>
          </nav>

          {curriculum.heroTag && (
            <span className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(255,255,255,0.12)", color: theme.accent }}>
              <GraduationCap className="w-4 h-4" />
              {curriculum.heroTag}
            </span>
          )}

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {curriculum.title}
          </h1>

          {curriculum.description && (
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              {curriculum.description}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-3">
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
            <span className="flex items-center gap-2 text-sm font-semibold text-white bg-white/15 px-4 py-2 rounded-full">
              <BookOpen className="w-4 h-4" />
              {sections.length} Bölüm
            </span>
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
