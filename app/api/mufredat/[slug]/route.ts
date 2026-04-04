import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const curriculum = await prisma.curriculum.findUnique({
      where: { slug, published: true },
      include: {
        sections: {
          where: { visible: true },
          orderBy: { order: "asc" },
        },
      },
    });
    if (!curriculum) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(curriculum, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
