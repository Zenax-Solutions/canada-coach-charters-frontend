import { NextResponse } from "next/server";

interface GeoPoint {
    lat: number;
    lon: number;
}

export async function POST(request: Request) {
    const body = (await request.json().catch(() => null)) as { from?: GeoPoint; to?: GeoPoint } | null;

    if (!body?.from || !body?.to) {
        return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
    }

    const url = `https://router.project-osrm.org/route/v1/driving/${body.from.lon},${body.from.lat};${body.to.lon},${body.to.lat}?overview=false`;
    const res = await fetch(url, {
        headers: {
            Accept: "application/json",
            "User-Agent": "CanadaCoachCharters/1.0",
        },
    });

    if (!res.ok) {
        return NextResponse.json({ routes: [] }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
