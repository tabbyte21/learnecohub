"use client";

import { useEffect, useState } from "react";
import {
  SubpageNavbar,
  SubpageHero,
  SubpageFooter,
} from "@/components/subpage-shared";
import { sectionRenderers, getIcon } from "@/components/dynamic-page";

type HeroTheme = "brand" | "mint" | "lavender" | "gold" | "peach";

const subpages = [
  { slug: "misyonumuz", label: "Misyonumuz" },
  { slug: "akademik-yaklasimimiz", label: "Akademik Yaklaşımımız" },
  { slug: "ilkelerimiz", label: "İlkelerimiz" },
  { slug: "neden-learnecohub", label: "Neden LearnecoHub?" },
  { slug: "ekibimiz", label: "Ekibimiz" },
  { slug: "basari-hikayeleri", label: "Başarı Hikayeleri" },
];

export default function HakkimizdaPage() {
  const [pages, setPages] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      subpages.map((sp) =>
        fetch(`/api/pages/${sp.slug}?t=${Date.now()}`, { cache: "no-store" })
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    ).then((results) => {
      const map: Record<string, any> = {};
      results.forEach((data, i) => {
        if (data) map[subpages[i].slug] = data;
      });
      setPages(map);
      setLoading(false);
    });
  }, []);

  // Scroll to hash on load
  useEffect(() => {
    if (loading) return;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-44 h-44 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #F5C518 0%, #1B3A7B 60%, transparent 70%)", animation: "loadPulse 2s ease-in-out infinite" }} />
          <img src="/logo.png" alt="LearnecoHub" className="relative w-28 h-auto drop-shadow-sm" style={{ animation: "loadBreathe 2s ease-in-out infinite" }} />
        </div>
        <div className="flex gap-1.5 mt-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full" style={{ background: i === 1 ? "#F5C518" : "#1B3A7B", animation: `loadDot 1.4s ease-in-out ${i * 0.16}s infinite` }} />
          ))}
        </div>
        <style>{`
          @keyframes loadBreathe { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.06); opacity: 0.85; } }
          @keyframes loadPulse { 0%, 100% { transform: scale(0.8); opacity: 0.15; } 50% { transform: scale(1.2); opacity: 0.3; } }
          @keyframes loadDot { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; } }
        `}</style>
      </div>
    );
  }

  // Collect footer from last page that has one
  let footerData: any = undefined;
  for (const sp of [...subpages].reverse()) {
    const page = pages[sp.slug];
    if (!page?.sections) continue;
    const footerSection = page.sections.find((s: any) => s.sectionType === "footer");
    if (footerSection) {
      try { footerData = JSON.parse(footerSection.content); } catch {}
      break;
    }
  }

  return (
    <>
      <SubpageNavbar active="Hakkımızda" />

      {subpages.map((sp) => {
        const page = pages[sp.slug];
        if (!page?.sections) return null;

        const sections = [...page.sections].sort((a: any, b: any) => a.order - b.order);
        const heroSection = sections.find((s: any) => s.sectionType === "subpage_hero");
        let heroData: any = null;
        try {
          if (heroSection) heroData = JSON.parse(heroSection.content);
        } catch {}

        return (
          <div key={sp.slug} id={sp.slug}>
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
            {sections
              .filter((s: any) => s.sectionType !== "subpage_hero" && s.sectionType !== "footer" && s.sectionType !== "final_cta")
              .map((section: any) => {
                const renderer = sectionRenderers[section.sectionType];
                if (!renderer) return null;
                let data: any = {};
                try { data = JSON.parse(section.content); } catch {}
                return <div key={section.id}>{renderer(data)}</div>;
              })}
          </div>
        );
      })}

      {/* Single final CTA at the end */}
      {(() => {
        for (const sp of [...subpages].reverse()) {
          const page = pages[sp.slug];
          if (!page?.sections) continue;
          const ctaSection = page.sections.find((s: any) => s.sectionType === "final_cta");
          if (ctaSection) {
            let data: any = {};
            try { data = JSON.parse(ctaSection.content); } catch {}
            const renderer = sectionRenderers.final_cta;
            return renderer ? renderer(data) : null;
          }
        }
        return null;
      })()}

      <SubpageFooter data={footerData} />
    </>
  );
}
