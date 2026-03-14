"use client";

import { useEffect, useRef, useState } from "react";
import {
  SubpageNavbar, SubpageHero, FinalCTA, SubpageFooter, Section, Counter,
} from "./subpage-shared";
import {
  BookOpen, Users, Play, GraduationCap, BarChart3, Globe, Heart,
  ArrowRight, CheckCircle2, Sparkles, ChevronRight, Star,
  Zap, Target, TrendingUp, Award, Clock, Download, MessageCircle,
  Layers, Monitor, Headphones, PenTool, FileText, Video, Gamepad2,
  Puzzle, Trophy, Flame, Shield, Eye, Rocket, Phone, Mail, MapPin,
  Lock, Crown, Search, Brain, Calendar, Volume2, Music, Lightbulb,
  Palette, Compass, Activity, Briefcase,
} from "lucide-react";
import type { ElementType } from "react";

const iconMap: Record<string, ElementType> = {
  BookOpen, Users, Play, GraduationCap, BarChart3, Globe, Heart,
  ArrowRight, CheckCircle2, Sparkles, ChevronRight, Star,
  Zap, Target, TrendingUp, Award, Clock, Download, MessageCircle,
  Layers, Monitor, Headphones, PenTool, FileText, Video, Gamepad2,
  Puzzle, Trophy, Flame, Shield, Eye, Rocket, Phone, Mail, MapPin,
  Lock, Crown, Search, Brain, Calendar, Volume2, Music, Lightbulb,
  Palette, Compass, Activity, Briefcase,
};

type HeroTheme = "brand" | "mint" | "lavender" | "gold" | "peach";

export function getIcon(name: string): ElementType {
  return iconMap[name] || Sparkles;
}

const colorClasses: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  brand: { bg: "bg-brand-50", border: "border-brand-200", text: "text-brand-600", iconBg: "bg-brand-100" },
  mint: { bg: "bg-mint-50", border: "border-mint-200", text: "text-mint-600", iconBg: "bg-mint-100" },
  gold: { bg: "bg-gold-50", border: "border-gold-200", text: "text-gold-600", iconBg: "bg-gold-100" },
  lavender: { bg: "bg-lavender-50", border: "border-lavender-200", text: "text-lavender-600", iconBg: "bg-lavender-100" },
  peach: { bg: "bg-peach-50", border: "border-peach-200", text: "text-peach-600", iconBg: "bg-peach-100" },
};

function StickyNotesSection({ data }: { data: any }) {
  return (
    <Section>
      <section className="py-20 bg-[#F8FAFC] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.04]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="anim font-display text-2xl sm:text-3xl font-extrabold text-slate-800">{data.title}{data.titleHighlight && <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>}</h2>
            {data.description && <p className="anim d1 text-slate-400 text-[0.88rem] leading-relaxed mt-3">{data.description}</p>}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.items?.map((item: any, i: number) => {
              const Icon = getIcon(item.icon);
              const rotations = ["-1deg", "0.5deg", "-0.7deg", "1deg", "-0.3deg", "0.8deg"];
              return (
                <div key={i} className={`anim d${(i % 6) + 1}`} style={{ transform: `rotate(${rotations[i % rotations.length]})` }}>
                  <div className="bg-[#FFFDE7] rounded-2xl p-4 sm:p-6 border border-[#FFF9C4] shadow-sm hover:shadow-md transition-all hover:-translate-y-1 relative">
                    <div className="absolute -top-2 left-6 w-6 h-3 bg-[#81D4FA]/40 rounded-b-sm" />
                    <div className={`w-10 h-10 rounded-xl ${colorClasses[item.color]?.iconBg || "bg-brand-100"} flex items-center justify-center mb-4`}>
                      <Icon className={`w-5 h-5 ${colorClasses[item.color]?.text || "text-brand-600"}`} />
                    </div>
                    <h3 className="font-display font-bold text-slate-800 text-sm mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
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

/* ── student_features: Playful gradient icon cards ── */
function FeatureShowcaseSection({ data }: { data: any }) {
  const variant = data.__variant || 0;
  const hexColors: Record<string, string> = {
    "#1B3A7B": "#4D7EC4", "#2ECC71": "#69DC9A", "#7F63CB": "#9F8AD8",
    "#EE7A45": "#F49668", "#F5C518": "#FFDF66",
  };

  /* ── Variant 0: Classic card grid with top accent bar ── */
  if (variant === 0) {
    return (
      <Section>
        <section className="py-24 bg-gradient-to-b from-white via-[#F0F7FF] to-white relative overflow-hidden">
          <div className="absolute top-10 right-[10%] w-80 h-80 bg-brand-100/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 left-[5%] w-60 h-60 bg-mint-100/30 rounded-full blur-[80px]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="anim font-display text-2xl sm:text-3xl font-extrabold text-slate-800">{data.title}{data.titleHighlight && <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>}</h2>
              {data.description && <p className="anim d1 text-slate-400 text-[0.88rem] leading-relaxed mt-3">{data.description}</p>}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.items?.map((item: any, i: number) => {
                const Icon = getIcon(item.icon);
                const color = item.color || "#1B3A7B";
                const accent = hexColors[color] || color;
                return (
                  <div key={i} className={`anim d${(i % 6) + 1} group`}>
                    <div className="relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${color}, ${accent})` }} />
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: `${color}12`, border: `1.5px solid ${color}25` }}>
                        <Icon className="w-6 h-6" style={{ color }} />
                      </div>
                      <h3 className="font-display font-bold text-slate-800 text-[0.92rem] mb-2">{item.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
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

  /* ── Variant 1: Dark section with glass cards ── */
  if (variant === 1) {
    return (
      <Section>
        <section className="py-24 bg-[#0F1729] relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-lavender-500/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 grid-overlay opacity-[0.03]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="anim font-display text-2xl sm:text-3xl font-extrabold text-white">{data.title}{data.titleHighlight && <>{" "}<span className="text-[#F5C518]">{data.titleHighlight}</span></>}</h2>
              {data.description && <p className="anim d1 text-slate-400 text-[0.88rem] leading-relaxed mt-3">{data.description}</p>}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.items?.map((item: any, i: number) => {
                const Icon = getIcon(item.icon);
                const color = item.color || "#4D7EC4";
                return (
                  <div key={i} className={`anim d${(i % 6) + 1} group`}>
                    <div className="relative rounded-2xl p-5 sm:p-6 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}>
                      <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)" }} />
                      <div className="relative z-10">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
                          <Icon className="w-5 h-5" style={{ color }} />
                        </div>
                        <h3 className="font-display font-bold text-white text-[0.92rem] mb-2">{item.title}</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                      </div>
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

  /* ── Variant 2: Warm bg with horizontal icon-left cards ── */
  if (variant === 2) {
    return (
      <Section>
        <section className="py-24 bg-gradient-to-br from-[#FFFBEB] via-[#FFF8E1] to-[#FFFDF5] relative overflow-hidden">
          <div className="absolute top-16 right-[8%] w-72 h-72 bg-[#F5C518]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-[5%] w-60 h-60 bg-[#EE7A45]/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 dots-pattern opacity-[0.04]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="anim font-display text-2xl sm:text-3xl font-extrabold text-slate-800">{data.title}{data.titleHighlight && <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>}</h2>
              {data.description && <p className="anim d1 text-slate-400 text-[0.88rem] leading-relaxed mt-3">{data.description}</p>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.items?.map((item: any, i: number) => {
                const Icon = getIcon(item.icon);
                const color = item.color || "#EE7A45";
                return (
                  <div key={i} className={`anim d${(i % 6) + 1} group`}>
                    <div className="flex items-start gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#F5C518]/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `${color}15`, border: `1.5px solid ${color}25` }}>
                        <Icon className="w-6 h-6" style={{ color }} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-slate-800 text-[0.92rem] mb-1.5">{item.title}</h3>
                        <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
                      </div>
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

  /* ── Variant 3+: Mint bg with numbered cards ── */
  return (
    <Section>
      <section className="py-24 bg-gradient-to-b from-[#ECFBF2] via-[#F0FFF6] to-[#ECFBF2] relative overflow-hidden">
        <div className="absolute top-16 left-[8%] w-72 h-72 bg-[#2ECC71]/12 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[10%] w-56 h-56 bg-[#1B3A7B]/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay opacity-[0.03]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="anim font-display text-2xl sm:text-3xl font-extrabold text-slate-800">{data.title}{data.titleHighlight && <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>}</h2>
            {data.description && <p className="anim d1 text-slate-400 text-[0.88rem] leading-relaxed mt-3">{data.description}</p>}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.items?.map((item: any, i: number) => {
              const Icon = getIcon(item.icon);
              const color = item.color || "#2ECC71";
              return (
                <div key={i} className={`anim d${(i % 6) + 1} group`}>
                  <div className="relative bg-white rounded-2xl p-5 sm:p-6 border border-[#2ECC71]/15 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">
                    <div className="absolute top-4 right-4 font-display text-[2.5rem] font-black text-[#2ECC71]/[0.07] leading-none select-none">{String(i + 1).padStart(2, "0")}</div>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `${color}15` }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <h3 className="font-display font-bold text-slate-800 text-[0.92rem] mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
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

/* ── teacher_tools: Dashboard-style accent-border cards ── */
function ToolkitSection({ data }: { data: any }) {
  return (
    <Section>
      <section className="py-24 bg-[#FAFBFE] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="anim font-display text-2xl sm:text-3xl font-extrabold text-slate-800">{data.title}{data.titleHighlight && <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>}</h2>
            {data.description && <p className="anim d1 text-slate-400 text-[0.88rem] leading-relaxed mt-3">{data.description}</p>}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.items?.map((item: any, i: number) => {
              const Icon = getIcon(item.icon);
              const color = item.color || "#1B3A7B";
              return (
                <div key={i} className={`anim d${(i % 6) + 1}`}>
                  <div className="relative bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: color }} />
                    <div className="p-5 pl-6 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: `${color}10` }}>
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-slate-800 text-sm mb-1.5">{item.title}</h3>
                        <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
                      </div>
                    </div>
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

/* ── family_features: Warm rounded cards with soft bg ── */
function WarmCardsSection({ data }: { data: any }) {
  const bgColors = ["#FFF7ED", "#F0FDF4", "#EFF6FF", "#FDF4FF", "#FFFBEB", "#F0F9FF"];
  const borderColors = ["#FDBA74", "#86EFAC", "#93C5FD", "#D8B4FE", "#FDE68A", "#7DD3FC"];
  return (
    <Section>
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-[8%] w-72 h-72 bg-peach-100/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-[8%] w-60 h-60 bg-gold-100/25 rounded-full blur-[80px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="anim font-display text-2xl sm:text-3xl font-extrabold text-slate-800">{data.title}{data.titleHighlight && <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>}</h2>
            {data.description && <p className="anim d1 text-slate-400 text-[0.88rem] leading-relaxed mt-3">{data.description}</p>}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.items?.map((item: any, i: number) => {
              const Icon = getIcon(item.icon);
              const color = item.color || "#EE7A45";
              const bg = bgColors[i % bgColors.length];
              const border = borderColors[i % borderColors.length];
              return (
                <div key={i} className={`anim d${(i % 6) + 1} group`}>
                  <div className="rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ background: bg, border: `1.5px solid ${border}60` }}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-sm" style={{ background: `${color}18`, border: `2px solid ${color}30` }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <h3 className="font-display font-bold text-slate-800 text-sm mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
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

function NotebookCardsSection({ data }: { data: any }) {
  const tabColors: Record<string, string> = {
    brand: "#1B3A7B", mint: "#2ECC71", gold: "#F5C518", lavender: "#7F63CB", peach: "#EE7A45",
  };
  return (
    <Section>
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h2 className="anim font-display text-2xl sm:text-3xl font-extrabold text-slate-800 mb-12 text-center">{data.title}{data.titleHighlight && <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.items?.map((item: any, i: number) => {
              const Icon = getIcon(item.icon);
              const color = tabColors[item.color] || "#1B3A7B";
              return (
                <div key={i} className={`anim d${(i % 6) + 1} notebook-card`}>
                  <div className="notebook-tab" style={{ background: color }}>{item.title}</div>
                  <div className="p-5 pt-3 relative">
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-red-200/40" />
                    <div className="flex items-start gap-3 pl-4">
                      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color }} />
                      <p className="text-slate-600 text-xs leading-relaxed">{item.description}</p>
                    </div>
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

function ClipboardSection({ data }: { data: any }) {
  const Icon = getIcon(data.icon);
  return (
    <Section>
      <section className="py-20 bg-[#FAFBFE] relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="anim-scale bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-sm relative">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-3 flex items-center gap-2">
              <div className="w-8 h-3 bg-slate-500 rounded-t-sm" />
              <div className="flex-1" />
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                <div className="w-2 h-2 rounded-full bg-green-400/60" />
              </div>
            </div>
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-600" />
                </div>
                <h2 className="font-display text-xl font-extrabold text-slate-800">{data.title}{data.titleHighlight && <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>}</h2>
              </div>
              <p className="text-slate-600 text-[0.9rem] leading-relaxed">{data.content}</p>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

function StatsSection({ data }: { data: any }) {
  const cardColors = ["card-3d card-3d-brand", "card-3d card-3d-mint", "card-3d card-3d-gold", "card-3d card-3d-lavender"];
  return (
    <Section>
      <section className="py-20 bg-[#F8FAFC] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.04]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {data.items?.map((item: any, i: number) => (
              <div key={i} className={`anim d${i + 1} ${cardColors[i % cardColors.length]} rounded-2xl p-4 sm:p-6 text-center`}>
                <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 mb-1">
                  <Counter target={item.value} suffix={item.suffix} />
                </div>
                <p className="text-slate-500 text-xs font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

function BentoGridSection({ data }: { data: any }) {
  return (
    <Section>
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h2 className="anim font-display text-2xl sm:text-3xl font-extrabold text-slate-800 mb-12 text-center">{data.title}{data.titleHighlight && <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.items?.map((item: any, i: number) => {
              const Icon = getIcon(item.icon);
              const c = colorClasses[item.color] || colorClasses.brand;
              return (
                <div key={i} className={`anim d${(i % 6) + 1} card-3d card-3d-${item.color || "brand"} rounded-2xl p-4 sm:p-6 bg-white`}>
                  <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <h3 className="font-display font-bold text-slate-800 text-sm mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Section>
  );
}

function FAQSection({ data }: { data: any }) {
  const questions = data.items || data.questions || [];
  return (
    <Section>
      <section className="py-20 bg-[#F8FAFC] relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="anim font-display text-2xl sm:text-3xl font-extrabold text-slate-800 mb-10 text-center">{data.title}{data.titleHighlight && <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>}</h2>
          <div className="space-y-3">
            {questions.map((item: any, i: number) => (
              <details key={i} className={`anim d${(i % 6) + 1} bg-white rounded-xl border border-slate-200 overflow-hidden group`}>
                <summary className="px-5 py-4 cursor-pointer font-semibold text-sm text-slate-700 flex items-center justify-between hover:bg-slate-50 transition-colors list-none">
                  {item.q}
                  <ChevronRight className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-90 flex-shrink-0" />
                </summary>
                <div className="px-5 pb-4 text-slate-500 text-[0.82rem] leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

function FreeBannerSection({ data }: { data: any }) {
  return (
    <Section>
      <section className="py-12 bg-gradient-to-r from-[#F5C518] to-[#FFDF66] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.06]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {data.titleHighlight ? (
            <h2 className="anim font-display text-xl sm:text-2xl font-extrabold text-[#1A1A2E] mb-4">
              {data.title} <span className="underline decoration-[#1A1A2E]/30 underline-offset-4">{data.titleHighlight}</span>{data.titleEnd && <> {data.titleEnd}</>}
            </h2>
          ) : (
            <h2 className="anim font-display text-xl sm:text-2xl font-extrabold text-[#1A1A2E] mb-4" dangerouslySetInnerHTML={{ __html: data.title }} />
          )}
          {data.description && <p className="anim d1 text-[#1A1A2E]/70 text-sm mb-5">{data.description}</p>}
          {data.cta ? (
            <a href={data.cta.href} className="anim d2 btn-3d btn-3d-brand !text-sm">{data.cta.label} <ArrowRight className="w-4 h-4" /></a>
          ) : data.buttonText && (
            <a href={data.buttonHref || "#"} className="anim d2 btn-3d btn-3d-brand !text-sm">{data.buttonText} <ArrowRight className="w-4 h-4" /></a>
          )}
        </div>
      </section>
    </Section>
  );
}

function ContactFormSection({ data }: { data: any }) {
  return (
    <Section>
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-[1fr,320px] lg:grid-cols-[1fr,360px] gap-6 sm:gap-10">
            <div className="anim">
              <h2 className="font-display text-2xl font-extrabold text-slate-800 mb-6">{data.title}</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {data.fields?.map((field: any, i: number) => {
                  const label = typeof field === "string" ? field : field.label || "";
                  const fieldType = typeof field === "string" ? undefined : field.type;
                  const isTextarea = fieldType === "textarea" || (!fieldType && (label === "Mesaj" || label === "Not" || label.toLowerCase().includes("mesaj")));
                  const inputType = fieldType === "email" || (!fieldType && (label.toLowerCase().includes("posta") || label.toLowerCase().includes("mail"))) ? "email"
                    : fieldType === "tel" || (!fieldType && label.toLowerCase().includes("telefon")) ? "tel" : "text";
                  return (
                  <div key={i}>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
                    {isTextarea ? (
                      <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400/20 resize-none" placeholder={label} />
                    ) : (
                      <input type={inputType} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400/20" placeholder={label} />
                    )}
                  </div>
                  );
                })}
                <button type="submit" className="btn-3d btn-3d-brand !py-3 !text-sm w-full">
                  {data.submitLabel || "Gönder"} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
            {data.contactInfo && (
              <div className="anim d3">
                <div className="bg-[#1B3A7B] rounded-2xl p-6 text-white">
                  <h3 className="font-display font-bold text-lg mb-5">{data.contactInfo.title || "İletişim Bilgileri"}</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" /><span className="text-sm text-white/70">{data.contactInfo.address}</span></li>
                    <li className="flex items-start gap-3"><Phone className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" /><a href={`tel:${data.contactInfo.phone.replace(/\s/g, "")}`} className="text-sm text-white/70 hover:text-white transition-colors">{data.contactInfo.phone}</a></li>
                    <li className="flex items-start gap-3"><Mail className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" /><a href={`mailto:${data.contactInfo.email}`} className="text-sm text-white/70 hover:text-white transition-colors">{data.contactInfo.email}</a></li>
                    <li className="flex items-start gap-3"><Clock className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" /><span className="text-sm text-white/70">{data.contactInfo.hours}</span></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Section>
  );
}

function TestimonialsSection({ data }: { data: any }) {
  return (
    <Section>
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h2 className="anim font-display text-2xl sm:text-3xl font-extrabold text-slate-800 mb-12 text-center">{data.title}{data.titleHighlight && <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>}</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {data.items?.map((item: any, i: number) => (
              <div key={i} className={`anim d${(i % 4) + 1} bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-100`}>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[#F5C518] fill-[#F5C518]" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">&ldquo;{item.quote}&rdquo;</p>
                <div>
                  <span className="font-bold text-sm text-slate-800">{item.name}</span>
                  <span className="text-xs text-slate-400 ml-2">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

function TeamGridSection({ data }: { data: any }) {
  const members = data.members || data.items || [];
  return (
    <Section>
      <section className="py-20 bg-[#F8FAFC] relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h2 className="anim font-display text-2xl sm:text-3xl font-extrabold text-slate-800 mb-12 text-center">{data.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member: any, i: number) => {
              const img = member.image || member.img;
              return (
              <div key={i} className={`anim d${(i % 6) + 1} bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-all hover:-translate-y-1`}>
                <div className="h-48 bg-gradient-to-br from-brand-100 to-lavender-100 flex items-center justify-center">
                  {img ? (
                    <img src={img} alt={member.name} className="h-full w-full object-cover" />
                  ) : (
                    <Users className="w-16 h-16 text-brand-300" />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-slate-800 text-sm">{member.name}</h3>
                  <p className="text-xs text-brand-600 font-semibold mb-2">{member.role || member.title}</p>
                  {member.description && <p className="text-xs text-slate-500 leading-relaxed">{member.description}</p>}
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

function BadgeCollectionSection({ data }: { data: any }) {
  return (
    <Section>
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h2 className="anim font-display text-2xl sm:text-3xl font-extrabold text-slate-800 mb-12 text-center">{data.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {data.items?.map((item: any, i: number) => (
              <div key={i} className={`anim d${(i % 6) + 1} bg-gradient-to-br from-[#F5C518]/10 to-[#F5C518]/5 rounded-2xl p-5 text-center border border-[#F5C518]/20`}>
                <Trophy className="w-8 h-8 text-[#F5C518] mx-auto mb-3" />
                <h3 className="font-display font-bold text-slate-800 text-sm">{item.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{item.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

function YoutubeShowcaseSection({ data }: { data: any }) {
  const [playing, setPlaying] = useState(false);
  const videoId = data.videoId || "GcjqT6zb1Ts";
  const thumbnail = data.thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  return (
    <Section>
      <section className="relative py-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-8 z-10" style={{ background: "linear-gradient(to bottom, #F8FAFC, transparent)" }} />
        <div className="absolute inset-0 bg-[#1B3A7B]" />
        <div className="absolute inset-0 dots-pattern opacity-[0.05]" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#4D7EC4]/25 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[400px] h-[400px] bg-[#2ECC71]/12 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 right-0 h-8 z-10" style={{ background: "linear-gradient(to top, #ffffff, transparent)" }} />
        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 sm:py-24">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-12 items-center">
            <div>
              <div className="anim">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-[0.72rem] font-bold uppercase tracking-wide mb-5">
                  <Play className="w-3.5 h-3.5" /> {data.tag || "TANITIM VİDEOSU"}
                </span>
              </div>
              <h2 className="anim d1 font-display text-3xl sm:text-4xl font-extrabold text-white mb-5 tracking-tight leading-[1.12]">
                {data.title}{data.titleHighlight && <>{" "}<span className="text-[#F5C518]">{data.titleHighlight}</span></>}
              </h2>
              {data.description && (
                <p className="anim d2 text-white/60 text-[0.95rem] leading-[1.85] mb-8 max-w-lg">{data.description}</p>
              )}
              {data.stats && (
                <div className="anim d3 grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  {data.stats.map((s: any, i: number) => {
                    const Icon = getIcon(s.icon);
                    return (
                      <div key={i} className="rounded-xl border border-white/10 p-4 text-center backdrop-blur-sm" style={{ background: `${s.color || "#4D7EC4"}18` }}>
                        <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: s.color || "#4D7EC4" }} />
                        <p className="font-display text-xl font-extrabold text-white leading-none mb-0.5">{s.value}</p>
                        <p className="text-[0.68rem] text-white/50 font-semibold">{s.label}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              {data.cta && (
                <div className="anim d4">
                  <a href={data.cta.href || "#"} className="btn-3d btn-3d-mint">
                    <ArrowRight className="w-5 h-5" /> {data.cta.label}
                  </a>
                </div>
              )}
            </div>
            <div className="anim d2 relative">
              <div className="absolute -inset-3 rounded-3xl bg-[#F5C518]/10 blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/10" style={{ boxShadow: "0 6px 0 rgba(77,126,196,0.25), 0 20px 50px rgba(0,0,0,0.35)" }}>
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  {!playing ? (
                    <>
                      <img src={thumbnail} alt={data.title} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
                      <button onClick={() => setPlaying(true)} className="absolute inset-0 z-10 flex items-center justify-center group cursor-pointer">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F5C518] flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ boxShadow: "0 4px 0 #D4A816, 0 8px 30px rgba(245,197,24,0.4)" }}>
                          <Play className="w-9 h-9 sm:w-11 sm:h-11 text-[#1A1A2E] ml-1" fill="#1A1A2E" />
                        </div>
                      </button>
                    </>
                  ) : (
                    <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} title={data.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

function MaterialsScrollSection({ data }: { data: any }) {
  const colorMap: Record<string, { color: string; accent: string; bg: string }> = {
    brand: { color: "#1B3A7B", accent: "#4D7EC4", bg: "#EBF2FB" },
    mint: { color: "#2ECC71", accent: "#69DC9A", bg: "#ECFBF2" },
    lavender: { color: "#7F63CB", accent: "#9F8AD8", bg: "#F0EDF9" },
    peach: { color: "#EE7A45", accent: "#F49668", bg: "#FEF5F0" },
    gold: { color: "#F5C518", accent: "#FFDF66", bg: "#FFFBEB" },
  };
  return (
    <Section>
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-gold-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {data.title && (
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="anim font-display text-3xl sm:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">{data.title}</h2>
              {(data.subtitle || data.description) && <p className="anim d1 text-slate-400 text-[0.95rem] leading-relaxed">{data.subtitle || data.description}</p>}
            </div>
          )}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, white, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, white, transparent)" }} />
            <div className="material-marquee overflow-hidden">
              <div className="material-marquee-inner flex gap-5 sm:gap-8 w-max py-8 sm:py-12 px-4 sm:px-10">
                {[...(data.items || []), ...(data.items || [])].map((c: any, i: number) => {
                  const Icon = getIcon(c.icon);
                  const cm = colorMap[c.color] || colorMap.brand;
                  return (
                    <div key={i} className="a4-file group relative flex-shrink-0 w-[200px] sm:w-[240px] cursor-pointer">
                      <div className="relative transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.08))" }}>
                        <div className="relative overflow-hidden" style={{ height: "340px", background: "#ffffff", clipPath: "polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)", borderRadius: "14px", border: `2px solid ${cm.accent}40` }}>
                          <div className="absolute inset-0 a4-lines" style={{ "--line-color": cm.accent + "18" } as React.CSSProperties} />
                          <div className="absolute top-0 bottom-0 left-[42px] w-[1.5px]" style={{ background: cm.color + "15" }} />
                          <div className="absolute top-0 right-0 w-[36px] h-[36px] z-10">
                            <div className="absolute inset-0" style={{ background: cm.bg, clipPath: "polygon(0 0, 100% 100%, 0 100%)" }} />
                            <div className="absolute inset-0" style={{ background: cm.accent + "20", clipPath: "polygon(0 0, 0 100%, 100% 100%)" }} />
                          </div>
                          <div className="relative z-10 px-5 pt-6 pb-3 flex items-end gap-3" style={{ borderBottom: `2px solid ${cm.accent}25` }}>
                            <div className="flex-1 min-w-0 pl-5">
                              <div className="flex items-center gap-2 mb-1">
                                <Icon className="w-4 h-4" style={{ color: cm.color }} />
                                <span className="text-[0.6rem] font-extrabold uppercase tracking-widest" style={{ color: cm.color }}>{c.count || ""}</span>
                              </div>
                              <h4 className="font-display font-extrabold text-[1.05rem] text-slate-800 leading-tight">{c.label}</h4>
                            </div>
                          </div>
                          <div className="relative z-10 px-5 pt-4 space-y-0">
                            {(Array.isArray(c.lines || c.features) ? (c.lines || c.features) : (typeof (c.lines || c.features) === 'string' ? (c.lines || c.features).split('\n').filter(Boolean) : [])).map((line: string, j: number) => (
                              <div key={j} className="a4-content-line flex items-center gap-2.5 pl-5" style={{ height: "38px", animationDelay: `${j * 0.12}s` }}>
                                <div className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: cm.color }} />
                                <span className="text-[0.8rem] text-slate-600 font-medium">{line}</span>
                              </div>
                            ))}
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-[6px]" style={{ background: cm.color }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   VIDEO SHOWCASE — Notebook-style video cards
   ═══════════════════════════════════════ */
function VideoShowcaseSection({ data }: { data: any }) {
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const videos = data.items || data.videos || [];
  return (
    <Section>
      <section className="py-24 bg-[#E8F4FD] relative overflow-hidden">
        <div className="absolute top-20 right-[8%] w-60 h-60 bg-brand-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[5%] w-52 h-52 bg-mint-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-lavender-100 text-lavender-700 mb-4"><Video className="w-3.5 h-3.5" /> {data.tag || "VİDEO İÇERİKLER"}</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              {data.title} <span className="text-gradient">{data.titleHighlight}</span>
            </h2>
            {data.description && <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">{data.description}</p>}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {videos.map((v: any, i: number) => {
              const isPlaying = playingIdx === i;
              const color = v.color || "#1B3A7B";
              const youtubeId = v.youtubeId || v.videoId;
              const thumbnail = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : "";
              return (
                <div key={i} className={`anim d${i <= 2 ? i + 1 : 3} group relative`}>
                  <div className="relative bg-white rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)" }}>
                    <div className="relative h-10 flex items-center px-4" style={{ background: color }}>
                      <div className="w-5 h-5 rounded-full border-[2.5px] border-white/60 bg-transparent" />
                      <div className="ml-auto flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-sm">
                        <span className="text-[0.65rem] font-bold text-white/90 uppercase tracking-wide">{v.label || `Ders ${i + 1}`}</span>
                      </div>
                    </div>
                    <div className="relative" style={{ backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, #e8e8e8 27px, #e8e8e8 28px)`, backgroundPosition: "0 12px" }}>
                      <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-red-300/40 z-20 pointer-events-none" />
                      <div className="relative mx-4 mt-4 mb-0 rounded-lg overflow-hidden border border-slate-200/60" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                        <div className="relative aspect-video">
                          {isPlaying && youtubeId ? (
                            <iframe
                              className="absolute inset-0 w-full h-full"
                              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                              title={v.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            />
                          ) : (
                            <>
                              {thumbnail && <img src={thumbnail} alt={v.title} className="absolute inset-0 w-full h-full object-cover" />}
                              <button onClick={() => setPlayingIdx(i)} className="absolute inset-0 bg-black/20 flex items-center justify-center group/play cursor-pointer transition-colors hover:bg-black/30" aria-label="Videoyu oynat" type="button">
                                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl transition-transform group-hover/play:scale-110">
                                  <Play className="w-6 h-6 ml-0.5" style={{ color }} />
                                </div>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="px-4 pl-12 sm:px-5 sm:pl-14 py-3 sm:py-4 h-auto sm:h-[96px]">
                        <h3 className="font-display text-[1rem] font-extrabold text-slate-800 mb-1.5 leading-tight line-clamp-1">{v.title}</h3>
                        <p className="text-[0.82rem] text-slate-400 leading-relaxed line-clamp-2">{v.description}</p>
                      </div>
                    </div>
                    <div className="h-3 w-full" style={{ background: `linear-gradient(135deg, white 33.33%, transparent 33.33%) -6px 0, linear-gradient(225deg, white 33.33%, transparent 33.33%) -6px 0`, backgroundSize: "12px 12px", backgroundColor: color + "18" }} />
                  </div>
                </div>
              );
            })}
          </div>

          {videos.length > 3 && (
            <>
              <div className="relative -mt-44 h-52 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 0%, #E8F4FD 75%)" }} />
              <div className="relative z-20 flex justify-center -mt-10">
                <a href={data.ctaHref || "/platform"} className="btn-3d btn-3d-brand !text-[0.85rem] group">
                  {data.ctaLabel || "Tüm Video Dersleri Gör"} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </>
          )}
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   LEARNING STEPS — 6 Steps 3D Cards
   ═══════════════════════════════════════ */
function LearningStepsSection({ data }: { data: any }) {
  const steps = data.steps || [];
  const clsMap: Record<string, string> = {
    "#1B3A7B": "card-3d-brand", "#2ECC71": "card-3d-mint", "#7F63CB": "card-3d-lavender",
    "#EE7A45": "card-3d-peach", "#F5C518": "card-3d-gold",
  };
  return (
    <Section>
      <section className="py-24 bg-[#FFFBEB] relative overflow-hidden">
        <div className="absolute top-16 left-[10%] w-56 h-56 bg-gold-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-[5%] w-64 h-64 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-mint-100 text-mint-700 mb-4"><Layers className="w-3.5 h-3.5" /> {data.tag || "NASIL ÇALIŞIR"}</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              {data.title} <span className="highlight">{data.titleHighlight}</span>
            </h2>
            {data.description && <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">{data.description}</p>}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s: any, i: number) => {
              const Icon = getIcon(s.icon);
              const cls = clsMap[s.color] || "card-3d-brand";
              return (
                <div key={i} className={`anim d${Math.min(i + 1, 6)} card-3d ${cls} p-5 sm:p-7 relative`}>
                  <div className="absolute top-4 right-4 sm:top-5 sm:right-5 font-display text-4xl sm:text-5xl font-extrabold text-slate-200/40">{i + 1}</div>
                  <Icon className="w-7 h-7 mb-4 opacity-50" />
                  <h3 className="font-display text-lg font-extrabold text-slate-800 mb-2">{s.title}</h3>
                  <p className="text-[0.85rem] text-slate-500 leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   LEARNING MAP — Duolingo-style path
   ═══════════════════════════════════════ */
function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, 1 - (rect.top - vh * 0.5) / (vh * 0.7)));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
  return progress;
}

function LearningMapSection({ data }: { data: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const progress = useScrollProgress(containerRef);

  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, []);

  const nodeIcons: Record<string, any> = {
    "Temel Kavramlar": BookOpen, "İletişim Becerileri": MessageCircle, "Iletisim Becerileri": MessageCircle,
    "Empati Geliştirme": Heart, "Empati Gelistirme": Heart,
    "Takım Çalışması": Users, "Takim Calismasi": Users,
    "Problem Çözme": Puzzle, "Problem Cozme": Puzzle,
    "Mezuniyet": Trophy,
  };
  const statusColors: Record<string, { bg: string; shadow: string; glow: string; ring: string }> = {
    completed: { bg: "#1B3A7B", shadow: "#112755", glow: "rgba(27,58,123,0.3)", ring: "rgba(27,58,123,0.15)" },
    current: { bg: "#4D7EC4", shadow: "#1B3A7B", glow: "rgba(77,126,196,0.3)", ring: "rgba(77,126,196,0.15)" },
    locked: { bg: "#e2e8f0", shadow: "#cbd5e1", glow: "rgba(0,0,0,0.04)", ring: "rgba(0,0,0,0)" },
  };
  const completedColors = [
    { bg: "#1B3A7B", shadow: "#112755", glow: "rgba(27,58,123,0.3)", ring: "rgba(27,58,123,0.15)" },
    { bg: "#2ECC71", shadow: "#1F8E4E", glow: "rgba(46,204,113,0.3)", ring: "rgba(46,204,113,0.15)" },
    { bg: "#F5C518", shadow: "#B5910B", glow: "rgba(245,197,24,0.3)", ring: "rgba(245,197,24,0.15)" },
  ];

  const rawNodes = data.nodes || [];
  const nodes = rawNodes.map((n: any, i: number) => {
    const c = n.status === "completed" ? completedColors[i % completedColors.length] : statusColors[n.status] || statusColors.locked;
    return { ...n, ...c, icon: nodeIcons[n.title] || Sparkles };
  });

  const positions = [
    { x: 83, y: 90 }, { x: 250, y: 230 }, { x: 417, y: 90 },
    { x: 583, y: 230 }, { x: 750, y: 90 }, { x: 917, y: 230 },
  ];
  const svgPath = "M 83,90 C 150,90 183,230 250,230 C 317,230 350,90 417,90 C 484,90 516,230 583,230 C 650,230 683,90 750,90 C 817,90 850,230 917,230";
  const dashOffset = pathLength > 0 ? pathLength * (1 - Math.min(progress * 1.3, 1)) : pathLength;

  return (
    <section className="map-section py-24" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="tag bg-lavender-100 text-lavender-700 mb-4"><Rocket className="w-3.5 h-3.5" /> {data.tag || "ÖĞRENME YOLU"}</span>
          {data.title ? (
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight mt-3" dangerouslySetInnerHTML={{ __html: data.title }} />
          ) : (
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight mt-3">
              Adım adım <span className="highlight">ustalaşın</span>
            </h2>
          )}
          <p className="text-slate-400 text-[0.95rem] leading-relaxed">{data.description || "Kademeli öğrenme yoluyla sosyal becerilerde ilerleme sağlayın."}</p>
        </div>

        {/* Desktop SVG path */}
        <div className="hidden md:block relative overflow-x-auto pb-4">
          <div className="relative min-w-[700px] h-[360px] mx-auto max-w-[1000px]">
            <svg viewBox="0 0 1000 320" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1B3A7B" />
                  <stop offset="50%" stopColor="#2ECC71" />
                  <stop offset="100%" stopColor="#4D7EC4" />
                </linearGradient>
              </defs>
              <path d={svgPath} className="map-path-bg" />
              <path d={svgPath} className="map-path-dash" />
              {pathLength > 0 && <path ref={pathRef} d={svgPath} className="map-path-fill" strokeDasharray={pathLength} strokeDashoffset={dashOffset} />}
              {pathLength === 0 && <path ref={pathRef} d={svgPath} fill="none" stroke="transparent" />}
            </svg>
            {nodes.map((node: any, i: number) => {
              const pos = positions[i] || positions[positions.length - 1];
              const nodeProgress = progress * 1.3;
              const threshold = i / nodes.length;
              const isVisible = nodeProgress > threshold;
              const delay = i * 120;
              const NodeIcon = node.icon;
              return (
                <div key={i} className="absolute flex flex-col items-center" style={{ left: `${pos.x / 10}%`, top: `${pos.y / 3.2}%`, transform: "translate(-50%, -50%)" }}>
                  {node.status === "completed" && (
                    <div className="flex items-center gap-0.5 mb-1.5">
                      {[0, 1, 2].map((s) => <Star key={s} className={`w-3.5 h-3.5 fill-gold-400 text-gold-400 map-star ${isVisible ? "visible" : ""}`} style={{ transitionDelay: `${delay + 300 + s * 100}ms` }} />)}
                    </div>
                  )}
                  {node.status === "current" && (
                    <div className={`mb-1 map-star ${isVisible ? "visible" : ""}`} style={{ transitionDelay: `${delay + 300}ms` }}>
                      <Crown className="w-5 h-5 text-gold-400 fill-gold-400" />
                    </div>
                  )}
                  <div
                    className={`map-node map-node-enter ${isVisible ? "visible" : ""} ${node.status === "completed" ? "map-node-completed" : node.status === "current" ? "map-node-current" : "map-node-locked"}`}
                    style={{ background: node.bg, "--node-shadow": node.shadow, "--node-glow": node.glow, "--node-ring": node.ring, transitionDelay: `${delay}ms` } as React.CSSProperties}
                  >
                    {node.status === "locked" ? <Lock className="w-6 h-6 text-slate-400" /> : node.status === "completed" ? <CheckCircle2 className="w-7 h-7 text-white" /> : <NodeIcon className="w-7 h-7 text-white" />}
                  </div>
                  <p className={`mt-2 text-[0.75rem] font-bold text-center max-w-[90px] leading-tight map-node-enter ${isVisible ? "visible" : ""} ${node.status === "locked" ? "text-slate-300" : "text-slate-600"}`} style={{ transitionDelay: `${delay + 150}ms` }}>
                    {node.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden relative pl-8">
          <div className="absolute left-[22px] top-0 bottom-0 w-[3px] rounded-full bg-slate-200" />
          <div className="absolute left-[22px] top-0 w-[3px] rounded-full bg-gradient-to-b from-[#1B3A7B] via-[#2ECC71] to-[#4D7EC4] transition-all duration-700" style={{ height: `${Math.min(progress * 130, 100)}%` }} />
          <div className="space-y-6">
            {nodes.map((node: any, i: number) => {
              const nodeProgress = progress * 1.3;
              const threshold = i / nodes.length;
              const isVisible = nodeProgress > threshold;
              const NodeIcon = node.icon;
              return (
                <div key={i} className={`relative flex items-start gap-4 transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 -ml-8" style={{ background: node.bg, boxShadow: node.status !== "locked" ? `0 0 0 4px ${node.ring}, 0 4px 12px ${node.glow}` : "0 0 0 4px rgba(0,0,0,0.04)" }}>
                    {node.status === "locked" ? <Lock className="w-4 h-4 text-slate-400" /> : node.status === "completed" ? <CheckCircle2 className="w-5 h-5 text-white" /> : <NodeIcon className="w-5 h-5 text-white" />}
                  </div>
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className={`font-display font-extrabold text-[0.9rem] ${node.status === "locked" ? "text-slate-300" : "text-slate-700"}`}>{node.title}</h4>
                      {node.status === "completed" && <div className="flex items-center gap-0.5">{[0, 1, 2].map((s) => <Star key={s} className="w-3 h-3 fill-gold-400 text-gold-400" />)}</div>}
                      {node.status === "current" && <Crown className="w-4 h-4 text-gold-400 fill-gold-400" />}
                    </div>
                    <p className={`text-[0.78rem] ${node.status === "locked" ? "text-slate-300" : "text-slate-400"}`}>
                      {node.status === "completed" ? (data.labelCompleted || "Tamamlandı") : node.status === "current" ? (data.labelCurrent || "Devam ediyor") : (data.labelLocked || "Kilitli")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          {[{ color: "bg-mint-400", label: data.labelCompleted || "Tamamlandı" }, { color: "bg-lavender-400", label: data.labelCurrent || "Devam ediyor" }, { color: "bg-slate-200", label: data.labelLocked || "Kilitli" }].map((l: any, i: number) => (
            <div key={i} className="flex items-center gap-2 text-[0.78rem] font-semibold text-slate-400">
              <div className={`w-3 h-3 rounded-full ${l.color}`} /> {l.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   PRICING — 3 Plan Cards
   ═══════════════════════════════════════ */
function PricingSection({ data }: { data: any }) {
  const plans = data.plans || data.items || [];
  return (
    <Section>
      <section className="py-24 bg-[#ECFBF2] relative overflow-hidden">
        <div className="absolute top-20 right-[8%] w-72 h-72 bg-mint-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[5%] w-56 h-56 bg-gold-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 dots-pattern opacity-[0.06]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-gold-100 text-gold-700 mb-4"><Crown className="w-3.5 h-3.5" /> {data.tag || "KURSLARIMIZ"}</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              <span className="highlight">{data.title}</span> {data.titleHighlight}
            </h2>
            {data.description && <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">{data.description}</p>}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {plans.map((p: any, i: number) => {
              const cls = `card-3d-${p.cardClass || "brand"}`;
              const isPopular = p.popular === true || p.popular === "true";
              return (
                <div key={i} className={`anim d${i + 1} card-3d ${cls} p-5 sm:p-7 relative flex flex-col ${isPopular ? "ring-2 ring-mint-400 ring-offset-2" : ""}`}>
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="tag bg-mint-500 text-white font-bold">{data.popularLabel || "En Popüler"}</span>
                    </div>
                  )}
                  <h3 className="font-display text-xl font-extrabold text-slate-800 mb-1">{p.title}</h3>
                  <p className="text-[0.82rem] text-slate-400 font-medium mb-5">{p.subtitle}</p>
                  <ul className="space-y-3 mb-7 flex-1">
                    {(typeof p.features === "string" ? p.features.split("\n").filter(Boolean) : (p.features || [])).map((f: string, j: number) => (
                      <li key={j} className="flex items-start gap-2.5 text-[0.84rem] text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-mint-500 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={p.ctaHref || p.href || "/iletisim"} className={`btn-3d ${isPopular ? "btn-3d-mint" : "btn-3d-white"} w-full justify-center`}>
                    {p.cta || "Detaylı Bilgi Al"} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   TEAM — Scrolling team cards
   ═══════════════════════════════════════ */
function TeamSection({ data }: { data: any }) {
  const members = data.members || data.items || [];
  return (
    <Section>
      <section className="py-24 bg-[#ECFBF2] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute top-16 right-[10%] w-72 h-72 bg-[#2ECC71]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-[8%] w-60 h-60 bg-[#1B3A7B]/8 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-mint-100 text-mint-700 mb-4"><Users className="w-3.5 h-3.5" /> {data.tag || "EKİBİMİZ"}</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
              {data.title} <span className="text-gradient">{data.titleHighlight}</span>
            </h2>
            {data.description && <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">{data.description}</p>}
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #ECFBF2, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #ECFBF2, transparent)" }} />
            <div className="overflow-hidden">
              <div className="team-marquee-inner flex gap-4 sm:gap-7 w-max py-6 px-4 sm:px-8">
                {[...members, ...members].map((m: any, i: number) => {
                  const color = m.color || "#1B3A7B";
                  const bgMap: Record<string, string> = { "#1B3A7B": "#EBF2FB", "#2ECC71": "#ECFBF2", "#F5C518": "#FFFBEB", "#7F63CB": "#F0EDF9", "#EE7A45": "#FEF5F0" };
                  const bg = bgMap[color] || "#EBF2FB";
                  const memberImg = m.image || m.img;
                  return (
                    <div key={i} className="group flex-shrink-0 w-[220px] sm:w-[280px] cursor-pointer team-card-wrapper">
                      <div className="relative rounded-[1.25rem] overflow-hidden bg-white transition-all duration-500 group-hover:-translate-y-4" style={{ boxShadow: `0 4px 0 ${color}30, 0 8px 24px rgba(0,0,0,0.06)` }}>
                        <div className="relative h-[260px] sm:h-[320px] overflow-hidden" style={{ background: bg }}>
                          <img src={memberImg} alt={m.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to top, white, transparent)" }} />
                          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: color }} />
                        </div>
                        <div className="p-5 pt-0 -mt-4 relative z-10">
                          <h3 className="font-display text-[1.35rem] font-extrabold text-slate-800 leading-tight mb-1.5">{m.name}</h3>
                          <p className="text-[0.78rem] font-bold" style={{ color }}>{m.role || m.title}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   MATERIALS — A4 file cards (same as materials_scroll)
   ═══════════════════════════════════════ */
function MaterialsSection({ data }: { data: any }) {
  const colorMap: Record<string, { color: string; accent: string; bg: string }> = {
    "#1B3A7B": { color: "#1B3A7B", accent: "#4D7EC4", bg: "#EBF2FB" },
    "#2ECC71": { color: "#2ECC71", accent: "#69DC9A", bg: "#ECFBF2" },
    "#7F63CB": { color: "#7F63CB", accent: "#9F8AD8", bg: "#F0EDF9" },
    "#EE7A45": { color: "#EE7A45", accent: "#F49668", bg: "#FEF5F0" },
    "#F5C518": { color: "#F5C518", accent: "#FFDF66", bg: "#FFFBEB" },
    brand: { color: "#1B3A7B", accent: "#4D7EC4", bg: "#EBF2FB" },
    mint: { color: "#2ECC71", accent: "#69DC9A", bg: "#ECFBF2" },
    lavender: { color: "#7F63CB", accent: "#9F8AD8", bg: "#F0EDF9" },
    peach: { color: "#EE7A45", accent: "#F49668", bg: "#FEF5F0" },
    gold: { color: "#F5C518", accent: "#FFDF66", bg: "#FFFBEB" },
  };
  const items = data.items || [];
  return (
    <Section>
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-gold-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {data.title && (
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="anim"><span className="tag bg-brand-100 text-brand-700 mb-4"><Sparkles className="w-3.5 h-3.5" /> {data.tag || "MATERYALLER"}</span></div>
              <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight">
                {data.title} <span className="text-gradient">{data.titleHighlight}</span>
              </h2>
              {data.description && <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">{data.description}</p>}
            </div>
          )}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, white, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, white, transparent)" }} />
            <div className="material-marquee overflow-hidden">
              <div className="material-marquee-inner flex gap-5 sm:gap-8 w-max py-8 sm:py-12 px-4 sm:px-10">
                {[...items, ...items].map((c: any, i: number) => {
                  const Icon = getIcon(c.icon);
                  const cm = colorMap[c.color] || colorMap["#1B3A7B"];
                  const rawLines = c.features || c.lines;
                  const lines = Array.isArray(rawLines) ? rawLines : (typeof rawLines === 'string' ? rawLines.split('\n').filter(Boolean) : []);
                  return (
                    <div key={i} className="a4-file group relative flex-shrink-0 w-[200px] sm:w-[240px] cursor-pointer">
                      <div className="relative transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.08))" }}>
                        <div className="relative overflow-hidden" style={{ height: "340px", background: "#ffffff", clipPath: "polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)", borderRadius: "14px", border: `2px solid ${cm.accent}40` }}>
                          <div className="absolute inset-0 a4-lines" style={{ "--line-color": cm.accent + "18" } as React.CSSProperties} />
                          <div className="absolute top-0 bottom-0 left-[42px] w-[1.5px]" style={{ background: cm.color + "15" }} />
                          <div className="absolute top-0 right-0 w-[36px] h-[36px] z-10">
                            <div className="absolute inset-0" style={{ background: cm.bg, clipPath: "polygon(0 0, 100% 100%, 0 100%)" }} />
                            <div className="absolute inset-0" style={{ background: cm.accent + "20", clipPath: "polygon(0 0, 0 100%, 100% 100%)" }} />
                          </div>
                          <div className="relative z-10 px-5 pt-6 pb-3 flex items-end gap-3" style={{ borderBottom: `2px solid ${cm.accent}25` }}>
                            <div className="flex-1 min-w-0 pl-5">
                              <div className="flex items-center gap-2 mb-1">
                                <Icon className="w-4 h-4" style={{ color: cm.color }} />
                                <span className="text-[0.6rem] font-extrabold uppercase tracking-widest" style={{ color: cm.color }}>{c.count || ""}</span>
                              </div>
                              <h4 className="font-display font-extrabold text-[1.05rem] text-slate-800 leading-tight">{c.title || c.label}</h4>
                            </div>
                          </div>
                          <div className="relative z-10 px-5 pt-4 space-y-0">
                            {lines.map((line: string, j: number) => (
                              <div key={j} className="a4-content-line flex items-center gap-2.5 pl-5" style={{ height: "38px", animationDelay: `${j * 0.12}s` }}>
                                <div className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: cm.color }} />
                                <span className="text-[0.8rem] text-slate-600 font-medium">{line}</span>
                              </div>
                            ))}
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-[6px]" style={{ background: cm.color }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   BADGE STATS — Simple stat counters
   ═══════════════════════════════════════ */
function BadgeStatsSection({ data }: { data: any }) {
  const cardColors = ["card-3d card-3d-gold", "card-3d card-3d-brand", "card-3d card-3d-mint", "card-3d card-3d-lavender"];
  return (
    <Section>
      <section className="py-20 bg-[#FFFBEB] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.04]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {(data.items || []).map((item: any, i: number) => (
              <div key={i} className={`anim d${i + 1} ${cardColors[i % cardColors.length]} rounded-2xl p-4 sm:p-6 text-center`}>
                <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 mb-1">{item.value}</div>
                <p className="text-slate-500 text-xs font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   BADGE GALLERY — Category-grouped badges
   ═══════════════════════════════════════ */
function BadgeGallerySection({ data }: { data: any }) {
  const categories = data.categories || [];
  return (
    <Section>
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="space-y-12">
            {categories.map((cat: any, ci: number) => (
              <div key={ci}>
                <h3 className="anim font-display text-xl font-extrabold text-slate-800 mb-6 text-center">{cat.title}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {(cat.badges || []).map((badge: any, bi: number) => {
                    const Icon = getIcon(badge.icon);
                    const color = badge.color || "#F5C518";
                    return (
                      <div key={bi} className={`anim d${(bi % 6) + 1} bg-gradient-to-br from-[${color}]/10 to-[${color}]/5 rounded-2xl p-5 text-center border border-[${color}]/20 hover:shadow-md transition-all hover:-translate-y-1`} style={{ background: `linear-gradient(135deg, ${color}15, ${color}08)`, borderColor: `${color}30` }}>
                        <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: `${color}20` }}>
                          <Icon className="w-6 h-6" style={{ color }} />
                        </div>
                        <h4 className="font-display font-bold text-slate-800 text-sm">{badge.name}</h4>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ─── Piano Showcase Section ─── */
function PianoShowcaseSection({ data }: { data: any }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [pressedIdx, setPressedIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const d = data || {};
  const pianoTitle = d.title || 'Platformumuzu <span class="text-gradient">keşfedin</span>';
  const pianoDesc = d.description || "Her tuşa basın, farklı bir öğrenme deneyimini keşfedin.";
  const defaultKeys = [
    { title: "Tanıtım", desc: "Platformu tanıyın", youtubeId: "" },
    { title: "Etkileşimli", desc: "Animasyon içerikler", youtubeId: "" },
    { title: "Güvenlik", desc: "Güvenli ortam", youtubeId: "" },
  ];
  const keys: typeof defaultKeys = d.items?.length ? d.items.map((item: any, i: number) => ({
    title: item.title || defaultKeys[i]?.title || "",
    desc: item.description || item.desc || defaultKeys[i]?.desc || "",
    youtubeId: item.youtubeId || defaultKeys[i]?.youtubeId || "",
  })) : defaultKeys;

  const handleKeyClick = (idx: number) => {
    setPressedIdx(idx);
    setTimeout(() => setPressedIdx(null), 180);
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    setIsPlaying(false);
  };
  const handlePlay = () => { setIsPlaying(true); };
  const blackKeyPositions = keys.length <= 2 ? [] : Array.from({ length: keys.length - 1 }, (_, i) => i).filter((i) => { const mod = i % 7; return mod !== 2 && mod !== 6; });
  const whiteKeyH = 100 / keys.length;

  return (
    <Section>
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-16 right-[8%] w-60 h-60 bg-brand-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-[5%] w-52 h-52 bg-lavender-200/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="anim"><span className="tag bg-brand-100 text-brand-700 mb-4"><Play className="w-3.5 h-3.5" /> {data.tag || "İNTERAKTİF VİTRİN"}</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: pianoTitle }} />
            <p className="anim d2 text-slate-400 text-[0.95rem] leading-relaxed">{pianoDesc}</p>
          </div>
          <div className="anim d3 relative">
            <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 6px 40px rgba(26,26,46,0.16)" }}>
              <div className="flex flex-col md:flex-row" style={{ minHeight: "auto" }}>
                {/* Piano Keyboard */}
                <div className="md:w-[200px] lg:w-[270px] flex-shrink-0 relative select-none overflow-hidden h-[200px] md:h-auto" style={{ minHeight: "auto" }}>
                  <div className="relative h-full" style={{ background: "#111118" }}>
                    {keys.map((key, i) => {
                      const isActive = i === activeIdx;
                      const isPressed = i === pressedIdx;
                      const pushed = isPressed || (isActive && pressedIdx === i);
                      return (
                        <button key={i} onClick={() => handleKeyClick(i)} className="absolute left-0 w-full cursor-pointer" style={{ top: `${i * whiteKeyH}%`, height: `${whiteKeyH}%`, zIndex: 1, padding: "1px 0" }}>
                          <div className="relative w-full h-full transition-all" style={{
                            transitionDuration: pushed ? "60ms" : "200ms",
                            borderRadius: "0 10px 10px 0",
                            background: isActive ? "linear-gradient(90deg, #e8eeff 0%, #f0f4ff 60%, #dce6f8 100%)" : pushed ? "linear-gradient(90deg, #e0e0e0 0%, #d8d8d8 100%)" : "linear-gradient(90deg, #f8f8f8 0%, #ffffff 40%, #f5f5f5 80%, #ededed 100%)",
                            boxShadow: pushed ? "inset 0 0 8px rgba(0,0,0,0.08)" : isActive ? "0 3px 12px rgba(27,58,123,0.15), inset 0 -4px 0 #b8cce6" : "inset 0 -5px 0 #d0d0d0, 0 2px 4px rgba(0,0,0,0.04)",
                            transform: pushed ? "scaleX(0.98) translateX(-2px)" : "scaleX(1)",
                            transformOrigin: "left center",
                            borderRight: isActive ? "4px solid #1B3A7B" : "2px solid #c8c8c8",
                          }}>
                            <div className="absolute inset-0 flex items-center pl-5 lg:pl-6 pr-14">
                              <span className="font-display text-[0.82rem] lg:text-[0.88rem] font-extrabold tracking-wide" style={{ color: isActive ? "#1B3A7B" : "#78788a" }}>{key.title}</span>
                            </div>
                            {isActive && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: "#1B3A7B", boxShadow: "0 0 8px 2px rgba(27,58,123,0.35)" }} />}
                          </div>
                        </button>
                      );
                    })}
                    {blackKeyPositions.map((pos) => (
                      <div key={`bk-${pos}`} className="absolute z-[3] pointer-events-none" style={{ right: 0, top: `${(pos + 1) * whiteKeyH - whiteKeyH * 0.2}%`, width: "42%", height: `${whiteKeyH * 0.4}%`, minHeight: 20 }}>
                        <div className="w-full h-full rounded-l-md" style={{ background: "linear-gradient(90deg, #1e1e24, #18181e, #111116)", boxShadow: "inset 0 -3px 0 #0a0a0e, 0 3px 8px rgba(0,0,0,0.5)" }} />
                      </div>
                    ))}
                    <div className="absolute top-0 bottom-0 right-0 w-2 z-[4] pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.15))" }} />
                  </div>
                </div>
                {/* Video Player */}
                <div className="flex-1 relative bg-[#0A0F1C] flex flex-col">
                  <div className="relative flex-1 min-h-[260px]">
                    {isPlaying && keys[activeIdx]?.youtubeId ? (
                      <iframe
                        key={keys[activeIdx]?.youtubeId}
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${keys[activeIdx].youtubeId}?autoplay=1&rel=0`}
                        title={keys[activeIdx]?.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        {keys[activeIdx]?.youtubeId && (
                          <img src={`https://img.youtube.com/vi/${keys[activeIdx].youtubeId}/maxresdefault.jpg`} alt={keys[activeIdx]?.title} className="absolute inset-0 w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center cursor-pointer group/play" onClick={handlePlay}>
                          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C]/60 via-[#0A0F1C]/20 to-[#0A0F1C]/70" />
                          <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className="rounded-full flex items-center justify-center transition-all duration-300 group-hover/play:scale-110" style={{ width: 72, height: 72, background: "rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
                              <Play className="w-7 h-7 text-[#1B3A7B] ml-1" fill="#1B3A7B" />
                            </div>
                            <div className="text-center">
                              <p className="text-white font-display font-bold text-[0.95rem]">{keys[activeIdx]?.title}</p>
                              <p className="text-white/45 text-[0.78rem] mt-0.5 max-w-[280px]">{keys[activeIdx]?.desc}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] animate-pulse" />
                      <span className="text-white/70 text-[0.7rem] font-semibold">{activeIdx + 1} / {keys.length}</span>
                    </div>
                  </div>
                  <div className="px-5 py-3.5 flex items-center justify-between" style={{ background: "linear-gradient(180deg, #0c1020, #0F1629)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    <span className="text-white/50 text-[0.75rem] font-medium truncate">{keys[activeIdx]?.desc}</span>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {keys.map((_: any, i: number) => (
                        <button key={i} onClick={() => handleKeyClick(i)} className="transition-all duration-200 rounded-full" style={{ width: i === activeIdx ? 24 : 8, height: 8, background: i === activeIdx ? "#1B3A7B" : "rgba(255,255,255,0.08)" }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ─── Manifesto Section (Tabbed) ─── */
function ManifestoSection({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState(0);
  const md = data || {};
  const mfTitle = md.title || 'Bütünsel bir müfredatla <span class="text-gradient">yaşam becerileriyle</span> güçlendiriyoruz.';
  const defaultTabs = [
    { label: "Neden Önemli?", content: "Hayat sadece sınavlardan ibaret değildir. O anlarda onları ayakta tutacak şey; özgüven, empati, farkındalık ve duygusal dayanıklılık olacaktır." },
    { label: "Mevcut Durum", content: "Bugün Türkiye'de bu becerilere dair hâlâ sistemli bir eğitim modeli yok. Duygusal gelişim birçok okulda hâlâ \"ekstra\" olarak görülüyor." },
    { label: "Çözümümüz", content: "LearnecoHub olarak bu eksik halkayı tamamlayan bütünsel bir öğrenme müfredatı sunuyoruz.\n\n• Sosyal-duygusal becerilere dayalı müfredat\n• Okullara özel içerik ve destek sistemi\n• Uzman eşliğinde bireysel ve grup uygulamaları" },
    { label: "Vizyonumuz", content: "Amacımız: Çocuklara yalnızca bilgi değil, yaşamı taşıyacak beceriler kazandırmak." },
  ];
  const tabColors = [
    { color: "#1B3A7B", bg: "#EBF2FB", accent: "#4D7EC4" },
    { color: "#F5C518", bg: "#FFFBEB", accent: "#FFDF66" },
    { color: "#2ECC71", bg: "#ECFBF2", accent: "#69DC9A" },
    { color: "#7F63CB", bg: "#F0EDF9", accent: "#9F8AD8" },
  ];
  const tabIcons = [Heart, TrendingUp, Sparkles, Rocket];
  const tabsData = md.tabs?.length ? md.tabs.map((t: any, i: number) => ({
    label: t.label || defaultTabs[i]?.label || "", content: t.content || defaultTabs[i]?.content || "",
    ...tabColors[i % tabColors.length], icon: tabIcons[i % tabIcons.length],
  })) : defaultTabs.map((t, i) => ({ ...t, ...tabColors[i], icon: tabIcons[i] }));

  return (
    <Section>
      <section className="py-24 bg-[#D0DFEF] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute top-20 left-[8%] w-80 h-80 bg-[#4D7EC4]/20 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="anim"><span className="tag bg-brand-100 text-brand-700 mb-4"><Heart className="w-3.5 h-3.5" /> {data.tag || "MİSYONUMUZ"}</span></div>
            <h2 className="anim d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 tracking-tight leading-[1.12]" dangerouslySetInnerHTML={{ __html: mfTitle }} />
          </div>
          <div className="anim d2">
            <div className="flex justify-start sm:justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
              {tabsData.map((t: any, i: number) => {
                const active = activeTab === i;
                const TabIcon = t.icon;
                return (
                  <button key={i} onClick={() => setActiveTab(i)} className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl font-display font-bold text-[0.78rem] sm:text-[0.88rem] transition-all duration-300 border-2 flex-shrink-0 whitespace-nowrap" style={{
                    background: active ? t.color : "white", color: active ? "#fff" : "#64748B",
                    borderColor: active ? t.color : "#E2E8F0",
                    boxShadow: active ? `0 4px 0 ${t.accent}55, 0 8px 20px ${t.color}20` : "0 2px 0 #E2E8F0",
                  }}>
                    <TabIcon className="w-4 h-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>
            <div className="rounded-2xl p-5 sm:p-8 md:p-10 bg-white/80 backdrop-blur-sm" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div className="space-y-4">
                {(tabsData[activeTab]?.content as string || "").split("\n").filter(Boolean).map((line: string, j: number) => {
                  if (line.startsWith("• ") || line.startsWith("- ")) {
                    return (
                      <div key={j} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#ECFBF2] border border-[#A3EBC1]/40">
                        <CheckCircle2 className="w-4.5 h-4.5 text-[#2ECC71] flex-shrink-0 mt-0.5" />
                        <span className="text-[0.85rem] text-slate-700 font-medium leading-snug">{line.slice(2)}</span>
                      </div>
                    );
                  }
                  return <p key={j} className="text-[1.05rem] text-slate-700 leading-[1.9] font-medium">{line}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ─── Impact Banner Section ─── */
function ImpactBannerSection({ data }: { data: any }) {
  const d = data || {};
  const ibTitle = d.title || 'Çocuğunuzun sosyal becerilerde <span class="highlight">zorlandığını</span> fark ediyor musunuz?';
  const ibDesc = d.description || "Uzman ekibimizle çocuğunuzun duygusal zeka, iletişim ve özgüven gibi becerilerini geliştiriyoruz.";
  const ibCta = d.cta || { label: "Ücretsiz Web Seminerine Kaydolun", href: "#cta" };
  return (
    <Section>
      <section className="py-20 bg-[#FFFBEB] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-[0.12]" />
        <div className="absolute top-16 right-[8%] w-60 h-60 bg-gold-200/35 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h2 className="anim font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 mb-3 tracking-tight" dangerouslySetInnerHTML={{ __html: ibTitle }} />
          <p className="anim d1 text-slate-500 text-[0.95rem] leading-relaxed max-w-2xl mx-auto mb-7">{ibDesc}</p>
          <a href={ibCta.href || "#cta"} className="anim d2 btn-3d btn-3d-brand">{ibCta.label || "Ücretsiz Web Seminerine Kaydolun"} <ArrowRight className="w-5 h-5" /></a>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   PDF ARCHIVE — Downloadable PDF grid
   ═══════════════════════════════════════ */
interface PdfFile {
  id: string;
  name: string;
  fileName: string;
  mimeType: string;
  size: number;
  url: string;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function PdfArchiveSection({ data }: { data: any }) {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [loading, setLoading] = useState(true);
  const folderName = data.folderName || "arsiv";

  useEffect(() => {
    fetch(`/api/arsiv?folder=${folderName}&t=${Date.now()}`)
      .then((r) => {
        if (!r.ok) throw new Error(`arsiv API ${r.status}`);
        return r.json();
      })
      .then((items) => {
        console.log("[PdfArchive] loaded", items.length, "files");
        setFiles(Array.isArray(items) ? items : []);
        setLoading(false);
      })
      .catch((e) => { console.error("[PdfArchive] fetch error:", e); setLoading(false); });
  }, [folderName]);

  return (
    <Section>
      <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-brand-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[8%] w-56 h-56 bg-lavender-200/20 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {data.title && (
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="anim font-display text-3xl sm:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
                {data.title}{" "}
                {data.titleHighlight && <span className="text-[#F5C518]">{data.titleHighlight}</span>}
              </h2>
              {data.description && <p className="anim d1 text-slate-400 text-[0.95rem] leading-relaxed">{data.description}</p>}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-8 h-8 border-3 border-brand-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Henüz arşivde dosya bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map((file, i) => (
                <div key={file.id} className={`anim d${(i % 6) + 1}`}>
                  <div className="relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                    {/* Notebook top bar */}
                    <div className="h-10 flex items-center px-4 bg-gradient-to-r from-[#1B3A7B] to-[#4D7EC4]">
                      <div className="w-5 h-5 rounded-full border-[2.5px] border-white/60 bg-transparent" />
                      <div className="ml-auto flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/20">
                        <span className="text-[0.65rem] font-bold text-white/90 uppercase tracking-wide">PDF</span>
                      </div>
                    </div>
                    {/* Notebook lines bg */}
                    <div className="relative" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #e8e8e8 27px, #e8e8e8 28px)", backgroundPosition: "0 12px" }}>
                      <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-red-300/40 pointer-events-none" />
                      <div className="px-4 pl-12 sm:px-6 sm:pl-14 py-4 sm:py-6">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-red-500" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-display font-bold text-slate-800 text-sm leading-tight line-clamp-2">{file.name}</h3>
                            <p className="text-xs text-slate-400 mt-1">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#1B3A7B] hover:bg-[#152D63] transition-colors"
                          style={{ boxShadow: "0 3px 0 #11244B, 0 4px 10px rgba(27,58,123,0.2)" }}
                        >
                          <Download className="w-3.5 h-3.5" />
                          İndir
                        </a>
                      </div>
                    </div>
                    {/* Bottom colored strip */}
                    <div className="h-1.5 bg-gradient-to-r from-[#1B3A7B] to-[#4D7EC4]" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   PARTNER LOGOS — Scrolling logo marquee
   ═══════════════════════════════════════ */
function PartnerLogosSection({ data }: { data: any }) {
  const [logos, setLogos] = useState<any[]>([]);
  useEffect(() => {
    fetch(`/api/partner-logos?t=${Date.now()}`)
      .then((r) => r.json())
      .then((items) => setLogos(items))
      .catch(() => {});
  }, []);

  const displayLogos = logos.length > 0 ? logos : (data.items || []);
  if (displayLogos.length === 0) return null;

  const brandColors = ["#1B3A7B", "#2ECC71", "#7F63CB", "#EE7A45", "#F5C518", "#4D7EC4"];
  return (
    <Section>
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {data.title && (
            <div className="text-center mb-10">
              <h2 className="anim font-display text-xl sm:text-2xl font-extrabold text-slate-800">{data.title}{data.titleHighlight && <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>}</h2>
              {data.description && <p className="anim d1 text-slate-400 text-sm mt-2">{data.description}</p>}
            </div>
          )}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, white, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, white, transparent)" }} />
            <div className="logo-marquee overflow-hidden">
              <div className="flex gap-6 animate-marquee">
                {[...displayLogos, ...displayLogos].map((logo: any, i: number) => {
                  const color = brandColors[i % brandColors.length];
                  const name = logo.name || logo.title || "";
                  const imgSrc = logo.imageData
                    ? (logo.imageData.startsWith("data:") ? logo.imageData : `data:${logo.mimeType || "image/png"};base64,${logo.imageData}`)
                    : logo.fileName ? `/logos/${logo.fileName}` : logo.image;
                  return (
                    <div key={i} className="flex-shrink-0 w-[160px] h-[80px] rounded-xl border border-slate-100 bg-white flex items-center justify-center p-3 hover:border-slate-200 hover:shadow-sm transition-all">
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={name}
                          className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            const el = e.target as HTMLImageElement;
                            el.style.display = "none";
                            el.nextElementSibling?.classList.remove("hidden");
                          }}
                        />
                      ) : null}
                      <span className={`font-display font-bold text-sm text-center leading-tight ${imgSrc ? "hidden" : ""}`} style={{ color }}>{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

/* ═══════════════════════════════════════
   CLOUD DIVIDER — animated transition strip
   ═══════════════════════════════════════ */
function CloudDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`relative z-30 overflow-hidden pointer-events-none h-16 sm:h-24 -my-8 sm:-my-12 ${flip ? "rotate-180" : ""}`}>
      <div className="cloud-scroll-wrap flex">
        <div className="flex flex-shrink-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <img key={`a${i}`} src="/bulut.png" alt="" className="h-16 sm:h-24 w-auto flex-shrink-0" draggable={false} />
          ))}
        </div>
        <div className="flex flex-shrink-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <img key={`b${i}`} src="/bulut.png" alt="" className="h-16 sm:h-24 w-auto flex-shrink-0" draggable={false} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Section types after which a cloud divider should appear
const cloudAfterTypes = new Set(["stats", "manifesto", "teacher_tools", "badge_stats"]);

export const sectionRenderers: Record<string, (data: any) => React.ReactNode> = {
  subpage_hero: () => <></>, // Handled separately
  hero: () => <></>, // Main page hero, handled separately
  mission: (data) => <ClipboardSection data={data} />,
  student_features: (data) => <FeatureShowcaseSection data={data} />,
  teacher_tools: (data) => <ToolkitSection data={data} />,
  school_features: (data) => <StickyNotesSection data={data} />,
  family_features: (data) => <WarmCardsSection data={data} />,
  skill_areas: (data) => <NotebookCardsSection data={data} />,
  stats: (data) => <StatsSection data={data} />,
  bento_grid: (data) => <BentoGridSection data={data} />,
  faq: (data) => <FAQSection data={data} />,
  faq_parents: (data) => <FAQSection data={data} />,
  blog_list: () => <></>, // Blog page has its own implementation
  contact_form: (data) => <ContactFormSection data={data} />,
  badge_collection: (data) => <BadgeCollectionSection data={data} />,
  free_banner: (data) => <FreeBannerSection data={data} />,
  final_cta: (data) => <FinalCTA data={data} />,
  footer: () => <></>, // Footer is rendered in layout, data used there
  testimonials: (data) => <TestimonialsSection data={data} />,
  team_grid: (data) => <TeamGridSection data={data} />,
  youtube_showcase: (data) => <YoutubeShowcaseSection data={data} />,
  materials_scroll: (data) => <MaterialsScrollSection data={data} />,
  video_showcase: (data) => <VideoShowcaseSection data={data} />,
  learning_steps: (data) => <LearningStepsSection data={data} />,
  learning_map: (data) => <LearningMapSection data={data} />,
  pricing: (data) => <PricingSection data={data} />,
  team: (data) => <TeamSection data={data} />,
  materials: (data) => <MaterialsSection data={data} />,
  badge_stats: (data) => <BadgeStatsSection data={data} />,
  badge_gallery: (data) => <BadgeGallerySection data={data} />,
  piano_showcase: (data) => <PianoShowcaseSection data={data} />,
  manifesto: (data) => <ManifestoSection data={data} />,
  impact_banner: (data) => <ImpactBannerSection data={data} />,
  pdf_archive: (data) => <PdfArchiveSection data={data} />,
  partner_logos: (data) => <PartnerLogosSection data={data} />,
};

export function DynamicPage({ slug, navActive }: { slug: string; navActive: string }) {
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/pages/${slug}?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((data) => {
        setPage(data);
        setLoading(false);
      })
      .catch(() => {
        setPage(null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400 text-sm">Yükleniyor...</div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400 text-sm">Sayfa bulunamadı.</div>
      </div>
    );
  }

  const sections = [...(page.sections || [])].sort((a: any, b: any) => a.order - b.order);
  const heroSection = sections.find((s: any) => s.sectionType === "subpage_hero");
  let heroData: any = null;
  try { if (heroSection) heroData = JSON.parse(heroSection.content); } catch {}
  const footerSection = sections.find((s: any) => s.sectionType === "footer");
  let footerData: any = undefined;
  try { if (footerSection) footerData = JSON.parse(footerSection.content); } catch {}

  return (
    <>
      <SubpageNavbar active={navActive} />
      {heroData && (
        <SubpageHero
          breadcrumb={heroData.breadcrumb}
          tag={heroData.tag}
          tagIcon={getIcon(heroData.tagIcon)}
          title={heroData.title}
          titleHighlight={heroData.titleHighlight}
          description={heroData.description}
          theme={(heroData.theme || "brand") as HeroTheme}
        />
      )}
      {(() => {
        const typeCounters: Record<string, number> = {};
        const filtered = sections.filter((s: any) => s.sectionType !== "subpage_hero" && s.sectionType !== "footer");
        const elements: React.ReactNode[] = [];
        // Generate anchor slug from section title
        const toSlug = (title: string) =>
          title.toLowerCase()
            .replace(/ş/g,"s").replace(/ç/g,"c").replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ö/g,"o").replace(/ı/g,"i")
            .replace(/İ/g,"i").replace(/Ş/g,"s").replace(/Ç/g,"c").replace(/Ğ/g,"g").replace(/Ü/g,"u").replace(/Ö/g,"o")
            .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        filtered.forEach((section: any, idx: number) => {
          const renderer = sectionRenderers[section.sectionType];
          if (!renderer) return;
          let data: any = {};
          try { data = JSON.parse(section.content); } catch {}
          const typeCount = typeCounters[section.sectionType] || 0;
          typeCounters[section.sectionType] = typeCount + 1;
          data.__variant = typeCount;
          data.__sectionIndex = idx;
          const anchorId = toSlug(section.title || "");
          elements.push(<div key={section.id} id={anchorId}>{renderer(data)}</div>);
          if (cloudAfterTypes.has(section.sectionType)) {
            elements.push(<CloudDivider key={`cloud-${section.id}`} />);
          }
        });
        return elements;
      })()}
      <SubpageFooter data={footerData} />
    </>
  );
}
