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

import React, { useState } from "react";
import {
  BookOpen, Clock, Users, Star, ChevronDown, ChevronUp,
  MessageCircle, Send, CheckCircle2, Sparkles, Target,
  GraduationCap, Brain, Heart, Zap, Award, Lightbulb,
  Play, Puzzle, Trophy, Compass, Layers,
} from "lucide-react";
import type { ElementType } from "react";

// ── Icon resolver ────────────────────────────────────────────────────────────

const iconMap: Record<string, ElementType> = {
  BookOpen, Clock, Users, Star, MessageCircle, Send, CheckCircle2, Sparkles,
  Target, GraduationCap, Brain, Heart, Zap, Award, Lightbulb,
  Play, Puzzle, Trophy, Compass, Layers,
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

// ── 1. chat_qa — Interactive chat Q&A ────────────────────────────────────────

interface QAItem {
  question: string;
  answer: string;
  questionColor?: string; // "lavender" | "brand" | …
  answerColor?: string;
}

function ChatQASection({ data }: { data: any }) {
  const items: QAItem[] = data.items || [];
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const qBgMap: Record<string, string> = {
    brand: "#EBF2FB",
    mint: "#E8F8F1",
    lavender: "#F0EDFB",
    gold: "#FFFBEB",
    peach: "#FEF0E8",
  };
  const qTextMap: Record<string, string> = {
    brand: "#1B3A7B",
    mint: "#16794A",
    lavender: "#5B41A8",
    gold: "#92400E",
    peach: "#9A3412",
  };
  const aBgMap: Record<string, string> = {
    brand: "#1B3A7B",
    mint: "#16794A",
    lavender: "#5B41A8",
    gold: "#D97706",
    peach: "#C2410C",
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* subtle grid pattern */}
      <div className="absolute inset-0 dots-pattern opacity-[0.03] pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          {data.tag && (
            <span className="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full mb-4"
              style={{ background: "#EBF2FB", color: "#1B3A7B" }}>
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

        {/* Chat messages */}
        <div className="space-y-5">
          {items.map((item, i) => {
            const qColor = item.questionColor || cycleColors[i % cycleColors.length];
            const aColor = item.answerColor || "brand";
            const isOpen = openIdx === i;

            return (
              <div key={i} className="space-y-3">
                {/* Question bubble — left side, student */}
                <button
                  className="flex items-start gap-3 w-full group text-left"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm"
                    style={{ background: qBgMap[qColor] || "#EBF2FB" }}>
                    <Users className="w-4 h-4" style={{ color: qTextMap[qColor] || "#1B3A7B" }} />
                  </div>
                  {/* Bubble */}
                  <div className="flex-1 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm border transition-all"
                    style={{
                      background: qBgMap[qColor] || "#EBF2FB",
                      borderColor: "transparent",
                    }}>
                    <p className="font-semibold text-sm leading-relaxed"
                      style={{ color: qTextMap[qColor] || "#1B3A7B" }}>
                      {item.question}
                    </p>
                  </div>
                  {/* Toggle icon */}
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all mt-1"
                    style={{ background: isOpen ? "#1B3A7B" : "#F1F5F9", color: isOpen ? "white" : "#94A3B8" }}>
                    {isOpen
                      ? <ChevronUp className="w-3.5 h-3.5" />
                      : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Answer bubble — right side, teacher */}
                <div className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="flex items-start gap-3 justify-end pl-12">
                    {/* Bubble */}
                    <div className="flex-1 rounded-2xl rounded-tr-sm px-5 py-4 shadow-md"
                      style={{ background: aBgMap[aColor] || "#1B3A7B" }}>
                      <p className="text-white/90 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm"
                      style={{ background: aBgMap[aColor] || "#1B3A7B" }}>
                      <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {items.length === 0 && (
          <p className="text-center text-slate-400 py-8">Henüz soru eklenmedi.</p>
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
