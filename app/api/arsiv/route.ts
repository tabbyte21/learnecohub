import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/arsiv — PDF files from the arsiv folder
export async function GET(req: NextRequest) {
  const folder = req.nextUrl.searchParams.get("folder") || "arsiv";

  try {
    const items = await prisma.media.findMany({
      where: { folder },
      orderBy: { createdAt: "desc" },
    });

    const adminUrl = process.env.ADMIN_MEDIA_URL || "";

    const result = items.map((item) => ({
      id: item.id,
      name: item.name,
      fileName: item.fileName,
      mimeType: item.mimeType,
      size: item.size,
      url: item.imageData
        ? `/api/medya/${item.id}`
        : adminUrl
          ? `${adminUrl}/uploads/medya/${item.fileName}`
          : `/uploads/medya/${item.fileName}`,
    }));

    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch (e) {
    console.error("Archive fetch error:", e);
    return NextResponse.json([], { status: 200 });
  }
}

export const dynamic = "force-dynamic";
