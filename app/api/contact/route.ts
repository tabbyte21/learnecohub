import { NextRequest, NextResponse } from "next/server";

const ADMIN_URL = process.env.ADMIN_API_URL || "https://learnecohub-admin-production.up.railway.app";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Forward to admin API
    const res = await fetch(`${ADMIN_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Gonderilemedi" }, { status: 500 });
  } catch {
    return NextResponse.json({ error: "Hata olustu" }, { status: 500 });
  }
}
