import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/pages/[slug] - Tek sayfa + visible section'lar
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        sections: {
          where: { visible: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Sayfa bulunamadi" }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (e) {
    console.error("Page fetch error:", e);
    return NextResponse.json({ error: "Veri alinamadi" }, { status: 500 });
  }
}
