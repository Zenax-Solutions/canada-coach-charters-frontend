import { NextResponse } from "next/server";

export async function POST(request: Request) {
    let body: { name?: string; email?: string };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ success: false }, { status: 400 });
    }

    const name = String(body.name ?? "").trim().slice(0, 255);
    const email = String(body.email ?? "").trim().slice(0, 255);

    if (!name || !email) {
        return NextResponse.json({ success: false }, { status: 400 });
    }

    // Save to dedicated chat_leads table (not quotes)
    const backendUrl =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

    try {
        await fetch(`${backendUrl}/chat-lead`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ name, email }),
        });
    } catch {
        // Silent fail — lead save is best-effort, don't block the chat
    }

    return NextResponse.json({ success: true });
}
