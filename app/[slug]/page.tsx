"use client";

import { use } from "react";
import { DynamicPage } from "@/components/dynamic-page";

export default function CatchAllPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const navLabel = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return <DynamicPage slug={slug} navActive={navLabel} />;
}
