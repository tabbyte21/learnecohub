import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/menu - Menü ağacını getir (sadece görünür öğeler)
export async function GET() {
  try {
    const items = await prisma.menuItem.findMany({
      where: { visible: true },
      orderBy: { order: "asc" },
    });

    // Ağaç yapısı oluştur
    const roots = items.filter((i) => !i.parentId);
    const tree = roots.map((root) => ({
      ...root,
      children: items
        .filter((i) => i.parentId === root.id)
        .sort((a, b) => a.order - b.order),
    }));

    return NextResponse.json(tree);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
