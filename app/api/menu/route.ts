import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/menu - Menü ağacını getir (sadece görünür öğeler)
// "Müfredat" menü öğesi varsa, yayınlanan müfredatlar otomatik alt öğe olarak eklenir
export async function GET() {
  try {
    const [items, curricula] = await Promise.all([
      prisma.menuItem.findMany({
        where: { visible: true },
        orderBy: { order: "asc" },
      }),
      prisma.curriculum.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        select: { id: true, slug: true, title: true },
      }),
    ]);

    const roots = items.filter((i) => !i.parentId);
    const tree = roots.map((root) => {
      const dbChildren = items
        .filter((i) => i.parentId === root.id)
        .sort((a, b) => a.order - b.order);

      // Eğer bu menü öğesi /mufredat ise, curricula'ları alt öğe olarak ekle
      const isMufredatItem =
        root.url === "/mufredat" ||
        root.label.toLowerCase().includes("müfredat") ||
        root.label.toLowerCase().includes("mufredat");

      if (isMufredatItem && curricula.length > 0) {
        const virtualChildren = curricula.map((c, idx) => ({
          id: `curriculum-${c.id}`,
          label: c.title,
          url: `/mufredat/${c.slug}`,
          icon: null,
          description: null,
          parentId: root.id,
          order: idx,
          visible: true,
          isButton: false,
          buttonStyle: null,
          openInNew: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          children: [],
        }));
        return { ...root, children: [...dbChildren, ...virtualChildren] };
      }

      return { ...root, children: dbChildren };
    });

    return NextResponse.json(tree, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export const dynamic = "force-dynamic";
