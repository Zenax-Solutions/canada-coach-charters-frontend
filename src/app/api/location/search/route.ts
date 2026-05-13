import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() ?? "";

    if (q.length < 2) {
        return NextResponse.json([]);
    }

    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=8&dedupe=1&q=${encodeURIComponent(q)}`;

    const res = await fetch(url, {
        headers: {
            Accept: "application/json",
            "User-Agent": "CanadaCoachCharters/1.0",
        },
    });

    if (!res.ok) {
        return NextResponse.json([], { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
