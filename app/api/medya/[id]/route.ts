import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/medya/:id — serve media file binary from DB (base64 imageData)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      return new NextResponse("Not found", { status: 404 });
    }

    if (!media.imageData) {
      // No imageData stored — redirect to legacy file path
      const adminUrl = process.env.ADMIN_MEDIA_URL || "";
      const fallback = adminUrl
        ? `${adminUrl}/uploads/medya/${media.fileName}`
        : `/uploads/medya/${media.fileName}`;
      return NextResponse.redirect(new URL(fallback, _req.url));
    }

    // imageData is stored as "data:<mimeType>;base64,<data>"
    // Strip the data URI prefix to get raw base64
    const base64 = media.imageData.includes(",")
      ? media.imageData.split(",")[1]
      : media.imageData;

    const buffer = Buffer.from(base64, "base64");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": media.mimeType,
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition":
          media.mimeType === "application/pdf"
            ? `inline; filename="${media.fileName}"`
            : "inline",
      },
    });
  } catch (e) {
    console.error("Media serve error:", e);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
