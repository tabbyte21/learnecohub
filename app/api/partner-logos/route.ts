import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/partner-logos - Görünür logoları sıralı getir
// imageData null olan logolar için Media tablosundan eşleşen dosya adını bul
export async function GET() {
  try {
    const logos = await prisma.partnerLogo.findMany({
      where: { visible: true },
      orderBy: { order: "asc" },
    });

    // imageData eksik olan logolar için Media tablosundan base64 çek
    const needsFill = logos.filter((l) => !l.imageData);
    if (needsFill.length > 0) {
      const fileNames = needsFill.map((l) => l.fileName);
      const mediaRecords = await prisma.media.findMany({
        where: { fileName: { in: fileNames } },
        select: { fileName: true, imageData: true, mimeType: true },
      });
      const mediaMap = new Map(mediaRecords.map((m) => [m.fileName, m]));
      for (const logo of logos) {
        if (!logo.imageData) {
          const media = mediaMap.get(logo.fileName);
          if (media?.imageData) {
            logo.imageData = media.imageData;
            logo.mimeType = media.mimeType;
          }
        }
      }
    }

    return NextResponse.json(logos, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch (e) {
    console.error("Partner logos fetch error:", e);
    return NextResponse.json([], { status: 200 });
  }
}

export const dynamic = "force-dynamic";
