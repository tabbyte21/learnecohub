"use client";

/**
 * Curriculum-specific section renderers
 * Designed to match the site's existing design language:
 * - 3D card effects, brand colors, Poppins font, Tailwind classes
 * New section types:
 *   chat_qa        — Interactive chat-bubble Q&A (accordion)
 *   curriculum_info — Info chips (yaş grubu, süre, seviye…)
 *   lesson_grid    — Weekly / lesson plan cards
 *   objectives_list — Learning objectives numbered list
 */

import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen, Clock, Users, Star, ChevronDown, ChevronUp,
  MessageCircle, Send, CheckCircle2, Sparkles, Target,
  GraduationCap, Brain, Heart, Zap, Award, Lightbulb,
  Play, Puzzle, Trophy, Compass, Layers, Shield, Globe,
  Monitor, TrendingUp, Headphones, PenTool,
} from "lucide-react";
import type { ElementType } from "react";

// ── Icon resolver ────────────────────────────────────────────────────────────

const iconMap: Record<string, ElementType> = {
  BookOpen, Clock, Users, Star, MessageCircle, Send, CheckCircle2, Sparkles,
  Target, GraduationCap, Brain, Heart, Zap, Award, Lightbulb,
  Play, Puzzle, Trophy, Compass, Layers, Shield, Globe, Monitor,
  TrendingUp, Headphones, PenTool,
};
function getIcon(name: string): ElementType {
  return iconMap[name] || Sparkles;
}

// ── Theme helpers ─────────────────────────────────────────────────────────────

const themeHex: Record<string, string> = {
  brand: "#1B3A7B",
  mint: "#16794A",
  lavender: "#5B41A8",
  gold: "#D97706",
  peach: "#C2410C",
};

const accentHex: Record<string, string> = {
  brand: "#4D7EC4",
  mint: "#2ECC71",
  lavender: "#7F63CB",
  gold: "#F5C518",
  peach: "#EE7A45",
};

// Cycle through accent colors for variety
const cycleColors = ["brand", "mint", "lavender", "gold", "peach"];

// ── 1. chat_qa — Animated auto-playing chat Q&A ──────────────────────────────

interface QAItem {
  question: string;
  answer: string;
  questionColor?: string;
  answerColor?: string;
}

const qBgMap: Record<string, string> = {
  brand: "#EBF2FB", mint: "#E8F8F1", lavender: "#F0EDFB",
  gold: "#FFFBEB", peach: "#FEF0E8",
};
const qTextMap: Record<string, string> = {
  brand: "#1B3A7B", mint: "#16794A", lavender: "#5B41A8",
  gold: "#92400E", peach: "#9A3412",
};
const aBgMap: Record<string, string> = {
  brand: "#1B3A7B", mint: "#16794A", lavender: "#5B41A8",
  gold: "#D97706", peach: "#C2410C",
};

function ChatQASection({ data }: { data: any }) {
  const items: QAItem[] = data.items || [];
  const heroColor: string = data.__heroColor || "brand";
  const [activeIdx, setActiveIdx] = useState(0);
  const [chatPhase, setChatPhase] = useState<"question" | "typing" | "answer">("question");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const activeIdxRef = useRef(0);

  const headerHex = themeHex[heroColor] || themeHex.brand;

  function clearTimers() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  function triggerQuestion(idx: number) {
    if (items.length === 0) return;
    clearTimers();
    const clamped = ((idx % items.length) + items.length) % items.length;
    activeIdxRef.current = clamped;
    setActiveIdx(clamped);
    setChatPhase("question");
    const t1 = setTimeout(() => setChatPhase("typing"), 700);
    const t2 = setTimeout(() => {
      setChatPhase("answer");
      const t3 = setTimeout(() => triggerQuestion(activeIdxRef.current + 1), 3800);
      timersRef.current.push(t3);
    }, 2300);
    timersRef.current.push(t1, t2);
  }

  useEffect(() => {
    if (items.length === 0) return;
    const t = setTimeout(() => triggerQuestion(0), 400);
    return () => { clearTimeout(t); clearTimers(); };
  }, []);

  const activeItem = items[activeIdx];
  const qColor = activeItem?.questionColor || cycleColors[activeIdx % cycleColors.length];
  const aColor = activeItem?.answerColor || "brand";

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 55%)" }}>
      <style>{`
        @keyframes chatSlideLeft {
          from { opacity: 0; transform: translateX(-22px) scale(0.96); }
          to   { opacity: 1; transform: translateX(0)    scale(1);    }
        }
        @keyframes chatSlideRight {
          from { opacity: 0; transform: translateX(22px) scale(0.96); }
          to   { opacity: 1; transform: translateX(0)    scale(1);    }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0);    opacity: 0.35; }
          30%            { transform: translateY(-6px); opacity: 1;    }
        }
        .chat-left  { animation: chatSlideLeft  0.38s cubic-bezier(0.34,1.5,0.64,1) both; }
        .chat-right { animation: chatSlideRight 0.38s cubic-bezier(0.34,1.5,0.64,1) both; }
        .t-dot      { animation: typingDot 1.3s ease-in-out infinite; }
      `}</style>

      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-[0.07] blur-3xl pointer-events-none"
        style={{ background: headerHex }} />
      <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: "#F5C518" }} />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          {data.tag && (
            <span className="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full mb-4"
              style={{ background: headerHex + "18", color: headerHex }}>
              <MessageCircle className="w-3.5 h-3.5" />
              {data.tag}
            </span>
          )}
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800">
            {data.title}
            {data.titleHighlight && (
              <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>
            )}
          </h2>
          {data.description && (
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">{data.description}</p>
          )}
        </div>

        {/* ── Chat window ── */}
        <div className="rounded-3xl overflow-hidden mb-8"
          style={{ boxShadow: `0 24px 64px ${headerHex}20, 0 4px 16px rgba(0,0,0,0.07)`, border: "1px solid rgba(0,0,0,0.07)" }}>

          {/* Title bar */}
          <div className="flex items-center gap-3 px-5 py-3.5" style={{ background: headerHex }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white/25" />
              <div className="w-3 h-3 rounded-full bg-white/25" />
              <div className="w-3 h-3 rounded-full bg-white/25" />
            </div>
            <div className="flex-1 flex items-center justify-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold text-sm">Uzman Psikolog</span>
              <span className="flex items-center gap-1 text-white/60 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Çevrimiçi
              </span>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex flex-col gap-4 px-5 py-6 min-h-[240px]"
            style={{ background: `linear-gradient(180deg, ${headerHex}09 0%, #F7F9FF 100%)` }}>

            {/* Question bubble — user, left */}
            {activeItem && (
              <div key={`q-${activeIdx}`} className="flex items-end gap-2.5 chat-left">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm"
                  style={{ background: qBgMap[qColor] || "#EBF2FB" }}>
                  <Users className="w-4 h-4" style={{ color: qTextMap[qColor] || "#1B3A7B" }} />
                </div>
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-3 bg-white shadow-sm"
                  style={{ borderLeft: `3px solid ${qTextMap[qColor] || "#1B3A7B"}35` }}>
                  <p className="font-semibold text-sm leading-relaxed text-slate-700">
                    {activeItem.question}
                  </p>
                </div>
              </div>
            )}

            {/* Typing indicator */}
            {chatPhase === "typing" && (
              <div key={`typing-${activeIdx}`} className="flex items-end gap-2.5 justify-end chat-right">
                <div className="bg-white rounded-2xl rounded-br-sm px-5 py-3.5 shadow-sm">
                  <div className="flex gap-1.5 items-center h-4">
                    <div className="t-dot w-2 h-2 rounded-full" style={{ background: headerHex, animationDelay: "0ms" }} />
                    <div className="t-dot w-2 h-2 rounded-full" style={{ background: headerHex, animationDelay: "190ms" }} />
                    <div className="t-dot w-2 h-2 rounded-full" style={{ background: headerHex, animationDelay: "380ms" }} />
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: aBgMap[aColor] || headerHex }}>
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
              </div>
            )}

            {/* Answer bubble — expert, right */}
            {chatPhase === "answer" && activeItem && (
              <div key={`a-${activeIdx}`} className="flex items-end gap-2.5 justify-end chat-right">
                <div className="max-w-[80%] rounded-2xl rounded-br-sm px-4 py-3 shadow-md"
                  style={{ background: aBgMap[aColor] || headerHex }}>
                  <p className="text-white/95 text-sm leading-relaxed">{activeItem.answer}</p>
                </div>
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: aBgMap[aColor] || headerHex }}>
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Fake input bar */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white border-t border-slate-100">
            <div className="flex-1 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center px-4">
              <span className="text-slate-400 text-xs select-none">Aşağıdan bir soru seçin...</span>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: headerHex }}>
              <Send className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* ── Question chips (fixed questions) ── */}
        {items.length > 0 && (
          <>
            <p className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4 select-none">
              Sıkça sorulan sorular
            </p>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {items.map((item, i) => {
                const col = item.questionColor || cycleColors[i % cycleColors.length];
                const isActive = activeIdx === i;
                return (
                  <button
                    key={i}
                    onClick={() => triggerQuestion(i)}
                    className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                      isActive
                        ? "shadow-md -translate-y-0.5"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:shadow-sm hover:-translate-y-0.5"
                    }`}
                    style={isActive ? {
                      background: qBgMap[col] || "#EBF2FB",
                      color: qTextMap[col] || "#1B3A7B",
                      borderColor: (qTextMap[col] || "#1B3A7B") + "45",
                    } : {}}
                  >
                    {item.question}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// ── 2. curriculum_info — Metadata info cards ─────────────────────────────────

interface InfoItem {
  icon: string;
  label: string;
  value: string;
  color?: string;
}

function CurriculumInfoSection({ data }: { data: any }) {
  const items: InfoItem[] = data.items || [];
  const heroColor: string = data.__heroColor || "brand";

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-6">
        {(data.title || data.description) && (
          <div className="text-center mb-10">
            {data.title && (
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800">
                {data.title}
                {data.titleHighlight && (
                  <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>
                )}
              </h2>
            )}
            {data.description && (
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">{data.description}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, i) => {
            const col = item.color || cycleColors[i % cycleColors.length];
            const Icon = getIcon(item.icon);
            const hexMain = themeHex[col] || themeHex.brand;
            const hexAccent = accentHex[col] || accentHex.brand;
            return (
              <div key={i}
                className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-slate-100"
                style={{ borderBottom: `4px solid ${hexMain}` }}>
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center"
                  style={{ background: hexMain + "18" }}>
                  <Icon className="w-5 h-5" style={{ color: hexMain }} />
                </div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
                  {item.label}
                </p>
                <p className="font-bold text-slate-800 text-sm leading-snug">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 3. lesson_grid — Weekly lesson plan ──────────────────────────────────────

interface LessonItem {
  week?: number | string;
  title: string;
  description?: string;
  topics?: string[];
  color?: string;
  icon?: string;
}

function LessonGridSection({ data }: { data: any }) {
  const items: LessonItem[] = data.items || [];
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 dots-pattern opacity-[0.03] pointer-events-none" />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          {data.tag && (
            <span className="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full mb-4"
              style={{ background: "#E8F8F1", color: "#16794A" }}>
              <Layers className="w-3.5 h-3.5" />
              {data.tag}
            </span>
          )}
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800">
            {data.title}
            {data.titleHighlight && (
              <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>
            )}
          </h2>
          {data.description && (
            <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const col = item.color || cycleColors[i % cycleColors.length];
            const hexMain = themeHex[col] || themeHex.brand;
            const Icon = getIcon(item.icon || "BookOpen");
            const isOpen = expanded === i;

            return (
              <div key={i}
                className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all"
                style={{ borderBottom: `4px solid ${hexMain}` }}>
                {/* Card header */}
                <button
                  className="w-full flex items-start gap-4 p-5 text-left group"
                  onClick={() => setExpanded(isOpen ? null : i)}
                >
                  {/* Week badge */}
                  <div className="w-11 h-11 rounded-xl flex-shrink-0 flex flex-col items-center justify-center text-white font-bold text-xs shadow-sm"
                    style={{ background: hexMain }}>
                    {item.week !== undefined ? (
                      <>
                        <span className="text-[9px] opacity-80 uppercase tracking-wide">Hafta</span>
                        <span className="text-base leading-none">{item.week}</span>
                      </>
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-sm leading-snug mb-1">{item.title}</h3>
                    {item.description && !isOpen && (
                      <p className="text-slate-400 text-xs truncate">{item.description}</p>
                    )}
                  </div>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                    style={{ background: isOpen ? hexMain : "#F1F5F9", color: isOpen ? "white" : "#94A3B8" }}>
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Expandable content */}
                <div className={`overflow-hidden transition-all duration-400 ${isOpen ? "max-h-96" : "max-h-0"}`}>
                  <div className="px-5 pb-5 space-y-3">
                    {item.description && (
                      <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                    )}
                    {item.topics && item.topics.length > 0 && (
                      <div className="space-y-1.5">
                        {item.topics.map((topic, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: hexMain }} />
                            {topic}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 4. objectives_list — Learning objectives ─────────────────────────────────

interface ObjectiveItem {
  text: string;
  icon?: string;
  color?: string;
}

function ObjectivesListSection({ data }: { data: any }) {
  const items: ObjectiveItem[] = data.items || [];
  const heroColor: string = data.__heroColor || "brand";
  const hexMain = themeHex[heroColor] || themeHex.brand;

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#F8FAFC" }}>
      <div className="absolute inset-0 dots-pattern opacity-[0.03] pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          {data.tag && (
            <span className="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full mb-4"
              style={{ background: hexMain + "18", color: hexMain }}>
              <Target className="w-3.5 h-3.5" />
              {data.tag}
            </span>
          )}
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800">
            {data.title}
            {data.titleHighlight && (
              <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>
            )}
          </h2>
          {data.description && (
            <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => {
            const col = item.color || cycleColors[i % cycleColors.length];
            const colHex = themeHex[col] || hexMain;
            const Icon = getIcon(item.icon || "CheckCircle2");

            return (
              <div key={i}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
                style={{ borderLeft: `4px solid ${colHex}` }}>
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{ background: colHex + "18" }}>
                  <Icon className="w-5 h-5" style={{ color: colHex }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold text-slate-400 mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 5. skill_tags — Skill badge cloud ────────────────────────────────────────

interface SkillTagItem {
  text: string;
  color?: string;
  icon?: string;
}

function SkillTagsSection({ data }: { data: any }) {
  const items: SkillTagItem[] = data.items || [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          {data.title && (
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800">
              {data.title}
              {data.titleHighlight && (
                <>{" "}<span className="text-gradient">{data.titleHighlight}</span></>
              )}
            </h2>
          )}
          {data.description && (
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">{data.description}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {items.map((item, i) => {
            const col = item.color || cycleColors[i % cycleColors.length];
            const hexMain = themeHex[col] || themeHex.brand;
            const Icon = getIcon(item.icon || "Sparkles");
            return (
              <span key={i}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md cursor-default"
                style={{ background: hexMain + "18", color: hexMain, border: `1.5px solid ${hexMain}30` }}>
                <Icon className="w-4 h-4" />
                {item.text}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Renderer registry ─────────────────────────────────────────────────────────

export const curriculumSectionRenderers: Record<string, (data: any) => React.ReactNode> = {
  chat_qa: (data) => <ChatQASection data={data} />,
  curriculum_info: (data) => <CurriculumInfoSection data={data} />,
  lesson_grid: (data) => <LessonGridSection data={data} />,
  objectives_list: (data) => <ObjectivesListSection data={data} />,
  skill_tags: (data) => <SkillTagsSection data={data} />,
};
