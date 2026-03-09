import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/blog - Yayınlanmış blog yazılarını listele
export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "CDN-Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("Blog fetch error:", e);
    return NextResponse.json([], { status: 200 });
  }
}

export const dynamic = "force-dynamic";
