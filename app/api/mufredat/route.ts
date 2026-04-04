import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const curricula = await prisma.curriculum.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        heroColor: true,
        heroTag: true,
        ageRange: true,
        duration: true,
        level: true,
        order: true,
        createdAt: true,
      },
    });
    return NextResponse.json(curricula, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
