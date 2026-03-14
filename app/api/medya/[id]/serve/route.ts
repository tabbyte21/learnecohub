import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const media = await prisma.media.findUnique({ where: { id } });
    if (!media || !media.imageData) {
      return new NextResponse("Not found", { status: 404 });
    }

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
      },
    });
  } catch {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
