export interface TourCategory {
    id: number;
    name: string;
    slug: string;
    tours_count: number;
}

export interface TourListItem {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    featured_image: string | null;
    duration_days: number;
    start_location: string;
    max_group_size: number;
    price_per_person: number;
    country: string | null;
    category: { name: string; slug: string } | null;
}

interface ToursResponse {
    data: TourListItem[];
}

export async function getTourCategories(): Promise<TourCategory[]> {
    try {
        const base = process.env.NEXT_PUBLIC_API_URL;
        if (!base) return [];

        const res = await fetch(`${base}/tours/categories`, { next: { revalidate: 60 } });
        if (!res.ok) return [];

        return (await res.json()) as TourCategory[];
    } catch {
        return [];
    }
}

export async function getTours(options?: {
    category?: string;
    perPage?: number;
}): Promise<TourListItem[]> {
    try {
        const base = process.env.NEXT_PUBLIC_API_URL;
        if (!base) return [];

        const query = new URLSearchParams({
            per_page: String(options?.perPage ?? 24),
        });

        if (options?.category) {
            query.set("category", options.category);
        }

        const res = await fetch(`${base}/tours?${query.toString()}`, { next: { revalidate: 60 } });
        if (!res.ok) return [];

        const json = (await res.json()) as ToursResponse;
        return json.data ?? [];
    } catch {
        return [];
    }
}