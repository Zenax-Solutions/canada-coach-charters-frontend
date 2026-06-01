import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const q = searchParams.get("q")?.trim() ?? "";

        if (q.length < 2) {
            return NextResponse.json([]);
        }

        const backendBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
        const backendUrl = `${backendBase}/location/search?q=${encodeURIComponent(q)}`;

        const backendRes = await fetch(backendUrl, {
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        });

        if (backendRes.ok) {
            const backendData = await backendRes.json();
            if (Array.isArray(backendData)) {
                return NextResponse.json(backendData);
            }
        }

        return NextResponse.json([]);
    } catch {
        return NextResponse.json([], { status: 200 });
    }
}
