export interface PageSeo {
    id: number;
    page: string;
    meta_title: string | null;
    meta_description: string | null;
    keywords: string | null;
}

export async function getPageSeo(page: string): Promise<PageSeo | null> {
    try {
        const base = process.env.NEXT_PUBLIC_API_URL;
        if (!base) return null;

        const res = await fetch(`${base}/page-seo/${page}`, {
            next: { revalidate: 300 },
        });
        if (!res.ok) return null;
        return (await res.json()) as PageSeo;
    } catch {
        return null;
    }
}
