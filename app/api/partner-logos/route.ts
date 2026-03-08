import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/partner-logos - Görünür logoları sıralı getir
export async function GET() {
  try {
    const logos = await prisma.partnerLogo.findMany({
      where: { visible: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(logos, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch (e) {
    console.error("Partner logos fetch error:", e);
    return NextResponse.json([], { status: 200 });
  }
}

export const dynamic = "force-dynamic";
