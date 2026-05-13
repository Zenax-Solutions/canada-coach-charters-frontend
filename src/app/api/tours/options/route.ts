import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const base = process.env.NEXT_PUBLIC_API_URL;
        if (!base) {
            return NextResponse.json({ data: [] });
        }

        const { searchParams } = new URL(request.url);
        const perPage = searchParams.get("per_page")?.trim() || "50";
        const url = `${base}/tours?per_page=${encodeURIComponent(perPage)}`;

        const res = await fetch(url, {
            headers: {
                Accept: "application/json",
            },
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            return NextResponse.json({ data: [] });
        }

        const json = (await res.json()) as { data?: unknown[] };
        return NextResponse.json({ data: Array.isArray(json?.data) ? json.data : [] });
    } catch {
        return NextResponse.json({ data: [] });
    }
}
