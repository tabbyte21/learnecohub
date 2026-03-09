import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/blog/[slug] - Tek blog yazısı
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Blog yazısı bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(post, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "CDN-Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("Blog post fetch error:", e);
    return NextResponse.json(
      { error: "Veri alınamadı" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
