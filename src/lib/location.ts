export interface GeoPoint {
    lat: number;
    lon: number;
    label: string;
}

export interface RouteMetrics {
    distanceKm: number;
    durationMinutes: number;
}

export const FIXED_DISTANCE_ORIGIN_ADDRESS = "455 Ferrier St, Markham, ON L3R 5Z2, Canada";

let fixedDistanceOriginCache: GeoPoint | null | undefined;

function toPoint(item: { lat: string; lon: string; display_name: string }): GeoPoint {
    return {
        lat: Number.parseFloat(item.lat),
        lon: Number.parseFloat(item.lon),
        label: item.display_name,
    };
}

export async function searchGtaLocations(query: string): Promise<GeoPoint[]> {
    if (!query.trim() || query.trim().length < 2) return [];

    try {
        const res = await fetch(`/api/location/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) {
            return [];
        }

        const raw = (await res.json()) as unknown;
        if (!Array.isArray(raw)) {
            return [];
        }

        const data = raw as Array<{ lat: string; lon: string; display_name: string }>;

        const results = data
            .map(toPoint)
            .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lon));

        return results;
    } catch {
        return [];
    }
}

export async function geocodeFirstGtaLocation(query: string): Promise<GeoPoint | null> {
    const results = await searchGtaLocations(query);
    return results[0] ?? null;
}

export async function getDrivingRouteMetrics(from: GeoPoint, to: GeoPoint): Promise<RouteMetrics | null> {
    const res = await fetch(`/api/location/route`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to }),
    });
    if (!res.ok) return null;

    const data = (await res.json()) as {
        distance_km?: number;
        duration_minutes?: number;
    };

    if (data.distance_km === undefined || data.duration_minutes === undefined) return null;

    return {
        distanceKm: data.distance_km,
        durationMinutes: data.duration_minutes,
    };
}

async function getFixedDistanceOriginPoint(): Promise<GeoPoint | null> {
    if (fixedDistanceOriginCache !== undefined) {
        return fixedDistanceOriginCache;
    }

    fixedDistanceOriginCache = await geocodeFirstGtaLocation(FIXED_DISTANCE_ORIGIN_ADDRESS);
    return fixedDistanceOriginCache;
}

export async function getDrivingRouteMetricsToDropoff(dropoff: GeoPoint): Promise<RouteMetrics | null> {
    const fixedOrigin = await getFixedDistanceOriginPoint();
    if (!fixedOrigin) {
        return null;
    }

    return getDrivingRouteMetrics(fixedOrigin, dropoff);
}
