import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/pages - Tüm sayfaları listele (sadece okuma)
export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      include: {
        sections: {
          where: { visible: true },
          orderBy: { order: "asc" },
        },
      },
      orderBy: { title: "asc" },
    });
    return NextResponse.json(pages, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch (e) {
    console.error("Pages fetch error:", e);
    return NextResponse.json([], { status: 200 });
  }
}

export const dynamic = "force-dynamic";
