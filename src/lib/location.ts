export interface GeoPoint {
    lat: number;
    lon: number;
    label: string;
}

export interface RouteMetrics {
    distanceKm: number;
    durationMinutes: number;
}

const GTA_VIEWBOX = "-80.2,44.3,-78.9,43.2";

function toPoint(item: { lat: string; lon: string; display_name: string }): GeoPoint {
    return {
        lat: Number.parseFloat(item.lat),
        lon: Number.parseFloat(item.lon),
        label: item.display_name,
    };
}

/** Fuzzy scoring for Google Maps-style matching */
function scoreFuzzyMatch(label: string, query: string): number {
    const lowerLabel = label.toLowerCase();
    const lowerQuery = query.toLowerCase();

    // Exact match: highest score
    if (lowerLabel === lowerQuery) return 1000;

    // Starts with: very high score
    if (lowerLabel.startsWith(lowerQuery)) return 500 + (100 - label.length);

    // Contains as a word (space-preceded): high score
    if (lowerLabel.includes(` ${lowerQuery}`)) return 300 + (100 - label.length);

    // Substring match: base score, adjusted by position and length
    if (lowerLabel.includes(lowerQuery)) {
        const position = lowerLabel.indexOf(lowerQuery);
        // Earlier matches and shorter labels score higher
        return 100 + (1000 - position) - label.length;
    }

    // No match
    return -1;
}

export async function searchGtaLocations(query: string): Promise<GeoPoint[]> {
    if (!query.trim() || query.trim().length < 2) return [];

    const res = await fetch(`/api/location/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];

    const data = (await res.json()) as Array<{ lat: string; lon: string; display_name: string }>;

    return data
        .map(toPoint)
        .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lon))
        // Score and filter by fuzzy match
        .map((p) => ({ ...p, score: scoreFuzzyMatch(p.label, query) }))
        .filter((p) => p.score >= 0)
        // Sort by score descending
        .sort((a, b) => b.score - a.score)
        // Remove score property from result
        .map(({ score, ...p }) => p);
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
        routes?: Array<{ distance: number; duration: number }>;
    };

    const first = data.routes?.[0];
    if (!first) return null;

    return {
        distanceKm: Number((first.distance / 1000).toFixed(1)),
        durationMinutes: Math.round(first.duration / 60),
    };
}
