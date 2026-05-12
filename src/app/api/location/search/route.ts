import { NextResponse } from "next/server";

const GTA_VIEWBOX = "-80.2,44.3,-78.9,43.2";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() ?? "";

    if (q.length < 2) {
        return NextResponse.json([]);
    }

    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&countrycodes=ca&bounded=1&viewbox=${encodeURIComponent(GTA_VIEWBOX)}&addressdetails=1&limit=5&q=${encodeURIComponent(q)}`;

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
