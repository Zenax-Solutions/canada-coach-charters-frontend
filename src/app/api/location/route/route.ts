import { NextResponse } from "next/server";

interface GeoPoint {
    lat: number;
    lon: number;
}

export async function POST(request: Request) {
    try {
        const body = (await request.json().catch(() => null)) as { from?: GeoPoint; to?: GeoPoint } | null;

        if (!body?.from || !body?.to) {
            return NextResponse.json({ distance_km: 0, duration_minutes: 0 }, { status: 200 });
        }

        const backendBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

        const backendRes = await fetch(`${backendBase}/location/route`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                from: { lat: body.from.lat, lon: body.from.lon },
                to: { lat: body.to.lat, lon: body.to.lon },
            }),
            cache: "no-store",
        });

        if (backendRes.ok) {
            const data = await backendRes.json();
            return NextResponse.json(data);
        }

        return NextResponse.json({ distance_km: 0, duration_minutes: 0 });
    } catch {
        return NextResponse.json({ distance_km: 0, duration_minutes: 0 });
    }
}
