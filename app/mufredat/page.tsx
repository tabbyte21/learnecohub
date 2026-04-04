"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SubpageNavbar, SubpageFooter } from "@/components/subpage-shared";
import {
  BookOpen, Clock, Users, ChevronRight, Sparkles, GraduationCap,
  ArrowRight, Star,
} from "lucide-react";

interface CurriculumItem {
  id: string;
  slug: string;
  title: string;
  description?: string;
  heroColor: string;
  heroTag?: string;
  ageRange?: string;
  duration?: string;
  level?: string;
  order: number;
}

const colorConfig: Record<string, {
  bg: string; border: string; text: string; badge: string; badgeText: string;
  btn: string; btnShadow: string; orb1: string; orb2: string;
}> = {
  brand: {
    bg: "bg-[#EBF2FB]", border: "border-[#A8C2E3]", text: "text-[#1B3A7B]",
    badge: "bg-[#1B3A7B]", badgeText: "text-white",
    btn: "bg-[#1B3A7B]", btnShadow: "0 4px 0 #112755",
    orb1: "#4D7EC4", orb2: "#2ECC71",
  },
  mint: {
    bg: "bg-[#E8F8F1]", border: "border-[#A3DEC2]", text: "text-[#16794A]",
    badge: "bg-[#2ECC71]", badgeText: "text-white",
    btn: "bg-[#16794A]", btnShadow: "0 4px 0 #0D4F30",
    orb1: "#2ECC71", orb2: "#F5C518",
  },
  lavender: {
    bg: "bg-[#F0EDFB]", border: "border-[#C4B7EE]", text: "text-[#5B41A8]",
    badge: "bg-[#7F63CB]", badgeText: "text-white",
    btn: "bg-[#5B41A8]", btnShadow: "0 4px 0 #3D2B72",
    orb1: "#9F8AD8", orb2: "#EE7A45",
  },
  gold: {
    bg: "bg-[#FFFBEB]", border: "border-[#FDE68A]", text: "text-[#92400E]",
    badge: "bg-[#F5C518]", badgeText: "text-slate-800",
    btn: "bg-[#D97706]", btnShadow: "0 4px 0 #92400E",
    orb1: "#F5C518", orb2: "#EE7A45",
  },
  peach: {
    bg: "bg-[#FEF0E8]", border: "border-[#F8C4A5]", text: "text-[#9A3412]",
    badge: "bg-[#EE7A45]", badgeText: "text-white",
    btn: "bg-[#C2410C]", btnShadow: "0 4px 0 #7C2D12",
    orb1: "#EE7A45", orb2: "#F5C518",
  },
};

const levelIcons: Record<string, string> = {
  "Başlangıç": "⭐",
  "Orta": "⭐⭐",
  "İleri": "⭐⭐⭐",
};

export default function MufredatPage() {
  const [curricula, setCurricula] = useState<CurriculumItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/mufredat")
      .then((r) => r.json())
      .then(setCurricula)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SubpageNavbar active="mufredat" />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 pb-20" style={{ background: "#1B3A7B" }}>
        {/* Animated orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[10%] w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{ background: "#4D7EC4" }} />
          <div className="absolute bottom-0 right-[15%] w-64 h-64 rounded-full opacity-15 blur-3xl animate-pulse"
            style={{ background: "#2ECC71", animationDelay: "1.2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse"
            style={{ background: "#F5C518", animationDelay: "0.6s" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
            style={{ background: "rgba(255,255,255,0.12)", color: "#F5C518" }}>
            <GraduationCap className="w-4 h-4" />
            Bilimsel Müfredat Programları
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Müfredatlarımızı{" "}
            <span style={{ color: "#F5C518" }}>Keşfedin</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Sosyal-duygusal beceri gelişimi için tasarlanmış, yaşa özel
            bilimsel müfredat programları. Her program uzman pedagoji ekibimiz
            tarafından hazırlanmıştır.
          </p>
        </div>
      </section>

      {/* ── Curriculum Grid ── */}
      <section className="py-20 bg-[#F8FAFC] relative">
        <div className="absolute inset-0 dots-pattern opacity-[0.03]" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#1B3A7B] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && curricula.length === 0 && (
            <div className="text-center py-24">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#EBF2FB] flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-[#1B3A7B]/40" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Henüz müfredat eklenmedi</h3>
              <p className="text-slate-400">Yakında yeni müfredatlar burada listelenecek.</p>
            </div>
          )}

          {!loading && curricula.length > 0 && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {curricula.map((c, i) => {
                const cfg = colorConfig[c.heroColor] || colorConfig.brand;
                return (
                  <article
                    key={c.id}
                    className={`group relative rounded-3xl border-2 ${cfg.border} bg-white overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    {/* Top color bar */}
                    <div className={`h-2 w-full ${cfg.badge}`} />

                    {/* Card orb decoration */}
                    <div className="absolute top-6 right-6 w-24 h-24 rounded-full opacity-10 blur-2xl pointer-events-none"
                      style={{ background: cfg.orb1 }} />

                    <div className="p-6 pb-5">
                      {/* Tag badge */}
                      {c.heroTag && (
                        <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-4 ${cfg.badge} ${cfg.badgeText}`}>
                          {c.heroTag}
                        </span>
                      )}

                      <h2 className={`font-display text-xl font-extrabold mb-3 ${cfg.text} leading-snug`}>
                        {c.title}
                      </h2>

                      {c.description && (
                        <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">
                          {c.description}
                        </p>
                      )}

                      {/* Meta chips */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {c.ageRange && (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                            <Users className="w-3.5 h-3.5" />
                            {c.ageRange}
                          </span>
                        )}
                        {c.duration && (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                            <Clock className="w-3.5 h-3.5" />
                            {c.duration}
                          </span>
                        )}
                        {c.level && (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                            <Star className="w-3.5 h-3.5" />
                            {c.level}
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/mufredat/${c.slug}`}
                        className={`flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 ${cfg.btn}`}
                        style={{ boxShadow: `${cfg.btnShadow}, 0 6px 16px rgba(0,0,0,0.15)` }}
                      >
                        <BookOpen className="w-4 h-4" />
                        Müfredatı İncele
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Stats banner ── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: BookOpen, value: "500+", label: "Ders İçeriği" },
              { icon: Users, value: "10.000+", label: "Öğrenci" },
              { icon: GraduationCap, value: "50+", label: "Uzman Eğitimci" },
              { icon: Star, value: "%98", label: "Memnuniyet" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="space-y-2">
                <div className="w-10 h-10 mx-auto rounded-xl bg-[#EBF2FB] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#1B3A7B]" />
                </div>
                <p className="text-2xl font-extrabold text-slate-800 font-display">{value}</p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SubpageFooter />
    </>
  );
}
